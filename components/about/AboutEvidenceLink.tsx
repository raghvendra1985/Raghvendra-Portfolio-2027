"use client";

import type { AnalyticsEvent } from "@/lib/analytics";
import { TrackedLink } from "@/components/analytics/TrackedCta";
import type { EvidenceLink } from "@/about";

function evidenceTracking(href: string): {
  event: AnalyticsEvent;
  payload: Record<string, string>;
} {
  if (href.startsWith("/work/")) {
    return {
      event: "case_study_open",
      payload: { source: "about", slug: href.replace("/work/", "") },
    };
  }
  if (href.startsWith("/knowledge/")) {
    return {
      event: "knowledge_article_clicked",
      payload: { slug: href.replace("/knowledge/", ""), surface: "about" },
    };
  }
  return { event: "nav_clicked", payload: { from: "about", dest: href } };
}

export default function AboutEvidenceLink({ evidence }: { evidence: EvidenceLink }) {
  const tracking = evidenceTracking(evidence.href);
  return (
    <TrackedLink
      href={evidence.href}
      className="mt-4 inline-flex min-h-11 items-center font-mono-label text-green"
      data-cursor="Open"
      event={tracking.event}
      payload={tracking.payload}
    >
      {evidence.label} →
    </TrackedLink>
  );
}
