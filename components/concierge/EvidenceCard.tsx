"use client";

import Link from "next/link";
import {
  evidenceSourceLabel,
  trackConcierge,
  type ConciergeEvidence,
} from "@/concierge";
import { useConcierge } from "@/components/concierge/ConciergeProvider";

export default function EvidenceCard({
  item,
  active = false,
}: {
  item: ConciergeEvidence;
  active?: boolean;
}) {
  const { closeConcierge } = useConcierge();

  return (
    <Link
      href={item.url}
      data-evidence-card
      data-concierge-option
      data-cursor="Open"
      onClick={() => {
        trackConcierge("concierge_result_click", {
          url: item.url,
          source: item.source,
          title: item.title,
        });
        closeConcierge();
      }}
      className={`block border-t border-line py-5 ${active ? "bg-surface-dim" : ""}`}
    >
      <p className="font-mono-label text-[11px] text-gold">
        {evidenceSourceLabel(item.source)}
      </p>
      <p className="mt-2 font-display text-xl leading-snug sm:text-2xl">{item.title}</p>
      <p className="mt-3 font-mono-label text-[11px] text-green">{item.label}</p>
    </Link>
  );
}
