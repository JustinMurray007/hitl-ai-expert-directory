import assert from 'node:assert/strict';
import test from 'node:test';
import type Stripe from 'stripe';
import { automaticTaxParam, AUTOMATIC_TAX_ALLOWED } from './automatic-tax';
import { buildCheckoutSessionParams, integrationIdentifier } from './checkout-params';
import { CATALOG_PRICES, isLiveStripeKey, isTestStripeKey } from './catalog';
import { effectForEvent, SUBSCRIPTION_ITEM_PRICE_EXPAND } from './events';
import { applyStripeEvent } from './apply-event';
import { applicationEmailIlikePattern, checkoutCustomerEmail, singleApplicationExpert } from './link-by-email';
import { isExpertId, personalPayLink, personalPayPath } from './pay-link';
import { memoryBillingStore } from './store';
import { referralCreditCents } from './referral';
import { expertsToLimit } from './limit-listings';
import { isPublicDirectoryExpert, showsPublicLinks } from '../listing';
import { SEED_EXPERTS } from '../seed';
import { getExperts, isDemoMode } from '../store';
import { handleCheckoutRequest, handlePortalRequest, handleWebhookRequest } from './http';
import {
  categoryCapForListing,
  extraCategoryQuantity,
  includedCategoryCount,
  trimCategorySlugs,
} from './category-cap';
import { chargedExtraCategoryQuantity } from './checkout-params';
import { EXPERT_PUBLIC_SELECT } from '../store';

test('automatic tax is never enabled', () => {
  assert.equal(AUTOMATIC_TAX_ALLOWED, false);
  for (const flag of [undefined, '', 'false', 'true', 'TRUE']) {
    assert.equal(automaticTaxParam(flag), undefined);
  }
});

test('checkout session is a flexible subscription without payment method types or a trial', () => {
  const params = buildCheckoutSessionParams({
    plan: 'featured',
    interval: 'month',
    planPriceId: 'price_featured',
    extraPriceId: 'price_extra',
    extraCategoryQuantity: 2,
    expertId: 'exp_1',
    referrerExpertId: 'exp_ref',
    email: 'specialist@example.com',
    successUrl: 'https://findaipros.com/apply/success?session_id={CHECKOUT_SESSION_ID}',
    cancelUrl: 'https://findaipros.com/apply#pricing',
    integrationIdentifier: integrationIdentifier('abcdefgh'),
    automaticTaxFlag: 'true',
  });
  const encoded = JSON.stringify(params);
  assert.equal(params.mode, 'subscription');
  assert.equal(params.subscription_data?.billing_mode?.type, 'flexible');
  assert.equal(params.client_reference_id, 'exp_1');
  assert.equal(params.metadata?.listing_tier, 'featured');
  assert.equal(params.metadata?.included_categories, '3');
  assert.equal(params.metadata?.extra_category_quantity, '2');
  assert.equal(params.line_items?.length, 2);
  assert.equal(params.line_items?.[1].quantity, 2);
  assert.equal(params.customer_email, 'specialist@example.com');
  assert.equal(params.integration_identifier, 'findaipros_checkout_abcdefgh');
  assert.equal('payment_method_types' in params, false);
  assert.equal('automatic_tax' in params, false);
  assert.equal(encoded.includes('trial_period_days'), false);
  assert.equal(encoded.includes('payment_method_types'), false);
});

test('catalog prices are tax-exclusive amounts with a yearly extra category', () => {
  const extraYear = CATALOG_PRICES.find((price) => price.lookupKey === 'extra_category_yearly');
  const basicMonth = CATALOG_PRICES.find((price) => price.lookupKey === 'basic_monthly');
  assert.equal(extraYear?.unitAmount, 7900);
  assert.equal(basicMonth?.unitAmount, 999);
  assert.equal(CATALOG_PRICES.length, 8);
  assert.equal(isLiveStripeKey('rk_live_abc'), true);
  assert.equal(isTestStripeKey('rk_test_abc'), true);
  assert.equal(isTestStripeKey('rk_live_abc'), false);
});

test('referral credit is 30 percent of the pre-tax amount', () => {
  assert.equal(referralCreditCents({ total_excluding_tax: 1000, subtotal: 1000, amount_paid: 1000 }), 300);
  assert.equal(referralCreditCents({ total_excluding_tax: null, subtotal: 999 }), 300);
});

