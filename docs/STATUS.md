# STATUS — where the build is

**Read this first. Update it when you finish a unit of work.** This is the handoff point between agents: what's done, what's next, and anything half-finished.

_Last updated: 2026-08-19 — Phases 1–3 complete, all routes built (parallel team) + integrated & verified._

---

## Current state

- **Runs:** `npm install` → `npm run dev` (port 3000). `npm run build` is clean, 27 routes, mostly static/SSG. `npm run lint` is clean (flat config; `next lint` is gone in Next 16 — script is `eslint .`).
- **Every route is built and browser-verified.** Ground rotation, one-blue-per-page, no-lilac-ground, fairness invariants, and JSON-LD all checked via DOM. See "Verified" below.
- **Design system:** conformance-verified against `docs/02-DESIGN-SYSTEM-WEB.md` (see `docs/02a-WEB-CONFORMANCE.md`).

## Next up (pick the top unblocked item)

The site is feature-complete. Remaining is external/ops work, not build work:
1. **Wire a real analytics provider.** `track()` dispatches to `window.va` (Vercel Analytics) when present and is consent-gated; add the provider script (or swap the dispatch in `src/lib/analytics/track.ts`) to start collecting.
2. **Replace placeholder external URLs** — `/checkout` (real payment boundary), `cal.com/hirehouse` (partners), `app.mockhouse.in` (MockHouse app). Centralize in `src/lib/site.ts` when the real ones exist.
3. **Legal `TODO(counsel)` sign-off** on `/privacy` and `/terms`.
4. **Run Lighthouse in CI/deploy** — structural a11y is verified (below); a real Lighthouse/perf budget check belongs in the pipeline.

## Roadmap & checklist

- [x] **Docs/plan** — architecture, design-system web translation + conformance, IA, section library, content for all routes, conventions.
- [x] **Phase 0 — Foundation.** Next.js app, tokens, Manrope, primitives, ground-context ink pairing, `PROOF` gate, Header, Footer.
- [x] **Phase 1 — Section library.** All 13 archetypes A–M in `src/components/sections/`, `SectionRenderer`, `content/types.ts` (discriminated union), `/kitchen-sink` gallery. Sections support an optional `id` scroll-anchor.
- [x] **Phase 2 — Candidate spine.** `/` (data-driven), `/fast-track` (fairness invariants, market pricing, `/checkout` stub boundary), `/jobs` + `/jobs/[id]` (10 fixtures, URL-synced filters, magic-link apply with FREE pre-selected, JobPosting JSON-LD, `generateStaticParams`).
- [x] **Phase 3 — B2B routes.** `/companies`, `/institutions`, `/mockhouse`, `/partners` — all data-driven, lilac as accent only.
- [x] **Phase 4 — Supporting + polish.** `/about`, `/contact` (intent-aware form), `(legal)` `/privacy` `/terms` `/consent`; `sitemap.ts` + `robots.ts`.
  - [x] **OG images** — Editorial Brutalist `opengraph-image.tsx` (site default + `/fast-track` `/companies` `/institutions` `/mockhouse` `/partners` `/jobs`), Manrope via `@fontsource` + Satori, per-audience accent. Shared renderer: `src/lib/og/render.tsx`.
  - [x] **Analytics** — typed events (`src/lib/analytics/events.ts`), consent-gated `track()`, `<Analytics>` (page views + `[data-track]` delegation; `Cta` self-stamps its label), privacy-first `<ConsentBanner>` (localStorage via `useSyncExternalStore`). Nothing fires before consent.
  - [x] **a11y pass** — DOM-verified across form/interactive pages: one h1 each, full landmarks, all inputs labeled, named controls, logical heading order, `aria-expanded` on mobile menu, skip-link + focus-visible + reduced-motion global, palette-enforced AA text. (Real Lighthouse run belongs in CI.)

## Recent design fixes

- **Headline measure (all pages).** Section-headline width caps were `max-w-[Nch]` on wrapper `div`s, so `ch` was measured against the inherited 16px body size — roughly halving the intended width and wrapping big headlines into 5–6 skinny lines. Converted every headline wrapper to `rem`-based caps (full-width archetypes ~42–54rem; column archetypes FeatureI ~34rem, TiersJ ~26rem; job/checkout/contact heads ~42–48rem). Sublines stayed `ch` (correct — they sit on the text element at body size). Fix is in the shared components, so it applies uniformly everywhere. **Rule for future:** set headline caps in `rem`, never `ch` on a wrapper div.

## Verified (DOM-checked in browser)

| Route | grounds | blue | lilac ground | notes |
|---|---|---|---|---|
| `/fast-track` | black·lime·grey·white·lime·white·blue·white | 1 | no | fairness framing in hero |
| `/companies` | black·grey·white·grey·lime·black·blue·white | 1 | no | `#how-it-works` anchor live |
| `/institutions` | black·white·grey·white·grey·blue·white | 1 | no | 4 lilac accent blocks; `#readiness` live |
| `/mockhouse` | black·white·grey·white·blue·white | 1 | no | 3 lilac accent blocks |
| `/partners` | black·yellow·white·grey·blue·white | 1 | no | `#ladder` live |
| `/jobs` | board: white·lime | — | no | 10 cards, search + facets |
| `/jobs/[id]` | white + custom apply | — | no | apply defaults FREE; no password; JobPosting JSON-LD |
| `/about` `/contact` `/consent` `/checkout` | — | — | no | render clean; contact `?intent=` highlight works; consent 7 sections |

## Open decisions / waiting on

- Real proof numbers + logo permissions to replace `PROOF` placeholders (keep `mode:'ship'` until then).
- Fast Track final price + free/paid ratio per market; payment rail (MoR vs PA-CB) — checkout is a UI boundary only for now.
- Legal copy needs counsel sign-off (`TODO(counsel)` markers on `/privacy`, `/terms`, `/consent`).

## Known deviations from the deck spec (intentional — see `docs/02a-WEB-CONFORMANCE.md` §2)

Fluid `clamp()` type with a 15px/13px accessible floor · bleed via clip-safe negative margins · restrained reduced-motion-first motion · full site footer · palette-true audience accents.
