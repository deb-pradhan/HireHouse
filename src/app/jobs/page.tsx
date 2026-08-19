import { Suspense } from "react";
import type { Metadata } from "next";
import { Section, ChipRow, Title, SectionHead, Lead, Body, Caption, Cta } from "@/components/primitives";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobCard } from "@/components/jobs/JobCard";
import { getJobs } from "@/lib/jobs/source";
import { parseQuery, buildFacets, filterJobs } from "@/lib/jobs/filter";

export const metadata: Metadata = {
  title: "Jobs",
  description:
    "Browse real roles across engineering, product and design, growth, and operations. Apply free, or Fast Track the ones you want most.",
};

type SearchParams = Record<string, string | string[] | undefined>;

/** The board — candidate. White board (header + filters + grid) then a lime
 *  Fast Track upsell strip that never blocks the free path.
 *  Copy: docs/content/jobs.md
 */
export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const [jobs, sp] = await Promise.all([getJobs(), searchParams]);
  const query = parseQuery(sp);
  const facets = buildFacets(jobs);
  const results = filterJobs(jobs, query);

  return (
    <div data-accent="candidate">
      <Section ground="white">
        <ChipRow labels={["Live board"]} />
        <div className="mt-6 max-w-[48rem]">
          <Title>Real roles. Apply free, or Fast Track to skip the wait.</Title>
        </div>
        <Lead className="mt-5 max-w-[56ch]">
          Every role here can be applied to for free. Fast Track is optional at checkout.
        </Lead>

        <div className="mt-12">
          <Suspense fallback={<div className="h-40 rounded-[14px] border border-black/15" />}>
            <JobFilters facets={facets} />
          </Suspense>
        </div>

        <Caption className="mt-8 text-muted-light" aria-live="polite">
          {results.length} {results.length === 1 ? "role" : "roles"}
        </Caption>

        {results.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-[14px] border border-black/15 p-10 text-center">
            <Body className="text-muted-light">No roles match yet. Widen a filter, or set an alert.</Body>
          </div>
        )}
      </Section>

      {/* Fast Track upsell strip — never blocks the free path. */}
      <Section ground="lime" belowFold>
        <div className="max-w-[42rem]">
          <SectionHead>Applying to a lot of roles? Fast Track the ones you want most.</SectionHead>
        </div>
        <Body className="mt-4 max-w-[56ch]">
          Reviewed in 72 hours, straight to the manager if matched. Free path stays open.
        </Body>
        <div className="mt-8">
          <Cta href="/fast-track" variant="ghost">
            How Fast Track works
          </Cta>
        </div>
      </Section>
    </div>
  );
}
