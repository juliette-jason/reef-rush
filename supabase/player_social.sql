-- Run in Supabase SQL editor for Reef Rush sign-in, friends, and friend invites.
-- Also enable Google + Apple providers under Authentication → Providers.

create table if not exists public.player_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  initials text not null default 'AAA',
  companion_id text not null default 'harbor_gull',
  client_id text not null default '',
  friend_code text not null unique,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists player_profiles_friend_code_idx
  on public.player_profiles (friend_code);

create index if not exists player_profiles_last_seen_idx
  on public.player_profiles (last_seen_at desc);

create table if not exists public.player_friends (
  user_id uuid not null references auth.users (id) on delete cascade,
  friend_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, friend_id),
  check (user_id <> friend_id)
);

create index if not exists player_friends_friend_id_idx
  on public.player_friends (friend_id);

alter table public.duel_matches
  add column if not exists invite_user_id uuid,
  add column if not exists host_user_id uuid,
  add column if not exists guest_user_id uuid;

create index if not exists duel_matches_friend_invite_idx
  on public.duel_matches (invite_user_id, status, match_kind, created_at)
  where status = 'lobby' and guest_client_id is null;

alter table public.player_profiles enable row level security;
alter table public.player_friends enable row level security;

drop policy if exists "player_profiles_select" on public.player_profiles;
create policy "player_profiles_select"
  on public.player_profiles
  for select
  to anon, authenticated
  using (true);

drop policy if exists "player_profiles_insert" on public.player_profiles;
create policy "player_profiles_insert"
  on public.player_profiles
  for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "player_profiles_update" on public.player_profiles;
create policy "player_profiles_update"
  on public.player_profiles
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "player_friends_select" on public.player_friends;
create policy "player_friends_select"
  on public.player_friends
  for select
  to authenticated
  using (user_id = auth.uid() or friend_id = auth.uid());

drop policy if exists "player_friends_insert" on public.player_friends;
create policy "player_friends_insert"
  on public.player_friends
  for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "player_friends_delete" on public.player_friends;
create policy "player_friends_delete"
  on public.player_friends
  for delete
  to authenticated
  using (user_id = auth.uid() or friend_id = auth.uid());
