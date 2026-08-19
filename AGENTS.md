# AGENTS.md — Operating manual for this repo

**You are working on the HireHouse marketing site: a production Next.js site built in the "Editorial Brutalist" visual system.** This file is the contract. Read it fully before your first edit. It is written so any agent (or human) can take over cold and stay consistent with what exists.

If anything here conflicts with a user instruction in the current session, the user wins. If anything here conflicts with your own habits, this file wins.

---

## 1. Thirty-second orientation

- **Product:** HireHouse (hiring marketplace) + MockHouse (interview prep) + Fast Track (paid candidate tier). Company: Elyts. Markets: UAE + India.
- **This repo:** the marketing/landing site only. Not the product app, not payments (those are external boundaries we link to).
- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind v4 · Manrope via `next/font`. No UI kit.
- **Design system:** "Editorial Brutalist" — Manrope ExtraLight, flat structural color, bleed, asymmetry, sentence-headlines. The full spec is [`docs/02-DESIGN-SYSTEM-WEB.md`](docs/02-DESIGN-SYSTEM-WEB.md); the web adaptation of it is [`docs/02a-WEB-CONFORMANCE.md`](docs/02a-WEB-CONFORMANCE.md).
- **Plan & copy:** everything to build is specified in [`docs/`](docs/). Final copy per route lives in [`docs/content/`](docs/content/).
- **Where we are:** see [`docs/STATUS.md`](docs/STATUS.md). Always read it first, and update it when you finish work.

---

## 2. Golden rules — do not break these

### Product/brand non-negotiables (from the brief; these protect the business)
1. **No fabricated facts.** Never invent stats, logos, testimonials, or traction. Every number goes through `src/lib/proof.ts` (the `PROOF` gate) or is stated as proof-by-construction (72h-or-refund, free path, "3 more roles", "assets you keep"). If `PROOF.mode === 'ship'`, no placeholder number may render.
2. **Not pay-to-win.** Fast Track buys **speed, visibility, prep, feedback, a second chance** — never a better score or a guaranteed outcome. The **free path is visible on every candidate surface**, at equal weight (never greyed-out or demoted). Evaluation criteria are stated as identical for paid and free. Never write "better score", "guaranteed", "priority ranking".
3. **Legal framing.** The candidate fee is an **optional evaluation/priority service with a free alternative** — never a fee to access a specific employer's role. Pricing is market-aware (AED/INR). Interview-recording **consent** is first-class (`/consent`) and linked wherever recording is mentioned. Legal copy carries `TODO(counsel)` and never ships as final without review.

### Design fidelity rules (from the design system)
4. **Palette is closed.** Only the tokens in `globals.css` (`black white grey lime yellow lilac blue` + muted greys). No other hex, no tints/shades, no gradients, no shadows, no icons, no stock photos. ESLint flags arbitrary hex utilities.
5. **Lilac is never a section background.** It is an accent-block color only. `Section` accepts `SectionGround` (excludes lilac) — a lilac section won't type-check. Use `bg-lilac` on a card/panel instead.
6. **One blue section per page, at the climax (the ask).** No two adjacent sections share a ground. Dark grounds punctuate.
7. **Type is set only via the typographic components** (`<Hero> <Title> <SectionHead> <CardTitle> <BarTitle> <Lead> <Body> <Caption> ...`) — never raw font utilities. Tracking/leading/weight are baked into role classes in `globals.css`.
8. **Ink is derived from ground, never chosen.** Use `<Section ground>` and the `GROUND` map; only black & blue take white text. Never put white text on lime/yellow/lilac/grey, never black on blue.
9. **Headlines are complete sentences with terminal punctuation.** Chips are labels, no punctuation, max two, never three. **No em dashes in display copy** (use `. ` `: ` `, `).
10. **Voice:** plain, fair, confident, a little blunt. Avoid the filler list (seamless, unlock, elevate, empower, journey, effortless, leverage, streamline, robust, cutting-edge, supercharge, harness, delve).

Full per-section checklist: [`docs/02a-WEB-CONFORMANCE.md`](docs/02a-WEB-CONFORMANCE.md) §3.

---

## 3. Commands

The project path contains spaces — always quote it.

```bash
cd "/Users/deb/Projects/Hire House V2 Editorial Brutalist"
```

| Task | Command |
|---|---|
| Install | `npm install` |
| Dev server (port 3000) | `npm run dev` |
| Production build (run before claiming done) | `npm run build` |
| Lint | `npm run lint` |

Preview inside this harness: use `preview_start` with the `hirehouse-dev` config in `.claude/launch.json`, then the browser tools.

---

