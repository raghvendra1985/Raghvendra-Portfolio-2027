import { site } from "@/lib/site";
import { contactIntents, resolveContactIntent } from "@/lib/contact";
import { problemRoutes, services } from "@/services";
import { enterpriseLeadership, featuredWork } from "@/case-studies";
import { products, visibleProducts } from "@/products";
import { productCta } from "@/products/commerce";

export type Verdict = "PASS" | "WARNING" | "FAIL";

export type EvidenceItem = {
  id: string;
  label: string;
  verdict: Verdict;
  evidence: string;
  missing?: string;
  href?: string;
};

export type PersonaQuestion = {
  question: string;
  answer: string;
  source: string;
  missing?: string;
};

function scoreItems(items: EvidenceItem[]) {
  if (!items.length) return 0;
  const points = items.reduce((sum, item) => {
    if (item.verdict === "PASS") return sum + 1;
    if (item.verdict === "WARNING") return sum + 0.5;
    return sum;
  }, 0);
  return Math.round((points / items.length) * 100);
}

function split(items: EvidenceItem[]) {
  return {
    passes: items.filter((item) => item.verdict === "PASS"),
    warnings: items.filter((item) => item.verdict === "WARNING"),
    failures: items.filter((item) => item.verdict === "FAIL"),
  };
}

const enterpriseNames = enterpriseLeadership.map((study) => study.client).join(" · ");
const featuredNames = featuredWork.map((study) => study.client).join(" · ");
const hiringIntent = contactIntents.find((item) => item.id === "hiring");

export const recruiterChecklist: EvidenceItem[] = [
  {
    id: "identity-10s",
    label: "Professional identity understood within 10 seconds",
    verdict: "WARNING",
    evidence: `Hero shows the name “${site.name}”, headline “I design products, systems, and teams that scale,” and positioning “${site.positioning}.” Whether that lands in ten seconds is an owner check, not a code fact.`,
    missing: "Owner must confirm the ten-second read on a cold load, including mobile.",
    href: "/",
  },
  {
    id: "seniority",
    label: "Seniority understood",
    verdict: "PASS",
    evidence:
      "Hero positioning is Product Design Leader. Hiring Path asks “Hiring for Product Design Leadership?” About describes staff consulting and senior UX management. Exact Staff / Principal / Lead titles are not the H1.",
    href: "/#hire",
  },
  {
    id: "years",
    label: "20 years design / 14+ digital product understood",
    verdict: "PASS",
    evidence: `Hero and About use “${site.experienceLine}.”`,
    href: "/",
  },
  {
    id: "enterprise",
    label: "Enterprise experience visible",
    verdict: "PASS",
    evidence: `Homepage #enterprise trio is ${enterpriseNames}. Porsche is not in the published case-study set.`,
    href: "/#enterprise",
  },
  {
    id: "ai",
    label: "AI capability visible",
    verdict: "PASS",
    evidence:
      "Positioning includes AI Product Builder. Hero mentions AI products. About has a chapter on AI product building naming GWK Ghostwriter and Bolo Buddy. This is product craft, not an ML-engineer claim.",
    href: "/about",
  },
  {
    id: "resume-download",
    label: "Resume downloadable",
    verdict: "PASS",
    evidence: `Download Resume points at ${site.resumeHref} from hero, hiring path, about, contact, mobile nav, and footer.`,
    href: site.resumeHref,
  },
  {
    id: "resume-opens",
    label: "Resume opens correctly",
    verdict: "WARNING",
    evidence: "The CTA opens the PDF in a new tab. Whether the file renders on the owner’s devices is a live check.",
    missing: "Open the PDF on desktop and mobile once in this sprint.",
    href: site.resumeHref,
  },
  {
    id: "contact-route",
    label: "Contact route works",
    verdict: "PASS",
    evidence: "Hero, footer, and homepage close all link to /contact. The form posts an inquiry email.",
    href: "/contact",
  },
  {
    id: "hiring-intent",
    label: "Hiring intent preselects",
    verdict: "PASS",
    evidence: `/contact?intent=hiring resolves to “${hiringIntent?.label ?? "hiring"}”.`,
    href: "/contact?intent=hiring",
  },
  {
    id: "mobile",
    label: "Mobile path works",
    verdict: "WARNING",
    evidence: "Primary nav, resume CTA, and contact exist in the mobile header. This is not a substitute for a phone pass.",
    missing: "Walk homepage → enterprise → work → about → resume → contact on a phone.",
  },
];

