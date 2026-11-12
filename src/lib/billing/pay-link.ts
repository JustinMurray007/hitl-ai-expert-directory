/**
 * Personal pay link for reminder emails and the page after the application.
 *
 * Checkout on /apply starts only when the URL names an expert:
 *   https://findaipros.com/apply?expert=<expert uuid>#pricing
 *
 * `personalPayLink(expertId)` builds that URL. `personalPayPath` is the same
 * path for a link on this site.
 *
 * Tally (form Nq5NDp) → Settings → Redirect on completion:
 *   https://findaipros.com/apply/thanks?submissionId=
 * Type @ at the end and choose Submission ID ("Unique identifier of a response").
 * That value is the webhook responseId / submissionId stored on
 * tally_submissions.response_id and tally_submissions.submission_id.
 * The thanks page also accepts ?responseId= for the same lookup.
 */

const EXPERT_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isExpertId(value: string | null | undefined): value is string {
  return typeof value === 'string' && EXPERT_ID.test(value);
}

export function personalPayPath(expertId: string): string {
  if (!isExpertId(expertId)) {
    throw new Error('personal pay link requires an expert uuid');
  }
  return `/apply?expert=${encodeURIComponent(expertId)}#pricing`;
}

export function personalPayLink(expertId: string, siteOrigin = 'https://findaipros.com'): string {
  const origin = siteOrigin.replace(/\/$/, '');
  return `${origin}${personalPayPath(expertId)}`;
}
