/**
 * Creates the Find Ai Pros products and prices in a Stripe sandbox.
 * Do not run this against a live key. This file is not executed by the build or tests.
 *
 *   STRIPE_SECRET_KEY=rk_test_... node --experimental-strip-types scripts/create-stripe-catalog.ts
 */
import { CATALOG_PRICES, isTestStripeKey } from '../src/lib/billing/catalog';
import { createStripeClient } from '../src/lib/billing/stripe-client';

async function main() {
  const key = process.env.STRIPE_SECRET_KEY || '';
  if (!isTestStripeKey(key)) {
    console.error(
      'Refusing to run. STRIPE_SECRET_KEY must be a sandbox test key (rk_test_ recommended, sk_test_ accepted). Live keys are rejected. Nothing was sent to Stripe.',
    );
    process.exit(1);
  }

  const stripe = createStripeClient(key);
  const productIds = new Map<string, string>();

  for (const price of CATALOG_PRICES) {
    let productId = productIds.get(price.productName);
    if (!productId) {
      const found = await stripe.products.search({
        query: `name:'${price.productName}' AND active:'true'`,
        limit: 1,
      });
      if (found.data[0]) {
        productId = found.data[0].id;
      } else {
        const created = await stripe.products.create({
          name: price.productName,
          metadata: { tier: price.tier },
        });
        productId = created.id;
        console.log('product', price.productName, productId);
      }
      productIds.set(price.productName, productId);
    }

    const existing = await stripe.prices.list({ lookup_keys: [price.lookupKey], limit: 1 });
    if (existing.data.some((row) => row.lookup_key === price.lookupKey)) {
      console.log('price exists', price.lookupKey);
      continue;
    }

    const createdPrice = await stripe.prices.create({
      product: productId,
      nickname: price.nickname,
      unit_amount: price.unitAmount,
      currency: 'usd',
      tax_behavior: 'exclusive',
      recurring: { interval: price.interval },
      lookup_key: price.lookupKey,
      metadata: { tier: price.tier },
    });
    console.log('price', price.lookupKey, createdPrice.id);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Catalog script failed');
  process.exit(1);
});
