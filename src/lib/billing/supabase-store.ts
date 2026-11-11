import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { isPublicDirectoryExpert } from '@/lib/listing';
import { getServiceSupabase } from '@/lib/supabase';
import type { BillingPatch } from './events';
import type { BillingStore, LedgerEntry } from './store';

type SupabaseEnv = {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
};

function clientFrom(env?: SupabaseEnv): SupabaseClient | null {
  const url = env?.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env?.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key && url.startsWith('https://')) {
    return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  }
  return getServiceSupabase();
}

function patchToRow(patch: BillingPatch): Record<string, unknown> {
  return { ...patch, updated_at: new Date().toISOString() };
}

export function supabaseBillingStore(env?: SupabaseEnv): BillingStore {
  const client = () => clientFrom(env);
  return {
    async alreadyProcessed(eventId) {
      const db = client();
      if (!db) return false;
      const { data, error } = await db.from('stripe_webhook_events').select('event_id').eq('event_id', eventId).maybeSingle();
      if (error) throw error;
      return !!data;
    },
    async markProcessed(eventId, eventType) {
      const db = client();
      if (!db) throw new Error('Supabase service role is not configured');
      const { error } = await db.from('stripe_webhook_events').insert({ event_id: eventId, event_type: eventType });
      if (error && !String(error.message || '').includes('duplicate')) throw error;
    },
    async applyPatch(expertId, patch) {
      const db = client();
      if (!db) throw new Error('Supabase service role is not configured');
      const { data, error } = await db.from('experts').update(patchToRow(patch)).eq('id', expertId).select('id');
      if (error) throw error;
      return data && data.length > 0 ? 'updated' : 'missing';
    },
    async directoryVisible(expertId) {
      const db = client();
      if (!db) return false;
      const { data, error } = await db
        .from('experts')
        .select('status, is_demo, expert_categories(category_id), expert_tools(tool_id)')
        .eq('id', expertId)
        .maybeSingle();
      if (error) throw error;
      if (!data) return false;
      const row = data as {
        status?: string | null;
        is_demo?: boolean | null;
        expert_categories?: unknown[] | null;
        expert_tools?: unknown[] | null;
      };
      return isPublicDirectoryExpert({
        status: row.status,
        is_demo: row.is_demo,
        categories: row.expert_categories ?? [],
        tools: row.expert_tools ?? [],
      });
    },
    async findExpertIdByCustomer(customerId) {
      const db = client();
      if (!db) return null;
      const { data, error } = await db.from('experts').select('id').eq('stripe_customer_id', customerId).maybeSingle();
      if (error) throw error;
      return data?.id ? String(data.id) : null;
    },
    async insertLedger(entry: LedgerEntry) {
      const db = client();
      if (!db) throw new Error('Supabase service role is not configured');
      const { error } = await db.from('referral_ledger').insert({
        stripe_event_id: entry.stripeEventId,
        stripe_invoice_id: entry.stripeInvoiceId,
        expert_id: entry.expertId,
        referrer_expert_id: entry.referrerExpertId,
        amount_cents: entry.amountCents,
        currency: entry.currency,
        kind: entry.kind,
        status: 'unpaid',
      });
      if (error && !String(error.message || '').includes('duplicate')) throw error;
    },
    async reverseLedger(invoiceId, stripeEventId) {
      const db = client();
      if (!db) throw new Error('Supabase service role is not configured');
      const { data, error } = await db
        .from('referral_ledger')
        .select('expert_id, referrer_expert_id, amount_cents, currency')
        .eq('stripe_invoice_id', invoiceId)
        .eq('kind', 'credit')
        .maybeSingle();
      if (error) throw error;
      if (!data) return;
      const { error: insertError } = await db.from('referral_ledger').insert({
        stripe_event_id: stripeEventId,
        stripe_invoice_id: invoiceId,
        expert_id: data.expert_id,
        referrer_expert_id: data.referrer_expert_id,
        amount_cents: -Number(data.amount_cents),
        currency: data.currency,
        kind: 'reversal',
        status: 'unpaid',
      });
      if (insertError && !String(insertError.message || '').includes('duplicate')) throw insertError;
    },
    async savePending(record) {
      const db = client();
      if (!db) throw new Error('Supabase service role is not configured');
      const { error } = await db.from('billing_pending').insert({
        expert_id: record.expertId,
        stripe_customer_id: record.customerId,
        patch: record.patch,
      });
      if (error) throw error;
    },
  };
}
