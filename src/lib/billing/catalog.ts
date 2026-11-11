export const STRIPE_API_VERSION = '2026-09-30.endive' as const;

export type CheckoutPlan = 'basic' | 'featured' | 'premium';
export type BillingInterval = 'month' | 'year';

/**
 * Categories included before extras.
 * Premium is every category that exists at checkout, so it is not a fixed count.
 */
export const INCLUDED_CATEGORIES: Record<CheckoutPlan, number | 'all'> = {
  basic: 1,
  featured: 3,
  premium: 'all',
};

export function includedCategoriesMetadata(plan: CheckoutPlan): string {
  const included = INCLUDED_CATEGORIES[plan];
  return included === 'all' ? 'all' : String(included);
}

export type CatalogPrice = {
  productName: string;
  tier: CheckoutPlan | 'extra_category';
  nickname: string;
  unitAmount: number;
  interval: BillingInterval;
  lookupKey: string;
};

/** Sandbox catalog. Amounts are tax-exclusive USD cents. */
export const CATALOG_PRICES: CatalogPrice[] = [
  { productName: 'Find Ai Pros Basic Listing', tier: 'basic', nickname: 'Basic monthly', unitAmount: 999, interval: 'month', lookupKey: 'basic_monthly' },
  { productName: 'Find Ai Pros Basic Listing', tier: 'basic', nickname: 'Basic yearly', unitAmount: 7900, interval: 'year', lookupKey: 'basic_yearly' },
  { productName: 'Find Ai Pros Featured Listing', tier: 'featured', nickname: 'Featured monthly', unitAmount: 2999, interval: 'month', lookupKey: 'featured_monthly' },
  { productName: 'Find Ai Pros Featured Listing', tier: 'featured', nickname: 'Featured yearly', unitAmount: 29999, interval: 'year', lookupKey: 'featured_yearly' },
  { productName: 'Find Ai Pros Premium Featured Listing', tier: 'premium', nickname: 'Premium monthly', unitAmount: 5999, interval: 'month', lookupKey: 'premium_monthly' },
  { productName: 'Find Ai Pros Premium Featured Listing', tier: 'premium', nickname: 'Premium yearly', unitAmount: 59999, interval: 'year', lookupKey: 'premium_yearly' },
  { productName: 'Find Ai Pros Extra Category', tier: 'extra_category', nickname: 'Extra category monthly', unitAmount: 999, interval: 'month', lookupKey: 'extra_category_monthly' },
  { productName: 'Find Ai Pros Extra Category', tier: 'extra_category', nickname: 'Extra category yearly', unitAmount: 7900, interval: 'year', lookupKey: 'extra_category_yearly' },
];

export function planLookupKey(plan: CheckoutPlan, interval: BillingInterval): string {
  const suffix = interval === 'month' ? 'monthly' : 'yearly';
  return `${plan}_${suffix}`;
}

export function extraCategoryLookupKey(interval: BillingInterval): string {
  return interval === 'month' ? 'extra_category_monthly' : 'extra_category_yearly';
}

export function tierFromLookupKey(lookupKey: string | null | undefined): CheckoutPlan | null {
  if (!lookupKey) return null;
  if (lookupKey.startsWith('basic_')) return 'basic';
  if (lookupKey.startsWith('featured_')) return 'featured';
  if (lookupKey.startsWith('premium_')) return 'premium';
  return null;
}

export function intervalFromLookupKey(lookupKey: string | null | undefined): BillingInterval | null {
  if (!lookupKey) return null;
  if (lookupKey.endsWith('_monthly')) return 'month';
  if (lookupKey.endsWith('_yearly')) return 'year';
  return null;
}

export function isExtraCategoryLookupKey(lookupKey: string | null | undefined): boolean {
  return !!lookupKey && lookupKey.startsWith('extra_category_');
}

/** The catalog script refuses live keys. Runtime checkout may use a live restricted key later. */
export function isLiveStripeKey(key: string): boolean {
  return key.startsWith('sk_live_') || key.startsWith('rk_live_');
}

export function isTestStripeKey(key: string): boolean {
  return key.startsWith('sk_test_') || key.startsWith('rk_test_');
}
