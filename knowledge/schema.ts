import type { Metadata } from "next";
import { site } from "@/lib/site";
import type { KnowledgeArticle } from "@/knowledge";

export function articleCanonical(slug: string) {
  return `${site.url}/knowledge/${slug}`;
}

export function articleMetadata(article: KnowledgeArticle): Metadata {
  const url = articleCanonical(article.slug);
  const image = `${site.url}${article.cover}`;

  return {
    title: article.title,
    description: article.deck,
    alternates: { canonical: `/knowledge/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.deck,
      url,
      siteName: site.name,
      locale: "en_IN",
      images: [{ url: image, alt: article.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.deck,
      images: [image],
    },
  };
}

export function articleJsonLd(article: KnowledgeArticle) {
  const url = articleCanonical(article.slug);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.deck,
    image: `${site.url}${article.cover}`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: article.category,
    timeRequired: `PT${article.readMinutes}M`,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
  };
}

export function knowledgeIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Knowledge",
    description:
      "Field notes on product leadership, systems, AI, teaching, and founder practice.",
    url: `${site.url}/knowledge`,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };
}
