-- ============================================================================
-- Human in the Loop — Supabase / PostgreSQL schema
-- ----------------------------------------------------------------------------
-- Core design decisions (differs from the original draft):
--   1. Publication, verification, and sponsorship are SEPARATE dimensions.
--      A profile can be published without being verified; a verified profile
--      can also be sponsored. Payment never confers verification.
--   2. Private application data (contact email, legal entity, reviewer notes,
--      evidence links) lives in a separate table so it is never exposed via
--      the public read path. Public experts table holds only public fields.
--   3. Reviewer evidence (who verified, when, what was checked) is recorded
--      separately and is not applicant-writable.
--   4. Ratings are omitted — there is no review system. Never store a fake 5.00.
--   5. Case studies are optional. They are not required to be listed or verified.
--      References we can contact remain the proof requirement.
--      `verified_case_study_count` only counts optional reviewer-confirmed
--      case studies. It is not a gate, and payment never confers verification.
--   6. `listing_plan` and `free_period_ends_at` are separate from verification.
--      Null plan and null free-period end = legacy row (public links stay).
--      unpaid + free_period_ends_at in the future = the free 30 days (links show).
--      After that date, with no paid plan, the app hides website, social,
--      booking, and match eligibility. The listing stays public.
--   7. Category caps are plan-based, enforced in application logic (not a DB max):
--      free listing 1, Basic 1, Featured 3, Premium every category, plus paid extras.
--      expert_categories.sort_order is the order the specialist chose.
-- ============================================================================

create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- ENUMS
-- ----------------------------------------------------------------------------
create type listing_status as enum ('pending_review', 'published', 'rejected', 'archived');
create type verification_status as enum ('unverified', 'in_review', 'verified', 'rejected');
create type engagement_model as enum ('fixed_sprint', 'monthly_retainer', 'consulting_audit', 'hybrid');
create type budget_tier as enum ('under_2500', '2500_to_5000', '5000_to_15000', '15000_plus');
create type match_request_status as enum ('new', 'reviewing', 'introduced', 'closed');

-- ----------------------------------------------------------------------------
-- CATEGORIES — SEO hub pages
-- ----------------------------------------------------------------------------
create table categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  icon_name text,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------------------
-- TOOLS / TECH STACK BADGES
-- ----------------------------------------------------------------------------
create table tools (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  category text,        -- 'Automation Engine' | 'LLM Provider' | 'Voice AI' | 'CRM' | 'Database'
  logo_url text,
  created_at timestamptz default now()
);

-- ----------------------------------------------------------------------------
-- EXPERTS — PUBLIC DIRECTORY DATA
-- Contains ONLY fields that are safe to expose via public read.
-- ============================================================================
create table experts (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  updated_at timestamptz default now() check (updated_at >= created_at),

  -- Public profile
  slug text unique not null,
  full_name text not null,
  professional_title text,
  agency_name text,
  tagline text not null check (char_length(tagline) <= 120),
  bio text not null,
  avatar_url text not null,
  city text not null,
  state_region text,
  country text not null default 'United States',
  timezone text not null,

  -- Public links & CTAs
  website_url text,
  github_url text,
  linkedin_url text,
  booking_url text,

  -- Pricing & engagement (public — buyers filter on these)
  primary_engagement engagement_model not null default 'fixed_sprint',
  starting_budget budget_tier not null default '2500_to_5000',

  -- Lifecycle (publication vs verification vs sponsorship — separate axes)
  status listing_status not null default 'pending_review',
  is_verified boolean not null default false,
  verified_at timestamptz,
  verified_case_study_count int not null default 0 check (verified_case_study_count >= 0),
  sponsor_rank int not null default 0 check (sponsor_rank >= 0),

  -- Billing is separate from verification. See header note 6.
  listing_plan text check (listing_plan is null or listing_plan in ('unpaid', 'basic', 'featured', 'premium')),
  free_period_ends_at timestamptz,
  profile_mode text check (profile_mode is null or profile_mode in ('full', 'limited')),
  subscription_status text,
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_lookup_key text,
  billing_interval text check (billing_interval is null or billing_interval in ('month', 'year')),
  current_period_end timestamptz,
  cancel_at timestamptz,
  extra_category_quantity int not null default 0 check (extra_category_quantity >= 0),
  referrer_expert_id uuid,

  -- Demo content flag — never true in production
  is_demo boolean not null default false
);

