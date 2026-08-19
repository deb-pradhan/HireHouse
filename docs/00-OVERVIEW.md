# HireHouse — Landing Site Build Plan

**Editorial Brutalist × Next.js.** A production-grade, multi-route marketing site for HireHouse (marketplace), MockHouse (prep), and Fast Track (paid candidate tier).

This `docs/` set is the single source of truth for the build. Read in order:

| # | Doc | What it defines |
|---|-----|-----------------|
| 00 | **OVERVIEW** (this file) | Goals, principles, tech at a glance, build roadmap |
| 01 | [ARCHITECTURE](01-ARCHITECTURE.md) | Stack, folder structure, routing, rendering, data, perf, SEO, a11y, analytics |
| 02 | [DESIGN-SYSTEM-WEB](02-DESIGN-SYSTEM-WEB.md) | Editorial Brutalist translated to CSS/React tokens, type scale, color, motion |
| 03 | [SITEMAP-IA](03-SITEMAP-IA.md) | Route map, navigation model, per-audience accent, conversion paths |
| 04 | [SECTION-LIBRARY](04-SECTION-LIBRARY.md) | Reusable section archetypes (React components) mapped from deck archetypes A–M |
| 05 | content/ | **Final-ready copy** for every route (one file per page) |

---

## 1. What we are building

A **7-route + supporting-pages** marketing site. Each primary route speaks to one audience with one accent color, following the "one idea, stated as a sentence" discipline of the deck.

```
/               Candidate · Pink       Default home
/companies      Employer · Blue        "Top of your funnel, handled — free."
/institutions   Institution · Indigo   Batch readiness, MockHouse B2B
/mockhouse      Indigo                 Prep product (B2C + institution)
/partners       Violet                 3-tier ladder, payout, booking
/fast-track     Candidate · Pink       Commercial keystone — decision + checkout
/jobs (+/[id])  Pink                   Live board, role detail, apply
Supporting      —                      legal, privacy, consent, about, contact
```

> **Accent note.** The route table uses Pink / Blue / Indigo / Violet as *audience accents*. The brand doc (CLAUDE.md §9) ships teal / gold / indigo. We reconcile this in [02-DESIGN-SYSTEM-WEB](02-DESIGN-SYSTEM-WEB.md#accent-reconciliation): the Editorial Brutalist palette (lime / lilac / yellow / electric-blue) is the *expressive layer*, and we map each audience to a signature accent from that palette rather than inventing new hues. Decision recorded there; flag if you want the literal Pink/Blue/Indigo/Violet instead.

## 2. The three non-negotiables (from the brand doc)

Every page, every component, every line of copy is checked against these before it ships:

1. **No fabricated facts.** No invented stats, logos, testimonials, or traction. All numeric proof is either real or replaced by *proof-by-construction* (72h-or-refund, free path, 3-more-roles safety net, assets you keep). Placeholder numbers live behind a single `PROOF` config flag so they are impossible to ship by accident.
2. **Not pay-to-win.** Fast Track buys **speed, visibility, prep, feedback, a second chance** — never a better score or guaranteed outcome. The free path is visible on every candidate surface. This is asserted structurally: the Standard column is never smaller, dimmer, or lower than Fast Track.
3. **Legal framing.** The candidate fee is presented as an **optional evaluation/priority service with a free alternative**, never a fee to access a specific employer's role. Market-aware pricing (AED / INR) and consent/retention language for interview video are first-class, not footnotes.

## 3. Design north star

From the design system doc (§0): *a Swiss-modernist poster crossed with a tech-conference identity. Confident, spare, high-contrast, slightly severe.*

- **Type is the picture.** Manrope ExtraLight, enormous headlines, tight negative tracking, scale contrast doing the work. Almost no imagery.
- **Color is structural.** Flat blocks that *are* cards/bars/panels. No gradients, shadows, tints, or borders-as-styling.
- **Bleed on purpose.** Bars slide off the left; cards run past the bottom edge. The signature gesture, translated responsibly to responsive web.
- **Asymmetric, left-anchored.** Hard left margin; right columns hang on the opposite edge.
- **One idea per section, stated as a sentence** with terminal punctuation.

## 4. Voice

Plain-spoken, fair, confident, human, a little blunt. Concrete over abstract. **Avoid** the AI-filler word list (seamless, unlock, elevate, empower, journey, effortless, leverage, streamline, robust, cutting-edge, supercharge, harness, delve…). No em dashes in display copy (deck rule §3.4). Warm to candidates, straight-talking to companies, calm and credible to institutions.

## 5. Build roadmap

Ship in vertical slices so every stage is reviewable in the browser.

- **Phase 0 — Foundation.** Next.js app, TypeScript, Tailwind config wired to the design tokens, Manrope self-hosted, base layout, `<Section>`/`<Chip>`/`<Bleed>` primitives, motion + reduced-motion, theme grounds. *(Deliverable: a running site with a styled placeholder home.)*
- **Phase 1 — Section library.** Build the archetype components (04) as composable, content-driven React sections. *(Deliverable: a Storybook-style `/kitchen-sink` route.)*
- **Phase 2 — Candidate spine.** `/` then `/fast-track` then `/jobs` + `/jobs/[id]`. The revenue path first.
- **Phase 3 — B2B routes.** `/companies`, `/institutions`, `/mockhouse`, `/partners`.
- **Phase 4 — Supporting + polish.** Legal/privacy/consent, about, contact; SEO metadata, OG images, sitemap.xml, robots, analytics, a11y + Lighthouse pass.

## 6. Definition of done (per page)

- [ ] Matches a section-library composition; no bespoke one-off layouts.
- [ ] Passes the three non-negotiables checklist.
- [ ] Copy is final, in-voice, within the compression limits (headline ≤ 60 chars, sub ≤ 120, card body ≤ 110).
- [ ] Responsive at 360 / 768 / 1280; bleed gestures degrade gracefully.
- [ ] AA contrast; keyboard-navigable; `prefers-reduced-motion` respected.
- [ ] Lighthouse ≥ 95 across the board; no CLS from font swap.
- [ ] Zero placeholder stats visible when `PROOF.mode === 'ship'`.
