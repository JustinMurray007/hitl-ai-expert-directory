-- Adds listing plan and free-period end for the public link rule.
-- Safe to run once. Does not backfill existing rows.
-- Null listing_plan and null free_period_ends_at stay "legacy": the app
-- keeps website, social, and contact links until those fields are set.
-- New applications should set listing_plan = 'unpaid' and
-- free_period_ends_at = now() + 30 days.

alter table experts add column if not exists listing_plan text;
alter table experts add column if not exists free_period_ends_at timestamptz;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'experts_listing_plan_check'
  ) then
    alter table experts
      add constraint experts_listing_plan_check
      check (
        listing_plan is null
        or listing_plan in ('unpaid', 'basic', 'featured', 'premium')
      );
  end if;
end $$;