## 4. Where things live

```
docs/                      ← the plan. Read before building. Numbered in reading order.
  00-OVERVIEW  01-ARCHITECTURE  02-DESIGN-SYSTEM-WEB  02a-WEB-CONFORMANCE
  03-SITEMAP-IA  04-SECTION-LIBRARY  05-CONVENTIONS  STATUS.md
  content/                 ← final-ready copy, one file per route
src/
  app/                     ← routes (App Router). globals.css = the token layer.
  components/
    primitives/            ← Section, Container, Chip, Rule, Cta, Stack, Type(*), GroundContext
    sections/              ← archetype sections A–M (Phase 1; build these next)
    nav/                   ← Header, Footer
  lib/
    design/ground.ts       ← Ground/SectionGround + ink pairing map
    proof.ts               ← the PROOF gate (guardrail #1)
    site.ts                ← nav, footer, route→accent map, shared strings
    cn.ts                  ← class combiner
```

The design tokens have **one** source: `src/app/globals.css` (`@theme` + role classes). `src/lib/design/` mirrors what JS needs. Never introduce a color or size outside these.

---

## 5. The work loop (follow every time)

1. **Read [`docs/STATUS.md`](docs/STATUS.md)** to see what's done and what's next. Pick the next unblocked item (or do what the user asked).
2. **Read the relevant doc** for that item: the archetype in `04`, the copy in `content/`, the ground plan in `03`.
3. **Build using existing primitives/sections.** Do not invent new layouts — compose archetypes. Do not add dependencies without a clear reason.
4. **Verify** (see §6). A change isn't done until the build passes and you've looked at it.
5. **Update `docs/STATUS.md`** — check off what you finished, note anything you left for the next agent.
6. **Report** what changed and what's next. Don't claim done without evidence (build output / screenshot / DOM check).

---

## 6. Verification (evidence before "done")

- Run `npm run build` — it must compile and type-check clean. Paste the tail if reporting.
- Look at the page in the browser preview. Prefer a **DOM check via `javascript_tool`** for exact values (ground colors, section order, spacing, chip alignment) — screenshots deep in the page can come back blank because of `content-visibility`, and the dev server uses smooth-scroll so read `window.scrollY` only after forcing `behavior:'auto'`.
- Run the per-section QA checklist in [`docs/02a-WEB-CONFORMANCE.md`](docs/02a-WEB-CONFORMANCE.md) §3.
- Confirm the three non-negotiables (§2) for any page you touched.

---

## 7. How to make common changes

Recipes with exact steps live in [`docs/05-CONVENTIONS.md`](docs/05-CONVENTIONS.md). In short:

- **Add a section to a page:** compose an archetype from `components/sections/` (or `primitives/`); set its `ground` per the page's rotation in `03`; put copy in the page's `content/` module. Never hardcode copy in JSX when a content module exists.
- **Add a page/route:** create `src/app/<route>/page.tsx`, set `data-accent` for the audience, follow the ground/archetype flow in `03`, use `buildMetadata` for SEO, add it to `sitemap.ts` and (if user-facing) nav/footer in `lib/site.ts`.
- **Add/adjust a token:** edit `globals.css` only; mirror in `lib/design/` if JS needs it. Never scatter values.
- **Add a job:** it flows through `lib/jobs/source.ts` (the data seam). No invented fields — a missing salary hides the row, it does not become "Competitive".

---

## 8. Gotchas

- **Path has spaces** — quote every `cd`.
- **Screenshots blank deep in a page** — `content-visibility: auto` on below-fold sections; verify via DOM instead, or scroll to top-of-section first.
- **`window.scrollY` reads wrong** — CSS `scroll-behavior: smooth` is on; pass `{behavior:'auto'}` and it still animates unless you also set `document.documentElement.style.scrollBehavior='auto'`.
- **`PROOF.mode`** defaults to `ship` (no placeholder numbers). Set `NEXT_PUBLIC_PROOF_MODE=draft` locally to preview placeholders. See `.env.example`.
- **Manrope faux-bold** — the deck uses synthesized bold; on web prefer real Manrope 600 if 700 looks too heavy. Weights are loaded in `layout.tsx`.

---

## 9. Roadmap (detail + live status in `docs/STATUS.md`)

Phase 0 foundation ✅ → Phase 1 section library → Phase 2 candidate spine (`/`, `/fast-track`, `/jobs`) → Phase 3 B2B routes → Phase 4 supporting pages + SEO/analytics/a11y polish.

Ship in vertical slices; keep every stage reviewable in the browser. Never place two same-archetype or same-ground sections adjacently, and keep exactly one blue section per page.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
