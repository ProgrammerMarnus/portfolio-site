import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

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

      {/* Capstone case study — full write-up on its own page. */}
      <Link
        href="/projects/capstone"
        className="block rounded-lg border border-emerald-900/50 bg-neutral-950 p-6 hover:border-emerald-700"
      >
        <p className="font-mono text-xs uppercase tracking-wide text-emerald-400">
          Capstone · case study
        </p>
        <h2 className="mt-2 text-xl font-semibold">
          This site — built to be picked apart
        </h2>
        <p className="mt-2 text-neutral-400">
          The full case study: the problem, my role, the stack, screenshots,
          the security proof, and what I would do next.
        </p>
      </Link>

      <Suspense fallback={<p className="text-neutral-400">Loading projects…</p>}>
        <ProjectList />
      </Suspense>
    </div>
  );
}

async function ProjectList() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order")
    .order("created_at");

  if (error) {
    return <p className="text-neutral-400">Projects unavailable right now.</p>;
  }

  if (!data?.length) {
    return (
      <p className="text-neutral-400">
        No projects published yet — first ones land soon.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((p) => (
        <article
          key={p.id}
          className="rounded-lg border border-neutral-800 bg-neutral-950 p-6"
        >
          <h2 className="text-xl font-semibold">{p.title}</h2>
          <p className="mt-2 text-neutral-400">{p.summary}</p>
          {(p.live_url || p.repo_url) && (
            <div className="mt-4 flex gap-4 text-sm">
              {p.live_url && (
                <a
                  href={p.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  Live ↗
                </a>
              )}
              {p.repo_url && (
                <a
                  href={p.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  Repo ↗
                </a>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
