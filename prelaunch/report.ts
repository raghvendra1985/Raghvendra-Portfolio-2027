import { commerceGoLiveChecklist, commerceMode } from "@/lib/commerce/config";
import { requireAdminClient } from "@/lib/supabase/admin";
import { getProduct } from "@/products";
import { productAudits, type ProductAudit, type Recommendation } from "@/prelaunch/audits";
import { clientFunnelReport, recruiterFunnelReport, studentFunnelReport } from "@/prelaunch/funnels";
import { productDecisions } from "@/prelaunch/decisions";
import { loadOwnerReviews, type OwnerReview } from "@/prelaunch/owner-reviews";
import { SIMULATION_PROVIDER } from "@/lib/commerce/simulate";

export type ReleaseState = "READY" | "NOT READY";

export type PrelaunchRow = {
  product: string;
  slug: string;
  publicStatus: string;
  build: ProductAudit["build"];
  content: string;
  ux: string;
  mobile: string;
  entitlement: string;
  commerce: string;
  email: string;
  ownerReviewed: boolean;
  ownerApproved: boolean;
  recommendation: Recommendation;
};

export type InterventionItem = {
  group: "Content" | "Assets" | "Product Decisions" | "Commerce" | "Approval";
  product?: string;
  text: string;
  severity: "must" | "review" | "optional";
};

async function livePaidChain() {
  const slugs = ["design-roulette", "design-iq"] as const;
  const empty = slugs.map((slug) => {
    const product = getProduct(slug);
    return {
      slug,
      name: product?.name ?? slug,
      paid: false,
      entitlement: false,
      email: false,
    };
  });

  try {
    const admin = requireAdminClient();
    const rows = [];
    for (const slug of slugs) {
      const product = getProduct(slug);
      if (!product) continue;
      const { data: items } = await admin.from("order_items").select("order_id").eq("product_id", product.id);
      const orderIds = (items ?? []).map((item) => item.order_id as string);
      let paid = false;
      let realOrderIds: string[] = [];
      if (orderIds.length) {
        const { data: orders } = await admin
          .from("orders")
          .select("id, payment_provider")
          .in("id", orderIds)
          .eq("status", "paid")
          .neq("payment_provider", SIMULATION_PROVIDER);
        realOrderIds = (orders ?? []).map((order) => order.id as string);
        paid = realOrderIds.length > 0;
      }
      const { data: entitlements } = await admin
        .from("entitlements")
        .select("id, order_id")
        .eq("product_id", product.id)
        .eq("status", "active");
      const entitlement = (entitlements ?? []).some((row) => realOrderIds.includes(row.order_id as string));
      let email = false;
      if (realOrderIds.length) {
        const { count } = await admin
          .from("email_events")
          .select("id", { count: "exact", head: true })
          .eq("product_id", product.id)
          .eq("type", "purchase_confirmation")
          .eq("status", "sent")
          .in("order_id", realOrderIds);
        email = (count ?? 0) > 0;
      }
      rows.push({ slug, name: product.name, paid, entitlement, email });
    }
    return rows;
  } catch {
    return empty;
  }
}

function uxLabel(audit: ProductAudit) {
  if (audit.build === "CONTENT BLOCKED" || audit.build === "INFRASTRUCTURE ONLY") return "Blocked";
  if (audit.build === "PROTOTYPE") return "Thin";
  if (audit.deadEnds.length) return "Works · dead ends noted";
  return "Works";
}

