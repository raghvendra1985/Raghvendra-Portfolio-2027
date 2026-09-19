import type { Metadata } from "next";
import BuildView from "@/components/build/BuildView";
import { buildPage } from "@/build";
import { pageMetadataExtras } from "@/lib/seo";

export const metadata: Metadata = {
  title: buildPage.title,
  description: buildPage.description,
  ...pageMetadataExtras({
    title: buildPage.title,
    description: buildPage.description,
    path: "/build",
  }),
};

export default function BuildRoute() {
  return <BuildView />;
}
