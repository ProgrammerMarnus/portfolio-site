"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "sending" | "success" | "error";

const MIN_FILL_SECONDS = 3;

const inputClass =
  "mt-1 w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — humans never see it
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    // Spam protection 1: honeypot. A real person never sees this field, so
    // anything in it is a bot. Fake success, insert nothing (canonical pattern).
    if (website.trim().length > 0) {
      setStatus("success");
      return;
    }

    // Spam protection 2: time-trap. Submitting within seconds of page load is
    // bot behaviour; a real person needs time to type.
    if (Date.now() - mountedAt.current < MIN_FILL_SECONDS * 1000) {
      setStatus("success");
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      setErrorText("Please use a name between 2 and 100 characters.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 254) {
      setErrorText("Please use a valid email address.");
      setStatus("error");
      return;
    }
    if (trimmedMessage.length < 10 || trimmedMessage.length > 5000) {
      setErrorText("Messages are 10–5000 characters.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorText(null);

    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    });

    if (error) {
      setErrorText("That didn't go through — please try again, or email me directly.");
      setStatus("error");
      return;
    }

    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
    setWebsite("");
  }

  if (status === "success") {
    return (
      <div className="space-y-3 rounded-lg border border-emerald-900/50 bg-neutral-950 p-6">
        <h2 className="text-lg font-semibold">Message sent</h2>
        <p className="text-sm text-neutral-400">
          Thanks — it&apos;s saved and I&apos;ll reply to the address you left.
          If it&apos;s urgent, email me directly instead.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:border-neutral-500"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={submit} noValidate>
      <div>
        <label htmlFor="name" className="block text-sm text-neutral-300">
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-neutral-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>
      {/* Honeypot: hidden from people, irresistible to bots that auto-fill. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-neutral-300">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-neutral-500">10–5000 characters.</p>
      </div>
      {status === "error" && errorText && (
        <p className="text-sm text-red-400" role="alert">
          {errorText}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
