import type { Metadata } from "next";
import PageHero from "@/components/reveal/PageHero";
import WorkIndex from "@/components/work/WorkIndex";
import { pageMetadataExtras } from "@/lib/seo";

const title = "Selected Work";
const description =
  "Primary case studies first, then enterprise experience, founder work, and archive. Filter by the kind of problem.";

export const metadata: Metadata = {
  title,
  description,
  ...pageMetadataExtras({ title, description, path: "/work" }),
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        index="05"
        label="Selected work"
        title="Selected work, in depth."
        description="Primary studies first. Enterprise experience, founder work, and archive stay on this page. Filter by the kind of problem."
      />
      <WorkIndex />
    </>
  );
}
