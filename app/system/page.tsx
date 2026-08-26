import type { Metadata } from "next";
import SystemView from "@/components/system/SystemView";
import { founderOs } from "@/founder-os";
import { pageMetadataExtras } from "@/lib/seo";

const title = "System";
const description =
  "How Raghvendra Singh thinks, decides, builds, learns, and operates — methodology connecting practice to published Work evidence.";

export const metadata: Metadata = {
  title,
  description,
  ...pageMetadataExtras({ title, description, path: "/system" }),
};

export default function SystemPage() {
  return <SystemView data={founderOs} />;
}
