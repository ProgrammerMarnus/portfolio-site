"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type Project = {
  id: string;
  title: string;
  summary: string;
  live_url: string | null;
  repo_url: string | null;
  image_url: string | null;
  sort_order: number;
};

type FormState = {
  title: string;
  summary: string;
  live_url: string;
  repo_url: string;
  image_url: string;
  sort_order: number;
};

const emptyForm: FormState = {
  title: "",
  summary: "",
  live_url: "",
  repo_url: "",
  image_url: "",
  sort_order: 0,
};

const inputClass =
  "mt-1 w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Session gate: read the current session and keep it in sync.
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  const loadProjects = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order")
      .order("created_at");
    if (error) setError(error.message);
    else setProjects(data ?? []);
  }, []);

  useEffect(() => {
    if (user) void loadProjects();
  }, [user, loadProjects]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setSaving(false);
    if (error) setError(error.message);
  }

  async function signOut() {
    await createClient().auth.signOut();
    setProjects([]);
    setForm(emptyForm);
    setEditingId(null);
  }

  function startEdit(p: Project) {
    setEditingId(p.id);
    setForm({
      title: p.title,
      summary: p.summary,
      live_url: p.live_url ?? "",
      repo_url: p.repo_url ?? "",
      image_url: p.image_url ?? "",
      sort_order: p.sort_order,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const supabase = createClient();
    const payload = {
      title: form.title.trim(),
      summary: form.summary.trim(),
      live_url: form.live_url.trim() || null,
      repo_url: form.repo_url.trim() || null,
      image_url: form.image_url.trim() || null,
      sort_order: form.sort_order,
    };
    const { error } = editingId
      ? await supabase.from("projects").update(payload).eq("id", editingId)
      : await supabase.from("projects").insert(payload);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setForm(emptyForm);
    setEditingId(null);
    await loadProjects();
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this project?")) return;
    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) setError(error.message);
    else await loadProjects();
  }

  if (checking) {
    return <p className="text-neutral-400">Checking session…</p>;
  }

  if (!user) {
    return (
      <div className="max-w-sm space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
          <p className="mt-2 text-neutral-400">
            Owner sign-in — edits here write to Supabase as your account, so
            only your rows can be touched (RLS).
          </p>
        </div>
        <form className="space-y-4" onSubmit={signIn}>
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
          <div>
            <label htmlFor="password" className="block text-sm text-neutral-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:opacity-50"
          >
            {saving ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects admin</h1>
          <p className="mt-2 text-neutral-400">
            Signed in as {user.email}. Writes are enforced owner-only by RLS —
            a signed-out visitor can only read.
          </p>
        </div>
        <button
          onClick={signOut}
          className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 hover:border-neutral-500"
        >
          Sign out
        </button>
      </div>

      <form
        className="space-y-4 rounded-lg border border-neutral-800 bg-neutral-950 p-6"
        onSubmit={save}
      >
        <h2 className="font-semibold">
          {editingId ? "Edit project" : "Add project"}
        </h2>
        <div>
          <label htmlFor="title" className="block text-sm text-neutral-300">
            Title
          </label>
          <input
            id="title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="summary" className="block text-sm text-neutral-300">
            Summary
          </label>
          <textarea
            id="summary"
            rows={3}
            required
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="live_url" className="block text-sm text-neutral-300">
              Live URL
            </label>
            <input
              id="live_url"
              type="url"
              value={form.live_url}
              onChange={(e) => setForm({ ...form, live_url: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="repo_url" className="block text-sm text-neutral-300">
              Repo URL
            </label>
            <input
              id="repo_url"
              type="url"
              value={form.repo_url}
              onChange={(e) => setForm({ ...form, repo_url: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="image_url" className="block text-sm text-neutral-300">
              Image URL
            </label>
            <input
              id="image_url"
              type="url"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sort_order" className="block text-sm text-neutral-300">
              Sort order (lower = first)
            </label>
            <input
              id="sort_order"
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: Number(e.target.value) || 0 })
              }
              className={inputClass}
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:opacity-50"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Add project"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="rounded-md border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:border-neutral-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="font-semibold">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </h2>
        {projects.map((p) => (
          <article
            key={p.id}
            className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-neutral-800 bg-neutral-950 p-4"
          >
            <div>
              <p className="font-mono text-xs text-neutral-500">
                order {p.sort_order}
              </p>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="mt-1 max-w-2xl text-sm text-neutral-400">
                {p.summary}
              </p>
            </div>
            <div className="flex gap-2 text-sm">
              <button
                onClick={() => startEdit(p)}
                className="rounded-md border border-neutral-700 px-3 py-1.5 hover:border-neutral-500"
              >
                Edit
              </button>
              <button
                onClick={() => remove(p.id)}
                className="rounded-md border border-red-900/60 px-3 py-1.5 text-red-400 hover:border-red-700"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
