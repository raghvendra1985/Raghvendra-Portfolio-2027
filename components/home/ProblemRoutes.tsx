"use client";

import Link from "next/link";
import SectionReveal from "@/components/reveal/SectionReveal";
import { track } from "@/lib/analytics";
import { problemRoutes, services } from "@/services";

export default function ProblemRoutes() {
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
        <ul className="mt-10 border-t border-line">
          {problemRoutes.map((route) => {
            const service = services.find((item) => item.slug === route.service);
            return (
              <li key={route.id} data-reveal-item>
                <Link
                  href={route.href}
                  data-cursor="Open"
                  onClick={() => track("problem_route_clicked", { route: route.id })}
                  className="flex min-h-14 flex-col items-start gap-2 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="min-w-0 type-h3">{route.label}</span>
                  <span className="shrink-0 font-mono-label text-green">
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
