import type { Metadata } from "next";
import PrelaunchShell from "@/components/admin/PrelaunchShell";
import OwnerReviewToggles from "@/components/admin/OwnerReviewToggles";
import { productAudits } from "@/prelaunch/audits";
import { buildPrelaunchReport } from "@/prelaunch/report";

export const metadata: Metadata = {
  title: "Intervention · Pre-Launch",
  robots: { index: false, follow: false },
};

const groups = ["Content", "Assets", "Product Decisions", "Commerce", "Approval"] as const;

export default async function InterventionPage() {
  const report = await buildPrelaunchReport();
  const audits = productAudits();

  return (
    <PrelaunchShell title="Intervention Board" deck="What does Raghvendra still need to do? Only real missing items.">
      {groups.map((group) => {
        const items = report.intervention.filter((item) => item.group === group);
        return (
          <div key={group} className="mt-12">
            <h2 className="type-h3">{group}</h2>
            {items.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                {items.map((item) => (
                  <li key={`${item.product}-${item.text}`}>
                    <span className="font-mono-label text-ink-soft">{item.severity}</span>
                    {" · "}
                    {item.product ? `${item.product}: ` : null}
                    {item.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-ink-soft">Nothing in this group.</p>
            )}
          </div>
        );
      })}

      <h2 className="mt-16 type-h3">Approval</h2>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">
        Every product starts unreviewed and unapproved. Toggling here does not publish the catalogue.
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {audits.map((audit) => {
          const review = report.reviews.get(audit.productId);
          return (
            <li key={audit.slug} className="py-6">
              <p className="type-h3">{audit.name}</p>
              <OwnerReviewToggles
                productId={audit.productId}
                reviewed={Boolean(review?.reviewed)}
                approvedForSale={Boolean(review?.approvedForSale)}
              />
            </li>
          );
        })}
      </ul>
    </PrelaunchShell>
  );
}
