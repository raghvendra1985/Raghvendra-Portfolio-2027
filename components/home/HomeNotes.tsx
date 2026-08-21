"use client";

import Image from "next/image";
import { TrackedLink } from "@/components/analytics/TrackedCta";
import WorkCard from "@/components/work/WorkCard";
import { knowledgeArticles } from "@/knowledge";

export default function HomeNotes() {
  return (
    <div className="mt-10">
      {knowledgeArticles.slice(0, 3).map((article) => (
        <WorkCard key={article.slug}>
          <TrackedLink
            href={`/knowledge/${article.slug}`}
            data-reveal-item
            data-cursor="Open"
            event="knowledge_article_clicked"
            payload={{ slug: article.slug }}
            className="grid gap-4 border-t border-line py-6 sm:grid-cols-[1fr_140px] sm:items-center sm:gap-8"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <span className="type-h3">{article.title}</span>
              <span className="font-mono-label shrink-0 text-ink-soft">{article.category}</span>
            </div>
            <div
              data-work-cover
              className="relative h-20 w-36 overflow-hidden sm:h-[88px] sm:w-[140px] sm:justify-self-end"
            >
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
        </WorkCard>
      ))}
    </div>
  );
}
