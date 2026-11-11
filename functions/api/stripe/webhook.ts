import { handleWebhookRequest, type BillingEnv } from '../../../src/lib/billing/http';
import { supabaseBillingStore } from '../../../src/lib/billing/supabase-store';

export async function onRequestPost(context: { request: Request; env: BillingEnv }): Promise<Response> {
  return handleWebhookRequest(context.request, context.env, supabaseBillingStore(context.env));
}