test('checkout paid, async success, failed payment, deletion, and refunds', async () => {
  const store = memoryBillingStore();
  store.experts.set('exp_1', { id: 'exp_1', listing_plan: 'unpaid', profile_mode: 'full' });

  const unpaid = await applyStripeEvent(
    {
      id: 'evt_unpaid',
      type: 'checkout.session.completed',
      data: { object: { payment_status: 'unpaid', metadata: { expert_id: 'exp_1', listing_tier: 'basic' } } },
    },
    store,
  );
  assert.equal(unpaid.action, 'checkout_not_paid');
  assert.equal(store.experts.get('exp_1')?.listing_plan, 'unpaid');

  const paid = await applyStripeEvent(
    {
      id: 'evt_paid',
      type: 'checkout.session.completed',
      data: {
        object: {
          payment_status: 'paid',
          customer: 'cus_1',
          subscription: 'sub_1',
          client_reference_id: 'exp_1',
          metadata: { expert_id: 'exp_1', listing_tier: 'basic', referrer_expert_id: 'exp_ref', extra_category_quantity: '1' },
        },
      },
    },
    store,
  );
  assert.equal(paid.action, 'applied');
  assert.equal(store.experts.get('exp_1')?.listing_plan, 'basic');
  assert.equal(store.experts.get('exp_1')?.profile_mode, 'full');
  assert.equal(store.experts.get('exp_1')?.stripe_customer_id, 'cus_1');

  const duplicate = await applyStripeEvent(
    {
      id: 'evt_paid',
      type: 'checkout.session.completed',
      data: { object: { payment_status: 'paid', metadata: { expert_id: 'exp_1', listing_tier: 'premium' } } },
    },
    store,
  );
  assert.equal(duplicate.duplicate, true);
  assert.equal(store.experts.get('exp_1')?.listing_plan, 'basic');

  await applyStripeEvent(
    {
      id: 'evt_async',
      type: 'checkout.session.async_payment_succeeded',
      data: {
        object: {
          payment_status: 'paid',
          customer: 'cus_1',
          metadata: { expert_id: 'exp_1', listing_tier: 'featured' },
        },
      },
    },
    store,
  );
  assert.equal(store.experts.get('exp_1')?.listing_plan, 'featured');

  await applyStripeEvent(
    {
      id: 'evt_fail',
      type: 'invoice.payment_failed',
      data: {
        object: {
          customer: 'cus_1',
          parent: { subscription_details: { metadata: { expert_id: 'exp_1' } } },
        },
      },
    },
    store,
  );
  assert.equal(store.experts.get('exp_1')?.subscription_status, 'past_due');
  assert.equal(store.experts.get('exp_1')?.listing_plan, 'featured');
  assert.equal(showsPublicLinks(store.experts.get('exp_1') || {}), true);

  await applyStripeEvent(
    {
      id: 'evt_invoice',
      type: 'invoice.paid',
      data: {
        object: {
          id: 'in_1',
          currency: 'usd',
          total_excluding_tax: 2999,
          subtotal: 2999,
          amount_paid: 2999,
          customer: 'cus_1',
          parent: {
            subscription_details: {
              metadata: { expert_id: 'exp_1', referrer_expert_id: 'exp_ref', listing_tier: 'featured' },
            },
          },
        },
      },
    },
    store,
  );
  assert.equal(store.ledger.length, 1);
  assert.equal(store.ledger[0].amountCents, 900);
  assert.equal(store.ledger[0].kind, 'credit');
  assert.equal(store.experts.get('exp_1')?.subscription_status, 'active');

  await applyStripeEvent(
    { id: 'evt_refund', type: 'charge.refunded', data: { object: { invoice: 'in_1' } } },
    store,
  );
  assert.equal(store.ledger.some((row) => row.kind === 'reversal' && row.amountCents === -900), true);

  await applyStripeEvent(
    {
      id: 'evt_deleted',
      type: 'customer.subscription.deleted',
      data: { object: { id: 'sub_1', customer: 'cus_1', status: 'canceled', metadata: { expert_id: 'exp_1' } } },
    },
    store,
  );
  assert.equal(store.experts.get('exp_1')?.profile_mode, 'limited');
  assert.equal(store.experts.get('exp_1')?.listing_plan, 'unpaid');
  assert.equal(showsPublicLinks(store.experts.get('exp_1') || {}), false);
});

test('subscription update reads the new lookup key and does not end a cancel-at-period listing early', async () => {
  const store = memoryBillingStore();
  store.experts.set('exp_2', { id: 'exp_2', listing_plan: 'basic', profile_mode: 'full' });
  const effect = effectForEvent({
    id: 'evt_up',
    type: 'customer.subscription.updated',
    data: {
      object: {
        id: 'sub_2',
        customer: 'cus_2',
        status: 'active',
        cancel_at: 1893456000,
        metadata: { expert_id: 'exp_2' },
        items: {
          data: [
            { quantity: 1, current_period_end: 1893456000, price: { lookup_key: 'premium_yearly' } },
          ],
        },
      },
    },
  });
  assert.equal(effect.action, 'apply');
  if (effect.action === 'apply') {
    await store.applyPatch('exp_2', effect.patch);
  }
  assert.equal(store.experts.get('exp_2')?.listing_plan, 'premium');
  assert.equal(store.experts.get('exp_2')?.profile_mode, 'full');
  assert.equal(showsPublicLinks(store.experts.get('exp_2') || {}), true);
});

test('day-30 limiter skips legacy rows and limits an expired unpaid profile', () => {
  const now = new Date('2026-11-11T00:00:00Z');
  const ids = expertsToLimit(
    [
      { id: 'legacy' },
      { id: 'free', listing_plan: 'unpaid', free_period_ends_at: '2026-12-01T00:00:00Z', profile_mode: 'full' },
      { id: 'expired', listing_plan: 'unpaid', free_period_ends_at: '2026-10-01T00:00:00Z', profile_mode: 'full' },
      { id: 'past_due', listing_plan: 'basic', subscription_status: 'past_due', profile_mode: 'full' },
      { id: 'ended', listing_plan: 'basic', subscription_status: 'canceled', profile_mode: 'full' },
    ],
    now,
  );
  assert.deepEqual(ids.sort(), ['ended', 'expired']);
});

test('checkout route falls back when the secret is unset and omits tax when configured', async () => {
  const unconfigured = await handleCheckoutRequest(new Request('https://findaipros.com/api/stripe/checkout', { method: 'POST', body: '{}' }), {});
  assert.equal(unconfigured.status, 503);

  const captured: { params?: Stripe.Checkout.SessionCreateParams } = {};
  const stripe = {
    prices: {
      list: async () => ({ data: [{ id: 'price_basic', lookup_key: 'basic_monthly' }] }),
    },
    checkout: {
      sessions: {
        create: async (params: Stripe.Checkout.SessionCreateParams) => {
          captured.params = params;
          return { id: 'cs_test', url: 'https://checkout.stripe.com/c/pay/cs_test' };
        },
      },
    },
  } as unknown as Stripe;

  const response = await handleCheckoutRequest(
    new Request('https://findaipros.com/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'basic', interval: 'month', extra_category_quantity: 0, expert_id: 'exp_9' }),
    }),
    { STRIPE_SECRET_KEY: 'rk_test_dummy', STRIPE_AUTOMATIC_TAX: 'true', NEXT_PUBLIC_SITE_URL: 'https://findaipros.com' },
    stripe,
  );
  assert.equal(response.status, 200);
  assert.ok(captured.params);
  assert.equal('automatic_tax' in captured.params, false);
  assert.equal('payment_method_types' in captured.params, false);
  assert.equal(captured.params.mode, 'subscription');
  assert.equal(captured.params.subscription_data?.billing_mode?.type, 'flexible');
});

