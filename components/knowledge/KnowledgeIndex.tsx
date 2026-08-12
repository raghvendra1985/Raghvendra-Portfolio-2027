"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { animateHero } from "@/animations/hero";
import { animateKnowledgeIndex, refreshKnowledgeIndexItems } from "@/animations/knowledge";
import { useExperience } from "@/components/providers/ExperienceProvider";
import ImageReveal from "@/components/reveal/ImageReveal";
import MagneticButton from "@/components/buttons/MagneticButton";
import {
  getFrameworkArticle,
  knowledgeCategories,
  type KnowledgeArticle,
  type KnowledgeCategory,
  type KnowledgeFramework,
} from "@/knowledge";

type OsLink = {
  href: string;
  label: string;
  note: string;
};

function ArticleRow({ article }: { article: KnowledgeArticle }) {
  return (
    <Link
      href={`/knowledge/${article.slug}`}
      data-knowledge-item
      data-cursor="Open"
      className="grid items-start gap-6 border-t border-line py-10 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-10"
    >
      <ImageReveal
        className="aspect-[16/10] bg-navy"
        src={article.cover}
        alt={article.coverAlt}
        objectFit={article.coverFit}
        parallax={0}
        sizes="(min-width: 768px) 280px, 100vw"
      />
      <div>
        <p className="font-mono-label text-[11px] text-gold">
          {article.category} · {article.readMinutes} min
        </p>
        <h3 className="mt-3 font-display text-2xl leading-[1.08] sm:text-3xl">{article.title}</h3>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">{article.deck}</p>
        <p className="mt-5 font-mono-label text-[11px] text-green">Read note →</p>
      </div>
    </Link>
  );
}

export default function KnowledgeIndex({
  articles,
  featured,
  frameworks,
  osLinks,
}: {
  articles: KnowledgeArticle[];
  featured: KnowledgeArticle;
  frameworks: KnowledgeFramework[];
  osLinks: readonly OsLink[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { config, pageReady } = useExperience();
  const [filter, setFilter] = useState<"All" | KnowledgeCategory>("All");

  const showFeatured = filter === "All" || featured.category === filter;

  const list = useMemo(() => {
    const pool =
      filter === "All" ? articles : articles.filter((article) => article.category === filter);
    return showFeatured ? pool.filter((article) => article.slug !== featured.slug) : pool;
  }, [articles, featured.slug, filter, showFeatured]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !pageReady) return;
    let cancelled = false;
    let heroCtx: { revert: () => void } | undefined;

    animateHero(root, config).then((ctx) => {
      if (cancelled) {
        ctx.revert();
        return;
      }
      heroCtx = ctx;
    });

    return () => {
      cancelled = true;
      heroCtx?.revert();
    };
  }, [config, pageReady]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateKnowledgeIndex(root, config);
    return () => ctx.revert();
  }, [config]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    refreshKnowledgeIndexItems(root, config);
  }, [filter, config]);

  return (
    <div ref={rootRef}>
      <header className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-16 pt-32 sm:pt-40">
        <p data-hero-copy className="font-mono-label text-[11px] text-ink-soft">
          04 / Knowledge
        </p>
        <h1
          data-hero-headline
          className="mt-6 max-w-5xl font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.94] text-navy"
        >
          Ideas made useful.
        </h1>
        <p
          data-hero-copy
          className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          Notes from building products, leading teams, teaching design, and building companies. No
          recycled advice. Only ideas tested through real work.
        </p>
      </header>

      {showFeatured ? (
        <section
          aria-labelledby="featured-note"
          className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20"
        >
          <p className="font-mono-label text-[11px] text-gold" data-knowledge-item>
            Featured
          </p>
          <div className="mt-6 grid items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div data-knowledge-item>
              <p className="font-mono-label text-[11px] text-ink-soft">
                {featured.category} · {featured.readMinutes} min
              </p>
              <h2 id="featured-note" className="mt-4 font-display text-3xl leading-[1.05] sm:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">{featured.deck}</p>
              <div className="mt-8">
                <MagneticButton href={`/knowledge/${featured.slug}`} cursor="Open">
                  Read the note
                </MagneticButton>
              </div>
            </div>
            <Link href={`/knowledge/${featured.slug}`} data-cursor="Open" data-knowledge-item>
              <ImageReveal
                className="aspect-[16/10] bg-navy"
                src={featured.cover}
                alt={featured.coverAlt}
                objectFit={featured.coverFit}
                parallax={0}
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </Link>
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="knowledge-notes"
        className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24"
      >
        <div
          className="flex flex-wrap gap-2"
          role="toolbar"
          aria-label="Filter knowledge notes"
        >
          {knowledgeCategories.map((category) => {
            const pressed = filter === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFilter(category)}
                className={`border px-4 py-2 font-mono-label text-[11px] ${
                  pressed
                    ? "border-navy bg-navy text-mist"
                    : "border-line text-ink-soft hover:border-navy hover:text-navy"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <h2 id="knowledge-notes" className="mt-12 font-mono-label text-[11px] text-ink-soft">
          {filter === "All" ? "All notes" : filter}
        </h2>

        <div className="mt-2">
          {list.length ? (
            list.map((article) => (
              <ArticleRow key={article.slug} article={article} />
            ))
          ) : (
            <p className="border-t border-line py-8 text-sm text-ink-soft" role="status">
              No notes in this category yet.
            </p>
          )}
        </div>
      </section>

      <section
        aria-labelledby="knowledge-frameworks"
        className="border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-label text-[11px] text-gold" data-knowledge-item>
            Frameworks
          </p>
          <h2
            id="knowledge-frameworks"
            className="mt-4 max-w-3xl font-display text-3xl leading-[1.05] sm:text-5xl"
            data-knowledge-item
          >
            Methods I actually use in the room.
          </h2>
          <ol className="mt-12">
            {frameworks.map((framework, index) => {
              const article = getFrameworkArticle(framework.id);
              return (
                <li key={framework.id} data-knowledge-item>
                  {article ? (
                    <Link
                      href={`/knowledge/${article.slug}`}
                      data-cursor="Open"
                      className="grid gap-4 border-t border-line py-10 md:grid-cols-[80px_minmax(0,1fr)_200px]"
                    >
                      <p className="font-mono-label text-[11px] text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl">{framework.title}</h3>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                          {framework.deck}
                        </p>
                      </div>
                      <p className="font-mono-label text-[11px] text-green md:self-end md:text-right">
                        Read in the note →
                      </p>
                    </Link>
                  ) : (
                    <div className="grid gap-4 border-t border-line py-10 md:grid-cols-[80px_minmax(0,1fr)]">
                      <p className="font-mono-label text-[11px] text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl">{framework.title}</h3>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                          {framework.deck}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="knowledge-os"
        className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-24"
      >
        <p className="font-mono-label text-[11px] text-gold" data-knowledge-item>
          Founder OS
        </p>
        <h2
          id="knowledge-os"
          className="mt-4 max-w-3xl font-display text-3xl leading-[1.05] sm:text-5xl"
          data-knowledge-item
        >
          The notes sit inside the operating system.
        </h2>
        <ul className="mt-12">
          {osLinks.map((link) => (
            <li key={link.href} data-knowledge-item>
              <Link
                href={link.href}
                data-cursor="Open"
                className="grid gap-3 border-t border-line py-8 md:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div>
                  <h3 className="font-display text-2xl">{link.label}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{link.note}</p>
                </div>
                <p className="font-mono-label text-[11px] text-green md:self-end">Open →</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
