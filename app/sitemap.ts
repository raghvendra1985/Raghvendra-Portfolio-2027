import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { flagshipStudies } from "@/case-studies";
import { knowledgeArticles } from "@/knowledge";
import { visibleProducts } from "@/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/work",
    "/system",
    "/studio",
    "/teaching",
    "/knowledge",
    "/products",
    "/contact",
  ].map((path) => ({
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

  const productRoutes = visibleProducts().map((product) => ({
    url: `${site.url}/products/${product.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...work, ...notes, ...productRoutes];
}
