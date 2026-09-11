-- Run in Supabase SQL editor for Reef Rush play counts / popular minigame stats.

create table if not exists public.game_play_events (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  client_id text not null,
  event_kind text not null,
  day_key text not null default ''
);

create index if not exists game_play_events_kind_idx
  on public.game_play_events (event_kind);

create index if not exists game_play_events_client_idx
  on public.game_play_events (client_id);

create index if not exists game_play_events_created_idx
  on public.game_play_events (created_at desc);

alter table public.game_play_events enable row level security;

drop policy if exists "game_play_events_anon_all" on public.game_play_events;
create policy "game_play_events_anon_all"
  on public.game_play_events
  for all
  to anon, authenticated
  using (true)
  with check (true);
