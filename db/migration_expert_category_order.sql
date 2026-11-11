-- Run this on the live Supabase project before the category-selection deploy.
-- Do not apply it from the app. It only adds selection order on the existing
-- expert_categories join. No data is deleted.

alter table expert_categories
  add column if not exists sort_order integer not null default 0;

comment on column expert_categories.sort_order is
  'Order the specialist chose. On a downgrade or cancel, keep the lowest sort_order values up to the plan cap (free/canceled 1, Basic 1, Featured 3, Premium every category, plus paid extras).';
