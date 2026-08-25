"use client";

import Image from "next/image";
import Link from "next/link";
import SectionReveal from "@/components/reveal/SectionReveal";
import StudioHover from "@/components/studio/StudioHover";
import { track } from "@/lib/analytics";
import type { CaseStudy } from "@/case-studies";
import { homeEnterprise, homeEnterpriseCards } from "@/home/copy";

function Cover({ study }: { study: CaseStudy }) {
  const src = study.cover;
  if (!src) return null;

  return (
    <div
      data-studio-cover
      className="relative aspect-[16/10] min-w-0 overflow-hidden bg-navy-soft"
    >
      <Image
        src={src}
        alt={`${study.client} - ${study.title}`}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        unoptimized={src.endsWith(".svg")}
        className="object-contain object-center"
      />
    </div>
  );
}

export default function EnterpriseLeadership({ studies }: { studies: CaseStudy[] }) {
  return (
    <SectionReveal
      id="enterprise"
      charmRest
      className="scroll-mt-28 border-t border-navy bg-navy px-[var(--page-pad)] py-24 text-mist"
    >
      <div className="mx-auto max-w-[1440px]">
        <div
          className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
          data-reveal-item
        >
          <div>
            <p className="font-mono-label text-mist/70">{homeEnterprise.eyebrow}</p>
            <h2 className="mt-4 max-w-3xl type-h2">{homeEnterprise.title}</h2>
            <p className="mt-4 max-w-[65ch] type-body text-mist/85">{homeEnterprise.body}</p>
          </div>
          <Link
            href="/work"
            className="hidden min-h-11 shrink-0 items-center font-mono-label text-gold sm:inline-flex"
            data-cursor="View"
            onClick={() => track("enterprise_case_clicked", { slug: "work-index" })}
          >
            View all work →
          </Link>
        </div>

        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {studies.map((study) => {
            const copy = homeEnterpriseCards[study.slug];
            if (!copy) return null;
            return (
              <li key={study.slug} data-reveal-item>
                <StudioHover className="h-full">
                  <Link
                    href={`/work/${study.slug}`}
                    data-cursor="View"
                    onClick={() => track("enterprise_case_clicked", { slug: study.slug })}
                    className="flex h-full flex-col border border-mist/25 bg-navy"
                  >
                    <Cover study={study} />
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <p className="font-mono-label text-gold">{copy.client}</p>
                      <h3 className="mt-3 type-h3 text-[1.35rem] leading-snug">{copy.title}</h3>
                      <p className="mt-3 font-mono-label text-mist/75">{copy.role}</p>
                      <p className="mt-4 flex-1 type-body text-mist/85">{copy.result}</p>
                      <p className="mt-6 font-mono-label text-gold">Read case study →</p>
                    </div>
                  </Link>
                </StudioHover>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionReveal>
  );
}
