import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CV",
};

const highlights = [
  "CompTIA A+ ce and Network+ ce (active to late 2028), plus IT Fundamentals (ITF+)",
  "Six Certiport IT Specialist exams passed: Python, JavaScript, Software Development, Databases, HTML & CSS, Computational Thinking",
  "Studying IT Programming at Unicollege Westrand; IT Technical stream completed",
];

export default function Cv() {
  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">CV</h1>
        <p className="mt-2 text-neutral-400">
          One page, PDF, current as of November 2026.
        </p>
      </div>

      <a
        href="/marnus-du-toit-cv.pdf"
        download
        className="inline-block rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400"
      >
        Download CV (PDF)
      </a>

      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-400">
        {highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      <p className="text-sm text-neutral-400">
        Want the story behind the work instead? See the{" "}
        <Link href="/projects" className="underline hover:text-white">
          projects page
        </Link>
        .
      </p>
    </div>
  );
}
