-- Run in Supabase SQL editor if duel_matches already exists without hook sync columns.
-- Enables live rival hook position + score sync during PvP duels.

alter table public.duel_matches add column if not exists host_hook_x_pct real not null default 0.5;
alter table public.duel_matches add column if not exists host_hook_y_pct real not null default 0.08;
alter table public.duel_matches add column if not exists host_hook_cast smallint not null default 0;
alter table public.duel_matches add column if not exists guest_hook_x_pct real not null default 0.5;
alter table public.duel_matches add column if not exists guest_hook_y_pct real not null default 0.08;
alter table public.duel_matches add column if not exists guest_hook_cast smallint not null default 0;