-- ----------------------------------------------------------------------------
-- APPLICATIONS — PRIVATE INTAKE DATA
-- Contains contact email, legal entity, private evidence. Never public.
-- ============================================================================
create table applications (
  id uuid primary key default uuid_generate_v4(),
  expert_id uuid references experts(id) on delete cascade,
  created_at timestamptz default now(),

  -- Private contact
  contact_email text not null,
  legal_entity_type text,             -- 'LLC' | 'S-Corp' | 'Sole Proprietorship' | 'Other'

  -- Self-reported (applicant-controlled)
  portfolio_urls jsonb default '[]',
  case_study_urls jsonb default '[]',
  references_provided boolean default false,

  -- Review evidence (reviewer-controlled, not applicant-writable via public API)
  reviewed_by text,
  review_notes text,
  review_decision verification_status default 'unverified',
  reviewed_at timestamptz
);

-- ----------------------------------------------------------------------------
-- CASE STUDIES — THE HITL PROOF ENGINE
-- ============================================================================
create table case_studies (
  id uuid primary key default uuid_generate_v4(),
  expert_id uuid not null references experts(id) on delete cascade,
  created_at timestamptz default now(),

  title text not null,
  client_industry text not null,
  problem_statement text not null,
  solution_architecture text not null,

  -- Optional example of past work. Not required to apply or to be verified.
  hitl_oversight_mechanism text not null,
  failure_safeguards text not null,
  outcomes_roi text not null,
  demo_video_url text,

  -- Is this case study part of the verification evidence?
  is_verification_evidence boolean default false,
  reviewer_confirmed boolean default false,

  is_featured boolean default false
);

