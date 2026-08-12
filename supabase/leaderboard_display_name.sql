-- Add display names to global + daily leaderboards (run in Supabase SQL editor).

alter table if exists public.leaderboard
  add column if not exists display_name text not null default '';

alter table if exists public.daily_leaderboard
  add column if not exists display_name text not null default '';
