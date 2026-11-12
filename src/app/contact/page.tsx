import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="mt-2 text-neutral-400">
          The form saves straight to my database — no middleman service. I
          usually reply within a day or two.
        </p>
      </div>

      <ContactForm />

      <div className="space-y-2 border-t border-neutral-800 pt-6 text-sm">
        <p className="font-semibold text-neutral-300">Prefer email or a link?</p>
        <p>
          <a
            href="mailto:marnusdutoit1508@gmail.com"
            className="text-emerald-400 hover:text-emerald-300"
          >
            marnusdutoit1508@gmail.com
          </a>
        </p>
        <p>
          <a
            href="https://github.com/ProgrammerMarnus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300"
          >
            GitHub ↗
          </a>
        </p>
      </div>
    </div>
  );
}
