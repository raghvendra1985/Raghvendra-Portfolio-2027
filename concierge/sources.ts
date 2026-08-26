import { aboutPage } from "@/about";
import { caseStudies, contributionGroupLabels } from "@/case-studies";
import { founderOs, osModules } from "@/founder-os";
import {
  getFrameworkArticle,
  knowledgeArticles,
  knowledgeFrameworks,
} from "@/knowledge";
import { services } from "@/services";
import { site } from "@/lib/site";
import { visibleProducts } from "@/products";
import type { ConciergeEntry } from "./types";

function uniq(topics: string[]) {
  return [...new Set(topics.map((t) => t.trim()).filter(Boolean))];
}

function buildWorkEntries(): ConciergeEntry[] {
  return caseStudies.map((study) => {
    const groupLabel = contributionGroupLabels[study.contributionGroup];
    const narrative = [
      study.role,
      study.engagement,
      study.contribution,
      study.challenge,
      ...(study.approachSteps ?? []),
      ...(study.outcomes?.flatMap((o) => [o.title, o.body]) ?? []),
    ]
      .filter(Boolean)
      .join(" ");

    const url =
      study.tier === "flagship"
        ? `/work/${study.slug}`
        : study.href ?? `/work`;

    return {
      id: `work:${study.slug}`,
      source: "work" as const,
      type: study.tier === "flagship" ? "case-study" : "selected-work",
      title: `${study.client} — ${study.title}`,
      slug: study.slug,
      topics: uniq([
        study.contributionGroup,
        groupLabel,
        study.evidence,
        study.category,
        study.industry,
        study.lane,
        study.tier,
        study.featuredDesignation ?? "",
        ...study.tags,
        study.client,
      ]),
      summary: study.contribution || study.summary,
      content: [
        `Contribution group: ${groupLabel}.`,
        `Evidence: ${study.evidence}.`,
        study.featuredDesignation ? `Featured as ${study.featuredDesignation}.` : "",
        narrative || study.summary,
      ]
        .filter(Boolean)
        .join(" "),
      url,
    };
  });
}

function buildKnowledgeEntries(): ConciergeEntry[] {
  return knowledgeArticles.map((article) => {
    const sectionText = article.sections
      .flatMap((section) => [
        section.title,
        ...section.paragraphs,
        section.pullquote,
        ...(section.list ?? []),
        section.honestNote,
      ])
      .filter(Boolean)
      .join(" ");

    return {
      id: `knowledge:${article.slug}`,
      source: "knowledge" as const,
      type: "article",
      title: article.title,
      slug: article.slug,
      topics: uniq([
        article.category,
        article.framework ?? "",
        article.format,
        "Notes",
        "field notes",
      ]),
      summary: article.deck,
      content: [article.takeaway, sectionText].filter(Boolean).join(" "),
      url: `/knowledge/${article.slug}`,
    };
  });
}

function buildFrameworkEntries(): ConciergeEntry[] {
  return knowledgeFrameworks.map((framework) => {
    const article = getFrameworkArticle(framework.id);
    const steps = framework.steps.map((s) => `${s.title}. ${s.body}`).join(" ");
    return {
      id: `framework:${framework.id}`,
      source: "framework" as const,
      type: "framework",
      title: framework.title,
      slug: framework.id,
      topics: uniq([
        "framework",
        "Notes",
        framework.title,
        article?.category ?? "",
        "method",
      ]),
      summary: framework.deck,
      content: steps,
      url: article ? `/knowledge/${article.slug}#framework` : "/knowledge",
    };
  });
}

