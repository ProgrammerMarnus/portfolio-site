import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="space-y-4">
        <p className="font-mono text-sm text-emerald-400">Hi, I&apos;m</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Marnus
        </h1>
        <p className="text-lg text-neutral-300">
          Full-Stack Developer — I build web apps with Next.js, TypeScript and
          Supabase.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
          >
            View projects
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-neutral-700 px-4 py-2 text-sm hover:border-neutral-500"
          >
            Contact me
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Featured case study</h2>
        <div className="rounded-lg border border-neutral-800 bg-neutral-950 p-6 text-neutral-400">
          Capstone case study coming in W34 — the problem, my role, the stack,
          screenshots, live and repo links, and what I would do next.
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Skills</h2>
        <p className="text-neutral-400">
          TypeScript · React · Next.js · Tailwind · SQL — each one backed by a
          link to evidence on the{" "}
          <Link href="/skills" className="underline hover:text-white">
            skills page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
