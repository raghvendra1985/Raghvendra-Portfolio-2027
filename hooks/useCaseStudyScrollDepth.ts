"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * One-shot scroll depth for case studies: 50% and ~90% (complete).
 * Uses document scroll position relative to document height.
 */
export function useCaseStudyScrollDepth(slug: string) {
  const fired50 = useRef(false);
  const firedComplete = useRef(false);

  useEffect(() => {
    fired50.current = false;
    firedComplete.current = false;

    function progress() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return 1;
      return window.scrollY / scrollable;
    }

    function onScroll() {
      const p = progress();
      if (!fired50.current && p >= 0.5) {
        fired50.current = true;
        track("case_study_depth_50", { slug, source: "case_study" });
      }
      if (!firedComplete.current && p >= 0.9) {
        firedComplete.current = true;
        track("case_study_complete", { slug, source: "case_study" });
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);
}
