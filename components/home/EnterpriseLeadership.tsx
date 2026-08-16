"use client";

import Link from "next/link";
import SectionReveal from "@/components/reveal/SectionReveal";
import { track } from "@/lib/analytics";
import type { CaseStudy } from "@/case-studies";

function companyLabel(study: CaseStudy) {
  if (study.slug === "nye") return "Rapipay";
  return study.client;
}

function impactLine(study: CaseStudy) {
  return study.outcomes?.[0]?.title ?? study.summary;
}

export default function EnterpriseLeadership({ studies }: { studies: CaseStudy[] }) {
  return (
    <SectionReveal
      id="enterprise"
      className="scroll-mt-28 border-t border-navy bg-navy px-[var(--page-pad)] py-24 text-mist"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between" data-reveal-item>
          <div>
            <p className="font-mono-label text-[11px] text-mist/50">Enterprise Leadership</p>
            <h2 className="mt-4 max-w-3xl font-display text-3xl sm:text-5xl">
              Systems that had to last.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mist/70">
              Enterprise design experience alongside hands-on product building. Staff consulting
              and product leadership inside large organisations.
            </p>
          </div>
          <Link
            href="/work"
            className="hidden min-h-11 shrink-0 items-center font-mono-label text-[11px] text-gold sm:inline-flex"
            data-cursor="View"
            onClick={() => track("enterprise_case_clicked", { slug: "work-index" })}
          >
            All work →
          </Link>
        </div>

        <ul className="mt-12 grid gap-px bg-mist/15 md:grid-cols-3">
          {studies.map((study) => (
            <li key={study.slug} data-reveal-item className="bg-navy">
              <Link
                href={`/work/${study.slug}`}
                data-cursor="View"
                onClick={() => track("enterprise_case_clicked", { slug: study.slug })}
                className="flex h-full flex-col border border-mist/15 p-6 sm:p-8"
              >
                <p className="font-mono-label text-[11px] text-gold">{companyLabel(study)}</p>
                <h3 className="mt-4 font-display text-2xl leading-snug">{study.title}</h3>
                {study.client !== companyLabel(study) ? (
                  <p className="mt-3 text-sm text-mist/70">{study.client}</p>
                ) : null}
                {study.role ? (
                  <p className="mt-2 font-mono-label text-[11px] text-mist/50">{study.role}</p>
                ) : null}
                <p className="mt-4 flex-1 text-sm leading-relaxed text-mist/70">{impactLine(study)}</p>
                <p className="mt-6 font-mono-label text-[11px] text-gold">Read case study →</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionReveal>
  );
}
