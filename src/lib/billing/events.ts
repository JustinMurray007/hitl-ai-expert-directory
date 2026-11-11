import type { ListingPlan } from '@/lib/types';
import {
  intervalFromLookupKey,
  isExtraCategoryLookupKey,
  tierFromLookupKey,
  type BillingInterval,
  type CheckoutPlan,
} from './catalog';
import { referralCreditCents } from './referral';

export type BillingPatch = {
  listing_plan?: ListingPlan;
  profile_mode?: 'full' | 'limited';
  subscription_status?: string;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
  stripe_price_lookup_key?: string | null;
  billing_interval?: BillingInterval | null;
  current_period_end?: string | null;
  cancel_at?: string | null;
  extra_category_quantity?: number;
  referrer_expert_id?: string | null;
};

export type ReferralDraft = {
  stripeInvoiceId: string;
  amountCents: number;
  currency: string;
  referrerExpertId: string;
  expertId: string;
};

export type BillingEffect =
  | { action: 'ignore'; reason: string }
  | { action: 'apply'; expertId: string | null; customerId: string | null; patch: BillingPatch; referral?: ReferralDraft; customerMetadata?: Record<string, string> }
  | { action: 'reverse_referral'; invoiceId: string | null };

export type StripeEventLike = {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function str(obj: Record<string, unknown>, key: string): string | null {
  const value = obj[key];
  return typeof value === 'string' && value.length > 0 ? value : null;
}

function num(obj: Record<string, unknown>, key: string): number | null {
  const value = obj[key];
  return typeof value === 'number' ? value : null;
}

function meta(obj: Record<string, unknown>): Record<string, unknown> {
  return isRecord(obj.metadata) ? obj.metadata : {};
}

function idOf(value: unknown): string | null {
  if (typeof value === 'string' && value.length > 0) return value;
  if (isRecord(value)) return str(value, 'id');
  return null;
}

function unixToIso(value: number | null): string | null {
  if (value == null) return null;
  return new Date(value * 1000).toISOString();
}

type ItemSummary = {
  tier: CheckoutPlan | null;
  lookupKey: string | null;
  interval: BillingInterval | null;
  extraQuantity: number;
  periodEnd: number | null;
};

function summarizeItems(subscription: Record<string, unknown>): ItemSummary {
  const items = isRecord(subscription.items) ? subscription.items.data : null;
  const summary: ItemSummary = {
    tier: null,
    lookupKey: null,
    interval: null,
    extraQuantity: 0,
    periodEnd: null,
  };
  if (!Array.isArray(items)) return summary;
  for (const item of items) {
    if (!isRecord(item)) continue;
    const price = isRecord(item.price) ? item.price : null;
    const lookupKey = price ? str(price, 'lookup_key') : null;
    const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
    const periodEnd = num(item, 'current_period_end');
    if (periodEnd != null) summary.periodEnd = periodEnd;
    if (isExtraCategoryLookupKey(lookupKey)) {
      summary.extraQuantity += quantity;
      continue;
    }
    const tier = tierFromLookupKey(lookupKey);
    if (tier) {
      summary.tier = tier;
      summary.lookupKey = lookupKey;
      summary.interval = intervalFromLookupKey(lookupKey);
    }
  }
  return summary;
}

function expertIdFrom(object: Record<string, unknown>, subscription?: Record<string, unknown>): string | null {
  const fromMeta = str(meta(object), 'expert_id');
  if (fromMeta) return fromMeta;
  const reference = str(object, 'client_reference_id');
  if (reference) return reference;
  if (subscription) return str(meta(subscription), 'expert_id');
  return null;
}

function paidPatch(object: Record<string, unknown>, subscription: Record<string, unknown> | null): BillingPatch {
  const items = subscription ? summarizeItems(subscription) : null;
  const metadataTier = str(meta(object), 'listing_tier') || (subscription ? str(meta(subscription), 'listing_tier') : null);
  const tier = items?.tier || (metadataTier === 'basic' || metadataTier === 'featured' || metadataTier === 'premium' ? metadataTier : null);
  const extraFromMeta = str(meta(object), 'extra_category_quantity') || (subscription ? str(meta(subscription), 'extra_category_quantity') : null);
  const referrer = str(meta(object), 'referrer_expert_id') || (subscription ? str(meta(subscription), 'referrer_expert_id') : null);
  const patch: BillingPatch = {
    profile_mode: 'full',
    subscription_status: subscription ? str(subscription, 'status') || 'active' : 'active',
  };
  if (tier) patch.listing_plan = tier;
  if (items?.lookupKey) patch.stripe_price_lookup_key = items.lookupKey;
  if (items?.interval) patch.billing_interval = items.interval;
  if (items && items.extraQuantity > 0) patch.extra_category_quantity = items.extraQuantity;
  else if (extraFromMeta && Number.isFinite(Number(extraFromMeta))) patch.extra_category_quantity = Number(extraFromMeta);
  if (referrer) patch.referrer_expert_id = referrer;
  const customerId = idOf(object.customer) || (subscription ? idOf(subscription.customer) : null);
  const subscriptionId = idOf(object.subscription) || (subscription ? str(subscription, 'id') : null);
  if (customerId) patch.stripe_customer_id = customerId;
  if (subscriptionId) patch.stripe_subscription_id = subscriptionId;
  if (subscription) {
    patch.cancel_at = unixToIso(num(subscription, 'cancel_at'));
    if (items?.periodEnd) patch.current_period_end = unixToIso(items.periodEnd);
  }
  return patch;
}

const PAID_LISTING_STATUSES = new Set(['active', 'trialing']);
const ENDED_LISTING_STATUSES = new Set(['canceled', 'unpaid', 'incomplete_expired']);

/**
 * Listing tier and profile mode follow the subscription's current status.
 * Stripe does not order webhooks, so a paid invoice can arrive after the
 * subscription is already canceled. Only active and trialing grant a paid
 * listing. Ended statuses limit it. Any other status is recorded without
 * upgrading the row.
 */
function reconcileListingWithSubscription(
  patch: BillingPatch,
  subscription: Record<string, unknown> | null,
): BillingPatch {
  if (!subscription) return patch;
  const status = str(subscription, 'status') || 'active';
  patch.subscription_status = status;
  if (PAID_LISTING_STATUSES.has(status)) {
    patch.profile_mode = 'full';
    return patch;
  }
  if (ENDED_LISTING_STATUSES.has(status)) {
    patch.listing_plan = 'unpaid';
    patch.profile_mode = 'limited';
    return patch;
  }
  delete patch.listing_plan;
  delete patch.profile_mode;
  delete patch.stripe_price_lookup_key;
  delete patch.billing_interval;
  delete patch.extra_category_quantity;
  return patch;
}

function subscriptionObject(sessionOrSub: Record<string, unknown>): Record<string, unknown> | null {
  return isRecord(sessionOrSub.subscription) ? sessionOrSub.subscription : null;
}

function metadataSlugValue(record: Record<string, unknown> | null): string | null {
  if (!record || !isRecord(record.metadata)) return null;
  return str(record.metadata, 'category_slugs');
}

/** Chosen category slugs carried on the Checkout Session or its subscription. */
export function categorySlugMetadata(event: StripeEventLike): string | null {
  const object = event.data.object;
  const direct = metadataSlugValue(object);
  if (direct) return direct;
  const subscription = subscriptionObject(object);
  const fromSubscription = metadataSlugValue(subscription);
  if (fromSubscription) return fromSubscription;
  const parent = isRecord(object.parent) ? object.parent : null;
  const details = parent && isRecord(parent.subscription_details) ? parent.subscription_details : null;
  if (!details) return null;
  if (isRecord(details.metadata)) {
    const fromDetails = str(details.metadata, 'category_slugs');
    if (fromDetails) return fromDetails;
  }
  if (isRecord(details.subscription)) return metadataSlugValue(details.subscription);
  return null;
}

/** Stripe webhook payloads usually send the subscription as an id. Retrieve with items.data.price expanded. */
export const SUBSCRIPTION_ITEM_PRICE_EXPAND = ['items.data.price'] as const;

export async function withExpandedSubscriptions(
  event: StripeEventLike,
  retrieveSubscription: (subscriptionId: string) => Promise<Record<string, unknown>>,
): Promise<StripeEventLike> {
  const object = { ...event.data.object };

  if (
    (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') &&
    typeof object.subscription === 'string' &&
    object.subscription.length > 0
  ) {
    object.subscription = await retrieveSubscription(object.subscription);
  }

  if (event.type === 'invoice.paid' && isRecord(object.parent)) {
    const parent = { ...object.parent };
    if (isRecord(parent.subscription_details)) {
      const details = { ...parent.subscription_details };
      if (typeof details.subscription === 'string' && details.subscription.length > 0) {
        details.subscription = await retrieveSubscription(details.subscription);
        parent.subscription_details = details;
        object.parent = parent;
      }
    }
  }

  return { ...event, data: { object } };
}

export function effectForEvent(event: StripeEventLike): BillingEffect {
  const object = event.data.object;

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const paymentStatus = str(object, 'payment_status');
    if (event.type === 'checkout.session.completed' && paymentStatus !== 'paid') {
      return { action: 'ignore', reason: 'checkout_not_paid' };
    }
    const subscription = subscriptionObject(object);
    const expertId = expertIdFrom(object, subscription || undefined);
    const patch = reconcileListingWithSubscription(paidPatch(object, subscription), subscription);
    const customerId = patch.stripe_customer_id || null;
    const customerMetadata: Record<string, string> = {};
    if (expertId) customerMetadata.expert_id = expertId;
    if (patch.referrer_expert_id) customerMetadata.referrer_expert_id = patch.referrer_expert_id;
    return {
      action: 'apply',
      expertId,
      customerId,
      patch,
      customerMetadata: Object.keys(customerMetadata).length ? customerMetadata : undefined,
    };
  }

  if (event.type === 'checkout.session.async_payment_failed') {
    return { action: 'ignore', reason: 'async_payment_failed' };
  }

  if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
    const status = str(object, 'status') || '';
    const expertId = expertIdFrom(object, object);
    // The event object is the subscription. Ended statuses limit the listing
    // here, so this handler does not re-grant a paid plan the way invoice.paid
    // used to after a canceled subscription was fetched. past_due still keeps
    // the paid plan while Stripe retries.
    if (status === 'canceled' || status === 'unpaid' || status === 'incomplete_expired') {
      return {
        action: 'apply',
        expertId,
        customerId: idOf(object.customer),
        patch: {
          listing_plan: 'unpaid',
          profile_mode: 'limited',
          subscription_status: status,
          stripe_subscription_id: str(object, 'id'),
          stripe_customer_id: idOf(object.customer),
          cancel_at: unixToIso(num(object, 'cancel_at')),
        },
      };
    }
    if (status === 'incomplete') {
      return {
        action: 'apply',
        expertId,
        customerId: idOf(object.customer),
        patch: {
          subscription_status: status,
          stripe_subscription_id: str(object, 'id'),
          stripe_customer_id: idOf(object.customer),
        },
      };
    }
    const patch = paidPatch(object, object);
    if (status === 'past_due') patch.subscription_status = 'past_due';
    return { action: 'apply', expertId, customerId: idOf(object.customer), patch };
  }

  if (event.type === 'customer.subscription.deleted') {
    return {
      action: 'apply',
      expertId: expertIdFrom(object, object),
      customerId: idOf(object.customer),
      patch: {
        listing_plan: 'unpaid',
        profile_mode: 'limited',
        subscription_status: 'canceled',
        stripe_subscription_id: str(object, 'id'),
        stripe_customer_id: idOf(object.customer),
        cancel_at: unixToIso(num(object, 'cancel_at')),
      },
    };
  }

  if (event.type === 'invoice.paid') {
    const parent = isRecord(object.parent) ? object.parent : null;
    const details = parent && isRecord(parent.subscription_details) ? parent.subscription_details : null;
    const subscription = details && isRecord(details.subscription) ? details.subscription : null;
    const subscriptionMeta = details && isRecord(details.metadata) ? details.metadata : {};
    const expertId = str(subscriptionMeta, 'expert_id') || (subscription ? str(meta(subscription), 'expert_id') : null);
    const referrer = str(subscriptionMeta, 'referrer_expert_id') || (subscription ? str(meta(subscription), 'referrer_expert_id') : null);
    const patch = reconcileListingWithSubscription(
      paidPatch(
        {
          ...object,
          metadata: subscriptionMeta,
          customer: object.customer,
          subscription: subscription || idOf(details?.subscription),
        },
        subscription,
      ),
      subscription,
    );
    const invoiceId = str(object, 'id');
    const referral =
      referrer && expertId && invoiceId
        ? {
            stripeInvoiceId: invoiceId,
            amountCents: referralCreditCents({
              total_excluding_tax: num(object, 'total_excluding_tax'),
              subtotal: num(object, 'subtotal'),
              amount_paid: num(object, 'amount_paid'),
            }),
            currency: str(object, 'currency') || 'usd',
            referrerExpertId: referrer,
            expertId,
          }
        : undefined;
    return {
      action: 'apply',
      expertId,
      customerId: idOf(object.customer),
      patch,
      referral: referral && referral.amountCents > 0 ? referral : undefined,
    };
  }

  if (event.type === 'invoice.payment_failed') {
    const parent = isRecord(object.parent) ? object.parent : null;
    const details = parent && isRecord(parent.subscription_details) ? parent.subscription_details : null;
    const subscriptionMeta = details && isRecord(details.metadata) ? details.metadata : {};
    return {
      action: 'apply',
      expertId: str(subscriptionMeta, 'expert_id'),
      customerId: idOf(object.customer),
      patch: {
        subscription_status: 'past_due',
      },
    };
  }

  if (event.type === 'charge.refunded') {
    const invoice = object.invoice;
    return { action: 'reverse_referral', invoiceId: idOf(invoice) };
  }

  return { action: 'ignore', reason: 'unhandled_event' };
}
