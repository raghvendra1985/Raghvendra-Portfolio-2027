"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { animateContactForm } from "@/animations/forms";
import { useExperience } from "@/components/providers/ExperienceProvider";
import MagneticButton from "@/components/buttons/MagneticButton";
import { track, trackFunnel } from "@/lib/analytics";
import {
  contactIntentFromQuery,
  contactIntents,
  contactTimelines,
  type ContactIntent,
  type ContactTimeline,
} from "@/lib/contact";
import { contactPage, intentHints } from "@/contact";

const fieldBase =
  "mt-2 min-h-12 w-full border bg-mist px-4 py-3 text-base text-navy placeholder:text-ink-soft/70 focus:border-navy";

export default function ContactForm() {
  const rootRef = useRef<HTMLFormElement>(null);
  const confirmRef = useRef<HTMLHeadingElement>(null);
  const { config } = useExperience();
  const searchParams = useSearchParams();
  const requested = searchParams.get("intent");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [intent, setIntent] = useState<ContactIntent | null>(contactIntentFromQuery(requested));
  const [timeline, setTimeline] = useState<ContactTimeline | "">("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempted, setAttempted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [fail, setFail] = useState("");
  const startedRef = useRef(false);

  useEffect(() => {
    setIntent(contactIntentFromQuery(requested));
  }, [requested]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || sent) return;
    const ctx = animateContactForm(root, config);
    return () => ctx.revert();
  }, [config, sent]);

  useEffect(() => {
    if (!sent) return;
    confirmRef.current?.focus();
  }, [sent]);

  function markStarted() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackFunnel("contact_start", { intent: intent ?? "none", source: "contact_form" });
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!intent) next.intent = contactPage.intentRequired;
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) next.email = "Work email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid work email.";
    }
    if (!message.trim()) next.message = "Tell me what you are trying to solve.";
    else if (message.trim().length < 20) {
      next.message = "Add a little more detail (at least 20 characters).";
    }
    setErrors(next);
    return next;
  }

  function focusFirstError(next: Record<string, string>) {
    const order = ["intent", "name", "email", "message"];
    const first = order.find((key) => next[key]);
    if (!first) return;
    const node =
      first === "intent"
        ? rootRef.current?.querySelector<HTMLElement>('[role="radio"]')
        : rootRef.current?.querySelector<HTMLElement>(`#${first}`);
    node?.focus();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (sent || sending) return;
    setAttempted(true);
    setFail("");
    const next = validate();
    if (Object.keys(next).length) {
      focusFirstError(next);
      return;
    }
    if (!intent) return;

    setSending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          organisation: organisation.trim(),
          intent,
          timeline,
          message: message.trim(),
          source: `${window.location.pathname}${window.location.search}`.slice(0, 240),
          website: honeypot,
        }),
      });
      const payload = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (response.status === 429) {
        trackFunnel("contact_submit_failed", { intent, reason: "rate_limited", source: "contact_form" });
        setFail(contactPage.rateLimitBody);
        return;
      }
      if (!response.ok || payload?.ok !== true) {
        throw new Error("send-failed");
      }
      trackFunnel("contact_submit", { intent, channel: "email", source: "contact_form" });
      setSent(true);
    } catch {
      trackFunnel("contact_submit_failed", { intent, reason: "network", source: "contact_form" });
      setFail(contactPage.failBody);
    } finally {
      setSending(false);
    }
  }

  function fieldClass(key: string) {
    return `${fieldBase} ${errors[key] ? "border-green" : "border-line"}`;
  }

  if (sent) {
    return (
      <div className="space-y-4" role="status" aria-live="polite">
        <h2 ref={confirmRef} tabIndex={-1} className="type-h3 outline-none">
          {contactPage.confirmationTitle}
        </h2>
        <p className="text-sm leading-relaxed text-ink-soft">{contactPage.confirmationBody}</p>
      </div>
    );
  }

  return (
    <form ref={rootRef} onSubmit={handleSubmit} className="relative space-y-5" noValidate>
      <div data-form-item>
        <h2 id="intent-label" className="font-section-label text-navy">
          {contactPage.intentPrompt}
        </h2>
        <div
          className="-mx-1 mt-4 flex flex-col items-start sm:flex-wrap sm:flex-row"
          role="radiogroup"
          aria-labelledby="intent-label"
          aria-required="true"
          aria-invalid={Boolean(errors.intent)}
          aria-describedby={errors.intent ? "intent-error" : "intent-hint"}
          onKeyDown={(event) => {
            if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) return;
            event.preventDefault();
            markStarted();
            const ids = contactIntents.map((item) => item.id);
            const current = intent ? ids.indexOf(intent) : -1;
            const dir = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
            const next = ids[(Math.max(current, 0) + dir + ids.length) % ids.length];
            setIntent(next);
            track("contact_intent_selected", { intent: next });
            if (attempted) setErrors((e) => ({ ...e, intent: "" }));
            const radios = rootRef.current?.querySelectorAll<HTMLElement>('[role="radio"]');
            radios?.[ids.indexOf(next)]?.focus();
          }}
        >
          {contactIntents.map((item) => {
            const checked = intent === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={checked}
                onClick={() => {
                  markStarted();
                  setIntent(item.id);
                  track("contact_intent_selected", { intent: item.id });
                  if (attempted) setErrors((e) => ({ ...e, intent: "" }));
                }}
                className={`min-h-11 max-w-full px-2 text-left font-mono-label ${
                  checked
                    ? "text-navy underline decoration-gold decoration-2 underline-offset-8"
                    : "text-ink-soft hover:text-navy"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <p id="intent-hint" className="mt-3 text-sm leading-relaxed text-ink-soft">
          {intent ? intentHints[intent] : "Choose one. The form stays the same."}
        </p>
        {errors.intent ? (
          <p id="intent-error" className="mt-2 text-sm text-green" role="alert">
            {errors.intent}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div data-form-item>
          <label htmlFor="name" className="font-mono-label text-ink-soft">
            Name
          </label>
          <input
            id="name"
            required
            autoComplete="name"
            maxLength={120}
            value={name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            onFocus={markStarted}
            onChange={(event) => {
              setName(event.target.value);
              if (attempted) setErrors((e) => ({ ...e, name: "" }));
            }}
            className={fieldClass("name")}
          />
          {errors.name ? (
            <p id="name-error" className="mt-2 text-sm text-green" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div data-form-item>
          <label htmlFor="email" className="font-mono-label text-ink-soft">
            {contactPage.emailLabel}
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            maxLength={160}
            value={email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onFocus={markStarted}
            onChange={(event) => {
              setEmail(event.target.value);
              if (attempted) setErrors((e) => ({ ...e, email: "" }));
            }}
            className={fieldClass("email")}
          />
          {errors.email ? (
            <p id="email-error" className="mt-2 text-sm text-green" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div data-form-item>
        <label htmlFor="organisation" className="font-mono-label text-ink-soft">
          {contactPage.organisationLabel}
        </label>
        <input
          id="organisation"
          autoComplete="organization"
          maxLength={160}
          value={organisation}
          onFocus={markStarted}
          onChange={(event) => setOrganisation(event.target.value)}
          className={fieldClass("organisation")}
        />
      </div>

      <div data-form-item>
        <label htmlFor="timeline" className="font-mono-label text-ink-soft">
          {contactPage.timelineLabel}
        </label>
        <select
          id="timeline"
          value={timeline}
          onFocus={markStarted}
          onChange={(event) => setTimeline(event.target.value as ContactTimeline | "")}
          className={`${fieldBase} border-line`}
        >
          <option value="">{contactPage.timelineOptional}</option>
          {contactTimelines.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div data-form-item>
        <label htmlFor="message" className="font-mono-label text-ink-soft">
          {contactPage.messageLabel}
        </label>
        <textarea
          id="message"
          required
          rows={6}
          maxLength={4000}
          value={message}
          placeholder={intent ? intentHints[intent] : undefined}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onFocus={markStarted}
          onChange={(event) => {
            setMessage(event.target.value);
            if (attempted) setErrors((e) => ({ ...e, message: "" }));
          }}
          className={fieldClass("message")}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-green" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div hidden aria-hidden="true">
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      {fail ? (
        <p className="text-sm text-green" role="alert">
          {fail}
        </p>
      ) : null}

      <div data-form-item>
        <MagneticButton type="submit" disabled={sending || sent}>
          {sending ? contactPage.sendingLabel : fail ? contactPage.retryLabel : contactPage.submitLabel}
        </MagneticButton>
      </div>
    </form>
  );
}
