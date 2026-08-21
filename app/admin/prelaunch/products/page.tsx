import type { Metadata } from "next";
import Link from "next/link";
import OwnerReviewToggles from "@/components/admin/OwnerReviewToggles";
import PrelaunchShell from "@/components/admin/PrelaunchShell";
import { productAudits } from "@/prelaunch/audits";
import { loadOwnerReviews } from "@/prelaunch/owner-reviews";

export const metadata: Metadata = {
  title: "Product Lab · Pre-Launch",
  robots: { index: false, follow: false },
};

export default async function ProductLabPage() {
  const audits = productAudits();
  const reviews = await loadOwnerReviews();

  return (
    <PrelaunchShell
      title="Product Lab"
      deck="All 13 products. Engine labels come from the entitled runtime. None of these tools call an AI API."
    >
      <div className="mt-12 space-y-16">
        {audits.map((audit) => {
          const review = reviews.get(audit.productId);
          return (
            <article key={audit.slug} className="border-t-2 border-navy pt-8">
              <p className="font-mono-label text-ink-soft">
                {audit.catalogueStatus} · {audit.releaseReadiness} · {audit.deliveryType} · {audit.priceLabel}
              </p>
              <h2 className="mt-3 type-h2">{audit.name}</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed">{audit.whatIsThis}</p>

              <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                <div>
                  <dt className="font-mono-label text-ink-soft">Student problem</dt>
                  <dd className="mt-2">{audit.studentProblem}</dd>
                </div>
                <div>
                  <dt className="font-mono-label text-ink-soft">Student input</dt>
                  <dd className="mt-2">{audit.studentInput}</dd>
                </div>
                <div>
                  <dt className="font-mono-label text-ink-soft">Product interaction</dt>
                  <dd className="mt-2">{audit.interaction}</dd>
                </div>
                <div>
                  <dt className="font-mono-label text-ink-soft">Product output</dt>
                  <dd className="mt-2">{audit.output}</dd>
                </div>
                <div>
                  <dt className="font-mono-label text-ink-soft">Typical session</dt>
                  <dd className="mt-2">{audit.typicalSession}</dd>
                </div>
                <div>
                  <dt className="font-mono-label text-ink-soft">Why would someone pay?</dt>
                  <dd className="mt-2">{audit.whyPay}</dd>
                </div>
              </dl>

              <div className="mt-8 overflow-x-auto">
                <table className="min-w-[720px] w-full text-left text-sm">
                  <tbody>
                    {[
                      ["STATUS", audit.catalogueStatus],
                      ["BUILD", audit.build],
                      ["ENGINE", `${audit.engine} — ${audit.engineDetail}`],
                      ["AI", "No"],
                      ["CONTENT", audit.contentStatus],
                      ["COMMERCE", audit.commerceStatus],
                      ["STUDENT INPUT", audit.studentInput],
                      ["OUTPUT", audit.output],
                      ["REPEATABILITY", audit.repeatability],
                      ["PAYMENT", audit.payment],
                      ["ENTITLEMENT", audit.entitlement],
                      ["SAVES", audit.savesAnything],
                      ["SALES MATCH", audit.salesPromiseMatch],
                      ["NEEDS RAGHVENDRA", audit.needsRaghvendra],
                      ["RECOMMENDATION", audit.recommendation],
                    ].map(([label, value]) => (
                      <tr key={label} className="border-t border-line align-top">
                        <th className="w-48 py-2 pr-4 font-mono-label font-normal text-ink-soft">{label}</th>
                        <td className="py-2">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {audit.intervention.length ? (
                <div className="mt-6">
                  <p className="font-mono-label text-ink-soft">Intervention required</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    {audit.intervention.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-6 font-mono-label text-ink-soft">Intervention required: none for missing content.</p>
              )}

              {audit.matrixBlockers.length ? (
                <p className="mt-3 text-sm text-green">Matrix blockers: {audit.matrixBlockers.join(" · ")}</p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-4 font-mono-label">
                {audit.toolRoute ? (
                  <Link href={`${audit.toolRoute}?demo=admin`} className="underline decoration-gold underline-offset-4">
                    Open Demo
                  </Link>
                ) : null}
                {audit.toolRoute ? (
                  <Link href={`${audit.toolRoute}?demo=admin`} className="underline decoration-gold underline-offset-4">
                    Launch Product
                  </Link>
                ) : null}
                <Link href={`/products/${audit.slug}`} className="underline decoration-gold underline-offset-4">
                  Student preview
                </Link>
                <Link href={`/admin/prelaunch/commerce?slug=${audit.slug}`} className="underline decoration-gold underline-offset-4">
                  Simulate purchase
                </Link>
              </div>

              <OwnerReviewToggles
                productId={audit.productId}
                reviewed={Boolean(review?.reviewed)}
                approvedForSale={Boolean(review?.approvedForSale)}
              />
            </article>
          );
        })}
      </div>
    </PrelaunchShell>
  );
}
