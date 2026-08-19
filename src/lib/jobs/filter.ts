import type { Job, JobFamily, JobLevel, JobType } from "./types";

/** Filtering, sorting, and facet extraction for the board.
 *
 *  Filtering runs on the server from URL query params (shareable, SSR-friendly);
 *  the client `JobFilters` component only writes those params. Keeping the logic
 *  here as pure functions makes the board deterministic and easy to reason about.
 */

export type JobSort = "newest" | "relevant";

export type JobQuery = {
  q: string;
  family: string[];
  city: string[];
  level: string[];
  type: string[];
  fastTrackOnly: boolean;
  sort: JobSort;
};

export type JobFacets = {
  families: JobFamily[];
  cities: string[];
  levels: JobLevel[];
  types: JobType[];
};

const FAMILY_ORDER: JobFamily[] = ["engineering", "product-design", "growth", "ops", "other"];
const LEVEL_ORDER: JobLevel[] = ["intern", "junior", "mid", "senior"];
const TYPE_ORDER: JobType[] = ["full-time", "contract"];

/** The city facet includes "Remote" whenever any role is remote, so remote
 *  roles are always reachable even when they carry a base city. */
export const REMOTE_FACET = "Remote";

type RawParams = Record<string, string | string[] | undefined>;

function splitCsv(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function first(value: string | string[] | undefined): string {
  if (!value) return "";
  return (Array.isArray(value) ? value[0] : value).trim();
}

/** Parse raw (awaited) searchParams into a normalized query. */
export function parseQuery(params: RawParams): JobQuery {
  const sort = first(params.sort) === "relevant" ? "relevant" : "newest";
  return {
    q: first(params.q),
    family: splitCsv(params.family),
    city: splitCsv(params.city),
    level: splitCsv(params.level),
    type: splitCsv(params.type),
    fastTrackOnly: first(params.ft) === "1",
    sort,
  };
}

export function buildFacets(jobs: Job[]): JobFacets {
  const families = FAMILY_ORDER.filter((f) => jobs.some((j) => j.family === f));
  const levels = LEVEL_ORDER.filter((l) => jobs.some((j) => j.level === l));
  const types = TYPE_ORDER.filter((t) => jobs.some((j) => j.type === t));

  const cityset = new Set<string>();
  let hasRemote = false;
  for (const j of jobs) {
    if (j.remote) hasRemote = true;
    if (j.city && j.city !== REMOTE_FACET) cityset.add(j.city);
  }
  const cities = [...cityset].sort((a, b) => a.localeCompare(b));
  if (hasRemote) cities.unshift(REMOTE_FACET);

  return { families, cities, levels, types };
}

function matchesCity(job: Job, selected: string[]): boolean {
  if (selected.length === 0) return true;
  return selected.some((c) => (c === REMOTE_FACET ? job.remote : job.city === c));
}

function haystack(job: Job): string {
  return [job.title, job.company, job.summary, ...job.requirements, ...job.responsibilities]
    .join(" ")
    .toLowerCase();
}

function relevanceScore(job: Job, terms: string[]): number {
  if (terms.length === 0) return 0;
  const title = job.title.toLowerCase();
  const company = job.company.toLowerCase();
  const rest = [job.summary, ...job.requirements, ...job.responsibilities].join(" ").toLowerCase();
  let score = 0;
  for (const t of terms) {
    if (title.includes(t)) score += 3;
    if (company.includes(t)) score += 2;
    if (rest.includes(t)) score += 1;
  }
  return score;
}

function byNewest(a: Job, b: Job): number {
  return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
}

export function filterJobs(jobs: Job[], query: JobQuery): Job[] {
  const term = query.q.trim().toLowerCase();
  const terms = term ? term.split(/\s+/) : [];

  const filtered = jobs.filter((job) => {
    if (term && !haystack(job).includes(term)) return false;
    if (query.family.length && !query.family.includes(job.family)) return false;
    if (!matchesCity(job, query.city)) return false;
    if (query.level.length && !query.level.includes(job.level)) return false;
    if (query.type.length && !query.type.includes(job.type)) return false;
    if (query.fastTrackOnly && !job.fastTrackEligible) return false;
    return true;
  });

  if (query.sort === "relevant") {
    return [...filtered].sort((a, b) => {
      if (terms.length) {
        const diff = relevanceScore(b, terms) - relevanceScore(a, terms);
        if (diff !== 0) return diff;
      } else if (a.fastTrackEligible !== b.fastTrackEligible) {
        return a.fastTrackEligible ? -1 : 1;
      }
      return byNewest(a, b);
    });
  }

  return [...filtered].sort(byNewest);
}

/** Related roles for a detail page: same family first, then same level, newest. */
export function relatedJobs(all: Job[], job: Job, limit = 4): Job[] {
  const others = all.filter((j) => j.id !== job.id);
  const sameFamily = others.filter((j) => j.family === job.family);
  const sameLevel = others.filter((j) => j.family !== job.family && j.level === job.level);
  return [...sameFamily, ...sameLevel].sort(byNewest).slice(0, limit);
}
