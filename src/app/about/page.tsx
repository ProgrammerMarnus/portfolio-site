import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">About me</h1>
      {/* TODO(W34): rewrite in my own words before final submission */}
      <p className="text-neutral-300">
        I&apos;m Marnus, a Full-Stack Developer. I enjoy taking a project from a
        rough idea to something real and deployed — designing it, building the
        frontend, wiring up the database and shipping it.
      </p>
      <p className="text-neutral-400">
        This year I worked with React, Next.js, TypeScript, Tailwind and
        Supabase, and built projects end to end with them. The{" "}
        <Link href="/projects" className="underline hover:text-white">
          projects page
        </Link>{" "}
        shows what that looks like in practice.
      </p>
      <h2 className="text-xl font-semibold">The role I&apos;m looking for</h2>
      <p className="text-neutral-400">
        A junior full-stack role where I can own features end to end — from the
        UI down to the database — and keep learning from a team that reviews
        code properly.
      </p>
    </article>
  );
}
