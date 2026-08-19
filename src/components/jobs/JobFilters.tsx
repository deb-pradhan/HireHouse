"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Caption, Eyebrow } from "@/components/primitives";
import { cn } from "@/lib/cn";
import { FAMILY_LABEL, LEVEL_LABEL, TYPE_LABEL } from "@/lib/jobs/format";
import type { JobFacets } from "@/lib/jobs/filter";
import type { JobFamily, JobLevel, JobType } from "@/lib/jobs/types";

/** Board filters. Search + facets, all synced to URL query params so the state
 *  is shareable and the server does the actual filtering. This component only
 *  reads and writes params; it never filters the list itself.
 */
export function JobFilters({ facets }: { facets: JobFacets }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [text, setText] = useState(params.get("q") ?? "");
  const debounce = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function selected(key: string): string[] {
    const v = params.get(key);
    return v ? v.split(",").filter(Boolean) : [];
  }

  function commit(next: URLSearchParams) {
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function toggleFacet(key: string, value: string) {
    const set = new Set(selected(key));
    if (set.has(value)) set.delete(value);
    else set.add(value);
    const next = new URLSearchParams(params.toString());
    const arr = [...set];
    if (arr.length) next.set(key, arr.join(","));
    else next.delete(key);
    commit(next);
  }

  function onSearch(value: string) {
    setText(value);
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (value.trim()) next.set("q", value.trim());
      else next.delete("q");
      commit(next);
    }, 300);
  }

  function setSort(value: "newest" | "relevant") {
    const next = new URLSearchParams(params.toString());
    if (value === "relevant") next.set("sort", value);
    else next.delete("sort");
    commit(next);
  }

  function toggleFastTrack() {
    const next = new URLSearchParams(params.toString());
    if (params.get("ft") === "1") next.delete("ft");
    else next.set("ft", "1");
    commit(next);
  }

  function clearAll() {
    setText("");
    router.replace(pathname, { scroll: false });
  }

  const sort = params.get("sort") === "relevant" ? "relevant" : "newest";
  const fastTrackOnly = params.get("ft") === "1";
  const hasActive =
    Boolean(params.toString()) &&
    (text.length > 0 ||
      selected("family").length > 0 ||
      selected("city").length > 0 ||
      selected("level").length > 0 ||
      selected("type").length > 0 ||
      fastTrackOnly ||
      sort === "relevant");

  return (
    <div className="rounded-[14px] border border-black/15 bg-white p-5">
      {/* search + sort */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <label className="block w-full lg:max-w-[420px]">
          <Eyebrow as="span" className="mb-2 block text-label">
            Search
          </Eyebrow>
          <input
            type="search"
            value={text}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Title, company, or skill"
            aria-label="Search roles by title, company, or skill"
            className="t-body h-11 w-full rounded-[11px] border border-black/25 bg-white px-4 text-black outline-none placeholder:text-label focus:border-black"
          />
        </label>

        <div>
          <Eyebrow as="span" className="mb-2 block text-label">
            Sort
          </Eyebrow>
          <div className="flex gap-1">
            <FilterPill active={sort === "newest"} onClick={() => setSort("newest")}>
              Newest
            </FilterPill>
            <FilterPill active={sort === "relevant"} onClick={() => setSort("relevant")}>
              Most relevant
            </FilterPill>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <FacetGroup label="Role family">
          {facets.families.map((f) => (
            <FilterPill
              key={f}
              active={selected("family").includes(f)}
              onClick={() => toggleFacet("family", f)}
            >
              {FAMILY_LABEL[f as JobFamily]}
            </FilterPill>
          ))}
        </FacetGroup>

        <FacetGroup label="City">
          {facets.cities.map((c) => (
            <FilterPill
              key={c}
              active={selected("city").includes(c)}
              onClick={() => toggleFacet("city", c)}
            >
              {c}
            </FilterPill>
          ))}
        </FacetGroup>

        <FacetGroup label="Level">
          {facets.levels.map((l) => (
            <FilterPill
              key={l}
              active={selected("level").includes(l)}
              onClick={() => toggleFacet("level", l)}
            >
              {LEVEL_LABEL[l as JobLevel]}
            </FilterPill>
          ))}
        </FacetGroup>

        <FacetGroup label="Type">
          {facets.types.map((t) => (
            <FilterPill
              key={t}
              active={selected("type").includes(t)}
              onClick={() => toggleFacet("type", t)}
            >
              {TYPE_LABEL[t as JobType]}
            </FilterPill>
          ))}
        </FacetGroup>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-black/15 pt-5">
        <FilterPill active={fastTrackOnly} onClick={toggleFastTrack}>
          Fast Track eligible
        </FilterPill>
        {hasActive && (
          <button
            type="button"
            onClick={clearAll}
            className="underline decoration-black/30 underline-offset-4 transition-colors hover:decoration-black"
          >
            <Caption as="span">Clear filters</Caption>
          </button>
        )}
      </div>
    </div>
  );
}

function FacetGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Eyebrow as="span" className="mb-2 block text-label">
        {label}
      </Eyebrow>
      <div className="flex flex-wrap gap-1">{children}</div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-[34px] items-center rounded-full px-3 transition-colors",
        active
          ? "bg-lime text-black"
          : "border border-black/25 text-black hover:border-black/60",
      )}
    >
      <Caption as="span">{children}</Caption>
    </button>
  );
}
