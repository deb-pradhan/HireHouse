# 01 · Architecture

Engineering spec for the HireHouse marketing site. Written for a production build, not a prototype.

---

## 1. Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | The route table (`/jobs/[id]`, per-audience segments) is App-Router-shaped; RSC + streaming + metadata API fit a content-heavy marketing site. |
| Language | **TypeScript (strict)** | Content is typed data; catches copy/prop drift. |
| Styling | **Tailwind CSS v4** + a thin token layer | Utility speed with the design system encoded as the *only* source of spacing/color/type. Arbitrary values are lint-blocked. |
| Fonts | **Manrope, self-hosted** via `next/font/local` | Zero layout shift, no external request, ExtraLight (200) is the workhorse; 700 for the synthesised-bold texture. |
| Animation | **Motion (Framer Motion) v11** + CSS | Scroll reveals, bleed entrances, count-ups. All gated behind `prefers-reduced-motion`. |
| Content | **Local typed TS modules** (`/content`) | No CMS needed for launch; copy lives in version control, imported by pages. A CMS adapter boundary is left open (§6). |
| Jobs data | **Typed fixtures now → API adapter later** | `lib/jobs/source.ts` is the seam; swap fixtures for the real board API without touching pages. |
| Forms | **Server Actions** + Zod validation | Magic-link apply, contact, demo, partner booking. No client secrets. |
| Analytics | **Vercel Analytics + a typed `track()` wrapper** | Amplitude/PostHog adapter behind one function; events defined once (§7). |
| Hosting | **Vercel** | RSC/streaming/image/edge parity; preview deploys per PR. |
| Testing | **Vitest** (units), **Playwright** (smoke + a11y + visual), **axe** in CI | Guards the non-negotiables and the bleed layouts. |

> No UI kit (MUI/Chakra/shadcn). The design system is too specific; a generic kit fights it. We build a small, exact primitive set instead.

---

## 2. Folder structure

```
src/
  app/
    layout.tsx                 # <html>, font vars, ThemeGround, skip-link, analytics
    page.tsx                   # /  (candidate home)
    globals.css                # token layer + Tailwind + base resets
    companies/page.tsx
    institutions/page.tsx
    mockhouse/page.tsx
    partners/page.tsx
    fast-track/page.tsx
    jobs/
      page.tsx                 # board (filter/search)
      [id]/page.tsx            # role detail
      apply/actions.ts         # server action: magic-link apply
    (legal)/
      privacy/page.tsx
      terms/page.tsx
      consent/page.tsx         # interview-recording consent policy
    about/page.tsx
    contact/page.tsx
    kitchen-sink/page.tsx      # dev-only section gallery
    sitemap.ts  robots.ts  opengraph-image.tsx  not-found.tsx
  components/
    primitives/                # Section, Container, Bleed, Chip, Rule, Grid, Stack
    sections/                  # archetype sections A–M (see 04-SECTION-LIBRARY)
    nav/                       # Header, Footer, MobileNav, AudienceSwitcher
    fasttrack/                 # comparison table, checkout entry, price display
    jobs/                      # JobCard, JobFilters, JobDetail, ApplyForm
    proof/                     # <Stat> gated by PROOF flag
  content/
    home.ts companies.ts institutions.ts mockhouse.ts
    partners.ts fastTrack.ts jobs.ts legal.ts shared.ts
    types.ts                   # Section content unions
  lib/
    design/tokens.ts           # TS mirror of CSS vars (for JS-driven layout)
    motion/                    # variants, useReducedMotionVariants
    jobs/source.ts             # data seam (fixtures | API)
    analytics/track.ts
    seo/metadata.ts            # buildMetadata() helper
    proof.ts                   # PROOF config + <Stat> guard
    pricing.ts                 # market-aware price (AED/INR), free-path invariant
  styles/ (if not inlined in globals)
public/
  fonts/  (Manrope woff2)
  og/     (per-route OG images or generated)
```

---

## 3. Rendering strategy

- **Static-first.** All marketing routes are statically rendered (SSG). Copy is build-time data. `revalidate` only where jobs data is live.
- **`/jobs`** — ISR (`revalidate: 300`) once wired to a real source; fixtures render fully static in the meantime.
- **`/jobs/[id]`** — `generateStaticParams()` over known ids; `dynamicParams = true` for new roles via ISR.
- **RSC by default.** Client components only where interactivity is real: `JobFilters`, `AudienceSwitcher`, mobile nav, the Fast Track checkout entry, count-up stats, scroll-reveal wrappers. Everything else is a Server Component (zero client JS).
- **Streaming** with `loading.tsx` on `/jobs` so the board shell paints instantly.

---

## 4. Design-token pipeline

One canonical definition, two consumers:

