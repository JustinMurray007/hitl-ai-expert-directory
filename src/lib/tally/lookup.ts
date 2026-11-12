import { isExpertId } from '../billing/pay-link';

/**
 * Tally's redirect mention is "Submission ID" (unique identifier of a response).
 * The webhook stores that value on response_id and, when present, submission_id.
 * Ids are at least 6 letters or digits. See tally.so/help/redirect-on-completion.
 */
const TALLY_SUBMISSION_ID = /^[A-Za-z0-9_-]{6,80}$/;

const ID_PARAMS = ['submissionId', 'responseId', 'submission_id', 'response_id'] as const;

export type SubmissionLink = {
  responseId: string;
  submissionId: string | null;
  expertId: string | null;
  status: string;
};

export type SubmissionLookupResult =
  | { status: 'pending' }
  | { status: 'ready'; expertId: string }
  | { status: 'unresolved' };

export type SubmissionLookup = {
  findByTallyId(id: string): Promise<SubmissionLink[]>;
};

export function isTallySubmissionId(value: string | null | undefined): value is string {
  return typeof value === 'string' && TALLY_SUBMISSION_ID.test(value);
}

/** First id Tally can insert. submissionId is the documented redirect parameter. */
export function tallyIdFromSearch(params: { get(name: string): string | null }): string | null {
  for (const key of ID_PARAMS) {
    const value = params.get(key)?.trim() ?? '';
    if (isTallySubmissionId(value)) return value;
  }
  return null;
}

/**
 * Resolve one submission id to that row's expert. Another row's expert id is
 * never returned. A missing row stays pending so the thanks page can wait for
 * the webhook. A finished row with no single expert stays unresolved.
 */
export function resolveOwnSubmission(requestedId: string, rows: readonly SubmissionLink[]): SubmissionLookupResult {
  const id = requestedId.trim();
  const matches = rows.filter((row) => row.responseId === id || row.submissionId === id);
  if (matches.length === 0) return { status: 'pending' };

  const expertIds = [...new Set(
    matches
      .map((row) => row.expertId)
      .filter((expertId): expertId is string => isExpertId(expertId)),
  )];
  if (expertIds.length === 1) return { status: 'ready', expertId: expertIds[0] };
  if (expertIds.length > 1) return { status: 'unresolved' };
  if (matches.some((row) => row.status === 'received')) return { status: 'pending' };
  return { status: 'unresolved' };
}

export function thanksLookupResult(body: unknown): SubmissionLookupResult {
  if (!body || typeof body !== 'object') return { status: 'pending' };
  const record = body as Record<string, unknown>;
  if (record.status === 'ready') {
    return isExpertId(typeof record.expertId === 'string' ? record.expertId : null)
      ? { status: 'ready', expertId: record.expertId as string }
      : { status: 'unresolved' };
  }
  if (record.status === 'unresolved') return { status: 'unresolved' };
  return { status: 'pending' };
}

function json(body: SubmissionLookupResult): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  });
}

export async function handleApplicationLookup(request: Request, lookup: SubmissionLookup): Promise<Response> {
  const id = tallyIdFromSearch(new URL(request.url).searchParams);
  if (!id) return json({ status: 'unresolved' });
  try {
    const rows = await lookup.findByTallyId(id);
    return json(resolveOwnSubmission(id, rows));
  } catch (error) {
    console.error('tally_application_lookup_failed', {
      message: error instanceof Error ? error.message.slice(0, 200) : 'lookup_failed',
    });
    return json({ status: 'pending' });
  }
}
