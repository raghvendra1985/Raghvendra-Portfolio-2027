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
  location: "Based in Delhi NCR, working remotely.",
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
      id: "founder",
      range: "2023 — Now",
      role: "Founder / Product Design Leader",
      org: "EQTY · GWK Ghostwriter · Growing With Kid · Bolo Buddy",
      context: "Building the systems, products, and ventures I once advised others to build.",
      owned:
        "Through EQTY, GWK Ghostwriter, Growing With Kid, and Bolo Buddy, I work across product direction, interaction design, AI workflows, and execution. Teaching continues alongside the ventures.",
      learned:
        "Founder work made the feedback loop shorter: the strategy must survive contact with users, technology, operations, and the market. This chapter keeps me accountable to shipping.",
      evidence: { label: "Selected evidence", href: "/work/eqty" },
    },
    {
      id: "leadership-arc",
      range: "2019 — 2023",
      role: "Staff UX Consultant → Senior Manager UX",
      org: "Nagarro Technology · Rapipay Fintech",
      context: "Learning to design through organisations, not only interfaces.",
      owned:
        "Across enterprise consulting and UX leadership I worked inside financial services, telecommunications, and operational platforms — including NYE Money at Rapipay, and client systems at Verizon and Crowley. The central challenge was rarely one screen; it was helping product, design, technology, and business teams make compatible decisions.",
      learned: "This chapter taught me that alignment is part of the product.",
      evidence: { label: "Selected evidence", href: "/work/nye" },
    },
    {
      id: "ux-lead-arc",
      range: "2015 — 2019",
      role: "UX Designer → UX Lead",
      org: "Product & enterprise practice",
      context: "Moving from individual experiences to connected product systems.",
      owned:
        "I grew from hands-on UX execution into responsibility for product direction, critique, team quality, and cross-functional delivery.",
      learned:
        "I began seeing how small interaction decisions accumulate into larger organisational systems. This chapter taught me to connect detail with direction.",
    },
    {
      id: "product-industrial",
      range: "2011 — 2015",
      role: "Product & Industrial Design",
      org: "Practice building toward systems work",
      context: "Discovering that useful objects begin with constraints.",
      owned:
        "Working across product and industrial design taught me to respect materials, manufacturing, ergonomics, and real-world use.",
      learned:
        "Unlike pixels, physical decisions cannot be endlessly revised after release. This chapter gave me a bias toward clarity, durability, and making.",
    },
    {
      id: "foundations",
      range: "2004 — 2011",
      role: "Design Foundations",
      org: "Early web · typographic craft",
      context: "Learning to see, organise, and communicate.",
      owned:
        "My early work in visual design, typography, and the web formed the habits that remain underneath everything I do.",
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
      body: "Product direction, teams, critique, and cross-functional alignment — including enterprise work at Rapipay, Verizon, and Crowley.",
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
    "Twenty years across visual, industrial, product, and organisational design — with recent work spanning enterprise systems, AI products, founder ventures, and design education.",
  hiringPrimary: { label: "Start a conversation", href: "/contact" },
  hiringWork: { label: "View selected work", href: "/work" },
};
