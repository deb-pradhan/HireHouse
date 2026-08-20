"use client";

import { useState } from "react";

/** Social sharing — share intents open in a new tab (user-initiated), copy uses
 *  the clipboard API. No third-party SDKs. */
export function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function url() {
    return typeof window === "undefined" ? "" : window.location.href;
  }

  function open(href: string) {
    window.open(href, "_blank", "noopener,noreferrer,width=600,height=560");
  }

  const btn =
    "cta cta-ghost !h-9 !px-4 !text-[13px]";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="t-caption text-muted-light">Share</span>
      <button
        type="button"
        className={btn}
        onClick={() => open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url())}`)}
      >
        X / Twitter
      </button>
      <button
        type="button"
        className={btn}
        onClick={() => open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url())}`)}
      >
        LinkedIn
      </button>
      <button
        type="button"
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url());
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            /* clipboard blocked; no-op */
          }
        }}
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
