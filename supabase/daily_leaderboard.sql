-- Run in Supabase SQL editor for Reef Rush Fisher of the Day.
-- Shares today's best score per player across all devices.

create table if not exists public.daily_leaderboard (
  id bigserial primary key,
  day_key text not null,
  initials text not null,
  score integer not null check (score > 0),
  reef_id text not null default '',
  created_at timestamptz not null default now()
);

create unique index if not exists daily_leaderboard_day_initials_idx
  on public.daily_leaderboard (day_key, initials);

create index if not exists daily_leaderboard_day_score_idx
  on public.daily_leaderboard (day_key, score desc, created_at asc);

alter table public.daily_leaderboard enable row level security;

drop policy if exists "daily_leaderboard_anon_all" on public.daily_leaderboard;
create policy "daily_leaderboard_anon_all"
  on public.daily_leaderboard
  for all
  to anon, authenticated
  using (true)
  with check (true);
