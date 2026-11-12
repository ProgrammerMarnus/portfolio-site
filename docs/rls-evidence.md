# RLS proof — anonymous visitors can read but not write

Measured 2026-10-27 against the live Supabase project's REST endpoint
(`/rest/v1/projects`), acting as an anonymous visitor (publishable key only,
no sign-in). This is the evidence for the Part 2 reflection requirement.

## Results

| Test | Expected | Measured |
|---|---|---|
| Anon GET (read) | works | `HTTP 200`, `[]` |
| Anon INSERT | fails | `HTTP 401` — `42501 permission denied for table projects` |
| Anon UPDATE | fails | `HTTP 401` — `42501` |
| Anon DELETE | fails | `HTTP 401` — `42501` |
| Stranger sign-up | fails | `HTTP 422` — `signup_disabled` |
| Owner sign-in | works | `HTTP 200`, valid session token issued |
| Owner INSERT | works | `HTTP 201`, row stamped with the owner's `auth.uid()` |
| Owner DELETE | works | `HTTP 204`, table back to `[]` |

The anon tests were measured on 2026-10-27 (morning); the owner/stranger tests
the same day after the admin user was created. No test rows remain — the
owner-insert row was deleted by its owner as part of the test.

## Method

```bash
KEY="sb_publishable_…"   # publishable key only — the anon identity
URL="https://<project>.supabase.co/rest/v1/projects"

# A: read — allowed by policy "projects_select_public"
curl -s -w "\nHTTP:%{http_code}\n" "$URL?select=title" -H "apikey: $KEY"

# B: insert — rejected (revoke + owner-only policy)
curl -s -w "\nHTTP:%{http_code}\n" -X POST "$URL" \
  -H "apikey: $KEY" -H "Content-Type: application/json" \
  -d '{"title":"Anon test row","summary":"must fail"}'

# C: update — rejected
curl -s -w "\nHTTP:%{http_code}\n" -X PATCH \
  "$URL?id=eq.00000000-0000-0000-0000-000000000000" \
  -H "apikey: $KEY" -H "Content-Type: application/json" \
  -d '{"title":"hacked"}'

# D: delete — rejected
curl -s -w "\nHTTP:%{http_code}\n" -X DELETE \
  "$URL?id=eq.00000000-0000-0000-0000-000000000000" \
  -H "apikey: $KEY"
```

The owner-side tests used the same endpoint with a `Bearer <session-token>`
header obtained from `POST /auth/v1/token?grant_type=password` — i.e. a real
authenticated session, exactly what the /admin page holds after sign-in.
Stranger sign-up was tested with `POST /auth/v1/signup` and a throwaway
address. The admin account password is not recorded in this repo.

## Why it holds

- Row Level Security is enabled on `public.projects`.
- Writes are granted only to `authenticated` users **and** every policy
  checks `(select auth.uid()) = owner_id` — a signed-in user can only touch
  rows they own.
- `revoke insert, update, delete … from anon` removes table grants for the
  anonymous role outright, so unauthenticated writes fail with a permission
  error before policies are even considered.
- Sign-ups are disabled in the dashboard (single admin), so no other
  authenticated identity exists in practice.

## Contact messages (W35, measured 2026-11-12)

The contact form writes to `public.contact_messages` — the inverse rule set:
anyone may submit, only the owner may ever read or delete.

| Test | Expected | Measured |
|---|---|---|
| Anon SELECT | fails | `HTTP 401` — `42501 permission denied for table contact_messages` |
| Anon INSERT | works | `HTTP 201` (no read-back — `return=representation` needs SELECT, so it is not used) |
| Owner SELECT | works | `HTTP 200`, the submitted row is visible |
| Owner DELETE | works | `HTTP 204`, table back to `[]` |
| Live form E2E | works | headless Chromium: fill form → success view → row present in Supabase → deleted; 0 console errors |

Spam protection (brief: "basic"): app-side honeypot field (`website`, hidden,
filled = fake success, no row) + 3-second time-trap on instant submits +
`CHECK` length caps in the table definition (name 2–100, email 5–254,
message 10–5000).

Lesson recorded: an RLS policy is a filter, not a privilege. The first insert
probe failed with `42501` until `grant insert on public.contact_messages to
anon, authenticated` was added — the fix now lives in
`supabase/0002_contact_messages.sql` (commit `9639304`).