1. `globals.css` declares CSS custom properties (the Editorial Brutalist palette, type scale, spacing scale, radii, rules). Tailwind v4 `@theme` maps them to utilities (`bg-lime`, `text-display`, `gap-band`…).
2. `lib/design/tokens.ts` mirrors the same values as typed constants for the rare JS-driven measurement (bleed widths, count-up targets).

**Guardrails:** ESLint rule blocks arbitrary Tailwind values (`bg-[#...]`, `text-[13px]`) so nobody escapes the scale. Color utilities are restricted to the palette allowlist. See [02-DESIGN-SYSTEM-WEB](02-DESIGN-SYSTEM-WEB.md).

---

## 5. Responsive model

The deck is a fixed 720×405 canvas. The web is fluid. We keep the *system*, not the pixel coordinates.

- **Fluid type** via `clamp()` on the scale (02 §3). Headlines shrink smoothly; body never below its floor.
- **Left margin** = `clamp(20px, 5vw, 63px)` — the hard anchor scales but never collapses to center.
- **Bleed** stays a real edge-crop on ≥ md; on mobile, bleeding bars still start at viewport edge (x=0) but content stays within a safe inset. Staggered bleeding cards collapse to a single-column stack that still runs past the fold, preserving the "crop of a larger composition" feel without horizontal scroll.
- **Grids** collapse predictably: 4-up → 2-up (md) → 1-up (sm). 2-col contrast pairs stack with the "us" panel last.
- **Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280`. Design target rows: 360 / 768 / 1280.
- **No horizontal page scroll, ever** — bleed is achieved with negative margins inside `overflow-x-clip` containers.

---

## 6. Content architecture

- Copy is **typed data**, not JSX. Each page's content module exports a typed object consumed by section components. This keeps copy reviewable in one place and enforces the compression limits at the type level (branded string lengths where practical).
- `content/types.ts` defines a discriminated union of section content (`{ kind: 'archetypeC', chips, headline, steps[] }` …). A page is an ordered array of these; a `<SectionRenderer>` maps kind → component. This makes pages declarative and lets us reorder/AB-test sections as data.
- **CMS seam:** the content modules implement an interface. Swapping to Sanity/Contentful later means implementing the same interface in an adapter; pages don't change.

---

## 7. Analytics & events

One typed `track(event, props)` wrapper; events declared centrally:

```
view_page, cta_click(section, audience, label),
fasttrack_view, fasttrack_checkout_start, fasttrack_price_market_shown,
job_search, job_filter, job_view(id), apply_start(id, tier), apply_submit(id, tier),
demo_request(audience), partner_booking_open, contact_submit
```

Funnel instrumentation matches CLAUDE.md §11. No PII in event props. Consent-gated (§8).

---

## 8. Privacy, consent, legal (first-class)

- **Cookie/consent banner:** privacy-first default (decline non-essential); analytics only fire after consent.
- **Interview-recording consent:** dedicated `/consent` policy page; any surface that mentions recording/sharing links to it. Copy written for 18–22 y/o candidates and their consent (brand doc §12.4).
- **Market-aware pricing:** `lib/pricing.ts` returns display price + currency by market (UAE→AED, India→INR) and the legal framing string. Checkout copy never ties the fee to a specific employer's role; the free path is a sibling CTA, never hidden.
- **Payments:** UI only for launch (no live capture). Checkout entry routes to the real payment flow (MoR/PA-CB) as an external boundary; we render the decision + guarantee, not card fields (brand doc §12.5, and platform rules forbid us capturing card data anyway).

---

## 9. Performance budget

- LCP < 2.0s (mobile, throttled). Self-hosted font `display: swap` with a metric-matched fallback → **zero CLS**.
- JS on the home route < 90KB gzip (RSC keeps most sections zero-JS).
- Images: almost none by design; any use `next/image` with explicit dimensions. No hero image = no hero LCP problem.
- `content-visibility: auto` on below-fold sections.

---

## 10. Accessibility

- AA contrast enforced by the palette pairings (02 §color): the system already forbids white-on-lime etc.
- Semantic landmarks, one `<h1>` per page, heading order preserved even when visual scale inverts it.
- Focus-visible rings in the accent color; skip-to-content link; keyboard-operable filters, nav, checkout.
- `prefers-reduced-motion`: all reveals/count-ups become instant; no parallax.
- Bleed/asymmetry is visual only — reading order in DOM is always logical.

---

## 11. SEO

- `buildMetadata()` per route: title, description, canonical, OG/Twitter. Per-audience OG images (generated via `opengraph-image.tsx` using the same type system).
- `sitemap.ts` enumerates all routes + job detail pages; `robots.ts` allows all, points to sitemap.
- JSON-LD: `Organization` (Roni Analytics/HireHouse) site-wide; `JobPosting` on `/jobs/[id]`; `FAQPage` on pages with FAQ sections.
- One `<h1>` = the page's headline sentence; semantic section headings throughout.
