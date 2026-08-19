# 05 · Conventions & Recipes

Concrete, copy-pasteable patterns for the common changes. Follow these so the codebase stays uniform no matter who (or which agent) touches it. Rules and rationale: [`../AGENTS.md`](../AGENTS.md).

---

## Naming & file placement

| Thing | Where | Casing |
|---|---|---|
| Route | `src/app/<route>/page.tsx` | folder = kebab-case URL segment |
| Primitive | `src/components/primitives/<Name>.tsx` | PascalCase file + export |
| Archetype section | `src/components/sections/<Archetype><Name>.tsx` | e.g. `HeroA.tsx`, `CompareF.tsx` |
| Route content | `src/content/<route>.ts` (build) · `docs/content/<route>.md` (copy source) | camelCase export |
| Lib | `src/lib/<area>/<file>.ts` | camelCase |

- Imports use the `@/` alias (`@/components/primitives`, `@/lib/site`).
- Client components: add `"use client"` only when there's real interactivity (state, effects, event handlers, context consumers). Default to Server Components.
- One component per file for sections/primitives; barrel-export primitives from `primitives/index.ts`.

---

## Recipe: add a section to a page

1. Find the copy in `docs/content/<route>.md` and the ground/archetype in `docs/03-SITEMAP-IA.md`.
2. Use an existing archetype from `components/sections/` (build it in `04` order if it doesn't exist yet). Never invent a one-off layout.
3. Wrap in `<Section ground="...">` following the page's ground rotation (no adjacent repeats; one blue at the climax; **never lilac**).
4. Set type only with typographic components. Example:

```tsx
import { Section, ChipRow, SectionHead, CardTitle, Body, Cta } from "@/components/primitives";

<Section ground="white">
  <ChipRow labels={["Fair by design"]} />
  <SectionHead className="mt-6 max-w-[26ch]">One sentence, terminal punctuation.</SectionHead>
  <Body className="mt-4 max-w-[60ch] text-muted-light">Sub-line under 120 chars.</Body>
  {/* accent cards follow the sequence lime → lilac → yellow → blue, blue at an end */}
</Section>
```

## Recipe: add a route

```tsx
// src/app/<route>/page.tsx
import type { Metadata } from "next";
export const metadata: Metadata = { title: "…", description: "…" };

export default function Page() {
  return (
    <div data-accent="employer">{/* candidate | employer | institution | partner */}
      {/* sections in the ground/archetype order from docs/03 */}
    </div>
  );
}
```

Then: add the route to `src/app/sitemap.ts`, and to nav/footer in `src/lib/site.ts` if it's user-facing. Set `data-accent` so `--accent` resolves to the audience color (candidate=lime, employer=blue, institution=lilac, partner=yellow).

## Recipe: proof points / stats (guardrail #1)

Never write a bare number in JSX. Route it through the gate:

```ts
import { resolveProof, type ProofPoint } from "@/lib/proof";

const p: ProofPoint = {
  value: "94%", label: "reviewed in 72h", real: false,   // real:true only when verified & cleared
  fallback: { value: "72h", label: "or your fee back" }, // proof-by-construction shown in ship mode
};
const { value, label } = resolveProof(p);
```

## Recipe: add/adjust a design token

Edit `src/app/globals.css` only:
- Color → `@theme { --color-x: #… }` (must already be a palette hue; do not add new hues).
- Type role → a `.t-*` class (font-size clamp + letter-spacing + line-height + weight per the spec scale).
- Spacing → use the existing scale; if JS needs a value, mirror it in `src/lib/design/`.

## Recipe: jobs data

All job data flows through `src/lib/jobs/source.ts` (the seam: fixtures now, API later). No display field is invented — a missing `salary` hides that row; it never becomes "Competitive". Job detail pages emit `JobPosting` JSON-LD and are enumerated in `sitemap.ts` via `generateStaticParams`.

---

## Copy rules (enforced in review)

- Headline ≤ 60 chars, one sentence, terminal punctuation. Sub-line ≤ 120. Card body ≤ 110. If it's too long, cut copy — never shrink type below the scale.
- No em dashes in display copy. En dashes only in numeric ranges (`8–15%`).
- Chips: labels, no punctuation, max two.
- Voice: plain, fair, a little blunt. Avoid the filler list in AGENTS.md §2.10.

## Commit / handoff hygiene

- After finishing a unit of work, update `docs/STATUS.md` (check the box, add a one-line note for the next agent).
- Run `npm run build` and confirm it's clean before reporting done.
- If you add a component, make sure it's exported and used; delete dead scaffolding.
