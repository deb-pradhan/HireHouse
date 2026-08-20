import type { Block } from "./types";

/** Compact Payload/Lexical → portable Block[] converter. Covers the nodes the
 *  default Payload rich-text editor emits (headings, paragraphs, lists, quote).
 *  Unknown nodes degrade to a paragraph. Inline marks become markdown-lite
 *  (**bold**, [label](href)) so the RichText renderer stays source-agnostic. */

type LexNode = {
  type?: string;
  tag?: string | number;
  text?: string;
  format?: number | string;
  url?: string;
  fields?: { url?: string };
  listType?: string;
  children?: LexNode[];
};

const BOLD = 1; // Lexical bitmask for bold

function inline(nodes: LexNode[] = []): string {
  return nodes
    .map((n) => {
      if (n.type === "link") {
        const href = n.fields?.url ?? n.url ?? "#";
        return `[${inline(n.children)}](${href})`;
      }
      let t = n.text ?? inline(n.children);
      if (typeof n.format === "number" && (n.format & BOLD) === BOLD) t = `**${t}**`;
      return t;
    })
    .join("");
}

let counter = 0;
function id(text: string): string {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return base || `section-${++counter}`;
}

export function lexicalToBlocks(root: LexNode | undefined): Block[] {
  const kids = root?.children ?? [];
  const out: Block[] = [];
  for (const node of kids) {
    switch (node.type) {
      case "heading": {
        const text = inline(node.children);
        const tag = String(node.tag ?? "h2");
        out.push({ type: tag === "h3" ? "h3" : "h2", id: id(text), text });
        break;
      }
      case "quote":
        out.push({ type: "quote", text: inline(node.children) });
        break;
      case "list": {
        const items = (node.children ?? []).map((li) => inline(li.children));
        out.push({ type: node.listType === "number" ? "ol" : "ul", items });
        break;
      }
      case "horizontalrule":
        out.push({ type: "divider" });
        break;
      case "paragraph":
      default: {
        const text = inline(node.children);
        if (text.trim()) out.push({ type: "p", text });
      }
    }
  }
  return out;
}
