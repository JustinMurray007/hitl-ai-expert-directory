import { effectForEvent, type StripeEventLike } from './events';
import type { BillingStore } from './store';

export type StripeSideEffects = {
  updateCustomerMetadata?: (customerId: string, metadata: Record<string, string>) => Promise<void>;
};

export async function applyStripeEvent(
  event: StripeEventLike,
  store: BillingStore,
  sideEffects: StripeSideEffects = {},
): Promise<{ ok: true; duplicate?: boolean; action: string }> {
  if (await store.alreadyProcessed(event.id)) {
    return { ok: true, duplicate: true, action: 'duplicate' };
  }

  const effect = effectForEvent(event);
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

  if (!expertId) {
    await store.savePending({
      expertId: null,
      customerId: effect.customerId,
      patch: effect.patch,
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
    });
  }

  if (effect.referral && effect.referral.amountCents > 0) {
    await store.insertLedger({ ...effect.referral, stripeEventId: event.id, kind: 'credit' });
  }

  if (effect.customerMetadata && effect.customerId && sideEffects.updateCustomerMetadata) {
    await sideEffects.updateCustomerMetadata(effect.customerId, effect.customerMetadata);
  }

  await store.markProcessed(event.id, event.type);
  return { ok: true, action: result === 'missing' ? 'pending_missing_expert' : 'applied' };
}
