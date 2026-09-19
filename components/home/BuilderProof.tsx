import Image from "next/image";
import Link from "next/link";
import SectionReveal from "@/components/reveal/SectionReveal";
import SystemObjectMark from "@/components/visual-language/SystemObjectMark";
import { caseStudies } from "@/case-studies";
import { leadershipBuilderProof } from "@/home/leadership-home";
import { homeMarks } from "@/visual-language/marks";

function coverFor(slug: string | null) {
  if (!slug) return "/assets/about/raghvendra-singh.png";
  const study = caseStudies.find((item) => item.slug === slug);
  return study?.cover ?? "/assets/about/raghvendra-singh.png";
}

export default function BuilderProof() {
  return (
    <SectionReveal
      id={leadershipBuilderProof.id}
      className="scroll-mt-[var(--hash-offset)] border-t border-line px-[var(--page-pad)] py-14 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center gap-4" data-reveal-item>
          <SystemObjectMark
            src={homeMarks.work.src}
            motion={homeMarks.work.motion}
            surface={homeMarks.work.surface}
          />
          <div>
            <p className="font-mono-label text-navy/80">
              {leadershipBuilderProof.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl type-h2">
              {leadershipBuilderProof.title}
            </h2>
            <p className="mt-4 max-w-[58ch] type-body text-ink-soft">
              {leadershipBuilderProof.intro}
            </p>
            {"cta" in leadershipBuilderProof && leadershipBuilderProof.cta ? (
              <Link
                href={leadershipBuilderProof.cta.href}
                className="mt-4 inline-flex min-h-11 items-center font-mono-label text-navy hover:underline"
              >
                {leadershipBuilderProof.cta.label} →
              </Link>
            ) : null}
          </div>
        </div>

        <ul className="mt-12 space-y-0 border-t border-line" data-reveal-item>
          {leadershipBuilderProof.items.map((item) => {
            const href = item.href;
            return (
              <li
                key={item.title}
                className="grid gap-6 border-b border-line py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12"
              >
                <Link
                  href={href}
                  className="group relative aspect-[16/10] overflow-hidden bg-paper"
                  data-cursor="View"
                  aria-label={`${item.title} — ${item.label}`}
                >
                  <Image
                    src={coverFor(item.imageSlug)}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    sizes="(max-width: 1023px) 100vw, 42vw"
                  />
                </Link>
                <div className="min-w-0 self-center">
                  <p className="font-mono-label text-navy">{item.label}</p>
                  <h3 className="mt-3 type-h3 text-navy">
                    <Link href={href} className="hover:underline">
                      {item.title}
                    </Link>
                  </h3>
                  <dl className="mt-6 space-y-4">
                    <div>
                      <dt className="font-mono-label text-[11px] text-navy/55">
                        Conceived
                      </dt>
                      <dd className="mt-1.5 max-w-[48ch] text-sm leading-relaxed text-ink-soft">
                        {item.conceived}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono-label text-[11px] text-navy/55">
                        Built
                      </dt>
                      <dd className="mt-1.5 max-w-[48ch] text-sm leading-relaxed text-ink-soft">
                        {item.built}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono-label text-[11px] text-navy/55">
                        Shipped
                      </dt>
                      <dd className="mt-1.5 max-w-[48ch] text-sm leading-relaxed text-ink-soft">
                        {item.shipped}
                      </dd>
                    </div>
                  </dl>
                  <Link
                    href={href}
                    className="mt-6 inline-flex min-h-11 items-center font-mono-label text-navy hover:underline"
                  >
                    Read case study →
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionReveal>
  );
}
