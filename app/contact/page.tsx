import type { Metadata } from "next";
import PageHero from "@/components/reveal/PageHero";
import SectionReveal from "@/components/reveal/SectionReveal";
import ContactForm from "@/components/forms/ContactForm";
import ResumeCta from "@/components/cta/ResumeCta";
import { Suspense } from "react";
import { site } from "@/lib/site";
import { pageMetadataExtras } from "@/lib/seo";

const title = "Contact";
const description =
  "Open to senior product design opportunities, product leadership, AI product work, advisory, workshops, and selected collaborations.";

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
        title="Let’s build something worth solving."
        description="Open to senior product design opportunities, product leadership, AI product work, advisory, workshops, and selected collaborations."
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
          <div>
            <p className="font-mono-label text-[11px] text-ink-soft">Resume</p>
            <div className="mt-3">
              <ResumeCta size="sm" />
            </div>
          </div>
        </div>
        <div data-reveal-item className="border border-line p-5 sm:p-8">
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
      </SectionReveal>
    </>
  );
}
