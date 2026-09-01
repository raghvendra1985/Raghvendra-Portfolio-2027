"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animateHero } from "@/animations/hero";
import { animateKnowledgeIndex } from "@/animations/knowledge";
import { useExperience } from "@/components/providers/ExperienceProvider";
import ImageReveal from "@/components/reveal/ImageReveal";
import MagneticButton from "@/components/buttons/MagneticButton";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { track } from "@/lib/analytics";
import { noteFormatMarks, pageMarks } from "@/visual-language/marks";
import {
  formatNoteMeta,
  noteFormatLabels,
  noteFormatOrder,
  type KnowledgeArticle,
  type NoteFormat,
} from "@/knowledge";

type SystemLink = {
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
      onClick={() => track("knowledge_article_clicked", { slug: article.slug })}
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
        <p className="font-mono-label text-gold">{formatNoteMeta(article)}</p>
        <h3 className="mt-3 type-h3">{article.title}</h3>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">{article.deck}</p>
        <p className="mt-5 font-mono-label text-green">Read note →</p>
      </div>
    </Link>
  );
}

function FormatShelf({
  format,
  articles,
}: {
  format: NoteFormat;
  articles: KnowledgeArticle[];
}) {
  if (!articles.length) return null;

  const headingId = `notes-${format}`;

  return (
    <section aria-labelledby={headingId} className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20">
      <h2 id={headingId} className="flex items-center gap-4 font-mono-label text-ink-soft" data-knowledge-item>
        <SystemObjectMark
          src={noteFormatMarks[format].src}
          motion={noteFormatMarks[format].motion}
          surface={noteFormatMarks[format].surface}
          size="sm"
        />
        {noteFormatLabels[format]}
      </h2>
      <div className="mt-2">
        {articles.map((article) => (
          <ArticleRow key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

export default function KnowledgeIndex({
  featuredPrimary,
  featuredSecondary,
  shelves,
  systemLinks,
}: {
  featuredPrimary: KnowledgeArticle;
  featuredSecondary?: KnowledgeArticle;
  shelves: Array<{ format: NoteFormat; articles: KnowledgeArticle[] }>;
  systemLinks: readonly SystemLink[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { config, pageReady } = useExperience();

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

  return (
    <div ref={rootRef}>
      <header className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-16 pt-32 sm:pt-40">
        <div className="flex items-center gap-4">
          <span data-hero-visual>
            <SystemObjectMark
              src={pageMarks.notes.src}
              motion={pageMarks.notes.motion}
              surface={pageMarks.notes.surface}
            />
          </span>
          <p data-hero-copy className="font-mono-label text-ink-soft">
            04 / Notes
          </p>
        </div>
        <h1 data-hero-headline className="mt-6 max-w-5xl type-h1 text-navy">
          Notes
        </h1>
        <p
          data-hero-copy
          className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
        >
          Field notes on designing products, systems and teams—drawn from work, tested in practice.
        </p>
      </header>

      <section
        aria-labelledby="featured-note"
        className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-20"
      >
        <p className="font-mono-label text-gold" data-knowledge-item>
          Featured
        </p>
        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div data-knowledge-item>
            <p className="font-mono-label text-ink-soft">{formatNoteMeta(featuredPrimary)}</p>
            <h2 id="featured-note" className="mt-4 type-h2">
              {featuredPrimary.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
              {featuredPrimary.deck}
            </p>
            <div className="mt-8">
              <MagneticButton
                href={`/knowledge/${featuredPrimary.slug}`}
                cursor="Open"
                onClick={() =>
                  track("knowledge_article_clicked", { slug: featuredPrimary.slug })
                }
              >
                Read the note
              </MagneticButton>
            </div>
          </div>
          <Link
            href={`/knowledge/${featuredPrimary.slug}`}
            data-cursor="Open"
            data-knowledge-item
            onClick={() => track("knowledge_article_clicked", { slug: featuredPrimary.slug })}
          >
            <ImageReveal
              className="aspect-[16/10] bg-navy"
              src={featuredPrimary.cover}
              alt={featuredPrimary.coverAlt}
              objectFit={featuredPrimary.coverFit}
              parallax={0}
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Link>
        </div>

        {featuredSecondary ? (
          <Link
            href={`/knowledge/${featuredSecondary.slug}`}
            data-cursor="Open"
            data-knowledge-item
            onClick={() =>
              track("knowledge_article_clicked", { slug: featuredSecondary.slug })
            }
            className="mt-12 grid items-start gap-6 border-t border-line pt-10 md:grid-cols-[minmax(0,200px)_minmax(0,1fr)] md:gap-10"
          >
            <ImageReveal
              className="aspect-[16/10] bg-navy"
              src={featuredSecondary.cover}
              alt={featuredSecondary.coverAlt}
              objectFit={featuredSecondary.coverFit}
              parallax={0}
              sizes="(min-width: 768px) 200px, 100vw"
            />
            <div>
              <p className="font-mono-label text-gold">Also useful</p>
              <p className="mt-3 font-mono-label text-ink-soft">
                {formatNoteMeta(featuredSecondary)}
              </p>
              <h3 className="mt-3 type-h3">{featuredSecondary.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                {featuredSecondary.deck}
              </p>
              <p className="mt-5 font-mono-label text-green">Read note →</p>
            </div>
          </Link>
        ) : null}
      </section>

      {noteFormatOrder.map((format) => {
        const shelf = shelves.find((item) => item.format === format);
        if (!shelf) return null;
        return <FormatShelf key={format} format={format} articles={shelf.articles} />;
      })}

      <section
        aria-labelledby="notes-system"
        className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-24"
      >
        <p className="font-mono-label text-gold" data-knowledge-item>
          Continue with System
        </p>
        <h2 id="notes-system" className="mt-4 max-w-3xl type-h2" data-knowledge-item>
          Methods and decisions live on System.
        </h2>
        <ul className="mt-12">
          {systemLinks.map((link) => (
            <li key={link.href} data-knowledge-item>
              <Link
                href={link.href}
                data-cursor="Open"
                className="grid gap-3 border-t border-line py-8 md:grid-cols-[minmax(0,1fr)_auto]"
              >
                <div>
                  <h3 className="type-h3">{link.label}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{link.note}</p>
                </div>
                <p className="font-mono-label text-green md:self-end">Open →</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
