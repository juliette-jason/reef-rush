-- Run in Supabase SQL editor if duel_matches already exists without companion sync columns.
-- Stores each player's equipped sea pal for pre-game matchup screens.

alter table public.duel_matches add column if not exists host_companion_id text not null default 'harbor_gull';
alter table public.duel_matches add column if not exists guest_companion_id text not null default '';
