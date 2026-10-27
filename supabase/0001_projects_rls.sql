-- projects table + owner-only RLS for the portfolio site.
-- Paste into Supabase Dashboard → SQL Editor and run.
-- Re-runnable: dropping the table also drops its policies.
-- NOTE: re-running wipes existing rows.

drop table if exists public.projects;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  -- The signed-in owner of this row. Written automatically from the JWT;
  -- RLS policies compare it against auth.uid().
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null,
  summary text not null,
  live_url text,
  repo_url text,
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Anyone (signed in or not) can read the public project list.
create policy "projects_select_public"
  on public.projects for select
  to anon, authenticated
  using (true);

-- Only the owner of a row may write it. auth.uid() is wrapped in
-- (select ...) so Postgres evaluates it once per statement.
create policy "projects_insert_owner"
  on public.projects for insert
  to authenticated
  with check ((select auth.uid()) = owner_id);

create policy "projects_update_owner"
  on public.projects for update
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

create policy "projects_delete_owner"
  on public.projects for delete
  to authenticated
  using ((select auth.uid()) = owner_id);

-- Policies filter access but don't remove grants. Revoke writes for the
-- anon role explicitly so unauthenticated writes fail outright.
revoke insert, update, delete on public.projects from anon;
