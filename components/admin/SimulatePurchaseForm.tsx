"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { products } from "@/products";

export default function SimulatePurchaseForm({ defaultSlug }: { defaultSlug?: string }) {
  const router = useRouter();
  const [slug, setSlug] = useState(defaultSlug ?? products[0]?.slug ?? "");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState("");

  async function run(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const response = await fetch("/api/admin/prelaunch/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const payload = (await response.json()) as { error?: string; orderId?: string; name?: string };
    setPending(false);
    if (!response.ok) {
      setMessage(payload.error ?? "Simulation failed.");
      return;
    }
    setOrderId(payload.orderId ?? "");
    setMessage(`Simulated purchase for ${payload.name ?? slug}. Not revenue. Email was not sent.`);
    router.refresh();
  }

  return (
    <form onSubmit={run} className="mt-6 max-w-xl space-y-4">
      <p className="font-mono-label text-gold">SIMULATION MODE — not revenue</p>
      <label className="block text-sm">
        Product
        <select
          className="mt-2 min-h-11 w-full border border-navy/20 bg-mist px-3"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
        >
          {products.map((product) => (
            <option key={product.slug} value={product.slug}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center border border-navy px-4 font-mono-label"
      >
        {pending ? "Simulating…" : "Simulate purchase"}
      </button>
      {message ? <p className="text-sm leading-relaxed text-ink-soft">{message}</p> : null}
      {orderId ? (
        <p className="font-mono-label text-ink-soft">
          Order {orderId} ·{" "}
          <a className="underline decoration-gold underline-offset-4" href="/admin/prelaunch/library">
            Open library preview
          </a>
          {" · "}
          <a className="underline decoration-gold underline-offset-4" href={`/admin/prelaunch/email-preview?slug=${slug}`}>
            Preview email
          </a>
        </p>
      ) : null}
    </form>
  );
}
