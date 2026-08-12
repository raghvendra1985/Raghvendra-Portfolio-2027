import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { flagshipStudies } from "@/case-studies";
import { knowledgeArticles } from "@/knowledge";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/about", "/work", "/system", "/knowledge", "/contact"].map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: now,
  }));

  const work = flagshipStudies.map((study) => ({
    url: `${site.url}/work/${study.slug}`,
    lastModified: now,
  }));

  const notes = knowledgeArticles.map((article) => ({
    url: `${site.url}/knowledge/${article.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...work, ...notes];
}
