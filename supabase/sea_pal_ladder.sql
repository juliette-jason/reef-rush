-- Run in Supabase SQL editor for Reef Rush Sea Pal Weekly Ladder.
-- Monday-local week_key; climb by wins (20 wins = grand prize). Board ranks by wins, then fewest losses.

create table if not exists public.sea_pal_ladder (
  id bigserial primary key,
  week_key text not null,
  client_id text not null,
  initials text not null default '',
  display_name text not null default '',
  wins integer not null default 0 check (wins >= 0),
  losses integer not null default 0 check (losses >= 0),
  updated_at timestamptz not null default now(),
  unique (week_key, client_id)
);

create index if not exists sea_pal_ladder_week_rank_idx
  on public.sea_pal_ladder (week_key, wins desc, losses asc, updated_at asc);

alter table public.sea_pal_ladder enable row level security;

drop policy if exists "sea_pal_ladder_anon_all" on public.sea_pal_ladder;
create policy "sea_pal_ladder_anon_all"
  on public.sea_pal_ladder
  for all
  to anon, authenticated
  using (true)
  with check (true);
