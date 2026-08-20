import { Caption } from "@/components/primitives";
import { formatDate, readingMinutes } from "@/lib/blog/format";
import type { Post } from "@/lib/blog/types";
import { cn } from "@/lib/cn";

/** Author · date · reading time, on a muted line. */
export function PostMeta({ post, className, tone = "light" }: { post: Post; className?: string; tone?: "light" | "dark" }) {
  const muted = tone === "dark" ? "text-white/70" : "text-muted-light";
  return (
    <Caption className={cn(muted, className)}>
      {post.author.name} · {formatDate(post.publishedAt)} · {readingMinutes(post)} min read
    </Caption>
  );
}
