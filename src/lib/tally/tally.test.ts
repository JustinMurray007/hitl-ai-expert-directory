import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { describe, test } from 'node:test';
import { freePeriodEndsAt } from '../listing';
import { handleTallyWebhook } from './handle';
import { mapTallySubmission, matchCatalog } from './map';
import { memoryTallyStore } from './memory-store';
import { tallySignature } from './signature';
import { tallyStoreFromClient, type TallyDb } from './supabase-store';
import { TallyStoreError, type CatalogEntry, type TallySaveInput } from './types';

const SECRET = 'tally-test-secret';
const NOW = new Date('2026-11-11T18:00:00.000Z');

const CATEGORIES: CatalogEntry[] = [
  { id: 'cat-ops', slug: 'operations-workflow-automation', name: 'Operations & Workflow Automation' },
  { id: 'cat-sales', slug: 'sales-lead-qualification', name: 'Sales & Lead Qualification' },
  { id: 'cat-support', slug: 'customer-support-knowledge-base', name: 'Customer Support & Knowledge Bases' },
  { id: 'cat-marketing', slug: 'marketing-programmatic-content', name: 'Marketing & Programmatic Content' },
  { id: 'cat-exec', slug: 'executive-personal-ai-ops', name: 'Executive & Personal AI Ops' },
];

const TOOLS: CatalogEntry[] = [
  { id: 'tool-make', slug: 'make', name: 'Make' },
  { id: 'tool-vapi', slug: 'vapi', name: 'Vapi' },
  { id: 'tool-claude', slug: 'anthropic-claude', name: 'Anthropic Claude' },
];

function option(id: string, text: string) {
  return { id, text };
}

