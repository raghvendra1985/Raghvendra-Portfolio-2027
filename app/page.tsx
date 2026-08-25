import Hero from "@/components/hero/Hero";
import SelectedWork from "@/components/work/SelectedWork";
import AboutPolaroid from "@/components/about/AboutPolaroid";
import ConnectiveThesis from "@/components/home/ConnectiveThesis";
import CompactCharmPicker from "@/components/delight/CompactCharmPicker";
import EnterpriseLeadership from "@/components/home/EnterpriseLeadership";
import HiringPath from "@/components/home/HiringPath";
import PracticeLanes from "@/components/home/PracticeLanes";
import HomeNotes from "@/components/home/HomeNotes";
import SectionReveal from "@/components/reveal/SectionReveal";
import { TrackedLink, TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import ProductShelf from "@/components/products/ProductShelf";
import ServiceViewTracker from "@/components/analytics/ServiceViewTracker";
import { enterpriseLeadership, featuredWork } from "@/case-studies";
import { services } from "@/services";
import { homeAbout, homeContact, homeKnowledge, homePractice } from "@/home/copy";

export default function HomePage() {
  return (
    <>
      <Hero />

      <SelectedWork studies={featuredWork} />

      <ConnectiveThesis />

      <CompactCharmPicker />

      <SectionReveal
        charmRest
        className="border-t border-line px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          <div data-reveal-item className="mx-auto w-full max-w-[320px] lg:mx-0">
            <AboutPolaroid
              src="/assets/about/raghvendra-singh.png"
              alt="Raghvendra Singh"
              idle
              sizes="320px"
            />
          </div>
          <div data-reveal-item>
            <p className="font-mono-label text-navy/80">{homeAbout.index}</p>
            <h2 className="mt-4 max-w-xl font-serif text-[clamp(2rem,1.5rem+1.6vw,3.15rem)] font-normal leading-[1.15] tracking-[-0.02em]">
              {homeAbout.title}
            </h2>
            <p className="mt-6 max-w-[65ch] type-lead text-ink">{homeAbout.body}</p>
            <div className="mt-8">
              <TrackedMagneticButton
                href={homeAbout.href}
                variant="secondary"
                cursor="Open"
                className="w-full justify-center sm:w-auto"
                event="nav_clicked"
                payload={{ surface: "home_about", dest: "/about" }}
              >
                {homeAbout.cta}
              </TrackedMagneticButton>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="practice"
        charmRest
        charmDense
        className="scroll-mt-[var(--hash-offset)] border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <span id="solve" className="sr-only">
          Practice
        </span>
        <ServiceViewTracker />
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-label text-navy/80" data-reveal-item>
            {homePractice.index}
          </p>
          <h2 id="practice-heading" className="mt-4 max-w-3xl type-h2" data-reveal-item>
            {homePractice.title}
          </h2>
          <PracticeLanes services={services} />
        </div>
      </SectionReveal>

      <EnterpriseLeadership studies={enterpriseLeadership} />

      <HiringPath />

      <SectionReveal
        charmRest
        charmDense
        className="border-t border-line px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <div
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
            data-reveal-item
          >
            <div>
              <p className="font-mono-label text-navy/80">{homeKnowledge.index}</p>
              <h2 className="mt-4 type-h2">{homeKnowledge.title}</h2>
            </div>
            <TrackedLink
              href="/knowledge"
              className="font-mono-label"
              data-cursor="Open"
              event="knowledge_article_clicked"
              payload={{ slug: "index", surface: "home_knowledge" }}
            >
              {homeKnowledge.all} →
            </TrackedLink>
          </div>
          <HomeNotes />
        </div>
      </SectionReveal>

      <ProductShelf />

      <SectionReveal
        charmRest
        className="border-t border-navy bg-navy px-[var(--page-pad)] py-24 text-mist"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div data-reveal-item>
            <p className="font-mono-label text-mist/85">{homeContact.index}</p>
            <h2 className="mt-4 max-w-xl type-h1">{homeContact.title}</h2>
            <p className="mt-4 max-w-[65ch] type-lead text-mist/85">{homeContact.body}</p>
          </div>
          <div data-reveal-item>
            <TrackedMagneticButton
              href={homeContact.href}
              variant="gold"
              event="contact_cta_clicked"
              payload={{ from: "home" }}
            >
              {homeContact.cta}
            </TrackedMagneticButton>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
