import Link from "next/link";
import { SectionHead, BarTitle, CardTitle, Caption, Eyebrow } from "@/components/primitives";
import { CATEGORIES, type Post } from "@/lib/blog/types";
import { PostMeta } from "./PostMeta";
import { cn } from "@/lib/cn";

/** Editorial post card. Type is the picture: the title sits on a flat accent
 *  cover (category color); excerpt + meta sit below. The title appears once.
 *  Uploaded cover images (from the CMS) render the title below instead.
 *  `featured` renders a wide 2-col card. */
export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const cat = CATEGORIES[post.category];
  const onBlue = cat.accent === "blue";
  const coverInk = onBlue ? "text-white" : "text-black";
  const hasImage = Boolean(post.cover);

  const Below = (
    <div className={cn("mt-4", featured && "lg:mt-0 lg:flex lg:flex-col lg:justify-center")}>
      <Eyebrow className="text-muted-light">
        {featured ? `Featured · ${cat.label}` : cat.label}
      </Eyebrow>
      {hasImage ? (
        featured ? (
          <SectionHead className="mt-3">{post.title}</SectionHead>
        ) : (
          <CardTitle className="mt-3">{post.title}</CardTitle>
        )
      ) : null}
      <Caption className="mt-3 max-w-[52ch] text-muted-light">{post.excerpt}</Caption>
      <PostMeta post={post} className="mt-4" />
    </div>
  );

  const cover = hasImage ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={post.cover!.src}
      alt={post.cover!.alt}
      className="aspect-[16/10] w-full rounded-[14px] object-cover"
      loading="lazy"
    />
  ) : (
    <div
      className={cn(
        `bg-${cat.accent}`,
        coverInk,
        "flex flex-col justify-between rounded-[14px] p-6",
        featured ? "min-h-[260px] lg:min-h-full" : "min-h-[210px]",
      )}
    >
      <Eyebrow className={onBlue ? "text-white/80" : "text-black/60"}>{cat.label}</Eyebrow>
      {featured ? (
        <SectionHead as="span" className="mt-6 block">
          {post.title}
        </SectionHead>
      ) : (
        <BarTitle as="span" className="mt-6 block">
          {post.title}
        </BarTitle>
      )}
    </div>
  );

  return (
    <Link
      href={`/blog/${post.slug}`}
      data-track={`blog-card:${post.slug}`}
      className={cn("group block", featured && "lg:grid lg:grid-cols-2 lg:gap-8")}
    >
      <div className="transition-transform group-hover:-translate-y-0.5">{cover}</div>
      {/* On accent covers the title is the cover; below carries only meta/excerpt. */}
      {Below}
    </Link>
  );
}
