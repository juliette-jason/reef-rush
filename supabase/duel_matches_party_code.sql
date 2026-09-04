-- Run in Supabase SQL editor for Reef Rush friend party codes.
-- Hosts get an auto-generated code; friends join by typing it (no sign-in).

alter table public.duel_matches
  add column if not exists party_code text;

create unique index if not exists duel_matches_party_code_lobby_idx
  on public.duel_matches (party_code)
  where status = 'lobby' and party_code is not null;

create index if not exists duel_matches_party_code_lookup_idx
  on public.duel_matches (party_code, status, created_at desc)
  where party_code is not null;
