import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TypeProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
};

/** Factory for a typographic component bound to a role class from globals.css. */
function make(role: string, defaultEl: ElementType) {
  function TypeComponent({ as, className, children, ...rest }: TypeProps) {
    const Tag = as ?? defaultEl;
    return (
      <Tag className={cn(role, className)} {...rest}>
        {children}
      </Tag>
    );
  }
  TypeComponent.displayName = `Type(${role})`;
  return TypeComponent;
}

/** Typographic components — the ONLY way to set type. Each binds a role class
 *  (clamp size + tracking + leading + weight). */
export const Wordmark = make("t-wordmark", "span");
export const Hero = make("t-hero", "h1");
export const Display = make("t-display", "h2");
export const Title = make("t-title", "h1");
export const SectionHead = make("t-section", "h2");
export const CardTitle = make("t-cardtitle", "h3");
export const BarTitle = make("t-bar", "span");
export const Lead = make("t-lead", "p");
export const Body = make("t-body", "p");
export const Caption = make("t-caption", "p");
export const Micro = make("t-micro", "span");
export const Name = make("t-name", "span");
export const Eyebrow = make("t-eyebrow", "span");
