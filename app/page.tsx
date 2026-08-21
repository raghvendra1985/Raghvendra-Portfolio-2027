import Hero from "@/components/hero/Hero";
import SelectedWork from "@/components/work/SelectedWork";
import EnterpriseLeadership from "@/components/home/EnterpriseLeadership";
import HiringPath from "@/components/home/HiringPath";
import ProblemRoutes from "@/components/home/ProblemRoutes";
import PracticeLanes from "@/components/home/PracticeLanes";
import HomeNotes from "@/components/home/HomeNotes";
import SectionReveal from "@/components/reveal/SectionReveal";
import MagneticButton from "@/components/buttons/MagneticButton";
import { TrackedLink, TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import ProductShelf from "@/components/products/ProductShelf";
import CharmGallery from "@/components/delight/CharmGallery";
import ServiceViewTracker from "@/components/analytics/ServiceViewTracker";
import { enterpriseLeadership, featuredWork } from "@/case-studies";
import { services } from "@/services";

export default function HomePage() {
  return (
    <>
      <Hero />

      <SelectedWork studies={featuredWork} />

      <SectionReveal className="border-t border-line px-[var(--page-pad)] py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2">
          <div data-reveal-item>
            <p className="font-mono-label text-ink-soft">02 / About</p>
            <h2 className="mt-4 max-w-xl type-h1">
              Twenty years of designing across products, organisations and classrooms.
            </h2>
          </div>
          <div data-reveal-item className="flex flex-col justify-end">
            <p className="max-w-xl type-lead text-ink-soft">
              Product design leader working across enterprise systems, fintech, AI products,
              founder-led ventures, and design education. I move between strategy, systems,
              interaction design, team building, and shipping products.
            </p>
            <div className="mt-8">
            <MagneticButton href="/about" variant="secondary" cursor="Open" className="w-full justify-center sm:w-auto">
                More about me
              </MagneticButton>
            </div>
          </div>
        </div>
      </SectionReveal>

      <ProblemRoutes />

      <SectionReveal
        id="practice"
        className="scroll-mt-28 border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <ServiceViewTracker />
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-label text-ink-soft" data-reveal-item>
            03 / Practice
          </p>
          <h2 id="practice-heading" className="mt-4 max-w-3xl type-h2" data-reveal-item>
            How I contribute.
          </h2>
          <PracticeLanes services={services} />
        </div>
      </SectionReveal>

      <EnterpriseLeadership studies={enterpriseLeadership} />

      <HiringPath />

      <SectionReveal className="border-t border-line px-[var(--page-pad)] py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between" data-reveal-item>
            <div>
              <p className="font-mono-label text-ink-soft">04 / Knowledge</p>
              <h2 className="mt-4 type-h2">
                Ideas made useful.
              </h2>
            </div>
            <TrackedLink
              href="/knowledge"
              className="font-mono-label"
              data-cursor="Open"
              event="knowledge_article_clicked"
              payload={{ slug: "index" }}
            >
              All notes →
            </TrackedLink>
          </div>
          <HomeNotes />
        </div>
      </SectionReveal>

      <ProductShelf />

      <CharmGallery />

      <SectionReveal className="border-t border-navy bg-navy px-[var(--page-pad)] py-24 text-mist">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div data-reveal-item>
            <p className="font-mono-label text-mist/50">05 / Contact</p>
            <h2 className="mt-4 max-w-xl type-h1">
              Design strategy is infrastructure. Let&apos;s talk.
            </h2>
            <p className="mt-4 max-w-lg type-lead text-mist/70">
              Available for senior product design roles, design leadership, advisory, workshops,
              and selected product collaborations.
            </p>
          </div>
          <div data-reveal-item>
            <TrackedMagneticButton
              href="/contact"
              variant="gold"
              event="contact_cta_clicked"
              payload={{ from: "home" }}
            >
              Start a conversation
            </TrackedMagneticButton>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
