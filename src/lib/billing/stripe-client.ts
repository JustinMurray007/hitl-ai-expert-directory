import Stripe from 'stripe';
import { STRIPE_API_VERSION } from './catalog';

/**
 * stripe-node 23 exports the client class as `Stripe`. Instantiating it is the
 * supported client (there is no separate StripeClient symbol). The fetch HTTP
 * client keeps this usable on Cloudflare Workers, where Node's http client is absent.
 * Webhook verification must use constructEventAsync on that same client.
 */
export function createStripeClient(secretKey: string): Stripe {
  const StripeClient = Stripe;
  return new StripeClient(secretKey, {
    apiVersion: STRIPE_API_VERSION,
    httpClient: Stripe.createFetchHttpClient(),
    typescript: true,
  });
}

export async function verifyWebhookEvent(
  stripe: Stripe,
  payload: string,
  signature: string,
  webhookSecret: string,
): Promise<Stripe.Event> {
  return stripe.webhooks.constructEventAsync(payload, signature, webhookSecret);
}
