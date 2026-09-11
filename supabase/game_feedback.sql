-- Run in Supabase SQL editor for Reef Rush bug reports / player advice.

create table if not exists public.game_feedback (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  message text not null check (char_length(message) between 1 and 4000),
  kind text not null default 'feedback',
  client_id text not null default '',
  player_name text not null default '',
  user_agent text not null default ''
);

create index if not exists game_feedback_created_idx
  on public.game_feedback (created_at desc);

alter table public.game_feedback enable row level security;

drop policy if exists "game_feedback_anon_insert" on public.game_feedback;
create policy "game_feedback_anon_insert"
  on public.game_feedback
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "game_feedback_anon_select" on public.game_feedback;
create policy "game_feedback_anon_select"
  on public.game_feedback
  for select
  to anon, authenticated
  using (true);
