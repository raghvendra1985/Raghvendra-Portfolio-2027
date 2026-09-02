import {
  DirectionSection,
  WireCtas,
  WireObject,
  heroDirectionCopy,
} from "@/components/home/hero-directions/shared";

export default function HeroDirectionD() {
  const copy = heroDirectionCopy.D;

  return (
    <DirectionSection
      id="direction-d"
      title="Direction D — Split atmosphere"
      subtitle="Mist left (copy) · paper right (object); vertical hairline divide."
      notes={[
        "Two grounds in one hero — clearest separation of word and object.",
        "Object at 110% on paper column; current headline length works here.",
        "Risk: charm corridor overlap on desktop; mobile stacks paper under copy.",
      ]}
    >
      <div className="pt-[calc(var(--nav-height)+0.5rem)]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-end px-[var(--page-pad)] pb-10 pt-8 lg:pb-16 lg:pr-10">
            <p className="font-mono-label text-navy/80">{heroDirectionCopy.roleLine}</p>
            <h2 className="mt-4 max-w-[16em] type-hero text-navy">{copy.headline}</h2>
            <div className="mt-10">
              <WireCtas />
            </div>
          </div>
          <div className="relative border-t border-line bg-paper px-[var(--page-pad)] py-10 lg:border-l lg:border-t-0 lg:py-16 lg:pl-10 lg:-mr-[var(--page-pad)] lg:pr-[var(--page-pad)]">
            <WireObject
              large
              label="PAPER COLUMN — VIDEO"
              surface="paper"
              dashed={false}
              className="mx-auto aspect-square w-full max-w-[28rem] lg:max-w-none lg:scale-110 lg:origin-center"
            />
          </div>
        </div>
      </div>
    </DirectionSection>
  );
}
