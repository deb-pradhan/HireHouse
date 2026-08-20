/** Central site config: audience accents, nav, and shared strings. */

export type Audience = "candidate" | "employer" | "institution" | "partner";

export const SITE = {
  name: "HireHouse",
  parent: "Roni Analytics",
  markets: "UAE · India",
  tagline: "Hiring, decided on merit.",
};

/** Social profiles. Text links (design system is type-first, no icon logos);
 *  also emitted as Organization `sameAs` for SEO. */
export const SOCIAL = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/hirehouse" },
  { label: "X", href: "https://x.com/hirehousexyz" },
  { label: "Instagram", href: "https://www.instagram.com/p/DcO3mZ_k9Vz/" },
  { label: "Facebook", href: "https://www.facebook.com/people/Hire-House/61593397282283/" },
];

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
  { label: "Blog", href: "/blog" },
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
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
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
