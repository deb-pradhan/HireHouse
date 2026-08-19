"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics/track";

/** Fires view_page on route change and delegates CTA clicks via [data-track].
 *  All dispatch is consent-gated inside track(). Zero-config for CTAs: the
 *  Cta primitive stamps its label as data-track, so the whole funnel is
 *  captured without per-call wiring. */
export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    track({ name: "view_page", path: pathname });
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track({
        name: "cta_click",
        label: el.getAttribute("data-track") || "",
        href: el.getAttribute("href") || undefined,
        section: el.getAttribute("data-track-section") || undefined,
      });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
