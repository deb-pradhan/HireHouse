import Link from "next/link";
import { Fragment } from "react";
import type { Block } from "@/lib/blog/types";
import { SectionHead, CardTitle } from "@/components/primitives";

/** Parse markdown-lite inline: **bold** and [label](href). */
function inline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    if (m[1] !== undefined) {
      nodes.push(<strong key={key++}>{m[1]}</strong>);
    } else {
      const href = m[3];
      const external = /^https?:\/\//.test(href);
      nodes.push(
        external ? (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
            {m[2]}
          </a>
        ) : (
          <Link key={key++} href={href}>
            {m[2]}
          </Link>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return nodes;
}

/** Renders a portable Block[] as on-system article prose. */
export function RichText({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "lead":
            return (
              <p key={i} className="t-lead-article mb-8 text-black">
                {inline(b.text)}
              </p>
            );
          case "p":
            return (
              <p key={i} className="t-article mb-6 text-black/85">
                {inline(b.text)}
              </p>
            );
          case "h2":
            return (
              <SectionHead key={i} id={b.id} as="h2" className="mt-14 mb-5 scroll-mt-24">
                {b.text}
              </SectionHead>
            );
          case "h3":
            return (
              <CardTitle key={i} id={b.id} as="h3" className="mt-10 mb-4 scroll-mt-24">
                {b.text}
              </CardTitle>
            );
          case "ul":
          case "ol": {
            const List = b.type === "ol" ? "ol" : "ul";
            return (
              <List
                key={i}
                className={`t-article mb-6 space-y-2 pl-6 text-black/85 ${
                  b.type === "ol" ? "list-decimal" : "list-disc"
                }`}
              >
                {b.items.map((it, j) => (
                  <li key={j} className="pl-1">
                    {inline(it)}
                  </li>
                ))}
              </List>
            );
          }
          case "quote":
            return (
              <blockquote key={i} className="my-10 border-l-2 border-black pl-6">
                <p className="t-lead-article text-black">{inline(b.text)}</p>
                {b.cite && <cite className="t-caption mt-3 block not-italic text-muted-light">{b.cite}</cite>}
              </blockquote>
            );
          case "callout":
            return (
              <div key={i} className="my-10 rounded-[14px] bg-lime p-6">
                <p className="t-article text-black">{inline(b.text)}</p>
              </div>
            );
          case "divider":
            return <hr key={i} className="my-12 h-px w-full border-0 bg-black/15" />;
        }
      })}
    </div>
  );
}
