import type { Metadata } from "next";
import PageHero from "@/components/reveal/PageHero";
import SectionReveal from "@/components/reveal/SectionReveal";
import ContactForm from "@/components/forms/ContactForm";
import ResumeCta from "@/components/cta/ResumeCta";
import { Suspense } from "react";
import { site } from "@/lib/site";
import { contactPage } from "@/contact";
import { pageMetadataExtras } from "@/lib/seo";

export const metadata: Metadata = {
  title: contactPage.title,
  description: contactPage.description,
  ...pageMetadataExtras({
    title: contactPage.title,
    description: contactPage.description,
    path: "/contact",
  }),
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="06"
        label="Contact"
        title={contactPage.heroTitle}
        description={contactPage.heroDescription}
      />

      <SectionReveal
        charmRest
        charmDense
        className="mx-auto grid max-w-[1440px] gap-16 px-[var(--page-pad)] pb-24 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div data-reveal-item className="border border-line bg-paper p-5 sm:p-8">
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>

        <div data-reveal-item className="space-y-10">
          <div>
            <p className="font-section-label text-navy">{contactPage.nextEyebrow}</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              {contactPage.nextBody}
            </p>
          </div>
          <div>
            <p className="font-mono-label text-ink-soft">Email</p>
            <a href={`mailto:${site.email}`} className="mt-2 block text-lg">
              {site.email}
            </a>
          </div>
          <div>
            <p className="font-mono-label text-ink-soft">LinkedIn</p>
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
            <p className="font-mono-label text-ink-soft">Résumé</p>
            <div className="mt-3">
              <ResumeCta size="sm" source="contact" />
            </div>
          </div>
          <div>
            <p className="font-mono-label text-ink-soft">WhatsApp</p>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-lg"
            >
              Message on WhatsApp
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              {contactPage.whatsappNote}
            </p>
          </div>
          <div>
            <p className="font-mono-label text-ink-soft">Availability</p>
            <p className="mt-2 text-lg">{site.status}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
              {site.statusDetail}
            </p>
            <p className="mt-2 text-sm text-ink-soft">{site.location}</p>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
