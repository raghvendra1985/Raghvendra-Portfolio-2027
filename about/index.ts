export type EvidenceLink = {
  label: string;
  href: string;
};

export type Belief = {
  index: string;
  title: string;
  description: string;
  weight: "primary" | "supporting";
  evidence: EvidenceLink;
};

export type TimelineEra = {
  id: string;
  range: string;
  role: string;
  org: string;
  context: string;
  owned: string;
  learned: string;
  evidence?: EvidenceLink;
};

export type PracticeMode = {
  title: string;
  body: string;
};

export type AboutStat = {
  value: string;
  unit: string;
  label: string;
};

export type GlimpseBeat = {
  label: string;
  src: string;
  alt: string;
  caption: string;
};

export type AboutPage = {
  title: string;
  description: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  identity: string;
  location: string;
  workspaceCaption: string;
  beliefs: Belief[];
  timeline: TimelineEra[];
  stats: AboutStat[];
  modesIntro: string;
  modes: PracticeMode[];
  leadTitle: string;
  leadDeck: string;
  leadBody: string;
  leadBehaviors: { title: string; body: string }[];
  leadCritique: EvidenceLink;
  teachingTitle: string;
  teachingBody: string;
  teachingEvidence: EvidenceLink;
  hiringTitle: string;
  hiringBody: string;
  hiringPrimary: EvidenceLink;
  hiringWork: EvidenceLink;
  glimpse: {
    body: string;
    note: string;
    beats: GlimpseBeat[];
    cta: string;
    href: string;
  };
};

