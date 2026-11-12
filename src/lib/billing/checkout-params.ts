import type Stripe from 'stripe';
import { includedCategoriesMetadata, CONCIERGE_MATCH_LOOKUP_KEY, CONCIERGE_MATCH_PRODUCT, type BillingInterval, type CheckoutPlan } from './catalog';
import { automaticTaxParam } from './automatic-tax';
import {
  categorySlugsMetadataValue,
  extraCategoryQuantity,
  parseCategorySlugList,
} from './category-cap';

export type CheckoutDraft = {
  plan: CheckoutPlan;
  interval: BillingInterval;
  planPriceId: string;
  extraPriceId?: string;
  extraCategoryQuantity: number;
  /** Chosen category slugs, in selection order. When set, quantity is recomputed. */
  categorySlugs?: string[];
  /** How many real categories exist. Used so extras cannot exceed the catalog. */
  categoryCatalogSize?: number;
  expertId?: string;
  referrerExpertId?: string;
  customerId?: string;
  email?: string;
  successUrl: string;
  cancelUrl: string;
  integrationIdentifier: string;
  automaticTaxFlag?: string;
};

export function randomIntegrationSuffix(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let out = '';
  for (const byte of bytes) out += alphabet[byte % alphabet.length];
  return out;
}

export function integrationIdentifier(suffix = randomIntegrationSuffix()): string {
  return `findaipros_checkout_${suffix}`;
}

export function chargedExtraCategoryQuantity(draft: Pick<CheckoutDraft, 'plan' | 'extraCategoryQuantity' | 'categorySlugs' | 'categoryCatalogSize'>): number {
  const slugs = draft.categorySlugs ? parseCategorySlugList(draft.categorySlugs.join(',')) : null;
  if (!slugs) return Math.max(0, draft.extraCategoryQuantity);
  const available = draft.categoryCatalogSize && draft.categoryCatalogSize > 0
    ? draft.categoryCatalogSize
    : slugs.length;
  return extraCategoryQuantity(slugs.length, draft.plan, available);
}

export function buildCheckoutSessionParams(draft: CheckoutDraft): Stripe.Checkout.SessionCreateParams {
  const slugs = draft.categorySlugs ? parseCategorySlugList(draft.categorySlugs.join(',')) : [];
  const extraCount = chargedExtraCategoryQuantity(draft);
  const extraQuantity = String(extraCount);
  const metadata: Stripe.MetadataParam = {
    listing_tier: draft.plan,
    included_categories: includedCategoriesMetadata(draft.plan),
    extra_category_quantity: extraQuantity,
  };
  if (slugs.length > 0) metadata.category_slugs = categorySlugsMetadataValue(slugs);
  if (draft.expertId) metadata.expert_id = draft.expertId;
  if (draft.referrerExpertId) metadata.referrer_expert_id = draft.referrerExpertId;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: draft.planPriceId, quantity: 1 },
  ];
  if (extraCount > 0) {
    if (!draft.extraPriceId) {
      throw new Error('Extra category price is required when quantity is greater than zero');
    }
    lineItems.push({ price: draft.extraPriceId, quantity: extraCount });
  }

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    line_items: lineItems,
    success_url: draft.successUrl,
    cancel_url: draft.cancelUrl,
    metadata,
    subscription_data: {
      billing_mode: { type: 'flexible' },
      metadata,
    },
    integration_identifier: draft.integrationIdentifier,
  };

  if (draft.expertId) params.client_reference_id = draft.expertId;
  if (draft.customerId) params.customer = draft.customerId;
  else if (draft.email) params.customer_email = draft.email;

  const tax = automaticTaxParam(draft.automaticTaxFlag);
  if (tax) params.automatic_tax = tax;

  return params;
}

export function buildConciergeCheckoutParams(input: {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  integrationIdentifier: string;
  email?: string;
}): Stripe.Checkout.SessionCreateParams {
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    line_items: [{ price: input.priceId, quantity: 1 }],
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: {
      product: CONCIERGE_MATCH_PRODUCT,
      lookup_key: CONCIERGE_MATCH_LOOKUP_KEY,
    },
    integration_identifier: input.integrationIdentifier,
  };
  if (input.email) params.customer_email = input.email;
  return params;
}
