import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, SectionHead, Body } from "@/components/primitives";
import { JobDetail } from "@/components/jobs/JobDetail";
import { ApplyForm } from "@/components/jobs/ApplyForm";
import { JobCard } from "@/components/jobs/JobCard";
import { getJob, getJobs } from "@/lib/jobs/source";
import { relatedJobs } from "@/lib/jobs/filter";
import type { Job } from "@/lib/jobs/types";

/** Pre-render every fixture role at build time. */
export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ id: job.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) return {};
  return {
    title: `${job.title} at ${job.company}`,
    description: job.summary,
  };
}

/** JobPosting JSON-LD built only from real fixture fields (no fabrication).
 *  Optional fields (salary) are included only when the source provides them. */
function jobPostingLd(job: Job) {
  const ld: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.postedAt,
    employmentType: job.type === "full-time" ? "FULL_TIME" : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city,
      },
    },
  };
  if (job.remote) {
    ld.jobLocationType = "TELECOMMUTE";
  }
  if (job.salary) {
    ld.baseSalary = {
      "@type": "MonetaryAmount",
      currency: job.salary.currency,
      value: {
        "@type": "QuantitativeValue",
        minValue: job.salary.min,
        maxValue: job.salary.max,
      },
    };
  }
  return ld;
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  const all = await getJobs();
  const related = relatedJobs(all, job);

  return (
    <div data-accent="candidate">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingLd(job)) }}
      />
      <JobDetail job={job} />
      <ApplyForm job={job} />

      {related.length > 0 && (
        <Section ground="white" belowFold>
          <div className="max-w-[42rem]">
            <SectionHead>More roles you&rsquo;re a fit for.</SectionHead>
          </div>
          <Body className="mt-4 max-w-[52ch] text-muted-light">
            Score well but not matched here? We fast-track you into more roles like these, free.
          </Body>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <JobCard key={r.id} job={r} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
