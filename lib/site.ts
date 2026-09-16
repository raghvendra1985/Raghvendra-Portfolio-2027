export const site = {
  name: "Raghvendra Singh",
  title: "Raghvendra Singh — Product Design Leader + AI-Native Builder",
  description:
    "Product Design Leader + AI-Native Builder. I frame complex problems, design product systems, and build working experiences. Principal / Staff Product Designer · Remote / Hybrid.",
  url: "https://raghvendrasingh.com",
  email: "hello@raghvendrasingh.com",
  linkedin: "https://www.linkedin.com/in/raghvendrasingh23/",
  whatsapp: "https://wa.me/919555909094",
  location: "Delhi NCR, India",
  status: "Principal / Staff Product Designer · Remote / Hybrid",
  statusDetail:
    "Remote / Hybrid · Delhi NCR and India considered.",
  /**
   * Recruiter PDF. Generated from /resume via `npm run resume:pdf`.
   */
  resumeHref: "/raghvendra-singh-resume.pdf",
  experienceLine: "20 years in design · 14+ years in digital product and UX",
  positioning: "Product Design Leader + AI-Native Builder",
  capabilitySignature: "Lead · Design · Build · Teach",
  supportingProposition:
    "I frame complex problems, design product systems, and build working experiences.",
  /** Amazon.in Associates tracking ID. Set NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG on Vercel. */
  amazonAssociatesTag: process.env.NEXT_PUBLIC_AMAZON_ASSOCIATES_TAG ?? "",
  amazonStore: "https://www.amazon.in",
};

export function amazonProductUrl(asin: string) {
  const url = new URL(`/dp/${asin}`, site.amazonStore);
  if (site.amazonAssociatesTag) {
    url.searchParams.set("tag", site.amazonAssociatesTag);
  }
  return url.toString();
}

export function whatsappHref(text?: string) {
  if (!text) return site.whatsapp;
  const url = new URL(site.whatsapp);
  url.searchParams.set("text", text);
  return url.toString();
}

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Approach", href: "/approach" },
  { label: "Teaching", href: "/teaching" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/knowledge" },
  { label: "Products", href: "/products" },
  { label: "Work with me", href: "/contact" },
  { label: "System", href: "/system", hint: "How I think, decide, and operate" },
  { label: "Studio", href: "/studio", hint: "The room around the work" },
] as const;

export type NavLink = (typeof navLinks)[number];

const primaryHrefs = [
  "/work",
  "/approach",
  "/teaching",
  "/about",
  "/knowledge",
] as const;
const menuHrefs = [
  "/work",
  "/approach",
  "/teaching",
  "/about",
  "/knowledge",
  "/products",
  "/system",
  "/studio",
  "/contact",
] as const;

export const primaryNavLinks = primaryHrefs.map(
  (href) => navLinks.find((link) => link.href === href)!,
);

export const menuNavLinks = menuHrefs.map(
  (href) => navLinks.find((link) => link.href === href)!,
);

export const footerLinks = {
  sitemap: [
    { label: "Work", href: "/work" },
    { label: "Approach", href: "/approach" },
    { label: "Teaching", href: "/teaching" },
    { label: "About", href: "/about" },
    { label: "Writing", href: "/knowledge" },
  ],
  more: [
    { label: "Products", href: "/products" },
    { label: "System", href: "/system" },
    { label: "Studio", href: "/studio" },
    { label: "Contact", href: "/contact" },
  ],
  social: [
    {
      label: "Email",
      href: `mailto:${site.email}`,
      ariaLabel: `Email ${site.name} at ${site.email}`,
    },
    {
      label: "LinkedIn",
      href: site.linkedin,
      ariaLabel: `${site.name} on LinkedIn (opens in a new tab)`,
    },
    {
      label: "WhatsApp",
      href: site.whatsapp,
      ariaLabel: `Message ${site.name} on WhatsApp (opens in a new tab)`,
    },
  ],
};
