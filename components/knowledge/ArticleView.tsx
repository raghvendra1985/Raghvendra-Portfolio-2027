"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animateHero } from "@/animations/hero";
import { animateKnowledgeArticle } from "@/animations/knowledge";
import { useExperience } from "@/components/providers/ExperienceProvider";
import ImageReveal from "@/components/reveal/ImageReveal";
import MagneticButton from "@/components/buttons/MagneticButton";
import ArticleToc from "@/components/knowledge/ArticleToc";
import FrameworkBlock from "@/components/knowledge/FrameworkBlock";
import HonestNote from "@/components/knowledge/HonestNote";
import Takeaway from "@/components/knowledge/Takeaway";
import RelatedReading from "@/components/knowledge/RelatedReading";
import { formatNoteMeta, type KnowledgeArticle, type KnowledgeFramework } from "@/knowledge";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { noteFormatMarks } from "@/visual-language/marks";

export default function ArticleView({
  article,
  previous,
  next,
  related,
  framework,
}: {
  article: KnowledgeArticle;
  previous: KnowledgeArticle;
  next: KnowledgeArticle;
  related: KnowledgeArticle[];
  framework?: KnowledgeFramework;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const { config, pageReady } = useExperience();
  const [activeId, setActiveId] = useState(article.sections[0]?.id);

  useEffect(() => {
    setActiveId(article.sections[0]?.id);
  }, [article.slug, article.sections]);

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
  }, [config, pageReady, article.slug]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateKnowledgeArticle(root, config, { onSection: setActiveId });
    return () => ctx.revert();
  }, [config, article.slug]);

  return (
    <article ref={rootRef}>
      <header className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-10 pt-32 sm:pt-40">
        <Link href="/knowledge" className="font-mono-label text-ink-soft">
          ← Notes
        </Link>
        <div data-hero-copy className="mt-8 flex items-center gap-4">
          <SystemObjectMark
            src={noteFormatMarks[article.format].src}
            motion={noteFormatMarks[article.format].motion}
            surface={noteFormatMarks[article.format].surface}
            size="sm"
          />
          <p className="font-mono-label text-gold">
            {formatNoteMeta(article)}
          </p>
        </div>
        <h1 data-hero-headline className="mt-6 max-w-5xl type-h1">
          {article.title}
        </h1>
        <p data-hero-copy className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          {article.deck}
        </p>
        {article.systemLink || article.workLink ? (
          <p data-hero-copy className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono-label text-ink-soft">
            {article.systemLink ? (
              <Link href={article.systemLink.href} className="text-green hover:text-navy">
                System · {article.systemLink.label} →
              </Link>
            ) : null}
            {article.workLink ? (
              <Link href={article.workLink.href} className="text-green hover:text-navy">
                Work · {article.workLink.label} →
              </Link>
            ) : null}
          </p>
        ) : null}
      </header>

      <div className="mx-auto max-w-[1440px] px-[var(--page-pad)]">
        <ImageReveal
          className="aspect-[16/10] bg-navy sm:aspect-[2/1]"
          src={article.cover}
          alt={article.coverAlt}
          objectFit={article.coverFit}
          parallax={0}
          priority
          sizes="100vw"
        />
      </div>

      <ArticleToc sections={article.sections} activeId={activeId} variant="mobile" />

      <div className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24 pt-12 lg:pt-20">
        <div className="grid gap-16 lg:grid-cols-[220px_minmax(0,720px)] lg:gap-20">
          <div className="hidden lg:block">
            <ArticleToc sections={article.sections} activeId={activeId} variant="desktop" />
          </div>

          <div className="space-y-20">
            {article.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                data-article-section
                data-article-block
                className="scroll-mt-28"
              >
                <p className="font-mono-label text-green">{section.kicker}</p>
                <h2 className="mt-3 type-h3">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 max-w-[65ch] text-base leading-relaxed text-ink">
                    {paragraph}
                  </p>
                ))}
                {section.pullquote ? (
                  <blockquote className="mt-8 border-l-2 border-gold pl-6 type-h3">
                    {section.pullquote}
                  </blockquote>
                ) : null}
                {section.figure ? (
                  <figure className="mt-10">
                    <ImageReveal
                      className="aspect-[16/9] bg-mist"
                      src={section.figure.src}
                      alt={section.figure.alt}
                      objectFit={section.figure.fit}
                      parallax={0}
                      sizes="(min-width: 1024px) 720px, 100vw"
                    />
                  </figure>
                ) : null}
                {section.list ? (
                  <ol className="mt-6 list-decimal space-y-2 pl-5 text-base leading-relaxed">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                ) : null}
                {section.honestNote ? <HonestNote>{section.honestNote}</HonestNote> : null}
              </section>
            ))}

            {framework ? (
              <div data-article-block>
                <FrameworkBlock framework={framework} />
              </div>
            ) : null}

            <div data-article-block>
              <Takeaway>{article.takeaway}</Takeaway>
            </div>

            <RelatedReading articles={related} />
          </div>
        </div>

        <nav
          aria-label="Previous and next notes"
          className="mt-24 grid gap-10 border-t border-line pt-10 sm:grid-cols-2"
        >
          <Link
            href={`/knowledge/${previous.slug}`}
            data-related-item
            data-cursor="Open"
            className="block"
          >
            <p className="font-mono-label text-ink-soft">Previous</p>
            <p className="mt-3 max-w-md type-h3">{previous.title}</p>
          </Link>
          <div data-related-item className="sm:text-right">
            <Link href={`/knowledge/${next.slug}`} data-cursor="Open" className="block">
              <p className="font-mono-label text-ink-soft">Next</p>
              <p className="mt-3 max-w-md type-h3 sm:ml-auto">{next.title}</p>
            </Link>
            <div className="mt-6 sm:flex sm:justify-end">
              <MagneticButton href={`/knowledge/${next.slug}`} cursor="Next">
                Next note
              </MagneticButton>
            </div>
          </div>
        </nav>
      </div>
    </article>
  );
}