export const aboutPage: AboutPage = {
  title: "About",
  description:
    "Twenty years of learning where design actually happens — from visual craft and industrial constraints through digital products and organisational decisions, into founder work and teaching.",
  heroEyebrow: "About",
  heroTitle: "Twenty years of learning where design actually happens.",
  heroDescription:
    "I began by designing graphics and physical objects, moved into digital products and enterprise systems, and eventually began building companies and teaching designers. The mediums changed. The direction did not: understand the real problem, create shared clarity, and stay close enough to the work to make it useful.",
  identity: "Product design leader · Systems thinker · Hands-on builder",
  location: "Based in Delhi NCR.",
  workspaceCaption:
    "My desk in Delhi NCR — standing desk, dual screens, boom microphone, yellow shelves, and the helmet from the morning ride.",
  stats: [
    {
      value: "20",
      unit: "Years",
      label: "Across visual, industrial, product, and organisational design",
    },
    {
      value: "14+",
      unit: "Years",
      label: "Leading and building digital products and UX systems",
    },
    {
      value: "500+",
      unit: "Designers",
      label: "Taught through classrooms, workshops, and mentoring",
    },
  ],
  timeline: [
    {
      id: "elevate",
      range: "May 2023 — Present",
      role: "Principal Product Design Consultant / Product Builder",
      org: "Elevate Innovation",
      context:
        "Independent consulting practice — product building, advisory work, and teaching alongside the practice.",
      owned:
        "Through Elevate Innovation I build and advise on product systems, including founder products (EQTY, GWK Ghostwriter, Growing With Kid, Bolo Buddy). Teaching at IIAD sits alongside this practice.",
      learned:
        "Independent practice shortened the feedback loop: strategy must survive users, technology, operations, and the market. This chapter keeps me accountable to shipping.",
      evidence: { label: "Selected evidence", href: "/work/eqty" },
    },
    {
      id: "rapipay",
      range: "Feb 2022 — Apr 2023",
      role: "Senior Manager UX",
      org: "RapiPay Fintech Pvt. Ltd",
      context: "Employment — UX leadership for NYE Money at organisational scale.",
      owned:
        "Led the consumer experience for NYE Money across wallet, UPI, partner banking, and investments. The central challenge was helping product, design, technology, and business teams share one product grammar — not only shipping individual screens.",
      learned: "This chapter taught me that alignment is part of the product.",
      evidence: { label: "Selected evidence", href: "/work/nye" },
    },
    {
      id: "nagarro",
      range: "Jul 2019 — Feb 2022",
      role: "Staff UX Consultant",
      org: "Nagarro Technology Pvt. Ltd",
      context:
        "Employer · enterprise product consulting. Selected client work below was delivered through Nagarro — not employment by those companies.",
      owned:
        "Staff consulting across enterprise delivery — systems, product practice, and cross-functional work. Selected client projects include Verizon (digital signage) and Crowley Maritime (freight quoting), delivered through Nagarro.",
      learned:
        "Enterprise consulting taught me to design through organisations and constraints I did not own end-to-end.",
      evidence: { label: "Selected evidence", href: "/work/crowley" },
    },
    {
      id: "ux-lead-arc",
      range: "Nov 2015 — Mar 2019",
      role: "User Experience Designer → Lead UX Designer",
      org: "Zopper · Sagacito Technologies · Shuttl",
      context: "Moving from individual experiences to connected product systems.",
      owned:
        "Zopper (Nov 2015 — Sep 2016) as User Experience Designer; Sagacito Technologies (Oct 2016 — Nov 2018) as Lead UX Designer on media revenue products; Shuttl (Nov 2018 — Mar 2019) as Lead UX Designer on urban mobility surfaces.",
      learned:
        "I began seeing how small interaction decisions accumulate into larger product systems. This chapter taught me to connect detail with direction.",
      evidence: { label: "Selected evidence", href: "/work/sagacito" },
    },
    {
      id: "product-industrial",
      range: "Jan 2011 — Oct 2015",
      role: "Product & Industrial Design",
      org: "VIP Industries (Caprese) · Klove Design · Pigeon India · Konnecting Mindz",
      context: "Discovering that useful objects begin with constraints.",
      owned:
        "VIP Industries — Caprese product design project (Jan 2011 — Nov 2011); Klove Design as Senior Designer / Production In-charge (Jan 2012 — May 2013); Pigeon India as Senior Designer (Jun 2013 — Oct 2015); Konnecting Mindz as freelance UX design consultant, part-time (Dec 2013 — Dec 2014, alongside Pigeon).",
      learned:
        "Unlike pixels, physical decisions cannot be endlessly revised after release. This chapter gave me a bias toward clarity, durability, and making.",
    },
    {
      id: "foundations",
      range: "2004 — 2011",
      role: "Design Foundations",
      org: "Pearl Academy · National Institute of Design · early web craft",
      context: "Learning to see, organise, and communicate.",
      owned:
        "Formal study and early work in visual design, typography, and the web formed the habits that remain underneath everything I do.",
      learned:
        "Attention to hierarchy, respect for the grid, and the belief that clarity is constructed. This chapter gave me my visual language.",
    },
  ],
  leadTitle: "How I lead",
  leadDeck: "Direction without distance.",
  leadBody:
    "I create enough structure for teams to make coherent decisions without waiting for permission. That means making priorities visible, improving critique, clarifying ownership, and staying close enough to the product to understand where the system is failing.",
  leadBehaviors: [
    {
      title: "Make decisions legible",
      body: "Teams move faster when priorities, trade-offs, and ownership are visible.",
    },
    {
      title: "Build critique into the system",
      body: "Quality should not depend on one leader reviewing every screen.",
    },
    {
      title: "Stay close to the work",
      body: "Leadership is not distance from execution. It is responsibility for the conditions in which execution succeeds.",
    },
  ],
  leadCritique: {
    label: "How critique becomes a system",
    href: "/knowledge/critique-system",
  },
  modesIntro:
    "These are not separate careers. They are different ways I apply the same practice: finding structure, improving decisions, and remaining accountable to what gets built.",
  modes: [
    {
      title: "Lead",
      body: "Product direction, teams, critique, and cross-functional alignment — including Rapipay employment and Nagarro client work at Verizon and Crowley.",
    },
    {
      title: "Design systems",
      body: "Complex workflows, experience architecture, DesignOps, and scalable patterns. Organisational systems work lives here, not as a separate identity.",
    },
    {
      title: "Build",
      body: "Founder-led and AI-native products, from framing through launch — EQTY, GWK Ghostwriter, Growing With Kid, and Bolo Buddy.",
    },
    {
      title: "Teach",
      body: "Workshops, mentoring, classrooms, and shared professional language. Teaching is how the practice stays precise.",
    },
  ],
  beliefs: [
    {
      index: "01",
      title: "Design is infrastructure, not decoration.",
      description:
        "The visual layer comes last. Architecture, governance, and intent come first.",
      weight: "primary",
      evidence: { label: "See this in EQTY", href: "/work/eqty" },
    },
    {
      index: "02",
      title: "Systems are the deliverable, not artefacts.",
      description:
        "Individual screens are artefacts. The system that generates them consistently at scale is the only thing worth building.",
      weight: "primary",
      evidence: { label: "See this in Rapipay", href: "/work/nye" },
    },
    {
      index: "03",
      title: "AI amplifies human judgment. It does not replace it.",
      description:
        "The question is never “can AI do this?” The question is “which judgment should remain human?”",
      weight: "primary",
      evidence: { label: "See this in GWK Ghostwriter", href: "/work/gwk-ghostwriter" },
    },
    {
      index: "04",
      title: "Transparency is a competitive advantage.",
      description:
        "Transparent pricing, process, and constraints. Clients who know what they are buying make better decisions.",
      weight: "supporting",
      evidence: { label: "See this in Studio tools", href: "/products" },
    },
    {
      index: "05",
      title: "Children deserve tools built for them.",
      description:
        "Bolo Buddy was built from first principles for children aged 2–8 — not an adult product scaled down.",
      weight: "supporting",
      evidence: { label: "See this in Bolo Buddy", href: "/work/bolo-buddy" },
    },
    {
      index: "06",
      title: "The grid is not a constraint. It is freedom.",
      description:
        "Swiss typographic style is the only system that scales from a business card to enterprise software without losing integrity.",
      weight: "supporting",
      evidence: { label: "See this in the studio", href: "/studio" },
    },
  ],
  teachingTitle: "Teaching made my design practice more precise.",
  teachingBody:
    "When an idea has to survive a classroom, it cannot depend on authority or jargon. Teaching more than 500 designers strengthened how I explain decisions, structure critique, and create shared language inside teams. Critique and shared language are leadership, not a side hustle.",
  teachingEvidence: {
    label: "What students say",
    href: "/teaching",
  },
  glimpse: {
    body: "I design systems for products. At home I keep living ones: animals, a balcony garden, a bike, and a shelf that changes what I notice.",
    note: "These are the parts of my life that do not need to become a framework.",
    beats: [
      {
        label: "Pets",
        src: "/assets/studio/pets/bingo.jpg",
        alt: "Bingo, a dog at home.",
        caption: "Bingo. Care creates routine.",
      },
      {
        label: "Cycling",
        src: "/assets/studio/rides/01.jpg",
        alt: "After a ride, standing next to a Giant Talon mountain bike with helmet in hand.",
        caption: "A Giant Talon and Faridabad mornings.",
      },
      {
        label: "Reading",
        src: "/assets/studio/books/thinking-in-systems.png",
        alt: "Thinking in Systems by Donella Meadows.",
        caption: "The shelf changes what I notice.",
      },
    ],
    cta: "See the room around the work",
    href: "/studio",
  },
  hiringTitle: "Product design leadership, with evidence attached.",
  hiringBody:
    "Seeking full-time Design Manager or Senior Design Manager roles. Twenty years across visual, industrial, product, and organisational design — with recent work spanning Rapipay, Nagarro enterprise clients, independent practice, and design education.",
  hiringPrimary: { label: "Start a conversation", href: "/contact" },
  hiringWork: { label: "View selected work", href: "/work" },
};
