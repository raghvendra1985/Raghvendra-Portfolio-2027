"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { animateContactForm } from "@/animations/forms";
import { useExperience } from "@/components/providers/ExperienceProvider";
import MagneticButton from "@/components/buttons/MagneticButton";
import { track } from "@/lib/analytics";
import { contactIntents, resolveContactIntent, type ContactIntent } from "@/lib/contact";
import { site, whatsappHref } from "@/lib/site";

const fieldBase =
  "mt-2 min-h-12 w-full border bg-mist px-4 py-3 text-base text-navy placeholder:text-ink-soft/70 focus:border-navy";

export default function ContactForm() {
  const rootRef = useRef<HTMLFormElement>(null);
  const { config } = useExperience();
  const searchParams = useSearchParams();
  const requested = searchParams.get("intent");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [intent, setIntent] = useState<ContactIntent>(resolveContactIntent(requested));
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setIntent(resolveContactIntent(requested));
  }, [requested]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateContactForm(root, config);
    return () => ctx.revert();
  }, [config]);

  function validate() {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (!message.trim()) next.message = "Tell me what you would like to discuss.";
    else if (message.trim().length < 20) {
      next.message = "Add a little more detail (at least 20 characters).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function composeMessage() {
    const intentLabel = contactIntents.find((item) => item.id === intent)?.label ?? intent;
    return {
      intentLabel,
      body: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nIntent: ${intentLabel}\n\n${message}`,
    };
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (!validate()) return;

    const { intentLabel, body } = composeMessage();
    track("contact_form_submitted", { intent, channel: "email" });
    const subject = encodeURIComponent(
      `${intent === "other" ? "Inquiry" : intentLabel} — ${company || name || "New conversation"}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
  }

  function handleWhatsApp() {
    setSubmitted(true);
    if (!validate()) return;

    track("contact_form_submitted", { intent, channel: "whatsapp" });
    window.open(whatsappHref(composeMessage().body), "_blank", "noopener,noreferrer");
  }

  function fieldClass(key: string) {
    return `${fieldBase} ${errors[key] ? "border-green" : "border-line"}`;
  }

  return (
    <form ref={rootRef} onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div data-form-item>
          <label htmlFor="name" className="font-mono-label text-[11px] text-ink-soft">
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
            onChange={(event) => {
              setName(event.target.value);
              if (submitted) setErrors((e) => ({ ...e, name: "" }));
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
          <label htmlFor="email" className="font-mono-label text-[11px] text-ink-soft">
            Email
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
            onChange={(event) => {
              setEmail(event.target.value);
              if (submitted) setErrors((e) => ({ ...e, email: "" }));
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
        <label htmlFor="company" className="font-mono-label text-[11px] text-ink-soft">
          Company
        </label>
        <input
          id="company"
          autoComplete="organization"
          maxLength={160}
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className={fieldClass("company")}
        />
      </div>
      <div data-form-item>
        <p id="intent-label" className="font-mono-label text-[11px] text-ink-soft">
          I’m reaching out about
        </p>
        <div
          className="-mx-1 mt-2 flex flex-wrap"
          role="toolbar"
          aria-labelledby="intent-label"
        >
          {contactIntents.map((item) => {
            const pressed = intent === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={pressed}
                onClick={() => {
                  setIntent(item.id);
                  track("contact_intent_selected", { intent: item.id });
                }}
                className={`min-h-11 px-2 font-mono-label text-[11px] ${
                  pressed
                    ? "text-navy underline decoration-gold decoration-2 underline-offset-8"
                    : "text-ink-soft hover:text-navy"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
      <div data-form-item>
        <label htmlFor="message" className="font-mono-label text-[11px] text-ink-soft">
          What would you like to discuss?
        </label>
        <textarea
          id="message"
          required
          rows={6}
          maxLength={4000}
          value={message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onChange={(event) => {
            setMessage(event.target.value);
            if (submitted) setErrors((e) => ({ ...e, message: "" }));
          }}
          className={fieldClass("message")}
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-sm text-green" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>
      <div data-form-item className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <MagneticButton type="submit">Send message</MagneticButton>
        {intent === "student-product" ? (
          <MagneticButton type="button" variant="secondary" onClick={handleWhatsApp}>
            WhatsApp
          </MagneticButton>
        ) : null}
      </div>
    </form>
  );
}
