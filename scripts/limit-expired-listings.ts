/**
 * Marks listings limited when the free 30 days are over and there is no active
 * or past-due paid subscription. Not run by the build. Requires the service role.
 *
 *   SUPABASE_SERVICE_ROLE_KEY=... NEXT_PUBLIC_SUPABASE_URL=... \
 *     node --experimental-strip-types scripts/limit-expired-listings.ts
 */
import { createClient } from '@supabase/supabase-js';
import { expertsToLimit, type LimitCandidate } from '../src/lib/billing/limit-listings';

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY. Nothing was updated.');
    process.exit(1);
  }
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client
    .from('experts')
    .select('id, listing_plan, free_period_ends_at, profile_mode, subscription_status')
    .eq('status', 'published');
  if (error) throw error;
  const ids = expertsToLimit((data || []) as LimitCandidate[]);
  if (ids.length === 0) {
    console.log('No listings to limit.');
    return;
  }
  const { error: updateError } = await client
    .from('experts')
    .update({ profile_mode: 'limited', listing_plan: 'unpaid', updated_at: new Date().toISOString() })
    .in('id', ids);
  if (updateError) throw updateError;
  console.log(`Limited ${ids.length} listing(s).`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Limit script failed');
  process.exit(1);
});
