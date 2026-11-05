import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Case study",
  description:
    "How this portfolio site was built — the problem, my role, the stack (Next.js, TypeScript, Tailwind, Supabase, Vercel), screenshots, and what I would do next.",
};

const shot =
  "mt-4 w-full rounded-lg border border-neutral-800 bg-neutral-950";

const linkBtn =
  "rounded-md px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 bg-emerald-500";
const linkBtnGhost =
  "rounded-md border border-neutral-700 px-4 py-2 text-sm hover:border-neutral-500";

export default function CaseStudy() {
  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-wide text-emerald-400">
          Capstone · case study
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          This site — built to be picked apart
        </h1>
        <p className="text-neutral-400">
          A full-stack build you are already looking at. Everything claimed
          below is checkable: visit the pages, test the admin, try to break the
          rules.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">The problem</h2>
        <p className="text-neutral-400">
          Applying for junior full-stack roles, my problem was that I had no
          shipped product to point at — GitHub repos of exercises don&apos;t
          show that I can take something from a blank folder to a running
          application with real data behind it. So for my capstone I chose the
          thing an employer is already reading: this site. It has to do a real
          job (sell me), store real data (my projects), survive being tested by
          a stranger, and still look like a developer built it on purpose.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">My role</h2>
        <p className="text-neutral-400">
          Solo build. I did the planning and wireframes, the design, the copy,
          the code, the database and its security rules, and the deployment.
          That includes the boring judgement calls — what not to build, how to
          keep secrets out of the repo, and how to prove the security claims
          instead of just asserting them.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">The stack</h2>
        <ul className="list-disc space-y-1 pl-5 text-neutral-400">
          <li>
            <strong className="text-neutral-200">Next.js (App Router) + TypeScript</strong>{" "}
            — the framework the year covered; server-rendered pages with
            client-side admin.
          </li>
          <li>
            <strong className="text-neutral-200">Tailwind CSS</strong> —
            mobile-first styling over a small dark theme.
          </li>
          <li>
            <strong className="text-neutral-200">Supabase</strong> — Postgres
            for the projects table, Auth for the admin session, and row level
            security as the real access boundary.
          </li>
          <li>
            <strong className="text-neutral-200">@supabase/ssr</strong> —
            cookie-based sessions shared between browser and server, refreshed
            in the proxy.
          </li>
          <li>
            <strong className="text-neutral-200">Vercel</strong> — deployment,
            with the Supabase keys injected as build-time environment
            variables.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What it does</h2>
        <ul className="list-disc space-y-1 pl-5 text-neutral-400">
          <li>
            Project entries live in a Supabase table and are read on the
            server for the public Projects page — the page you came from.
          </li>
          <li>
            <Link
              href="/admin"
              className="underline hover:text-white"
            >
              /admin
            </Link>{" "}
            is behind Supabase Auth; signed in, I can add, edit and delete
            entries.
          </li>
          <li>
            Writes are enforced at the database level: anonymous visitors can
            read but cannot insert, update or delete, and a second account
            cannot write either — RLS policies check the row owner.
          </li>
          <li>
            Sign-ups are disabled; there is exactly one account (mine).
          </li>
          <li>
            If the database is unreachable the page degrades to an explicit
            error message instead of an empty screen or a crash.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Screenshots</h2>

        <figure className="m-0">
          <img
            src="/case-study/home-viewport.png"
            alt="Screenshot of the site's homepage: a dark hero section with my name, role and buttons to the projects and contact pages."
            className={shot}
          />
          <figcaption className="mt-2 font-mono text-xs text-neutral-500">
            Homepage — the 30-second version of me.
          </figcaption>
        </figure>

        <figure className="m-0">
          <img
            src="/case-study/admin-dashboard.png"
            alt="Screenshot of the signed-in admin page showing an add-project form and one project entry with edit and delete buttons."
            className={shot}
          />
          <figcaption className="mt-2 font-mono text-xs text-neutral-500">
            /admin — authenticated, writing to Supabase as my account.
          </figcaption>
        </figure>

        <div className="sm:flex sm:gap-4">
          <figure className="m-0 sm:w-1/2">
            <img
              src="/case-study/projects-desktop.png"
              alt="Screenshot of the projects page on desktop showing the capstone card and a project entry."
              className={shot}
            />
            <figcaption className="mt-2 font-mono text-xs text-neutral-500">
              /projects desktop.
            </figcaption>
          </figure>
          <figure className="m-0 mt-4 sm:mt-0 sm:w-1/2">
            <img
              src="/case-study/projects-mobile.png"
              alt="Screenshot of the projects page on a narrow phone-sized viewport, with the same content reflowed into one column."
              className={shot}
            />
            <figcaption className="mt-2 font-mono text-xs text-neutral-500">
              /projects mobile — same component, no media-query heroics.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Proof it holds up</h2>
        <p className="text-neutral-400">
          I didn&apos;t take the security model on faith — I tested it from
          the outside with the REST endpoint, both directions:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-neutral-400">
                <th className="border-b border-neutral-800 py-2 pr-4 font-medium">
                  Tested
                </th>
                <th className="border-b border-neutral-800 py-2 font-medium">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="text-neutral-400">
              <tr>
                <td className="border-b border-neutral-800/50 py-2 pr-4">
                  Anonymous read
                </td>
                <td className="border-b border-neutral-800/50 py-2">
                  <span className="font-mono">HTTP 200</span> — rows visible
                </td>
              </tr>
              <tr>
                <td className="border-b border-neutral-800/50 py-2 pr-4">
                  Anonymous insert / update / delete
                </td>
                <td className="border-b border-neutral-800/50 py-2">
                  <span className="font-mono">HTTP 401</span> — permission
                  denied
                </td>
              </tr>
              <tr>
                <td className="border-b border-neutral-800/50 py-2 pr-4">
                  Stranger sign-up
                </td>
                <td className="border-b border-neutral-800/50 py-2">
                  <span className="font-mono">HTTP 422</span> — signups
                  disabled
                </td>
              </tr>
              <tr>
                <td className="border-b border-neutral-800/50 py-2 pr-4">
                  Owner insert / delete (me, signed in)
                </td>
                <td className="border-b border-neutral-800/50 py-2">
                  <span className="font-mono">HTTP 201 / 204</span> — only my
                  rows
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-neutral-400">
          The commands and full results are committed in{" "}
          <a
            href="https://github.com/ProgrammerMarnus/portfolio-site/blob/main/docs/rls-evidence.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300"
          >
            docs/rls-evidence.md ↗
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Live and repo</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className={linkBtn}>
            You are already here
          </Link>
          <a
            href="https://github.com/ProgrammerMarnus/portfolio-site"
            target="_blank"
            rel="noopener noreferrer"
            className={linkBtnGhost}
          >
            Repo ↗
          </a>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What I would do next</h2>
        <ul className="list-disc space-y-1 pl-5 text-neutral-400">
          <li>A dev log backed by another Supabase table, to make the site itself a working product with write paths I don&apos;t own.</li>
          <li>Dark/light toggle with system detection — the theme is currently dark-only by choice.</li>
          <li>A component test suite and CI so the build gate is mechanical, not manual.</li>
          <li>A custom domain and per-project detail pages driven from the same table.</li>
        </ul>
      </section>
    </div>
  );
}
