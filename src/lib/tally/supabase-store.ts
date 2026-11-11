import { createClient } from '@supabase/supabase-js';
import {
  isTerminalTallyStatus,
  TallyStoreError,
  type CatalogEntry,
  type TallyIntakeStore,
  type TallySaveInput,
  type TallySaveResult,
} from './types';

export type TallyEnv = {
  TALLY_SIGNING_SECRET?: string;
  NEXT_PUBLIC_SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  CLOUDFLARE_DEPLOY_HOOK_URL?: string;
};

type DbError = { code?: string; message?: string } | null;
type DbResult = { data: unknown; error: DbError };

type TallyFilter = {
  select(columns?: string): TallyFilter;
  eq(column: string, value: unknown): TallyFilter;
  maybeSingle(): Promise<DbResult>;
  single(): Promise<DbResult>;
  then<TResult1 = DbResult, TResult2 = never>(
    onfulfilled?: ((value: DbResult) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2>;
};

export type TallyDb = {
  from(table: string): {
    insert(values: unknown): TallyFilter;
    update(values: unknown): TallyFilter;
    upsert(values: unknown, options?: { onConflict?: string }): TallyFilter;
    select(columns?: string): TallyFilter;
  };
};

function clientFrom(env: TallyEnv): TallyDb | null {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !url.startsWith('https://')) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  }) as unknown as TallyDb;
}

export function supabaseTallyStore(env: TallyEnv): TallyIntakeStore {
  return tallyStoreFromClient(clientFrom(env));
}

export function tallyStoreFromClient(client: TallyDb | null): TallyIntakeStore {
  const db = () => {
    if (!client) throw new TallyStoreError('unconfigured', 'Supabase service role is not configured');
    return client;
  };

  return {
    async listCategories() {
      const { data, error } = await db().from('categories').select('id, slug, name');
      if (error) throw error;
      return catalogRows(data);
    },
    async listTools() {
      const { data, error } = await db().from('tools').select('id, slug, name');
      if (error) throw error;
      return catalogRows(data);
    },
    save(input) {
      return savePending(db(), input);
    },
  };
}

function catalogRows(data: unknown): CatalogEntry[] {
  if (!Array.isArray(data)) return [];
  return data.flatMap((row) => {
    if (!row || typeof row !== 'object') return [];
    const record = row as Record<string, unknown>;
    if (!record.id || !record.slug) return [];
    return [{ id: String(record.id), slug: String(record.slug), name: String(record.name ?? record.slug) }];
  });
}

