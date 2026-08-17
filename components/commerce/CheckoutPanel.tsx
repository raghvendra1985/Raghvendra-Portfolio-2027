"use client";

import { useEffect, useState, type FormEvent } from "react";
import MagneticButton from "@/components/buttons/MagneticButton";
import { track } from "@/lib/analytics";
import { getStoredUtm } from "@/lib/utm";
import { formatInr, type Product } from "@/products";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const fieldClass =
  "mt-2 min-h-12 w-full border border-navy/20 bg-mist px-4 py-3 text-base text-navy placeholder:text-ink-soft/70 focus:border-navy";

function loadRazorpay() {
  return new Promise<void>((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Razorpay"));
    document.body.appendChild(script);
  });
}

export default function CheckoutPanel({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!open) return;
    track("product_buy_click", { slug: product.slug, productId: product.id });
  }, [open, product.id, product.slug]);

  if (!open) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      track("checkout_started", { slug: product.slug, productId: product.id, price: product.price });
      const response = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          name,
          email,
          phone,
          marketingOptIn: optIn,
          utm: getStoredUtm(),
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        keyId?: string;
        razorpayOrderId?: string;
        amount?: number;
        currency?: string;
        orderId?: string;
        productName?: string;
      };
      if (!response.ok || !payload.razorpayOrderId || !payload.keyId) {
        throw new Error(payload.error ?? "Could not start checkout.");
      }
      if (optIn) track("marketing_opt_in", { slug: product.slug });
      await loadRazorpay();
      track("checkout_opened", { slug: product.slug, productId: product.id });
      const checkout = new window.Razorpay!({
        key: payload.keyId,
        amount: payload.amount,
        currency: payload.currency,
        name: "Raghvendra Singh",
        description: payload.productName,
        order_id: payload.razorpayOrderId,
        prefill: { name, email, contact: phone },
        theme: { color: "#0B1849" },
        modal: {
          ondismiss: () => {
            track("payment_failed", { slug: product.slug, reason: "cancelled" });
            setBusy(false);
          },
        },
        handler: async (result: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          const verify = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
          });
          if (!verify.ok) {
            track("payment_failed", { slug: product.slug, reason: "verify" });
            window.location.href = `/purchase/failed?orderId=${payload.orderId}`;
            return;
          }
          track("payment_success", { slug: product.slug, productId: product.id });
          window.location.href = `/purchase/success?orderId=${payload.orderId}`;
        },
      });
      checkout.open();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Checkout failed.");
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/40 p-4 sm:items-center">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md border border-navy bg-mist p-6 sm:p-8"
        aria-labelledby="checkout-title"
      >
        <p className="font-mono-label text-[11px] text-ink-soft">Checkout</p>
        <h2 id="checkout-title" className="mt-3 font-display text-3xl text-navy">
          {product.name}
        </h2>
        <p className="mt-2 font-mono-label text-[11px] text-navy">{formatInr(product.price)} · one-time</p>
        <div className="mt-6">
          <label htmlFor="buy-name" className="font-mono-label text-[11px] text-ink-soft">
            Name
          </label>
          <input
            id="buy-name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="buy-email" className="font-mono-label text-[11px] text-ink-soft">
            Email
          </label>
          <input
            id="buy-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="buy-phone" className="font-mono-label text-[11px] text-ink-soft">
            Phone
          </label>
          <input
            id="buy-phone"
            required
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={fieldClass}
          />
        </div>
        <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            checked={optIn}
            onChange={(event) => setOptIn(event.target.checked)}
            className="mt-1"
          />
          Send me product updates, new student tools and occasional design resources.
        </label>
        {error ? (
          <p className="mt-4 text-sm text-green" role="alert">
            {error}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-4">
          <MagneticButton type="submit">{busy ? "Opening…" : "Pay"}</MagneticButton>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 items-center font-mono-label text-[11px] text-ink-soft hover:text-navy"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
