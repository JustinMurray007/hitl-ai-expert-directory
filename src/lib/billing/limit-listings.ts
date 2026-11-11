import { showsPublicLinks } from '@/lib/listing';
import type { ListingPlan } from '@/lib/types';

export type LimitCandidate = {
  id: string;
  listing_plan?: ListingPlan | null;
  free_period_ends_at?: string | null;
  profile_mode?: 'full' | 'limited' | null;
  subscription_status?: string | null;
};

/**
 * Published specialists whose free window is over and who are not on an
 * active or past-due paid plan. Legacy rows with no billing fields are left
 * alone so existing directory profiles are not stripped.
 */
export function expertsToLimit(experts: LimitCandidate[], now = new Date()): string[] {
  return experts
    .filter((expert) => {
      const hasBilling =
        !!expert.listing_plan ||
        !!expert.free_period_ends_at ||
        !!expert.subscription_status ||
        expert.profile_mode === 'full';
      if (!hasBilling) return false;
      if (expert.profile_mode === 'limited') return false;
      return !showsPublicLinks(expert, now);
    })
    .map((expert) => expert.id);
}
