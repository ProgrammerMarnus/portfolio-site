# Marnus — Full-Stack Developer Portfolio

**Live site:** https://portfolio-site-beta-rosy-22.vercel.app/

A personal portfolio built to show employers what I can actually ship: real projects, every skill backed by evidence, deployed and measurable.

## Who this site is for

I'm **Marnus**, a full-stack developer looking for **junior full-stack developer roles**. This site is my CV in running form: employers can read what I've built, see the evidence behind each skill, and get hold of me without digging.

## Pages

- `/` — home: who I am, what I build, featured case study
- `/about` — my story and how I work
- `/projects` — projects, including the capstone case study
- `/skills` — every skill with a link to evidence
- `/contact` — contact form (saved to Supabase, Part 2)
- `/cv` — CV download

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- Tailwind CSS
- Supabase (Postgres, Auth, Row Level Security) — wired up in Part 2
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Secrets

No secrets are committed. When Supabase is connected, credentials live in `.env.local`, which is never committed — the repo only shows variable *names*, never values.

## AI disclosure

This project was built with help from AI coding tools, as permitted by the project brief. The design, writing and direction are mine, and I can explain any line of code in the repo on request.

## Progress

Built across weekly milestones: plan & skeleton → Supabase + admin → capstone case study → contact form & CV → SEO → video. Details in [docs/plan.md](docs/plan.md).
