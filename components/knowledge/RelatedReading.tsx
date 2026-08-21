import Link from "next/link";
import type { KnowledgeArticle } from "@/knowledge";

export default function RelatedReading({ articles }: { articles: KnowledgeArticle[] }) {
  if (!articles.length) return null;

  return (
    <nav aria-label="Related reading" className="border-t border-line pt-12">
      <h2 className="font-mono-label text-ink-soft">Related reading</h2>
      <ul className="mt-8">
        {articles.map((article) => (
          <li key={article.slug} data-related-item>
            <Link
              href={`/knowledge/${article.slug}`}
              data-cursor="Open"
              className="grid gap-3 border-t border-line py-8 md:grid-cols-[120px_minmax(0,1fr)]"
            >
              <p className="font-mono-label text-gold">{article.category}</p>
              <div>
                <p className="type-h3">{article.title}</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">{article.deck}</p>
                <p className="mt-4 font-mono-label text-green">Read note →</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
