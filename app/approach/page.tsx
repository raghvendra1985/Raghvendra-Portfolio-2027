import type { Metadata } from "next";
import ApproachView from "@/components/approach/ApproachView";
import { approachPage } from "@/approach";
import { pageMetadataExtras } from "@/lib/seo";

export const metadata: Metadata = {
  title: approachPage.title,
  description: approachPage.description,
  ...pageMetadataExtras({
    title: approachPage.title,
    description: approachPage.description,
    path: "/approach",
  }),
};

export default function ApproachRoute() {
  return <ApproachView />;
}
