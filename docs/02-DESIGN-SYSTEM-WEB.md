# Design System — "Editorial Brutalist" Presentation Kit

**Purpose of this document.** It is a complete, self-contained specification for reproducing this visual system on *any* content. An AI agent that follows it should produce a deck that is visually indistinguishable in style from the reference, regardless of subject matter. Every number here is literal and non-negotiable unless a rule explicitly offers a range.

**Reference implementation:** `HireHouse-Seed-Deck.pptx` (19 slides), derived from a 12-slide source deck.

**Companion document:** `content-to-design-playbook.md` — this file defines *what the design is*; the playbook defines *how to get arbitrary content into it*. An agent building a deck should read both, and should run the playbook's Phases 1–6 before touching any layout in this document.

---

## 0. Design Philosophy — read this before touching anything

Five principles govern every decision. When a rule in this document seems ambiguous, resolve it in favour of these.

1. **Type is the picture.** This system has almost no imagery. Headlines are set enormous, in an extra-light weight, with tight negative tracking. The visual interest comes from scale contrast between a 57pt headline and 8.9pt caption sitting on the same slide — not from decoration. Never add a decorative element to "fill space." Empty space is the design.

2. **Colour is structural, never decorative.** A colour block is always doing a job: it *is* a card, a bar, a panel, an emphasis field. There are no gradients, no shadows, no borders-as-styling, no tints of the palette. A shape is 100% one flat colour from the palette or it does not exist.

3. **Bleed on purpose.** Elements intentionally run off the canvas edge — bars slide off the left, cards run off the bottom. This is the system's signature gesture. It reads as a crop of a larger composition. A slide with everything politely inside the margins looks wrong in this system.

4. **Asymmetric, never centred.** Content is left-anchored to a hard margin. Right-hand columns are right-aligned so they hang on the opposite edge. Centred layouts are used exactly once per deck (the 4-up grid) and never elsewhere.

5. **One idea per slide, stated as a sentence.** Headlines are complete sentences with terminal punctuation ("Hiring is broken at the top of the funnel."), not labels ("The Problem"). The label goes in the pill chip; the argument goes in the headline.

**The feeling to aim for:** a Swiss-modernist poster crossed with a tech-conference identity. Confident, spare, high-contrast, slightly severe. Not friendly, not corporate, not playful.

---

## 1. Canvas & Coordinate System

| Property | Value |
|---|---|
| Aspect ratio | 16:9 |
| Working unit | **points (pt)** — use pt for all layout maths |
| Canvas | **720 × 405 pt** (10 × 5.625 in) |
| OOXML slide size | `cx="9144000" cy="5143500"` EMU |
| Conversion | **1 pt = 12700 EMU** |
| Origin | top-left (0,0); y increases downward |

> **Agent note.** Do all layout arithmetic in pt, convert to EMU only at serialisation time: `EMU = round(pt * 12700)`. Never author raw EMU by hand — it produces off-grid values.

### 1.1 Margins & the safe field

| Token | Value | Use |
|---|---|---|
| `margin.left` | **63 pt** | Left edge of all primary text |
| `margin.right` | **63 pt** (x = 657) | Right edge of all right-aligned text |
| `content.width` | **594 pt** | 657 − 63 |
| `margin.bleedFooter` | **16 pt** | Footer only — deliberately outdented past the text margin |
| `chip.originX` | **57 pt** | Pill chips start 6 pt left of the text margin (see §5.1) |
| `safe.top` | **44 pt** | Nothing above this except the top-position footer |
| `safe.bottom` | **390 pt** | Nothing below this except bleeding elements |

### 1.2 Horizontal grids

Only these four grids exist. Do not invent new column counts.

**Grid A — 4-column (contained).** Cards, stat blocks, numbered items.
```
x = 63, 213, 363, 513      width = 144      gutter = 6      right edge = 657
formula: x[i] = 63 + i * 150
```

**Grid B — 4-column (bleeding).** Staggered vertical cards that run off the bottom.
```
x = 63, 217, 371, 525      width = 148      gutter = 6
formula: x[i] = 63 + i * 154
```

**Grid C — 2-column.** Contrast pairs, 2×2 item grids.
```
x = 63, 367              width = 290       gutter = 14
```

**Grid D — split 58/38.** Headline+list on the left, feature panel on the right.
```
left:  x = 63,  width = 330     (63 → 393)
right: x = 430, width = 227     (430 → 657)
gutter = 37
```

**Grid E — 3-column (bleeding panels).** TAM/SAM/SOM-style tiers.
```
x = 280, 407, 534         width = 123       gutter = 4
left copy column: x = 63, width ≈ 200
```

**Grid F — 5-column.** Team / people only.
```
x = 63, 183, 303, 423, 543     width = 112     gutter = 8
```

### 1.3 Vertical rhythm

Slides are built from horizontal bands, always in this order top-to-bottom:

| Band | y | Height | Contents |
|---|---|---|---|
| Footer (top variant) | 17 | 16 | Only when the content band bleeds to the bottom |
| Chip row | **45** | 27 | Pill chips (§5.1) |
| Headline | **90–96** | 40–80 | The slide's sentence |
| Deck / sub-line | headline bottom + 8 | 20–34 | One or two lines of body or caption |
| Divider (optional) | — | 0.75 | Hairline rule |
| Content band | **~190–370** | flexible | Cards, bars, rows, panels |
| Footnote | 352–382 | 16 | Caption-size, muted grey |
| Footer (bottom variant) | **375** | 16 | Default position |

