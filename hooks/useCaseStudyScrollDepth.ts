"use client";

import { useEffect, useRef } from "react";
import { trackFunnel } from "@/lib/analytics";

/**
 * Case-study reading depth:
 * - 50% scroll once per slug view
 * - complete via IntersectionObserver on [data-case-next], with 90% scroll fallback
 * - short (non-scrollable) pages do not auto-fire depth/complete
 */
export function useCaseStudyScrollDepth(slug: string) {
  const fired50 = useRef(false);
  const firedComplete = useRef(false);

  useEffect(() => {
    fired50.current = false;
    firedComplete.current = false;

    function scrollableDistance() {
      return document.documentElement.scrollHeight - window.innerHeight;
    }

    function progress() {
      const scrollable = scrollableDistance();
      if (scrollable <= 0) return 0;
      return window.scrollY / scrollable;
    }

    function markComplete(via: "continue" | "scroll_90") {
      if (firedComplete.current) return;
      firedComplete.current = true;
      trackFunnel("case_study_complete", { slug, source: "case_study", via });
    }

    function onScroll() {
      const scrollable = scrollableDistance();
      if (scrollable <= 0) return;

      const p = progress();
      if (!fired50.current && p >= 0.5) {
        fired50.current = true;
        trackFunnel("case_study_depth_50", { slug, source: "case_study" });
      }
      if (!firedComplete.current && p >= 0.9) {
        markComplete("scroll_90");
      }
    }

    const continueEl = document.querySelector("[data-case-next]");
    let observer: IntersectionObserver | null = null;
    if (continueEl && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            markComplete("continue");
          }
        },
        { threshold: 0.35 },
      );
      observer.observe(continueEl);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [slug]);
}