function samplePayload(overrides?: { responseId?: string; formId?: string | null }) {
  const responseId = overrides?.responseId ?? '2wgx4n';
  const formId = overrides && 'formId' in overrides ? overrides.formId : 'Nq5NDp';
  return {
    eventId: 'evt-1',
    eventType: 'FORM_RESPONSE',
    createdAt: '2026-11-11T18:00:00.000Z',
    data: {
      responseId,
      submissionId: responseId,
      respondentId: 'resp-1',
      formId,
      formName: 'Apply to Join',
      createdAt: '2026-11-11T18:00:00.000Z',
      fields: [
        { key: 'name', label: 'Full Name', type: 'INPUT_TEXT', value: 'Jane Doe' },
        { key: 'title', label: 'Professional Title', type: 'INPUT_TEXT', value: 'AI Automation Architect' },
        { key: 'agency', label: 'Agency or Firm Name', type: 'INPUT_TEXT', value: 'Northwind Ops' },
        { key: 'tagline', label: 'Tagline', type: 'INPUT_TEXT', value: 'Human-reviewed intake for home service teams.' },
        {
          key: 'bio',
          label: 'Bio & Background',
          type: 'TEXTAREA',
          value: 'Jane builds intake and follow-up systems and keeps a person available to take over any conversation.',
        },
        { key: 'city', label: 'City', type: 'INPUT_TEXT', value: 'Austin' },
        { key: 'state', label: 'State / Region', type: 'INPUT_TEXT', value: 'TX' },
        { key: 'country', label: 'Country', type: 'INPUT_TEXT', value: 'United States' },
        { key: 'tz', label: 'Timezone', type: 'INPUT_TEXT', value: 'America/Chicago' },
        { key: 'web', label: 'Website URL', type: 'INPUT_LINK', value: 'example.com' },
        { key: 'book', label: 'Booking URL (Calendly, Cal.com)', type: 'INPUT_LINK', value: 'https://cal.com/jane' },
        { key: 'li', label: 'LinkedIn Profile', type: 'INPUT_LINK', value: 'https://linkedin.com/in/jane' },
        { key: 'gh', label: 'GitHub / Code Profile', type: 'INPUT_LINK', value: '' },
        {
          key: 'engagement',
          label: 'Primary Engagement Model',
          type: 'MULTIPLE_CHOICE',
          value: ['eng-retainer'],
          options: [
            option('eng-sprint', 'Fixed Sprint (Deliverable-based)'),
            option('eng-retainer', 'Monthly Retainer (Fractional Ops)'),
            option('eng-audit', 'Consulting Audit (Architecture Review)'),
            option('eng-hybrid', 'Hybrid (Sprint + Maintenance Retainer)'),
          ],
        },
        {
          key: 'budget',
          label: 'Starting Project Budget',
          type: 'MULTIPLE_CHOICE',
          value: ['budget-enterprise'],
          options: [
            option('budget-small', 'Under $2,500'),
            option('budget-mid', '$2,500 to $5,000'),
            option('budget-large', '$5,000 to $15,000'),
            option('budget-enterprise', '$15,000+ Enterprise'),
          ],
        },
        {
          key: 'categories',
          label: 'Select 1 to 3 Primary Categories',
          type: 'CHECKBOXES',
          value: ['cat-ads', 'cat-ops', 'cat-sales'],
          options: [
            option('cat-ops', 'Operations & Workflow Automation'),
            option('cat-sales', 'Sales & Lead Qualification'),
            option('cat-support', 'Customer Support & Knowledge Bases'),
            option('cat-ads', 'AI Advertising & Paid Media Ops'),
            option('cat-marketing', 'Marketing & Programmatic Content'),
            option('cat-exec', 'Executive & Personal AI Ops'),
          ],
        },
        {
          key: 'categories_ads',
          label: 'Select 1 to 3 Primary Categories (AI Advertising & Paid Media Ops)',
          type: 'CHECKBOXES',
          value: true,
        },
        {
          key: 'categories_ops',
          label: 'Select 1 to 3 Primary Categories (Operations & Workflow Automation)',
          type: 'CHECKBOXES',
          value: true,
        },
        {
          key: 'tools',
          label: 'Core Tool Stack (Select all that apply)',
          type: 'CHECKBOXES',
          value: ['tool-make', 'tool-vapi', 'tool-future'],
          options: [
            option('tool-make', 'Make'),
            option('tool-vapi', 'Vapi'),
            option('tool-future', 'Some Future Tool'),
          ],
        },
        { key: 'email', label: 'Business Contact Email', type: 'INPUT_EMAIL', value: 'jane@example.com' },
        {
          key: 'legal',
          label: 'Legal Entity Type',
          type: 'MULTIPLE_CHOICE',
          value: ['legal-scorp'],
          options: [
            option('legal-llc', 'LLC'),
            option('legal-scorp', 'S-Corporation'),
            option('legal-sole', 'Sole Proprietorship'),
            option('legal-other', 'Other'),
          ],
        },
        {
          key: 'portfolio',
          label: 'Private Portfolio or Code Repo URLs',
          type: 'TEXTAREA',
          value: 'https://github.com/jane/one\nhttps://jane.example/work',
        },
        {
          key: 'refs',
          label: 'Client References',
          type: 'CHECKBOXES',
          value: ['ref-yes'],
          options: [option('ref-yes', 'I can provide 1-2 verifiable client references upon request during review')],
        },
        { key: 'cs-title', label: 'Case Study Title', type: 'INPUT_TEXT', value: 'After-hours intake' },
        { key: 'cs-industry', label: 'Client Industry', type: 'INPUT_TEXT', value: 'HVAC' },
        {
          key: 'cs-problem',
          label: 'Client Bottleneck / Problem Statement',
          type: 'TEXTAREA',
          value: 'Evening calls went unanswered.',
        },
        {
          key: 'cs-solution',
          label: 'Solution Architecture & Flow',
          type: 'TEXTAREA',
          value: 'Voice agent with a live-handoff button.',
        },
        {
          key: 'cs-hitl',
          label: 'What is the exact mechanism deployed when your AI system is uncertain, wrong, or encounters an edge case?',
          type: 'TEXTAREA',
          value: 'The call transfers to the on-call owner.',
        },
        {
          key: 'cs-safe',
          label: 'Failure Safeguards & Circuit Breakers',
          type: 'TEXTAREA',
          value: 'Low confidence stops the booking.',
        },
        { key: 'cs-roi', label: 'Quantified ROI & Business Outcome', type: 'TEXTAREA', value: '15 recovered calls a month.' },
        { key: 'cs-demo', label: 'Loom Walkthrough or Demo Video URL', type: 'INPUT_LINK', value: 'https://loom.com/share/abc' },
      ],
    },
  };
}

