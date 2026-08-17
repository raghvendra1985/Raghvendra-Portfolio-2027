"use client";

import { useState, type FormEvent } from "react";
import MagneticButton from "@/components/buttons/MagneticButton";

export default function MagicLinkForm({ next = "/account/library" }: { next?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("idle");
    const response = await fetch("/api/account/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, next }),
    });
    const payload = (await response.json()) as { error?: string };
    if (!response.ok) {
      setStatus("error");
      setMessage(payload.error ?? "Could not send the link.");
      return;
    }
    setStatus("sent");
    setMessage("Check your email for the sign-in link.");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md">
      <label htmlFor="login-email" className="font-mono-label text-[11px] text-ink-soft">
        Email used at checkout
      </label>
      <input
        id="login-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="mt-2 min-h-12 w-full border border-navy/20 bg-mist px-4 py-3 text-base"
      />
      {message ? (
        <p className="mt-3 text-sm text-green" role="status">
          {message}
        </p>
      ) : null}
      <div className="mt-8">
        <MagneticButton type="submit">{status === "sent" ? "Link sent" : "Send sign-in link"}</MagneticButton>
      </div>
    </form>
  );
}