test('webhook rejects a bad signature and does not grant a tier', async () => {
  const store = memoryBillingStore();
  store.experts.set('exp_1', { id: 'exp_1', listing_plan: 'unpaid' });
  const stripe = {
    webhooks: {
      constructEventAsync: async () => {
        throw new Error('bad signature');
      },
    },
  } as unknown as Stripe;
  const response = await handleWebhookRequest(
    new Request('https://findaipros.com/api/stripe/webhook', {
      method: 'POST',
      headers: { 'stripe-signature': 't=1,v1=fake' },
      body: '{}',
    }),
    { STRIPE_SECRET_KEY: 'rk_test_dummy', STRIPE_WEBHOOK_SECRET: 'whsec_test' },
    store,
    stripe,
  );
  assert.equal(response.status, 400);
  assert.equal(store.experts.get('exp_1')?.listing_plan, 'unpaid');
});

function expandedSubscription(id: string, lookupKey: string, periodEnd: number) {
  return {
    id,
    status: 'active',
    customer: 'cus_1',
    metadata: { expert_id: 'exp_1', listing_tier: 'basic', extra_category_quantity: '2' },
    items: {
      data: [
        { quantity: 1, current_period_end: periodEnd, price: { lookup_key: lookupKey } },
        { quantity: 2, current_period_end: periodEnd, price: { lookup_key: 'extra_category_monthly' } },
      ],
    },
  };
}

test('checkout.session.completed retrieves a subscription id before reading lookup key and period end', async () => {
  const store = memoryBillingStore();
  store.experts.set('exp_1', { id: 'exp_1', listing_plan: 'unpaid' });
  const retrieved: string[] = [];
  await applyStripeEvent(
    {
      id: 'evt_checkout_id',
      type: 'checkout.session.completed',
      data: {
        object: {
          payment_status: 'paid',
          customer: 'cus_1',
          subscription: 'sub_basic',
          client_reference_id: 'exp_1',
          metadata: { expert_id: 'exp_1', listing_tier: 'basic' },
        },
      },
    },
    store,
    {
      retrieveSubscription: async (subscriptionId) => {
        retrieved.push(subscriptionId);
        return expandedSubscription(subscriptionId, 'basic_monthly', 1800000000);
      },
    },
  );
  assert.deepEqual(retrieved, ['sub_basic']);
  const expert = store.experts.get('exp_1');
  assert.equal(expert?.stripe_price_lookup_key, 'basic_monthly');
  assert.equal(expert?.billing_interval, 'month');
  assert.equal(expert?.current_period_end, new Date(1800000000 * 1000).toISOString());
  assert.equal(expert?.extra_category_quantity, 2);
  assert.equal(expert?.listing_plan, 'basic');
});

test('invoice.paid retrieves a subscription id from parent.subscription_details', async () => {
  const store = memoryBillingStore();
  store.experts.set('exp_1', { id: 'exp_1', listing_plan: 'unpaid' });
  const retrieved: string[] = [];
  await applyStripeEvent(
    {
      id: 'evt_invoice_id',
      type: 'invoice.paid',
      data: {
        object: {
          id: 'in_sub',
          currency: 'usd',
          total_excluding_tax: 999,
          customer: 'cus_1',
          parent: {
            subscription_details: {
              subscription: 'sub_featured',
              metadata: { expert_id: 'exp_1', referrer_expert_id: 'exp_ref', listing_tier: 'basic' },
            },
          },
        },
      },
    },
    store,
    {
      retrieveSubscription: async (subscriptionId) => {
        retrieved.push(subscriptionId);
        return expandedSubscription(subscriptionId, 'featured_yearly', 1900000000);
      },
    },
  );
  assert.deepEqual(retrieved, ['sub_featured']);
  const expert = store.experts.get('exp_1');
  assert.equal(expert?.stripe_price_lookup_key, 'featured_yearly');
  assert.equal(expert?.billing_interval, 'year');
  assert.equal(expert?.listing_plan, 'featured');
  assert.equal(expert?.current_period_end, new Date(1900000000 * 1000).toISOString());
  assert.equal(store.ledger[0]?.amountCents, 300);
});

test('webhook retrieve expands items.data.price', async () => {
  const store = memoryBillingStore();
  store.experts.set('exp_1', { id: 'exp_1', listing_plan: 'unpaid' });
  let expand: string[] | undefined;
  const stripe = {
    webhooks: {
      constructEventAsync: async () => ({
        id: 'evt_wh',
        type: 'checkout.session.completed',
        data: {
          object: {
            payment_status: 'paid',
            customer: 'cus_1',
            subscription: 'sub_wh',
            metadata: { expert_id: 'exp_1', listing_tier: 'basic' },
          },
        },
      }),
    },
    subscriptions: {
      retrieve: async (_id: string, params: { expand?: string[] }) => {
        expand = params.expand;
        return expandedSubscription('sub_wh', 'basic_monthly', 1800000000);
      },
    },
    customers: { update: async () => ({}) },
  } as unknown as Stripe;
  const response = await handleWebhookRequest(
    new Request('https://findaipros.com/api/stripe/webhook', {
      method: 'POST',
      headers: { 'stripe-signature': 't=1,v1=ok' },
      body: '{}',
    }),
    { STRIPE_SECRET_KEY: 'rk_test_dummy', STRIPE_WEBHOOK_SECRET: 'whsec_test' },
    store,
    stripe,
  );
  assert.equal(response.status, 200);
  assert.deepEqual(expand, [...SUBSCRIPTION_ITEM_PRICE_EXPAND]);
  assert.equal(store.experts.get('exp_1')?.stripe_price_lookup_key, 'basic_monthly');
});

function invoicePaid(status: string, lookupKey: string) {
  return {
    id: `evt_invoice_${status}`,
    type: 'invoice.paid',
    data: {
      object: {
        id: `in_${status}`,
        currency: 'usd',
        total_excluding_tax: 1000,
        customer: 'cus_1',
        parent: {
          subscription_details: {
            subscription: {
              id: 'sub_1',
              status,
              customer: 'cus_1',
              metadata: { expert_id: 'exp_1', referrer_expert_id: 'exp_ref' },
              items: {
                data: [{ quantity: 1, current_period_end: 1800000000, price: { lookup_key: lookupKey } }],
              },
            },
            metadata: { expert_id: 'exp_1', referrer_expert_id: 'exp_ref', listing_tier: 'premium' },
          },
        },
      },
    },
  };
}