function signedRequest(body: unknown, secret = SECRET, signature?: string): Request {
  const raw = typeof body === 'string' ? body : JSON.stringify(body);
  const header = signature === undefined ? createHmac('sha256', secret).update(raw).digest('base64') : signature;
  return new Request('https://findaipros.com/api/tally/webhook', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'tally-signature': header,
    },
    body: raw,
  });
}

describe('tally webhook', () => {
  test('signature is base64 HMAC-SHA256 of the raw body', async () => {
    const raw = '{"eventType":"FORM_RESPONSE","data":{"responseId":"abc"}}';
    const expected = createHmac('sha256', SECRET).update(raw).digest('base64');
    assert.equal(await tallySignature(raw, SECRET), expected);
    const spaced = '{ "eventType": "FORM_RESPONSE" }';
    const resigned = createHmac('sha256', SECRET).update(JSON.stringify(JSON.parse(spaced))).digest('base64');
    assert.notEqual(await tallySignature(spaced, SECRET), resigned);
  });

  test('rejects a missing, wrong, or mismatched signature and accepts the raw body', async () => {
    const store = memoryTallyStore({ categories: CATEGORIES, tools: TOOLS });
    const missing = await handleTallyWebhook(
      new Request('https://findaipros.com/api/tally/webhook', {
        method: 'POST',
        body: JSON.stringify(samplePayload()),
      }),
      { TALLY_SIGNING_SECRET: SECRET },
      store,
      { now: NOW },
    );
    assert.equal(missing.status, 401);
    assert.equal(store.listings.length, 0);

    const wrong = await handleTallyWebhook(signedRequest(samplePayload(), SECRET, 'not-the-signature'), {
      TALLY_SIGNING_SECRET: SECRET,
    }, store, { now: NOW });
    assert.equal(wrong.status, 401);

    const raw = JSON.stringify(samplePayload());
    const tampered = await handleTallyWebhook(
      signedRequest(`${raw} `, SECRET, createHmac('sha256', SECRET).update(raw).digest('base64')),
      { TALLY_SIGNING_SECRET: SECRET },
      store,
    );
    assert.equal(tampered.status, 401);

    const unconfigured = await handleTallyWebhook(signedRequest(samplePayload()), {}, store);
    assert.equal(unconfigured.status, 503);
    assert.equal(store.listings.length, 0);
  });

  test('maps a submission onto one pending category and flags unknown values', async () => {
    const store = memoryTallyStore({ categories: CATEGORIES, tools: TOOLS });
    const response = await handleTallyWebhook(signedRequest(samplePayload()), { TALLY_SIGNING_SECRET: SECRET, CLOUDFLARE_DEPLOY_HOOK_URL: 'https://example.com/hook' }, store, { now: NOW });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.status, 'pending_review');
    assert.equal(body.duplicate, undefined);

    const listing = store.listings[0];
    assert.equal(listing.expert.status, 'pending_review');
    assert.equal(listing.expert.is_verified, false);
    assert.equal(listing.expert.is_demo, false);
    assert.equal(listing.expert.listing_plan, 'unpaid');
    assert.equal(listing.expert.free_period_ends_at, freePeriodEndsAt(NOW));
    assert.equal(listing.expert.full_name, 'Jane Doe');
    assert.equal(listing.expert.slug, 'jane-doe-2wgx4n');
    assert.equal(listing.expert.primary_engagement, 'monthly_retainer');
    assert.equal(listing.expert.starting_budget, '15000_plus');
    assert.equal(listing.expert.website_url, 'https://example.com');
    assert.equal(listing.expert.city, 'Austin');
    assert.deepEqual(listing.categories.map((category) => category.slug), ['operations-workflow-automation']);
    assert.equal(listing.categories[0]?.sortOrder, 0);
    assert.deepEqual(listing.tools.map((tool) => tool.slug), ['make', 'vapi']);
    assert.equal(listing.application.contact_email, 'jane@example.com');
    assert.equal(listing.application.legal_entity_type, 'S-Corp');
    assert.equal(listing.application.references_provided, true);
    assert.deepEqual(listing.application.portfolio_urls, ['https://github.com/jane/one', 'https://jane.example/work']);
    assert.equal(listing.caseStudy?.title, 'After-hours intake');
    assert.equal(listing.caseStudy?.hitl_oversight_mechanism, 'The call transfers to the on-call owner.');
    assert.match(listing.application.review_notes || '', /AI Advertising & Paid Media Ops/);
    assert.match(listing.application.review_notes || '', /Sales & Lead Qualification/);
    assert.match(listing.application.review_notes || '', /Some Future Tool/);
    assert.equal(store.submissions.get('2wgx4n')?.payload && typeof store.submissions.get('2wgx4n')?.payload, 'object');
  });

  test('does not request a rebuild for a pending listing', async () => {
    const store = memoryTallyStore({ categories: CATEGORIES, tools: TOOLS });
    const original = globalThis.fetch;
    let called = false;
    globalThis.fetch = (async () => {
      called = true;
      throw new Error('rebuild should not run');
    }) as typeof fetch;
    try {
      const response = await handleTallyWebhook(
        signedRequest(samplePayload()),
        { TALLY_SIGNING_SECRET: SECRET, CLOUDFLARE_DEPLOY_HOOK_URL: 'https://example.com/hook' },
        store,
        { now: NOW },
      );
      assert.equal(response.status, 200);
      assert.equal(called, false);
    } finally {
      globalThis.fetch = original;
    }
  });

  test('a Tally retry with the same responseId does not create a second expert', async () => {
    const store = memoryTallyStore({ categories: CATEGORIES, tools: TOOLS });
    const env = { TALLY_SIGNING_SECRET: SECRET };
    const first = await handleTallyWebhook(signedRequest(samplePayload()), env, store, { now: NOW });
    const second = await handleTallyWebhook(signedRequest(samplePayload()), env, store, { now: NOW });
    assert.equal(first.status, 200);
    assert.equal(second.status, 200);
    assert.equal((await second.json()).duplicate, true);
    assert.equal(store.listings.length, 1);
  });

  test('uses submissionId when responseId is absent', async () => {
    const store = memoryTallyStore({ categories: CATEGORIES, tools: TOOLS });
    const payload = samplePayload({ responseId: 'sub-only' });
    delete (payload.data as { responseId?: string }).responseId;
    const response = await handleTallyWebhook(signedRequest(payload), { TALLY_SIGNING_SECRET: SECRET }, store, { now: NOW });
    assert.equal(response.status, 200);
    assert.equal(store.listings[0]?.expert.slug, 'jane-doe-sub-only');
    const retry = await handleTallyWebhook(signedRequest(payload), { TALLY_SIGNING_SECRET: SECRET }, store, { now: NOW });
    assert.equal((await retry.json()).duplicate, true);
    assert.equal(store.listings.length, 1);
  });

  test('keeps the first live category when the short labels are used', () => {
    const mapped = mapTallySubmission(
      {
        eventId: null,
        eventType: 'FORM_RESPONSE',
        formId: 'Nq5NDp',
        responseId: 'short1',
        submissionId: 'short1',
        fields: [
          { label: 'Full Name', type: 'INPUT_TEXT', value: 'Ada Lovelace' },
          { label: 'Business Contact Email', type: 'INPUT_EMAIL', value: 'ada@example.com' },
          {
            label: 'Primary categories',
            type: 'CHECKBOXES',
            value: ['a', 'b'],
            options: [
              option('a', 'Operations'),
              option('b', 'Sales'),
            ],
          },
        ],
      },
      { categories: CATEGORIES, tools: TOOLS },
      NOW,
    );
    assert.equal(mapped.outcome, 'listing');
    assert.deepEqual(mapped.listing?.categories.map((category) => category.slug), ['operations-workflow-automation']);
    assert.deepEqual(mapped.flags.droppedCategories, ['Sales & Lead Qualification']);
    assert.equal(matchCatalog('Executive', CATEGORIES)?.slug, 'executive-personal-ai-ops');
    assert.equal(matchCatalog('AI Advertising & Paid Media Ops', CATEGORIES), null);
  });

  test('stores the raw submission and skips the expert when the email is unusable', async () => {
    const store = memoryTallyStore({ categories: CATEGORIES, tools: TOOLS });
    const payload = samplePayload();
    const email = payload.data.fields.find((field) => field.key === 'email');
    if (email) email.value = 'not-an-email';
    const response = await handleTallyWebhook(signedRequest(payload), { TALLY_SIGNING_SECRET: SECRET }, store, { now: NOW });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).status, 'needs_review');
    assert.equal(store.listings.length, 0);
    assert.equal(store.submissions.get('2wgx4n')?.status, 'needs_review');
    const retry = await handleTallyWebhook(signedRequest(payload), { TALLY_SIGNING_SECRET: SECRET }, store, { now: NOW });
    assert.equal((await retry.json()).duplicate, true);
  });

  test('ignores a different Tally form and does not create an expert', async () => {
    const store = memoryTallyStore({ categories: CATEGORIES, tools: TOOLS });
    const payload = samplePayload({ formId: '2j857M' });
    const response = await handleTallyWebhook(signedRequest(payload), { TALLY_SIGNING_SECRET: SECRET }, store, { now: NOW });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).ignored, true);
    assert.equal(store.listings.length, 0);
    assert.equal(store.submissions.get('2wgx4n')?.status, 'ignored');
  });
});

