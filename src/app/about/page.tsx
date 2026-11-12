import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <article className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">About me</h1>
      <p className="text-neutral-300">
        I&apos;m Marnus du Toit, an IT Programming student at Unicollege
        Westrand, based in Roodepoort. I started in the IT Technical stream —
        hardware, networking, operating systems — and that&apos;s where the
        habit took hold: take the thing apart, understand why it broke, put it
        back together better.
      </p>
      <p className="text-neutral-400">
        Since then the focus has moved to software. I hold CompTIA A+,
        Network+ and IT Fundamentals certifications, and passed six Certiport
        IT Specialist exams covering Python, JavaScript, software development,
        databases, HTML &amp; CSS and computational thinking. The{" "}
        <Link href="/cv" className="underline hover:text-white">
          CV page
        </Link>{" "}
        has the details.
      </p>
      <p className="text-neutral-400">
        Most of my learning happens by building. This site is the current
        proof: a full-stack Next.js app — TypeScript and Tailwind on the
        front, Supabase for authentication and data, row-level security doing
        the access control — and every claim on it is something you can click
        and check.
      </p>
      <h2 className="text-xl font-semibold">The role I&apos;m looking for</h2>
      <p className="text-neutral-400">
        An entry-level or junior developer role, or an internship that grows
        into one, where I can build features end to end — UI down to database
        — and learn from people who review code properly. I don&apos;t have
        formal work experience yet, so I let the work speak: start with the{" "}
        <Link href="/projects" className="underline hover:text-white">
          projects page
        </Link>
        .
      </p>
    </article>
  );
}
