import type { Metadata } from "next";
import Link from "next/link";
import PrelaunchShell from "@/components/admin/PrelaunchShell";
import { clientEvaluations, clientProblemTests } from "@/prelaunch/funnels";

export const metadata: Metadata = {
  title: "Client funnel · Pre-Launch",
  robots: { index: false, follow: false },
};

export default function ClientPrelaunchPage() {
  return (
    <PrelaunchShell
      title="Client / Founder Funnel"
      deck="Walk the public site as a startup founder with a product problem and budget for senior design help."
    >
      <a
        href="/#solve"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex min-h-11 items-center border border-navy px-4 font-mono-label"
      >
        Start Client Test
      </a>

      <h2 className="mt-16 type-h3">Test sequence</h2>
      <ol className="mt-4 space-y-2 text-sm">
        <li>
          1. <Link href="/" className="underline decoration-gold underline-offset-4">Homepage</Link>
        </li>
        <li>
          2. <Link href="/#solve" className="underline decoration-gold underline-offset-4">What are you trying to solve?</Link>
        </li>
        <li>
          3. <Link href="/#practice" className="underline decoration-gold underline-offset-4">Relevant Practice</Link>
        </li>
        <li>
          4. <Link href="/work" className="underline decoration-gold underline-offset-4">Evidence / Case Study</Link>
        </li>
        <li>
          5. <Link href="/contact" className="underline decoration-gold underline-offset-4">Contact</Link>
        </li>
      </ol>

      <h2 className="mt-16 type-h3">Every problem route</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {clientProblemTests.map((route) => (
          <li key={route.id} className="py-5">
            <p className="font-mono-label text-ink-soft">
              {route.verdict} · intent {route.intent}
            </p>
            <p className="mt-2 type-h3">{route.label}</p>
            <p className="mt-2 text-sm text-ink-soft">
              Practice: {route.service}. {route.note}
            </p>
            <Link href={route.href} className="mt-3 inline-flex min-h-11 items-center font-mono-label underline decoration-gold underline-offset-4">
              Open contact with this intent
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 type-h3">Founder evaluation</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line">
        {clientEvaluations.map((item) => (
          <li key={item.id} className="py-5">
            <p className="font-mono-label">{item.verdict}</p>
            <p className="mt-2 type-h3">{item.label}</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">{item.evidence}</p>
            {item.missing ? <p className="mt-2 max-w-3xl text-sm text-green">{item.missing}</p> : null}
            {item.href ? (
              <Link href={item.href} className="mt-3 inline-flex min-h-11 items-center font-mono-label underline decoration-gold underline-offset-4">
                Open
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </PrelaunchShell>
  );
}
