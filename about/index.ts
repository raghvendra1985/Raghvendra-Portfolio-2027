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
};

export const aboutPage: AboutPage = {
  title: "About",
  description:
    "Design leader and AI strategist. Associate Professor at IIAD. 20 years at the intersection of architecture, logic, and humanism.",
  heroTitle: "20 years at the intersection of architecture, logic, and humanism.",
  heroDescription:
    "Design leader and AI strategist. Associate Professor at IIAD. I build product ecosystems and DesignOps frameworks where structural logic governs every interface.",
  stats: [
    { label: "Years active", value: "20+" },
    { label: "Enterprise clients", value: "9" },
    { label: "Students taught", value: "500+" },
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
      id: "iiad",
      range: "2022 — Present",
      role: "Associate Professor",
      org: "IIAD · New Delhi",
      description:
        "Leading industrial design pedagogy and AI implementation research. Teaching as research — students are the fastest feedback loop for what actually matters in practice.",
    },
    {
      id: "rapipay",
      range: "2018 — 2023",
      role: "Design Lead",
      org: "Rapipay · NYE Financial",
      description:
        "Design strategy for financial inclusion tools serving tens of millions of users. Modular design system architecture from zero to one, with WCAG built in.",
    },
    {
      id: "enterprise",
      range: "2012 — 2018",
      role: "Principal Architect",
      org: "UX · Enterprise Systems",
      description:
        "Complex enterprise systems for global logistics and transit. Data visualisation and information hierarchy for critical infrastructure.",
    },
    {
      id: "foundations",
      range: "2004 — 2012",
      role: "Foundations",
      org: "Digital India · Early Web",
      description:
        "Exploring the International Typographic Style in India’s early digital landscape — before design systems had a name.",
    },
  ],
};
