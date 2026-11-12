import { createClient } from '@supabase/supabase-js';
import { isTallySubmissionId, type SubmissionLink, type SubmissionLookup } from './lookup';
import type { TallyEnv } from './supabase-store';

/**
 * Service-role read of tally_submissions for the applicant's own id.
 * Selects the link columns only, never the payload or contact email.
 */
export function supabaseSubmissionLookup(env: TallyEnv): SubmissionLookup {
  return {
    async findByTallyId(id: string): Promise<SubmissionLink[]> {
      if (!isTallySubmissionId(id)) return [];
      const url = env.NEXT_PUBLIC_SUPABASE_URL;
      const key = env.SUPABASE_SERVICE_ROLE_KEY;
      if (!url || !key || !url.startsWith('https://')) return [];
      const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
      const { data, error } = await db
        .from('tally_submissions')
        .select('response_id, submission_id, expert_id, status')
        .or(`response_id.eq.${id},submission_id.eq.${id}`)
        .limit(5);
      if (error) throw error;
      return (data ?? []).map((row) => ({
        responseId: String(row.response_id ?? ''),
        submissionId: row.submission_id ? String(row.submission_id) : null,
        expertId: row.expert_id ? String(row.expert_id) : null,
        status: typeof row.status === 'string' ? row.status : '',
      }));
    },
  };
}