export async function buildPrelaunchReport() {
  const audits = productAudits();
  const reviews = await loadOwnerReviews();
  const recruiter = recruiterFunnelReport();
  const client = clientFunnelReport();
  const student = studentFunnelReport();
  const checklist = commerceGoLiveChecklist();
  const chain = await livePaidChain();
  const chainPassed = chain.length === 2 && chain.every((row) => row.paid && row.entitlement && row.email);
  const anyApproved = [...reviews.values()].some((review) => review.approvedForSale);

  const table: PrelaunchRow[] = audits.map((audit) => {
    const review = reviews.get(audit.productId);
    return {
      product: audit.name,
      slug: audit.slug,
      publicStatus: audit.catalogueStatus,
      build: audit.build,
      content: audit.contentStatus,
      ux: uxLabel(audit),
      mobile: "WARNING — owner device check",
      entitlement: audit.entitlement,
      commerce: audit.commerceStatus,
      email: "Preview only until a real (non-simulation) purchase email is sent",
      ownerReviewed: Boolean(review?.reviewed),
      ownerApproved: Boolean(review?.approvedForSale),
      recommendation: audit.recommendation,
    };
  });

  const intervention = collectIntervention(audits, reviews, checklist, chainPassed);
  const approvedCount = table.filter((row) => row.ownerApproved).length;
  const contentBlocked = audits.filter((audit) => audit.build === "CONTENT BLOCKED").length;

  const PORTFOLIO_RELEASE: ReleaseState = "READY";
  const PRODUCTS_RELEASE: ReleaseState =
    contentBlocked === 0 && approvedCount > 0 ? "READY" : "NOT READY";
  const COMMERCE_TEST_RELEASE: ReleaseState =
    (checklist.mode === "test" || checklist.mode === "live") && checklist.secretsReady && chainPassed ? "READY" : "NOT READY";
  const COMMERCE_LIVE_RELEASE: ReleaseState =
    checklist.liveModeSet && chainPassed && checklist.secretsReady && anyApproved ? "READY" : "NOT READY";

  return {
    table,
    audits,
    reviews,
    recruiter,
    client,
    student,
    intervention,
    chain,
    chainPassed,
    checklist,
    anyApproved,
    states: {
      PORTFOLIO_RELEASE,
      PRODUCTS_RELEASE,
      COMMERCE_TEST_RELEASE,
      COMMERCE_LIVE_RELEASE,
    },
    must: intervention.filter((item) => item.severity === "must"),
    review: intervention.filter((item) => item.severity === "review"),
    optional: intervention.filter((item) => item.severity === "optional"),
  };
}

function collectIntervention(
  audits: ProductAudit[],
  reviews: Map<string, OwnerReview>,
  checklist: ReturnType<typeof commerceGoLiveChecklist>,
  chainPassed: boolean,
): InterventionItem[] {
  const items: InterventionItem[] = [];

  for (const audit of audits) {
    for (const text of audit.intervention) {
      const contentLike =
        /card|case|countdown|PDF|pack|brief depth|language/i.test(text) && !/^Decision/i.test(text) && !/^Owner/i.test(text);
      const assetLike = /PDF|upload/i.test(text);
      items.push({
        group: assetLike ? "Assets" : contentLike ? "Content" : "Approval",
        product: audit.name,
        text,
        severity: audit.recommendation === "HOLD" || audit.build === "CONTENT BLOCKED" ? "must" : "review",
      });
    }
    const review = reviews.get(audit.productId);
    if (!review?.reviewed) {
      items.push({
        group: "Approval",
        product: audit.name,
        text: "Raghvendra reviewed: NO",
        severity: audit.catalogueStatus === "live" ? "review" : "review",
      });
    }
    if (!review?.approvedForSale && audit.recommendation !== "HOLD") {
      items.push({
        group: "Approval",
        product: audit.name,
        text: "Approved for sale: NO — do not auto-publish",
        severity: "review",
      });
    }
  }

  for (const decision of productDecisions) {
    items.push({
      group: "Product Decisions",
      product: decision.product,
      text: decision.decision,
      severity: decision.severity,
    });
  }

  if (!checklist.razorpay.keyId || !checklist.razorpay.keySecret || !checklist.razorpay.webhookSecret) {
    items.push({
      group: "Commerce",
      text: "Razorpay TEST credentials are not all present (presence only — values are not shown).",
      severity: "must",
    });
  }
  if (!checklist.resend.apiKey) {
    items.push({
      group: "Commerce",
      text: "Resend API key is not present. Transactional purchase email cannot be sent.",
      severity: "must",
    });
  }
  if (commerceMode() === "whatsapp") {
    items.push({
      group: "Commerce",
      text: "commerceMode is whatsapp. Set test in Vercel only after walking the simulator, then run a real Razorpay TEST payment. Do not set live from this app.",
      severity: "must",
    });
  }
  if (!chainPassed) {
    items.push({
      group: "Commerce",
      text: "Razorpay test E2E (paid order → entitlement → sent purchase email) has not passed for Design Roulette and Design IQ. Simulation rows do not count.",
      severity: "must",
    });
  }

  return items;
}
