-- Run in Supabase SQL editor for Reef Rush Fishing Tournament.
-- Community votes on the event type (votes lock when the morning early-join window opens);
-- 35 players sign up daily; top 3 win prizes.
-- Three play windows per day: 11:00 AM, 4:00 PM, and 8:00 PM (client uses local time).
-- Clients tally only votes cast before the morning join-open time.

create table if not exists public.tourney_votes (
  id bigserial primary key,
  day_key text not null,
  voter_client_id text not null,
  event_kind text not null,
  created_at timestamptz not null default now(),
  unique (day_key, voter_client_id)
);

create index if not exists tourney_votes_day_kind_idx
  on public.tourney_votes (day_key, event_kind);

create table if not exists public.tourney_signups (
  id bigserial primary key,
  day_key text not null,
  client_id text not null,
  initials text not null,
  display_name text not null default '',
  created_at timestamptz not null default now(),
  unique (day_key, client_id)
);

create index if not exists tourney_signups_day_idx
  on public.tourney_signups (day_key, created_at asc);

create table if not exists public.tourney_scores (
  id bigserial primary key,
  day_key text not null,
  slot_key text not null,
  client_id text not null,
  initials text not null,
  display_name text not null default '',
  event_kind text not null,
  score integer not null check (score > 0),
  created_at timestamptz not null default now(),
  unique (day_key, slot_key, client_id)
);

create index if not exists tourney_scores_day_best_idx
  on public.tourney_scores (day_key, score desc, created_at asc);

alter table public.tourney_votes enable row level security;
alter table public.tourney_signups enable row level security;
alter table public.tourney_scores enable row level security;

drop policy if exists "tourney_votes_anon_all" on public.tourney_votes;
create policy "tourney_votes_anon_all"
  on public.tourney_votes for all to anon, authenticated using (true) with check (true);

drop policy if exists "tourney_signups_anon_all" on public.tourney_signups;
create policy "tourney_signups_anon_all"
  on public.tourney_signups for all to anon, authenticated using (true) with check (true);

drop policy if exists "tourney_scores_anon_all" on public.tourney_scores;
create policy "tourney_scores_anon_all"
  on public.tourney_scores for all to anon, authenticated using (true) with check (true);
