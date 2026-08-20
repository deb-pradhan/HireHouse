import Link from "next/link";
import { Section } from "@/components/primitives/Section";
import { Rule } from "@/components/primitives/Rule";
import { Caption, Wordmark } from "@/components/primitives/Type";
import { FOOTER, SITE, SOCIAL } from "@/lib/site";

export function Footer() {
  return (
    <Section ground="black" as="footer" belowFold className="!py-16">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {FOOTER.map((col) => (
          <div key={col.title}>
            <p className="t-eyebrow text-muted-dark">{col.title}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {col.links.map((l) => {
                const ext = l.href.startsWith("http");
                return (
                  <li key={l.href}>
                    {ext ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="t-name opacity-70 transition-opacity hover:opacity-100"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="t-name opacity-70 transition-opacity hover:opacity-100"
                      >
                        {l.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <p className="t-eyebrow text-muted-dark">Follow</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {SOCIAL.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="t-name opacity-70 transition-opacity hover:opacity-100"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <Rule />
        <div className="mt-6 flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
          <Caption className="text-muted-dark">
            {SITE.name} · a product of {SITE.parent} · {SITE.markets}
          </Caption>
          <Caption className="text-muted-dark">{SITE.tagline}</Caption>
        </div>
      </div>

      {/* bleed wordmark */}
      <div className="pointer-events-none mt-8 overflow-hidden">
        <Wordmark className="block text-white/[0.06] leading-none">HireHouse</Wordmark>
      </div>
    </Section>
  );
}
