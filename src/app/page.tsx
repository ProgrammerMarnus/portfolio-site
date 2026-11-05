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
        <Link
          href="/projects/capstone"
          className="block rounded-lg border border-emerald-900/50 bg-neutral-950 p-6 hover:border-emerald-700"
        >
          <p className="font-mono text-xs uppercase tracking-wide text-emerald-400">
            Capstone · case study
          </p>
          <p className="mt-2 text-lg font-semibold text-neutral-200">
            This site — built to be picked apart
          </p>
          <p className="mt-1 text-neutral-400">
            Next.js, TypeScript, Tailwind, Supabase with real RLS, Vercel —
            the full case study with screenshots and the security proof.
          </p>
        </Link>
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
