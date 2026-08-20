import { renderOg, type OgAccent } from "@/lib/og/render";
import { getPost, getPosts } from "@/lib/blog/source";
import { CATEGORIES, type Accent } from "@/lib/blog/types";

export const runtime = "nodejs";
export const alt = "HireHouse blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

/** Category accent → OG pill accent (reuses the site OG renderer). */
const ACCENT_MAP: Record<Accent, OgAccent> = {
  lime: "candidate",
  yellow: "partner",
  lilac: "institution",
  blue: "employer",
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  const cat = post ? CATEGORIES[post.category] : null;
  return renderOg({
    eyebrow: cat ? cat.label : "HireHouse blog",
    title: post ? post.title : "HireHouse blog",
    accent: cat ? ACCENT_MAP[cat.accent] : "candidate",
  });
}
