-- Run in Supabase SQL editor so bug feedback can include screenshots.
-- Safe to re-run.

alter table public.game_feedback
  add column if not exists screenshot_url text not null default '';

-- Public bucket for feedback screenshots (view URLs from Table Editor).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'feedback-screenshots',
  'feedback-screenshots',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "feedback_screenshots_anon_insert" on storage.objects;
create policy "feedback_screenshots_anon_insert"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'feedback-screenshots');

drop policy if exists "feedback_screenshots_anon_select" on storage.objects;
create policy "feedback_screenshots_anon_select"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'feedback-screenshots');
