"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animateInvertLanes } from "@/animations/practice";
import { TrackedLink } from "@/components/analytics/TrackedCta";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { knowledgeArticles } from "@/knowledge";

export default function HomeNotes() {
  const ref = useRef<HTMLDivElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = animateInvertLanes(root, config);
    return () => ctx.revert();
  }, [config]);

  return (
    <div ref={ref} className="mt-10">
      {knowledgeArticles.slice(0, 3).map((article) => (
        <TrackedLink
          key={article.slug}
          href={`/knowledge/${article.slug}`}
          data-reveal-item
          data-invert-lane
          data-cursor="Open"
          event="knowledge_article_clicked"
          payload={{ slug: article.slug }}
          className="group relative grid gap-4 overflow-hidden border-t border-line px-4 py-6 sm:grid-cols-[1fr_140px] sm:items-center sm:gap-8 sm:px-5"
        >
          <span
            data-invert-fill
            className="pointer-events-none absolute inset-0 bg-navy"
            aria-hidden="true"
          />
          <div className="relative z-[1] flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <span className="type-h3 transition-colors duration-300 motion-safe:md:group-hover:text-mist motion-safe:md:group-focus-visible:text-mist">
              {article.title}
            </span>
            <span className="font-mono-label shrink-0 text-ink-soft transition-colors duration-300 motion-safe:md:group-hover:text-gold motion-safe:md:group-focus-visible:text-gold">
              {article.category}
            </span>
          </div>
          <div className="relative z-[1] h-20 w-36 overflow-hidden sm:h-[88px] sm:w-[140px] sm:justify-self-end">
            <Image
              src={article.cover}
              alt={article.coverAlt}
              fill
              sizes="140px"
              unoptimized={article.cover.endsWith(".svg")}
              className={
                article.coverFit === "contain"
                  ? "object-contain object-left sm:object-right"
                  : "object-cover object-center"
              }
            />
          </div>
        </TrackedLink>
      ))}
    </div>
  );
}
