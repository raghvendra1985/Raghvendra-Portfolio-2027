import type { Metadata } from "next";
import KnowledgeIndex from "@/components/knowledge/KnowledgeIndex";
import {
  featuredPrimaryArticle,
  featuredSecondaryArticle,
  getShelfArticles,
  noteFormatOrder,
  notesSystemLinks,
} from "@/knowledge";
import { knowledgeIndexJsonLd } from "@/knowledge/schema";
import { jsonLdScript, pageMetadataExtras } from "@/lib/seo";

const title = "Notes";
const description =
  "Field notes on designing products, systems and teams—drawn from work, tested in practice.";

export const metadata: Metadata = {
  title,
  description,
  ...pageMetadataExtras({ title, description, path: "/knowledge" }),
};

export default function KnowledgePage() {
  const shelves = noteFormatOrder
    .map((format) => ({
      format,
      articles: getShelfArticles(format),
    }))
    .filter((shelf) => shelf.articles.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(knowledgeIndexJsonLd()) }}
      />
      <KnowledgeIndex
        featuredPrimary={featuredPrimaryArticle}
        featuredSecondary={featuredSecondaryArticle}
        shelves={shelves}
        systemLinks={notesSystemLinks}
      />
    </>
  );
}
