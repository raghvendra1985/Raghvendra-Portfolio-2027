import type { CaseStudy } from "@/case-studies";

const tones: Record<CaseStudy["tone"], string> = {
  navy: "bg-navy text-mist",
  green: "bg-green text-mist",
  gold: "bg-gold text-navy",
  mist: "bg-surface-dim text-navy",
};

export default function WorkCover({
  study,
  className = "",
}: {
  study: CaseStudy;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden p-8 ${tones[study.tone]} ${className}`}
      data-shared-image
    >
      <div
        className="cover-grid pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />
      <p className="font-mono-label opacity-70">{study.index}</p>
      <div>
        <p className="type-h2">{study.client}</p>
        <p className="mt-3 font-mono-label opacity-70">{study.industry}</p>
      </div>
    </div>
  );
}