test('invoice.paid grants a listing only while the subscription is active or trialing', () => {
  const trialing = effectForEvent(invoicePaid('trialing', 'premium_monthly'));
  assert.equal(trialing.action, 'apply');
  if (trialing.action === 'apply') {
    assert.equal(trialing.patch.listing_plan, 'premium');
    assert.equal(trialing.patch.profile_mode, 'full');
    assert.equal(trialing.patch.subscription_status, 'trialing');
    assert.equal(trialing.referral?.amountCents, 300);
  }

  const canceled = effectForEvent(invoicePaid('canceled', 'premium_yearly'));
  assert.equal(canceled.action, 'apply');
  if (canceled.action === 'apply') {
    assert.equal(canceled.patch.listing_plan, 'unpaid');
    assert.equal(canceled.patch.profile_mode, 'limited');
    assert.equal(canceled.patch.subscription_status, 'canceled');
    assert.equal(canceled.referral?.amountCents, 300);
  }

  const pastDue = effectForEvent(invoicePaid('past_due', 'featured_monthly'));
  assert.equal(pastDue.action, 'apply');
  if (pastDue.action === 'apply') {
    assert.equal(pastDue.patch.listing_plan, undefined);
    assert.equal(pastDue.patch.profile_mode, undefined);
    assert.equal(pastDue.patch.subscription_status, 'past_due');
    assert.equal(pastDue.referral?.amountCents, 300);
  }
});

test('invoice.paid after subscription.deleted does not re-upgrade a canceled listing', async () => {
  const store = memoryBillingStore();
  store.experts.set('exp_1', {
    id: 'exp_1',
    listing_plan: 'featured',
    profile_mode: 'full',
    subscription_status: 'active',
    status: 'published',
    is_demo: false,
    categories: [{}],
    tools: [{}],
  });

  await applyStripeEvent(
    {
      id: 'evt_deleted_first',
      type: 'customer.subscription.deleted',
      data: { object: { id: 'sub_1', customer: 'cus_1', status: 'canceled', metadata: { expert_id: 'exp_1' } } },
    },
    store,
  );
  assert.equal(store.experts.get('exp_1')?.listing_plan, 'unpaid');
  assert.equal(store.experts.get('exp_1')?.profile_mode, 'limited');

  const retrieved: string[] = [];
  await applyStripeEvent(
    {
      id: 'evt_late_invoice',
      type: 'invoice.paid',
      data: {
        object: {
          id: 'in_late',
          currency: 'usd',
          total_excluding_tax: 1000,
          customer: 'cus_1',
          parent: {
            subscription_details: {
              subscription: 'sub_1',
              metadata: { expert_id: 'exp_1', referrer_expert_id: 'exp_ref', listing_tier: 'premium' },
            },
          },
        },
      },
    },
    store,
    {
      retrieveSubscription: async (subscriptionId) => {
        retrieved.push(subscriptionId);
        return {
          id: subscriptionId,
          status: 'canceled',
          customer: 'cus_1',
          metadata: { expert_id: 'exp_1', referrer_expert_id: 'exp_ref', listing_tier: 'premium' },
          items: {
            data: [{ quantity: 1, current_period_end: 1800000000, price: { lookup_key: 'premium_monthly' } }],
          },
        };
      },
    },
  );
  assert.deepEqual(retrieved, ['sub_1']);

  const expert = store.experts.get('exp_1');
  assert.equal(expert?.listing_plan, 'unpaid');
  assert.equal(expert?.profile_mode, 'limited');
  assert.equal(expert?.subscription_status, 'canceled');
  assert.equal(showsPublicLinks(expert || {}), false);
  assert.equal(store.ledger.length, 1);
  assert.equal(store.ledger[0].amountCents, 300);
  assert.equal(store.ledger[0].kind, 'credit');
});

test('subscription.updated limits a canceled subscription and keeps a past_due plan', () => {
  const canceled = effectForEvent({
    id: 'evt_sub_canceled',
    type: 'customer.subscription.updated',
    data: {
      object: {
        id: 'sub_2',
        customer: 'cus_2',
        status: 'canceled',
        metadata: { expert_id: 'exp_2', listing_tier: 'premium' },
        items: { data: [{ quantity: 1, price: { lookup_key: 'premium_monthly' } }] },
      },
    },
  });
  assert.equal(canceled.action, 'apply');
  if (canceled.action === 'apply') {
    assert.equal(canceled.patch.listing_plan, 'unpaid');
    assert.equal(canceled.patch.profile_mode, 'limited');
    assert.equal(canceled.patch.subscription_status, 'canceled');
  }

  const pastDue = effectForEvent({
    id: 'evt_sub_past_due',
    type: 'customer.subscription.updated',
    data: {
      object: {
        id: 'sub_2',
        customer: 'cus_2',
        status: 'past_due',
        metadata: { expert_id: 'exp_2' },
        items: { data: [{ quantity: 1, price: { lookup_key: 'featured_monthly' } }] },
      },
    },
  });
  assert.equal(pastDue.action, 'apply');
  if (pastDue.action === 'apply') {
    assert.equal(pastDue.patch.listing_plan, 'featured');
    assert.equal(pastDue.patch.profile_mode, 'full');
    assert.equal(pastDue.patch.subscription_status, 'past_due');
  }
});

test('checkout completion does not grant a listing when the fetched subscription is canceled', () => {
  const effect = effectForEvent({
    id: 'evt_checkout_canceled',
    type: 'checkout.session.completed',
    data: {
      object: {
        payment_status: 'paid',
        customer: 'cus_1',
        metadata: { expert_id: 'exp_1', listing_tier: 'premium' },
        subscription: {
          id: 'sub_old',
          status: 'canceled',
          customer: 'cus_1',
          metadata: { expert_id: 'exp_1' },
          items: { data: [{ quantity: 1, price: { lookup_key: 'premium_monthly' } }] },
        },
      },
    },
  });
  assert.equal(effect.action, 'apply');
  if (effect.action === 'apply') {
    assert.equal(effect.patch.listing_plan, 'unpaid');
    assert.equal(effect.patch.profile_mode, 'limited');
    assert.equal(effect.patch.subscription_status, 'canceled');
  }
});

