"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OwnerReviewToggles({
  productId,
  reviewed,
  approvedForSale,
}: {
  productId: string;
  reviewed: boolean;
  approvedForSale: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = useState<"reviewed" | "approved" | null>(null);
  const [error, setError] = useState("");

  async function save(patch: { reviewed?: boolean; approvedForSale?: boolean }, kind: "reviewed" | "approved") {
    setPending(kind);
    setError("");
    const response = await fetch("/api/admin/prelaunch/owner-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, ...patch }),
    });
    if (!response.ok) {
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      setError(payload.error ?? "Could not save.");
    }
    setPending(null);
    router.refresh();
  }

  return (
    <div className="mt-4 space-y-2 font-mono-label">
      <p>Raghvendra reviewed: {reviewed ? "YES" : "NO"}</p>
      <p>Approved for sale: {approvedForSale ? "YES" : "NO"}</p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={pending !== null}
          onClick={() => save({ reviewed: !reviewed }, "reviewed")}
          className="underline decoration-gold underline-offset-4"
        >
          {pending === "reviewed" ? "Saving…" : reviewed ? "Mark unreviewed" : "Mark reviewed"}
        </button>
        <button
          type="button"
          disabled={pending !== null}
          onClick={() => save({ approvedForSale: !approvedForSale }, "approved")}
          className="underline decoration-gold underline-offset-4"
        >
          {pending === "approved" ? "Saving…" : approvedForSale ? "Revoke approval" : "Approve for sale"}
        </button>
      </div>
      <p className="text-ink-soft">Does not change public catalogue status.</p>
      {error ? <p className="text-green">{error}</p> : null}
    </div>
  );
}
