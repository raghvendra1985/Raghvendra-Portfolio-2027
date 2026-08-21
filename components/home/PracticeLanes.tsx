"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { animatePracticeIndex, crossfadePracticePanel } from "@/animations/practice";
import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import { useExperience } from "@/components/providers/ExperienceProvider";
import WorkCard from "@/components/work/WorkCard";
import type { Service } from "@/services";

export default function PracticeLanes({ services }: { services: Service[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { config } = useExperience();
  const [active, setActive] = useState(0);
  const current = services[active];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animatePracticeIndex(root, config, { onIndex: setActive });
    return () => ctx.revert();
  }, [config, services]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-practice-panel]"));
    crossfadePracticePanel(panels, active, config);
  }, [active, config]);

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      setActive((value) => Math.min(services.length - 1, value + 1));
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      setActive((value) => Math.max(0, value - 1));
    }
  }

  return (
    <div
      ref={rootRef}
      className="mt-12"
      tabIndex={0}
      aria-labelledby="practice-heading"
      aria-describedby="practice-keys"
      onKeyDown={onKeyDown}
    >
      <p id="practice-keys" className="sr-only">
        Use arrow keys to move between practice areas. The panel shows what I help with and what
        you leave with.
      </p>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden min-h-[70vh] lg:block">
          <div className="sticky top-24">
            <div className="relative min-h-[28rem]">
              {services.map((service, index) => (
                <div
                  key={service.slug}
                  data-practice-panel
                  className="absolute inset-0 border-t-2 border-navy pt-6"
                  aria-hidden={index !== active}
                >
                  <PracticeDetail service={service} />
                </div>
              ))}
            </div>
            <div className="mt-8 h-px bg-line">
              <div data-practice-progress className="h-px origin-left scale-x-0 bg-gold" />
            </div>
            <p className="sr-only" aria-live="polite">
              {current?.title}: {current?.problem}
            </p>
          </div>
        </div>

        <ul className="flex flex-col">
          {services.map((service, index) => (
            <li key={service.slug}>
              <WorkCard>
                <div
                  data-practice-row
                  onMouseEnter={() => setActive(index)}
                  className={`border-t border-line py-8 ${
                    index === active
                      ? "opacity-100"
                      : "opacity-80 hover:opacity-100 lg:opacity-55 lg:hover:opacity-100"
                  }`}
                >
                  <button
                    type="button"
                    data-cursor="View"
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    aria-current={index === active ? "true" : undefined}
                    className="block w-full text-left"
                  >
                    <p className="font-mono-label text-ink-soft">
                      {service.index} / {service.stack[0]}
                    </p>
                    <h3 className="mt-3 type-h3">{service.title}</h3>
                    <p className="mt-3 max-w-md text-base leading-relaxed text-ink-soft">
                      {service.problem}
                    </p>
                    {index === active ? null : (
                      <p className="mt-4 font-mono-label text-navy lg:hidden">Open this practice →</p>
                    )}
                  </button>
                  {index === active ? (
                    <div className="mt-6 lg:hidden">
                      <PracticeDetail service={service} compact />
                    </div>
                  ) : null}
                </div>
              </WorkCard>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PracticeDetail({
  service,
  compact = false,
}: {
  service: Service;
  compact?: boolean;
}) {
  return (
    <>
      <p className="font-mono-label text-gold">{service.index}</p>
      <h3 className={`${compact ? "mt-2 type-h3" : "mt-3 type-h2"}`}>{service.title}</h3>
      <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">{service.problem}</p>
      <p className="mt-6 font-mono-label text-ink-soft">What I help with</p>
      <ul className="mt-2 space-y-1 text-sm leading-relaxed text-navy">
        {service.help.slice(0, 4).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="mt-6 font-mono-label text-ink-soft">You leave with</p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.outputs.join(" · ")}</p>
      <p className="mt-3 text-sm text-ink-soft">{service.engagement}</p>
      <div className="mt-6">
        <TrackedMagneticButton
          href={`/contact?intent=${service.intent}`}
          variant="secondary"
          size="sm"
          cursor="Open"
          event="service_clicked"
          payload={{ slug: service.slug, intent: service.intent }}
          className="w-full justify-center sm:w-auto"
        >
          {service.cta}
        </TrackedMagneticButton>
      </div>
    </>
  );
}
