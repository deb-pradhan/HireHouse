/** The Job data model for the jobs surface (docs/content/jobs.md).
 *
 *  This is the single source of truth for a role. No display field is invented:
 *  a missing `salary` hides the salary row, it never becomes "Competitive".
 *  Fixtures conform to this shape now; an API adapter slots in later behind
 *  `lib/jobs/source.ts` without touching this type.
 */

export type JobFamily =
  | "engineering"
  | "product-design"
  | "growth"
  | "ops"
  | "other";

export type JobLevel = "intern" | "junior" | "mid" | "senior";

export type JobType = "full-time" | "contract";

export type Currency = "AED" | "INR";

export type Salary = {
  min: number;
  max: number;
  currency: Currency;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  family: JobFamily;
  city: string;
  remote: boolean;
  level: JobLevel;
  type: JobType;
  /** ISO date string. */
  postedAt: string;
  /** Present only when the source provides a real figure. Never fabricated. */
  salary?: Salary;
  fastTrackEligible: boolean;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  companyAbout?: string;
};