export const recruiterPersona: PersonaQuestion[] = [
  {
    question: "Who is Raghvendra?",
    answer: `${site.name}. Visible headline: “I design products, systems, and teams that scale.” Positioning: ${site.positioning}.`,
    source: "Homepage hero",
  },
  {
    question: "What level does he appear to operate at?",
    answer:
      "Product Design Leader. Hiring Path is written for product design leadership. About describes staff consulting and senior UX management. The page does not print the job titles Staff, Principal, or Lead in the H1.",
    source: "Hero, Hiring Path, About",
    missing: "A recruiter screening specifically for “Staff / Principal / Lead Product Designer” must infer that from “Product Design Leader” and the experience chapters.",
  },
  {
    question: "What products has he designed?",
    answer: `Selected Work on the homepage: ${featuredNames}. Enterprise trio: ${enterpriseNames}.`,
    source: "Homepage Selected Work and #enterprise",
  },
  {
    question: "What enterprise experience exists?",
    answer: `${enterpriseNames} are the published homepage enterprise studies. About also names Verizon, Rapipay, Crowley, and related systems work.`,
    source: "Homepage #enterprise, About enterprise chapter",
  },
  {
    question: "What did he personally own?",
    answer:
      "Flagship case studies use Challenge → Company / product context and Approach → What I did. Company-scale figures (for example Shuttl) are framed as company context, not personal KPIs.",
    source: "Case study templates",
  },
  {
    question: "Does he appear hands-on?",
    answer:
      "Hero: “hands-on product building.” About: “hands-on product execution.” Resume summary states he prototypes and ships with AI-assisted development as a product designer — not as an ML engineer.",
    source: "Hero, About, resume PDF",
  },
  {
    question: "Does he understand AI products?",
    answer:
      "Yes as product craft: AI Product Builder in the positioning, About chapter on workflows / trust / judgment, with GWK Ghostwriter and Bolo Buddy named. No model-training claims on the public pages.",
    source: "Hero, About AI chapter",
  },
  {
    question: "Can I download his resume?",
    answer: `Yes. Download Resume opens ${site.resumeHref}.`,
    source: "ResumeCta",
  },
  {
    question: "Can I contact him quickly?",
    answer: `Yes. /contact?intent=hiring, ${site.email}, LinkedIn, and a secondary WhatsApp note.`,
    source: "Contact page and footer",
  },
  {
    question: "What concerns would stop an interview?",
    answer:
      "Possible: homepage Selected Work is founder products, with enterprise in a separate section — a fast recruiter might miss Verizon / Rapipay / Crowley if they stop at the first shelf. Porsche is not a published case study. No testimonials are shown (none have been added, correctly). Staff/Principal/Lead is implied rather than printed as those words.",
    source: "Visible information architecture",
    missing: "Do not invent testimonials, metrics, or a Porsche case to close that gap.",
  },
];

export const recruiterSequences = [
  {
    title: "Primary recruiter path",
    steps: [
      { label: "Homepage", href: "/" },
      { label: "Enterprise proof", href: "/#enterprise" },
      { label: "Selected Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Download Resume", href: site.resumeHref },
      { label: "Contact (hiring)", href: "/contact?intent=hiring" },
    ],
  },
  {
    title: "Direct recruiter entry",
    steps: [
      { label: "Homepage", href: "/" },
      { label: "Download Resume", href: site.resumeHref },
      { label: "Contact (hiring)", href: "/contact?intent=hiring" },
    ],
  },
];

const strategyRoute = problemRoutes.find((route) => route.id === "strategy");
const strategyIntent = strategyRoute ? new URL(strategyRoute.href, "https://raghvendrasingh.com").searchParams.get("intent") : null;
const strategyResolved = resolveContactIntent(strategyIntent);