test('public directory predicate matches getExperts and keeps the seeded profiles', async () => {
  assert.equal(isPublicDirectoryExpert({ status: 'pending_review', is_demo: false, categories: [{}], tools: [{}] }), false);
  assert.equal(isPublicDirectoryExpert({ status: 'published', is_demo: true, categories: [{}], tools: [{}] }), false);
  assert.equal(isPublicDirectoryExpert({ status: 'rejected', is_demo: false, categories: [{}], tools: [{}] }), false);
  assert.equal(isPublicDirectoryExpert({ status: 'archived', is_demo: false, categories: [{}], tools: [{}] }), false);
  assert.equal(isPublicDirectoryExpert({ status: 'published', is_demo: false, categories: [], tools: [{}] }), false);
  assert.equal(isPublicDirectoryExpert({ status: 'published', is_demo: false, categories: [{}], tools: [] }), true);
  assert.equal(isPublicDirectoryExpert({ status: 'published', is_demo: false, categories: [{}], tools: [{}] }), true);
  assert.ok(SEED_EXPERTS.length > 0);
  assert.ok(SEED_EXPERTS.every((expert) => isPublicDirectoryExpert(expert)));
  if (isDemoMode()) {
    const experts = await getExperts();
    assert.equal(experts.length, SEED_EXPERTS.length);
    assert.ok(experts.every((expert) => isPublicDirectoryExpert(expert)));
  }
});

const STRIPE_SECRET = 'rk_test_SUPERSECRETKEY';

function stripeBoom(message = `Stripe rejected ${STRIPE_SECRET}`): Error {
  return Object.assign(new Error(message), {
    type: 'StripeAPIError',
    code: 'api_error',
    statusCode: 500,
    requestId: 'req_test_123',
    raw: { headers: { Authorization: `Bearer ${STRIPE_SECRET}` } },
  });
}

function captureErrors(): { lines: string[]; restore: () => void } {
  const lines: string[] = [];
  const original = console.error;
  console.error = (...args: unknown[]) => {
    lines.push(args.map((arg) => (typeof arg === 'string' ? arg : JSON.stringify(arg))).join(' '));
  };
  return {
    lines,
    restore: () => {
      console.error = original;
    },
  };
}

function assertNoStripeSecrets(lines: string[]) {
  const logged = lines.join('\n');
  assert.equal(logged.includes(STRIPE_SECRET), false);
  assert.equal(logged.includes('Authorization'), false);
  assert.match(logged, /stripe_request_failed/);
  assert.match(logged, /\[redacted\]/);
}

test('checkout returns a handled error when Stripe price lookup or session create fails', async () => {
  const env = { STRIPE_SECRET_KEY: 'rk_test_dummy', NEXT_PUBLIC_SITE_URL: 'https://findaipros.com' };
  const jsonRequest = () =>
    new Request('https://findaipros.com/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'basic', interval: 'month', extra_category_quantity: 0 }),
    });
  const formRequest = () =>
    new Request('https://findaipros.com/api/stripe/checkout', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ plan: 'basic', interval: 'month', extra_category_quantity: '0' }),
    });

  const logs = captureErrors();
  try {
    const listFailed = {
      prices: { list: async () => { throw stripeBoom(); } },
    } as unknown as Stripe;
    const jsonList = await handleCheckoutRequest(jsonRequest(), env, listFailed);
    assert.equal(jsonList.status, 500);
    assert.deepEqual(await jsonList.json(), { error: 'stripe_error' });

    const formList = await handleCheckoutRequest(formRequest(), env, listFailed);
    assert.equal(formList.status, 303);
    assert.equal(formList.headers.get('location'), 'https://findaipros.com/apply#application');

    const createFailed = {
      prices: { list: async () => ({ data: [{ id: 'price_basic', lookup_key: 'basic_monthly' }] }) },
      checkout: { sessions: { create: async () => { throw stripeBoom(); } } },
    } as unknown as Stripe;
    const jsonCreate = await handleCheckoutRequest(jsonRequest(), env, createFailed);
    assert.equal(jsonCreate.status, 500);
    assert.deepEqual(await jsonCreate.json(), { error: 'stripe_error' });
    const formCreate = await handleCheckoutRequest(formRequest(), env, createFailed);
    assert.equal(formCreate.status, 303);
    assert.equal(formCreate.headers.get('location'), 'https://findaipros.com/apply#application');
    assertNoStripeSecrets(logs.lines);
  } finally {
    logs.restore();
  }
});

test('portal returns a handled error when Stripe retrieve or portal create fails', async () => {
  const env = { STRIPE_SECRET_KEY: 'rk_test_dummy', NEXT_PUBLIC_SITE_URL: 'https://findaipros.com' };
  const jsonRequest = () =>
    new Request('https://findaipros.com/api/stripe/portal', {
      method: 'POST',
      body: JSON.stringify({ checkout_session_id: 'cs_test' }),
    });
  const formRequest = () =>
    new Request('https://findaipros.com/api/stripe/portal', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ checkout_session_id: 'cs_test' }),
    });
  const logs = captureErrors();
  try {
    let creates = 0;
    const retrieveFailed = {
      checkout: { sessions: { retrieve: async () => { throw stripeBoom(); } } },
      billingPortal: { sessions: { create: async () => { creates += 1; return { url: 'https://billing.stripe.com/session' }; } } },
    } as unknown as Stripe;
    const jsonRetrieve = await handlePortalRequest(jsonRequest(), env, retrieveFailed);
    assert.equal(jsonRetrieve.status, 500);
    assert.deepEqual(await jsonRetrieve.json(), { error: 'stripe_error' });
    assert.equal(creates, 0);
    const formRetrieve = await handlePortalRequest(formRequest(), env, retrieveFailed);
    assert.equal(formRetrieve.status, 303);
    assert.equal(formRetrieve.headers.get('location'), 'https://findaipros.com/apply#application');

    const createFailed = {
      checkout: {
        sessions: {
          retrieve: async () => ({ id: 'cs_test', payment_status: 'paid', customer: 'cus_1' }),
        },
      },
      billingPortal: { sessions: { create: async () => { throw stripeBoom(); } } },
    } as unknown as Stripe;
    const jsonCreate = await handlePortalRequest(jsonRequest(), env, createFailed);
    assert.equal(jsonCreate.status, 500);
    assert.deepEqual(await jsonCreate.json(), { error: 'stripe_error' });
    assertNoStripeSecrets(logs.lines);
  } finally {
    logs.restore();
  }
});

