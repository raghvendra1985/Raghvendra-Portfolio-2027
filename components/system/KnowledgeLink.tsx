import Link from "next/link";
import { getArticle } from "@/knowledge";
import type { KnowledgeLinkItem } from "@/founder-os";

export default function KnowledgeLink({ item }: { item: KnowledgeLinkItem }) {
  const article = getArticle(item.slug);
  if (!article) return null;

  return (
    <Link
      href={`/knowledge/${article.slug}`}
      data-os-item
      data-cursor="Open"
      className="grid gap-3 border-t border-line py-8 md:grid-cols-[80px_1fr]"
    >
      <p className="font-mono-label text-ink-soft">{article.index}</p>
      <div>
        <h3 className="type-h3">{article.title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{item.note}</p>
        <p className="mt-4 font-mono-label text-green">Read note →</p>
      </div>
    </Link>
  );
}
