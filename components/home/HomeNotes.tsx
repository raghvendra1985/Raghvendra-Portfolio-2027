import Image from "next/image";
import { TrackedLink } from "@/components/analytics/TrackedCta";
import WorkCard from "@/components/work/WorkCard";
import { knowledgeArticles } from "@/knowledge";

export default function HomeNotes() {
  const [featured, ...rest] = knowledgeArticles.slice(0, 3);

  if (!featured) return null;

  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-12">
      <WorkCard className="bg-paper lg:col-span-7">
        <TrackedLink
          href={`/knowledge/${featured.slug}`}
          data-reveal-item
          data-cursor="Open"
          event="knowledge_article_clicked"
          payload={{ slug: featured.slug }}
          className="group flex h-full flex-col bg-paper"
        >
          <div data-work-cover className="relative aspect-[16/10] overflow-hidden bg-mist">
            <Image
              src={featured.cover}
              alt={featured.coverAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              unoptimized={featured.cover.endsWith(".svg")}
              className={
                featured.coverFit === "contain"
                  ? "object-contain object-center p-8"
                  : "object-cover object-center"
              }
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="font-mono-label text-gold">{featured.category}</p>
              <h3 className="mt-3 font-serif text-[1.65rem] font-normal leading-snug tracking-[-0.02em] sm:text-[1.85rem]">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-[65ch] type-body text-ink">{featured.deck}</p>
            </div>
            <p className="mt-6 font-mono-label text-navy">
              {featured.readMinutes} min read →
            </p>
          </div>
        </TrackedLink>
      </WorkCard>

      <ul className="flex flex-col gap-4 lg:col-span-5">
        {rest.map((article) => (
          <li key={article.slug} className="min-h-[11rem] flex-1">
            <WorkCard className="h-full bg-paper">
              <TrackedLink
                href={`/knowledge/${article.slug}`}
                data-reveal-item
                data-cursor="Open"
                event="knowledge_article_clicked"
                payload={{ slug: article.slug }}
                className="flex h-full min-h-[11rem] overflow-hidden"
              >
                <div
                  data-work-cover
                  className="relative w-[7.5rem] shrink-0 overflow-hidden bg-mist sm:w-40"
                >
                  <Image
                    src={article.cover}
                    alt={article.coverAlt}
                    fill
                    sizes="160px"
                    unoptimized={article.cover.endsWith(".svg")}
                    className={
                      article.coverFit === "contain"
                        ? "object-contain object-center p-3"
                        : "object-cover object-center"
                    }
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <p className="font-mono-label text-gold">{article.category}</p>
                    <h3 className="mt-2 font-serif text-[1.2rem] font-normal leading-snug tracking-[-0.015em] sm:text-[1.35rem]">
                      {article.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 type-body text-ink">{article.deck}</p>
                  </div>
                  <p className="mt-4 font-mono-label text-navy">
                    {article.readMinutes} min read →
                  </p>
                </div>
              </TrackedLink>
            </WorkCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
