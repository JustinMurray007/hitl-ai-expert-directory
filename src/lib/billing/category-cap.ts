import {
  INCLUDED_CATEGORIES,
  includedCategoriesMetadata,
  type CheckoutPlan,
} from './catalog';

/** A free 30-day listing, and a canceled listing, stay in one category. */
export const FREE_INCLUDED_CATEGORIES = 1;

/** Stripe metadata values cannot exceed 500 characters. */
export const CATEGORY_SLUGS_METADATA_LIMIT = 500;

export type ListingTier = CheckoutPlan | 'unpaid';

export type CategorySync = {
  /** replace: write the chosen slugs, trimmed to the cap. trim: keep the first cap already stored. */
  mode: 'replace' | 'trim';
  slugs?: string[];
  cap: number;
};

export function includedCategoryCount(plan: ListingTier | null | undefined, available: number): number {
  const catalog = Math.max(0, available);
  if (plan === 'premium') return catalog;
  if (plan === 'featured') return Math.min(3, catalog);
  if (plan === 'basic') return Math.min(1, catalog);
  return Math.min(FREE_INCLUDED_CATEGORIES, catalog);
}

/**
 * Extras charged at checkout. Premium never pays for extras.
 * The quantity is the overflow past the plan's included categories, and it
 * cannot exceed the categories actually selected.
 */
export function extraCategoryQuantity(
  selectedCount: number,
  plan: CheckoutPlan,
  availableCount: number,
): number {
  if (plan === 'premium') return 0;
  const selected = Math.max(0, Math.min(selectedCount, Math.max(0, availableCount)));
  const included = includedCategoryCount(plan, availableCount);
  return Math.max(0, selected - included);
}

/**
 * How many category rows a listing may keep.
 * Premium is every category. Unpaid and canceled listings keep the free cap.
 * Basic and Featured add the paid extra quantity on top of the included count.
 */
export function categoryCapForListing(
  plan: ListingTier | null | undefined,
  extraQuantity: number,
  available?: number,
): number {
  if (plan === 'premium') {
    return available == null ? Number.MAX_SAFE_INTEGER : Math.max(0, available);
  }
  const included =
    plan === 'featured' ? 3 : plan === 'basic' ? 1 : FREE_INCLUDED_CATEGORIES;
  const extras = plan === 'basic' || plan === 'featured' ? Math.max(0, extraQuantity) : 0;
  const cap = included + extras;
  return available == null ? cap : Math.min(cap, Math.max(0, available));
}

/** Keep the first N unique slugs, in the order they were chosen. */
export function trimCategorySlugs(slugs: readonly string[], cap: number): string[] {
  const limit = Math.max(0, cap);
  const seen = new Set<string>();
  const kept: string[] = [];
  for (const slug of slugs) {
    const trimmed = slug.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    kept.push(trimmed);
    if (kept.length >= limit) break;
  }
  return kept;
}

export function parseCategorySlugList(value: string | null | undefined): string[] {
  if (!value) return [];
  return trimCategorySlugs(value.split(','), Number.MAX_SAFE_INTEGER);
}

export function includedCategoryPhrase(plan: CheckoutPlan, available: number): string {
  if (plan === 'premium' || INCLUDED_CATEGORIES[plan] === 'all') return 'every category';
  const count = includedCategoryCount(plan, available);
  return count === 1 ? '1 category' : `${count} categories`;
}

export function listingCategorySync(
  patch: {
    listing_plan?: string | null;
    profile_mode?: string | null;
    extra_category_quantity?: number;
  },
  categorySlugsRaw: string | null,
): CategorySync | null {
  const plan = patch.listing_plan;
  if (plan === 'unpaid') {
    return { mode: 'trim', cap: FREE_INCLUDED_CATEGORIES };
  }
  if (plan === 'basic' || plan === 'featured' || plan === 'premium') {
    const cap = categoryCapForListing(plan, patch.extra_category_quantity ?? 0);
    const slugs = parseCategorySlugList(categorySlugsRaw);
    if (slugs.length > 0) return { mode: 'replace', slugs, cap };
    return { mode: 'trim', cap };
  }
  if (patch.profile_mode === 'limited') {
    return { mode: 'trim', cap: FREE_INCLUDED_CATEGORIES };
  }
  return null;
}

export function categorySlugsMetadataValue(slugs: readonly string[]): string {
  return slugs.join(',');
}

export function categorySlugsFitInMetadata(slugs: readonly string[]): boolean {
  return categorySlugsMetadataValue(slugs).length <= CATEGORY_SLUGS_METADATA_LIMIT;
}

export { includedCategoriesMetadata };
