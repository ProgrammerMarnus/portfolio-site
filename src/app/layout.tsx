import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Marnus — Full-Stack Developer",
    template: "%s · Marnus",
  },
  description:
    "Portfolio of Marnus, a Full-Stack Developer building web apps with Next.js, TypeScript and Supabase.",
};

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <header className="border-b border-neutral-800">
          <nav className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-4">
            <Link href="/" className="font-mono text-sm font-semibold">
              marnus
            </Link>
            <ul className="flex flex-wrap gap-4 text-sm text-neutral-300">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
          {children}
        </main>
        <footer className="border-t border-neutral-800">
          <div className="mx-auto flex max-w-3xl flex-wrap gap-4 px-4 py-6 text-sm text-neutral-400">
            <span>© 2026 Marnus</span>
            {/* TODO(W36): point these at the real GitHub / LinkedIn profiles */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