**Vertical spacing scale.** Use only these gaps: `4, 6, 8, 10, 12, 16, 20, 22, 26, 30, 34, 44, 46, 50, 53`. The workhorses are **8** (label→value), **12** (rule→text), **22** (card padding-top), **34/46/50/53** (row and bar pitch).

---

## 2. Colour System

### 2.1 Palette — the complete set. Do not add colours.

| Token | Hex | Name | Role |
|---|---|---|---|
| `black` | `#000000` | Black | Background, cards on light, primary text on light |
| `white` | `#FFFFFF` | White | Background, cards on colour, primary text on dark |
| `lime` | `#E9FEA3` | Lime | Background, accent block — the system's "primary" |
| `yellow` | `#FBFD78` | Yellow | Background, accent block |
| `lilac` | `#CB9FD2` | Lilac | Accent block only — never a full background |
| `blue` | `#4C49F3` | Electric Blue | Background, accent block, **the emphasis colour** |
| `grey.bg` | `#E2E2E2` | Grey | Background only |
| `grey.block` | `#CFCFCF` | Grey block | Neutral / "the incumbent" block |
| `grey.text.light` | `#9A9A9A` | Muted on dark | Footnotes on black |
| `grey.text.dark` | `#555555` | Muted on light | Descriptors on grey/white |
| `grey.text.mid` | `#6B6B6B` | Muted label | Field labels on white |

**Forbidden:** gradients, drop shadows, opacity on fills (except hairline rules), tints/shades of palette colours, any hex not in this table.

### 2.2 Background rotation

Every slide has one flat background colour. Sequence them so no two adjacent slides share a background, and so dark slides punctuate rather than dominate.

Canonical 19-slide rotation:
```
BLACK · LIME · BLACK · GREY · WHITE · GREY · BLACK · LIME · BLACK
· WHITE · GREY · WHITE · YELLOW · BLACK · LIME · WHITE · BLACK · BLUE · WHITE
```

> **When slides are reordered, re-derive this.** Background is a property of a slide's *position*, not its content. Moving a slide can put two of the same ground next to each other, and the fix is to recolour the moved slide, not to accept the clash. Recolour toward a ground that doesn't collide with the accents already inside the slide — a lime-carded layout cannot move onto a lime ground.

Rules:
- **Black** ≈ 35% of slides. It carries the highest-energy layouts (bleeding columns, bars, grids).
- **Lime** ≈ 15%. Signals a positive/proof beat (traction, moat).
- **White** ≈ 25%. Data, tables, closing.
- **Grey `#E2E2E2`** ≈ 10%. Comparison/neutral-arbiter slides.
- **Yellow** ≈ 5%. One high-voltage slide, no more.
- **Blue** ≈ 5%. Reserve for exactly **one** slide — the single most important ask/claim in the deck. Its rarity is what makes it land.
- Never use lilac as a background.

### 2.3 Accent sequence within a slide

When a slide has 3–5 sibling blocks (cards, bars, panels), colour them in this fixed order:

```
1 → lime    2 → lilac    3 → yellow    4 → blue    5 → blue (repeat)
```

