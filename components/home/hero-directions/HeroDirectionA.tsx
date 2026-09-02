import {
  DirectionSection,
  WireCtas,
  WireObject,
  heroDirectionCopy,
} from "@/components/home/hero-directions/shared";

export default function HeroDirectionA() {
  const copy = heroDirectionCopy.A;

  return (
    <DirectionSection
      id="direction-a"
      title="Direction A — The Stage"
      subtitle="~75vh gallery opening; large object on paper plate; copy bottom-left."
      notes={[
        "Highest visual punch — object at 110% on a paper band.",
        "Short headline + optional gold proof chip; impact section peeks at fold.",
        "Risk: tall on laptop; stack object above copy on mobile.",
      ]}
    >
      <div className="relative min-h-[min(75vh,52rem)] px-[var(--page-pad)] pb-10 pt-[calc(var(--nav-height)+1rem)] sm:pb-14">
        <div className="mx-auto grid h-full max-w-[1440px] grid-rows-[minmax(0,1fr)_auto] gap-8 lg:grid-cols-12 lg:grid-rows-1 lg:items-end lg:gap-10">
          <div className="relative order-2 flex flex-col justify-end lg:order-1 lg:col-span-5 lg:pb-8">
            <p className="font-mono-label text-navy/80">{heroDirectionCopy.roleLine}</p>
            <h2 className="mt-4 max-w-[14em] type-hero text-navy">{copy.headline}</h2>
            <p className="mt-4 font-mono-label text-gold">{copy.proof}</p>
            <div className="mt-8">
              <WireCtas />
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <WireObject
              large
              label="STAGE — OBJECT / VIDEO"
              surface="paper"
              dashed={false}
              className="aspect-square w-full max-lg:mx-auto max-lg:max-w-[26rem] lg:-mt-8 lg:min-h-[28rem] lg:scale-110 lg:origin-bottom"
            />
          </div>
        </div>
      </div>
    </DirectionSection>
  );
}
