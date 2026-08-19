# Content · `/jobs` and `/jobs/[id]`

**Audience:** candidate browsing / applying. **Accent:** candidate (lime). **Data:** fixtures now, API adapter later (`lib/jobs/source.ts`).

---

## `/jobs` — the board

### 1. Board header — `<BarsG>`-lite · white
- **Chips:** ["Live board"]
- **Headline (h1):** Real roles. Apply free, or Fast Track to skip the wait.
- **Subline:** Every role here can be applied to for free. Fast Track is optional at checkout.

### 2. Filters (client component)
- **Search:** free-text (title, company, skill).
- **Facets:** Role family · City (Dubai, Abu Dhabi, Bengaluru, Mumbai, Remote…) · Level (Intern, Junior, Mid, Senior) · Type (Full-time, Contract) · Fast-Track-eligible toggle.
- **Behavior:** URL-synced query params (shareable, SSR-friendly); empty-state copy: "No roles match yet. Widen a filter, or set an alert."
- **Sort:** Newest · Most relevant.

### 3. Job grid
- **JobCard:** company · title · city · level · posted (relative) · role-family chip · "Fast-Track eligible" pill (accent) when applicable.
- **Card interaction:** whole card links to `/jobs/[id]`; hover invert on the title.
- **Load:** static list from fixtures; ISR when wired to source. Skeleton via `loading.tsx`.

### 4. Fast Track upsell strip · lime
- **Headline:** Applying to a lot of roles? Fast Track the ones you want most.
- **Body:** Reviewed in 72 hours, straight to the manager if matched. Free path stays open.
- **CTA:** How Fast Track works → `/fast-track`

---

## `/jobs/[id]` — role detail

### 1. Role header — `<ScorecardD>` · white
- **Chips:** [role family]
- **Headline (h1):** `{title}` at `{company}`.
- **Rows (left):** Location · Level · Type · Posted · Salary (only if provided by source — never fabricated).
- **Panel (right, accent):** eyebrow HOW YOU'RE ASSESSED · body: Merit-ranked on skills and fit, then a structured interview. A human makes the final call.
- **Primary CTA:** Apply free · **Secondary:** Fast Track this application → checkout with `jobId` prefilled.

### 2. Details (split, RSC)
- **About the role** · **What you'll do** · **What they're looking for** · **About the company** — all from source data; render markdown-safe. No invented requirements.

### 3. Apply — `<StatementB>` · blue
- **Headline:** One application. Read by a human.
- **Apply flow (server action, magic-link):**
  1. Enter email → magic link sent (no password — brand/security rule: we never ask candidates to create passwords here).
  2. Upload CV (client-side validated type/size) or reuse existing profile.
  3. Choose **Apply free** or **Fast Track ($25, local)** — free is the default-selected, equal-weight option.
  4. Consent checkbox for interview recording (links `/consent`), required only when a video round applies.
- **Fairness:** free apply is the primary button; Fast Track is the secondary. Never pre-select paid.

### 4. Related roles — `<GridE>` · white
- **Headline:** More roles you're a fit for.
- **Items:** 3–4 related roles (same family/level), each linking to its detail. Ties into the "3 more roles" safety-net story.

---

## Data model (`lib/jobs/types.ts`)
```ts
type Job = {
  id: string; title: string; company: string;
  family: 'engineering'|'product-design'|'growth'|'ops'|'other';
  city: string; remote: boolean;
  level: 'intern'|'junior'|'mid'|'senior';
  type: 'full-time'|'contract';
  postedAt: string;            // ISO
  salary?: { min:number; max:number; currency:'AED'|'INR' }; // only if real
  fastTrackEligible: boolean;
  summary: string; responsibilities: string[]; requirements: string[];
  companyAbout?: string;
};
```
**Rule:** no field is invented for display. Missing salary → row hidden, not "Competitive".

**SEO:** `JobPosting` JSON-LD per detail page; `generateStaticParams` over fixture ids; `sitemap.ts` includes all job urls.

**Non-negotiables check:** free apply default + equal weight (detail §3) · no fabricated salary/requirements · magic-link (no password creation) · consent gate on video · Fast Track upsell never blocks the free path.
