import type { Metadata } from "next";
import TeachingView from "@/components/teaching/TeachingView";
import { teachingPage } from "@/teaching";
import { pageMetadataExtras } from "@/lib/seo";

export const metadata: Metadata = {
  title: teachingPage.title,
  description: teachingPage.description,
  ...pageMetadataExtras({
    title: teachingPage.title,
    description: teachingPage.description,
    path: "/teaching",
  }),
};

export default function TeachingRoute() {
  return <TeachingView />;
}
