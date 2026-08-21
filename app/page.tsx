import Hero from "@/components/hero/Hero";
import SelectedWork from "@/components/work/SelectedWork";
import EnterpriseLeadership from "@/components/home/EnterpriseLeadership";
import HiringPath from "@/components/home/HiringPath";
import ProblemRoutes from "@/components/home/ProblemRoutes";
import SectionReveal from "@/components/reveal/SectionReveal";
import MagneticButton from "@/components/buttons/MagneticButton";
import { TrackedLink, TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import ProductShelf from "@/components/products/ProductShelf";
import CharmGallery from "@/components/delight/CharmGallery";
import ServiceViewTracker from "@/components/analytics/ServiceViewTracker";
import { enterpriseLeadership, featuredWork } from "@/case-studies";
import { services } from "@/services";
import { knowledgeArticles } from "@/knowledge";
import Image from "next/image";

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
          <h2 className="mt-4 max-w-3xl type-h2" data-reveal-item>
            How I contribute.
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.slug}
                data-reveal-item
                className="flex flex-col border-t-2 border-navy pt-5"
              >
                <p className="font-mono-label text-green">{service.index}</p>
                <h3 className="mt-3 type-h3">{service.title}</h3>
                <p className="mt-3 type-body text-navy">{service.problem}</p>
                <p className="mt-5 font-mono-label text-ink-soft">What I help with</p>
                <ul className="mt-2 space-y-1 type-small text-ink-soft">
                  {service.help.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-5 type-small text-ink-soft">{service.engagement}</p>
                <p className="mt-2 type-small text-ink-soft">
                  {service.outputs.join(" · ")}
                </p>
                <div className="mt-6">
                  <TrackedMagneticButton
                    href={`/contact?intent=${service.intent}`}
                    variant="secondary"
                    size="sm"
                    cursor="Open"
                    event="service_clicked"
                    payload={{ slug: service.slug, intent: service.intent }}
                  >
                    {service.cta}
                  </TrackedMagneticButton>
                </div>
              </article>
            ))}
          </div>
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
          <div className="mt-10">
            {knowledgeArticles.slice(0, 3).map((article) => (
              <TrackedLink
                key={article.slug}
                href={`/knowledge/${article.slug}`}
                data-reveal-item
                data-cursor="Open"
                event="knowledge_article_clicked"
                payload={{ slug: article.slug }}
                className="grid gap-4 border-t border-line py-6 sm:grid-cols-[1fr_140px] sm:items-center sm:gap-8"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="type-h3">{article.title}</span>
                  <span className="font-mono-label shrink-0 text-ink-soft">
                    {article.category}
                  </span>
                </div>
                <div className="relative h-20 w-36 overflow-hidden sm:h-[88px] sm:w-[140px] sm:justify-self-end">
                  <Image
                    src={article.cover}
                    alt={article.coverAlt}
                    fill
                    sizes="140px"
                    unoptimized={article.cover.endsWith(".svg")}
                    className={
                      article.coverFit === "contain"
                        ? "object-contain object-left sm:object-right"
                        : "object-cover object-center"
                    }
                  />
                </div>
              </TrackedLink>
            ))}
          </div>
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
