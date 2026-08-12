import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleView from "@/components/knowledge/ArticleView";
import {
  getArticle,
  getFramework,
  getNextArticle,
  getPreviousArticle,
  getRelatedArticles,
  knowledgeArticles,
} from "@/knowledge";
import { articleJsonLd, articleMetadata } from "@/knowledge/schema";
import { jsonLdScript } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return knowledgeArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return articleMetadata(article);
}

export default async function KnowledgeArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const previous = getPreviousArticle(slug);
  const next = getNextArticle(slug);
  const related = getRelatedArticles(article);
  const framework = article.framework ? getFramework(article.framework) : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd(article)) }}
      />
      <ArticleView
        article={article}
        previous={previous}
        next={next}
        related={related}
        framework={framework}
      />
    </>
  );
}
