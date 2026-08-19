import type { JobFamily, JobLevel, JobType, Salary } from "./types";

/** Display helpers for job data. Labels live here so the board, detail, and
 *  filter UI stay consistent. No helper invents data: `formatSalary` returns
 *  null when there is no salary (the caller then renders nothing). */

export const FAMILY_LABEL: Record<JobFamily, string> = {
  engineering: "Engineering",
  "product-design": "Product & Design",
  growth: "Growth",
  ops: "Operations",
  other: "Other",
};

export const LEVEL_LABEL: Record<JobLevel, string> = {
  intern: "Intern",
  junior: "Junior",
  mid: "Mid",
  senior: "Senior",
};

export const TYPE_LABEL: Record<JobType, string> = {
  "full-time": "Full-time",
  contract: "Contract",
};

/** A salary range using only the fields the source provides. Never asserts a
 *  pay period (the data model carries none), and returns null when absent so a
 *  missing salary hides the row rather than becoming "Competitive". */
export function formatSalary(salary?: Salary): string | null {
  if (!salary) return null;
  const min = salary.min.toLocaleString("en-US");
  const max = salary.max.toLocaleString("en-US");
  return `${salary.currency} ${min} to ${max}`;
}

/** Relative "posted" label, computed against the build time. */
export function relativeTime(iso: string, now: Date = new Date()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diffMs = Math.max(0, now.getTime() - then);
  const day = 86_400_000;
  const days = Math.floor(diffMs / day);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (days < 14) return "1 week ago";
  if (days < 30) return `${weeks} weeks ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}
