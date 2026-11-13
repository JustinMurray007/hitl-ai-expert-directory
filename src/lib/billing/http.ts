import type Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { extraCategoryLookupKey, planLookupKey, CONCIERGE_MATCH_LOOKUP_KEY, CONCIERGE_MATCH_PRODUCT, type BillingInterval, type CheckoutPlan } from './catalog';
import { buildCheckoutSessionParams, buildConciergeCheckoutParams, integrationIdentifier } from './checkout-params';
import { isExpertId, personalPayLink } from './pay-link';
import {
  categorySlugsFitInMetadata,
  extraCategoryQuantity,
  includedCategoryCount,
  parseCategorySlugList,
} from './category-cap';
import { applyStripeEvent } from './apply-event';
import { requestProductionRebuild } from '../deploy-hook';
import { SEED_CATEGORIES } from '../seed';
import { SUBSCRIPTION_ITEM_PRICE_EXPAND, type StripeEventLike } from './events';
import type { BillingStore } from './store';
import { createStripeClient, verifyWebhookEvent } from './stripe-client';

export type BillingEnv = {
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  STRIPE_AUTOMATIC_TAX?: string;
  NEXT_PUBLIC_SITE_URL?: string;
  CRON_SECRET?: string;
  NEXT_PUBLIC_SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  /** Cloudflare Pages deploy hook. Unset means listing changes do not rebuild the site. */
  CLOUDFLARE_DEPLOY_HOOK_URL?: string;
};

const PLANS = new Set<CheckoutPlan>(['basic', 'featured', 'premium']);

function siteUrl(env: BillingEnv): string {
  return (env.NEXT_PUBLIC_SITE_URL || 'https://findaipros.com').replace(/\/$/, '');
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function isFormPost(request: Request): boolean {
  const type = request.headers.get('content-type') || '';
  return type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data');
}

async function readFields(request: Request): Promise<Record<string, string>> {
  if (isFormPost(request)) {
    const form = await request.formData();
    const fields: Record<string, string> = {};
    for (const [key, value] of form.entries()) fields[key] = String(value);
    return fields;
  }
  const body = (await request.json()) as Record<string, unknown>;
  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(body)) {
    if (value != null) fields[key] = String(value);
  }
  return fields;
}

function formError(env: BillingEnv): Response {
  return Response.redirect(`${siteUrl(env)}/apply#application`, 303);
}

function conciergeFormError(env: BillingEnv): Response {
  return Response.redirect(`${siteUrl(env)}/match?checkout=unavailable`, 303);
}

const STRIPE_SECRET_PATTERN = /\b(?:rk|sk|pk)_(?:live|test)_[A-Za-z0-9]+\b|\bwhsec_[A-Za-z0-9]+\b/g;

function logStripeFailure(operation: string, error: unknown): void {
  const record = error && typeof error === 'object' ? (error as Record<string, unknown>) : {};
  const rawMessage = typeof record.message === 'string' ? record.message : 'stripe_request_failed';
  console.error('stripe_request_failed', {
    operation,
    type: typeof record.type === 'string' ? record.type : undefined,
    code: typeof record.code === 'string' ? record.code : undefined,
    statusCode: typeof record.statusCode === 'number' ? record.statusCode : undefined,
    requestId: typeof record.requestId === 'string' ? record.requestId : undefined,
    message: rawMessage.replace(STRIPE_SECRET_PATTERN, '[redacted]').slice(0, 240),
  });
}

function stripeFailure(form: boolean, env: BillingEnv): Response {
  return form ? formError(env) : json({ error: 'stripe_error' }, 500);
}

type CheckoutBody = {
  plan?: string;
  interval?: string;
  extra_category_quantity?: number;
  category_slugs?: string;
  expert_id?: string;
  referrer_expert_id?: string;
  email?: string;
  customer_id?: string;
};

type CheckoutCategory = { slug: string; name: string };

async function checkoutCategories(env: BillingEnv): Promise<CheckoutCategory[]> {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key && url.startsWith('https://')) {
    const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await client.from('categories').select('slug, name');
    if (error) throw error;
    if (data && data.length > 0) {
      return data.map((row) => ({ slug: String(row.slug), name: String(row.name ?? row.slug) }));
    }
  }
  return SEED_CATEGORIES.map((category) => ({ slug: category.slug, name: category.name }));
}

