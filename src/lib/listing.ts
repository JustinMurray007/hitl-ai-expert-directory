import type { Expert, ListingPlan } from './types';

export const FREE_LISTING_DAYS = 30;

const PAID_PLANS: ListingPlan[] = ['basic', 'featured', 'premium'];

export function isPaidListingPlan(plan: ListingPlan | null | undefined): boolean {
  return !!plan && PAID_PLANS.includes(plan);
}

export function freePeriodEndsAt(start: Date = new Date()): string {
  return new Date(start.getTime() + FREE_LISTING_DAYS * 24 * 60 * 60 * 1000).toISOString();
}

type LinkVisibility = {
  listing_plan?: ListingPlan | null;
  free_period_ends_at?: string | null;
  /** Set by billing webhooks. `limited` hides links even if a free window is still open. */
  profile_mode?: 'full' | 'limited' | null;
  /**
   * Stripe subscription status. `past_due` keeps a paid listing visible during retries.
   * `canceled`, `unpaid`, and `incomplete_expired` are treated as ended.
   */
  subscription_status?: string | null;
};

const ENDED_SUBSCRIPTION_STATUSES = new Set(['canceled', 'unpaid', 'incomplete_expired']);

/**
 * Website, social, booking, and match eligibility stay on during the free
 * 30 days and on any paid plan.
 *
 * They come off when a free-period end is in the past and there is no paid
 * plan, or when the plan is explicitly unpaid and the free window is not open.
 * The profile itself stays public.
 *
 * Rows with neither a plan nor a free-period end are legacy directory records.
 * Those keep links until billing fields are stored. Hiding them would strip
 * every current public profile.
 */
export function showsPublicLinks(expert: LinkVisibility, now: Date = new Date()): boolean {
  if (expert.profile_mode === 'limited') return false;
  if (expert.subscription_status && ENDED_SUBSCRIPTION_STATUSES.has(expert.subscription_status)) {
    return false;
  }

  if (isPaidListingPlan(expert.listing_plan)) return true;

  if (expert.free_period_ends_at) {
    const ends = new Date(expert.free_period_ends_at);
    if (!Number.isNaN(ends.getTime())) {
      if (ends.getTime() > now.getTime()) return true;
      return false;
    }
  }

  if (expert.listing_plan === 'unpaid') return false;

  return true;
}

export function isMatchEligible(
  expert: LinkVisibility & { status?: string },
  now: Date = new Date(),
): boolean {
  if (expert.status && expert.status !== 'published') return false;
  return showsPublicLinks(expert, now);
}

export type DirectoryExpertVisibility = {
  status?: string | null;
  is_demo?: boolean | null;
  slug?: string | null;
  categories?: readonly unknown[] | null;
  tools?: readonly unknown[] | null;
};

/**
 * Slugs that used to be their own profile and now belong to another expert.
 * `withn-tech` was the Withn Practice listing; that profile was merged into
 * Jake Read (`jake-read`). The old URL is a Cloudflare Pages redirect.
 */
const RETIRED_EXPERT_SLUGS = new Set(['withn-tech']);

export function isRetiredExpertSlug(slug: string | null | undefined): boolean {
  return typeof slug === 'string' && RETIRED_EXPERT_SLUGS.has(slug);
}

/**
 * Whether `getExperts()` includes this row in the static export.
 *
 * The directory read is published specialists only, with demo rows excluded.
 * A listing has to be in at least one category. Tools are optional: a
 * specialist with category rows and no tool rows still renders. Billing
 * rebuilds use this same predicate. Retired slugs stay out even if a
 * Supabase row is still published.
 */
/**
 * Drop listing-review fields before an expert object is sent to the browser.
 * Engagement is stored on the row and is not shown or sent.
 */
export type PublicExpert = Omit<
  Expert,
  'case_studies' | 'is_verified' | 'verified_at' | 'verified_case_study_count' | 'starting_budget' | 'primary_engagement'
>;

export function expertForPage(expert: Expert): PublicExpert {
  const {
    case_studies: _caseStudies,
    is_verified: _verified,
    verified_at: _verifiedAt,
    verified_case_study_count: _verifiedCount,
    starting_budget: _startingBudget,
    primary_engagement: _engagement,
    ...rest
  } = expert;
  return rest;
}

/** List pages do not show skill or tool tags, so those names stay off the page. */
export type DirectoryExpert = Omit<PublicExpert, 'tools' | 'bio'>;

export function expertForDirectory(expert: Expert): DirectoryExpert {
  const { tools: _tools, bio: _bio, ...rest } = expertForPage(expert);
  return rest;
}

export function isPublicDirectoryExpert(expert: DirectoryExpertVisibility): boolean {
  return (
    expert.status === 'published' &&
    expert.is_demo === false &&
    !isRetiredExpertSlug(expert.slug) &&
    Array.isArray(expert.categories) &&
    expert.categories.length > 0
  );
}

/** Public directory order ignores paid placement. */
export function compareDirectoryExperts(a: Expert, b: Expert): number {
  return a.full_name.localeCompare(b.full_name);
}
