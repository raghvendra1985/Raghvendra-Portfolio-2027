import { site } from "@/lib/site";

/** Safe JSON-LD for script tags — escapes closing tags. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: "Product Design Leader",
    description: site.description,
    sameAs: [site.linkedin, site.whatsapp],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Faridabad",
      addressCountry: "IN",
    },
  };
}

export function pageMetadataExtras({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const images = image
    ? [{ url: image.startsWith("http") ? image : `${site.url}${image}` }]
    : undefined;

  return {
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type: "website" as const,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: images ? ("summary_large_image" as const) : ("summary" as const),
      title,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}
