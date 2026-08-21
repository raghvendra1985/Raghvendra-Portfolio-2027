"use client";

import Link from "next/link";
import SectionReveal from "@/components/reveal/SectionReveal";
import WorkCard from "@/components/work/WorkCard";
import { track } from "@/lib/analytics";
import { problemRoutes, services } from "@/services";

const mosaic = [
  "md:col-span-2 md:row-span-2 min-h-[22rem]",
  "min-h-[10.5rem]",
  "min-h-[10.5rem]",
  "min-h-[10.5rem]",
  "md:col-span-2 min-h-[10.5rem]",
];

const surfaces = [
  "bg-navy text-mist",
  "bg-paper text-navy",
  "bg-paper text-navy",
  "bg-paper text-navy",
  "bg-surface-dim text-navy",
];

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
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {problemRoutes.map((route, index) => {
            const service = services.find((item) => item.slug === route.service);
            const featured = index === 0;
            return (
              <li key={route.id} data-reveal-item className={mosaic[index]}>
                <WorkCard className={`h-full ${surfaces[index]}`}>
                  <Link
                    href={route.href}
                    data-cursor="Open"
                    onClick={() => track("problem_route_clicked", { route: route.id })}
                    className="group relative flex h-full min-h-[10.5rem] flex-col justify-between overflow-hidden p-6 sm:p-8"
                  >
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                    <span className="font-mono-label text-gold">{service?.index ?? "00"}</span>
                    <div className="mt-8">
                      <span className="block max-w-md type-h3">{route.label}</span>
                      <span
                        className={`mt-4 inline-flex font-mono-label ${
                          featured ? "text-gold" : "text-green"
                        }`}
                      >
                        {service?.title ?? "Discuss"} →
                      </span>
                    </div>
                  </Link>
                </WorkCard>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionReveal>
  );
}
