# Marnus — Portfolio

**Live URL: pending** — deployed to Vercel; the URL goes here as soon as the first deployment is up.

## What this is

My personal portfolio site, built as the ITPROG26 Final Portfolio Project (weeks 32–38).
It introduces me, **Marnus**, to potential employers as a **Full-Stack Developer**, and shows
what I can build with Next.js, React, TypeScript, Tailwind and Supabase.

## Pages

| Route      | Purpose                                                        |
| ---------- | -------------------------------------------------------------- |
| `/`        | Home — 30-second pitch: who I am and the role I want            |
| `/about`   | About — background, the kind of role I'm looking for            |
| `/projects`| Projects — capstone case study plus other work                  |
| `/skills`  | Skills — each one backed by a link to evidence                  |
| `/contact` | Contact — working form (saves to Supabase from Part 2)          |
| `/cv`      | CV — download link                                              |

## Stack

Next.js (App Router) · React · TypeScript · Tailwind · Supabase (from W33) · Vercel

## Setup

```bash
npm install
npm run dev
```

## Environment variables

Names only — values are never committed (`.env*` is git-ignored):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

## AI use disclosure

AI tools (the OpenCode agent) were used for: scaffolding the repo, drafting wireframes,
writing boilerplate, and debugging. Design direction, content and every commit were
reviewed and approved by me before landing.

## Plan

Milestone plan and wireframes live in [`docs/`](./docs).
