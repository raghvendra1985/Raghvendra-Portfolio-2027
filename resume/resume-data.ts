import { site } from "../lib/site";

/**
 * Structured source for the recruiter PDF.
 * Contact, positioning, dates, employers, and claims must match
 * lib/site.ts, about/index.ts, case-studies/index.ts, and founder-os/index.ts.
 * Unverified items live in RESUME_DATA_GAPS.md — do not invent them here.
 *
 * Employment chronology is CV-backed (user-confirmed May 2026 draft inputs).
 * Project-specific years for Verizon/Crowley and design-system longevity claims
 * remain pending — omit until clarified.
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
    "Product design leader with 20 years in design and 14+ years in digital product and UX — strategy, enterprise systems, AI products, DesignOps, and hands-on execution. Nagarro Technology (Staff UX Consultant, Jul 2019 — Feb 2022), RapiPay Fintech (Senior Manager UX, Feb 2022 — Apr 2023), Elevate Innovation (Principal Product Design Consultant, May 2023 — Present). Selected Nagarro client work: Verizon and Crowley Maritime. Builds founder products (EQTY, Growing With Kid, Bolo Buddy, GWK Ghostwriter) with AI-assisted development as a product designer — not an ML engineer.",
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
        org: "Elevate Innovation",
        title: "Principal Product Design Consultant / Product Builder",
        dates: "May 2023 — Present",
        meta: "Independent consulting practice · Delhi NCR · IIAD teaching alongside",
        scope:
          "Product strategy, UX, AI interaction design, prototyping, and hands-on building. Ventures are live — not claimed as proven commercial scale.",
        bullets: [
          "EQTY (founding design partner): product strategy and experience architecture for a modular fintech operating system.",
          "Growing With Kid and Bolo Buddy: parenting community and AI audio storytelling products — research, UX, and ongoing experimentation.",
          "GWK Ghostwriter: AI LinkedIn studio with long-term memory and a research-to-post workflow.",
        ],
      },
      {
        org: "RapiPay Fintech Pvt. Ltd",
        title: "Senior Manager UX",
        dates: "Feb 2022 — Apr 2023",
        meta: "Employer · Employment · NYE Money",
        scope:
          "Led the product experience for NYE Money — payments, banking, and investments in one consumer system.",
        bullets: [
          "Led product design for wallet/RuPay, UPI, NCMC, partner banking, digital gold, and mutual funds as one consumer surface.",
          "Kept security and compliance visible in money journeys while unifying onboarding and trust patterns across squads.",
          "Documented engagement design for NYE Money as Rapipay’s consumer finance product — live on web, iOS, and Android.",
        ],
      },
      {
        org: "Nagarro Technology Pvt. Ltd",
        title: "Staff UX Consultant",
        dates: "Jul 2019 — Feb 2022",
        meta: "Employer · Enterprise consulting · Selected clients below via Nagarro",
        scope:
          "Staff consulting across enterprise delivery. Client names are project work through Nagarro — not employment by those companies. Project years omitted until confirmed.",
        bullets: [
          "Verizon (Nagarro client · IC): turnkey digital-signage architecture and cloud campaign portal without site Wi-Fi dependency.",
          "Crowley Maritime (Nagarro client · advisory): experience architecture for a guided freight-quote flow (origin → cargo → contact); design-system documentation contributed with product partners during the engagement.",
        ],
      },
    ],
    page2: [
      {
        org: "Shuttl",
        title: "Lead UX Designer",
        dates: "Nov 2018 — Mar 2019",
        meta: "Employer · Urban mobility",
        bullets: [
          "Lead UX across rider, driver, and corporate surfaces, including field-constrained check-in journeys.",
        ],
      },
      {
        org: "Sagacito Technologies Pvt. Ltd",
        title: "Lead UX Designer",
        dates: "Oct 2016 — Nov 2018",
        meta: "Employer · Media revenue SaaS",
        bullets: [
          "Designed Ymax, Pgov, and RevX as one pre-sales-to-revenue pipeline for perishable print, TV, and digital inventory.",
          "Implemented by major Indian media houses including Hindustan Times, Ananda Bazar Patrika, and PVR Cinemas.",
        ],
      },
      {
        org: "Earlier practice",
        title: "UX Designer · Senior Designer · Product design",
        dates: "Jan 2011 — Sep 2016",
        meta: "Zopper · Pigeon India · Konnecting Mindz · Klove Design · VIP Caprese",
        bullets: [
          "Zopper – Solvy Tech (Nov 2015 — Sep 2016), User Experience Designer.",
          "Pigeon India (Jun 2013 — Oct 2015), Senior Designer; Konnecting Mindz freelance UX part-time (Dec 2013 — Dec 2014).",
          "Klove Design (Jan 2012 — May 2013), Senior Designer / Production In-charge; VIP Industries – Caprese product design project (Jan 2011 — Nov 2011).",
        ],
      },
    ],
  },
  selectedWork: [
    {
      name: "Verizon",
      detail:
        "Nagarro client project · Digital signage / enterprise product systems",
      href: `${site.url}/work/verizon`,
    },
    {
      name: "Crowley Maritime",
      detail: "Nagarro client project · Freight quoting / enterprise product",
      href: `${site.url}/work/crowley`,
    },
    {
      name: "Rapipay / NYE",
      detail: "Feb 2022 — Apr 2023 · Employer · Fintech product experience",
      href: `${site.url}/work/nye`,
    },
    {
      name: "Shuttl",
      detail: "Nov 2018 — Mar 2019 · Employer · Lead UX Designer · Urban mobility",
      href: `${site.url}/work/shuttl`,
    },
    {
      name: "Hempel",
      detail: "Advisory · B2B procurement workshops",
      href: `${site.url}/work/hempel`,
    },
    {
      name: "Sagacito",
      detail: "Oct 2016 — Nov 2018 · Employer · Media revenue SaaS",
      href: `${site.url}/work/sagacito`,
    },
  ],
  teachingRole: {
    org: "Indian Institute of Art & Design",
    title: "Associate Professor, Communication Design",
    dates: "Alongside consulting practice",
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
