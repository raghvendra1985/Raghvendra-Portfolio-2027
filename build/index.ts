export type BuildProject = {
  slug: string;
  title: string;
  year: string;
  role: string;
  status: string;
  problem: string;
  build: string;
  stack: string;
  learning: string;
  href: string;
  cover?: string;
};

export const buildPage = {
  title: "Build",
  description:
    "Product designer → product builder. Compact stories of ideas that became working software.",
  heroEyebrow: "Build",
  heroTitle: "I like making things, not stopping at the prototype.",
  heroDescription:
    "Builder capability means turning product decisions into working software. Tools are evidence of the workflow — not the positioning.",
  definition: {
    term: "AI Product Builder",
    body: "A product designer who can move from product intent to working software.",
  },
  projects: [
    {
      slug: "gwk-ghostwriter",
      title: "GWK Ghostwriter",
      year: "2026",
      role: "Founder / product builder",
      status: "Live prototype",
      problem:
        "Generic AI tools forgot voice, sources, and what worked — LinkedIn drafts drifted every session.",
      build:
        "Memory-backed research-to-post studio with voice rules, source handling, and human approval before publish.",
      stack:
        "[CONTENT REQUIRED] Verified stack for models, hosting, and tooling.",
      learning:
        "Voice rules as system state reduce drift more than longer prompts.",
      href: "/work/gwk-ghostwriter",
      cover: "/assets/work/gwk-ghostwriter/cover.png",
    },
    {
      slug: "growing-with-kid",
      title: "Growing With Kid",
      year: "2020–present",
      role: "Founder / product builder",
      status: "Live",
      problem:
        "Urban Indian parents facing a recurring evening decision — what advice to trust tonight.",
      build:
        "Community and editorial product: newsletter, guides, and conversations before software sprawl.",
      stack: "[CONTENT REQUIRED] Verified stack used to ship Growing With Kid.",
      learning:
        "Constraint as editor: fewer features forced sharper jobs.",
      href: "/work/growing-with-kid",
      cover: "/assets/work/growing-with-kid/cover.png",
    },
    {
      slug: "bolo-buddy",
      title: "Bolo Buddy",
      year: "2023–present",
      role: "Cofounder",
      status: "Live",
      problem:
        "Indian parents wanting screen-free bedtime stories in Hindi, English, Hinglish, or Tamil.",
      build:
        "Audio-first storytelling companion with language, safety, and parent controls as product constraints.",
      stack: "[CONTENT REQUIRED] Verified stack used to ship Bolo Buddy.",
      learning:
        "Clear refusals — not open-ended chat, not infinite video — are part of the design.",
      href: "/work/bolo-buddy",
      cover: "/assets/work/bolo-buddy/cover.png",
    },
  ] satisfies BuildProject[],
  close: {
    title: "See how the practice shows up in product work.",
    primary: { label: "View selected work", href: "/work" },
    secondary: { label: "Let's talk", href: "/contact" },
  },
} as const;
