/**
 * Seed the Payload CMS with the blog fixtures. Idempotent (upserts by slug).
 *
 * Run it yourself so your password never leaves your machine:
 *
 *   PAYLOAD_URL=https://payload-cms-production-25bc.up.railway.app \
 *   ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="********" \
 *   npx tsx scripts/seed-blog.ts
 *
 * Creates the four Categories (job-search / interview-prep / hiring-trends /
 * for-employers) and the posts, converting our portable Block[] → Lexical.
 */
import { POSTS } from "../src/lib/blog/fixtures";
import { CATEGORIES, type Block, type BlogCategoryId } from "../src/lib/blog/types";

const URL = process.env.PAYLOAD_URL ?? "https://payload-cms-production-25bc.up.railway.app";
const EMAIL = process.env.ADMIN_EMAIL;
const PASSWORD = process.env.ADMIN_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD env vars (your CMS admin login).");
  process.exit(1);
}

/* ------- Lexical serialisation (portable Block[] → Payload rich text) ------- */

type LexNode = Record<string, unknown>;
const textNode = (text: string, bold = false): LexNode => ({
  type: "text",
  text,
  format: bold ? 1 : 0,
  detail: 0,
  mode: "normal",
  style: "",
  version: 1,
});
const linkNode = (label: string, url: string): LexNode => ({
  type: "link",
  version: 3,
  fields: { url, newTab: /^https?:\/\//.test(url), linkType: "custom" },
  children: [textNode(label)],
  direction: "ltr",
  format: "",
  indent: 0,
});

/** markdown-lite (**bold**, [label](href)) → lexical inline children */
function inlineChildren(text: string): LexNode[] {
  const out: LexNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(textNode(text.slice(last, m.index)));
    if (m[1] !== undefined) out.push(textNode(m[1], true));
    else out.push(linkNode(m[2], m[3]));
    last = re.lastIndex;
  }
  if (last < text.length) out.push(textNode(text.slice(last)));
  return out.length ? out : [textNode("")];
}

const para = (text: string): LexNode => ({
  type: "paragraph",
  version: 1,
  direction: "ltr",
  format: "",
  indent: 0,
  children: inlineChildren(text),
});

/** Bulletproof: emit only node types this template's editor is guaranteed to
 *  have — paragraphs + headings. Lists/quotes/callouts become paragraphs (list
 *  items get a bullet/number prefix) so the admin never hits an unregistered-node
 *  error, and the site's Lexical→Block reader renders them as clean paragraphs. */
function blockToLex(b: Block): LexNode[] {
  switch (b.type) {
    case "lead":
    case "p":
    case "callout":
    case "quote":
      return [para(b.text)];
    case "h2":
    case "h3":
      return [{ type: "heading", tag: b.type, version: 1, direction: "ltr", format: "", indent: 0, children: inlineChildren(b.text) }];
    case "ul":
      return b.items.map((it) => para(`•  ${it}`));
    case "ol":
      return b.items.map((it, i) => para(`${i + 1}.  ${it}`));
    case "divider":
      return [];
  }
}

function toLexical(body: Block[]) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: body.flatMap(blockToLex),
    },
  };
}

/* ---------------------------- Payload REST client -------------------------- */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let token = "";
async function api(path: string, init: RequestInit = {}) {
  const res = await fetch(`${URL}/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `JWT ${token}` } : {}),
      ...(init.headers ?? {}),
    },
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${init.method ?? "GET"} ${path} → ${res.status} ${JSON.stringify(json)}`);
  return json;
}