export async function handleCheckoutRequest(
  request: Request,
  env: BillingEnv,
  stripe?: Stripe,
): Promise<Response> {
  const form = isFormPost(request);
  let fields: Record<string, string>;
  try {
    fields = await readFields(request);
  } catch {
    return form ? formError(env) : json({ error: 'invalid_json' }, 400);
  }
  if (fields.plan === 'free') {
    return form ? formError(env) : json({ error: 'free_plan_no_checkout' }, 400);
  }
  if (fields.product === CONCIERGE_MATCH_PRODUCT) {
    if (!env.STRIPE_SECRET_KEY) return form ? conciergeFormError(env) : json({ error: 'checkout_unconfigured' }, 503);
    const client = stripe ?? createStripeClient(env.STRIPE_SECRET_KEY);
    return createConciergeCheckout(form, env, client, fields.email);
  }
  if (!env.STRIPE_SECRET_KEY) return form ? formError(env) : json({ error: 'checkout_unconfigured' }, 503);
  const client = stripe ?? createStripeClient(env.STRIPE_SECRET_KEY);
  const body: CheckoutBody = {
    plan: fields.plan,
    interval: fields.interval,
    extra_category_quantity: Number(fields.extra_category_quantity || 0),
    category_slugs: fields.category_slugs,
    expert_id: fields.expert_id || undefined,
    referrer_expert_id: fields.referrer_expert_id || undefined,
    email: fields.email || undefined,
    customer_id: fields.customer_id || undefined,
  };
  if (!body.plan || !PLANS.has(body.plan as CheckoutPlan)) return form ? formError(env) : json({ error: 'invalid_plan' }, 400);
  const interval: BillingInterval = body.interval === 'year' ? 'year' : 'month';
  if (fields.interval && fields.interval !== 'month' && fields.interval !== 'year') {
    return form ? formError(env) : json({ error: 'invalid_interval' }, 400);
  }
  const plan = body.plan as CheckoutPlan;
  const slugsProvided = Object.prototype.hasOwnProperty.call(fields, 'category_slugs');
  let categorySlugs: string[] | undefined;
  let catalogSize: number | undefined;
  let extra = 0;
  if (slugsProvided) {
    const selected = parseCategorySlugList(body.category_slugs);
    if (selected.length === 0) {
      return form ? formError(env) : json({ error: 'invalid_category' }, 400);
    }
    let known: CheckoutCategory[];
    try {
      known = await checkoutCategories(env);
    } catch (error) {
      logStripeFailure('categories.list', error);
      return form ? formError(env) : json({ error: 'categories_unavailable' }, 500);
    }
    const knownSlugs = new Set(known.map((category) => category.slug));
    if (selected.some((slug) => !knownSlugs.has(slug))) {
      return form ? formError(env) : json({ error: 'invalid_category' }, 400);
    }
    if (!categorySlugsFitInMetadata(selected)) {
      return form ? formError(env) : json({ error: 'category_slugs_too_long' }, 400);
    }
    const cap = includedCategoryCount(plan, known.length);
    if (selected.length > cap) {
      return form ? formError(env) : json({ error: 'too_many_categories' }, 400);
    }
    catalogSize = known.length;
    categorySlugs = selected;
    extra = extraCategoryQuantity(selected.length, plan, known.length);
  } else {
    // No selection was sent. Do not charge for extras the specialist did not pick.
    const requested = Number(body.extra_category_quantity || 0);
    if (!Number.isInteger(requested) || requested < 0) {
      return form ? formError(env) : json({ error: 'invalid_extra_quantity' }, 400);
    }
    extra = 0;
  }

  const lookupKeys = [planLookupKey(plan, interval)];
  if (extra > 0) lookupKeys.push(extraCategoryLookupKey(interval));
  let prices;
  try {
    prices = await client.prices.list({ lookup_keys: lookupKeys, limit: 10 });
  } catch (error) {
    logStripeFailure('prices.list', error);
    return stripeFailure(form, env);
  }
  const planPrice = prices.data.find((price) => price.lookup_key === lookupKeys[0]);
  const extraPrice = extra > 0 ? prices.data.find((price) => price.lookup_key === lookupKeys[1]) : undefined;
  if (!planPrice) return form ? formError(env) : json({ error: 'price_not_found' }, 500);
  if (extra > 0 && !extraPrice) return form ? formError(env) : json({ error: 'extra_price_not_found' }, 500);

  const origin = siteUrl(env);
  const params = buildCheckoutSessionParams({
    plan,
    interval,
    planPriceId: planPrice.id,
    extraPriceId: extraPrice?.id,
    extraCategoryQuantity: extra,
    categorySlugs,
    categoryCatalogSize: catalogSize,
    expertId: body.expert_id,
    referrerExpertId: body.referrer_expert_id,
    customerId: body.customer_id,
    email: body.email,
    successUrl: `${origin}/apply/success?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: isExpertId(body.expert_id) ? personalPayLink(body.expert_id, origin) : `${origin}/apply#pricing`,
    integrationIdentifier: integrationIdentifier(),
    automaticTaxFlag: env.STRIPE_AUTOMATIC_TAX,
  });

  let session;
  try {
    session = await client.checkout.sessions.create(params);
  } catch (error) {
    logStripeFailure('checkout.sessions.create', error);
    return stripeFailure(form, env);
  }
  if (!session.url) return form ? formError(env) : json({ error: 'missing_checkout_url' }, 500);
  if (form) return Response.redirect(session.url, 303);
  return json({ url: session.url, id: session.id });
}

