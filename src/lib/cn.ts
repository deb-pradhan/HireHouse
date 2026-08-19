import { clsx, type ClassValue } from "clsx";

/** Tiny class combiner. Tailwind v4 + our token utilities; no tailwind-merge needed
 *  because we don't stack conflicting arbitrary values (see docs/02). */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