test('category caps, extra quantity, and trim keep the first chosen slugs', () => {
  assert.equal(includedCategoryCount('basic', 5), 1);
  assert.equal(includedCategoryCount('featured', 5), 3);
  assert.equal(includedCategoryCount('premium', 5), 5);
  assert.equal(includedCategoryCount('unpaid', 5), 1);
  assert.equal(categoryCapForListing('basic', 2), 3);
  assert.equal(categoryCapForListing('featured', 0), 3);
  assert.equal(categoryCapForListing('premium', 0), Number.MAX_SAFE_INTEGER);
  assert.equal(categoryCapForListing('unpaid', 4), 1);
  assert.equal(extraCategoryQuantity(1, 'basic', 5), 0);
  assert.equal(extraCategoryQuantity(4, 'basic', 5), 3);
  assert.equal(extraCategoryQuantity(2, 'featured', 5), 0);
  assert.equal(extraCategoryQuantity(5, 'featured', 5), 2);
  assert.equal(extraCategoryQuantity(5, 'premium', 5), 0);
  assert.equal(extraCategoryQuantity(9, 'basic', 5), 4);
  assert.deepEqual(trimCategorySlugs(['ops', 'sales', 'ops', 'support'], 2), ['ops', 'sales']);
  assert.equal(
    chargedExtraCategoryQuantity({
      plan: 'basic',
      extraCategoryQuantity: 20,
      categorySlugs: ['operations-workflow-automation', 'sales-lead-qualification'],
      categoryCatalogSize: 5,
    }),
    1,
  );
  assert.equal(
    chargedExtraCategoryQuantity({
      plan: 'premium',
      extraCategoryQuantity: 4,
      categorySlugs: ['operations-workflow-automation', 'sales-lead-qualification', 'marketing-programmatic-content'],
      categoryCatalogSize: 5,
    }),
    0,
  );
});

test('checkout charges only for categories past the plan and stores the chosen slugs', () => {
  const params = buildCheckoutSessionParams({
    plan: 'basic',
    interval: 'month',
    planPriceId: 'price_basic',
    extraPriceId: 'price_extra',
    extraCategoryQuantity: 20,
    categorySlugs: ['operations-workflow-automation', 'sales-lead-qualification', 'customer-support-knowledge-base'],
    categoryCatalogSize: 5,
    successUrl: 'https://findaipros.com/apply/success?session_id={CHECKOUT_SESSION_ID}',
    cancelUrl: 'https://findaipros.com/apply#pricing',
    integrationIdentifier: integrationIdentifier('abcdefgh'),
  });
  assert.equal(params.metadata?.included_categories, '1');
  assert.equal(params.metadata?.extra_category_quantity, '2');
  assert.equal(params.metadata?.category_slugs, 'operations-workflow-automation,sales-lead-qualification,customer-support-knowledge-base');
  assert.equal(params.line_items?.[1]?.quantity, 2);
  assert.equal(params.subscription_data?.metadata?.category_slugs, params.metadata?.category_slugs);

  const premium = buildCheckoutSessionParams({
    plan: 'premium',
    interval: 'year',
    planPriceId: 'price_premium',
    extraPriceId: 'price_extra',
    extraCategoryQuantity: 3,
    categorySlugs: ['operations-workflow-automation', 'sales-lead-qualification'],
    categoryCatalogSize: 5,
    successUrl: 'https://findaipros.com/apply/success?session_id={CHECKOUT_SESSION_ID}',
    cancelUrl: 'https://findaipros.com/apply#pricing',
    integrationIdentifier: integrationIdentifier('abcdefgh'),
  });
  assert.equal(premium.metadata?.included_categories, 'all');
  assert.equal(premium.metadata?.extra_category_quantity, '0');
  assert.equal(premium.line_items?.length, 1);
});

test('checkout route rejects unknown categories and ignores a client extra quantity', async () => {
  const captured: { params?: Stripe.Checkout.SessionCreateParams } = {};
  const stripe = {
    prices: {
      list: async ({ lookup_keys }: { lookup_keys: string[] }) => ({
        data: lookup_keys.map((lookupKey) => ({ id: `price_${lookupKey}`, lookup_key: lookupKey })),
      }),
    },
    checkout: {
      sessions: {
        create: async (params: Stripe.Checkout.SessionCreateParams) => {
          captured.params = params;
          return { id: 'cs_categories', url: 'https://checkout.stripe.com/c/pay/cs_categories' };
        },
      },
    },
  } as unknown as Stripe;
  const env = { STRIPE_SECRET_KEY: 'rk_test_dummy', NEXT_PUBLIC_SITE_URL: 'https://findaipros.com' };
  const slugs = 'operations-workflow-automation,sales-lead-qualification,marketing-programmatic-content';
  const response = await handleCheckoutRequest(
    new Request('https://findaipros.com/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({
        plan: 'featured',
        interval: 'month',
        extra_category_quantity: 20,
        category_slugs: slugs,
      }),
    }),
    env,
    stripe,
  );
  assert.equal(response.status, 200);
  assert.equal(captured.params?.metadata?.included_categories, '3');
  assert.equal(captured.params?.metadata?.extra_category_quantity, '0');
  assert.equal(captured.params?.line_items?.length, 1);
  assert.equal(captured.params?.metadata?.category_slugs, slugs);

  const rejected = await handleCheckoutRequest(
    new Request('https://findaipros.com/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({
        plan: 'basic',
        interval: 'month',
        category_slugs: 'not-a-real-category',
      }),
    }),
    env,
    stripe,
  );
  assert.equal(rejected.status, 400);
  assert.deepEqual(await rejected.json(), { error: 'invalid_category' });
});

