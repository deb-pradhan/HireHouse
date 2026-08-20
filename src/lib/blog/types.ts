/** Blog model — mirrors the Payload `Posts` collection (see docs/07-BLOG-CMS.md).
 *  The site consumes this shape via `lib/blog/source.ts` (fixtures now, Payload
 *  REST later). Rich content is a portable block list; the Payload adapter maps
 *  Lexical → Block[]. No fabricated statistics presented as sourced fact. */

export type BlogCategoryId =
  | "job-search"
  | "interview-prep"
  | "hiring-trends"
  | "for-employers";

export type Accent = "lime" | "yellow" | "lilac" | "blue";

export type BlogCategory = {
  id: BlogCategoryId;
  label: string;
  accent: Accent;
};

export const CATEGORIES: Record<BlogCategoryId, BlogCategory> = {
  "job-search": { id: "job-search", label: "Job search", accent: "lime" },
  "interview-prep": { id: "interview-prep", label: "Interview prep", accent: "yellow" },
  "hiring-trends": { id: "hiring-trends", label: "Hiring trends", accent: "lilac" },
  "for-employers": { id: "for-employers", label: "For employers", accent: "blue" },
};

export type Author = {
  name: string;
  role?: string;
};

/** Portable rich-content block. Inline marks in `text` use markdown-lite:
 *  **bold** and [label](href). Headings carry an `id` for anchors / TOC. */
export type Block =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; text: string }
  | { type: "divider" };

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryId;
  author: Author;
  /** ISO date string */
  publishedAt: string;
  /** Optional uploaded cover; when absent the card/hero uses a flat accent ground. */
  cover?: { src: string; alt: string };
  body: Block[];
  /** SEO overrides; fall back to title/excerpt. */
  seo?: { title?: string; description?: string };
  featured?: boolean;
};

/** Words per minute for the reading-time estimate. */
export const WPM = 220;
