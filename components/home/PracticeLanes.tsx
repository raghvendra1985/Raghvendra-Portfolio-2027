import { TrackedLink } from "@/components/analytics/TrackedCta";
import WorkCard from "@/components/work/WorkCard";
import type { Service } from "@/services";

const cards = [
  {
    wrap: "md:col-span-4 md:row-span-2 min-h-[28rem]",
    surface: "bg-navy text-mist",
    index: "text-gold",
    body: "text-mist/75",
    chip: "border-mist/20 text-mist/80",
    cta: "text-gold",
  },
  {
    wrap: "md:col-span-2 min-h-[13.5rem]",
    surface: "bg-paper text-navy",
    index: "text-gold",
    body: "text-ink-soft",
    chip: "border-line text-navy",
    cta: "text-green",
  },
  {
    wrap: "md:col-span-2 min-h-[13.5rem]",
    surface: "bg-surface-dim text-navy",
    index: "text-gold",
    body: "text-ink-soft",
    chip: "border-line-strong text-navy",
    cta: "text-green",
  },
  {
    wrap: "md:col-span-6",
    surface: "bg-paper text-navy",
    index: "text-gold",
    body: "text-ink-soft",
    chip: "border-line text-navy",
    cta: "text-green",
  },
] as const;

export default function PracticeLanes({ services }: { services: Service[] }) {
  return (
    <ul className="mt-12 grid gap-4 md:grid-cols-6" aria-labelledby="practice-heading">
      {services.map((service, index) => {
        const skin = cards[index] ?? cards[1];
        const featured = index === 0;
        return (
          <li key={service.slug} data-reveal-item className={skin.wrap}>
            <WorkCard className={`h-full ${skin.surface}`}>
              <TrackedLink
                href={`/contact?intent=${service.intent}`}
                data-cursor="Open"
                event="service_clicked"
                payload={{ slug: service.slug, intent: service.intent }}
                className={`group relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-8 ${
                  index === 3 ? "md:flex-row md:items-end md:gap-12" : ""
                }`}
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gold motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p
                    className={`${skin.index} ${
                      featured ? "font-display text-6xl leading-none tracking-tight" : "font-mono-label"
                    }`}
                  >
                    {service.index}
                  </p>
                  <h3 className={`mt-3 ${featured ? "type-h2" : "type-h3"}`}>{service.title}</h3>
                  <p
                    className={`mt-4 max-w-lg text-base leading-relaxed ${skin.body} ${
                      featured || index === 3 ? "" : "line-clamp-3"
                    }`}
                  >
                    {service.problem}
                  </p>
                </div>
                <div
                  className={`shrink-0 ${featured ? "mt-10" : "mt-8"} ${index === 3 ? "md:mt-0" : ""}`}
                >
                  <ul className="flex flex-wrap gap-2">
                    {service.stack.slice(0, featured ? 4 : 2).map((item) => (
                      <li
                        key={item}
                        className={`border px-3 py-1 font-mono-label ${skin.chip}`}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-6 font-mono-label ${skin.cta}`}>{service.cta} →</p>
                </div>
              </TrackedLink>
            </WorkCard>
          </li>
        );
      })}
    </ul>
  );
}
