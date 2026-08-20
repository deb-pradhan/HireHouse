"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, type BlogCategoryId } from "@/lib/blog/types";
import { cn } from "@/lib/cn";

const ALL = Object.values(CATEGORIES);

/** Category chips, URL-synced (?category=). "All" clears the filter. */
export function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get("category") as BlogCategoryId | null;

  function select(cat: BlogCategoryId | null) {
    const q = new URLSearchParams(params.toString());
    if (cat) q.set("category", cat);
    else q.delete("category");
    router.replace(`${pathname}${q.toString() ? `?${q}` : ""}`, { scroll: false });
  }

  const chip = "t-chip inline-flex h-[34px] items-center rounded-full px-4 transition-colors";

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => select(null)}
        className={cn(chip, !active ? "bg-black text-white" : "bg-black/[0.06] text-black hover:bg-black/10")}
      >
        All
      </button>
      {ALL.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => select(c.id)}
          className={cn(chip, active === c.id ? "bg-black text-white" : "bg-black/[0.06] text-black hover:bg-black/10")}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
