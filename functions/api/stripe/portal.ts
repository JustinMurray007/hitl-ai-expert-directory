import { handlePortalRequest, type BillingEnv } from '../../../src/lib/billing/http';

export async function onRequestPost(context: { request: Request; env: BillingEnv }): Promise<Response> {
  return handlePortalRequest(context.request, context.env);
}