export const clientEvaluations: EvidenceItem[] = [
  {
    id: "understands-work",
    label: "Do I understand what Raghvendra does?",
    verdict: "PASS",
    evidence: `Hero plus Practice (“How I contribute”) lists ${services.map((service) => service.title).join(", ")}.`,
    href: "/#practice",
  },
  {
    id: "hire-for",
    label: "Can I understand what I can hire him for?",
    verdict: "PASS",
    evidence: `“What are you trying to solve?” lists: ${problemRoutes.map((route) => route.label).join("; ")}.`,
    href: "/#solve",
  },
  {
    id: "evidence",
    label: "Do I see credible evidence?",
    verdict: "PASS",
    evidence: `Enterprise: ${enterpriseNames}. Founder/product: ${featuredNames}. Case studies are written as what he did, not as company-wide KPIs.`,
    href: "/work",
  },
  {
    id: "enterprise-bg",
    label: "Do I understand his enterprise background?",
    verdict: "PASS",
    evidence: "Dedicated homepage enterprise section and an About chapter naming Verizon, Rapipay, Crowley.",
    href: "/#enterprise",
  },
  {
    id: "founder",
    label: "Do I see founder/product-building experience?",
    verdict: "PASS",
    evidence: `Selected Work is ${featuredNames}. About founder chapter names EQTY, Growing With Kid, Bolo Buddy.`,
    href: "/work",
  },
  {
    id: "right-service",
    label: "Can I identify the right service?",
    verdict: "PASS",
    evidence: `Product strategy and DesignOps routes land on “${contactIntents.find((item) => item.id === strategyResolved)?.label ?? strategyResolved}”. Workshop stays its own intent.`,
    href: "/contact?intent=advisory",
  },
  {
    id: "reach",
    label: "Can I reach him without confusion?",
    verdict: "PASS",
    evidence: "Each problem route and each practice card has a contact CTA with an intent query.",
    href: "/contact",
  },
  {
    id: "stop",
    label: "What would stop me from contacting him?",
    verdict: "WARNING",
    evidence:
      "Problem routes go straight to contact, not to a matching case study first. A founder who wants proof before a form has to find /work themselves. No fabricated social proof is shown.",
    missing: "Owner check: does the jump from problem → contact feel abrupt on a cold visit?",
    href: "/#solve",
  },
];

export const clientProblemTests = problemRoutes.map((route) => {
  const service = services.find((item) => item.slug === route.service);
  const intent = new URL(route.href, "https://raghvendrasingh.com").searchParams.get("intent");
  const resolved = resolveContactIntent(intent);
  return {
    id: route.id,
    label: route.label,
    href: route.href,
    service: service?.title ?? route.service,
    intent: resolved,
    verdict: "PASS" as Verdict,
    note: `Intent ${resolved} matches ${contactIntents.find((item) => item.id === resolved)?.label}.`,
  };
});

export const studentPath: EvidenceItem[] = [
  {
    id: "homepage-products",
    label: "Homepage surfaces products",
    verdict: "PASS",
    evidence: "Homepage includes the product shelf above the close.",
    href: "/",
  },
  {
    id: "index",
    label: "Products index lists the catalogue",
    verdict: "PASS",
    evidence: `/products is server-rendered. ${visibleProducts().length} public products.`,
    href: "/products",
  },
  {
    id: "detail",
    label: "Product detail exists",
    verdict: "PASS",
    evidence: "Each visible product has /products/[slug] with price, status, and CTA.",
    href: "/products",
  },
  {
    id: "demo",
    label: "Product demo",
    verdict: "WARNING",
    evidence:
      "Design IQ has a two-question public preview. Other product pages show a cover plus a demo note, not the entitled runtime. Full tools open at /tools/[slug] after entitlement or admin demo.",
    missing: "Use Product Lab Open Demo for the real tool. Do not treat the sales-page cover as the product.",
    href: "/admin/prelaunch/products",
  },
  {
    id: "purchase",
    label: "Purchase simulation",
    verdict: "WARNING",
    evidence: `Public CTA for live products is “${productCta(products.find((item) => item.status === "live")!).label}” while commerceMode is ${productCta(products.find((item) => item.status === "live")!).kind}. Simulation lives at /admin/prelaunch/commerce and does not call Razorpay.`,
    href: "/admin/prelaunch/commerce",
  },
  {
    id: "access",
    label: "Product access after purchase",
    verdict: "PASS",
    evidence: "/tools/[slug] is entitlement-gated. Admin demo is server-side isAdminEmail, not the query string. Library lists Open Product and Download for hybrids.",
    href: "/account/library",
  },
];

export function recruiterFunnelReport() {
  const items = recruiterChecklist;
  const parts = split(items);
  return { label: "Recruiter Funnel", score: scoreItems(items), ...parts, items };
}

export function clientFunnelReport() {
  const items = clientEvaluations;
  const parts = split(items);
  return { label: "Client Funnel", score: scoreItems(items), ...parts, items };
}

export function studentFunnelReport() {
  const items = studentPath;
  const parts = split(items);
  return { label: "Student Funnel", score: scoreItems(items), ...parts, items };
}
