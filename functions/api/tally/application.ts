import { handleApplicationLookup } from '../../../src/lib/tally/lookup';
import { supabaseSubmissionLookup } from '../../../src/lib/tally/supabase-lookup';
import type { TallyEnv } from '../../../src/lib/tally/supabase-store';

/**
 * GET /api/tally/application?submissionId=<Tally Submission ID>
 * Returns { status: pending | ready | unresolved } and, when ready, that
 * submission's expert id. Nothing else.
 */
export async function onRequestGet(context: { request: Request; env: TallyEnv }): Promise<Response> {
  return handleApplicationLookup(context.request, supabaseSubmissionLookup(context.env));
}
