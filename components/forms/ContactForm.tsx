"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { animateContactForm } from "@/animations/forms";
import { useExperience } from "@/components/providers/ExperienceProvider";
import MagneticButton from "@/components/buttons/MagneticButton";

const fieldBase =
  "mt-2 min-h-12 w-full border bg-mist px-4 py-3 text-base text-navy placeholder:text-ink-soft/70 focus:border-navy";

export default function ContactForm() {
  const rootRef = useRef<HTMLFormElement>(null);
  const { config } = useExperience();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (!validate()) return;

    const subject = encodeURIComponent(`Inquiry — ${company || name || "New engagement"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
    );
    window.location.href = `mailto:hello@raghvendrasingh.com?subject=${subject}&body=${body}`;
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
      <div data-form-item>
        <MagneticButton type="submit">Send message</MagneticButton>
      </div>
    </form>
  );
}
