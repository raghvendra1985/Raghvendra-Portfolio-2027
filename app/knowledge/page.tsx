import type { Metadata } from "next";
import KnowledgeIndex from "@/components/knowledge/KnowledgeIndex";
import {
  featuredArticle,
  founderOsLinks,
  knowledgeArticles,
  knowledgeFrameworks,
} from "@/knowledge";
import { knowledgeIndexJsonLd } from "@/knowledge/schema";
import { jsonLdScript, pageMetadataExtras } from "@/lib/seo";

const title = "Knowledge";
const description =
  "Field notes on product leadership, systems, AI, teaching, and founder practice.";

export const metadata: Metadata = {
  title,
  description,
  ...pageMetadataExtras({ title, description, path: "/knowledge" }),
};

export default function KnowledgePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(knowledgeIndexJsonLd()) }}
      />
      <KnowledgeIndex
        articles={knowledgeArticles}
        featured={featuredArticle}
        frameworks={knowledgeFrameworks}
        osLinks={founderOsLinks}
      />
    </>
  );
}
