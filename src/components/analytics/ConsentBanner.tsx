"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/analytics/track";

/** Privacy-first consent banner. Analytics stay off until the visitor accepts.
 *  Declining is a first-class, equally prominent choice (no dark patterns).
 *  Reads localStorage via useSyncExternalStore so there's no hydration flash
 *  and no set-state-in-effect. */

function subscribe(cb: () => void) {
  window.addEventListener("hh:consent", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("hh:consent", cb);
    window.removeEventListener("storage", cb);
  };
}

export function ConsentBanner() {
  const consent = useSyncExternalStore(
    subscribe,
    () => getConsent(),
    () => "granted" as const, // server: render nothing to avoid hydration mismatch
  );

  if (consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Privacy choices"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/15 bg-black text-white"
    >
      <div className="mx-auto flex w-full max-w-[var(--content)] flex-col gap-4 px-[var(--margin)] py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-caption max-w-[62ch] text-white/85">
          We use privacy-friendly analytics to understand what&rsquo;s useful. Nothing is collected
          until you accept. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => setConsent("denied")} className="cta cta-ghost">
            Decline
          </button>
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="cta"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
