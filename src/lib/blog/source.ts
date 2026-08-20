import type { Post, BlogCategoryId } from "./types";
import { CATEGORIES } from "./types";
import { POSTS } from "./fixtures";
import { lexicalToBlocks } from "./lexical";

/** Blog data seam. When PAYLOAD_API_URL is set, reads the live Payload CMS
 *  (the "website builder" template on Railway — see docs/07-BLOG-CMS.md);
 *  otherwise serves typed fixtures. Pages don't change when the source flips.
 *
 *  The adapter is defensive: the template's Posts schema uses relationship
 *  `categories`, `heroImage`, SEO-plugin `meta`, and Lexical `content`, none of
 *  which exactly match our flat `Post`. We map + fall back rather than assume. */

const API = process.env.PAYLOAD_API_URL; // e.g. https://payload-cms-production-25bc.up.railway.app
const TOKEN = process.env.PAYLOAD_API_TOKEN; // optional, for drafts/private
const usingPayload = Boolean(API);

type Media = { url?: string; alt?: string };
type Rel<T> = T | { value?: T } | undefined;

type PayloadDoc = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  createdAt?: string;
  heroImage?: Rel<Media>;
  cover?: Rel<Media>;
  content?: { root?: unknown }; // Lexical
  meta?: { title?: string; description?: string };
  categories?: Rel<{ title?: string; slug?: string }>[];
  category?: string;
  authors?: Rel<{ name?: string }>[];
  populatedAuthors?: { name?: string }[];
  featured?: boolean;
};

function unwrap<T>(r: Rel<T>): T | undefined {
  if (r && typeof r === "object" && "value" in (r as object)) return (r as { value?: T }).value;
  return r as T | undefined;
}

function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}

/** Payload media `url` can be relative to the CMS; make it absolute so the
 *  site (a different origin) can load the image. */
function mediaUrl(u: string): string {
  return /^https?:\/\//.test(u) ? u : `${API}${u.startsWith("/") ? "" : "/"}${u}`;
}

/** Map the template's category (relationship) to one of our fixed ids. */
function mapCategory(d: PayloadDoc): BlogCategoryId {
  const first = d.categories?.map(unwrap).find(Boolean);
  const key = d.category ?? first?.slug ?? (first?.title ? slugify(first.title) : "");
  if (key in CATEGORIES) return key as BlogCategoryId;
  return "hiring-trends";
}

function firstParagraph(blocks: ReturnType<typeof lexicalToBlocks>): string {
  const p = blocks.find((b) => b.type === "p" || b.type === "lead") as { text?: string } | undefined;
  return p?.text?.replace(/\*\*/g, "").replace(/\[(.+?)\]\(.+?\)/g, "$1") ?? "";
}

function mapDoc(d: PayloadDoc): Post {
  const body = lexicalToBlocks(d.content?.root as never);
  const hero = unwrap(d.heroImage) ?? unwrap(d.cover);
  const author = d.populatedAuthors?.[0] ?? unwrap(d.authors?.[0]);
  const excerpt = d.excerpt ?? d.meta?.description ?? firstParagraph(body);
  return {
    id: d.id,
    slug: d.slug,
    title: d.title,
    excerpt,
    category: mapCategory(d),
    author: { name: author?.name ?? "The HireHouse team" },
    publishedAt: d.publishedAt ?? d.createdAt ?? new Date(0).toISOString(),
    cover: hero?.url ? { src: mediaUrl(hero.url), alt: hero.alt ?? d.title } : undefined,
    body,
    seo: { title: d.meta?.title, description: d.meta?.description },
    featured: d.featured,
  };
}

async function payloadFetch(path: string): Promise<PayloadDoc[]> {
  const res = await fetch(`${API}/api${path}`, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    next: { revalidate: 300 }, // ISR: refresh blog every 5 min
  });
  if (!res.ok) throw new Error(`Payload ${res.status}`);
  const json = (await res.json()) as { docs: PayloadDoc[] };
  return json.docs ?? [];
}

export async function getPosts(): Promise<Post[]> {
  if (usingPayload) {
    const docs = await payloadFetch(
      "/posts?where[_status][equals]=published&sort=-publishedAt&depth=2&limit=100",
    );
    return docs.map(mapDoc);
  }
  return [...POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPost(slug: string): Promise<Post | null> {
  if (usingPayload) {
    const docs = await payloadFetch(`/posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2&limit=1`);
    return docs[0] ? mapDoc(docs[0]) : null;
  }
  return POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getRelated(post: Post, limit = 3): Promise<Post[]> {
  const all = await getPosts();
  const sameCat = all.filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = all.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...sameCat, ...rest].slice(0, limit);
}

export async function getFeatured(): Promise<Post | null> {
  const all = await getPosts();
  return all.find((p) => p.featured) ?? all[0] ?? null;
}
