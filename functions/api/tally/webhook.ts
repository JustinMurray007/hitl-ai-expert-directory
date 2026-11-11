import { handleTallyWebhook } from '../../../src/lib/tally/handle';
import { supabaseTallyStore, type TallyEnv } from '../../../src/lib/tally/supabase-store';

/**
 * Tally apply-form webhook. Creates a pending_review expert and does not
 * publish it or request a Cloudflare rebuild.
 */
export async function onRequestPost(context: { request: Request; env: TallyEnv }): Promise<Response> {
  return handleTallyWebhook(context.request, context.env, supabaseTallyStore(context.env));
}
