import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import type Stripe from 'stripe';
import { applyStripeEvent } from './billing/apply-event';
import { handleWebhookRequest } from './billing/http';
import { memoryBillingStore } from './billing/store';
import { requestProductionRebuild, resetDeployHookForTests } from './deploy-hook';
import { updateExpertReviewStatus } from './store';

const HOOK = 'https://example.com/cf-deploy-hook';

describe('deploy hook', { concurrency: 1 }, () => {

type FetchCall = { url: string; method: string };

function installFetch(impl: (url: string, method: string) => Promise<Response> | Response): {
  calls: FetchCall[];
  restore: () => void;
} {
  const calls: FetchCall[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const method = init?.method || (typeof input === 'object' && 'method' in input ? input.method : 'GET');
    calls.push({ url, method });
    return impl(url, method);
  }) as typeof fetch;
  return {
    calls,
    restore: () => {
      globalThis.fetch = original;
    },
  };
}

function paidCheckoutEvent(id: string, tier: string) {
  return {
    id,
    type: 'checkout.session.completed',
    data: {
      object: {
        payment_status: 'paid',
        customer: 'cus_1',
        subscription: {
          id: 'sub_1',
          status: 'active',
          customer: 'cus_1',
          metadata: { expert_id: 'exp_1', listing_tier: tier },
          items: {
            data: [
              {
                quantity: 1,
                current_period_end: 1800000000,
                price: { lookup_key: `${tier}_monthly` },
              },
            ],
          },
        },
        metadata: { expert_id: 'exp_1', listing_tier: tier },
      },
    },
  };
}

function stripeFor(event: unknown): Stripe {
  return {
    webhooks: {
      constructEventAsync: async () => event,
    },
    customers: { update: async () => ({}) },
  } as unknown as Stripe;
}

test('deploy hook no-ops and does not fetch when the URL is unset', async () => {
  resetDeployHookForTests();
  const previous = process.env.CLOUDFLARE_DEPLOY_HOOK_URL;
  delete process.env.CLOUDFLARE_DEPLOY_HOOK_URL;
  const fetchMock = installFetch(() => {
    throw new Error('fetch should not run');
  });
  const logs: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => {
    logs.push(args.map(String).join(' '));
  };
  try {
    await requestProductionRebuild('unit');
    assert.equal(fetchMock.calls.length, 0);
    assert.ok(logs.some((line) => line.includes('CLOUDFLARE_DEPLOY_HOOK_URL is unset')));
  } finally {
    console.log = originalLog;
    fetchMock.restore();
    if (previous === undefined) delete process.env.CLOUDFLARE_DEPLOY_HOOK_URL;
    else process.env.CLOUDFLARE_DEPLOY_HOOK_URL = previous;
  }
});

test('deploy hook posts, collapses a burst, and retries after a failed post', async () => {
  resetDeployHookForTests();
  let failNext = true;
  const fetchMock = installFetch(() => {
    if (failNext) {
      failNext = false;
      throw new Error('hook down');
    }
    return new Response('ok', { status: 200 });
  });
  try {
    await requestProductionRebuild('first', { CLOUDFLARE_DEPLOY_HOOK_URL: HOOK });
    await requestProductionRebuild('retry', { CLOUDFLARE_DEPLOY_HOOK_URL: HOOK });
    await requestProductionRebuild('burst', { CLOUDFLARE_DEPLOY_HOOK_URL: HOOK });
    assert.deepEqual(
      fetchMock.calls.map((call) => call.method),
      ['POST', 'POST'],
    );
    assert.ok(fetchMock.calls.every((call) => call.url === HOOK));
  } finally {
    fetchMock.restore();
    resetDeployHookForTests();
  }
});

test('deploy hook cache claim blocks another isolate until the claim is released', async () => {
  resetDeployHookForTests();
  const saved = new Map<string, Response>();
  const originalCaches = globalThis.caches;
  (globalThis as unknown as { caches?: unknown }).caches = {
    default: {
      async match(request: Request) {
        const hit = saved.get(request.url);
        return hit ? hit.clone() : undefined;
      },
      async put(request: Request, response: Response) {
        saved.set(request.url, response);
      },
      async delete(request: Request) {
        return saved.delete(request.url);
      },
    },
  };
  const fetchMock = installFetch(() => new Response('ok', { status: 200 }));
  try {
    await requestProductionRebuild('isolate-a', { CLOUDFLARE_DEPLOY_HOOK_URL: HOOK });
    resetDeployHookForTests();
    await requestProductionRebuild('isolate-b', { CLOUDFLARE_DEPLOY_HOOK_URL: HOOK });
    assert.equal(fetchMock.calls.length, 1);
    saved.clear();
    resetDeployHookForTests();
    await requestProductionRebuild('isolate-c', { CLOUDFLARE_DEPLOY_HOOK_URL: HOOK });
    assert.equal(fetchMock.calls.length, 2);
  } finally {
    fetchMock.restore();
    resetDeployHookForTests();
    (globalThis as unknown as { caches?: unknown }).caches = originalCaches;
  }
});

test('stripe webhook rebuilds once for a plan change and still returns 200 if the hook fails', async () => {
  resetDeployHookForTests();
  let failHook = false;
  const fetchMock = installFetch(() => {
    if (failHook) throw new Error('hook down');
    return new Response('ok', { status: 200 });
  });
  try {
    const store = memoryBillingStore();
    store.experts.set('exp_1', {
      id: 'exp_1',
      listing_plan: 'unpaid',
      profile_mode: 'full',
      status: 'published',
      is_demo: false,
      categories: [{}],
      tools: [{}],
    });
    const env = {
      STRIPE_SECRET_KEY: 'rk_test_dummy',
      STRIPE_WEBHOOK_SECRET: 'whsec_test',
      CLOUDFLARE_DEPLOY_HOOK_URL: HOOK,
    };
    const request = (event: unknown) =>
      handleWebhookRequest(
        new Request('https://findaipros.com/api/stripe/webhook', {
          method: 'POST',
          headers: { 'stripe-signature': 't=1,v1=ok' },
          body: '{}',
        }),
        env,
        store,
        stripeFor(event),
      );

    const first = await request(paidCheckoutEvent('evt_plan_basic', 'basic'));
    const second = await request(paidCheckoutEvent('evt_plan_featured', 'featured'));
    assert.equal(first.status, 200);
    assert.equal(second.status, 200);
    assert.equal(store.experts.get('exp_1')?.listing_plan, 'featured');
    assert.equal(fetchMock.calls.length, 1);
    const body = (await first.json()) as { publicListingChanged?: boolean };
    assert.equal(body.publicListingChanged, undefined);

    resetDeployHookForTests();
    const pastDue = await request({
      id: 'evt_past_due',
      type: 'invoice.payment_failed',
      data: {
        object: {
          customer: 'cus_1',
          parent: { subscription_details: { metadata: { expert_id: 'exp_1' } } },
        },
      },
    });
    assert.equal(pastDue.status, 200);
    assert.equal(store.experts.get('exp_1')?.subscription_status, 'past_due');
    assert.equal(store.experts.get('exp_1')?.listing_plan, 'featured');
    assert.equal(fetchMock.calls.length, 1);

    resetDeployHookForTests();
    failHook = true;
    const failedHook = await request(paidCheckoutEvent('evt_plan_premium', 'premium'));
    assert.equal(failedHook.status, 200);
    assert.equal(store.experts.get('exp_1')?.listing_plan, 'premium');
  } finally {
    fetchMock.restore();
    resetDeployHookForTests();
  }
});

test('stripe webhook does not rebuild a listing the directory would not render', async () => {
  resetDeployHookForTests();
  const fetchMock = installFetch(() => new Response('ok', { status: 200 }));
  try {
    const store = memoryBillingStore();
    const hidden = {
      id: 'exp_1',
      listing_plan: 'unpaid' as const,
      profile_mode: 'limited' as const,
      status: 'pending_review',
      is_demo: false,
      categories: [{}],
      tools: [{}],
    };
    store.experts.set('exp_1', hidden);
    const env = {
      STRIPE_SECRET_KEY: 'rk_test_dummy',
      STRIPE_WEBHOOK_SECRET: 'whsec_test',
      CLOUDFLARE_DEPLOY_HOOK_URL: HOOK,
    };
    const request = (event: unknown) =>
      handleWebhookRequest(
        new Request('https://findaipros.com/api/stripe/webhook', {
          method: 'POST',
          headers: { 'stripe-signature': 't=1,v1=ok' },
          body: '{}',
        }),
        env,
        store,
        stripeFor(event),
      );

    const pending = await request(paidCheckoutEvent('evt_pending', 'basic'));
    assert.equal(pending.status, 200);
    assert.equal(store.experts.get('exp_1')?.listing_plan, 'basic');
    assert.equal(fetchMock.calls.length, 0);

    store.experts.set('exp_1', { ...hidden, status: 'published', is_demo: true, listing_plan: 'basic' });
    const demo = await request(paidCheckoutEvent('evt_demo', 'featured'));
    assert.equal(demo.status, 200);
    assert.equal(store.experts.get('exp_1')?.listing_plan, 'featured');
    assert.equal(fetchMock.calls.length, 0);

    store.experts.set('exp_1', {
      ...hidden,
      status: 'published',
      is_demo: false,
      tools: [],
      listing_plan: 'featured',
    });
    const noTools = await request(paidCheckoutEvent('evt_notools', 'premium'));
    assert.equal(noTools.status, 200);
    assert.equal(store.experts.get('exp_1')?.listing_plan, 'premium');
    assert.equal(fetchMock.calls.length, 0);
  } finally {
    fetchMock.restore();
    resetDeployHookForTests();
  }
});

test('referral reversal does not request a rebuild', async () => {
  resetDeployHookForTests();
  const store = memoryBillingStore();
  store.experts.set('exp_1', { id: 'exp_1', listing_plan: 'basic', profile_mode: 'full' });
  const result = await applyStripeEvent(
    { id: 'evt_refund_only', type: 'charge.refunded', data: { object: { invoice: 'in_missing' } } },
    store,
  );
  assert.equal(result.action, 'reverse_referral');
  assert.equal(result.publicListingChanged, undefined);
});

test('admin publish requests a rebuild and a failed hook still succeeds', async () => {
  resetDeployHookForTests();
  const token = process.env.ADMIN_REVIEW_TOKEN || 'hitl-admin-secret-2026';
  const previous = process.env.CLOUDFLARE_DEPLOY_HOOK_URL;
  process.env.CLOUDFLARE_DEPLOY_HOOK_URL = HOOK;
  const fetchMock = installFetch(() => {
    throw new Error('hook down');
  });
  try {
    const denied = await updateExpertReviewStatus({
      token: 'wrong-token',
      expertId: 'exp-1',
      status: 'published',
      reviewedBy: 'tester',
    });
    assert.equal(denied.success, false);
    assert.equal(fetchMock.calls.length, 0);

    const notes = await updateExpertReviewStatus({
      token,
      expertId: 'exp-1',
      reviewNotes: 'internal only',
      reviewedBy: 'tester',
    });
    assert.equal(notes.success, true);
    assert.equal(fetchMock.calls.length, 0);

    const published = await updateExpertReviewStatus({
      token,
      expertId: 'exp-1',
      status: 'published',
      reviewedBy: 'tester',
    });
    assert.equal(published.success, true);
    assert.equal(published.updatedExpert?.status, 'published');
    assert.equal(fetchMock.calls.length, 1);

    resetDeployHookForTests();
    const approved = await updateExpertReviewStatus({
      token,
      expertId: 'exp-1',
      verificationStatus: 'verified',
      reviewedBy: 'tester',
    });
    assert.equal(approved.success, true);
    assert.equal(fetchMock.calls.length, 2);
  } finally {
    fetchMock.restore();
    resetDeployHookForTests();
    if (previous === undefined) delete process.env.CLOUDFLARE_DEPLOY_HOOK_URL;
    else process.env.CLOUDFLARE_DEPLOY_HOOK_URL = previous;
  }
});
});