function buildSystemEntries(): ConciergeEntry[] {
  const contributionGroups = [
    "product direction",
    "complex systems",
    "AI and founder products",
    "enterprise leadership",
  ];

  const identity: ConciergeEntry = {
    id: "system:identity",
    source: "system",
    type: "operating-system",
    title: "System — methodology",
    slug: "system",
    topics: uniq([
      "founder os",
      "operating system",
      "methodology",
      "practice",
      "how I think",
      "how I decide",
      "how I operate",
      ...contributionGroups,
    ]),
    summary:
      "System explains the repeatable practice — how to think, decide, build, learn, and operate. About is career story; Work is published evidence.",
    content: [
      founderOs.identity.name,
      founderOs.identity.positioning,
      founderOs.identity.deck,
      "Methodology, not a second portfolio. Contribution groups match Work: Product direction, Complex systems, AI and founder products, Enterprise leadership.",
      founderOs.practiceMap
        .map(
          (row) =>
            `${row.group}: ${row.method} Evidence: ${row.examples.map((e) => e.label).join(", ")}.`,
        )
        .join(" "),
    ].join(" "),
    url: "/system",
  };

  const modules: ConciergeEntry[] = osModules.map((module) => {
    let summary = "";
    let content = "";
    const topics: string[] = [module.title, "founder os", "system", "methodology"];

    switch (module.id) {
      case "dashboard":
        summary = "Ways into the operating system — a table of contents for the practice.";
        content = founderOs.dashboard.map((d) => `${d.label}. ${d.summary}`).join(" ");
        break;
      case "focus":
        summary = "Current workstreams that set the week — framed as operating questions.";
        content = founderOs.focus
          .map((f) => `${f.name}. ${f.role}. ${f.status}`)
          .join(" ");
        topics.push("EQTY", "Growing With Kid", "Bolo Buddy", "teaching");
        break;
      case "practice":
        summary =
          "Method to evidence — Product direction, Complex systems, AI and founder products, Enterprise leadership.";
        content = founderOs.practiceMap
          .map(
            (row) =>
              `${row.group}. ${row.method} Examples: ${row.examples.map((e) => e.label).join(", ")}.`,
          )
          .join(" ");
        topics.push(...contributionGroups, "contribution group", "evidence");
        break;
      case "products":
        summary =
          "Products as practice — small founder products that test the OS under real constraints.";
        content = founderOs.products
          .map((p) => `${p.name}. Tests: ${p.tests}. ${p.summary}`)
          .join(" ");
        topics.push("products as practice", "founder", "AI", "constraint");
        break;
      case "principles":
        summary = "Operating principles the practice holds.";
        content = founderOs.principles.map((p) => `${p.title}. ${p.body}`).join(" ");
        topics.push("principles", "systems thinking");
        break;
      case "decisions":
        summary = "Process and trade-offs. No invented results.";
        content = founderOs.decisions
          .map((d) => `${d.decision}. ${d.context}. ${d.tradeOff}. ${d.outcome}. ${d.lesson}`)
          .join(" ");
        topics.push("decisions", "leadership");
        break;
      case "experiments":
        summary = "Hypotheses in motion.";
        content = founderOs.experiments
          .map((e) => `${e.hypothesis}. ${e.testing}. ${e.learning}`)
          .join(" ");
        topics.push("experiments", "AI", "product");
        break;
      case "knowledge":
        summary = "Writing and field notes — routes to Notes, does not browse articles on System.";
        content = `${founderOs.writing.intro} ${founderOs.writing.cta} ${founderOs.writing.href}`;
        topics.push("writing", "field notes", "Notes");
        break;
      case "teaching":
        summary = "Curriculum, workshops, and mentoring as feedback on the OS.";
        content = founderOs.teaching
          .map((t) => `${t.title}. ${t.context}. ${t.body}`)
          .join(" ");
        topics.push("teaching", "IIAD", "workshops", "speaking", "learning");
        break;
      case "roadmap":
        summary = "Now, next, and later for the practice.";
        content = [
          ...founderOs.roadmap.now,
          ...founderOs.roadmap.next,
          ...founderOs.roadmap.later,
        ]
          .map((r) => `${r.title}. ${r.body}`)
          .join(" ");
        topics.push("roadmap");
        break;
      case "archive":
        summary = "Enterprise systems and earlier work that still inform the OS.";
        content = founderOs.archive.map((a) => `${a.label}. ${a.body}`).join(" ");
        topics.push("enterprise", "archive", ...contributionGroups);
        break;
    }

    return {
      id: `system:${module.id}`,
      source: "system" as const,
      type: "os-module",
      title: module.title,
      slug: module.id,
      topics: uniq(topics),
      summary,
      content,
      url: `/system#${module.id}`,
    };
  });

  return [identity, ...modules];
}

