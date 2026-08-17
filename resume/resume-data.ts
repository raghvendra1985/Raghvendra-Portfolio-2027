import { site } from "../lib/site";

/**
 * Structured source for the recruiter PDF.
 * Contact, positioning, dates, employers, and claims must match
 * lib/site.ts, about/index.ts, case-studies/index.ts, and founder-os/index.ts.
 * Unverified items live in RESUME_DATA_GAPS.md — do not invent them here.
 */

export const resume = {
  name: site.name,
  headline: "Product Design Leader | AI Product Builder | Systems Thinker",
  location: site.location,
  experienceLine: site.experienceLine,
  email: site.email,
  portfolioUrl: site.url,
  portfolioLabel: "www.raghvendrasingh.com",
  linkedinUrl: site.linkedin,
  linkedinLabel: "www.linkedin.com/in/raghvendrasingh23",
  profile:
    "Product design leader with 20 years in design and 14+ years in digital product and UX. Work covers product strategy, complex enterprise systems, AI products, DesignOps, design systems, and hands-on product execution. Experience includes staff consulting and senior UX management at Nagarro Technology and Rapipay Fintech, selected enterprise client work at Verizon and Crowley Maritime, and founder-led products (EQTY, Growing With Kid, Bolo Buddy, GWK Ghostwriter). Prototypes and ships with AI-assisted development as a product designer — not as an ML engineer.",
  expertise: [
    {
      label: "Product",
      items:
        "Product Strategy · Product Design · UX/UI · Interaction Design · AI Product Design",
    },
    {
      label: "Systems",
      items:
        "Design Systems · DesignOps · Complex Workflows · Service Design · Systems Thinking",
    },
    {
      label: "Leadership",
      items:
        "Design Leadership · Team Development · Stakeholder Alignment · Workshops · Mentoring",
    },
    {
      label: "Building",
      items:
        "Prototyping · AI-assisted Development · Product Experiments · Frontend Collaboration",
    },
  ],
  experience: {
    page1: [
      {
        org: "Independent · EQTY · Growing With Kid · Bolo Buddy · GWK Ghostwriter",
        title: "Product Design Leader / Product Builder",
        dates: "2023 — Present",
        meta: "Delhi NCR, India · Remote",
        scope:
          "Product strategy, research, UX, AI interaction design, prototyping, product architecture, and hands-on building. Ventures are live and in motion — not claimed as proven commercial scale.",
        bullets: [
          "Shape EQTY as founding design partner: product strategy and experience architecture inside a modular fintech operating system — trust, workflow, and operator language.",
          "Build Growing With Kid as a parenting community product: research, content architecture, and constraint-led UX for Indian parents (live, 2020–present).",
          "Cofound Bolo Buddy, an AI-powered audio-first storytelling companion in Hindi, English, Hinglish, and Tamil — product, interaction design, and ongoing experimentation.",
          "Design and prototype GWK Ghostwriter, a personal AI LinkedIn studio with long-term memory and a research-to-post workflow. Working product in the portfolio.",
        ],
      },
      {
        org: "Rapipay Fintech",
        title: "Senior Manager UX",
        dates: "2022",
        meta: "Employer · Product design leadership · NYE Money",
        scope:
          "Led the product experience for NYE Money, Rapipay’s consumer financial super app — payments, banking, and investments in one system.",
        bullets: [
          "Led product design for prepaid wallet and RuPay card, UPI, NCMC transit, partner banking, digital gold, and mutual funds as one consumer surface.",
          "Framed the product as a money operating layer — spend, move, save, invest — with security and compliance visible in the journeys, not only in legal copy.",
          "Designed payment, banking onboarding, and investment surfaces to share one product grammar instead of splintering into disconnected features.",
          "Shipped as Rapipay’s live consumer finance product on web, iOS, and Android.",
        ],
      },
      {
        org: "Nagarro Technology",
        title: "Staff UX Consultant",
        dates: "2019 — 2023",
        meta: "Employer · Enterprise product consulting · Remote / on-site as required",
        scope:
          "Staff consulting across enterprise delivery — systems, product practice, and cross-functional work. Names below are selected client/project work, not employment by those companies.",
        bullets: [
          "Verizon (2021, 6 months, IC): designed a turnkey digital-signage system — compact media-player architecture and a cloud campaign portal that runs without depending on site Wi-Fi.",
          "Crowley Maritime (2023, 1 year, advisory): replaced a dense legacy freight-quote form with a guided origin-to-cargo-to-contact flow aligned with rate-engine and customs constraints; introduced the design system the platform still runs on.",
        ],
      },
    ],
    page2: [
      {
        org: "Sagacito",
        title: "Lead Designer",
        dates: "2020 · 2+ years",
        meta: "Full-time employment · Media revenue SaaS",
        scope:
          "Designed Ymax, Pgov, and RevX as one pre-sales-to-revenue pipeline for perishable print, TV, and digital inventory.",
        bullets: [
          "Designed pricing, automated proposal/product-mix, and approval-guardrail workflows so sales could meet campaign needs without leaking margin on perishable inventory.",
          "Connected pre-sales signals into revenue orchestration. The suite was implemented by major Indian media houses including Hindustan Times, Ananda Bazar Patrika, and PVR Cinemas.",
        ],
      },
      {
        org: "Product & enterprise practice",
        title: "UX Designer to UX Lead",
        dates: "2015 — 2019",
        meta: "Interaction design · product clarity · team craft",
        scope:
          "Grew from hands-on UX into lead responsibility across product and enterprise engagements.",
        bullets: [
          "Led interaction and product UX as the practice moved from screens into systems work across product and enterprise engagements.",
          "Selected project: Shuttl (2019, Staff Design Consultant, 3+ years) — end-to-end design system for rider, driver, and corporate mobility surfaces, including data-over-sound check-in for congested corridors.",
        ],
      },
    ],
  },
  selectedWork: [
    {
      name: "Verizon",
      detail: "2021 · Client project (consulting) · Digital signage / enterprise product systems",
      href: `${site.url}/work/verizon`,
    },
    {
      name: "Crowley Maritime",
      detail: "2023 · Client project (consulting) · Freight quoting / enterprise product",
      href: `${site.url}/work/crowley`,
    },
    {
      name: "Rapipay / NYE",
      detail: "2022 · Employer · Fintech product experience",
      href: `${site.url}/work/nye`,
    },
    {
      name: "Shuttl",
      detail: "2019 · Staff Design Consultant · Urban mobility design system",
      href: `${site.url}/work/shuttl`,
    },
    {
      name: "Hempel",
      detail: "2022 · Advisory (3 months) · B2B procurement workshops",
      href: `${site.url}/work/hempel`,
    },
    {
      name: "Sagacito",
      detail: "2020 · Employer · Media revenue SaaS",
      href: `${site.url}/work/sagacito`,
    },
  ],
  teachingRole: {
    org: "Indian Institute of Art & Design",
    title: "Associate Professor, Communication Design",
    dates: "Alongside founder work",
    meta: "Design education · curriculum · mentoring",
    bullets: [
      "Teach design through decisions and production-bar critiques. Modules run as sprints, with AI literacy in practice — not as a tool tutorial.",
      "Mentoring and workshops as part of the practice. 500+ students taught across teaching experience.",
    ],
  },
  education: [
    {
      school: "National Institute of Design",
      credential: "Master of Lifestyle Accessory Design",
      dates: "2008 — 2011",
    },
    {
      school: "Pearl Academy, New Delhi",
      credential: "Bachelor of Fashion Design",
      dates: "2004 — 2008",
    },
  ],
  tools: [
    { label: "Design", items: "Figma · Framer · Miro" },
    { label: "AI & Build", items: "Cursor · Claude · ChatGPT · Lovable · v0 · Bolt" },
    { label: "Development", items: "GitHub · HTML/CSS · Supabase · Vercel" },
    { label: "Product", items: "Notion · Jira · Linear" },
  ],
  workshops:
    "Design Thinking · UX/UI · Interaction Design · Data Visualisation · AI + Design · product thinking · mentoring.",
} as const;

export type ResumeData = typeof resume;
