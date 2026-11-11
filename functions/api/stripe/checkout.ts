import { handleCheckoutRequest, type BillingEnv } from '../../../src/lib/billing/http';

export async function onRequestPost(context: { request: Request; env: BillingEnv }): Promise<Response> {
  return handleCheckoutRequest(context.request, context.env);
}