function buildAboutEntries(): ConciergeEntry[] {
  const statsLine = aboutPage.stats
    .map((stat) => `${stat.value} ${stat.unit} — ${stat.label}`)
    .join(". ");

  const overview: ConciergeEntry = {
    id: "about:overview",
    source: "about",
    type: "profile",
    title: "About Raghvendra Singh",
    slug: "about",
    topics: [
      "about",
      "product design leader",
      "systems thinker",
      "hands-on builder",
      "career narrative",
      "five chapters",
      "IIAD",
      "hire",
    ],
    summary: aboutPage.description,
    content: `${aboutPage.heroTitle} ${aboutPage.heroDescription} ${aboutPage.identity} ${aboutPage.location} ${statsLine}`,
    url: "/about",
  };

  const contact: ConciergeEntry = {
    id: "about:contact",
    source: "about",
    type: "contact",
    title: "Start a conversation",
    slug: "contact",
    topics: [
      "contact",
      "available",
      "availability",
      "hire",
      "email",
      "open",
      "opportunities",
    ],
    summary: `${site.status}. ${site.statusDetail}`,
    content: `${site.status}. ${site.statusDetail}. ${site.email}. ${site.location}`,
    url: "/contact",
  };

  const lead: ConciergeEntry = {
    id: "about:lead",
    source: "about",
    type: "leadership",
    title: aboutPage.leadDeck,
    slug: "lead",
    topics: [
      "how I lead",
      "leadership",
      "critique",
      "direction without distance",
      "teams",
    ],
    summary: aboutPage.leadDeck,
    content: `${aboutPage.leadTitle}. ${aboutPage.leadDeck} ${aboutPage.leadBody} ${aboutPage.leadBehaviors
      .map((behavior) => `${behavior.title}: ${behavior.body}`)
      .join(" ")}`,
    url: "/about#lead",
  };

  const modes: ConciergeEntry = {
    id: "about:practice",
    source: "about",
    type: "practice",
    title: "How I work today",
    slug: "practice",
    topics: ["lead", "design systems", "build", "teach", "practice", "how I work"],
    summary: aboutPage.modesIntro,
    content: `${aboutPage.modesIntro} ${aboutPage.modes
      .map((mode) => `${mode.title}: ${mode.body}`)
      .join(" ")}`,
    url: "/about",
  };

  const teaching: ConciergeEntry = {
    id: "about:teaching",
    source: "about",
    type: "teaching",
    title: aboutPage.teachingTitle,
    slug: "teaching",
    topics: ["teaching", "IIAD", "workshops", "mentoring", "500 designers", "critique"],
    summary: aboutPage.teachingTitle,
    content: aboutPage.teachingBody,
    url: "/about#teaching",
  };

  const beliefs: ConciergeEntry[] = aboutPage.beliefs.map((belief) => ({
    id: `about:belief:${belief.index}`,
    source: "about" as const,
    type: "belief",
    title: belief.title,
    slug: `belief-${belief.index}`,
    topics: uniq(["beliefs", "about", "philosophy", belief.title]),
    summary: belief.description,
    content: `${belief.description} Evidence: ${belief.evidence.label}.`,
    url: "/about#beliefs",
  }));

  return [overview, contact, lead, modes, teaching, ...beliefs];
}

function buildExperienceEntries(): ConciergeEntry[] {
  return aboutPage.timeline.map((era) => ({
    id: `experience:${era.id}`,
    source: "experience" as const,
    type: "career-era",
    title: `${era.role} · ${era.org}`,
    slug: era.id,
    topics: uniq([
      "experience",
      "career",
      "chapters",
      "leadership",
      era.role,
      era.org,
      era.id === "founder" ? "teaching" : "",
      era.id === "leadership-arc" ? "fintech" : "",
      era.id === "ux-lead-arc" || era.id === "product-industrial" ? "enterprise systems" : "",
    ]),
    summary: era.learned,
    content: `${era.range}. ${era.role}. ${era.org}. ${era.context} ${era.owned} ${era.learned}`,
    url: `/about#${era.id}`,
  }));
}

function buildServiceEntries(): ConciergeEntry[] {
  return services.map((service) => ({
    id: `services:${service.slug}`,
    source: "services" as const,
    type: "service",
    title: service.title,
    slug: service.slug,
    topics: uniq(["services", "engagement", ...service.stack, service.title]),
    summary: service.summary,
    content: `${service.description}. ${service.stack.join(". ")}`,
    url: `/#practice`,
  }));
}

function buildProductEntries(): ConciergeEntry[] {
  const shelf: ConciergeEntry = {
    id: "products:shelf",
    source: "products",
    type: "product-shelf",
    title: "Studio tools",
    slug: "products",
    topics: [
      "secret products",
      "student tools",
      "design students",
      "design practice",
      "one-time",
      "tools",
    ],
    summary: "Small, focused tools for design students. Buy once. Use when you need them.",
    content:
      "Standalone digital tools for people learning to design. Not a platform, bundle, or membership. One problem. One product. One price. One clear outcome. By Raghvendra Singh.",
    url: "/products",
  };

  const items = visibleProducts().map((product) => ({
    id: `products:${product.slug}`,
    source: "products" as const,
    type: product.status === "live" ? "student-tool" : "coming-soon-tool",
    title: product.name,
    slug: product.slug,
    topics: uniq([
      "secret products",
      "student tools",
      "design students",
      product.name,
      product.status,
      ...product.categories,
    ]),
    summary: product.hook,
    content: [
      product.description,
      product.hook,
      `A standalone Raghvendra Singh product. One-time ${product.price} INR.`,
      product.status === "live" ? "Available now." : "Coming soon.",
    ]
      .filter(Boolean)
      .join(" "),
    url: `/products/${product.slug}`,
  }));

  return [shelf, ...items];
}

let cached: ConciergeEntry[] | null = null;

export function buildConciergeIndex(): ConciergeEntry[] {
  if (cached) return cached;
  cached = [
    ...buildWorkEntries(),
    ...buildKnowledgeEntries(),
    ...buildFrameworkEntries(),
    ...buildSystemEntries(),
    ...buildAboutEntries(),
    ...buildExperienceEntries(),
    ...buildServiceEntries(),
    ...buildProductEntries(),
  ];
  return cached;
}

export function getConciergeEntry(id: string) {
  return buildConciergeIndex().find((entry) => entry.id === id);
}
