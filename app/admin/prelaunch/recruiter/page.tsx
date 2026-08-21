import type { Metadata } from "next";
import Link from "next/link";
import FunnelChecklist from "@/components/admin/FunnelChecklist";
import PrelaunchShell from "@/components/admin/PrelaunchShell";
import { recruiterChecklist, recruiterPersona, recruiterSequences } from "@/prelaunch/funnels";

export const metadata: Metadata = {
  title: "Recruiter funnel · Pre-Launch",
  robots: { index: false, follow: false },
};

export default function RecruiterPrelaunchPage() {
  return (
    <PrelaunchShell
      title="Recruiter Funnel"
      deck="Walk the public site as a senior recruiter hiring for Staff / Principal / Lead Product Designer. Answers below are taken from visible pages only."
    >
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex min-h-11 items-center border border-navy px-4 font-mono-label"
      >
        Start Recruiter Test
      </a>

      {recruiterSequences.map((sequence) => (
        <div key={sequence.title} className="mt-12">
          <h2 className="type-h3">{sequence.title}</h2>
          <ol className="mt-4 space-y-2 text-sm">
            {sequence.steps.map((step, index) => (
              <li key={`${sequence.title}-${step.href}`}>
                {index + 1}.{" "}
                <Link href={step.href} className="underline decoration-gold underline-offset-4">
                  {step.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ))}

      <h2 className="mt-16 type-h3">Test checklist</h2>
      <p className="mt-3 text-sm text-ink-soft">Ticks stay on this browser. They are not a score.</p>
      <FunnelChecklist
        storageKey="prelaunch-recruiter-checklist"
        items={recruiterChecklist.map((item) => ({ id: item.id, label: item.label }))}
      />

      <h2 className="mt-16 type-h3">Evidence from the live pages</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {recruiterChecklist.map((item) => (
          <li key={item.id} className="py-5">
            <p className="font-mono-label text-ink-soft">
              {item.verdict}
              {item.href ? (
                <>
                  {" · "}
                  <Link href={item.href} className="underline decoration-gold underline-offset-4">
                    Open
                  </Link>
                </>
              ) : null}
            </p>
            <p className="mt-2 type-h3">{item.label}</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">{item.evidence}</p>
            {item.missing ? <p className="mt-2 max-w-3xl text-sm text-green">{item.missing}</p> : null}
          </li>
        ))}
      </ul>

      <h2 className="mt-16 type-h3">Recruiter persona panel</h2>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">
        Persona: senior recruiter hiring for Staff / Principal / Lead Product Designer. No generated answers.
      </p>
      <dl className="mt-8 space-y-8">
        {recruiterPersona.map((item) => (
          <div key={item.question} className="border-t border-line pt-5">
            <dt className="type-h3">{item.question}</dt>
            <dd className="mt-3 max-w-3xl text-sm leading-relaxed">{item.answer}</dd>
            <dd className="mt-2 font-mono-label text-ink-soft">Source: {item.source}</dd>
            {item.missing ? <dd className="mt-2 max-w-3xl text-sm text-green">Missing evidence: {item.missing}</dd> : null}
          </div>
        ))}
      </dl>
    </PrelaunchShell>
  );
}
