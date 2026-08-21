"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animateInvertLanes } from "@/animations/practice";
import SectionReveal from "@/components/reveal/SectionReveal";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { track } from "@/lib/analytics";
import { problemRoutes, services } from "@/services";

export default function ProblemRoutes() {
  const listRef = useRef<HTMLUListElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const ctx = animateInvertLanes(root, config);
    return () => ctx.revert();
  }, [config]);

  return (
    <SectionReveal
      id="solve"
      className="scroll-mt-28 border-t border-line px-[var(--page-pad)] pt-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div data-reveal-item>
          <p className="font-mono-label text-ink-soft">For founders &amp; clients</p>
          <h2 className="mt-4 max-w-3xl type-h2">
            What are you trying to solve?
          </h2>
        </div>
        <ul ref={listRef} className="mt-10 border-t border-line">
          {problemRoutes.map((route) => {
            const service = services.find((item) => item.slug === route.service);
            return (
              <li key={route.id} data-reveal-item>
                <Link
                  href={route.href}
                  data-invert-lane
                  data-cursor="Open"
                  onClick={() => track("problem_route_clicked", { route: route.id })}
                  className="group relative flex min-h-14 flex-col items-start gap-2 overflow-hidden border-b border-line px-4 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-5"
                >
                  <span
                    data-invert-fill
                    className="pointer-events-none absolute inset-0 bg-navy"
                    aria-hidden="true"
                  />
                  <span className="relative z-[1] min-w-0 type-h3 transition-colors duration-300 motion-safe:md:group-hover:text-mist motion-safe:md:group-focus-visible:text-mist">
                    {route.label}
                  </span>
                  <span className="relative z-[1] shrink-0 font-mono-label text-green transition-colors duration-300 motion-safe:md:group-hover:text-gold motion-safe:md:group-focus-visible:text-gold">
                    {service?.title ?? "Discuss"} →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionReveal>
  );
}
