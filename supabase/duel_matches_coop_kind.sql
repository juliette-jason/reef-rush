-- Run in Supabase SQL editor if duel_matches already exists without match_kind.
-- Separates duel lobbies from co-op haul partner lobbies on the same table.

alter table public.duel_matches add column if not exists match_kind text not null default 'duel';

create index if not exists duel_matches_kind_lobby_idx
  on public.duel_matches (match_kind, status, created_at)
  where status = 'lobby' and guest_client_id is null;
