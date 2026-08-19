import { Section } from "@/components/primitives";

/** Board skeleton. Structural placeholders only (grey blocks, token radii);
 *  no text, no fabricated content. Mirrors the board layout so the swap is calm. */
export default function JobsLoading() {
  return (
    <div data-accent="candidate" aria-busy="true" aria-label="Loading roles">
      <Section ground="white">
        <div className="h-[27px] w-24 animate-pulse rounded-full bg-grey-block" />
        <div className="mt-6 h-10 w-full max-w-[560px] animate-pulse rounded-[11px] bg-grey-block" />
        <div className="mt-3 h-5 w-full max-w-[380px] animate-pulse rounded-[11px] bg-grey-block" />

        {/* filter bar */}
        <div className="mt-12 h-40 animate-pulse rounded-[14px] bg-grey-block" />

        {/* card grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-52 animate-pulse rounded-[14px] bg-grey-block" />
          ))}
        </div>
      </Section>
    </div>
  );
}
