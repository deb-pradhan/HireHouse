# HireHouse — Landing Site

Production Next.js marketing site for **HireHouse** (hiring marketplace), **MockHouse** (interview prep), and **Fast Track** (paid candidate tier). Visual system: **Editorial Brutalist** (Manrope ExtraLight, flat structural color, bleed, asymmetry).

## Working on this repo? Start here

- **[AGENTS.md](AGENTS.md)** — the operating manual (guardrails, conventions, commands, verification). Any agent or contributor reads this first. (`CLAUDE.md` points here too.)
- **[docs/STATUS.md](docs/STATUS.md)** — what's done and what's next. Read before you start; update when you finish.

```bash
cd "/Users/deb/Projects/Hire House V2 Editorial Brutalist"
npm install && npm run dev   # http://localhost:3000
```

## The plan (read first)

Everything the build executes against lives in [`docs/`](docs/):

| Doc | What it is |
|---|---|
| [00-OVERVIEW](docs/00-OVERVIEW.md) | Goals, non-negotiables, roadmap, definition of done |
| [01-ARCHITECTURE](docs/01-ARCHITECTURE.md) | Stack, folders, routing, rendering, data, perf, SEO, a11y, analytics, legal |
| [02-DESIGN-SYSTEM-WEB](docs/02-DESIGN-SYSTEM-WEB.md) | The authoritative Editorial Brutalist spec (deck kit) |
| [02a-WEB-CONFORMANCE](docs/02a-WEB-CONFORMANCE.md) | How the web build conforms + deliberate deviations + per-section QA |
| [03-SITEMAP-IA](docs/03-SITEMAP-IA.md) | Routes, nav, per-page ground/archetype flow, funnels |
| [04-SECTION-LIBRARY](docs/04-SECTION-LIBRARY.md) | Archetype components A–M, fairness invariants |
| [05-CONVENTIONS](docs/05-CONVENTIONS.md) | Recipes: add a section / route / token / job |
| [STATUS](docs/STATUS.md) | Living tracker — what's done, what's next |
| [content/](docs/content/) | **Final-ready copy** per route |

## Three non-negotiables (checked on every page)

1. **No fabricated facts** — proof-by-construction or gated behind a `PROOF` flag.
2. **Not pay-to-win** — Fast Track buys speed/visibility/prep/feedback/second-chance; free path always visible; criteria identical.
3. **Legal framing** — optional priority service with a free alternative; market-aware AED/INR; interview-recording consent first-class.

## Status

- [x] Architecture, web design system, IA, section library, full page content
- [x] Phase 0 — Next.js foundation (app, tokens, Manrope, primitives, header/footer, home)
  - `npm install` → `npm run dev` (port 3000). Build verified static; ground rotation + single-blue-climax verified.
- [ ] Phase 1 — section library components
- [ ] Phase 2 — candidate spine (`/`, `/fast-track`, `/jobs`)
- [ ] Phase 3 — B2B routes (`/companies`, `/institutions`, `/mockhouse`, `/partners`)
- [ ] Phase 4 — supporting pages, SEO, analytics, a11y/Lighthouse pass
