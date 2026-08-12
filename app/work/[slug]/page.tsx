import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/work/CaseStudyView";
import { flagshipStudies, getCaseStudy, getNextCaseStudy } from "@/case-studies";
import { pageMetadataExtras } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return flagshipStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  const title = `${study.client} — ${study.title}`;
  const description = study.summary;
  const path = `/work/${study.slug}`;
  const extras = pageMetadataExtras({
    title,
    description,
    path,
    image: study.cover,
  });

  return {
    title,
    description,
    ...extras,
    openGraph: {
      ...extras.openGraph,
      type: "article",
      url: `${site.url}${path}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const next = getNextCaseStudy(slug);

  return <CaseStudyView study={study} next={next} />;
}
