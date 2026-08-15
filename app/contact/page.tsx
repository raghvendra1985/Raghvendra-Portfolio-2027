import type { Metadata } from "next";
import PageHero from "@/components/reveal/PageHero";
import SectionReveal from "@/components/reveal/SectionReveal";
import ContactForm from "@/components/forms/ContactForm";
import { site } from "@/lib/site";
import { pageMetadataExtras } from "@/lib/seo";

const title = "Contact";
const description =
  "Start a conversation about DesignOps, AI strategy, or design practice.";

export const metadata: Metadata = {
  title,
  description,
  ...pageMetadataExtras({ title, description, path: "/contact" }),
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="06"
        label="Contact"
        title="Start a conversation."
        description="DesignOps, AI product strategy, and design practice — scoped clearly, priced without theatre."
      />

      <SectionReveal className="mx-auto grid max-w-[1440px] gap-16 px-[var(--page-pad)] pb-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-reveal-item className="space-y-8">
          <div>
            <p className="font-mono-label text-[11px] text-ink-soft">Email</p>
            <a href={`mailto:${site.email}`} className="mt-2 block text-lg">
              {site.email}
            </a>
          </div>
          <div>
            <p className="font-mono-label text-[11px] text-ink-soft">Based in</p>
            <p className="mt-2 text-lg">{site.location}</p>
          </div>
          <div>
            <p className="font-mono-label text-[11px] text-ink-soft">Status</p>
            <p className="mt-2 text-lg">
              {site.status} — {site.statusDetail}
            </p>
          </div>
          <div>
            <p className="font-mono-label text-[11px] text-ink-soft">Elsewhere</p>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-lg"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div data-reveal-item className="border border-line p-5 sm:p-8">
          <ContactForm />
        </div>
      </SectionReveal>
    </>
  );
}
