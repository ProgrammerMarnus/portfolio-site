import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
};

export default function Cv() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">CV</h1>
      <p className="text-neutral-400">
        The CV download link lands here in W35.
      </p>
      <p className="font-mono text-sm text-neutral-500">
        /cv/marnus-dutoit-cv.pdf (coming soon)
      </p>
    </div>
  );
}
