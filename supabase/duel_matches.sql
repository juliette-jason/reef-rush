-- Run in Supabase SQL editor for Reef Rush duel matchmaking.
-- Matches real players in the Events duel lobby; clients fall back to COM if nobody joins.

create table if not exists public.duel_matches (
  id uuid primary key default gen_random_uuid(),
  reef_id text not null,
  host_client_id text not null,
  guest_client_id text,
  host_initials text not null default 'AAA',
  guest_initials text not null default '',
  host_score integer not null default 0,
  guest_score integer not null default 0,
  round_start_ms bigint,
  round_ms integer not null default 60000,
  match_kind text not null default 'duel',
  is_com_guest boolean not null default false,
  status text not null default 'lobby',
  host_hook_x_pct real not null default 0.5,
  host_hook_y_pct real not null default 0.08,
  host_hook_cast smallint not null default 0,
  guest_hook_x_pct real not null default 0.5,
  guest_hook_y_pct real not null default 0.08,
  guest_hook_cast smallint not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists duel_matches_lobby_idx
  on public.duel_matches (status, created_at)
  where status = 'lobby' and guest_client_id is null;

alter table public.duel_matches enable row level security;

drop policy if exists "duel_matches_anon_all" on public.duel_matches;
create policy "duel_matches_anon_all"
  on public.duel_matches
  for all
  to anon, authenticated
  using (true)
  with check (true);
