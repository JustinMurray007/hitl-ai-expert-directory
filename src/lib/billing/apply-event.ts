import { listingCategorySync, parseCategorySlugList } from './category-cap';
import { categorySlugMetadata, effectForEvent, withExpandedSubscriptions, type BillingEffect, type StripeEventLike } from './events';
import { singleApplicationExpert } from './link-by-email';
import type { BillingStore } from './store';

export type StripeSideEffects = {
  updateCustomerMetadata?: (customerId: string, metadata: Record<string, string>) => Promise<void>;
  /** Required for checkout and invoice events that only include a subscription id. */
  retrieveSubscription?: (subscriptionId: string) => Promise<Record<string, unknown>>;
};

export type ApplyStripeEventResult = {
  ok: true;
  duplicate?: boolean;
  action: string;
  /**
   * True when the public directory would change: a plan or profile-mode write,
   * or a category selection change, on a row `getExperts()` renders. Pending,
   * demo, and other non-public rows do not rebuild. A listing that leaves the
   * directory (it was visible, then its categories were removed) still rebuilds.
   */
  publicListingChanged?: boolean;
};

function sessionId(event: StripeEventLike): string | null {
  const id = event.data.object.id;
  return typeof id === 'string' && id.length > 0 ? id : null;
}

/**
 * Completed checkout with no expert_id. Match applications.contact_email to
 * exactly one expert. Any other result is logged and left unlinked.
 */
async function linkUnmatchedCheckout(
  event: StripeEventLike,
  effect: Extract<BillingEffect, { action: 'apply' }>,
  store: BillingStore,
): Promise<string | null> {
  const email = effect.customerEmail ?? null;
  const ids = email ? await store.findExpertIdsByApplicationEmail(email) : [];
  const match = email ? singleApplicationExpert(ids) : { status: 'none' as const, count: 0 as const };
  if (match.status === 'one') {
    console.info('stripe_checkout_linked_by_email', {
      eventId: event.id,
      checkoutSessionId: sessionId(event),
      customerId: effect.customerId,
      email,
      expertId: match.expertId,
    });
    return match.expertId;
  }
  console.error('stripe_checkout_unlinked', {
    eventId: event.id,
    checkoutSessionId: sessionId(event),
    customerId: effect.customerId,
    email,
    reason: match.status === 'ambiguous' ? 'ambiguous_email_match' : (email ? 'no_email_match' : 'missing_email'),
    matchCount: match.count,
    ...(match.status === 'ambiguous' ? { expertIds: match.expertIds } : {}),
  });
  return null;
}

function wrotePublicListing(patch: { listing_plan?: unknown; profile_mode?: unknown }, result: 'updated' | 'missing'): boolean {
  return result === 'updated' && (patch.listing_plan !== undefined || patch.profile_mode !== undefined);
}

export async function applyStripeEvent(
  event: StripeEventLike,
  store: BillingStore,
  sideEffects: StripeSideEffects = {},
): Promise<ApplyStripeEventResult> {
  if (await store.alreadyProcessed(event.id)) {
    return { ok: true, duplicate: true, action: 'duplicate' };
  }

  const hydrated = sideEffects.retrieveSubscription
    ? await withExpandedSubscriptions(event, sideEffects.retrieveSubscription)
    : event;
  const effect = effectForEvent(hydrated);
  if (effect.action === 'ignore') {
    await store.markProcessed(event.id, event.type);
    return { ok: true, action: effect.reason };
  }

  if (effect.action === 'reverse_referral') {
    if (effect.invoiceId) await store.reverseLedger(effect.invoiceId, event.id);
    await store.markProcessed(event.id, event.type);
    return { ok: true, action: 'reverse_referral' };
  }

  let expertId = effect.expertId;
  if (!expertId && effect.customerId) {
    expertId = await store.findExpertIdByCustomer(effect.customerId);
  }
  if (!expertId && effect.customerEmail !== undefined) {
    expertId = await linkUnmatchedCheckout(event, effect, store);
  }

  const chosenSlugs = parseCategorySlugList(categorySlugMetadata(hydrated));

  if (!expertId) {
    await store.savePending({
      expertId: null,
      customerId: effect.customerId,
      patch: effect.patch,
      categorySlugs: chosenSlugs,
    });
    await store.markProcessed(event.id, event.type);
    return { ok: true, action: 'pending_unlinked' };
  }

  const result = await store.applyPatch(expertId, effect.patch);
  if (result === 'missing') {
    await store.savePending({
      expertId,
      customerId: effect.customerId,
      patch: effect.patch,
      categorySlugs: chosenSlugs,
    });
  }

  const touchesListing = wrotePublicListing(effect.patch, result);
  const wasVisible = touchesListing || listingCategorySync(effect.patch, categorySlugMetadata(hydrated))
    ? result === 'updated' && await store.directoryVisible(expertId)
    : false;

  let categoriesChanged = false;
  if (result === 'updated') {
    const sync = listingCategorySync(effect.patch, categorySlugMetadata(hydrated));
    if (sync) {
      const synced = await store.syncCategories(expertId, sync);
      categoriesChanged = synced.changed;
    }
  }

  if (effect.referral && effect.referral.amountCents > 0) {
    await store.insertLedger({ ...effect.referral, stripeEventId: event.id, kind: 'credit' });
  }

  const customerMetadata = !effect.expertId && expertId
    ? { ...(effect.customerMetadata ?? {}), expert_id: expertId }
    : effect.customerMetadata;
  if (customerMetadata && effect.customerId && sideEffects.updateCustomerMetadata) {
    await sideEffects.updateCustomerMetadata(effect.customerId, customerMetadata);
  }

  const publicListingChanged = (touchesListing || categoriesChanged)
    ? wasVisible || await store.directoryVisible(expertId)
    : false;

  await store.markProcessed(event.id, event.type);
  return {
    ok: true,
    action: result === 'missing' ? 'pending_missing_expert' : 'applied',
    publicListingChanged,
  };
}
