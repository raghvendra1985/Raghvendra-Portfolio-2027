"use client";

import Image from "next/image";
import Link from "next/link";
import SectionReveal from "@/components/reveal/SectionReveal";
import StudioHover from "@/components/studio/StudioHover";
import { track } from "@/lib/analytics";
import type { CaseStudy } from "@/case-studies";

function companyLabel(study: CaseStudy) {
  if (study.slug === "nye") return "Rapipay";
  return study.client;
}

function impactLine(study: CaseStudy) {
  return study.outcomes?.[0]?.title ?? study.summary;
}

function Cover({ study, featured = false }: { study: CaseStudy; featured?: boolean }) {
  const src = study.cover;
  if (!src) return null;

  return (
    <div
      data-studio-cover
      className={`relative overflow-hidden bg-navy-soft ${
        featured ? "aspect-[16/10]" : "aspect-[16/11] h-full min-h-[8.5rem]"
      }`}
    >
      <Image
        src={src}
        alt={`${study.client} - ${study.title}`}
        fill
        sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "280px"}
        unoptimized={src.endsWith(".svg")}
        className="object-contain object-center"
      />
    </div>
  );
}

export default function EnterpriseLeadership({ studies }: { studies: CaseStudy[] }) {
  const [lead, ...rest] = studies;
  if (!lead) return null;

  return (
    <SectionReveal
      id="enterprise"
      className="scroll-mt-28 border-t border-navy bg-navy px-[var(--page-pad)] py-24 text-mist"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between" data-reveal-item>
          <div>
            <p className="font-mono-label text-mist/50">Enterprise Leadership</p>
            <h2 className="mt-4 max-w-3xl type-h2">
              Systems that had to last.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mist/70">
              Enterprise design experience alongside hands-on product building. Staff consulting
              and product leadership inside large organisations.
            </p>
          </div>
          <Link
            href="/work"
            className="hidden min-h-11 shrink-0 items-center font-mono-label text-gold sm:inline-flex"
            data-cursor="View"
            onClick={() => track("enterprise_case_clicked", { slug: "work-index" })}
          >
            All work →
          </Link>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <div data-reveal-item>
            <StudioHover>
            <Link
              href={`/work/${lead.slug}`}
              data-cursor="View"
              onClick={() => track("enterprise_case_clicked", { slug: lead.slug })}
              className="flex h-full flex-col border border-mist/15 bg-navy"
            >
              <Cover study={lead} featured />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="font-mono-label text-gold">{companyLabel(lead)}</p>
                <h3 className="mt-4 type-h3">{lead.title}</h3>
                {lead.role ? (
                  <p className="mt-3 font-mono-label text-mist/50">{lead.role}</p>
                ) : null}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-mist/70">
                  {impactLine(lead)}
                </p>
                <p className="mt-6 font-mono-label text-gold">Read case study →</p>
              </div>
            </Link>
          </StudioHover>
          </div>

          <ul className="flex flex-col gap-4">
            {rest.map((study) => (
              <li key={study.slug} data-reveal-item className="flex-1">
                <StudioHover className="h-full">
                  <Link
                    href={`/work/${study.slug}`}
                    data-cursor="View"
                    onClick={() => track("enterprise_case_clicked", { slug: study.slug })}
                    className="grid h-full grid-cols-1 overflow-hidden border border-mist/15 bg-navy sm:grid-cols-[11rem_1fr]"
                  >
                    <Cover study={study} />
                    <div className="flex flex-col justify-between p-6 sm:p-7">
                      <div>
                        <p className="font-mono-label text-gold">{companyLabel(study)}</p>
                        <h3 className="mt-3 type-h3 text-[1.35rem] leading-snug">{study.title}</h3>
                        {study.role ? (
                          <p className="mt-2 font-mono-label text-mist/50">{study.role}</p>
                        ) : null}
                      </div>
                      <p className="mt-4 font-mono-label text-gold">Read case study →</p>
                    </div>
                  </Link>
                </StudioHover>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionReveal>
  );
}
