import type { AnalyticsEvent } from "./events";

/** Consent-gated analytics dispatch (guardrail: privacy-first).
 *  Nothing is sent until the visitor grants consent. No PII in payloads. */

const CONSENT_KEY = "hh_consent";
export type Consent = "granted" | "denied";

export function getConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function setConsent(v: Consent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_KEY, v);
  window.dispatchEvent(new CustomEvent("hh:consent", { detail: v }));
}

/** Send an event, only if consent was granted. Otherwise it's dropped. */
export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  if (getConsent() !== "granted") return;

  // Provider dispatch. Vercel Analytics exposes window.va when present;
  // otherwise this is a no-op in prod and a debug log in dev.
  const w = window as unknown as { va?: (event: "event", props: Record<string, unknown>) => void };
  const { name, ...props } = event;
  w.va?.("event", { name, ...props });

  if (process.env.NODE_ENV !== "production") {
    console.debug("[track]", name, props);
  }
}
