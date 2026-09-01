"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animateSystem } from "@/animations/system";
import { useExperience } from "@/components/providers/ExperienceProvider";
import OSModule from "@/components/system/OSModule";
import FocusCard from "@/components/system/FocusCard";
import ExperimentCard from "@/components/system/ExperimentCard";
import DecisionLog from "@/components/system/DecisionLog";
import Roadmap from "@/components/system/Roadmap";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { osModules, type FounderOs } from "@/founder-os";
import { pageMarks, systemMarks } from "@/visual-language/marks";

export default function SystemView({ data }: { data: FounderOs }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { config } = useExperience();
  const [active, setActive] = useState(0);
  const current = osModules[active] ?? osModules[0];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateSystem(root, config, { onIndex: setActive });
    return () => ctx.revert();
  }, [config]);

  return (
    <div ref={rootRef}>
      <div
        data-os-index
        className="sticky top-[4.5rem] z-20 border-b border-line bg-mist/90 px-[var(--page-pad)] py-3"
      >
        <p className="mx-auto max-w-[1440px] font-mono-label text-ink-soft" aria-live="polite">
          <span className="text-gold">{current.index}</span>
          <span> / {current.title}</span>
        </p>
      </div>

      <header className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-16 pt-16 sm:pt-24">
        <div className="flex items-center gap-4" data-os-item>
          <SystemObjectMark
            src={pageMarks.system.src}
            motion={pageMarks.system.motion}
            surface={pageMarks.system.surface}
          />
          <p className="font-mono-label text-ink-soft">
            {data.identity.name}
          </p>
        </div>
        <p className="mt-4 font-mono-label text-green" data-os-item>
          {data.identity.positioning}
        </p>
        <h1 className="mt-8 max-w-4xl type-h1 text-navy" data-os-item>
          {data.identity.deck}
        </h1>
      </header>

      <div id="os-main" className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
        <OSModule
          id="dashboard"
          index="01"
          title="Dashboard"
          current={current.id === "dashboard"}
          mark={systemMarks.dashboard}
        >
          <p className="max-w-xl text-base leading-relaxed text-ink-soft" data-os-item>
            Ways into the operating system. Not widgets — a table of contents for how the practice runs.
          </p>
          <ol className="mt-10">
            {data.dashboard.map((item, index) => (
              <li key={item.id} data-os-item>
                <a
                  href={`#${item.id}`}
                  className="grid gap-3 border-t border-line py-8 md:grid-cols-[80px_minmax(0,1fr)]"
                >
                  <p className="font-mono-label text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="type-h3">{item.label}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                      {item.summary}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </OSModule>

        <OSModule
          id="focus"
          index="02"
          title="Current Focus"
          current={current.id === "focus"}
          mark={systemMarks.focus}
        >
          {data.focus.map((item) => (
            <FocusCard key={item.name} item={item} />
          ))}
        </OSModule>

        <OSModule
          id="practice"
          index="03"
          title="Method to evidence"
          current={current.id === "practice"}
          mark={systemMarks.practice}
        >
          <p className="max-w-xl text-base leading-relaxed text-ink-soft" data-os-item>
            The same contribution groups as Work. Method first — then one or two published examples.
          </p>
          <ul className="mt-10">
            {data.practiceMap.map((row) => (
              <li
                key={row.group}
                data-os-item
                className="grid gap-4 border-t border-line py-10 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]"
              >
                <h3 className="type-h3 text-navy">{row.group}</h3>
                <div>
                  <p className="max-w-2xl text-base leading-relaxed text-ink-soft">{row.method}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {row.examples.map((example) => (
                      <li key={example.href}>
                        <Link
                          href={example.href}
                          data-cursor="View"
                          className="font-mono-label text-green underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                        >
                          {example.label} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </OSModule>

        <OSModule
          id="products"
          index="04"
          title="Products as practice"
          current={current.id === "products"}
          mark={systemMarks.products}
        >
          <p className="mb-8 max-w-xl text-base leading-relaxed text-ink-soft" data-os-item>
            Small products are where the operating system meets real constraints—users, scope, trust, and
            shipping.
          </p>
          <ul>
            {data.products.map((product) => (
              <li key={product.name} data-os-item className="border-t border-line py-10">
                {product.href ? (
                  <Link href={product.href} data-cursor="View" className="block">
                    <p className="font-mono-label text-ink-soft">{product.tests}</p>
                    <h3 className="mt-3 type-h3">{product.name}</h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                      {product.summary}
                    </p>
                    <p className="mt-6 font-mono-label text-green">Open published evidence →</p>
                  </Link>
                ) : (
                  <article>
                    <p className="font-mono-label text-ink-soft">{product.tests}</p>
                    <h3 className="mt-3 type-h3">{product.name}</h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                      {product.summary}
                    </p>
                  </article>
                )}
              </li>
            ))}
          </ul>
        </OSModule>

        <OSModule
          id="principles"
          index="05"
          title="Operating Principles"
          current={current.id === "principles"}
          mark={systemMarks.principles}
        >
          <ol>
            {data.principles.map((principle, index) => (
              <li
                key={principle.title}
                data-os-item
                className="grid gap-4 border-t border-line py-10 md:grid-cols-[80px_minmax(0,720px)]"
              >
                <span className="font-mono-label text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="type-h3">{principle.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </OSModule>

        <OSModule
          id="decisions"
          index="06"
          title="Decision Log"
          current={current.id === "decisions"}
          mark={systemMarks.decisions}
        >
          <p className="mb-8 max-w-xl text-base leading-relaxed text-ink-soft" data-os-item>
            Process and trade-offs. No invented results — only what the work taught.
          </p>
          <DecisionLog entries={data.decisions} />
        </OSModule>

        <OSModule
          id="experiments"
          index="07"
          title="Experiments"
          current={current.id === "experiments"}
          mark={systemMarks.experiments}
        >
          {data.experiments.map((item) => (
            <ExperimentCard key={item.id} item={item} />
          ))}
        </OSModule>

        <OSModule
          id="knowledge"
          index="08"
          title="Writing and field notes"
          current={current.id === "knowledge"}
          mark={systemMarks.knowledge}
        >
          <div data-os-item className="border-t border-line py-10">
            <p className="max-w-xl text-base leading-relaxed text-ink-soft">{data.writing.intro}</p>
            <Link
              href={data.writing.href}
              data-cursor="Open"
              className="mt-8 inline-block font-mono-label text-green underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {data.writing.cta}
            </Link>
          </div>
        </OSModule>

        <OSModule
          id="teaching"
          index="09"
          title="Teaching"
          current={current.id === "teaching"}
          mark={systemMarks.teaching}
        >
          {data.teaching.map((item) => (
            <article key={item.title} data-os-item className="border-t border-line py-10">
              <p className="font-mono-label text-ink-soft">{item.context}</p>
              <h3 className="mt-3 type-h3">{item.title}</h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">{item.body}</p>
            </article>
          ))}
        </OSModule>

        <OSModule
          id="roadmap"
          index="10"
          title="Roadmap"
          current={current.id === "roadmap"}
          mark={systemMarks.roadmap}
        >
          <Roadmap roadmap={data.roadmap} />
        </OSModule>

        <OSModule
          id="archive"
          index="11"
          title="Archive"
          current={current.id === "archive"}
          mark={systemMarks.archive}
        >
          {data.archive.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-os-item
              data-cursor="Open"
              className="block border-t border-line py-8"
            >
              <h3 className="type-h3">{item.label}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{item.body}</p>
              <p className="mt-4 font-mono-label text-green">Open →</p>
            </Link>
          ))}
        </OSModule>
      </div>
    </div>
  );
}