describe('tally supabase store', () => {
  test('writes a pending expert, the first category, and tools, then ignores a retry', async () => {
    const db = createFakeDb();
    const store = tallyStoreFromClient(db as unknown as TallyDb);
    const input = await listingInput();
    const created = await store.save(input);
    assert.equal(created.outcome, 'created');
    const experts = db.rows('experts');
    assert.equal(experts.length, 1);
    assert.equal(experts[0]?.status, 'pending_review');
    assert.equal(experts[0]?.is_verified, false);
    assert.equal(experts[0]?.listing_plan, 'unpaid');
    const categories = db.rows('expert_categories');
    assert.equal(categories.length, 1);
    assert.equal(categories[0]?.category_id, 'cat-ops');
    assert.equal(categories[0]?.sort_order, 0);
    assert.deepEqual(
      db.rows('expert_tools').map((row) => row.tool_id),
      ['tool-make', 'tool-vapi'],
    );
    assert.equal(db.rows('applications')[0]?.contact_email, 'jane@example.com');
    assert.equal(db.rows('tally_submissions')[0]?.status, 'stored');
    assert.equal(db.rows('case_studies').length, 1);

    const again = await store.save(input);
    assert.equal(again.outcome, 'duplicate');
    assert.equal(db.rows('experts').length, 1);
    assert.equal(db.rows('expert_categories').length, 1);
  });

  test('finishes a crashed delivery without inserting a second expert', async () => {
    const db = createFakeDb();
    const store = tallyStoreFromClient(db as unknown as TallyDb);
    const input = await listingInput();
    await store.save(input);
    const submission = db.rows('tally_submissions')[0];
    submission.status = 'received';
    submission.expert_id = null;
    const resumed = await store.save(input);
    assert.equal(resumed.outcome, 'created');
    assert.equal(resumed.expertId, db.rows('experts')[0]?.id);
    assert.equal(db.rows('experts').length, 1);
    assert.equal(db.rows('applications').length, 1);
    assert.equal(submission.status, 'stored');
  });

  test('retries category links without sort_order when that column is missing', async () => {
    const db = createFakeDb({ failSortOrderOnce: true });
    const store = tallyStoreFromClient(db as unknown as TallyDb);
    const created = await store.save(await listingInput());
    assert.equal(created.outcome, 'created');
    const categories = db.rows('expert_categories');
    assert.equal(categories.length, 1);
    assert.equal('sort_order' in categories[0], false);
  });

  test('fails before creating an expert when the audit table is missing', async () => {
    const db = createFakeDb({ missingTable: true });
    const store = tallyStoreFromClient(db as unknown as TallyDb);
    await assert.rejects(store.save(await listingInput()), (error: unknown) => {
      assert.ok(error instanceof TallyStoreError);
      assert.equal(error.code, 'missing_table');
      return true;
    });
    assert.equal(db.rows('experts').length, 0);
  });
});

