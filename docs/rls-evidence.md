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
