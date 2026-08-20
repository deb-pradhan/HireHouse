# 07 · Blog & Payload CMS

The blog frontend lives in **this** repo (`/blog`, `/blog/[slug]`). The content is authored in **Payload CMS**, which runs as its **own service on Railway** with its own Postgres. The site reads Payload over its REST API through a data seam, so nothing on the frontend changes when content moves from fixtures to the live CMS.

```
Editor → Payload admin (Railway service + Postgres)
                     │  REST /api/posts
                     ▼
   this site: lib/blog/source.ts  →  /blog pages (ISR, 5-min revalidate)
```

## 0. Live deployment (Railway)

The **"Payload CMS V3 (website builder)"** template is deployed in the `HireHouse` Railway project (`production`):

| Resource | Value |
|---|---|
| CMS admin | `https://payload-cms-production-25bc.up.railway.app/admin` |
| CMS REST API | `https://payload-cms-production-25bc.up.railway.app/api/posts` (public read ✓) |
| Database | Postgres service (provisioned by the template) |
| Web wiring | `PAYLOAD_API_URL` is set on the `web` service to the CMS URL |

The frontend adapter (`lib/blog/source.ts`) has been mapped to this template's `Posts` schema (relationship `categories`, `heroImage`, SEO-plugin `meta`, Lexical `content`, `authors`), defensively.

### Go-live checklist

1. **Create the first admin user** at the CMS admin URL above (interactive). ✓ done.
2. **Seed content in one command** (creates the 4 categories + 5 posts, published; idempotent). Your password stays on your machine:
   ```bash
   ADMIN_EMAIL="you@example.com" ADMIN_PASSWORD="********" npm run seed:blog
   ```
   Or author posts by hand in the admin — just name Categories so their slug matches: `job-search`, `interview-prep`, `hiring-trends`, `for-employers` (unmatched → *hiring-trends*). Only `_status=published` posts are read by the site.
3. **Deploy this frontend to the `web` service.** The `web` service builds from GitHub — the blog code + updated adapter must be in that repo. `PAYLOAD_API_URL` is already set on `web`, so once this code is deployed the live blog serves CMS content (ISR, 5-min).
4. Optional: set `PAYLOAD_API_TOKEN` (a Payload API key) for draft/private reads.

**Verified:** local dev + `next build` read the live CMS through the adapter (a test post authored in the admin rendered end-to-end). `.env.local` points local dev at the CMS; remove it to develop against fixtures instead.

## 1. Frontend (already built)

- `src/lib/blog/` — `types.ts` (the `Post` model), `source.ts` (the seam), `fixtures.ts`, `format.ts`, `lexical.ts` (Payload Lexical → portable `Block[]`).
- `src/app/blog/page.tsx` — listing (featured + category filter + grid).
- `src/app/blog/[slug]/page.tsx` — article (reading progress, TOC, share, related, `BlogPosting` JSON-LD).
- `src/app/blog/[slug]/opengraph-image.tsx` — per-post OG card.
- `src/app/blog/rss.xml/route.ts` — RSS 2.0 feed.
- Sitemap + nav/footer include the blog.

**Fixtures vs live:** with no env set, the site serves `fixtures.ts`. Set `PAYLOAD_API_URL` (and optional `PAYLOAD_API_TOKEN`) and it reads Payload instead — see `.env.example`.

## 2. The Payload service (separate app on Railway)

Do **not** add Payload to this marketing repo. Create a separate Payload app (the Railway "Payload" template is the fastest start) with a `Posts` collection shaped to match `mapDoc()` in `source.ts`:

```ts
// payload.config.ts — Posts collection (essential fields)
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export default buildConfig({
  editor: lexicalEditor(),
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } }),
  collections: [
    {
      slug: "posts",
      admin: { useAsTitle: "title", defaultColumns: ["title", "category", "publishedAt", "_status"] },
      versions: { drafts: true },            // gives _status: draft|published
      access: { read: () => true },          // public read for the site
      fields: [
        { name: "title", type: "text", required: true },
        { name: "slug", type: "text", required: true, unique: true, index: true },
        { name: "excerpt", type: "textarea", required: true },
        {
          name: "category", type: "select", required: true,
          options: [
            { label: "Job search", value: "job-search" },
            { label: "Interview prep", value: "interview-prep" },
            { label: "Hiring trends", value: "hiring-trends" },
            { label: "For employers", value: "for-employers" },
          ],
        },
        { name: "author", type: "group", fields: [
          { name: "name", type: "text", defaultValue: "The HireHouse team" },
          { name: "role", type: "text" },
        ] },
        { name: "publishedAt", type: "date", required: true },
        { name: "featured", type: "checkbox" },
        { name: "cover", type: "upload", relationTo: "media" },   // optional
        { name: "content", type: "richText", required: true },     // Lexical → Block[]
        { name: "seo", type: "group", fields: [
          { name: "title", type: "text" },
          { name: "description", type: "textarea" },
        ] },
      ],
    },
    { slug: "media", type: "upload" ? undefined : undefined, upload: true, fields: [{ name: "alt", type: "text" }] } as never,
  ],
});
```

The site's `lexical.ts` already converts Payload's default rich-text (headings, paragraphs, lists, quotes, links, bold) into the portable blocks the article renderer uses. Category `value`s must match `BlogCategoryId` in `types.ts`.

## 3. Deploy on Railway

You linked the site's Railway project. Create a **new service** for the CMS (keep it separate from the web service):

```bash
# in the separate Payload app repo
railway login                       # interactive; one time
railway link                        # select the HireHouse project
railway add                         # add a Postgres plugin (sets DATABASE_URL)
railway up                          # deploy the Payload app
railway variables --set PAYLOAD_SECRET=$(openssl rand -hex 32)
railway domain                      # get the public CMS URL, e.g. cms-xxxx.up.railway.app
```

Then point the **web** service at it:

```bash
# in this repo's Railway web service
railway variables --set PAYLOAD_API_URL=https://<your-cms-domain>
# optional, for private/draft reads:
railway variables --set PAYLOAD_API_TOKEN=<a Payload API key>
```

Redeploy the web service. The blog now serves live CMS content (ISR, 5-min revalidate). Until then it serves fixtures — the frontend is identical either way.

## 4. Notes

- **ISR:** `source.ts` fetches with `next: { revalidate: 300 }`. Adjust in one place.
- **Drafts:** the seam requests `where[_status][equals]=published`. Draft preview would use `PAYLOAD_API_TOKEN` + a preview route (future).
- **Images:** uploaded covers render via `<img>`; if you want `next/image` optimization, add the CMS domain to `next.config.ts` `images.remotePatterns`.
- **Guardrail:** blog is editorial (opinion/guidance). It is exempt from the `PROOF` numeric gate, but the no-fabricated-facts spirit still applies — don't invent sourced statistics.
