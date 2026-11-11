import type Stripe from 'stripe';
import { INCLUDED_CATEGORIES, type BillingInterval, type CheckoutPlan } from './catalog';
import { automaticTaxParam } from './automatic-tax';

export type CheckoutDraft = {
  plan: CheckoutPlan;
  interval: BillingInterval;
  planPriceId: string;
  extraPriceId?: string;
  extraCategoryQuantity: number;
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

export function buildCheckoutSessionParams(draft: CheckoutDraft): Stripe.Checkout.SessionCreateParams {
  const included = String(INCLUDED_CATEGORIES[draft.plan]);
  const extraQuantity = String(draft.extraCategoryQuantity);
  const metadata: Stripe.MetadataParam = {
    listing_tier: draft.plan,
    included_categories: included,
    extra_category_quantity: extraQuantity,
  };
  if (draft.expertId) metadata.expert_id = draft.expertId;
  if (draft.referrerExpertId) metadata.referrer_expert_id = draft.referrerExpertId;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    { price: draft.planPriceId, quantity: 1 },
  ];
  if (draft.extraCategoryQuantity > 0) {
    if (!draft.extraPriceId) {
      throw new Error('Extra category price is required when quantity is greater than zero');
    }
    lineItems.push({ price: draft.extraPriceId, quantity: draft.extraCategoryQuantity });
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
