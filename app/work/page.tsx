import type { Metadata } from "next";
import PageHero from "@/components/reveal/PageHero";
import WorkIndex from "@/components/work/WorkIndex";
import { pageMetadataExtras } from "@/lib/seo";

const title = "Selected Work";
const description =
  "Enterprise leadership and founder-built products. Verizon, Rapipay, EQTY, and more — filter by Enterprise, Startup, Founder, AI, Product, or Systems.";

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
        title="Selected work across products, systems, and ventures."
        description="Enterprise leadership and founder-built products. Filter by Enterprise, Startup, Founder, AI, Product, or Systems."
      />
      <WorkIndex />
    </>
  );
}
