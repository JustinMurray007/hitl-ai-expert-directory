import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { isPublicDirectoryExpert } from '@/lib/listing';
import { getServiceSupabase } from '@/lib/supabase';
import { applicationEmailIlikePattern, normalizeApplicationEmail } from './link-by-email';
import { trimCategorySlugs, type CategorySync } from './category-cap';
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

type CategoryLinkRow = {
  category_id?: string;
  sort_order?: number | null;
  category?: { slug?: string } | { slug?: string }[] | null;
};

function slugFromLink(row: CategoryLinkRow): string | null {
  const category = row.category;
  if (Array.isArray(category)) return category[0]?.slug ?? null;
  return category?.slug ?? null;
}

async function syncExpertCategories(
  db: SupabaseClient,
  expertId: string,
  sync: CategorySync,
): Promise<{ changed: boolean }> {
  const ordered = await db
    .from('expert_categories')
    .select('category_id, sort_order, category:categories(slug)')
    .eq('expert_id', expertId)
    .order('sort_order', { ascending: true })
    .order('category_id', { ascending: true });
  let rows = ordered.data as CategoryLinkRow[] | null;
  if (ordered.error) {
    if (!/sort_order/i.test(String(ordered.error.message || ordered.error))) throw ordered.error;
    const plain = await db
      .from('expert_categories')
      .select('category_id, category:categories(slug)')
      .eq('expert_id', expertId)
      .order('category_id', { ascending: true });
    if (plain.error) throw plain.error;
    rows = (plain.data ?? []) as CategoryLinkRow[];
  }
  const existing = ((rows ?? []) as CategoryLinkRow[])
    .map((row) => ({ id: row.category_id ? String(row.category_id) : '', slug: slugFromLink(row) }))
    .filter((row): row is { id: string; slug: string } => Boolean(row.id && row.slug));

  let desiredSlugs: string[];
  if (sync.mode === 'replace') {
    desiredSlugs = trimCategorySlugs(sync.slugs ?? [], sync.cap);
  } else if (existing.length === 0) {
    // Nothing stored to trim. A legacy listing with no join rows stays untouched.
    return { changed: false };
  } else {
    desiredSlugs = trimCategorySlugs(existing.map((row) => row.slug), sync.cap);
  }

  const lookupSlugs = desiredSlugs.length > 0 ? desiredSlugs : existing.map((row) => row.slug);
  const { data: categories, error: categoryError } = await db
    .from('categories')
    .select('id, slug')
    .in('slug', lookupSlugs.length > 0 ? lookupSlugs : ['__none__']);
  if (categoryError) throw categoryError;
  const idBySlug = new Map<string, string>();
  for (const row of categories ?? []) {
    if (row.slug && row.id) idBySlug.set(String(row.slug), String(row.id));
  }

  const resolved = desiredSlugs
    .map((slug) => ({ slug, id: idBySlug.get(slug) }))
    .filter((row): row is { slug: string; id: string } => Boolean(row.id));

  if (sync.mode === 'replace' && resolved.length === 0) {
    // Unknown slugs must not wipe a listing that already has categories.
    return { changed: false };
  }

  const previous = existing.map((row) => row.slug);
  const next = resolved.map((row) => row.slug);
  const changed = previous.length !== next.length || previous.some((slug, index) => slug !== next[index]);
  if (!changed) return { changed: false };

  if (resolved.length > 0) {
    const withOrder = resolved.map((row, index) => ({
      expert_id: expertId,
      category_id: row.id,
      sort_order: index,
    }));
    let { error: upsertError } = await db.from('expert_categories').upsert(withOrder, {
      onConflict: 'expert_id,category_id',
    });
    if (upsertError && /sort_order/i.test(String(upsertError.message || upsertError))) {
      const retry = await db.from('expert_categories').upsert(
        withOrder.map((row) => ({ expert_id: row.expert_id, category_id: row.category_id })),
        { onConflict: 'expert_id,category_id' },
      );
      upsertError = retry.error;
    }
    if (upsertError) throw upsertError;
  }

  const keep = new Set(resolved.map((row) => row.id));
  const remove = existing.map((row) => row.id).filter((id) => !keep.has(id));
  if (remove.length > 0) {
    const { error: deleteError } = await db
      .from('expert_categories')
      .delete()
      .eq('expert_id', expertId)
      .in('category_id', remove);
    if (deleteError) throw deleteError;
  }
  return { changed: true };
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
    async syncCategories(expertId, sync) {
      const db = client();
      if (!db) throw new Error('Supabase service role is not configured');
      return syncExpertCategories(db, expertId, sync);
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
    async findExpertIdsByApplicationEmail(email) {
      const db = client();
      const normalized = normalizeApplicationEmail(email);
      if (!db || !normalized) return [];
      const { data, error } = await db
        .from('applications')
        .select('expert_id')
        .ilike('contact_email', applicationEmailIlikePattern(normalized));
      if (error) throw error;
      return (data ?? [])
        .map((row) => (row.expert_id ? String(row.expert_id) : ''))
        .filter((id) => id.length > 0);
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
      const patch = record.categorySlugs && record.categorySlugs.length > 0
        ? { ...record.patch, category_slugs: record.categorySlugs }
        : record.patch;
      const { error } = await db.from('billing_pending').insert({
        expert_id: record.expertId,
        stripe_customer_id: record.customerId,
        patch,
      });
      if (error) throw error;
    },
  };
}
