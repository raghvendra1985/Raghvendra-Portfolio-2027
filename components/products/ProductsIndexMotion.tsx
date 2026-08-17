"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animateProductCards } from "@/animations/products";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { track } from "@/lib/analytics";

export default function ProductsIndexMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    track("products_page_viewed", { layout: "shelves" });
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateProductCards(root, config);
    return () => ctx.revert();
  }, [config]);

  return (
    <div ref={rootRef} className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
      {children}
    </div>
  );
}
