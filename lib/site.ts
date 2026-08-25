export const site = {
  name: "Raghvendra Singh",
  title: "Raghvendra Singh — Product Design Leader",
  description:
    "Product Design Leader, Systems Thinker, and AI Product Builder. 20 years in design · 14+ years in digital product and UX. Enterprise systems, AI products, and founder-led work — Verizon, Rapipay, EQTY, and more.",
  url: "https://raghvendrasingh.com",
  email: "hello@raghvendrasingh.com",
  linkedin: "https://www.linkedin.com/in/raghvendrasingh23/",
  whatsapp: "https://wa.me/919555909094",
  location: "Delhi NCR, India · Working remotely",
  status: "Open to selected opportunities",
  statusDetail:
    "Remote product leadership, advisory, and thoughtfully matched collaborations.",
  /**
   * Recruiter PDF. Generated from /resume via `npm run resume:pdf`.
   */
  resumeHref: "/raghvendra-singh-resume.pdf",
  experienceLine: "20 years in design · 14+ years in digital product and UX",
  positioning: "Product design leader · Systems thinker · Hands-on builder",
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
  { label: "About", href: "/about" },
  { label: "Notes", href: "/knowledge" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
  { label: "System", href: "/system", hint: "How I think, decide, and operate" },
  { label: "Studio", href: "/studio", hint: "The room around the work" },
] as const;

export type NavLink = (typeof navLinks)[number];

const primaryHrefs = ["/work", "/about", "/knowledge", "/products"] as const;
const menuHrefs = ["/contact", "/system", "/studio"] as const;

export const primaryNavLinks = primaryHrefs.map(
  (href) => navLinks.find((link) => link.href === href)!,
);

export const menuNavLinks = menuHrefs.map(
  (href) => navLinks.find((link) => link.href === href)!,
);

export const footerLinks = {
  sitemap: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Notes", href: "/knowledge" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],
  social: [
    { label: "Email", href: `mailto:${site.email}` },
    { label: "LinkedIn", href: site.linkedin },
    { label: "WhatsApp", href: site.whatsapp },
  ],
};
