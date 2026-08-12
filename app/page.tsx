import Hero from "@/components/hero/Hero";
import SelectedWork from "@/components/work/SelectedWork";
import SectionReveal from "@/components/reveal/SectionReveal";
import MagneticButton from "@/components/buttons/MagneticButton";
import { featuredWork } from "@/case-studies";
import { services } from "@/services";
import { knowledgeArticles } from "@/knowledge";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />

      <SelectedWork studies={featuredWork} />

      <SectionReveal className="border-t border-line px-[var(--page-pad)] py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-2">
          <div data-reveal-item>
            <p className="font-mono-label text-[11px] text-ink-soft">02 / About</p>
            <h2 className="mt-4 font-display text-3xl sm:text-5xl">
              20 years at the intersection of architecture, logic, and humanism.
            </h2>
          </div>
          <div data-reveal-item className="flex flex-col justify-end">
            <p className="max-w-xl text-base leading-relaxed text-ink-soft">
              Design leader and AI strategist. Associate Professor at IIAD. I
              build product ecosystems and DesignOps frameworks where structural
              logic governs every interface. The visual layer is the last 10%.
            </p>
            <div className="mt-8">
              <MagneticButton href="/about" variant="secondary" cursor="Open">
                More about me
              </MagneticButton>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal
        id="services"
        className="scroll-mt-28 border-t border-line bg-surface-dim px-[var(--page-pad)] py-24"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="font-mono-label text-[11px] text-ink-soft" data-reveal-item>
            03 / Practice
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl sm:text-5xl" data-reveal-item>
            Four ways teams bring me in.
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.slug}
                data-reveal-item
                className="border-t-2 border-navy pt-5"
              >
                <p className="font-mono-label text-[11px] text-green">{service.index}</p>
                <h3 className="mt-3 font-display text-2xl">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-line px-[var(--page-pad)] py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-end justify-between gap-6" data-reveal-item>
            <div>
              <p className="font-mono-label text-[11px] text-ink-soft">04 / Knowledge</p>
              <h2 className="mt-4 font-display text-3xl sm:text-5xl">
                Ideas made useful.
              </h2>
            </div>
            <Link href="/knowledge" className="font-mono-label text-[11px]" data-cursor="Open">
              All notes →
            </Link>
          </div>
          <div className="mt-10">
            {knowledgeArticles.slice(0, 3).map((article) => (
              <Link
                key={article.slug}
                href={`/knowledge/${article.slug}`}
                data-reveal-item
                data-cursor="Open"
                className="flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-display text-xl sm:text-2xl">{article.title}</span>
                <span className="font-mono-label text-[11px] text-ink-soft">
                  {article.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="border-t border-navy bg-navy px-[var(--page-pad)] py-24 text-mist">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div data-reveal-item>
            <p className="font-mono-label text-[11px] text-mist/50">06 / Contact</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl sm:text-5xl">
              Design strategy is infrastructure. Let&apos;s talk.
            </h2>
          </div>
          <div data-reveal-item>
            <MagneticButton href="/contact" variant="gold">
              Start a conversation
            </MagneticButton>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
