import type { Metadata } from "next";
import Link from "next/link";
import HeroDirectionA from "@/components/home/hero-directions/HeroDirectionA";
import HeroDirectionB from "@/components/home/hero-directions/HeroDirectionB";
import HeroDirectionC from "@/components/home/hero-directions/HeroDirectionC";
import HeroDirectionD from "@/components/home/hero-directions/HeroDirectionD";

const toc = [
  { id: "direction-a", label: "A — Stage" },
  { id: "direction-b", label: "B — Type" },
  { id: "direction-c", label: "C — Evidence" },
  { id: "direction-d", label: "D — Split" },
] as const;

export const metadata: Metadata = {
  title: "Hero directions (dev)",
  robots: { index: false, follow: false },
};

export default function HeroDirectionsPage() {
  return (
    <div className="pb-24">
      <header className="border-b border-line bg-navy px-[var(--page-pad)] py-10 text-mist">
        <p className="font-mono-label text-gold">Dev only · not in nav</p>
        <h1 className="mt-3 type-h1">Homepage hero directions</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist/80">
          Low-fi wireframes using live tokens and the current Grok still. Pick A, B, C, or D
          (or a hybrid) before changing production{" "}
          <code className="font-mono-label text-mist">HomeHero</code>.
        </p>
        <nav
          aria-label="Hero direction sections"
          className="mt-8 flex flex-wrap gap-2"
        >
          {toc.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="inline-flex min-h-11 items-center border border-mist/25 px-4 font-mono-label text-mist hover:border-gold hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div
        className="sticky top-[var(--nav-height)] z-30 border-b border-line bg-mist/95 px-[var(--page-pad)] py-2 backdrop-blur-sm"
        aria-hidden
      >
        <p className="mx-auto max-w-[1440px] font-mono-label text-ink-soft">
          Jump:{" "}
          {toc.map((item, index) => (
            <span key={item.id}>
              {index > 0 ? " · " : null}
              <Link href={`#${item.id}`} className="text-navy hover:text-green">
                {item.label}
              </Link>
            </span>
          ))}
        </p>
      </div>

      <HeroDirectionA />
      <HeroDirectionB />
      <HeroDirectionC />
      <HeroDirectionD />
    </div>
  );
}
