import assert from 'node:assert/strict';
import test from 'node:test';
import type Stripe from 'stripe';
import { automaticTaxParam, AUTOMATIC_TAX_ALLOWED } from './automatic-tax';
import { buildCheckoutSessionParams, integrationIdentifier } from './checkout-params';
import { CATALOG_PRICES, isLiveStripeKey, isTestStripeKey } from './catalog';
import { effectForEvent, SUBSCRIPTION_ITEM_PRICE_EXPAND } from './events';
import { applyStripeEvent } from './apply-event';
import { memoryBillingStore } from './store';
import { referralCreditCents } from './referral';
import { expertsToLimit } from './limit-listings';
import { showsPublicLinks } from '../listing';
import { handleCheckoutRequest, handleWebhookRequest } from './http';

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
  assert.equal(params.metadata?.included_categories, '4');
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
