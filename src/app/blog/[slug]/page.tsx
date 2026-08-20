import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, ChipRow, Title, Lead, Rule, SectionHead, Caption, Cta } from "@/components/primitives";
import { RichText } from "@/components/blog/RichText";
import { PostMeta } from "@/components/blog/PostMeta";
import { PostCard } from "@/components/blog/PostCard";
import { ShareBar } from "@/components/blog/ShareBar";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { getPost, getPosts, getRelated } from "@/lib/blog/source";
import { formatDate, readingMinutes, tableOfContents } from "@/lib/blog/format";
import { CATEGORIES } from "@/lib/blog/types";

const SITE_URL = "https://hirehouse.xyz";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.seo?.title ?? post.title;
  const description = post.seo?.description ?? post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      section: CATEGORIES[post.category].label,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const cat = CATEGORIES[post.category];
  const toc = tableOfContents(post);
  const related = await getRelated(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: post.author.name },
    publisher: { "@type": "Organization", name: "HireHouse" },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
    articleSection: cat.label,
  };

  return (
    <div data-accent="candidate">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header */}
      <Section ground="white" className="!pb-8 !pt-16">
        <Link href="/blog" className="t-caption text-muted-light hover:text-black">
          ← All posts
        </Link>
        <div className="mt-6">
          <ChipRow labels={[cat.label]} />
        </div>
        <div className="mt-6 max-w-[46rem]">
          <Title>{post.title}</Title>
        </div>
        <Lead className="mt-6 max-w-[54ch] text-muted-light">{post.excerpt}</Lead>
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <PostMeta post={post} />
          <ShareBar title={post.title} />
        </div>
      </Section>

      {/* Body + TOC */}
      <Section ground="white" className="!pt-0">
        <Rule />
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,44rem)_1fr]">
          <article>
            <RichText blocks={post.body} />
            <div className="mt-14 border-t border-black/15 pt-8">
              <Caption className="text-muted-light">
                Written by {post.author.name}
                {post.author.role ? ` · ${post.author.role}` : ""} · {formatDate(post.publishedAt)} ·{" "}
                {readingMinutes(post)} min read
              </Caption>
              <div className="mt-5">
                <ShareBar title={post.title} />
              </div>
            </div>
          </article>

          {toc.length > 1 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <Caption className="text-label">On this page</Caption>
                <ul className="mt-4 space-y-2">
                  {toc.map((h) => (
                    <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
                      <a href={`#${h.id}`} className="t-caption text-muted-light hover:text-black">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
        </div>
      </Section>

      {/* Related + CTA */}
      {related.length > 0 && (
        <Section ground="grey" belowFold>
          <ChipRow labels={["Keep reading"]} />
          <div className="mt-6">
            <SectionHead>More on the job market.</SectionHead>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <Cta href="/fast-track">Fast Track your application</Cta>
            <Cta href="/jobs" variant="ghost">
              Browse open jobs
            </Cta>
          </div>
        </Section>
      )}
    </div>
  );
}