async function login() {
  const json = await api("/users/login", {
    method: "POST",
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  token = json.token;
  console.log(`✓ logged in as ${json.user?.email}`);
}

async function ensureCategory(id: BlogCategoryId): Promise<string> {
  // This template's Categories collection keys on `title` (no queryable slug).
  // The site maps category by slugify(title), so "Job search" → job-search.
  const c = CATEGORIES[id];
  const found = await api(`/categories?where[title][equals]=${encodeURIComponent(c.label)}&limit=1`);
  if (found.docs?.[0]) return found.docs[0].id;
  const created = await api("/categories", {
    method: "POST",
    body: JSON.stringify({ title: c.label }),
  });
  console.log(`  + category ${c.label}`);
  return created.doc?.id ?? created.id;
}

/** Delete every doc in a collection (incl. drafts) for a clean slate. The
 *  `search` collection is the template's Search-plugin index; clearing it
 *  removes orphaned rows that otherwise collide (unique `search.id`) on reseed. */
async function wipeCollection(slug: string) {
  try {
    const r = await api(`/${slug}?limit=500&depth=0&draft=true`);
    for (const d of r.docs ?? []) await api(`/${slug}/${d.id}`, { method: "DELETE" });
    if (r.docs?.length) console.log(`  - cleared ${r.docs.length} ${slug}`);
  } catch {
    /* collection may not be REST-deletable; ignore */
  }
}

/** Download a cover image and upload it to Payload `media`; returns the id.
 *  Uses raw multipart fetch (the shared api() helper forces JSON). */
async function uploadCover(coverUrl: string, alt: string): Promise<string | undefined> {
  try {
    let ct: string;
    let buf: Buffer;
    if (coverUrl.startsWith("/")) {
      // local asset in public/
      const { readFile } = await import("node:fs/promises");
      const { join } = await import("node:path");
      buf = await readFile(join(process.cwd(), "public", coverUrl));
      ct = coverUrl.endsWith(".png") ? "image/png" : coverUrl.endsWith(".webp") ? "image/webp" : "image/jpeg";
    } else {
      const img = await fetch(coverUrl);
      if (!img.ok) return undefined;
      ct = img.headers.get("content-type") || "image/jpeg";
      buf = Buffer.from(await img.arrayBuffer());
    }
    const ext = ct.includes("png") ? "png" : ct.includes("webp") ? "webp" : "jpg";
    const form = new FormData();
    form.append("alt", alt);
    form.append("file", new Blob([new Uint8Array(buf)], { type: ct }), `${alt.slice(0, 40).replace(/[^a-z0-9]+/gi, "-")}.${ext}`);
    const res = await fetch(`${URL}/api/media`, {
      method: "POST",
      headers: { Authorization: `JWT ${token}` },
      body: form,
    });
    if (!res.ok) return undefined;
    const json = await res.json().catch(() => ({}));
    return json?.doc?.id ?? json?.id;
  } catch {
    return undefined;
  }
}

async function createPost(catId: string, post: (typeof POSTS)[number]) {
  // Two-step: create as draft, then PATCH to publish. Posting directly with
  // `_status: "published"` is racy on this template's Search-plugin afterChange
  // hook — the hook can fail and silently roll back the doc while the POST
  // response still returns 201. Splitting create + publish makes both steps
  // independently verifiable.
  const heroImage = post.cover ? await uploadCover(post.cover.src, post.cover.alt) : undefined;
  const created = await api("/posts", {
    method: "POST",
    body: JSON.stringify({
      title: post.title,
      slug: post.slug,
      publishedAt: post.publishedAt,
      _status: "draft",
      categories: [catId],
      ...(heroImage ? { heroImage } : {}),
      content: toLexical(post.body),
      meta: { title: post.title, description: post.excerpt, ...(heroImage ? { image: heroImage } : {}) },
    }),
  });
  const id: string | undefined = created?.doc?.id ?? created?.id;
  if (!id) throw new Error(`POST ${post.slug} returned no id`);
  await api(`/posts/${id}?draft=false`, {
    method: "PATCH",
    body: JSON.stringify({ _status: "published" }),
  });
  console.log(`  + published  ${post.slug}${heroImage ? " (+cover)" : ""}`);
  await sleep(150);
}

async function main() {
  console.log(`Seeding ${URL} …`);
  await login();
  const catIds = new Map<BlogCategoryId, string>();
  for (const id of Object.keys(CATEGORIES) as BlogCategoryId[]) catIds.set(id, await ensureCategory(id));
  await wipeCollection("search"); // clear the Search-plugin index first
  await wipeCollection("posts");
  await wipeCollection("media"); // clear old cover uploads (re-uploaded below)
  for (const post of POSTS) await createPost(catIds.get(post.category)!, post);

  // Republish sweep. The template's Search-plugin beforeChange hook rolls a
  // publish back when a stale `search` row collides. Clearing `search` and
  // re-publishing any stragglers (fresh search rows don't collide) gets them
  // all through. A few passes for safety.
  for (let pass = 0; pass < 4; pass++) {
    await sleep(400);
    const drafts =
      (await api(`/posts?where[_status][not_equals]=published&limit=200&depth=0&draft=true`)).docs ?? [];
    if (!drafts.length) break;
    console.log(`  · republish pass ${pass + 1}: ${drafts.length} draft(s)`);
    await wipeCollection("search");
    for (const d of drafts) {
      await api(`/posts/${d.id}?draft=false`, { method: "PATCH", body: JSON.stringify({ _status: "published" }) });
      await sleep(200);
    }
  }

  await sleep(400);
  const check = await api(`/posts?where[_status][equals]=published&limit=200&depth=0`);
  console.log(`✓ done — ${check.totalDocs} of ${POSTS.length} posts published.`);
}

main().catch((e) => {
  console.error("✗ seed failed:", e.message);
  process.exit(1);
});
