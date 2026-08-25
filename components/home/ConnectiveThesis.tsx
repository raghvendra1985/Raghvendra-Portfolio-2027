import SectionReveal from "@/components/reveal/SectionReveal";
import { homeThesis } from "@/home/copy";

export default function ConnectiveThesis() {
  return (
    <SectionReveal
      charmRest
      className="border-t border-line px-[var(--page-pad)] py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono-label text-ink-soft" data-reveal-item>
          {homeThesis.eyebrow}
        </p>
        <h2
          data-reveal-item
          className="mt-6 max-w-3xl font-serif text-[clamp(2rem,1.6rem+1.4vw,3.25rem)] font-normal leading-[1.2] tracking-[-0.02em] text-navy"
        >
          {homeThesis.statement}
        </h2>
        <p
          data-reveal-item
          className="mt-8 max-w-[65ch] type-lead text-ink"
        >
          {homeThesis.body}
        </p>
      </div>
    </SectionReveal>
  );
}
