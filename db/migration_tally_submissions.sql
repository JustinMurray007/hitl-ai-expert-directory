-- Run this in the Supabase SQL editor for project clxpvacfppcikyituuyj
-- before the Tally webhook deploy. Do not apply it from the app.
--
-- Stores each apply-form delivery so retries are idempotent and the original
-- answers (including categories that are not live) are kept. The table holds
-- contact email and the raw payload, so it is service-role only.

create table if not exists tally_submissions (
  response_id text primary key,
  submission_id text,
  event_id text,
  form_id text,
  expert_id uuid references experts(id) on delete set null,
  application_id uuid references applications(id) on delete set null,
  status text not null default 'received' check (status in ('received', 'stored', 'needs_review', 'ignored')),
  unknown_categories jsonb not null default '[]',
  dropped_categories jsonb not null default '[]',
  unknown_tools jsonb not null default '[]',
  mapping_notes jsonb not null default '[]',
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists tally_submissions_expert_id on tally_submissions (expert_id);

comment on table tally_submissions is
  'Private audit log for the findaipros.com/apply Tally webhook. response_id (or submission_id) dedupes retries. payload is the raw FORM_RESPONSE.';

alter table tally_submissions enable row level security;

grant all privileges on table public.tally_submissions to service_role;
revoke all privileges on table public.tally_submissions from anon, authenticated;
