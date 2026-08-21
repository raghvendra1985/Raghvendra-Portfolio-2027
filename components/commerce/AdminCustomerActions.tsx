"use client";

import { useState } from "react";
import { products } from "@/products";

export default function AdminCustomerActions({
  customerId,
  entitlements,
}: {
  customerId: string;
  entitlements: Array<{ id: string; product_id: string; status: string }>;
}) {
  const [message, setMessage] = useState("");
  async function post(path: string, body: Record<string, string>) {
    const confirmed = window.confirm("Confirm this admin action?");
    if (!confirmed) return;
    const response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setMessage(response.ok ? "Done." : "Failed.");
  }
  return (
    <div className="mt-12 space-y-4">
      <h2 className="type-h3">Actions</h2>
      <div className="flex flex-wrap gap-3">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            className="min-h-11 border border-navy px-3 font-mono-label"
            onClick={() => post("/api/admin/entitlements", { customerId, productId: product.id, action: "grant" })}
          >
            Grant {product.name}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {entitlements
          .filter((row) => row.status === "active")
          .map((row) => (
            <button
              key={row.id}
              type="button"
              className="min-h-11 px-3 font-mono-label text-ink-soft"
              onClick={() => post("/api/admin/entitlements", { customerId, productId: row.product_id, action: "revoke" })}
            >
              Revoke {row.product_id}
            </button>
          ))}
      </div>
      <button
        type="button"
        className="min-h-11 font-mono-label"
        onClick={() => {
          const productId = entitlements[0]?.product_id;
          if (productId) post("/api/admin/resend-access", { customerId, productId });
        }}
      >
        Resend access email
      </button>
      {message ? <p className="text-sm text-green">{message}</p> : null}
    </div>
  );
}
