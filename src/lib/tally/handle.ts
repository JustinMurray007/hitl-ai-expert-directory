import { verifyTallySignature } from './signature';
import { mapTallySubmission } from './map';
import {
  APPLY_FORM_ID,
  TallyStoreError,
  type TallyEnvelope,
  type TallyField,
  type TallyIntakeStore,
} from './types';
import type { TallyEnv } from './supabase-store';

export async function handleTallyWebhook(
  request: Request,
  env: TallyEnv,
  store: TallyIntakeStore,
  options?: { now?: Date },
): Promise<Response> {
  const secret = env.TALLY_SIGNING_SECRET?.trim() || '';
  if (!secret) return json({ error: 'webhook_unconfigured' }, 503);

  const rawBody = await request.text();
  const signature = request.headers.get('tally-signature');
  const valid = await verifyTallySignature(rawBody, signature, secret);
  if (!valid) return json({ error: 'invalid_signature' }, 401);

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }
  if (!payload || typeof payload !== 'object') return json({ error: 'invalid_json' }, 400);

  const envelope = parseTallyWebhook(payload);
  if (envelope.eventType && envelope.eventType !== 'FORM_RESPONSE') {
    return json({ ok: true, ignored: true });
  }

  const responseId = envelope.responseId || envelope.submissionId;
  if (!responseId) return json({ error: 'missing_response_id' }, 400);

  try {
    const categories = await store.listCategories();
    const tools = await store.listTools();
    const mapped = mapTallySubmission(envelope, { categories, tools }, options?.now);
    const unexpectedForm = Boolean(envelope.formId && envelope.formId !== APPLY_FORM_ID);
    const outcome = unexpectedForm ? 'ignored' : mapped.outcome;
    const result = await store.save({
      responseId,
      submissionId: envelope.submissionId,
      eventId: envelope.eventId,
      formId: envelope.formId,
      payload,
      outcome,
      listing: outcome === 'listing' ? mapped.listing : undefined,
      flags: mapped.flags,
    });

    if (result.outcome === 'duplicate') return json({ ok: true, duplicate: true });
    if (result.outcome === 'ignored') return json({ ok: true, ignored: true });
    if (result.outcome === 'needs_review') return json({ ok: true, stored: true, status: 'needs_review' });
    return json({
      ok: true,
      expertId: result.expertId,
      applicationId: result.applicationId,
      status: 'pending_review',
    });
  } catch (error) {
    if (error instanceof TallyStoreError && error.code === 'unconfigured') {
      return json({ error: 'webhook_unconfigured' }, 503);
    }
    console.error('tally_webhook_failed', {
      reason: error instanceof TallyStoreError ? error.code : 'save_failed',
      message: safeErrorMessage(error, secret),
    });
    return json({ error: 'webhook_failed' }, 500);
  }
}

export function parseTallyWebhook(payload: unknown): TallyEnvelope {
  const root = asRecord(payload);
  const data = asRecord(root.data) ?? root;
  return {
    eventId: asString(root.eventId),
    eventType: asString(root.eventType),
    formId: asString(data.formId),
    responseId: asString(data.responseId),
    submissionId: asString(data.submissionId),
    fields: Array.isArray(data.fields) ? data.fields.filter(isField) : [],
  };
}

function isField(value: unknown): value is TallyField {
  return Boolean(value) && typeof value === 'object';
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function safeErrorMessage(error: unknown, secret: string): string {
  const raw = error instanceof Error ? error.message : 'unknown';
  const cleaned = secret ? raw.split(secret).join('[redacted]') : raw;
  return cleaned.slice(0, 200);
}
