import type { Metadata } from "next";
import Link from "next/link";
import PrelaunchShell from "@/components/admin/PrelaunchShell";
import { buildPrelaunchReport } from "@/prelaunch/report";

export const metadata: Metadata = {
  title: "Pre-Launch Control Room",
  robots: { index: false, follow: false },
};

function StateMark({ value }: { value: "READY" | "NOT READY" }) {
  return <span className={value === "READY" ? "text-green" : "text-ink-soft"}>{value}</span>;
}

export default async function PrelaunchPage() {
  const report = await buildPrelaunchReport();

  return (
    <PrelaunchShell
      title="Pre-Launch Control Room"
      deck="Test every audience, product and commerce flow before publishing."
    >
      <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="font-mono-label text-ink-soft">PORTFOLIO_RELEASE</dt>
          <dd className="mt-2 type-h3">
            <StateMark value={report.states.PORTFOLIO_RELEASE} />
          </dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">PRODUCTS_RELEASE</dt>
          <dd className="mt-2 type-h3">
            <StateMark value={report.states.PRODUCTS_RELEASE} />
          </dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">COMMERCE_TEST_RELEASE</dt>
          <dd className="mt-2 type-h3">
            <StateMark value={report.states.COMMERCE_TEST_RELEASE} />
          </dd>
        </div>
        <div>
          <dt className="font-mono-label text-ink-soft">COMMERCE_LIVE_RELEASE</dt>
          <dd className="mt-2 type-h3">
            <StateMark value={report.states.COMMERCE_LIVE_RELEASE} />
          </dd>
        </div>
      </dl>
      <p className="mt-4 max-w-2xl text-sm text-ink-soft">
        These four states stay separate. Live commerce is not enabled from this page.
      </p>

      <h2 className="mt-16 type-h3">Portfolio Funnels</h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-3">
        <li className="border-t-2 border-navy pt-4">
          <p className="font-mono-label text-ink-soft">Recruiter Funnel</p>
          <p className="mt-2 type-h2">{report.recruiter.score}/100</p>
          <p className="mt-2 text-sm text-ink-soft">
            {report.recruiter.passes.length} pass · {report.recruiter.warnings.length} warning · {report.recruiter.failures.length} fail
          </p>
          <Link href="/admin/prelaunch/recruiter" className="mt-4 inline-flex min-h-11 items-center font-mono-label underline decoration-gold underline-offset-4">
            Open recruiter test
          </Link>
        </li>
        <li className="border-t-2 border-navy pt-4">
          <p className="font-mono-label text-ink-soft">Client / Founder Funnel</p>
          <p className="mt-2 type-h2">{report.client.score}/100</p>
          <p className="mt-2 text-sm text-ink-soft">
            {report.client.passes.length} pass · {report.client.warnings.length} warning · {report.client.failures.length} fail
          </p>
          <Link href="/admin/prelaunch/client" className="mt-4 inline-flex min-h-11 items-center font-mono-label underline decoration-gold underline-offset-4">
            Open client test
          </Link>
        </li>
        <li className="border-t-2 border-navy pt-4">
          <p className="font-mono-label text-ink-soft">Student Funnel</p>
          <p className="mt-2 type-h2">{report.student.score}/100</p>
          <p className="mt-2 text-sm text-ink-soft">
            {report.student.passes.length} pass · {report.student.warnings.length} warning · {report.student.failures.length} fail
          </p>
          <Link href="/admin/prelaunch/student" className="mt-4 inline-flex min-h-11 items-center font-mono-label underline decoration-gold underline-offset-4">
            Open student test
          </Link>
        </li>
      </ul>

      <h2 className="mt-16 type-h3">Product Lab</h2>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">
        All 13 products. Classifications come from the entitled runtime, not from the sales page.
      </p>
      <p className="mt-4">
        <Link href="/admin/prelaunch/products" className="font-mono-label underline decoration-gold underline-offset-4">
          Open Product Lab
        </Link>
      </p>

      <h2 className="mt-16 type-h3">Commerce Simulation</h2>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">
        Walk Product → Buy → Checkout → Payment success → Customer → Order → Entitlement → Email preview → Library → Open Product without calling Razorpay or Resend.
      </p>
      <p className="mt-4">
        <Link href="/admin/prelaunch/commerce" className="font-mono-label underline decoration-gold underline-offset-4">
          Test purchase journey
        </Link>
      </p>

      <h2 className="mt-16 type-h3">Release Readiness</h2>
      <ul className="mt-6 divide-y divide-line border-y border-line text-sm">
        {report.table.map((row) => (
          <li key={row.slug} className="grid gap-2 py-4 lg:grid-cols-[1fr_8rem_10rem_8rem]">
            <span>{row.product}</span>
            <span className="font-mono-label">{row.publicStatus}</span>
            <span className="font-mono-label">{row.build}</span>
            <span className="font-mono-label">{row.recommendation}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-16 type-h3">Intervention Required</h2>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">
        {report.must.length} must-do before commerce · {report.review.length} to review · {report.optional.length} optional later.
      </p>
      <p className="mt-4">
        <Link href="/admin/prelaunch/intervention" className="font-mono-label underline decoration-gold underline-offset-4">
          Open intervention board
        </Link>
      </p>

      <h2 className="mt-16 type-h3">PRE-LAUNCH REPORT</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[1100px] w-full border-y border-line text-left text-sm">
          <thead>
            <tr className="font-mono-label text-ink-soft">
              <th className="py-3 pr-4">Product</th>
              <th className="py-3 pr-4">Public</th>
              <th className="py-3 pr-4">Build</th>
              <th className="py-3 pr-4">Content</th>
              <th className="py-3 pr-4">UX</th>
              <th className="py-3 pr-4">Mobile</th>
              <th className="py-3 pr-4">Entitlement</th>
              <th className="py-3 pr-4">Commerce</th>
              <th className="py-3 pr-4">Email</th>
              <th className="py-3 pr-4">Reviewed</th>
              <th className="py-3 pr-4">Approved</th>
              <th className="py-3">Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {report.table.map((row) => (
              <tr key={row.slug} className="border-t border-line align-top">
                <td className="py-3 pr-4">{row.product}</td>
                <td className="py-3 pr-4">{row.publicStatus}</td>
                <td className="py-3 pr-4">{row.build}</td>
                <td className="py-3 pr-4">{row.content}</td>
                <td className="py-3 pr-4">{row.ux}</td>
                <td className="py-3 pr-4">{row.mobile}</td>
                <td className="py-3 pr-4">{row.entitlement}</td>
                <td className="py-3 pr-4">{row.commerce}</td>
                <td className="py-3 pr-4">{row.email}</td>
                <td className="py-3 pr-4">{row.ownerReviewed ? "YES" : "NO"}</td>
                <td className="py-3 pr-4">{row.ownerApproved ? "YES" : "NO"}</td>
                <td className="py-3">{row.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-16 type-h3">FUNNEL REPORT</h2>
      {[report.recruiter, report.client, report.student].map((funnel) => (
        <div key={funnel.label} className="mt-8">
          <h3 className="type-h3">{funnel.label}</h3>
          <p className="mt-2 font-mono-label">Score {funnel.score}/100</p>
          <p className="mt-2 text-sm text-ink-soft">
            Passes: {funnel.passes.map((item) => item.label).join("; ") || "None"}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Warnings: {funnel.warnings.map((item) => item.label).join("; ") || "None"}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Failures: {funnel.failures.map((item) => item.label).join("; ") || "None"}
          </p>
        </div>
      ))}

      <h2 className="mt-16 type-h3">OWNER INTERVENTION REPORT</h2>
      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div>
          <h3 className="type-h3">Must do before commerce</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {report.must.map((item) => (
              <li key={`${item.group}-${item.product}-${item.text}`}>
                {item.product ? `${item.product}: ` : null}
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="type-h3">Should review before commerce</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {report.review.map((item) => (
              <li key={`${item.group}-${item.product}-${item.text}`}>
                {item.product ? `${item.product}: ` : null}
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="type-h3">Optional later</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            {report.optional.length ? (
              report.optional.map((item) => (
                <li key={`${item.group}-${item.product}-${item.text}`}>
                  {item.product ? `${item.product}: ` : null}
                  {item.text}
                </li>
              ))
            ) : (
              <li>Product decisions on /admin/prelaunch/decisions are review items, not optional later, until you close them.</li>
            )}
          </ul>
        </div>
      </div>
    </PrelaunchShell>
  );
}
