import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function Projects() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="mt-2 text-neutral-400">
          Real work, each with a link to the live app and the repo.
        </p>
      </div>

      <div className="space-y-6">
        <article className="rounded-lg border border-emerald-900/50 bg-neutral-950 p-6">
          <p className="font-mono text-xs uppercase tracking-wide text-emerald-400">
            Capstone · case study
          </p>
          <h2 className="mt-2 text-xl font-semibold">
            Featured case study — coming in W34
          </h2>
          <p className="mt-2 text-neutral-400">
            The problem, my role, the stack, screenshots, live and repo links,
            and what I would do next.
          </p>
        </article>

        <article className="rounded-lg border border-neutral-800 bg-neutral-950 p-6">
          <h2 className="text-xl font-semibold">Second project</h2>
          <p className="mt-2 text-neutral-400">
            Placeholder — projects load from Supabase from Part 2, edited on the
            admin page.
          </p>
        </article>
      </div>
    </div>
  );
}
