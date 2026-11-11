import { isPublicDirectoryExpert } from '@/lib/listing';
import { trimCategorySlugs, type CategorySync } from './category-cap';
import type { BillingPatch, ReferralDraft } from './events';

export type LedgerEntry = ReferralDraft & {
  stripeEventId: string;
  kind: 'credit' | 'reversal';
};

export interface BillingStore {
  alreadyProcessed(eventId: string): Promise<boolean>;
  markProcessed(eventId: string, eventType: string): Promise<void>;
  applyPatch(expertId: string, patch: BillingPatch): Promise<'updated' | 'missing'>;
  /**
   * Write or trim expert_categories. `changed` is true when the ordered slug
   * list the directory will render is different.
   */
  syncCategories(expertId: string, sync: CategorySync): Promise<{ changed: boolean }>;
  /** True when this expert is included by getExperts() and rendered in the static export. */
  directoryVisible(expertId: string): Promise<boolean>;
  findExpertIdByCustomer(customerId: string): Promise<string | null>;
  insertLedger(entry: LedgerEntry): Promise<void>;
  reverseLedger(invoiceId: string, stripeEventId: string): Promise<void>;
  savePending(record: {
    checkoutSessionId?: string | null;
    expertId: string | null;
    customerId: string | null;
    patch: BillingPatch;
    categorySlugs?: string[];
  }): Promise<void>;
}

export type BillingExpertRecord = BillingPatch & {
  id: string;
  status?: string | null;
  is_demo?: boolean | null;
  categories?: readonly unknown[] | null;
  tools?: readonly unknown[] | null;
  /** Chosen category slugs in selection order. Absent means this row has no stored choice yet. */
  category_slugs?: string[] | null;
};

export function memoryBillingStore(): BillingStore & {
  experts: Map<string, BillingExpertRecord>;
  events: Set<string>;
  ledger: LedgerEntry[];
  pending: unknown[];
} {
  const experts = new Map<string, BillingExpertRecord>();
  const events = new Set<string>();
  const ledger: LedgerEntry[] = [];
  const pending: unknown[] = [];
  return {
    experts,
    events,
    ledger,
    pending,
    async alreadyProcessed(eventId) {
      return events.has(eventId);
    },
    async markProcessed(eventId) {
      events.add(eventId);
    },
    async applyPatch(expertId, patch) {
      const current = experts.get(expertId);
      if (!current) return 'missing';
      experts.set(expertId, { ...current, ...patch, id: expertId });
      return 'updated';
    },
    async syncCategories(expertId, sync) {
      const current = experts.get(expertId);
      if (!current) return { changed: false };
      // Legacy rows have directory categories but no stored choice. Trimming
      // those would guess an order, so leave them until a selection is saved.
      if (sync.mode === 'trim' && current.category_slugs == null) return { changed: false };
      const source = sync.mode === 'replace' ? (sync.slugs ?? []) : (current.category_slugs ?? []);
      const next = trimCategorySlugs(source, sync.cap);
      const previous = current.category_slugs ?? [];
      const changed = previous.length !== next.length || previous.some((slug, index) => slug !== next[index]);
      if (!changed) return { changed: false };
      experts.set(expertId, {
        ...current,
        id: expertId,
        category_slugs: next,
        categories: next.map((slug) => ({ slug })),
      });
      return { changed: true };
    },
    async directoryVisible(expertId) {
      const expert = experts.get(expertId);
      return !!expert && isPublicDirectoryExpert(expert);
    },
    async findExpertIdByCustomer(customerId) {
      for (const expert of experts.values()) {
        if (expert.stripe_customer_id === customerId) return expert.id;
      }
      return null;
    },
    async insertLedger(entry) {
      if (ledger.some((row) => row.stripeEventId === entry.stripeEventId && row.kind === entry.kind)) return;
      ledger.push(entry);
    },
    async reverseLedger(invoiceId, stripeEventId) {
      const original = ledger.find((row) => row.stripeInvoiceId === invoiceId && row.kind === 'credit');
      if (!original) return;
      if (ledger.some((row) => row.stripeInvoiceId === invoiceId && row.kind === 'reversal')) return;
      ledger.push({ ...original, stripeEventId, kind: 'reversal', amountCents: -original.amountCents });
    },
    async savePending(record) {
      pending.push(record);
    },
  };
}