Variants permitted for rhythm across the deck (pick one per slide, don't mix):
- **Standard:** lime, lilac, yellow, blue
- **Rotated:** lilac, lime, yellow, blue
- **Blue-first:** blue, lime, lilac, yellow

Blue always sits at an end of the sequence, never in the middle — it is the heaviest colour and anchors the row.

### 2.4 Text-on-colour pairing — mandatory

| Surface | Primary text | Secondary text |
|---|---|---|
| Black | `white` | `#9A9A9A` |
| White | `black` | `#6B6B6B` |
| Lime | `black` | `#555555` |
| Yellow | `black` | `#555555` |
| Lilac | `black` | `#555555` |
| Grey `#E2E2E2` | `black` | `#555555` |
| **Blue** | **`white`** | `white` (never grey) |
| Grey block `#CFCFCF` | `black` | `#555555` |

Only **blue** and **black** take white text. Lime, yellow and lilac **always** take black text — white on lime fails contrast and breaks the system instantly.

### 2.5 The 99% alpha convention

All text fills in the source carry `<a:alpha val="99000"/>`. Reproduce it. It is visually imperceptible but it is how the source renders, and matching it keeps output byte-consistent with the original export pipeline.

```xml
<a:solidFill><a:srgbClr val="FFFFFF"><a:alpha val="99000"/></a:srgbClr></a:solidFill>
```

Shape fills do **not** carry alpha. Hairline rules carry alpha 25–35%.

---

## 3. Typography

### 3.1 The typeface

**Manrope ExtraLight** — this is the entire system. There is no secondary typeface.

- Embed the font in the package (`ppt/fonts/*.fntdata`, referenced from `presentation.xml` via `<p:embeddedFontLst>`).
- Declare it on **every run**, all three scripts:
```xml
<a:latin typeface="Manrope" pitchFamily="34" charset="0"/>
<a:ea    typeface="Manrope" pitchFamily="34" charset="-122"/>
<a:cs    typeface="Manrope" pitchFamily="34" charset="-120"/>
```
- Only the ExtraLight master is embedded. "Bold" (`b="1"`) is **synthesised** by the renderer. This is intentional — it produces a slightly-heavier-but-still-light weight, not a true bold. Do not substitute a real Bold font file; it will look wrong.
- Fallback stack if Manrope is genuinely unavailable: `Inter Light`, `Helvetica Neue Light`, `Arial`. Accept the degradation; do not switch to a different aesthetic.

### 3.2 The type scale

`sz` and `spc` are in OOXML hundredths of a point. `lnSpc` is `<a:lnSpc><a:spcPts val="…"/></a:lnSpc>` — **exact** leading, not a multiple.

| Role | pt | `sz` | `b` | `spc` | `lnSpc` | Leading ratio | Where used |
|---|---|---|---|---|---|---|---|
| **Wordmark** | 133.0 | `13300` | 1 | `-665` | `13300` | 1.00 | Cover logotype only |
| **Hero** | 57.0 | `5700` | 1 | `-399` | `5700` | 1.00 | Closing "Thank you.", big stats |
| **Mega-stat** | 44–68 | `4400`–`6800` | 1 | −7% of sz | = sz | 1.00 | `87`, `43M+`, `8–15%`, `67%` |
| **Display** | 34.2 | `3420` | 1 | `-171` | `3420` | 1.00 | Bold statement headlines |
| **Title** | 34.2 | `3420` | 0 | `-103` | `3420` | 1.00 | Light cover headline |
| **Section head** | 24.9 | `2494` | 0 | `-75` | `2743` | 1.10 | Standard slide headline |
| **Section head (tight)** | 24.9 | `2494` | 0 | `-75` | `2494` | 1.00 | Headline inside a card/bar |
| **Bar title** | 22.5 | `2250` | 0 | `-68` | `2400` | 1.07 | Colour-bar labels |
| **Lead** | 17.8 | `1781` | 0 | `-53` | `2494` | 1.40 | Intro paragraph |
| **Chip / Card title** | 17.8 | `1781` | 0 | `-53` | `1781` | 1.00 | Pill chips, card headings |
| **Card title (sm)** | 15.0–16.0 | `1500`–`1600` | 0 | `-45`–`-48` | `1800`–`1900` | 1.20 | Narrow-card headings |
| **Name** | 14.3 | `1425` | 0 | `-16` | `2138` | 1.50 | People names, item titles |
| **Body** | 10.7 | `1069` | 0 | `-32` | `1496` | 1.40 | Standard paragraph |
| **Meta** | 10.7 | `1069` | 0 | `-32` | `1283` | 1.20 | Stacked metadata, footer |
| **Caption** | 8.9 | `891` | 0 | `-10` | `1336` | 1.50 | Descriptions, footnotes, table cells |
| **Micro** | 8.0 | `800` | 0 | `-10` | `1100` | 1.38 | Card sub-labels only |

### 3.3 The two derivation rules (use these for any size not in the table)

**Tracking.** Negative always. Magnitude scales with size *and* weight:

| Condition | `spc` |
|---|---|
| Bold, ≥ 34 pt | **−7%** of `sz` (wordmark, hero, mega-stat) |
| Bold, 24–34 pt | **−5%** of `sz` (display) |
| Light, 15–34 pt | **−3%** of `sz` (title, section head, chip, bar) |
| Light, ≤ 14 pt | **−1.1%** of `sz` (name, body, meta, caption) |

**Leading.** Inverse to size — big type is set solid, small type gets air:

| Size band | Leading ratio |
|---|---|
| ≥ 24 pt | **1.00–1.10 ×** size |
| 15–18 pt | **1.00 ×** (chips, card titles) or **1.40 ×** (lead paragraphs) |
| ≤ 14 pt | **1.20 ×** (meta) / **1.40 ×** (body) / **1.50 ×** (caption, names) |

### 3.4 Hierarchy rules

- **Exactly one** type size above 24 pt per slide (excluding a single mega-stat, which may coexist with a section head).
- Headlines are sentences with a full stop. Chips are labels without punctuation.
- Never set body copy above 10.7 pt or below 8.0 pt.
- Bold is a **scale** device, not an emphasis device. Within body copy, emphasise a lead-in phrase with `b="1"` on the first run only — e.g. **"The one rule."** followed by regular text.
- Never use italics, underline, ALL CAPS (one exception: §5.7 eyebrow labels), or letter-spaced positive tracking (same exception).
- **No em dashes (`—`) in slide copy.** At display sizes and this tracking they read as a hole in the line. Use a full stop, a colon or a comma instead. En dashes are permitted in numeric ranges only (`8–15%`). Full rule and recasting table: playbook §4.5.

### 3.5 Alignment

- Default **left**, `algn="l"`.
- Right columns (x ≥ 430) are **right-aligned**, `algn="r"`, so they hang on the 657 margin. This creates the system's characteristic two-edge tension.
- **Centre** (`algn="ctr"`) only in: the 4-up grid intro block, numerals inside cards, and pill text.
- Never justify.

### 3.6 Text-box mechanics

Every text box uses zero insets so the box edge equals the type edge:

```xml
<a:bodyPr wrap="square" lIns="0" tIns="0" rIns="0" bIns="0" rtlCol="0" anchor="t"/>
```

- `anchor="t"` by default; `anchor="ctr"` only for footers and vertically centred labels.
- **`wrap="none"` is mandatory** for any text that must not break: pill chip labels, bar titles, the cover wordmark, eyebrow labels. Forgetting this is the single most common failure — chips clip or wrap to two lines and the design collapses.
- Because insets are zero, **the first baseline sits ≈ 0.13 × font size below the box top**. Account for this when optically aligning large type: to place a 133 pt cap-line so its baseline lands at y = 401, set the box top to `401 − (133 × 0.72 cap-height) − (133 × 0.13) ≈ 288`.

---

## 4. Geometry & Shape Language

| Property | Value |
|---|---|
| Card radius | **14 pt** |
| Small card radius | **10–12 pt** |
| Pill radius | half the height (`adj = 50000`) |
| Bar radius | **0** — bars are always sharp rectangles |
| Panel radius | **14 pt** |

**Computing `roundRect` adj in OOXML.** `adj` is a fraction of the *shorter* side, in 1/100000:

```
adj = round(radius / min(width, height) * 100000)
```
So a 14 pt radius on a 227 × 175 card → `adj = round(14/175*100000) = 8000`.
For a pill, always `adj = 50000`.

**Hairline rules.** `prstGeom prst="line"`, zero height, **0.75 pt** stroke:

| Context | Colour | Alpha |
|---|---|---|
| On light background | `black` | **25%** |
| On dark background | `white` | **30%** |
| On blue background | `white` | **35%** |
| Section divider under a headline | matches above | 25% |

Rules always span a full grid column or the full content width (594 pt) — never an arbitrary length.

**Forbidden geometry:** shadows, outer/inner glow, 3-D, bevel, outlines on filled shapes, dashed lines, arrows, icons, illustrations, photographic fills, semi-transparent shape fills.

---

## 5. Components

### 5.1 Pill chip — the signature title device

The eyebrow label for every slide. One or two chips, adjoining.

| Property | Value |
|---|---|
| Height | **27 pt** |
| Geometry | `roundRect`, `adj = 50000` |
| Origin | x = **57**, y = **45** |
| Width | `measure(label, 17.81pt) + 15` |
| Gap between chips | **1 pt** (they nearly touch) |
| Fill | `black` on light bg · `white` on dark bg · `white` on blue bg |
| Text | Chip role — 17.8 pt, `spc -53`, `lnSpc 1781` |
| Text colour | inverse of fill |
| Text box | x = chip.x + **8**, y = chip.y + **3.5**, w = chip.w − 16, h = 21 |
| **Wrap** | **`wrap="none"` — mandatory** |

Why x = 57 and not 63: the pill's rounded cap means the *text* inside it must land on the 63 pt margin to align with the headline below. The 6 pt outdent is an optical correction. Reproduce it exactly.

Two-chip usage splits a title across the pair — `["Where We Are"]["Traction"]`, `["Merit"]["Scorecard"]`, `["Set it up once."]["Then it runs."]`. Never three chips.

Small status pill variant (inline, in lists): height **18 pt**, text at Caption size, `algn="ctr"`, width = `measure(label, 10.7) + 15`; blue fill for positive/live states, black for neutral/future states.

### 5.2 Card

| Property | Value |
|---|---|
| Geometry | `roundRect`, radius 14 pt |
| Fill | one flat accent, per §2.3 |
| Padding | left/right **16–22 pt**, top **20–22 pt** |
| Internal stack | index number (Caption) → **22 pt** → title (Chip/Card-title) → **34–42 pt** → body (Caption) |
| Text width | card width − 2 × padding |

**Contained card:** fixed height 88–150 pt, sits on Grid A.
**Bleeding card:** top on Grid B stagger, height = `405 − top + 5` so it runs 5 pt past the canvas edge.

### 5.3 Bleeding colour bar

Full-width horizontal bar that starts off-canvas at x = 0 and ends at a content-driven width.

| Property | Value |
|---|---|
| x | **0** (bleeds left) |
| Height | **44–48 pt** |
| Pitch (y step) | **50–53 pt** |
| Radius | **0** |
| Number position | x = **73**, vertically centred |
| Title position | x = **105–112**, `wrap="none"` |
| Trailing tag | right-aligned, ends **18 pt** before the bar's right edge |

**Two-line variant.** When each step needs a benefit or value-proposition line, set bar height to **58 pt**, pitch **64 pt**, and stack inside the bar:

| Element | Position | Style |
|---|---|---|
| Index | x 73, y + 10 | 16 pt, `spc -48`, `wrap="none"` |
| Title | x 112, y + 8 | 22.5 pt, `spc -68`, `lnSpc 2400`, `wrap="none"` |
| Trailing tag | right-aligned, y + 13 | Caption, `wrap="none"` |
| Value line | x 112, y + 36 | Caption, **secondary colour** (`#555555` on light accents, `white` on blue) |

The value line is set in the secondary colour so it recedes behind the title — this is the only place in the system where two type colours share a surface, and the demotion is what keeps the bar from reading as two competing headlines.

**Width is derived from content, never guessed:**
```
single-line:  barWidth = clamp(392, 548, 112 + titleW + 34 + tagW + 18)
two-line:     barWidth = clamp(350, 560, 112 + max(titleW + 34 + tagW, valueW) + 18)
```
This produces the ragged right edge that makes the stack read as a bar chart of ideas.

**Verify the raggedness.** After building, check the spread across the stack is **≥ 40 pt** and that no two bars are within **10 pt** of each other. If two bars land at the same width they have both hit the clamp floor — lower the floor and lengthen or shorten a value line until the widths separate. Two identical bars read as an accident, not a system.

### 5.4 Hairline data row

For scorecards, comparison tables, allocation tables, market lists.

| Property | Value |
|---|---|
| Row pitch | **30 pt** (dense) · **34 pt** (with descriptor) · **39–46 pt** (table cells) |
| Rule | 0.75 pt hairline at `rowTop − 8..10`, spanning the full column |
| Closing rule | always add one below the final row |
| Label | Body size, left, at `rowTop` |
| Descriptor | Caption size, muted, at `rowTop + 15` |
| Value | Chip size, **right-aligned** to the column's right edge |

### 5.5 Feature panel

A blue (or accent) `roundRect` used to lift one column out of a comparison. Radius 14 pt, ~22 pt internal padding. Its rows must align to the **same y** as the plain rows beside it — the panel is a highlight, not a separate table.

### 5.6 Stat block

```
hairline rule
↓ 12 pt
value   — Mega-stat or 22 pt bold, tracking −3%
↓ 38 pt
label   — Caption, muted or primary
```
Four across on Grid A. The value is the hero; the label is deliberately small.

### 5.7 Eyebrow label

The **only** permitted uppercase, positive-tracked text: a category label inside a panel.
Caption size, `spc = +45`, `wrap="none"`, muted or inverse colour, sits 20 pt above the panel title.

### 5.8 Footer

Present on every slide. Two positions, never both.

| Property | Value |
|---|---|
| Position (default) | y = **375** |
| Position (bleed slides) | y = **17** — use when content runs off the bottom |
| Left text | brand + context, e.g. `Brand · Seed 2026` — Meta size, x = **16**, `anchor="ctr"` |
| Right text | wordmark, `b="1"`, `spc -10`, right-aligned, ending at x = **694** |
| Colour | white on dark, black on light |

The 16 pt / 694 pt positions deliberately outdent past the 63 pt text margin — the footer belongs to the canvas, not the content.

### 5.9 Cover wordmark

The brand set enormous across the bottom edge.

- Sized so its rendered width equals **~640 pt** (measure and solve for size; ~133 pt for a 9-character word).
- `b="1"`, `spc = −5% of size`, `lnSpc = size`, `wrap="none"`.
- Positioned so cap-height bottom lands at y ≈ **401** (5 pt of optical clearance, then bleed).
- Nothing else may occupy the band from its cap-top to the canvas bottom. Clear at least **12 pt** between it and the metadata row above.

### 5.10 Monogram tile

For people, when no photography exists. A 112 × 92 pt accent `roundRect` on Grid F containing 1–2 uppercase initials at Display size, centred. Below the tile: name (Caption bold, white/black) → role (Micro, in `lime` or an accent) → detail (Micro, muted).

### 5.11 Product UI mockup

A synthetic app screen, built entirely from native shapes. Use instead of a screenshot — a real screenshot will never match the palette or the type, and will read as pasted in.

**Frame.** A `black` `roundRect`, radius 14, occupying the right 40% of the canvas. Typical: `x 366, y 56, w 291, h 320`. Inner padding **16 pt** on all sides. Put the slide footer at the **top** so the frame can run low.

**Why black.** A dark UI on a white slide reads unmistakably as a screen rather than another content card, and the accents fire hard against it. On a dark slide, invert: white frame, black type.

**Internal type scale** — one step below the slide scale, because it is a screen being viewed at distance, not slide copy:

| Element | Size | Colour |
|---|---|---|
| Window label / timestamp | 8.0 pt | `#9A9A9A` |
| Eyebrow (`CANDIDATE`) | 8.0 pt, `spc +45` | `#9A9A9A` |
| Primary record name | 17.0 pt | `white` |
| Row labels & values | 8.0 pt | `white` |
| Hero figure in tile | 26.0 pt bold | `white` |

**Never go below 8.0 pt**, even inside a mockup. The temptation to shrink UI chrome for realism is the fastest way to make a slide unreadable in a room.

**Components inside the frame**
- **Window chrome:** three 6 pt circles (`pill` on a square), 10 pt apart, `white` at 30% alpha. Product name right-aligned on the same line.
- **Dividers:** hairlines at `white` 15% — lighter than slide hairlines, because the surface is smaller.
- **Hero tile:** a `blue` `roundRect`, radius 10, ~74 × 54, holding the headline figure. Supporting labels sit to its right in a 3-line stack: bold label, muted rank, accent-coloured status.
- **Meter row** (the only new primitive): pitch **22 pt**. Label left, then a **4 pt** pill track in `white` 15%, overlaid by a fill pill in `lime` at `trackWidth × value / 100`, then the numeral right-aligned to the inner edge.

**Meters must use a true 0–100 scale.** It is tempting to zoom the axis so an 81 and a 92 look dramatically different. Don't — a mockup that misrepresents its own data is worse than a boring one, and investors read axes. If the bars look too similar, that is the honest picture; let the numeral carry the precision.

**Pair it with commentary, not data.** Once the mockup shows the numbers, the left column must not repeat them. Give it the headline, one sub-line, and two short titled notes on hairlines — the argument the screen is evidence for.

### 5.12 Geometric closing composition

Reserved for the final slide. 3–4 overlapping flat shapes in the right ~40% of the canvas: one square, one or two circles, one rounded square. Palette colours only, no transparency, overlapping so later shapes occlude earlier ones. Never on any other slide.

---

## 6. Layout Archetypes

Twelve templates. Every slide must be one of these. Do not invent new layouts — vary the content, the colour, and the stagger instead.

### A · Dark Cover
`bg: black` · footer: none
```
57,  55   eyebrow metadata          Meta / white
63,  96   headline                  Title (light 34.2) / white / w 560
63, 176   descriptor                Body / white / w 430
63, 228   hairline rule (white 25%, w 594)
63, 240   left metadata (2 lines)   Meta / white
430,240   right metadata (2 lines)  Meta / white / algn=r
56, 288   WORDMARK                  §5.9
```

### B · Statement + Stat + Cards
`bg: lime | yellow` · footer: bottom
Chips → bold headline (~30 pt) → sub-line → hairline → mega-stat → caption; two black 265 × 130 cards stacked on the right at x = 392, y = 96 and 241.

### C · Staggered Bleeding Columns *(the hero layout)*
`bg: black` · footer: **top**
```
chips 57,45 · headline 63,90 (Section head, w 400)
right column 480,88 w 177 algn=r — 2–3 caption blocks separated by a hairline
four cards on Grid B, tops = 186, 212, 238, 264 (stagger step 26)
each card height = 405 − top + 5   (bleeds)
accent sequence lime → lilac → yellow → blue
```

### D · Scorecard / Split Data
`bg: white` · footer: bottom · Grid D
Left: chips → headline → sub → five hairline rows (pitch 30) with right-aligned values → closing rule → footnote at y 358.
Right: blue card at `430, 96, 227 × 175` containing label → mega-stat (68 pt) → caption; supporting copy below at y 288.

### E · Centred 4-Up Grid
`bg: black` · footer: bottom
The only centred layout. Chips at 57,45 → centred headline at `90, 96, w 540` → centred sub at `140, 146, w 440` → four `144 × 96` cards on Grid A at y 194, each holding a centred 42 pt numeral → title at y 302 (Name) → body at y 326 (Caption).

### F · Comparison Table
`bg: grey #E2E2E2` · footer: **top**
Three columns: stage label (x 63, w 105), plain column (x 175, w 210), **highlighted blue panel** (`400, 148, 257 × 212`) with its text at x 420, w 217. Four rows at pitch 39 starting y 196, hairlines on the left two columns only. Closing statement at y 364 with a bold lead-in.

### G · Bleeding Bars
`bg: black | white` · footer: **top**
Chips top-**right** (x ≈ 400) on dark, top-left on light. Four bars per §5.3, pitch 50–53, first at y 106–162. Right column at x 500–540 (w 117–157, `algn="r"`) for supporting copy. Closing hairline + statement below the last bar.

### H · Stat Row + Callout
`bg: lime` · footer: **top**
Chips → bold Display headline (w 480) → four stat blocks on Grid A at y 206 → full-width black `roundRect` callout at `63, 328, 594 × 46` with centred white Body text and a bold lead-in.

### I · Feature Card + 4-Up Row
`bg: black` · footer: **top**
Chips → Section head (w 340) → accent card at `440, 88, 217 × 118` holding a 46 pt mega-stat + caption → four numbered items on Grid A at y 232 (rule → index → Name title → Caption body) → footnote at y 382.

### J · Three Bleeding Panels
`bg: white` · footer: **top** · Grid E
Left column (x 63, w 200): chips → headline → hairline → mega-stat → caption → source note. Right: three panels at x 280/407/534, staggered tops **128 / 158 / 188**, height = `405 − top + 5`. Each panel: eyebrow → value (16 pt) → caption.

### K · Dual List
`bg: grey | white` · footer: **top** · Grid D-wide
Left (x 63, w 320): section label → five hairline rows at pitch 34, each with name + muted descriptor + right-aligned status pill.
Right (x 400, w 257): section label → four 38 pt accent `roundRect` rows at pitch 44, each with bold caption title + micro descriptor.

### L · Contrast Pair
`bg: white` · footer: bottom · Grid C
Chips → bold Display headline → sub-line → two `290 × 140` panels at y 218. Left = `grey.block #CFCFCF` (the incumbent), right = `blue` (you). Each: eyebrow → 15 pt title → caption body.

### M · Closing
`bg: white` · footer: bottom
Small brand mark at `63, 62` (Name size) → Hero headline at `63, 108` → descriptor → hairline at y 262 → 2 × 2 contact grid (label in `grey.text.mid` Caption, value in Body, pitch 46, column step 155) → geometric composition (§5.12) in the right 40%.

---

## 7. Mapping Content to Archetypes

Decide by the **shape of the information**, not by the slide's name.

| Content shape | Archetype |
|---|---|
| Opening / brand statement | **A** |
| One headline claim + one big number + 2 supporting blocks | **B** |
| A 3–5 step process or sequence | **C** |
| A metric breakdown + one summary score | **D** |
| 3–5 peer entities of equal weight | **E** |
| Two options compared across 3–5 dimensions | **F** |
| A ranked or effort-weighted list of 3–5 actions | **G** |
| 3–5 proof points, each a number | **H** |
| One dominant statistic + 4 supporting reasons | **I** |
| Nested or tiered quantities (TAM/SAM/SOM, plans) | **J** |
| Two parallel lists of different kinds | **K** |
| Us vs. them, before vs. after | **L** |
| Closing / contact | **M** |

**Sequencing rules across a deck**
- Never place two slides with the same archetype adjacently.
- Bleeding archetypes (C, G, J) need a contained archetype (D, F, H, L) on either side to let the eye rest.
- Reuse is expected — a 19-slide deck built from 13 archetypes will reuse ~6. Differentiate reuses by **background colour** and by **reversing the accent sequence**.
- Place the single blue-background slide at the deck's climax (the ask / the central claim).

**Content compression rules**
- Headline: ≤ 60 characters, one sentence, terminal punctuation.
- Sub-line: ≤ 120 characters.
- Card body: ≤ 110 characters.
- Table cell: ≤ 60 characters.
- If content exceeds these, cut the content — **never** reduce the type size below the scale in §3.2.

---

## 8. Implementation Notes (OOXML)

### 8.1 Package structure
Keep exactly one slide master and one layout. Slides carry all their own geometry; the master is intentionally empty. Every slide relates only to `slideLayout1.xml`.

```
[Content_Types].xml
ppt/presentation.xml          ← sldSz 9144000×5143500, <p:embeddedFontLst>
ppt/slideMasters/slideMaster1.xml   (empty spTree)
ppt/slideLayouts/slideLayout1.xml   (empty spTree, name="DEFAULT")
ppt/slides/slide{N}.xml
ppt/theme/theme1.xml
ppt/fonts/*.fntdata            ← embedded Manrope
```

### 8.2 Slide background
```xml
<p:bg><p:bgPr><a:solidFill><a:srgbClr val="000000"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>
```

### 8.3 Canonical text run
```xml
<a:p>
  <a:pPr algn="l" indent="0" marL="0">
    <a:lnSpc><a:spcPts val="1496"/></a:lnSpc>
    <a:buNone/>
  </a:pPr>
  <a:r>
    <a:rPr lang="en-US" sz="1069" spc="-32" kern="0" dirty="0">
      <a:solidFill><a:srgbClr val="000000"><a:alpha val="99000"/></a:srgbClr></a:solidFill>
      <a:latin typeface="Manrope" pitchFamily="34" charset="0"/>
      <a:ea typeface="Manrope" pitchFamily="34" charset="-122"/>
      <a:cs typeface="Manrope" pitchFamily="34" charset="-120"/>
    </a:rPr>
    <a:t>Body copy goes here.</a:t>
  </a:r>
</a:p>
```
`kern="0"` and `<a:buNone/>` are required on every paragraph — kerning off keeps the tracking exact, and `buNone` prevents the master's inherited bullet.

### 8.4 Multi-paragraph blocks — a known hazard
Renderers handle `<a:spcBef>` combined with exact `spcPts` leading inconsistently, producing overlapping lines. **Prefer separate text boxes at explicit y positions over one box with several paragraphs.** Reserve multi-paragraph boxes for tightly stacked metadata where every paragraph is a single line.

### 8.5 Measure before you place
Text measurement is not optional in this system, because chip and bar widths are content-derived. Load the actual font file and measure:

```python
from PIL import ImageFont
f = ImageFont.truetype("Manrope.ttf", size_pt * 4)   # 4× for sub-pixel accuracy
width_pt = f.getlength(text) / 4.0
```
Then compute wrapped line count and assert `lines × leading ≤ boxHeight`. Fail the build on overflow rather than shipping clipped text.

### 8.6 Deriving these tokens from a different source deck
1. Unzip the `.pptx`; parse every `ppt/slides/slideN.xml`.
2. Extract each `<p:sp>` / `<p:pic>`: `a:off`, `a:ext` (÷12700 → pt), `prstGeom`, fill colours, and every `rPr` (`sz`, `b`, `spc`) and `lnSpc`.
3. Sample dominant colours from `ppt/media/*.png` with Pillow — in Figma-exported decks the flat colour blocks are often rasterised images, and their hexes are the real palette.
4. Extract the embedded font: `.fntdata` is EOT. Header length = `EOTSize − FontDataSize` (both little-endian uint32 at offsets 0 and 4); the TTF begins at that offset.
5. Cluster the observed `sz` values to recover the type scale; fit `spc/sz` and `lnSpc/sz` ratios to recover the tracking and leading rules.
6. Render to PDF → PNG and inspect visually. **Never trust the XML alone.**

---

## 9. Quality Assurance Checklist

Run every item before delivering. Render to PNG and *look at each slide*.

**Structure**
- [ ] Every slide is one of the 13 archetypes in §6
- [ ] No two adjacent slides share a background colour
- [ ] No two adjacent slides share an archetype
- [ ] Exactly one blue-background slide in the deck
- [ ] Every slide has a footer, in exactly one position
- [ ] Footer is at y = 17 on every slide whose content bleeds past y = 375

**Typography**
- [ ] Every run declares Manrope on `latin`, `ea` and `cs`
- [ ] Every `spc` matches the §3.3 tracking rule for its size and weight
- [ ] Every `lnSpc` matches the §3.3 leading rule
- [ ] At most one type size above 24 pt per slide
- [ ] No chip, bar title, eyebrow or wordmark is missing `wrap="none"`
- [ ] No text is clipped, wrapped unintentionally, or overlapping
- [ ] Headlines are sentences with terminal punctuation

**Colour**
- [ ] Every hex is in the §2.1 table
- [ ] No white text on lime, yellow, lilac or grey
- [ ] No black text on blue
- [ ] Accent sequence within each slide follows §2.3
- [ ] No gradients, shadows, outlines or shape transparency

**Geometry & grid**
- [ ] All primary text starts at x = 63; all right-aligned text ends at x = 657
- [ ] All chips start at x = 57, y = 45
- [ ] Every card/panel uses radius 14 (or 10–12 for small); every pill uses `adj = 50000`; every bar uses radius 0
- [ ] Bleeding elements clear the canvas edge by ≥ 5 pt
- [ ] Bar widths vary by ≥ 40 pt across a stack
- [ ] Every hairline is 0.75 pt at 25–35% alpha and spans a full column
- [ ] Every hairline row group has a closing rule

**Content**
- [ ] Zero traces of the source deck: `grep -ril` the unzipped package for source brand terms, and confirm `ppt/media/` is absent if no new imagery was added
- [ ] Slide count in `docProps/app.xml` matches the actual count
- [ ] `docProps/core.xml` carries the new title and author

---

## 10. Anti-Patterns — never do these

| Don't | Why |
|---|---|
| Add icons, illustrations or clip-art | The system is purely typographic and geometric |
| Use drop shadows or gradients | Every surface is flat, always |
| Centre a headline (outside archetype E) | Left-anchoring is the system's spine |
| Use a colour outside §2.1, or a tint of one | The palette's tightness is the identity |
| Set body copy larger to fill space | Empty space is intentional; cut copy instead |
| Set a headline smaller to fit copy | Same — cut copy instead |
| Make all bars or cards the same width | The ragged edge is the point |
| Keep every element inside the margins | Bleed is the signature gesture |
| Use a real Bold weight | `b="1"` on ExtraLight is the intended texture |
| Use positive tracking (except §5.7 eyebrows) | Tight tracking is the whole voice |
| Put lilac behind a full slide | Lilac is an accent only |
| Use more than two pill chips | Two is the maximum |
| Add a slide-number placeholder | The footer is the only chrome |
| Skip the render-and-inspect pass | XML that validates can still look broken |

---

## 11. Quick-Reference Token Sheet

```yaml
canvas:      { w: 720, h: 405, unit: pt, emuPerPt: 12700 }
margin:      { left: 63, right: 63, contentW: 594, footer: 16, chipX: 57 }

grid:
  A_contained:  { x: [63,213,363,513], w: 144, gutter: 6 }
  B_bleeding:   { x: [63,217,371,525], w: 148, gutter: 6 }
  C_two:        { x: [63,367],         w: 290, gutter: 14 }
  D_split:      { left: [63,330],  right: [430,227] }
  E_three:      { x: [280,407,534],    w: 123, gutter: 4 }
  F_five:       { x: [63,183,303,423,543], w: 112, gutter: 8 }

anchors:     { footerTop: 17, chipRow: 45, headline: 92, content: 190, footerBottom: 375 }
spacing:     [4, 6, 8, 10, 12, 16, 20, 22, 26, 30, 34, 44, 46, 50, 53]

color:
  black: "#000000"   white: "#FFFFFF"
  lime:  "#E9FEA3"   yellow: "#FBFD78"
  lilac: "#CB9FD2"   blue:   "#4C49F3"
  greyBg: "#E2E2E2"  greyBlock: "#CFCFCF"
  mutedOnDark: "#9A9A9A"  mutedOnLight: "#555555"  label: "#6B6B6B"
accentSequence: [lime, lilac, yellow, blue]

type:  # font: Manrope ExtraLight, embedded
  wordmark:   { sz: 13300, b: 1, spc: -665, lnSpc: 13300 }
  hero:       { sz: 5700,  b: 1, spc: -399, lnSpc: 5700  }
  display:    { sz: 3420,  b: 1, spc: -171, lnSpc: 3420  }
  title:      { sz: 3420,  b: 0, spc: -103, lnSpc: 3420  }
  sectionHead:{ sz: 2494,  b: 0, spc: -75,  lnSpc: 2743  }
  barTitle:   { sz: 2250,  b: 0, spc: -68,  lnSpc: 2400  }
  lead:       { sz: 1781,  b: 0, spc: -53,  lnSpc: 2494  }
  chip:       { sz: 1781,  b: 0, spc: -53,  lnSpc: 1781  }
  name:       { sz: 1425,  b: 0, spc: -16,  lnSpc: 2138  }
  body:       { sz: 1069,  b: 0, spc: -32,  lnSpc: 1496  }
  meta:       { sz: 1069,  b: 0, spc: -32,  lnSpc: 1283  }
  caption:    { sz: 891,   b: 0, spc: -10,  lnSpc: 1336  }
  micro:      { sz: 800,   b: 0, spc: -10,  lnSpc: 1100  }

radius:      { card: 14, cardSmall: 11, panel: 14, pillAdj: 50000, bar: 0 }
rule:        { weight: 0.75, alphaOnLight: 25, alphaOnDark: 30, alphaOnBlue: 35 }
textAlpha:   99000
```

### Appendix — CSS token mapping (for web/HTML rendering of the same system)

```css
:root{
  --black:#000; --white:#fff;
  --lime:#E9FEA3; --yellow:#FBFD78; --lilac:#CB9FD2; --blue:#4C49F3;
  --grey-bg:#E2E2E2; --grey-block:#CFCFCF;
  --muted-dark:#9A9A9A; --muted-light:#555; --label:#6B6B6B;

  --font: "Manrope", "Inter", system-ui, sans-serif;
  --fw-light: 200;      /* ExtraLight */
  --fw-bold: 700;       /* synthesised feel; use 500–600 if a real Manrope family is loaded */

  --radius-card: 14px; --radius-sm: 11px; --radius-pill: 999px;
  --rule: 0.75px;
}
/* scale — 1 deck-pt maps to 1px at a 720px-wide container; scale the container, not the type */
.hero        { font:var(--fw-bold) 57px/1.00 var(--font);   letter-spacing:-0.07em; }
.display     { font:var(--fw-bold) 34.2px/1.00 var(--font); letter-spacing:-0.05em; }
.title       { font:var(--fw-light) 34.2px/1.00 var(--font);letter-spacing:-0.03em; }
.section-head{ font:var(--fw-light) 24.9px/1.10 var(--font);letter-spacing:-0.03em; }
.chip        { font:var(--fw-light) 17.8px/1.00 var(--font);letter-spacing:-0.03em;
               border-radius:var(--radius-pill); padding:3.5px 8px; white-space:nowrap; }
.body        { font:var(--fw-light) 10.7px/1.40 var(--font);letter-spacing:-0.011em; }
.caption     { font:var(--fw-light) 8.9px/1.50 var(--font); letter-spacing:-0.011em; }
```

---

*End of specification. An agent implementing this document should produce output visually indistinguishable in style from the reference deck, on any subject matter.*
