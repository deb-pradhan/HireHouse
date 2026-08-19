"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV, SITE, ROUTE_ACCENT } from "@/lib/site";

/** Sticky header. On employer routes the primary CTA becomes "Post a role". */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const audience = ROUTE_ACCENT[pathname] ?? "candidate";
  const employer = audience === "employer";

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full items-center justify-between px-[var(--margin)]">
        <Link href="/" className="text-[20px] font-bold tracking-[-0.03em]">
          {SITE.name}
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "t-name transition-opacity hover:opacity-100",
                    active ? "opacity-100" : "opacity-60",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          {employer ? (
            <Link href="/contact?intent=company" className="cta cta-accent" data-accent="employer">
              Post a role, free
            </Link>
          ) : (
            <>
              <Link href="/jobs" className="cta cta-ghost">
                Browse jobs
              </Link>
              <Link href="/fast-track" className="cta cta-accent">
                Fast Track
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="t-name lg:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/10 bg-white px-[var(--margin)] py-6 lg:hidden">
          <ul className="flex flex-col gap-4">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="t-section" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/jobs" className="cta cta-ghost" onClick={() => setOpen(false)}>
              Browse jobs
            </Link>
            <Link href="/fast-track" className="cta cta-accent" onClick={() => setOpen(false)}>
              Fast Track
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
