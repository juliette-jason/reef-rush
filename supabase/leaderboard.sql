-- Run in Supabase SQL editor for Reef Rush all-time Top 10.
-- Stores display names (profile names) with initials as the stable player key.

create table if not exists public.leaderboard (
  id bigserial primary key,
  initials text not null,
  display_name text not null default '',
  score integer not null check (score > 0),
  reef_id text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists leaderboard_score_idx
  on public.leaderboard (score desc, created_at asc);

alter table public.leaderboard enable row level security;

drop policy if exists "leaderboard_anon_all" on public.leaderboard;
create policy "leaderboard_anon_all"
  on public.leaderboard
  for all
  to anon, authenticated
  using (true)
  with check (true);
