import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
};

const skills = [
  { name: "TypeScript", evidence: "—" },
  { name: "React", evidence: "—" },
  { name: "Next.js (App Router)", evidence: "—" },
  { name: "Tailwind CSS", evidence: "—" },
  { name: "Supabase (Postgres, Auth, RLS)", evidence: "—" },
  { name: "Python", evidence: "—" },
];

export default function Skills() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
        <p className="mt-2 text-neutral-400">
          Every skill below is backed by something I actually built. Evidence
          links land with the case studies (W34).
        </p>
      </div>
      <ul className="divide-y divide-neutral-800 rounded-lg border border-neutral-800 bg-neutral-950">
        {skills.map((skill) => (
          <li
            key={skill.name}
            className="flex flex-wrap items-center justify-between gap-2 px-5 py-4"
          >
            <span>{skill.name}</span>
            <span className="font-mono text-xs text-neutral-500">
              evidence: {skill.evidence}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
