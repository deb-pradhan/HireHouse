import type { Section } from "@/content/types";
import { HeroA } from "./HeroA";
import { StatementB } from "./StatementB";
import { StaggerC } from "./StaggerC";
import { ScorecardD } from "./ScorecardD";
import { GridE } from "./GridE";
import { CompareF } from "./CompareF";
import { BarsG } from "./BarsG";
import { StatRowH } from "./StatRowH";
import { FeatureI } from "./FeatureI";
import { TiersJ } from "./TiersJ";
import { DualK } from "./DualK";
import { ContrastL } from "./ContrastL";
import { ClosingM } from "./ClosingM";

function renderSection(section: Section) {
  switch (section.kind) {
    case "hero-a":
      return <HeroA {...section} />;
    case "statement-b":
      return <StatementB {...section} />;
    case "stagger-c":
      return <StaggerC {...section} />;
    case "scorecard-d":
      return <ScorecardD {...section} />;
    case "grid-e":
      return <GridE {...section} />;
    case "compare-f":
      return <CompareF {...section} />;
    case "bars-g":
      return <BarsG {...section} />;
    case "stat-row-h":
      return <StatRowH {...section} />;
    case "feature-i":
      return <FeatureI {...section} />;
    case "tiers-j":
      return <TiersJ {...section} />;
    case "dual-k":
      return <DualK {...section} />;
    case "contrast-l":
      return <ContrastL {...section} />;
    case "closing-m":
      return <ClosingM {...section} />;
  }
}

/** Maps a content `kind` to the archetype component (docs/04). When a section
 *  declares an `id`, wrap it in a scroll-anchor target (clears the sticky header). */
export function SectionRenderer({ section }: { section: Section }) {
  const el = renderSection(section);
  if (section.id) {
    return (
      <div id={section.id} className="scroll-mt-20">
        {el}
      </div>
    );
  }
  return el;
}
