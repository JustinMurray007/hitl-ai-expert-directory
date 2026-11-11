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

/**
 * Premium Featured, then Featured, then the existing sponsor rank.
 * Case-study count is not a ranking signal.
 * Legacy rows with no listing_plan keep the previous sponsor_rank order.
 */
export function compareDirectoryExperts(a: Expert, b: Expert): number {
  const tier = (expert: Expert) => {
    if (expert.listing_plan === 'premium') return 3;
    if (expert.listing_plan === 'featured') return 2;
    return 0;
  };
  const byPlan = tier(b) - tier(a);
  if (byPlan !== 0) return byPlan;
  const bySponsor = (b.sponsor_rank || 0) - (a.sponsor_rank || 0);
  if (bySponsor !== 0) return bySponsor;
  return Number(b.is_verified) - Number(a.is_verified);
}