async function savePending(db: TallyDb, input: TallySaveInput): Promise<TallySaveResult> {
  const claim = await db
    .from('tally_submissions')
    .insert({
      response_id: input.responseId,
      submission_id: input.submissionId,
      event_id: input.eventId,
      form_id: input.formId,
      payload: input.payload,
      status: 'received',
      unknown_categories: input.flags.unknownCategories,
      dropped_categories: input.flags.droppedCategories,
      unknown_tools: input.flags.unknownTools,
      mapping_notes: input.flags.notes,
    })
    .select('response_id')
    .maybeSingle();

  if (claim.error) {
    if (isMissingRelation(claim.error)) {
      throw new TallyStoreError(
        'missing_table',
        'tally_submissions is missing. Run db/migration_tally_submissions.sql in the Supabase SQL editor.',
      );
    }
    if (!isUniqueViolation(claim.error)) throw claim.error;
    const existing = await db
      .from('tally_submissions')
      .select('expert_id, application_id, status')
      .eq('response_id', input.responseId)
      .maybeSingle();
    if (existing.error) throw existing.error;
    const existingRow = asRecord(existing.data);
    const status = typeof existingRow?.status === 'string' ? existingRow.status : null;
    if (isTerminalTallyStatus(status)) {
      return {
        outcome: 'duplicate',
        expertId: existingRow?.expert_id ? String(existingRow.expert_id) : null,
        applicationId: existingRow?.application_id ? String(existingRow.application_id) : null,
      };
    }
  }

  if (input.outcome !== 'listing' || !input.listing) {
    const status = input.outcome === 'ignored' ? 'ignored' : 'needs_review';
    const updated = await db
      .from('tally_submissions')
      .update(flagPatch(input, status))
      .eq('response_id', input.responseId);
    if (updated.error) throw updated.error;
    return { outcome: status, expertId: null, applicationId: null };
  }

  const listing = input.listing;
  const found = await db.from('experts').select('id').eq('slug', listing.expert.slug).maybeSingle();
  if (found.error) throw found.error;
  let expertId = asRecord(found.data)?.id ? String(asRecord(found.data)?.id) : '';
  if (!expertId) {
    const inserted = await db.from('experts').insert(listing.expert).select('id').single();
    if (inserted.error) throw inserted.error;
    expertId = requiredId(inserted.data);
  }

  if (listing.categories.length > 0) {
    const links = listing.categories.map((category) => ({
      expert_id: expertId,
      category_id: category.id,
      sort_order: category.sortOrder,
    }));
    let upserted = await db.from('expert_categories').upsert(links, { onConflict: 'expert_id,category_id' });
    if (upserted.error && /sort_order/i.test(errorText(upserted.error))) {
      upserted = await db.from('expert_categories').upsert(
        links.map(({ expert_id, category_id }) => ({ expert_id, category_id })),
        { onConflict: 'expert_id,category_id' },
      );
    }
    if (upserted.error) throw upserted.error;
  }

  if (listing.tools.length > 0) {
    const toolLinks = listing.tools.map((tool) => ({ expert_id: expertId, tool_id: tool.id }));
    const upserted = await db.from('expert_tools').upsert(toolLinks, { onConflict: 'expert_id,tool_id' });
    if (upserted.error) throw upserted.error;
  }

  if (listing.caseStudy) {
    const existingCase = await db.from('case_studies').select('id').eq('expert_id', expertId).maybeSingle();
    if (existingCase.error) throw existingCase.error;
    if (!asRecord(existingCase.data)) {
      const inserted = await db.from('case_studies').insert({ ...listing.caseStudy, expert_id: expertId });
      if (inserted.error) throw inserted.error;
    }
  }

  const existingApplication = await db.from('applications').select('id').eq('expert_id', expertId).maybeSingle();
  if (existingApplication.error) throw existingApplication.error;
  let applicationId = asRecord(existingApplication.data)?.id ? String(asRecord(existingApplication.data)?.id) : '';
  if (!applicationId) {
    const inserted = await db
      .from('applications')
      .insert({ ...listing.application, expert_id: expertId })
      .select('id')
      .single();
    if (inserted.error) throw inserted.error;
    applicationId = requiredId(inserted.data);
  }

  const finished = await db
    .from('tally_submissions')
    .update({
      ...flagPatch(input, 'stored'),
      expert_id: expertId,
      application_id: applicationId,
    })
    .eq('response_id', input.responseId);
  if (finished.error) throw finished.error;

  return { outcome: 'created', expertId, applicationId };
}

function flagPatch(input: TallySaveInput, status: string): Record<string, unknown> {
  return {
    status,
    unknown_categories: input.flags.unknownCategories,
    dropped_categories: input.flags.droppedCategories,
    unknown_tools: input.flags.unknownTools,
    mapping_notes: input.flags.notes,
  };
}

function asRecord(data: unknown): Record<string, unknown> | null {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
  return data as Record<string, unknown>;
}

function requiredId(data: unknown): string {
  const id = asRecord(data)?.id;
  if (id == null || id === '') throw new Error('insert did not return an id');
  return String(id);
}

function errorText(error: DbError): string {
  return error?.message || '';
}

function isUniqueViolation(error: DbError): boolean {
  return error?.code === '23505' || /duplicate key/i.test(errorText(error));
}

function isMissingRelation(error: DbError): boolean {
  return (
    error?.code === '42P01' ||
    error?.code === 'PGRST205' ||
    (/tally_submissions/i.test(errorText(error)) && /does not exist|schema cache|could not find/i.test(errorText(error)))
  );
}
