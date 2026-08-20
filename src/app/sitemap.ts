import type { MetadataRoute } from "next";
import { getJobs } from "@/lib/jobs/source";
import { getPosts } from "@/lib/blog/source";

const BASE = "https://hirehouse.xyz";

/** Enumerates public routes + live job detail pages. Excludes dev-only
 *  (/kitchen-sink) and boundary (/checkout) routes. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/fast-track",
    "/jobs",
    "/companies",
    "/institutions",
    "/mockhouse",
    "/partners",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/consent",
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${BASE}${r}`,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));

  const jobs = await getJobs();
  const jobEntries: MetadataRoute.Sitemap = jobs.map((j) => ({
    url: `${BASE}/jobs/${j.id}`,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const posts = await getPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.publishedAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...jobEntries, ...postEntries];
}
