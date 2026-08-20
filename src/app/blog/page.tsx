import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, ChipRow, Title, Lead, Rule } from "@/components/primitives";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { getPosts, getFeatured } from "@/lib/blog/source";
import { CATEGORIES, type BlogCategoryId } from "@/lib/blog/types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on the job market: getting past filters, preparing for interviews, and hiring on merit. From the HireHouse team.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/rss.xml" } },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = (category && category in CATEGORIES ? category : null) as BlogCategoryId | null;

  const all = await getPosts();
  const featured = await getFeatured();
  const filtered = active ? all.filter((p) => p.category === active) : all;
  const showFeatured = !active && featured;
  const grid = showFeatured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  return (
    <div data-accent="candidate">
      <Section ground="black" className="!pb-16 !pt-20">
        <ChipRow labels={["Blog"]} />
        <div className="mt-6 max-w-[42rem]">
          <Title>Notes on getting hired, and hiring well.</Title>
        </div>
        <Lead className="mt-6 max-w-[54ch] text-muted-dark">
          Plain, practical writing on the job market: getting read past the filters, preparing for
          real interviews, and building a fairer hiring process.
        </Lead>
      </Section>

      <Section ground="white">
        {showFeatured && (
          <div className="mb-14">
            <PostCard post={featured} featured />
          </div>
        )}

        <div className="mb-10">
          <Suspense fallback={<div className="h-[34px]" />}>
            <CategoryFilter />
          </Suspense>
        </div>
        <Rule />

        {grid.length ? (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="t-article mt-10 text-muted-light">
            No posts in this category yet. Try another, or read them all.
          </p>
        )}
      </Section>
    </div>
  );
}
