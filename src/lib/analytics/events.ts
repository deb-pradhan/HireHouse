/** Typed analytics events (docs/01 §7). One place defines the funnel, so
 *  event names can't drift. No PII in any payload. */

export type ApplyTier = "free" | "fast-track";

export type AnalyticsEvent =
  | { name: "view_page"; path: string }
  | { name: "cta_click"; label: string; href?: string; section?: string }
  | { name: "fasttrack_checkout_start" }
  | { name: "job_search"; q: string }
  | { name: "job_filter"; facet: string; value: string }
  | { name: "job_view"; id: string }
  | { name: "apply_start"; id: string; tier: ApplyTier }
  | { name: "apply_submit"; id: string; tier: ApplyTier }
  | { name: "demo_request"; audience: string }
  | { name: "contact_submit"; intent: string }
  | { name: "partner_booking_open" };

export type EventName = AnalyticsEvent["name"];
