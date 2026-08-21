import type { Metadata } from "next";
import AboutView from "@/components/about/AboutView";
import { aboutPage } from "@/about";
import { pageMetadataExtras } from "@/lib/seo";

export const metadata: Metadata = {
  title: aboutPage.title,
  description: aboutPage.description,
  ...pageMetadataExtras({
    title: aboutPage.title,
    description: aboutPage.description,
    path: "/about",
  }),
};

export default function AboutRoute() {
  return <AboutView />;
}
