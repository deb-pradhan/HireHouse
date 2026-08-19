"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CardTitle, Caption, Body, Eyebrow } from "@/components/primitives";
import { cn } from "@/lib/cn";

/** Contact routing + form. Route-specific layout composed from primitives.
 *  Honors `?intent=` (company | candidate | institution | partner | press):
 *  the matching intent card is highlighted and the form's intent is pre-set.
 *  Non-submitting demo UI — no backend, no sensitive data collected. */

type IntentKey = "company" | "candidate" | "institution" | "partner" | "press";

const INTENTS: {
  key: IntentKey;
  title: string;
  body: string;
  cta: { label: string; href: string };
}[] = [
  {
    key: "company",
    title: "I'm hiring.",
    body: "Post a role or book a walkthrough. We hand you a verified shortlist.",
    cta: { label: "For companies", href: "/companies" },
  },
  {
    key: "candidate",
    title: "I'm job hunting.",
    body: "Browse open roles or see how Fast Track gets you seen faster.",
    cta: { label: "Browse jobs", href: "/jobs" },
  },
  {
    key: "institution",
    title: "I'm an institution.",
    body: "Book a MockHouse demo and get a batch interview-ready.",
    cta: { label: "For institutions", href: "/institutions" },
  },
  {
    key: "partner",
    title: "I want to partner.",
    body: "Book a call to explore working together across the UAE and India.",
    cta: { label: "For partners", href: "/partners" },
  },
  {
    key: "press",
    title: "Press or other.",
    body: "Media requests and general enquiries reach a real person here.",
    cta: { label: "Email us", href: "mailto:hello@hirehouse.xyz" },
  },
];

const INTENT_KEYS = INTENTS.map((i) => i.key);
const INTENT_LABELS: Record<IntentKey, string> = {
  company: "I'm hiring",
  candidate: "I'm job hunting",
  institution: "I'm an institution",
  partner: "I want to partner",
  press: "Press or other",
};

function isIntent(v: string | null): v is IntentKey {
  return v != null && (INTENT_KEYS as string[]).includes(v);
}

const fieldClass =
  "mt-2 w-full rounded-[11px] border border-black/20 bg-white px-4 py-3 text-[15px] leading-[1.4] text-black outline-none transition-colors placeholder:text-label focus:border-black";

export function ContactForm() {
  const params = useSearchParams();
  const queryIntent = params.get("intent");
  const active: IntentKey | "" = isIntent(queryIntent) ? queryIntent : "";

  const [intent, setIntent] = useState<IntentKey | "">(active);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  function validate() {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Tell us your name.";
    if (!email.trim()) next.email = "We need an email to reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "That email doesn't look right.";
    if (!message.trim()) next.message = "Add a short message so we can help.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validate()) setSent(true);
  }

  return (
    <div>
      {/* Intent routing cards — highlight honors ?intent= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INTENTS.map((it) => {
          const isActive = active === it.key;
          return (
            <div
              key={it.key}
              className={cn(
                "flex flex-col justify-between rounded-[14px] p-6",
                isActive ? "bg-lime text-black" : "bg-grey-bg text-black",
              )}
            >
              <div>
                <CardTitle>{it.title}</CardTitle>
                <Body className={cn("mt-3", isActive ? "text-black/70" : "text-muted-light")}>{it.body}</Body>
              </div>
              <Caption as={Link} href={it.cta.href} className="mt-6 block font-medium underline underline-offset-4">
                {it.cta.label}
              </Caption>
            </div>
          );
        })}
      </div>

      {/* Direct message form — non-submitting demo UI */}
      <div className="mt-14 max-w-[46rem]">
        <Eyebrow className="text-label">Or send us a note</Eyebrow>
        <CardTitle className="mt-3">Tell us a bit and we&rsquo;ll route it.</CardTitle>

        {sent ? (
          <div className="mt-8 rounded-[14px] bg-lime p-8 text-black">
            <CardTitle>Thanks for reaching out.</CardTitle>
            <Body className="mt-3 text-black/70">
              This is a demo form, so nothing was actually sent. In production your note reaches the right team and
              we reply at the email you gave.
            </Body>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setName("");
                setEmail("");
                setMessage("");
              }}
              className="cta cta-ghost mt-6"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="cf-name">
                  <Caption as="span" className="text-label">
                    Name
                  </Caption>
                </label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                  autoComplete="name"
                />
                {errors.name && <Caption className="mt-2 text-muted-light">{errors.name}</Caption>}
              </div>
              <div>
                <label htmlFor="cf-email">
                  <Caption as="span" className="text-label">
                    Email
                  </Caption>
                </label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                  autoComplete="email"
                />
                {errors.email && <Caption className="mt-2 text-muted-light">{errors.email}</Caption>}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="cf-intent">
                <Caption as="span" className="text-label">
                  I am
                </Caption>
              </label>
              <select
                id="cf-intent"
                name="intent"
                value={intent}
                onChange={(e) => setIntent(e.target.value as IntentKey | "")}
                className={cn(fieldClass, "appearance-none")}
              >
                <option value="">Pick the closest fit</option>
                {INTENT_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {INTENT_LABELS[k]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <label htmlFor="cf-message">
                <Caption as="span" className="text-label">
                  Message
                </Caption>
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={cn(fieldClass, "resize-y")}
              />
              {errors.message && <Caption className="mt-2 text-muted-light">{errors.message}</Caption>}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button type="submit" className="cta cta-accent">
                Send message
              </button>
              <Caption className="max-w-[42ch] text-muted-light">
                We only use this to reply. No sensitive data, please. See our{" "}
                <Link href="/privacy" className="underline underline-offset-2">
                  privacy policy
                </Link>{" "}
                and{" "}
                <Link href="/consent" className="underline underline-offset-2">
                  interview-recording consent
                </Link>
                .
              </Caption>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
