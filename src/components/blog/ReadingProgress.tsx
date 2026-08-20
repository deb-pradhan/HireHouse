"use client";

import { useEffect, useState } from "react";

/** Thin top progress bar tracking scroll through the article. Reduced-motion
 *  safe (it's position, not animation) and cheap (rAF-throttled). */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[55] h-1 bg-transparent">
      <div className="h-full bg-blue" style={{ width: `${pct}%` }} />
    </div>
  );
}
