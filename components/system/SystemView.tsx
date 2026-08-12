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
import KnowledgeLink from "@/components/system/KnowledgeLink";
import { osModules, type FounderOs } from "@/founder-os";

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
        <p className="mx-auto max-w-[1440px] font-mono-label text-[11px] text-ink-soft" aria-live="polite">
          <span className="text-gold">{current.index}</span>
          <span> / {current.title}</span>
        </p>
      </div>

      <header className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-16 pt-16 sm:pt-24">
        <p className="font-mono-label text-[11px] text-ink-soft" data-os-item>
          {data.identity.name}
        </p>
        <p className="mt-4 font-mono-label text-[11px] text-green" data-os-item>
          {data.identity.positioning}
        </p>
        <h1
          className="mt-8 max-w-4xl font-display text-4xl leading-[1.05] text-navy sm:text-6xl"
          data-os-item
        >
          {data.identity.deck}
        </h1>
      </header>

      <div id="os-main" className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
        <OSModule
          id="dashboard"
          index="01"
          title="Dashboard"
          current={current.id === "dashboard"}
        >
          <p className="max-w-xl text-base leading-relaxed text-ink-soft" data-os-item>
            Six ways into the operating system. Not widgets — a table of contents.
          </p>
          <ol className="mt-10">
            {data.dashboard.map((item, index) => (
              <li key={item.id} data-os-item>
                <a
                  href={`#${item.id}`}
                  className="grid gap-3 border-t border-line py-8 md:grid-cols-[80px_minmax(0,1fr)]"
                >
                  <p className="font-mono-label text-[11px] text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <p className="font-display text-2xl sm:text-3xl">{item.label}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                      {item.summary}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </OSModule>

        <OSModule id="focus" index="02" title="Current Focus" current={current.id === "focus"}>
          {data.focus.map((item) => (
            <FocusCard key={item.name} item={item} />
          ))}
        </OSModule>

        <OSModule id="products" index="03" title="Products" current={current.id === "products"}>
          <ul>
            {data.products.map((product) => (
              <li key={product.name} data-os-item className="border-t border-line py-10">
                {product.href ? (
                  <Link href={product.href} data-cursor="View" className="block">
                    <p className="font-mono-label text-[11px] text-ink-soft">{product.kind}</p>
                    <h3 className="mt-3 font-display text-2xl sm:text-4xl">{product.name}</h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
                      {product.summary}
                    </p>
                    <p className="mt-6 font-mono-label text-[11px] text-green">Read case study →</p>
                  </Link>
                ) : (
                  <article>
                    <p className="font-mono-label text-[11px] text-ink-soft">{product.kind}</p>
                    <h3 className="mt-3 font-display text-2xl sm:text-4xl">{product.name}</h3>
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
          index="04"
          title="Operating Principles"
          current={current.id === "principles"}
        >
          <ol>
            {data.principles.map((principle, index) => (
              <li
                key={principle.title}
                data-os-item
                className="grid gap-4 border-t border-line py-10 md:grid-cols-[80px_minmax(0,720px)]"
              >
                <span className="font-mono-label text-[11px] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl">{principle.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </OSModule>

        <OSModule
          id="decisions"
          index="05"
          title="Decision Log"
          current={current.id === "decisions"}
        >
          <p className="mb-8 max-w-xl text-base leading-relaxed text-ink-soft" data-os-item>
            Process and trade-offs. No invented results — only what the work taught.
          </p>
          <DecisionLog entries={data.decisions} />
        </OSModule>

        <OSModule
          id="experiments"
          index="06"
          title="Experiments"
          current={current.id === "experiments"}
        >
          {data.experiments.map((item) => (
            <ExperimentCard key={item.id} item={item} />
          ))}
        </OSModule>

        <OSModule id="knowledge" index="07" title="Knowledge" current={current.id === "knowledge"}>
          {data.knowledge.map((item) => (
            <KnowledgeLink key={item.slug} item={item} />
          ))}
        </OSModule>

        <OSModule id="teaching" index="08" title="Teaching" current={current.id === "teaching"}>
          {data.teaching.map((item) => (
            <article key={item.title} data-os-item className="border-t border-line py-10">
              <p className="font-mono-label text-[11px] text-ink-soft">{item.context}</p>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl">{item.title}</h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">{item.body}</p>
            </article>
          ))}
        </OSModule>

        <OSModule id="roadmap" index="09" title="Roadmap" current={current.id === "roadmap"}>
          <Roadmap roadmap={data.roadmap} />
        </OSModule>

        <OSModule id="archive" index="10" title="Archive" current={current.id === "archive"}>
          {data.archive.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-os-item
              data-cursor="Open"
              className="block border-t border-line py-8"
            >
              <h3 className="font-display text-2xl">{item.label}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{item.body}</p>
              <p className="mt-4 font-mono-label text-[11px] text-green">Open →</p>
            </Link>
          ))}
        </OSModule>
      </div>
    </div>
  );
}