test('downgrade and cancel trim stored categories to the new cap', async () => {
  const slugs = [
    'operations-workflow-automation',
    'sales-lead-qualification',
    'customer-support-knowledge-base',
    'marketing-programmatic-content',
  ];
  const store = memoryBillingStore();
  store.experts.set('exp_1', {
    id: 'exp_1',
    listing_plan: 'premium',
    profile_mode: 'full',
    status: 'published',
    is_demo: false,
    categories: slugs.map((slug) => ({ slug })),
    category_slugs: slugs,
    tools: [],
  });

  const downgrade = await applyStripeEvent(
    {
      id: 'evt_downgrade',
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_1',
          customer: 'cus_1',
          status: 'active',
          metadata: {
            expert_id: 'exp_1',
            listing_tier: 'featured',
            category_slugs: slugs.join(','),
          },
          items: { data: [{ quantity: 1, price: { lookup_key: 'featured_monthly' } }] },
        },
      },
    },
    store,
  );
  assert.equal(downgrade.publicListingChanged, true);
  assert.deepEqual(store.experts.get('exp_1')?.category_slugs, slugs.slice(0, 3));
  assert.equal(store.experts.get('exp_1')?.listing_plan, 'featured');

  const basicWithExtra = await applyStripeEvent(
    {
      id: 'evt_basic_extra',
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_1',
          customer: 'cus_1',
          status: 'active',
          metadata: {
            expert_id: 'exp_1',
            listing_tier: 'basic',
            category_slugs: slugs.join(','),
            extra_category_quantity: '1',
          },
          items: {
            data: [
              { quantity: 1, price: { lookup_key: 'basic_monthly' } },
              { quantity: 1, price: { lookup_key: 'extra_category_monthly' } },
            ],
          },
        },
      },
    },
    store,
  );
  assert.equal(basicWithExtra.publicListingChanged, true);
  assert.deepEqual(store.experts.get('exp_1')?.category_slugs, slugs.slice(0, 2));

  const canceled = await applyStripeEvent(
    {
      id: 'evt_cancel_categories',
      type: 'customer.subscription.deleted',
      data: {
        object: {
          id: 'sub_1',
          customer: 'cus_1',
          status: 'canceled',
          metadata: { expert_id: 'exp_1', category_slugs: slugs.join(',') },
        },
      },
    },
    store,
  );
  assert.equal(canceled.publicListingChanged, true);
  assert.equal(store.experts.get('exp_1')?.listing_plan, 'unpaid');
  assert.deepEqual(store.experts.get('exp_1')?.category_slugs, [slugs[0]]);
});

test('directory select keeps category rows when an expert has no tools', () => {
  assert.equal(EXPERT_PUBLIC_SELECT.includes('expert_categories!inner'), true);
  assert.equal(EXPERT_PUBLIC_SELECT.includes('expert_tools!inner'), false);
  assert.equal(EXPERT_PUBLIC_SELECT.includes('expert_tools('), true);
});

const EXPERT_UUID = '11111111-1111-4111-8111-111111111111';

test('personal pay link is the apply page for one expert uuid', () => {
  assert.equal(isExpertId(EXPERT_UUID), true);
  assert.equal(isExpertId('exp_1'), false);
  assert.equal(isExpertId(''), false);
  assert.equal(personalPayPath(EXPERT_UUID), `/apply?expert=${EXPERT_UUID}#pricing`);
  assert.equal(
    personalPayLink(EXPERT_UUID),
    `https://findaipros.com/apply?expert=${EXPERT_UUID}#pricing`,
  );
  assert.equal(
    personalPayLink(EXPERT_UUID, 'https://findaipros.com/'),
    `https://findaipros.com/apply?expert=${EXPERT_UUID}#pricing`,
  );
  assert.throws(() => personalPayLink('not-a-uuid'), /expert uuid/);
});

test('checkout email prefers the paid customer details address and escapes ilike wildcards', () => {
  assert.equal(
    checkoutCustomerEmail({
      customer_email: 'other@example.com',
      customer_details: { email: ' Jane@Example.com ' },
    }),
    'jane@example.com',
  );
  assert.equal(checkoutCustomerEmail({ customer_email: 'not-an-email' }), null);
  assert.equal(checkoutCustomerEmail({ customer: { email: 'Owner@Example.com' } }), 'owner@example.com');
  assert.equal(applicationEmailIlikePattern('jane_doe%@example.com'), 'jane\\_doe\\%@example.com');
  assert.deepEqual(singleApplicationExpert(['exp_1', 'exp_1', null]), { status: 'one', expertId: 'exp_1', count: 1 });
  const ambiguous = singleApplicationExpert(['exp_1', 'exp_2']);
  assert.equal(ambiguous.status, 'ambiguous');
  if (ambiguous.status === 'ambiguous') assert.deepEqual(ambiguous.expertIds, ['exp_1', 'exp_2']);
});

test('checkout cancel url keeps a valid expert id and drops anything else', async () => {
  const captured: { params?: Stripe.Checkout.SessionCreateParams } = {};
  const stripe = {
    prices: { list: async () => ({ data: [{ id: 'price_basic', lookup_key: 'basic_monthly' }] }) },
    checkout: {
      sessions: {
        create: async (params: Stripe.Checkout.SessionCreateParams) => {
          captured.params = params;
          return { id: 'cs_pay_link', url: 'https://checkout.stripe.com/c/pay/cs_pay_link' };
        },
      },
    },
  } as unknown as Stripe;
  const env = { STRIPE_SECRET_KEY: 'rk_test_dummy', NEXT_PUBLIC_SITE_URL: 'https://findaipros.com' };
  const linked = await handleCheckoutRequest(
    new Request('https://findaipros.com/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'basic', interval: 'month', extra_category_quantity: 0, expert_id: EXPERT_UUID }),
    }),
    env,
    stripe,
  );
  assert.equal(linked.status, 200);
  assert.equal(captured.params?.cancel_url, personalPayLink(EXPERT_UUID));
  assert.equal(captured.params?.metadata?.expert_id, EXPERT_UUID);

  const plain = await handleCheckoutRequest(
    new Request('https://findaipros.com/api/stripe/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan: 'basic', interval: 'month', extra_category_quantity: 0, expert_id: 'exp_9' }),
    }),
    env,
    stripe,
  );
  assert.equal(plain.status, 200);
  assert.equal(captured.params?.cancel_url, 'https://findaipros.com/apply#pricing');
});