async function listingInput(): Promise<TallySaveInput> {
  const mapped = mapTallySubmission(
    {
      eventId: 'evt-1',
      eventType: 'FORM_RESPONSE',
      formId: 'Nq5NDp',
      responseId: '2wgx4n',
      submissionId: '2wgx4n',
      fields: samplePayload().data.fields,
    },
    { categories: CATEGORIES, tools: TOOLS },
    NOW,
  );
  assert.equal(mapped.outcome, 'listing');
  return {
    responseId: '2wgx4n',
    submissionId: '2wgx4n',
    eventId: 'evt-1',
    formId: 'Nq5NDp',
    payload: { responseId: '2wgx4n' },
    outcome: 'listing',
    listing: mapped.listing,
    flags: mapped.flags,
  };
}

function createFakeDb(options?: { failSortOrderOnce?: boolean; missingTable?: boolean }) {
  const tables = new Map<string, Record<string, unknown>[]>();
  let ids = 0;
  let sortOrderFailures = options?.failSortOrderOnce ? 1 : 0;
  const rows = (table: string) => {
    if (!tables.has(table)) tables.set(table, []);
    return tables.get(table)!;
  };
  class Query {
    action: 'select' | 'insert' | 'update' | 'upsert' = 'select';
    payload: unknown;
    filters: [string, unknown][] = [];
    constructor(private table: string) {}
    insert(payload: unknown) {
      this.action = 'insert';
      this.payload = payload;
      return this;
    }
    update(payload: unknown) {
      this.action = 'update';
      this.payload = payload;
      return this;
    }
    upsert(payload: unknown) {
      this.action = 'upsert';
      this.payload = payload;
      return this;
    }
    select() {
      return this;
    }
    eq(column: string, value: unknown) {
      this.filters.push([column, value]);
      return this;
    }
    maybeSingle() {
      return Promise.resolve(this.exec(true));
    }
    single() {
      return Promise.resolve(this.exec(true));
    }
    then<TResult1 = { data: unknown; error: { code?: string; message?: string } | null }, TResult2 = never>(
      onfulfilled?: ((value: { data: unknown; error: { code?: string; message?: string } | null }) => TResult1 | PromiseLike<TResult1>) | null,
      onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
    ): Promise<TResult1 | TResult2> {
      return Promise.resolve(this.exec(false)).then(onfulfilled, onrejected);
    }
    private exec(single: boolean) {
      if (options?.missingTable && this.table === 'tally_submissions' && this.action === 'insert') {
        return {
          data: null,
          error: { code: 'PGRST205', message: "Could not find the table 'public.tally_submissions' in the schema cache" },
        };
      }
      const all = rows(this.table);
      const matches = (row: Record<string, unknown>) => this.filters.every(([column, value]) => row[column] === value);
      if (this.action === 'insert') {
        const incoming = (Array.isArray(this.payload) ? this.payload : [this.payload]) as Record<string, unknown>[];
        const stored = incoming.map((row) => {
          const copy = { ...row };
          if (copy.id == null && this.table !== 'expert_categories' && this.table !== 'expert_tools') {
            ids += 1;
            copy.id = `00000000-0000-4000-8000-${String(ids).padStart(12, '0')}`;
          }
          return copy;
        });
        if (this.table === 'tally_submissions' && all.some((row) => row.response_id === stored[0]?.response_id)) {
          return { data: null, error: { code: '23505', message: 'duplicate key value violates unique constraint' } };
        }
        all.push(...stored);
        return { data: single ? stored[0] : stored, error: null };
      }
      if (this.action === 'upsert') {
        const incoming = this.payload as Record<string, unknown>[];
        if (
          this.table === 'expert_categories' &&
          sortOrderFailures > 0 &&
          incoming.some((row) => Object.prototype.hasOwnProperty.call(row, 'sort_order'))
        ) {
          sortOrderFailures -= 1;
          return { data: null, error: { message: 'column sort_order does not exist' } };
        }
        const stored = incoming.map((row) => ({ ...row }));
        all.push(...stored);
        return { data: stored, error: null };
      }
      if (this.action === 'update') {
        const found = all.filter(matches);
        for (const row of found) Object.assign(row, this.payload as Record<string, unknown>);
        return { data: found, error: null };
      }
      const found = all.filter(matches);
      return { data: single ? (found[0] ?? null) : found, error: null };
    }
  }
  return {
    rows,
    from(table: string) {
      return new Query(table);
    },
  };
}
