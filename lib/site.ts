export const site = {
  name: "Raghvendra Singh",
  title: "Raghvendra Singh — Product Design Leader",
  description:
    "Product Design Leader, Systems Thinker, and AI Product Builder. 20 years in design · 14+ years in digital product and UX. Enterprise systems, AI products, and founder-led work — Verizon, Rapipay, EQTY, and more.",
  url: "https://raghvendrasingh.com",
  email: "hello@raghvendrasingh.com",
  linkedin: "https://www.linkedin.com/in/raghvendrasingh23/",
  whatsapp: "https://wa.me/919555909094",
  location: "Faridabad, India · Remote worldwide",
  status: "Open to selected opportunities",
  statusDetail:
    "Available for remote product leadership, advisory, and selected collaborations.",
  /** Set when a PDF is added at this public path. Resume CTAs request via contact until then. */
  resumeHref: null as string | null,
  experienceLine: "20 years in design · 14+ years in digital product and UX",
  positioning: "Product Design Leader · Systems Thinker · AI Product Builder",
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
  { label: "System", href: "/system" },
  { label: "About", href: "/about" },
  { label: "Studio", href: "/studio" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const primaryHrefs = ["/work", "/products", "/about", "/contact"] as const;

export const primaryNavLinks = primaryHrefs.map(
  (href) => navLinks.find((link) => link.href === href)!,
);

export const footerLinks = {
  sitemap: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "System", href: "/system" },
    { label: "About", href: "/about" },
    { label: "Studio", href: "/studio" },
    { label: "Knowledge", href: "/knowledge" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],
  social: [
    { label: "LinkedIn", href: site.linkedin },
    { label: "Email", href: `mailto:${site.email}` },
    { label: "WhatsApp", href: site.whatsapp },
  ],
};
