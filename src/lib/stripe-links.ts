export type BillingPeriod = 'monthly' | 'yearly';
export type CheckoutPlan = 'basic' | 'featured' | 'premium';

/**
 * Stripe Payment Links are public URLs. They are read from NEXT_PUBLIC_
 * variables so the browser can open them. No Stripe secret key belongs here.
 * Next inlines these only when each name is written out statically.
 */
const PAYMENT_LINKS: Record<CheckoutPlan, Record<BillingPeriod, string | undefined>> = {
  basic: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_LINK_BASIC_MONTHLY,
    yearly: process.env.NEXT_PUBLIC_STRIPE_LINK_BASIC_YEARLY,
  },
  featured: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_LINK_FEATURED_MONTHLY,
    yearly: process.env.NEXT_PUBLIC_STRIPE_LINK_FEATURED_YEARLY,
  },
  premium: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_LINK_PREMIUM_MONTHLY,
    yearly: process.env.NEXT_PUBLIC_STRIPE_LINK_PREMIUM_YEARLY,
  },
};

export function stripePaymentLink(plan: CheckoutPlan, period: BillingPeriod): string | null {
  const raw = PAYMENT_LINKS[plan][period]?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:') return null;
    return url.toString();
  } catch {
    return null;
  }
}
