import {
  Section,
  ChipRow,
  Title,
  SectionHead,
  CardTitle,
  Eyebrow,
  Body,
  Cta,
} from "@/components/primitives";
import type { Job } from "@/lib/jobs/types";
import { FAMILY_LABEL, LEVEL_LABEL, TYPE_LABEL, formatSalary, relativeTime } from "@/lib/jobs/format";

/** Role detail: the header (white) and the descriptive details (grey).
 *  The apply flow (blue) and related roles (white) are composed by the page,
 *  keeping this an RSC that renders only source data (no invented fields).
 */
export function JobDetail({ job }: { job: Job }) {
  const salary = formatSalary(job.salary);
  const location = job.remote && job.city !== "Remote" ? `${job.city} · Remote` : job.city;

  const rows: { label: string; value: string }[] = [
    { label: "Location", value: location },
    { label: "Level", value: LEVEL_LABEL[job.level] },
    { label: "Type", value: TYPE_LABEL[job.type] },
    { label: "Posted", value: relativeTime(job.postedAt) },
  ];
  if (salary) rows.push({ label: "Salary", value: salary });

  return (
    <>
      {/* Role header */}
      <Section ground="white">
        <ChipRow labels={[FAMILY_LABEL[job.family]]} />
        <div className="mt-6 max-w-[46rem]">
          <Title>
            {job.title} at {job.company}.
          </Title>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-[37px] gap-y-10 lg:grid-cols-[58fr_38fr]">
          {/* hairline detail rows */}
          <div className="border-t border-black/15">
            {rows.map((r) => (
              <div
                key={r.label}
                className="flex items-baseline justify-between gap-6 border-b border-black/15 py-4"
              >
                <Body as="span" className="text-muted-light">
                  {r.label}
                </Body>
                <CardTitle as="span" className="shrink-0 text-right">
                  {r.value}
                </CardTitle>
              </div>
            ))}
          </div>

          {/* assessment panel (accent) */}
          <div className="order-first rounded-[14px] bg-lime p-[22px] text-black lg:order-last">
            <Eyebrow as="span" className="block">
              How you&rsquo;re assessed
            </Eyebrow>
            <Body className="mt-3">
              Merit-ranked on skills and fit, then a structured interview. A human makes the final
              call.
            </Body>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Cta href="#apply">Apply free</Cta>
          <Cta href={`/fast-track?jobId=${job.id}`} variant="ghost">
            Fast Track this application
          </Cta>
        </div>
      </Section>

      {/* Details */}
      <Section ground="grey" belowFold>
        <div className="max-w-[42rem]">
          <SectionHead>The details.</SectionHead>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-x-[37px] gap-y-12 lg:grid-cols-2">
          <DetailBlock label="About the role">
            <Body className="text-muted-light">{job.summary}</Body>
          </DetailBlock>

          <DetailBlock label="What you'll do">
            <BulletList items={job.responsibilities} />
          </DetailBlock>

          <DetailBlock label="What they're looking for">
            <BulletList items={job.requirements} />
          </DetailBlock>

          {job.companyAbout && (
            <DetailBlock label="About the company">
              <Body className="text-muted-light">{job.companyAbout}</Body>
            </DetailBlock>
          )}
        </div>
      </Section>
    </>
  );
}

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <CardTitle as="h3">{label}</CardTitle>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-[0.55em] h-px w-4 shrink-0 bg-black/40" />
          <Body as="span" className="text-muted-light">
            {item}
          </Body>
        </li>
      ))}
    </ul>
  );
}
