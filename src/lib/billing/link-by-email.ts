/**
 * When a paid Checkout Session has no expert_id, match the customer email to
 * applications.contact_email (the address Tally ingest stores, lowercased).
 * Zero matches and two or more experts are not guesses.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function emailFrom(value: unknown): string | null {
  if (!isRecord(value)) return null;
  return typeof value.email === 'string' ? value.email : null;
}

export function normalizeApplicationEmail(value: string | null | undefined): string | null {
  const email = value?.trim().toLowerCase() ?? '';
  return EMAIL.test(email) ? email : null;
}

/** Email the customer paid with. Prefers customer_details, then the session prefill. */
export function checkoutCustomerEmail(object: Record<string, unknown>): string | null {
  const candidates = [
    emailFrom(object.customer_details),
    typeof object.customer_email === 'string' ? object.customer_email : null,
    emailFrom(object.customer),
  ];
  for (const candidate of candidates) {
    const email = normalizeApplicationEmail(candidate);
    if (email) return email;
  }
  return null;
}

/**
 * Exact ilike pattern. `_` and `%` are wildcards in Postgres ILIKE, so an
 * unescaped address could match a different application.
 */
export function applicationEmailIlikePattern(email: string): string {
  return email.replace(/[\\%_]/g, (char) => `\\${char}`);
}

export type EmailExpertMatch =
  | { status: 'one'; expertId: string; count: 1 }
  | { status: 'none'; count: 0 }
  | { status: 'ambiguous'; count: number; expertIds: string[] };

export function singleApplicationExpert(expertIds: readonly (string | null | undefined)[]): EmailExpertMatch {
  const unique = [...new Set(
    expertIds
      .filter((id): id is string => typeof id === 'string' && id.trim().length > 0)
      .map((id) => id.trim()),
  )];
  if (unique.length === 1) return { status: 'one', expertId: unique[0], count: 1 };
  if (unique.length === 0) return { status: 'none', count: 0 };
  return { status: 'ambiguous', count: unique.length, expertIds: unique };
}