function paidCheckout(expertId: string | null, email: string | null, eventId = 'evt_email_link', customerId = 'cus_email') {
  return {
    id: eventId,
    type: 'checkout.session.completed',
    data: {
      object: {
        id: `cs_${eventId}`,
        payment_status: 'paid',
        customer: customerId,
        customer_details: email ? { email } : {},
        metadata: {
          listing_tier: 'basic',
          ...(expertId ? { expert_id: expertId } : {}),
        },
      },
    },
  };
}

test('completed checkout without expert_id links the one application email and does not guess', async () => {
  const store = memoryBillingStore();
  store.experts.set('exp_1', { id: 'exp_1', listing_plan: 'unpaid', contact_email: 'Jane@Example.com' });
  store.experts.set('exp_2', { id: 'exp_2', listing_plan: 'unpaid', contact_email: 'other@example.com' });
  const metadataUpdates: Record<string, string>[] = [];
  const logs = captureErrors();
  try {
    const linked = await applyStripeEvent(paidCheckout(null, 'jane@example.com'), store, {
      updateCustomerMetadata: async (_customerId, metadata) => {
        metadataUpdates.push(metadata);
      },
    });
    assert.equal(linked.action, 'applied');
    assert.equal(store.experts.get('exp_1')?.listing_plan, 'basic');
    assert.equal(store.experts.get('exp_2')?.listing_plan, 'unpaid');
    assert.equal(store.pending.length, 0);
    assert.deepEqual(metadataUpdates, [{ expert_id: 'exp_1' }]);
    assert.equal(logs.lines.some((line) => line.includes('stripe_checkout_unlinked')), false);

    store.experts.set('exp_2', { id: 'exp_2', listing_plan: 'unpaid', contact_email: 'jane@example.com' });
    const ambiguous = await applyStripeEvent(paidCheckout(null, 'jane@example.com', 'evt_ambiguous', 'cus_ambiguous'), store);
    assert.equal(ambiguous.action, 'pending_unlinked');
    assert.equal(store.experts.get('exp_1')?.listing_plan, 'basic');
    assert.equal(store.experts.get('exp_2')?.listing_plan, 'unpaid');
    assert.equal(store.pending.length, 1);
    const ambiguousLog = logs.lines.find((line) => line.includes('ambiguous_email_match'));
    assert.ok(ambiguousLog);
    assert.match(ambiguousLog, /jane@example.com/);
    assert.match(ambiguousLog, /exp_1/);
    assert.match(ambiguousLog, /exp_2/);

    const none = await applyStripeEvent(paidCheckout(null, 'missing@example.com', 'evt_none', 'cus_none'), store);
    assert.equal(none.action, 'pending_unlinked');
    assert.match(logs.lines.join('\n'), /no_email_match/);
    assert.match(logs.lines.join('\n'), /missing@example.com/);

    const noEmail = await applyStripeEvent(paidCheckout(null, null, 'evt_no_email', 'cus_no_email'), store);
    assert.equal(noEmail.action, 'pending_unlinked');
    assert.match(logs.lines.join('\n'), /missing_email/);

    const named = await applyStripeEvent(paidCheckout('exp_2', 'jane@example.com', 'evt_named', 'cus_named'), store);
    assert.equal(named.action, 'applied');
    assert.equal(store.experts.get('exp_2')?.listing_plan, 'basic');
  } finally {
    logs.restore();
  }
});

test('invoice and unpaid checkout do not match an application email', async () => {
  const store = memoryBillingStore();
  store.experts.set('exp_1', { id: 'exp_1', listing_plan: 'unpaid', contact_email: 'jane@example.com' });
  let emailLookups = 0;
  const original = store.findExpertIdsByApplicationEmail.bind(store);
  store.findExpertIdsByApplicationEmail = async (email) => {
    emailLookups += 1;
    return original(email);
  };
  const logs = captureErrors();
  try {
    const unpaid = await applyStripeEvent(
      {
        id: 'evt_unpaid_email',
        type: 'checkout.session.completed',
        data: {
          object: {
            payment_status: 'unpaid',
            customer_details: { email: 'jane@example.com' },
            metadata: { listing_tier: 'basic' },
          },
        },
      },
      store,
    );
    assert.equal(unpaid.action, 'checkout_not_paid');

    const invoice = effectForEvent({
      id: 'evt_invoice_email',
      type: 'invoice.paid',
      data: {
        object: {
          id: 'in_email',
          customer: 'cus_email',
          customer_email: 'jane@example.com',
          customer_details: { email: 'jane@example.com' },
          parent: { subscription_details: { metadata: { listing_tier: 'featured' } } },
        },
      },
    });
    assert.equal(invoice.action, 'apply');
    if (invoice.action === 'apply') assert.equal(invoice.customerEmail, undefined);

    const applied = await applyStripeEvent(
      {
        id: 'evt_invoice_email',
        type: 'invoice.paid',
        data: {
          object: {
            id: 'in_email',
            customer: 'cus_email',
            customer_email: 'jane@example.com',
            parent: { subscription_details: { metadata: { listing_tier: 'featured' } } },
          },
        },
      },
      store,
    );
    assert.equal(applied.action, 'pending_unlinked');
    assert.equal(store.experts.get('exp_1')?.listing_plan, 'unpaid');
    assert.equal(emailLookups, 0);
    assert.equal(logs.lines.some((line) => line.includes('stripe_checkout_unlinked')), false);
  } finally {
    logs.restore();
  }
});
