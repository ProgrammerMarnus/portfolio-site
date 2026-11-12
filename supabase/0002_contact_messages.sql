-- Contact form submissions (W35).
-- Anyone (anon) may INSERT — that is the point of a public contact form —
-- but nobody may read, change or delete submissions except the signed-in owner.
--
-- Spam protection layers (brief: "basic spam protection"):
--   1. app-side honeypot field — bots that fill it get a fake success, no row
--   2. app-side time-trap — submits < 3 s after page load get a fake success
--   3. DB CHECK constraints cap field lengths so junk floods stay small
--
-- Same conventions as 0001: drop the table first (dropping drops its policies),
-- then create, enable RLS, add policies, and strip anon's default grants.

drop table if exists public.contact_messages;

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 2 and 100),
  email text not null check (char_length(btrim(email)) between 5 and 254),
  message text not null check (char_length(btrim(message)) between 10 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- anyone may submit
create policy contact_insert_anyone
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- only the signed-in owner may read submissions
create policy contact_select_owner
  on public.contact_messages
  for select
  to authenticated
  using (true);

-- the owner may clean up test/spam rows; there is deliberately no update policy
create policy contact_delete_owner
  on public.contact_messages
  for delete
  to authenticated
  using (true);

revoke select, update, delete on public.contact_messages from anon;
