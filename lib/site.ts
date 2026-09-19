export const site = {
  name: "Raghvendra Singh",
  title: "Raghvendra Singh — Principal / Staff Product Designer",
  description:
    "Product designer who builds. I design complex digital products, build working software, and help teams turn ambiguous problems into useful systems. Principal / Staff Product Design · Remote / Hybrid.",
  url: "https://raghvendrasingh.com",
  email: "hello@raghvendrasingh.com",
  linkedin: "https://www.linkedin.com/in/raghvendrasingh23/",
  whatsapp: "https://wa.me/919555909094",
  location: "Delhi NCR, India",
  status: "Principal / Staff Product Design · Remote / Hybrid",
  statusDetail: "Remote / Hybrid · Delhi NCR and India considered.",
  /**
   * Recruiter PDF. Generated from /resume via `npm run resume:pdf`.
   */
  resumeHref: "/raghvendra-singh-resume.pdf",
  experienceLine: "20 years in design · 14+ years in digital product and UX",
  positioning: "Product designer who builds",
  capabilitySignature: "Design · Build · Teach",
  supportingProposition:
    "I design complex digital products, build working software, and help teams turn ambiguous problems into useful systems.",
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
  { label: "Build", href: "/build" },
  { label: "Teach", href: "/teaching" },
  { label: "About", href: "/about" },
  { label: "Writing", href: "/knowledge" },
  { label: "Products", href: "/products" },
  { label: "Let's talk", href: "/contact" },
  { label: "Approach", href: "/approach", hint: "How I frame, design, build, and validate" },
  { label: "System", href: "/system", hint: "How I think, decide, and operate" },
  { label: "Studio", href: "/studio", hint: "The room around the work" },
] as const;

export type NavLink = (typeof navLinks)[number];

const primaryHrefs = ["/work", "/build", "/teaching", "/about"] as const;
const menuHrefs = [
  "/work",
  "/build",
  "/teaching",
  "/about",
  "/knowledge",
  "/approach",
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
    { label: "Build", href: "/build" },
    { label: "Teach", href: "/teaching" },
    { label: "About", href: "/about" },
    { label: "Writing", href: "/knowledge" },
  ],
  more: [
    { label: "Approach", href: "/approach" },
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
