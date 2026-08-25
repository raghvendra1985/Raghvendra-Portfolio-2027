import { TrackedLink } from "@/components/analytics/TrackedCta";
import WorkCard from "@/components/work/WorkCard";
import type { Service } from "@/services";

export default function PracticeLanes({ services }: { services: Service[] }) {
  return (
    <ul className="mt-12 grid gap-4 sm:grid-cols-2" aria-labelledby="practice-heading">
      {services.map((service) => (
        <li key={service.slug} data-reveal-item>
          <WorkCard className="h-full bg-paper text-navy">
            <div className="group relative flex h-full min-h-[18rem] flex-col justify-between overflow-hidden p-6 sm:p-8">
              <span
                className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-1 origin-left scale-x-0 bg-gold motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-x-100"
                aria-hidden="true"
              />
              <TrackedLink
                href={service.href}
                data-cursor="Open"
                event="service_clicked"
                payload={{ slug: service.slug, intent: service.intent }}
                className="absolute inset-0 z-0 block"
                aria-label={`${service.title}. ${service.cta}`}
              />
              <div className="relative z-[1] min-w-0 pointer-events-none">
                <h3 className="type-h3">{service.title}</h3>
                <p className="mt-4 max-w-lg type-body text-ink">{service.problem}</p>
                <p className="mt-4 font-mono-label text-ink-soft">{service.stack.join(" · ")}</p>
              </div>
              <div className="relative z-[1] mt-8 flex flex-wrap items-end justify-between gap-4">
                <TrackedLink
                  href={service.related.href}
                  event="project_clicked"
                  payload={{ slug: service.related.label, from: "practice" }}
                  className="relative z-[2] pointer-events-auto font-mono-label text-green underline-offset-4 hover:underline"
                >
                  Related work: {service.related.label}
                </TrackedLink>
                <p className="pointer-events-none font-mono-label text-navy">{service.cta} →</p>
              </div>
            </div>
          </WorkCard>
        </li>
      ))}
    </ul>
  );
}
