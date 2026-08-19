/** Central site config: audience accents, nav, and shared strings. */

export type Audience = "candidate" | "employer" | "institution" | "partner";

export const SITE = {
  name: "HireHouse",
  parent: "Elyts",
  parentUrl: "https://elyts.in",
  markets: "UAE · India",
  tagline: "Hiring, decided on merit.",
};

/** Route → audience accent (palette-true mapping, docs/02 §1). */
export const ROUTE_ACCENT: Record<string, Audience> = {
  "/": "candidate",
  "/fast-track": "candidate",
  "/jobs": "candidate",
  "/companies": "employer",
  "/institutions": "institution",
  "/mockhouse": "institution",
  "/partners": "partner",
};

export const NAV = [
  { label: "For candidates", href: "/" },
  { label: "For companies", href: "/companies" },
  { label: "For institutions", href: "/institutions" },
  { label: "MockHouse", href: "/mockhouse" },
  { label: "Partners", href: "/partners" },
];

export const FOOTER = [
  {
    title: "Candidates",
    links: [
      { label: "Home", href: "/" },
      { label: "Jobs", href: "/jobs" },
      { label: "Fast Track", href: "/fast-track" },
      { label: "MockHouse", href: "/mockhouse" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Companies", href: "/companies" },
      { label: "Institutions", href: "/institutions" },
      { label: "Partners", href: "/partners" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Elyts", href: "https://elyts.in" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Interview consent", href: "/consent" },
    ],
  },
];
