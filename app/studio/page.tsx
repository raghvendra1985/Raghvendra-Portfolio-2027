import type { Metadata } from "next";
import StudioView from "@/components/studio/StudioView";
import { studioPage } from "@/studio";
import { pageMetadataExtras } from "@/lib/seo";

export const metadata: Metadata = {
  title: studioPage.title,
  description: studioPage.description,
  ...pageMetadataExtras({
    title: studioPage.title,
    description: studioPage.description,
    path: "/studio",
  }),
};

export default function StudioRoute() {
  return <StudioView />;
}
