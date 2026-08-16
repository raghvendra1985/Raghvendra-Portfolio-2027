export type Belief = {
  index: string;
  title: string;
  description: string;
};

export type TimelineEra = {
  id: string;
  range: string;
  role: string;
  org: string;
  description: string;
};

export type AboutPage = {
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  beliefs: Belief[];
  timeline: TimelineEra[];
  stats: { label: string; value: string }[];
  chapters: { title: string; body: string }[];
  glimpse: {
    body: string;
    beats: readonly string[];
    cta: string;
    href: string;
  };
};

export const aboutPage: AboutPage = {
  title: "About",
  description:
    "Product design leader, systems thinker, and AI product builder. 20 years in design · 14+ years in digital product and UX. I work across complex products, operating systems, AI experiences, and founder-led ventures.",
  heroTitle: "20 years in design · 14+ years in digital product and UX.",
  heroDescription:
    "Product design leader first. Then systems thinker and AI product builder — with founder work and teaching as supporting proof. I work across product strategy, systems, AI products, design operations, and hands-on product building.",
  stats: [
    { label: "Years in design", value: "20" },
    { label: "Years in digital product & UX", value: "14+" },
    { label: "Students taught", value: "500+" },
  ],
  chapters: [
    {
      title: "Product design leadership",
      body: "Strategy, systems, DesignOps, and hands-on product execution — the primary identity.",
    },
    {
      title: "Enterprise experience",
      body: "Staff consulting and product leadership inside large organisations — Verizon, Rapipay, Crowley, and related systems work.",
    },
    {
      title: "AI product building",
      body: "AI used as product craft: workflows, trust, and judgment boundaries in live products such as GWK Ghostwriter and Bolo Buddy.",
    },
    {
      title: "Founder experience",
      body: "EQTY, Growing With Kid, Bolo Buddy, and other founder-led products shipped alongside client work.",
    },
    {
      title: "Teaching and mentoring",
      body: "500+ students taught. Workshops, critique practice, and design leadership development.",
    },
  ],
  beliefs: [
    {
      index: "01",
      title: "Design is infrastructure, not decoration.",
      description:
        "The visual layer is the last 10%. The preceding 90% is architecture, governance, and intent.",
    },
    {
      index: "02",
      title: "Systems are the deliverable, not artefacts.",
      description:
        "Individual screens are artefacts. The system that generates them consistently at scale is the only thing worth building.",
    },
    {
      index: "03",
      title: "AI amplifies human judgment, not replaces it.",
      description:
        "The question is never “can AI do this?” The question is “which judgment should remain human?”",
    },
    {
      index: "04",
      title: "Transparency is a competitive advantage.",
      description:
        "Transparent pricing, process, and constraints. Clients who know what they are buying make better decisions.",
    },
    {
      index: "05",
      title: "Children deserve tools built for them.",
      description:
        "Bolo Buddy was built from first principles for children aged 2–8 — not an adult product scaled down.",
    },
    {
      index: "06",
      title: "The grid is not a constraint. It is freedom.",
      description:
        "Swiss typographic style is the only system that scales from a business card to enterprise software without losing integrity.",
    },
  ],
  timeline: [
    {
      id: "founder",
      range: "2023 — Now",
      role: "Founder / Product Design Leader",
      org: "EQTY · GWK Ghostwriter · Growing With Kid · Bolo Buddy",
      description:
        "Building products, systems, and ventures. Teaching continues alongside founder and product leadership work.",
    },
    {
      id: "leadership-arc",
      range: "2019 — 2023",
      role: "Staff UX Consultant → Senior Manager UX",
      org: "Nagarro Technology · Rapipay Fintech",
      description:
        "From staff consulting across enterprise delivery to senior UX management in fintech — systems, product practice, and cross-functional leadership.",
    },
    {
      id: "ux-lead-arc",
      range: "2015 — 2019",
      role: "UX Designer → UX Lead",
      org: "Product & enterprise practice",
      description:
        "Growing from hands-on UX into lead responsibility — interaction design, product clarity, and team craft.",
    },
    {
      id: "product-industrial",
      range: "2011 — 2015",
      role: "Product & Industrial Design",
      org: "Practice building toward systems work",
      description:
        "Product and industrial design practice that built the foundation for systems thinking and product leadership.",
    },
    {
      id: "foundations",
      range: "2004 — 2011",
      role: "Design Foundations",
      org: "Early web · typographic craft",
      description:
        "Exploring the International Typographic Style in India’s early digital landscape — before design systems had a name.",
    },
  ],
  glimpse: {
    body: "I design systems for products. At home I keep living ones: animals, a balcony garden, a bike, and a shelf that changes what I notice.",
    beats: ["Pets", "Garden", "Cycling", "Reading"],
    cta: "Inside the studio",
    href: "/studio",
  },
};
