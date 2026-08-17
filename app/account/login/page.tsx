import type { Metadata } from "next";
import PageHero from "@/components/reveal/PageHero";
import MagicLinkForm from "@/components/commerce/MagicLinkForm";
import { pageMetadataExtras } from "@/lib/seo";

const title = "Sign in";
const description = "Enter the email you used at checkout to open your library.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  ...pageMetadataExtras({ title, description, path: "/account/login" }),
};

export default async function AccountLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return (
    <>
      <PageHero
        index="—"
        label="Account"
        title="Open your library."
        description="Use the same email you entered at checkout. We’ll send a sign-in link. No password."
      />
      <div className="mx-auto max-w-[1440px] px-[var(--page-pad)] pb-24">
        <MagicLinkForm next={next} />
      </div>
    </>
  );
}
