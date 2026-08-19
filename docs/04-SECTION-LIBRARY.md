# 04 · Section Library

The deck defines 13 layout archetypes (A–M). On web they become **content-driven React sections**. Pages are an ordered list of these — no bespoke layouts. Each maps a deck archetype to a component, its content shape, and its responsive collapse.

Import model: a page's content module (`content/*.ts`) exports an ordered `Section[]` (discriminated union in `content/types.ts`); `<SectionRenderer>` maps `kind` → component.

---

## The archetypes

### `<HeroA>` — Dark cover / statement (deck A)
- **Use:** page opener.
- **Content:** `eyebrow`, `headline` (Title, light), `descriptor`, optional `metaLeft`/`metaRight`, optional `wordmark`, `cta`, `secondaryCta`.
- **Web:** black ground default; headline left-anchored, wordmark bleeds across the bottom on ≥ lg, drops below the fold on mobile. h1 lives here.

### `<StatementB>` — Statement + stat + cards / **The Ask** (deck B, H)
- **Use:** climax / ask sections; the single blue-ground section per page.
- **Content:** `chips`, `headline`, `subline`, `stat?` (gated), `cards[]` (≤2), `primaryCta`, `secondaryCta`.
- **Web:** blue ground when it's the page climax; white text; cards flat black on blue.

### `<StaggerC>` — Staggered bleeding columns (deck C) — *the hero layout*
- **Use:** a 3–5 step process, or 3–4 proof cards.
- **Content:** `chips`, `headline`, `rightNotes[]?`, `cards[]` (`index`, `title`, `body`), `accentSequence`.
- **Web:** cards stagger + bleed past the bottom on ≥ lg; single-column stack on mobile with the last card under-running. Accent sequence lime→lilac→yellow→blue.

### `<ScorecardD>` — Scorecard / split data (deck D)
- **Use:** metric breakdown + one summary; price block; role header.
- **Content:** `chips`, `headline`, `rows[]` (`label`, `descriptor?`, `value`), `panel` (`label`, `bigStat`, `caption`), `footnote?`.
- **Web:** 58/38 split; hairline rows left, accent/blue panel right; stacks with panel last.

### `<GridE>` — Centred 4-up grid (deck E) — *the only centred layout*
- **Use:** 3–5 peer entities of equal weight (related roles, values).
- **Content:** `chips`, `headline`, `subline`, `items[]` (`numeral|icon-free`, `title`, `body`).
- **Web:** centred; 4-up → 2-up → 1-up.

### `<CompareF>` — Comparison table (deck F)
- **Use:** two options across 3–5 dimensions (Standard vs Fast Track detail).
- **Content:** `chips`, `headline`, `dimensions[]`, `colA` (plain / "the incumbent"), `colB` (highlighted panel / "you"), `closing` (bold lead-in).
- **Web:** grey ground; blue highlight panel; on mobile becomes stacked dimension cards, **Standard column never visually demoted** (fairness invariant).

### `<BarsG>` — Bleeding bars (deck G)
- **Use:** a ranked / weighted list of 3–5 actions (jobs entry, steps).
- **Content:** `chips`, `headline`, `bars[]` (`index`, `title`, `valueLine?`, `tag?`), `rightColumn?`, `closing?`.
- **Web:** bars bleed left from x=0, ragged right (widths vary ≥ 40px); pitch from the scale.

### `<StatRowH>` — Stat row + callout (deck H)
- **Use:** 3–5 proof points (each a number) + one callout, or cost drivers.
- **Content:** `chips`, `headline`, `stats[]` (gated), `callout` (full-width, bold lead-in).
- **Web:** lime/yellow ground; 4 stat blocks on a row → 2-up → 1-up; black callout bar.

### `<FeatureI>` — Feature card + 4-up (deck I)
- **Use:** one dominant stat + 4 supporting reasons (mechanism, free-model).
- **Content:** `chips`, `headline`, `featureCard` (`bigStat|claim`, `caption`), `items[]` (4).
- **Web:** accent card top-right; numbered items on a row below.

### `<TiersJ>` — Three bleeding panels (deck J)
- **Use:** nested/tiered quantities (readiness scale, partner ladder, plans).
- **Content:** `chips`, `headline`, `leftStat?`, `panels[]` (`eyebrow`, `value`, `caption`), staggered tops.
- **Web:** 3 panels stagger + bleed; stack on mobile.

### `<DualK>` — Dual list / FAQ (deck K)
- **Use:** two parallel lists; **our FAQ pattern**.
- **Content:** `chips`, `headline`, `listLeft[]` (name + descriptor + status pill), `listRight[]` (accent rows). For FAQ: `qa[]` rendered as hairline rows with disclosure.
- **Web:** two columns → one; FAQ uses native `<details>` for zero-JS accordion, accent focus ring.

### `<ContrastL>` — Contrast pair (deck L)
- **Use:** us vs them, before vs after, Standard vs Fast Track summary.
- **Content:** `chips`, `headline`, `subline`, `left` (grey-block "incumbent"), `right` (accent/blue "you"), each `eyebrow`/`title`/`body`.
- **Web:** 2 panels; **fairness invariant** — for Standard-vs-Fast-Track the free/Standard panel is equal weight, never the greyed-out loser; it's framed as "always free, always available," not "the bad option."

### `<ClosingM>` — Closing / contact / legal (deck M)
- **Use:** contact grid, about outro, long-form legal.
- **Content:** `brandMark`, `headline` (Hero), `descriptor`, `contactGrid[]?` or `richText` (legal).
- **Web:** geometric composition (flat overlapping shapes) on ≥ lg for about/contact; legal is a single readable column with hairline section rules.

---

## Shared section rules

- Every section is a `<Section ground accent>`; ground rotation obeys [02 §1](02-DESIGN-SYSTEM-WEB.md#section-ground-rotation).
- One headline (sentence, terminal punctuation) + one chip row per section.
- Motion per [02 §5](02-DESIGN-SYSTEM-WEB.md#5-motion); reduced-motion flattens.
- Any `<Stat>` is gated by the `PROOF` flag ([01 §8](01-ARCHITECTURE.md)); when no real number exists it renders proof-by-construction copy instead of a fake figure.

## Fairness invariants (enforced in code, not just copy)

Applied to `<CompareF>` and `<ContrastL>` whenever Standard vs Fast Track is shown:
1. Standard column/panel is the **same size and prominence** as Fast Track.
2. Standard is labelled with a positive frame ("Free, always") — never disabled, greyed, or crossed-out.
3. The evaluation-criteria row explicitly states criteria are identical for paid and free.
4. Fast Track benefits are limited to speed / visibility / prep / feedback / second-chance — a lint list rejects any "better score" or "guaranteed" phrasing.
