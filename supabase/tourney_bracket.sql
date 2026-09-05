-- Duel Fishing Tourney bracket (when Duel wins the daily vote).
-- 35 signups → seeds 1–32 enter single-elim; seeds 33–35 get 1,000 coins (client-paid).
-- Run in Supabase SQL editor after fishing_tournament.sql.

create table if not exists public.tourney_bracket_entries (
  day_key text not null,
  client_id text not null,
  seed integer not null check (seed >= 1 and seed <= 35),
  initials text not null default '',
  display_name text not null default '',
  in_bracket boolean not null default true,
  created_at timestamptz not null default now(),
  primary key (day_key, client_id)
);

create index if not exists tourney_bracket_entries_day_seed_idx
  on public.tourney_bracket_entries (day_key, seed asc);

create table if not exists public.tourney_bracket_matches (
  day_key text not null,
  round_key text not null,
  match_index integer not null check (match_index >= 0),
  slot_key text not null,
  player_a_id text,
  player_b_id text,
  winner_id text,
  status text not null default 'pending',
  updated_at timestamptz not null default now(),
  primary key (day_key, round_key, match_index)
);

create index if not exists tourney_bracket_matches_day_slot_idx
  on public.tourney_bracket_matches (day_key, slot_key, status);

alter table public.tourney_bracket_entries enable row level security;
alter table public.tourney_bracket_matches enable row level security;

drop policy if exists "tourney_bracket_entries_anon_all" on public.tourney_bracket_entries;
create policy "tourney_bracket_entries_anon_all"
  on public.tourney_bracket_entries for all to anon, authenticated using (true) with check (true);

drop policy if exists "tourney_bracket_matches_anon_all" on public.tourney_bracket_matches;
create policy "tourney_bracket_matches_anon_all"
  on public.tourney_bracket_matches for all to anon, authenticated using (true) with check (true);
