import ResumeCta from "@/components/cta/ResumeCta";
import { TrackedMagneticButton } from "@/components/analytics/TrackedCta";
import SectionReveal from "@/components/reveal/SectionReveal";
import { leadershipClose } from "@/home/leadership-home";

export default function HomeClose() {
  return (
    <SectionReveal
      id={leadershipClose.id}
      className="scroll-mt-[var(--hash-offset)] border-t border-navy bg-navy px-[var(--page-pad)] py-20 text-mist sm:py-24"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
        <div data-reveal-item className="max-w-3xl">
          <h2 className="max-w-xl type-h1">{leadershipClose.title}</h2>
          <p className="mt-5 max-w-[62ch] type-lead text-mist/85">{leadershipClose.body}</p>
        </div>
        <div data-reveal-item className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <TrackedMagneticButton
            href={leadershipClose.primary.href}
            variant="gold"
            className="w-full justify-center sm:w-auto"
            event="contact_cta_clicked"
            payload={{ from: "home" }}
          >
            {leadershipClose.primary.label}
          </TrackedMagneticButton>
          <ResumeCta
            appearance="text"
            source="home_recruiter"
            className="inline-flex min-h-12 w-full items-center justify-center border border-mist/40 px-6 font-mono-label text-mist hover:text-gold sm:w-auto"
            label="View résumé"
          />
        </div>
      </div>
    </SectionReveal>
  );
}
