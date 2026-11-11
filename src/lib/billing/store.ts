import type { BillingPatch, ReferralDraft } from './events';

export type LedgerEntry = ReferralDraft & {
  stripeEventId: string;
  kind: 'credit' | 'reversal';
};

export interface BillingStore {
  alreadyProcessed(eventId: string): Promise<boolean>;
  markProcessed(eventId: string, eventType: string): Promise<void>;
  applyPatch(expertId: string, patch: BillingPatch): Promise<'updated' | 'missing'>;
  findExpertIdByCustomer(customerId: string): Promise<string | null>;
  insertLedger(entry: LedgerEntry): Promise<void>;
  reverseLedger(invoiceId: string, stripeEventId: string): Promise<void>;
  savePending(record: { checkoutSessionId?: string | null; expertId: string | null; customerId: string | null; patch: BillingPatch }): Promise<void>;
}

export function memoryBillingStore(): BillingStore & {
  experts: Map<string, BillingPatch & { id: string }>;
  events: Set<string>;
  ledger: LedgerEntry[];
  pending: unknown[];
} {
  const experts = new Map<string, BillingPatch & { id: string }>();
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
