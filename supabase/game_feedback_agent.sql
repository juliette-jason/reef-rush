-- Run in Supabase SQL editor after game_feedback_admin.sql.
-- Locks status updates to the Edge Function (service role) and stores Cursor agent ids.

alter table public.game_feedback
  add column if not exists agent_id text not null default '';

alter table public.game_feedback
  add column if not exists agent_url text not null default '';

-- Owner devices allowed to Approve / start Cloud Agents (managed by Edge Function).
create table if not exists public.feedback_owner_devices (
  client_id text primary key,
  created_at timestamptz not null default now(),
  label text not null default ''
);

alter table public.feedback_owner_devices enable row level security;
-- No anon policies: only service role (Edge Function) can read/write.

-- Seed Juliette's known devices (from prior feedback). Safe to re-run.
insert into public.feedback_owner_devices (client_id, label)
values
  ('f4efa2ab-8879-4b3b-8adc-4c24c8ff6255', 'Juliette recent'),
  ('802c4e2b-05ba-473d-951d-acd44a40e6a6', 'Juliette testing'),
  ('0c8b4597-81ff-4540-944c-de750c0e211b', 'Juliette older')
on conflict (client_id) do nothing;

-- Stop public status changes — Approve/Dismiss go through the Edge Function only.
drop policy if exists "game_feedback_anon_update_status" on public.game_feedback;
