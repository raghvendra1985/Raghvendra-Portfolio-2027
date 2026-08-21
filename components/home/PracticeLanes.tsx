"use client";

import { useEffect, useRef } from "react";
import { animateInvertLanes } from "@/animations/practice";
import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { Service } from "@/services";

export default function PracticeLanes({ services }: { services: Service[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = animateInvertLanes(root, config, { enter: true });
    return () => ctx.revert();
  }, [config, services]);

  return (
    <ul ref={ref} className="mt-12 space-y-3">
      {services.map((service, index) => {
        const end = index % 2 === 1;
        return (
          <li
            key={service.slug}
            data-invert-lane
            data-invert-side={end ? "end" : "start"}
            className={`group flex ${end ? "md:justify-end" : "md:justify-start"}`}
          >
            <article className="relative w-full overflow-hidden border border-line bg-paper md:w-[78%]">
              <div
                data-invert-fill
                className="pointer-events-none absolute inset-0 bg-navy"
                aria-hidden="true"
              />
              <div className="relative z-[1] flex flex-col gap-4 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <p className="font-mono-label text-green transition-colors duration-300 motion-safe:md:group-hover:text-gold motion-safe:md:group-focus-within:text-gold">
                    {service.index}
                  </p>
                  <h3 className="mt-3 type-h2 transition-colors duration-300 motion-safe:md:group-hover:text-mist motion-safe:md:group-focus-within:text-mist">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-mono-label text-ink-soft transition-colors duration-300 motion-safe:md:group-hover:text-mist/70 motion-safe:md:group-focus-within:text-mist/70">
                    {service.stack.slice(0, 3).join(" · ")}
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy transition-colors duration-300 motion-safe:md:group-hover:text-mist/80 motion-safe:md:group-focus-within:text-mist/80">
                    {service.problem}
                  </p>
                </div>
                <div className="shrink-0">
                  <TrackedMagneticButton
                    href={`/contact?intent=${service.intent}`}
                    variant="secondary"
                    size="sm"
                    cursor="Open"
                    event="service_clicked"
                    payload={{ slug: service.slug, intent: service.intent }}
                    className="w-full justify-center transition-colors duration-300 motion-safe:md:group-hover:border-mist motion-safe:md:group-hover:text-mist sm:w-auto"
                  >
                    {service.cta}
                  </TrackedMagneticButton>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
