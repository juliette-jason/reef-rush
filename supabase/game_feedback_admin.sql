-- Run in Supabase SQL editor after game_feedback.sql.
-- Adds review status for the admin Feedback Inbox (Approve / Dismiss).

alter table public.game_feedback
  add column if not exists status text not null default 'pending';

alter table public.game_feedback
  add column if not exists reviewed_at timestamptz;

update public.game_feedback
set status = 'pending'
where status is null
   or status not in ('pending', 'approved', 'dismissed');

create index if not exists game_feedback_status_created_idx
  on public.game_feedback (status, created_at desc);

-- Allow anon/authenticated to update status + reviewed_at (same casual trust as open select).
drop policy if exists "game_feedback_anon_update_status" on public.game_feedback;
create policy "game_feedback_anon_update_status"
  on public.game_feedback
  for update
  to anon, authenticated
  using (true)
  with check (
    status in ('pending', 'approved', 'dismissed')
  );