-- ----------------------------------------------------------------------------
-- JUNCTIONS
-- ----------------------------------------------------------------------------
create table expert_categories (
  expert_id uuid references experts(id) on delete cascade,
  category_id uuid references categories(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (expert_id, category_id)
);

create table expert_tools (
  expert_id uuid references experts(id) on delete cascade,
  tool_id uuid references tools(id) on delete cascade,
  primary key (expert_id, tool_id)
);

-- ----------------------------------------------------------------------------
-- FOUNDER MATCHMAKING INTAKE (private)
-- ============================================================================
create table match_requests (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  status match_request_status default 'new',

  requester_name text not null,
  requester_email text not null,
  company text,
  need_description text not null,
  budget_range budget_tier,
  timeline text,
  preferred_categories jsonb default '[]',   -- category slugs
  internal_notes text
);

-- ----------------------------------------------------------------------------
-- INDEXES
-- ============================================================================
create index idx_experts_status on experts(status);
create index idx_experts_slug on experts(slug);
create index idx_experts_sponsor_rank on experts(sponsor_rank desc);
create index idx_experts_is_verified on experts(is_verified);
create index idx_experts_demo on experts(is_demo);
create index idx_case_studies_expert_id on case_studies(expert_id);
create index idx_applications_expert_id on applications(expert_id);
create index idx_match_requests_status on match_requests(status);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- Public can read published experts + public fields only.
-- Private tables (applications, match_requests, review_notes) are
-- service-role-only — no anonymous access.
-- ============================================================================
alter table experts enable row level security;
alter table categories enable row level security;
alter table tools enable row level security;
alter table case_studies enable row level security;
alter table applications enable row level security;
alter table match_requests enable row level security;
alter table expert_categories enable row level security;
alter table expert_tools enable row level security;

-- Public read: only published, non-demo experts
create policy "public read published experts" on experts
  for select using (status = 'published' and is_demo = false);

-- Public read: categories, tools (reference data)
create policy "public read categories" on categories for select using (true);
create policy "public read tools" on tools for select using (true);

-- Public read: case studies for published experts only
create policy "public read case studies" on case_studies
  for select using (
    exists (select 1 from experts e where e.id = expert_id and e.status = 'published' and e.is_demo = false)
  );

-- Public read: junctions for published experts only
create policy "public read expert categories" on expert_categories
  for select using (
    exists (select 1 from experts e where e.id = expert_id and e.status = 'published' and e.is_demo = false)
  );
create policy "public read expert tools" on expert_tools
  for select using (
    exists (select 1 from experts e where e.id = expert_id and e.status = 'published' and e.is_demo = false)
  );

-- No public policies for applications / match_requests — service-role only.

-- ----------------------------------------------------------------------------
-- SEED: CATEGORIES
-- ============================================================================
insert into categories (slug, name, description, icon_name) values
  ('operations-workflow-automation', 'Operations & Workflow Automation',
   'CRM syncing, invoice processing, PDF document extraction, internal handoffs and reporting automation.',
   'WorkflowIcon'),
  ('sales-lead-qualification', 'Sales & Lead Qualification',
   '24/7 inbound response, call routing, lead scoring, cold-outreach triage.',
   'SalesIcon'),
  ('customer-support-knowledge-base', 'Customer Support & Knowledge Bases',
   'FAQ accuracy from internal docs, ticketing triage, RAG and documentation retrieval.',
   'SupportIcon'),
  ('marketing-programmatic-content', 'Marketing & Programmatic Content',
   'Review generation, local SEO content workflows, automated estimate follow-ups.',
   'MarketingIcon'),
  ('executive-personal-ai-ops', 'Executive & Personal AI Ops',
   'Daily scheduling, email triage, meeting action-item digestion, personal SOPs.',
   'UserIcon');

-- ----------------------------------------------------------------------------
-- SEED: TOOLS
-- ============================================================================
insert into tools (slug, name, category) values
  ('make', 'Make', 'Automation Engine'),
  ('zapier', 'Zapier', 'Automation Engine'),
  ('n8n', 'n8n', 'Automation Engine'),
  ('openai-api', 'OpenAI API', 'LLM Provider'),
  ('anthropic-claude', 'Anthropic Claude', 'LLM Provider'),
  ('gemini', 'Google Gemini', 'LLM Provider'),
  ('perplexity', 'Perplexity', 'LLM Provider'),
  ('vapi', 'Vapi', 'Voice AI'),
  ('retell-ai', 'Retell AI', 'Voice AI'),
  ('bland-ai', 'Bland.ai', 'Voice AI'),
  ('twilio', 'Twilio', 'Voice AI'),
  ('supabase-postgres', 'Supabase / PostgreSQL', 'Database'),
  ('pinecone', 'Pinecone', 'Vector DB'),
  ('hubspot', 'HubSpot', 'CRM'),
  ('zoho-crm', 'Zoho CRM', 'CRM'),
  ('gohighlevel', 'GoHighLevel', 'CRM'),
  ('zendesk', 'Zendesk AI', 'Support'),
  ('intercom', 'Intercom AI', 'Support'),
  ('cursor', 'Cursor', 'Dev Tools'),
  ('python', 'Python', 'Dev Tools'),
  ('typescript', 'TypeScript', 'Dev Tools'),
  ('ollama', 'Ollama / Local LLM', 'LLM Provider');

-- ----------------------------------------------------------------------------
-- updated_at maintenance trigger
-- ============================================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_experts_updated_at
  before update on experts
  for each row execute function set_updated_at();

create trigger trg_case_studies_updated_at
  before update on case_studies
  for each row execute function set_updated_at();

create trigger trg_applications_updated_at
  before update on applications
  for each row execute function set_updated_at();

-- ----------------------------------------------------------------------------
-- STRIPE BILLING — private. Service role only.
-- Referral payouts are a ledger for manual payment. No Stripe Connect.
-- ============================================================================
create table stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  processed_at timestamptz default now()
);

create table referral_ledger (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  stripe_event_id text not null,
  stripe_invoice_id text,
  expert_id uuid,
  referrer_expert_id uuid,
  amount_cents int not null,
  currency text not null default 'usd',
  kind text not null check (kind in ('credit', 'reversal')),
  status text not null default 'unpaid' check (status in ('unpaid', 'paid', 'void')),
  unique (stripe_event_id, kind)
);

create table billing_pending (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  expert_id text,
  stripe_customer_id text,
  patch jsonb not null default '{}'
);

alter table stripe_webhook_events enable row level security;
alter table referral_ledger enable row level security;
alter table billing_pending enable row level security;

-- ----------------------------------------------------------------------------
-- NOTES
-- ============================================================================
-- • Fictional demo experts are inserted only in DEMO mode via the app's seed
--   script, marked is_demo = true. They are excluded from public RLS reads
--   and from robots.txt / sitemap in production.
-- • Category caps (free 1, Basic 1, Featured 3, Premium every category, plus
--   paid extras) and the 120-char tagline limit are enforced in the
--   application validation layer, not at the DB level.
--   expert_categories.sort_order keeps the specialist's chosen order so a
--   downgrade can drop the later categories.
-- • Case studies are optional and are not a verification gate.
--   References we can contact are required before verification when an
--   application row exists. See `applications.references_provided`.
