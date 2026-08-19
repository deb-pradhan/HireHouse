"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Section, ChipRow, Display, Lead, CardTitle, Eyebrow, Caption, Body } from "@/components/primitives";
import { cn } from "@/lib/cn";
import type { Job } from "@/lib/jobs/types";

/** The apply flow (deck B, blue: the page climax / the ask).
 *
 *  Fairness and safety rules baked in:
 *   - Magic-link only. There is no password field, ever (brand/security rule).
 *   - "Apply free" is the default-selected, equal-weight plan. Fast Track is
 *     secondary and never pre-selected. Fast Track buys speed and visibility,
 *     never a better score.
 *   - Interview-recording consent links /consent and is required only when the
 *     role has a recorded round (`requiresRecording`) — matching the spec.
 *
 *  No backend: this is a realistic, non-submitting UI. Nothing leaves the page.
 */

type Plan = "free" | "fast-track";

const ACCEPTED = [".pdf", ".doc", ".docx"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export function ApplyForm({ job, requiresRecording = false }: { job: Job; requiresRecording?: boolean }) {
  const emailId = useId();
  const cvId = useId();

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [reuseProfile, setReuseProfile] = useState(false);
  const [plan, setPlan] = useState<Plan>("free");
  const [consent, setConsent] = useState(false);
  const [done, setDone] = useState(false);

  const emailValid = /.+@.+\..+/.test(email.trim());
  const hasCv = Boolean(fileName) || reuseProfile;
  const consentOk = !requiresRecording || consent;
  const canSubmit = emailSent && hasCv && consentOk && !done;

  function sendMagicLink() {
    if (!emailValid) return;
    setEmailSent(true);
    setDone(false);
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileError(null);
    if (!file) {
      setFileName(null);
      return;
    }
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!ACCEPTED.includes(ext)) {
      setFileName(null);
      setFileError("Use a PDF or Word document.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setFileName(null);
      setFileError("Keep the file under 5 MB.");
      return;
    }
    setReuseProfile(false);
    setFileName(file.name);
  }

  return (
    <Section ground="blue" id="apply" belowFold>
      <ChipRow labels={["Apply"]} />
      <div className="mt-6 max-w-[42rem]">
        <Display>One application. Read by a human.</Display>
      </div>
      <Lead className="mt-5 max-w-[52ch]">
        Enter your email and we send a magic link. No passwords, ever. You choose free or Fast Track
        before you finish.
      </Lead>

      <div className="mt-10 max-w-[640px] rounded-[14px] bg-white p-6 text-black sm:p-8">
        {/* Step 1 — magic link */}
        <fieldset>
          <Eyebrow as="legend" className="text-label">
            Step 1 · Your email
          </Eyebrow>
          {!emailSent ? (
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id={emailId}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
                className="t-body h-11 w-full rounded-[11px] border border-black/25 bg-white px-4 text-black outline-none placeholder:text-label focus:border-black"
              />
              <button
                type="button"
                onClick={sendMagicLink}
                disabled={!emailValid}
                className="cta cta-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send magic link
              </button>
            </div>
          ) : (
            <div className="mt-3 rounded-[11px] border border-black/15 bg-grey-bg px-4 py-3">
              <Body>
                Magic link sent to <span className="lead-in">{email}</span>. Open it to continue.
              </Body>
              <button
                type="button"
                onClick={() => {
                  setEmailSent(false);
                  setDone(false);
                }}
                className="mt-1 underline decoration-black/30 underline-offset-4 hover:decoration-black"
              >
                <Caption as="span">Use a different email</Caption>
              </button>
            </div>
          )}
        </fieldset>

        <div className={cn("mt-8 transition-opacity", emailSent ? "opacity-100" : "pointer-events-none opacity-40")}>
          {/* Step 2 — CV */}
          <fieldset>
            <Eyebrow as="legend" className="text-label">
              Step 2 · Your CV
            </Eyebrow>
            <div className="mt-3">
              <label
                htmlFor={cvId}
                className="inline-flex h-11 cursor-pointer items-center rounded-[11px] border border-black/25 px-4 transition-colors hover:border-black"
              >
                <Caption as="span">{fileName ? "Replace CV" : "Upload CV"}</Caption>
              </label>
              <input
                id={cvId}
                type="file"
                accept={ACCEPTED.join(",")}
                onChange={onFile}
                disabled={!emailSent}
                className="sr-only"
              />
              {fileName && <Caption className="mt-2 text-muted-light">{fileName}</Caption>}
              {fileError && <Caption className="mt-2 text-black">{fileError}</Caption>}
              <Caption className="mt-2 text-label">PDF or Word, up to 5 MB.</Caption>

              <label className="mt-4 flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={reuseProfile}
                  disabled={!emailSent}
                  onChange={(e) => {
                    setReuseProfile(e.target.checked);
                    if (e.target.checked) {
                      setFileName(null);
                      setFileError(null);
                    }
                  }}
                  className="mt-[3px] h-4 w-4 shrink-0 accent-blue"
                />
                <Body as="span">Reuse my existing HireHouse profile instead.</Body>
              </label>
            </div>
          </fieldset>

          {/* Step 3 — plan (free default, equal weight) */}
          <fieldset className="mt-8">
            <Eyebrow as="legend" className="text-label">
              Step 3 · Choose how you apply
            </Eyebrow>
            <div role="radiogroup" aria-label="How you apply" className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <PlanOption
                name="plan"
                value="free"
                checked={plan === "free"}
                disabled={!emailSent}
                onChange={() => setPlan("free")}
                title="Apply free"
                lines={["Same evaluation, same bar.", "Read by a human when a reviewer reaches it."]}
              />
              <PlanOption
                name="plan"
                value="fast-track"
                checked={plan === "fast-track"}
                disabled={!emailSent}
                onChange={() => setPlan("fast-track")}
                title="Fast Track · $25"
                lines={[
                  "Local pricing at checkout (AED / INR).",
                  "Reviewed in 72 hours, straight to the manager if matched.",
                ]}
              />
            </div>
            <Caption className="mt-3 text-label">
              Free is the full path. Fast Track buys speed and visibility, never a better score.
            </Caption>
          </fieldset>

          {/* Step 4 — consent */}
          <fieldset className="mt-8">
            <Eyebrow as="legend" className="text-label">
              Step 4 · Interview recording
            </Eyebrow>
            <label className="mt-3 flex items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                disabled={!emailSent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-[3px] h-4 w-4 shrink-0 accent-blue"
              />
              <Body as="span">
                I consent to interview recording under HireHouse&rsquo;s{" "}
                <Link href="/consent" className="underline underline-offset-4 hover:decoration-black">
                  recording policy
                </Link>
                .
              </Body>
            </label>
            <Caption className="mt-2 text-label">
              {requiresRecording
                ? "This role includes a recorded round, so consent is required."
                : "Applies only if this role includes a recorded interview round."}
            </Caption>
          </fieldset>

          {/* Submit */}
          <div className="mt-8 border-t border-black/15 pt-6">
            <button
              type="button"
              onClick={() => setDone(true)}
              disabled={!canSubmit}
              className="cta cta-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              {plan === "free" ? "Apply free" : "Continue to Fast Track"}
            </button>
            {done && (
              <Caption className="mt-3 text-muted-light" role="status">
                Preview only. This application to {job.title} was not sent.
              </Caption>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

function PlanOption({
  name,
  value,
  checked,
  disabled,
  onChange,
  title,
  lines,
}: {
  name: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
  title: string;
  lines: string[];
}) {
  return (
    <label
      className={cn(
        "flex h-full cursor-pointer flex-col rounded-[14px] border p-4 transition-colors",
        checked ? "border-black bg-lime" : "border-black/25 bg-white hover:border-black/60",
      )}
    >
      <span className="flex items-center gap-2">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="h-4 w-4 accent-blue"
        />
        <CardTitle as="span">{title}</CardTitle>
      </span>
      <span className="mt-2 block">
        {lines.map((l) => (
          <Caption key={l} className="text-muted-light">
            {l}
          </Caption>
        ))}
      </span>
    </label>
  );
}
