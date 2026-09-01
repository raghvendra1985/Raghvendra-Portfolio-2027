import type { Metadata } from "next";
import PageHero from "@/components/reveal/PageHero";
import WorkIndex from "@/components/work/WorkIndex";
import { pageMetadataExtras } from "@/lib/seo";
import { pageMarks } from "@/visual-language/marks";

const title = "Selected Work";
const description =
  "Work across product direction, complex platforms, AI-native workflows, enterprise organisations, and founder-led ventures.";

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
        title="Leadership, systems, and hands-on product building."
        description="Work across product direction, complex platforms, AI-native workflows, enterprise organisations, and founder-led ventures."
        mark={pageMarks.work}
      />
      <WorkIndex />
    </>
  );
}
