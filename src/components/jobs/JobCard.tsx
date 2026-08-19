import Link from "next/link";
import { Chip, CardTitle, Caption, Micro } from "@/components/primitives";
import { cn } from "@/lib/cn";
import type { Job } from "@/lib/jobs/types";
import { FAMILY_LABEL, LEVEL_LABEL, TYPE_LABEL, formatSalary, relativeTime } from "@/lib/jobs/format";

/** A single role on the board (and in related-roles grids).
 *
 *  The whole card is one link to the detail page; the title inverts on hover
 *  (sharp highlight, no shadow). Radius 14. Renders on a light ground only, so
 *  hairlines are black-alpha. A missing salary simply renders no salary line.
 */
export function JobCard({ job }: { job: Job }) {
  const salary = formatSalary(job.salary);
  const location = job.remote && job.city !== "Remote" ? `${job.city} · Remote` : job.city;

  return (
    <Link
      href={`/jobs/${job.id}`}
      className={cn(
        "group flex h-full flex-col rounded-[14px] border border-black/15 bg-white p-5",
        "transition-colors hover:border-black/50 focus-visible:border-black/50",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Chip>{FAMILY_LABEL[job.family]}</Chip>
        {job.fastTrackEligible && (
          <span className="inline-flex h-[27px] items-center rounded-full bg-lime px-2">
            <Micro className="text-black">Fast Track eligible</Micro>
          </span>
        )}
      </div>

      <Caption className="mt-4 text-muted-light">{job.company}</Caption>
      <CardTitle as="h3" className="mt-1">
        <span className="box-decoration-clone -mx-1 px-1 transition-colors group-hover:bg-black group-hover:text-white">
          {job.title}
        </span>
      </CardTitle>

      <div className="mt-auto pt-5">
        <Caption className="text-muted-light">
          {location} · {LEVEL_LABEL[job.level]} · {TYPE_LABEL[job.type]}
        </Caption>
        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4">
          <Caption className="text-muted-light">Posted {relativeTime(job.postedAt)}</Caption>
          {salary && <Caption className="text-black">{salary}</Caption>}
        </div>
      </div>
    </Link>
  );
}
