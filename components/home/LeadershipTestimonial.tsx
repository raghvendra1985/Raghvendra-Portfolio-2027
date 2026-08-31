import SectionReveal from "@/components/reveal/SectionReveal";
import { leadershipTestimonial } from "@/home/leadership-home";

export default function LeadershipTestimonial() {
  return (
    <SectionReveal className="border-t border-line px-[var(--page-pad)] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono-label text-navy/80" data-reveal-item>
          {leadershipTestimonial.eyebrow}
        </p>
        <blockquote
          data-reveal-item
          className="mt-8 max-w-4xl border border-dashed border-line-strong bg-surface-dim px-4 py-8 sm:px-10 sm:py-10"
        >
          <p className="font-serif text-[clamp(1.5rem,1.2rem+1vw,2.25rem)] leading-snug text-navy/70">
            {leadershipTestimonial.quote}
          </p>
          <footer className="mt-8">
            <p className="font-mono-label text-navy/70">{leadershipTestimonial.attribution}</p>
            <p className="mt-4 max-w-[58ch] type-body text-ink-soft">
              {leadershipTestimonial.note}
            </p>
          </footer>
        </blockquote>
      </div>
    </SectionReveal>
  );
}