async function createConciergeCheckout(
  form: boolean,
  env: BillingEnv,
  client: Stripe,
  email: string | undefined,
): Promise<Response> {
  const origin = siteUrl(env);
  let prices;
  try {
    prices = await client.prices.list({ lookup_keys: [CONCIERGE_MATCH_LOOKUP_KEY], limit: 1 });
  } catch (error) {
    logStripeFailure('prices.list', error);
    return form ? conciergeFormError(env) : json({ error: 'stripe_error' }, 500);
  }
  const price = prices.data.find((row) => row.lookup_key === CONCIERGE_MATCH_LOOKUP_KEY);
  if (!price) return form ? conciergeFormError(env) : json({ error: 'price_not_found' }, 500);

  const params = buildConciergeCheckoutParams({
    priceId: price.id,
    successUrl: `${origin}/match/thanks?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${origin}/match`,
    integrationIdentifier: integrationIdentifier(),
    email: email || undefined,
  });

  let session;
  try {
    session = await client.checkout.sessions.create(params);
  } catch (error) {
    logStripeFailure('checkout.sessions.create', error);
    return form ? conciergeFormError(env) : json({ error: 'stripe_error' }, 500);
  }
  if (!session.url) return form ? conciergeFormError(env) : json({ error: 'missing_checkout_url' }, 500);
  if (form) return Response.redirect(session.url, 303);
  return json({ url: session.url, id: session.id });
}

export async function handleWebhookRequest(
  request: Request,
  env: BillingEnv,
  store: BillingStore,
  stripe?: Stripe,
): Promise<Response> {
  if (!env.STRIPE_WEBHOOK_SECRET || !env.STRIPE_SECRET_KEY) return json({ error: 'webhook_unconfigured' }, 503);
  const client = stripe ?? createStripeClient(env.STRIPE_SECRET_KEY);
  const signature = request.headers.get('stripe-signature');
  if (!signature) return json({ error: 'missing_signature' }, 400);
  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = await verifyWebhookEvent(client, payload, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return json({ error: 'invalid_signature' }, 400);
  }
  let result;
  try {
    result = await applyStripeEvent(event as unknown as StripeEventLike, store, {
      updateCustomerMetadata: async (customerId, metadata) => {
        await client.customers.update(customerId, { metadata });
      },
      retrieveSubscription: async (subscriptionId) => {
        const subscription = await client.subscriptions.retrieve(subscriptionId, {
          expand: [...SUBSCRIPTION_ITEM_PRICE_EXPAND],
        });
        return subscription as unknown as Record<string, unknown>;
      },
    });
  } catch {
    return json({ error: 'webhook_failed' }, 500);
  }
  if (result.publicListingChanged) {
    await requestProductionRebuild('stripe_webhook', env);
  }
  return json({
    ok: result.ok,
    ...(result.duplicate ? { duplicate: true } : {}),
    action: result.action,
  });
}

export async function handlePortalRequest(
  request: Request,
  env: BillingEnv,
  stripe?: Stripe,
): Promise<Response> {
  const form = isFormPost(request);
  if (!env.STRIPE_SECRET_KEY) return form ? formError(env) : json({ error: 'portal_unconfigured' }, 503);
  const client = stripe ?? createStripeClient(env.STRIPE_SECRET_KEY);
  let fields: Record<string, string>;
  try {
    fields = await readFields(request);
  } catch {
    return form ? formError(env) : json({ error: 'invalid_json' }, 400);
  }
  if (!fields.checkout_session_id) return form ? formError(env) : json({ error: 'missing_session' }, 400);
  let session;
  try {
    session = await client.checkout.sessions.retrieve(fields.checkout_session_id);
  } catch (error) {
    logStripeFailure('checkout.sessions.retrieve', error);
    return stripeFailure(form, env);
  }
  const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
  if (session.payment_status !== 'paid' || !customerId) return form ? formError(env) : json({ error: 'session_not_paid' }, 403);
  let portal;
  try {
    portal = await client.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${siteUrl(env)}/apply/success?session_id=${encodeURIComponent(session.id)}`,
    });
  } catch (error) {
    logStripeFailure('billingPortal.sessions.create', error);
    return stripeFailure(form, env);
  }
  if (form) return Response.redirect(portal.url, 303);
  return json({ url: portal.url });
}
