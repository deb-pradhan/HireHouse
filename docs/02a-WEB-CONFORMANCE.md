# 02a · Web Conformance & Deliberate Deviations

Companion to `02-DESIGN-SYSTEM-WEB.md` (the authoritative Editorial Brutalist spec — the deck kit). That file is law. This file records how the **web build** conforms to it and the few deliberate, justified deviations. Read before implementing any section.

---

## 1. Conformance map (spec rule → where it lives in code)

| Spec (§) | Rule | Implementation |
|---|---|---|
| §2.1 | Palette is the complete set; no other hex, no tints | `@theme` tokens in `globals.css`; ESLint blocks arbitrary hex utilities |
| §2.2 | No two adjacent grounds; blue exactly once at the climax | Per-page ground sequence (docs/03); verified in DOM |
| §2.2 / §10 | **Lilac is never a background** | `SectionGround = Exclude<Ground,'lilac'>` — a lilac `<Section>` won't type-check |
| §2.3 | Accent sequence lime → lilac → yellow → blue; blue at an end | Card/bar sequences follow this order |
| §2.4 | Text-on-color pairing; only black & blue take white ink | `GROUND` map derives ink from ground — a wrong pairing is unrepresentable |
| §3.3 | Tracking = −7/−5/−3/−1.1% by size+weight | `letter-spacing` per role class in `globals.css` |
| §3.3 | Leading exact (1.0 / 1.1 / 1.4 / 1.5 by band) | `line-height` per role class |
| §3.4 | One type size > 24pt per section | `CardTitle`(17.8) / `BarTitle`(24) keep card/panel heads at or below section head |
| §3.4 | Bold = scale, not emphasis; lead-in phrase only | `.lead-in` class; headline weights fixed in role classes |
| §3.4 | No em dashes in display copy | copy recast (`, ` / `. ` / `:`); lint target for `—` in JSX text |
| §4 | Radii: card 14, small 11, pill 999, bar 0 | `--radius-*` tokens; bars use sharp corners |
| §4 | Hairline 0.75pt at 25/30/35% by ground | `<Rule>` derives alpha from ground |
| §5.1 | Chip: 27pt tall, wrap:none, 6pt optical outdent | `<Chip>`/`<ChipRow>` (`-ml-1.5`, `px-2`, `white-space:nowrap`) |
| §5.1 | Max two chips, never three | `ChipRow` prop typed `[string] | [string,string]` |
| §5.2 | Card stack: index →22→ title →34→ body | applied in card compositions |
| §3.4 | Headlines are sentences with terminal punctuation | copy rule; enforced in review |

## 2. Deliberate deviations (justified, reversible)

1. **Fluid `clamp()` type instead of "scale the container" (appendix).** The appendix maps 1 deck-pt → 1px and scales the whole container. At a 375px phone that renders body at ~5px — inaccessible and unshippable for a real content site. We keep **exact tracking, leading, weights, and the deck max sizes**, but set an accessible floor (**body 15px, caption 13px**) and let type scale fluidly between. This is the single philosophical departure; everything else is literal.

2. **Bleed made scroll-safe.** The deck bleeds off a fixed canvas. On web, bleed is realized with negative margins inside `overflow-x-clip` sections (never a horizontal page scrollbar) and collapses to a single-column stack on mobile that still under-runs the fold. Same gesture, responsible mechanics.

3. **Motion added (deck is static).** Restrained scroll reveals + count-ups, all `prefers-reduced-motion`-first. The deck has none; the web earns a little, never spectacle.

4. **Full site footer.** The deck footer is one line of chrome. A web landing site needs a real navigational footer; we keep the deck's footer *discipline* (brand · context left, wordmark right, outdented) as the base strip beneath the nav columns.

5. **Audience accents are palette-true** (candidate=lime, employer=blue, institution=lilac, partner=yellow) rather than the route table's literal pink/violet — preserves §2.1's closed palette. User-approved; one-line swap to reverse.

## 3. Per-section QA (run before shipping each page)

Adapted from spec §9:
- [ ] Each section is one archetype (04); no bespoke layouts.
- [ ] No two adjacent grounds match; exactly one blue section (the ask); **no lilac ground**.
- [ ] At most one type size > 24pt per section; headlines are terminal-punctuated sentences.
- [ ] Every hex is a palette token; no white ink on lime/yellow/lilac/grey; no black ink on blue.
- [ ] Accent sequence lime→lilac→yellow→blue with blue at an end.
- [ ] Chips wrap:none, ≤ two, 6px outdent; bars sharp + ragged (≥40px width spread); hairline groups have a closing rule.
- [ ] No em dashes in display copy; no gradients/shadows/outlines/icons/photos.
- [ ] Responsive at 360 / 768 / 1280; bleed never causes horizontal scroll; reduced-motion respected; AA contrast.
- [ ] No placeholder stat visible with `PROOF.mode==='ship'`.
