/** Guardrail #1 — no fabricated facts.
 *
 *  Any numeric proof point flows through here. In "ship" mode, only numbers
 *  explicitly marked `real: true` render; everything else falls back to a
 *  proof-by-construction statement, so a placeholder can never ship by accident.
 *
 *  Flip PROOF.mode to "draft" locally to preview placeholder figures.
 */
export const PROOF = {
  mode: (process.env.NEXT_PUBLIC_PROOF_MODE ?? "ship") as "ship" | "draft",
};

export type ProofPoint = {
  /** e.g. "72h", "$25", "94%" */
  value: string;
  label: string;
  /** true only when the number is verified and cleared to publish */
  real?: boolean;
  /** shown in ship mode when !real — a true-by-construction claim, no number */
  fallback: { value: string; label: string };
};

export function resolveProof(p: ProofPoint): { value: string; label: string } {
  if (PROOF.mode === "draft" || p.real) return { value: p.value, label: p.label };
  return p.fallback;
}
