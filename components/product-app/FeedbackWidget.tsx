"use client";

import { useState } from "react";

export default function FeedbackWidget({ productName }: { productName: string }) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return <p className="font-mono-label text-[11px] text-ink-soft">Noted. Thank you.</p>;
  }
  return (
    <button
      type="button"
      onClick={() => setSent(true)}
      className="inline-flex min-h-11 items-center font-mono-label text-[11px] text-ink-soft hover:text-navy"
    >
      Send a note about {productName}
    </button>
  );
}
