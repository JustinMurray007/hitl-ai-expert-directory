-- Stripe billing columns, webhook idempotency, and the manual referral ledger.
-- Does not enable Stripe Tax. No Connect tables.
-- Safe to run once on a database that already has listing_plan.

alter table experts add column if not exists profile_mode text;
alter table experts add column if not exists subscription_status text;
alter table experts add column if not exists stripe_customer_id text;
alter table experts add column if not exists stripe_subscription_id text;
alter table experts add column if not exists stripe_price_lookup_key text;
alter table experts add column if not exists billing_interval text;
alter table experts add column if not exists current_period_end timestamptz;
alter table experts add column if not exists cancel_at timestamptz;
alter table experts add column if not exists extra_category_quantity int not null default 0;
alter table experts add column if not exists referrer_expert_id uuid;

create table if not exists stripe_webhook_events (
  event_id text primary key,
  event_type text not null,
  processed_at timestamptz default now()
);

create table if not exists referral_ledger (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  stripe_event_id text not null,
  stripe_invoice_id text,
  expert_id uuid,
  referrer_expert_id uuid,
  amount_cents int not null,
  currency text not null default 'usd',
  kind text not null check (kind in ('credit', 'reversal')),
  status text not null default 'unpaid' check (status in ('unpaid', 'paid', 'void'))
);

create unique index if not exists referral_ledger_event_kind
  on referral_ledger (stripe_event_id, kind);

create table if not exists billing_pending (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  expert_id text,
  stripe_customer_id text,
  patch jsonb not null default '{}'
);

alter table stripe_webhook_events enable row level security;
alter table referral_ledger enable row level security;
alter table billing_pending enable row level security;
