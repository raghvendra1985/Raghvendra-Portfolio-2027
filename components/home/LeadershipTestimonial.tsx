import SectionReveal from "@/components/reveal/SectionReveal";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import { leadershipTestimonials } from "@/home/leadership-home";

export default function LeadershipTestimonial() {
  return (
    <SectionReveal className="border-t border-line px-[var(--page-pad)] py-14 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono-label text-navy/80" data-reveal-item>
          {leadershipTestimonials.eyebrow}
        </p>
        <div className="mt-8 max-w-4xl" data-reveal-item>
          <TestimonialCarousel
            items={leadershipTestimonials.items}
            label={leadershipTestimonials.eyebrow}
          />
        </div>
      </div>
    </SectionReveal>
  );
}
