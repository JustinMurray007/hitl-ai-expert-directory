import { createClient } from '@supabase/supabase-js';
import { expertsToLimit, type LimitCandidate } from '../../../src/lib/billing/limit-listings';
import type { BillingEnv } from '../../../src/lib/billing/http';

export async function onRequestPost(context: { request: Request; env: BillingEnv }): Promise<Response> {
  const secret = context.env.CRON_SECRET;
  const header = context.request.headers.get('authorization');
  if (!secret || header !== `Bearer ${secret}`) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401 });
  }
  const url = context.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = context.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return new Response(JSON.stringify({ error: 'supabase_unconfigured' }), { status: 503 });
  }
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await client
    .from('experts')
    .select('id, listing_plan, free_period_ends_at, profile_mode, subscription_status')
    .eq('status', 'published');
  if (error) {
    return new Response(JSON.stringify({ error: 'query_failed' }), { status: 500 });
  }
  const ids = expertsToLimit((data || []) as LimitCandidate[]);
  if (ids.length === 0) {
    return new Response(JSON.stringify({ limited: 0 }));
  }
  const { error: updateError } = await client
    .from('experts')
    .update({ profile_mode: 'limited', listing_plan: 'unpaid', updated_at: new Date().toISOString() })
    .in('id', ids);
  if (updateError) {
    return new Response(JSON.stringify({ error: 'update_failed' }), { status: 500 });
  }
  return new Response(JSON.stringify({ limited: ids.length }), { headers: { 'content-type': 'application/json' } });
}
