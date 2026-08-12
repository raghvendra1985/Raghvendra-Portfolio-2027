export type WorkCategory =
  | "Enterprise Systems"
  | "SaaS Products"
  | "Founder & Ventures"
  | "Web Design"
  | "Freelance MVPs";

export type WorkTier = "flagship" | "lightweight";

export type WorkLane = "primary" | "enterprise" | "founder" | "archive";

export type CaseStudy = {
  index: string;
  slug: string;
  client: string;
  title: string;
  summary: string;
  year: string;
  category: WorkCategory;
  industry: string;
  tags: string[];
  tone: "navy" | "green" | "gold" | "mist";
  tier: WorkTier;
  lane: WorkLane;
  featured?: boolean;
  role?: string;
  timeline?: string;
  engagement?: string;
  challenge?: string;
  approachSteps?: string[];
  outcomes?: { title: string; body: string }[];
  href?: string;
  cover?: string;
  gallery?: string[];
};

export const workCategories: Array<"All" | WorkCategory> = [
  "All",
  "Enterprise Systems",
  "SaaS Products",
  "Founder & Ventures",
  "Web Design",
  "Freelance MVPs",
];

export const workLanes: WorkLane[] = ["primary", "enterprise", "founder", "archive"];

export const laneLabels: Record<WorkLane, string> = {
  primary: "Primary",
  enterprise: "Enterprise Experience",
  founder: "Founder Work",
  archive: "Archive",
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    slug: "eqty",
    client: "EQTY",
    title: "A modular fintech operating system, from strategy to architecture",
    summary:
      "Founding design partnership for a modular fintech OS — trust, workflows, and clarity across complex financial systems.",
    year: "2026",
    category: "SaaS Products",
    industry: "Fintech · AI",
    tags: ["Product", "AI", "Fintech"],
    tone: "navy",
    tier: "flagship",
    lane: "primary",
    role: "Founding design partner",
    timeline: "Ongoing",
    engagement: "Product strategy and experience architecture",
    cover: "/assets/work/eqty/cover.svg",
    gallery: [
      "/assets/work/eqty/gallery-01.svg",
      "/assets/work/eqty/gallery-02.svg",
      "/assets/work/eqty/gallery-03.svg",
    ],
    challenge:
      "Financial products fail when trust, workflow, and business architecture are designed as separate layers. EQTY needed a modular operating system that could hold high-trust financial experiences without burying operators in complexity.",
    approachSteps: [
      "Joined as founding design partner — shaping product strategy and experience architecture together, not handing over screens after the system was already decided.",
      "Mapped the operating system as modules: how money, people, and decisions move, and where trust has to be visible in the interface.",
      "Designed workflows for operators who need clarity under load — fewer dead ends, clearer states, and language that matches how finance teams actually work.",
      "Kept the visual system quiet so the architecture could carry the product: hierarchy, restraint, and a structure that can grow without a redesign every quarter.",
    ],
    outcomes: [
      {
        title: "Strategy in the product",
        body: "Experience architecture is part of the operating system, not a coat of paint applied after the modules were locked.",
      },
      {
        title: "Trust as a design problem",
        body: "High-trust financial work is treated as workflow and language, not as a marketing claim.",
      },
      {
        title: "A system that can extend",
        body: "A modular structure so new financial surfaces can join the OS without fracturing the operator experience.",
      },
    ],
  },
  {
    index: "02",
    slug: "growing-with-kid",
    client: "Growing With Kid",
    title: "A parenting community built around one clear job",
    summary:
      "A content and community product for Indian parents — fewer features, sharper jobs, no theatre.",
    year: "2020",
    category: "Founder & Ventures",
    industry: "Family · Community",
    tags: ["Founder", "Community", "Content"],
    tone: "green",
    tier: "flagship",
    lane: "primary",
    role: "Founder / product builder",
    timeline: "2020–present",
    engagement: "Founder venture",
    cover: "/assets/work/growing-with-kid/cover.svg",
    gallery: [
      "/assets/work/growing-with-kid/gallery-01.svg",
      "/assets/work/growing-with-kid/gallery-02.svg",
      "/assets/work/growing-with-kid/gallery-03.svg",
    ],
    challenge:
      "Parenting advice is fragmented, overwhelming, and rarely built for daily life. Indian parents needed a trusted place to learn and share — without another bloated app that treats children as an adult product scaled down.",
    approachSteps: [
      "Started from a single job: help parents think clearly, not collect more content. Constraint became the editor.",
      "Built a newsletter and community hub first — essays, guides, and conversations — instead of a feature catalogue.",
      "Designed programs and expert-led sessions around real family questions, not a generic education funnel.",
      "Kept the product small on purpose: one voice, one audience, one promise, so trust could compound.",
    ],
    outcomes: [
      {
        title: "A live community product",
        body: "Growing With Kid remains a working space for parents who want depth over noise.",
      },
      {
        title: "Constraint as quality",
        body: "Fewer features forced sharper jobs. The product says one thing well.",
      },
      {
        title: "Founder execution",
        body: "Content, community, and product decisions sit in the same stack — who it is for, what they must decide, and what would make them stop trusting you.",
      },
    ],
  },
  {
    index: "03",
    slug: "bolo-buddy",
    client: "Bolo Buddy",
    title: "Culturally rooted bedtime stories for Indian children",
    summary:
      "An AI storytelling platform — audio-first, screen-free, in Hindi, English, Hinglish, and Tamil.",
    year: "2023",
    category: "Founder & Ventures",
    industry: "AI · Children’s products",
    tags: ["Founder", "AI", "Family"],
    tone: "navy",
    tier: "flagship",
    lane: "primary",
    role: "Cofounder",
    timeline: "1.5+ years, ongoing",
    engagement: "Founder venture",
    cover: "/assets/work/bolo-buddy/cover.svg",
    gallery: [
      "/assets/work/bolo-buddy/gallery-01.svg",
      "/assets/work/bolo-buddy/gallery-02.svg",
      "/assets/work/bolo-buddy/gallery-03.svg",
    ],
    challenge:
      "Indian parents wanted screen-free, culturally rooted bedtime stories — Hindi, English, Hinglish, and Tamil that reflected Indian values, mythology, and contemporary life. Existing platforms were Western-focused, screen-dependent, or mass-produced without cultural personalization.",
    approachSteps: [
      "Built an AI storytelling engine that generates personalized, culturally rooted bedtime stories in multiple Indian languages, grounded in Indian mythology and values.",
      "Designed the platform as audio-first and screen-free — text or narrated audio, with mood-based categories for different sleep states.",
      "Introduced family voice-narration so parents can record their own voices telling stories.",
      "Built both the product and the business model — content generation, acquisition through parenting communities, and subscriptions around family voice features.",
    ],
    outcomes: [
      {
        title: "Active platform",
        body: "Bolo Buddy remains operational and building a community of Indian parents seeking culturally rooted, screen-free content.",
      },
      {
        title: "Differentiated product",
        body: "An alternative to Western, screen-dependent children’s platforms with genuine cultural relevance.",
      },
      {
        title: "Founder execution",
        body: "Product innovation (AI storytelling, multilingual content, voice) and the business around it, from content strategy to community.",
      },
    ],
  },
  {
    index: "04",
    slug: "2886",
    client: "2886",
    title: "Craft technique, modern cut",
    summary:
      "Artisan-led fashion brand named after the founder’s ancestral weaving village — traditional craft with minimal modern design.",
    year: "2016",
    category: "Web Design",
    industry: "Fashion · Craft",
    tags: ["Web Design", "Brand"],
    tone: "navy",
    tier: "flagship",
    lane: "primary",
    role: "Designer",
    timeline: "Project engagement",
    engagement: "Brand and web",
    cover: "/assets/work/2886/cover.svg",
    gallery: [
      "/assets/work/2886/gallery-01.svg",
      "/assets/work/2886/gallery-02.svg",
      "/assets/work/2886/gallery-03.svg",
    ],
    challenge:
      "2886 needed a digital presence that could hold artisan technique and a modern cut in the same frame — named after the founder’s ancestral weaving village, without looking like a heritage souvenir site or a generic fashion lookbook.",
    approachSteps: [
      "Worked from the brand’s origin: village, craft, and a minimal contemporary silhouette, rather than a catalogue-first grid.",
      "Designed a quiet site structure so cloth, cut, and making could lead — photography and type carrying the story instead of decoration.",
      "Kept the system small: a few page types, a restrained palette, and navigation that does not compete with the garments.",
      "Treated the web as an extension of the atelier — detail-focused, not campaign-led.",
    ],
    outcomes: [
      {
        title: "Craft on the web",
        body: "The site holds traditional technique and modern design in one register instead of splitting heritage from product.",
      },
      {
        title: "A durable brand frame",
        body: "Minimal structure that can take new collections without a redesign each season.",
      },
      {
        title: "Client work with a point of view",
        body: "A fashion presence that reads as made, not merchandised.",
      },
    ],
  },
  {
    index: "05",
    slug: "pacific-design-house",
    client: "Pacific Design House",
    title: "Ethical garment manufacturing, on the web",
    summary:
      "Site for a New Delhi / Jaipur design, sourcing, and manufacturing house — 70,000+ garments a month, SEDEX-certified.",
    year: "2016",
    category: "Web Design",
    industry: "Fashion · Manufacturing",
    tags: ["Web Design", "Brand"],
    tone: "mist",
    tier: "flagship",
    lane: "primary",
    role: "Designer",
    timeline: "Project engagement",
    engagement: "Brand and web",
    cover: "/assets/work/pacific-design-house/cover.svg",
    gallery: [
      "/assets/work/pacific-design-house/gallery-01.svg",
      "/assets/work/pacific-design-house/gallery-02.svg",
      "/assets/work/pacific-design-house/gallery-03.svg",
    ],
    challenge:
      "Pacific Design House is a multidisciplinary design, sourcing, and ethical manufacturing house in New Delhi and Jaipur — solar-powered, SEDEX-certified, exhibiting at Who’s Next Paris and ITF Tokyo. The site had to speak to buyers who care about making, workforce, and certification, not only lookbooks.",
    approachSteps: [
      "Framed the house as design plus manufacturing: sourcing, factory, and ethical credentials in the same narrative as the garments.",
      "Designed pages that could carry process — how a collection moves from studio to floor — without turning the site into a CSR brochure.",
      "Gave certification, workforce, and place (Delhi / Jaipur) a clear, scannable structure for international buyers.",
      "Kept the visual system calm so photography of making and cloth could do the work.",
    ],
    outcomes: [
      {
        title: "A buyer-facing house",
        body: "The site presents manufacturing capacity and ethical practice as part of the design offer, not a footnote.",
      },
      {
        title: "Place and process",
        body: "New Delhi, Jaipur, and the factory floor are visible in the story instead of hidden behind a generic fashion template.",
      },
      {
        title: "A system for a working studio",
        body: "Structure that can hold collections, credentials, and exhibitions without a new identity each season.",
      },
    ],
  },
  {
    index: "06",
    slug: "viralops",
    client: "Viralops",
    title: "A complete redesign against an extended feedback cycle",
    summary:
      "Website redesign for a hospitality and cinema tech platform — delivered through a long client-side review loop.",
    year: "2018",
    category: "Web Design",
    industry: "Hospitality · Cinema tech",
    tags: ["Web", "Freelance", "Brand"],
    tone: "navy",
    tier: "flagship",
    lane: "primary",
    role: "Freelance / independent designer",
    timeline: "3–6 months",
    engagement: "Freelance project",
    cover: "/assets/work/viralops/cover.svg",
    gallery: [
      "/assets/work/viralops/gallery-01.svg",
      "/assets/work/viralops/gallery-02.svg",
      "/assets/work/viralops/gallery-03.svg",
    ],
    challenge:
      "Viralops needed a website redesign that reflected its dual hospitality and cinema tech offering — VServe-ProTecht for luxury hotel guest engagement and VServe-Cinemas for theater concessions — to hotel and venue operators worldwide.",
    approachSteps: [
      "Ran discovery with founder Mrigank to understand brand positioning across the two product lines.",
      "Designed a full website redesign incorporating the initial round of stakeholder feedback.",
      "Presented the design for review — the feedback loop extended significantly beyond the original timeline due to delays on the client side.",
      "Delivered the redesign reflecting the initial feedback, though the engagement paused before a further iteration round or launch.",
    ],
    outcomes: [
      {
        title: "Complete design work delivered",
        body: "The redesign incorporated real stakeholder feedback even as the review cycle extended well past the original scope.",
      },
      {
        title: "Client-side delay, not a design stall",
        body: "Work was ready and waiting on the client’s review cadence. The project paused before launch due to that delay, not design quality.",
      },
    ],
  },
  {
    index: "07",
    slug: "verizon",
    client: "Verizon",
    title: "Turnkey digital signage across distributed locations",
    summary:
      "A compact media-player architecture and cloud portal for campaign playback across retail, transit, and campus screens — without depending on site Wi-Fi.",
    year: "2021",
    category: "Enterprise Systems",
    industry: "Telecom · Digital signage",
    tags: ["Enterprise", "Signage", "Advisory"],
    tone: "green",
    tier: "flagship",
    lane: "enterprise",
    role: "Staff Design Consultant",
    timeline: "6 months",
    engagement: "IC level",
    cover: "/assets/work/verizon/cover.svg",
    gallery: [
      "/assets/work/verizon/gallery-01.svg",
      "/assets/work/verizon/gallery-02.svg",
      "/assets/work/verizon/gallery-03.svg",
    ],
    challenge:
      "Businesses needed dynamic multimedia across retail, transit, and corporate campus locations without depending on fixed Wi-Fi infrastructure at every site.",
    approachSteps: [
      "Designed the core architecture around a compact media player connecting via HDMI to any compatible commercial display, TV, or kiosk — the hardware kit includes an embedded 4G/5G LTE SIM, power adapter, and antennas.",
      "Ran campaign data over an independent wireless network entirely outside corporate or reseller IT infrastructure, sidestepping internal network bottlenecks.",
      "Built a central web-based management portal with real-time device alerts, scheduled playback, remote reboots, and remote screenshots.",
      "Built campaign scheduling — uploading images, video, or data feeds, organizing them into playlists, and assigning them to specific screen groups or geographic locations.",
      "Enabled real-time content distribution, pushing updates instantly to connected media players without manual USB swaps.",
    ],
    outcomes: [
      {
        title: "Frictionless deployment",
        body: "Bypasses complex corporate IT approvals, plugs directly into displays, and activates via pre-configured 4G/5G LTE out-of-band connectivity.",
      },
      {
        title: "Operational autonomy",
        body: "Eliminates reliance on on-site local networks, runs on a dedicated wireless stream, and protects internal corporate bandwidth.",
      },
      {
        title: "Centralized command",
        body: "Controls nationwide displays from a single cloud portal and verifies active playback via remote automated screenshots.",
      },
      {
        title: "Hardened reliability",
        body: "Minimizes field maintenance with automated remote reboots and real-time hardware health alerts.",
      },
    ],
  },
  {
    index: "08",
    slug: "crowley",
    client: "Crowley Maritime",
    title: "Unifying freight quoting across a fragmented supply chain",
    summary:
      "A guided quote flow that replaced a dense legacy form — origin to cargo to contact — aligned with rate-engine and customs constraints.",
    year: "2023",
    category: "Enterprise Systems",
    industry: "Maritime · Logistics",
    tags: ["Enterprise", "Ops", "B2B"],
    tone: "navy",
    tier: "flagship",
    lane: "enterprise",
    role: "Staff Design Consultant",
    timeline: "1 year",
    engagement: "Advisory",
    cover: "/assets/work/crowley/cover.svg",
    gallery: [
      "/assets/work/crowley/gallery-01.svg",
      "/assets/work/crowley/gallery-02.svg",
      "/assets/work/crowley/gallery-03.svg",
    ],
    challenge:
      "International shippers faced fragmented communication across trucking companies, ports, and customs brokers, unclear total shipping costs due to hidden fees, and compliance risk from disconnected customs processes — with no unified way to get a clear, upfront freight quote across ocean, rail, and land networks.",
    approachSteps: [
      "Designed a guided, step-by-step quote wizard starting with route selection — origin and final destination.",
      "Built a cargo details step — cargo readiness date and load type (Full Container Load, Less Than Container Load, breakbulk, or vehicle shipping).",
      "Built a contact verification step — name, company, email, phone.",
      "Built rate generation — the system processes geographic data, cargo dimensions, and schedule into a tailored pricing estimate.",
      "Connected the quote flow directly into downstream execution — warehousing, tracking, and final delivery — as a single-source system rather than a standalone calculator.",
      "Partnered with engineering to align front-end form fields with the underlying rate-engine and API constraints.",
      "Worked with product and compliance stakeholders to bake customs clearance and regulatory requirements into the route-selection step.",
      "Consolidated a dense, ~20-field legacy spreadsheet-style form into a clean 3-step progressive configuration.",
    ],
    outcomes: [
      {
        title: "System alignment",
        body: "Unified cargo and container data structures with Product, translating maritime weight and dimension metrics into scannable interface elements for shippers.",
      },
      {
        title: "Validation in the flow",
        body: "Structured the multi-step wizard with per-step instrumentation, inline validation, and smart defaults so bad entries never reached customer support.",
      },
      {
        title: "Compliance by design",
        body: "Embedded customs and regulatory data collection into the flow itself rather than treating it as a downstream legal review.",
      },
      {
        title: "A lasting system",
        body: "Introduced the design system this platform still runs on, well beyond the original engagement.",
      },
    ],
  },
  {
    index: "09",
    slug: "sagacito",
    client: "Sagacito",
    title: "An AI-driven revenue suite for perishable media inventory",
    summary:
      "Ymax, Pgov, and RevX designed as one pre-sales-to-revenue pipeline for print, TV, and digital inventory.",
    year: "2020",
    category: "SaaS Products",
    industry: "Media · Revenue systems",
    tags: ["SaaS", "AI", "Pricing"],
    tone: "gold",
    tier: "flagship",
    lane: "enterprise",
    role: "Lead Designer",
    timeline: "2+ years",
    engagement: "Full-time employment",
    cover: "/assets/work/sagacito/cover.svg",
    gallery: [
      "/assets/work/sagacito/gallery-01.svg",
      "/assets/work/sagacito/gallery-02.svg",
      "/assets/work/sagacito/gallery-03.svg",
    ],
    challenge:
      "Media houses (print, TV, digital) sell a perishable, non-storable inventory — airtime and page space — through manual, discount-prone pricing and disconnected pre-sales-to-revenue workflows, leaking margin especially during high-demand seasonal spikes.",
    approachSteps: [
      "Designed Ymax’s pricing engine — models real-time inventory constraints against seasonality, market dynamics, and audience data to calculate the highest price a client will accept without leaving revenue on the table.",
      "Designed automated proposal and product-mix generation — bundling premium, high-demand slots with lower-demand inventory so sales reps meet campaign requirements while protecting margins.",
      "Designed the approval-guardrail workflow (Pgov) — auto-approving compliant deals and escalating non-compliant or heavily discounted proposals.",
      "Designed cross-channel portfolio optimization — unifying TV broadcast seconds and print page centimeters into a single blended pricing model.",
      "Integrated RevX’s social-listening and prospecting signals directly into Ymax’s workflow, connecting pre-sales triggers to revenue orchestration.",
    ],
    outcomes: [
      {
        title: "Real client adoption",
        body: "Implemented by major Indian media conglomerates including Hindustan Times, Ananda Bazar Patrika, and PVR Cinemas.",
      },
      {
        title: "Built as a system",
        body: "Three integrated products — Ymax, Pgov, and RevX — designed to function as one connected pre-sales-to-revenue pipeline.",
      },
    ],
  },
  {
    index: "10",
    slug: "shuttl",
    client: "Shuttl",
    title: "An end-to-end design system for urban mobility at scale",
    summary:
      "Rider, driver, and corporate surfaces on one system — including data-over-sound check-in for congested corridors.",
    year: "2019",
    category: "Enterprise Systems",
    industry: "Mobility · Product design",
    tags: ["Mobility", "Systems", "Field research"],
    tone: "mist",
    tier: "flagship",
    lane: "enterprise",
    role: "Staff Design Consultant",
    timeline: "3+ years",
    engagement: "IC level",
    cover: "/assets/work/shuttl/cover.svg",
    gallery: [
      "/assets/work/shuttl/gallery-01.svg",
      "/assets/work/shuttl/gallery-02.svg",
      "/assets/work/shuttl/gallery-03.svg",
    ],
    challenge:
      "Shuttl operated a dual-sided platform: B2C shared commuting for over a million daily riders and B2B enterprise transport serving 80+ corporates. The product needed to work across rider apps, driver interfaces, live tracking, and corporate dashboards while staying consistent as the platform grew.",
    approachSteps: [
      "Designed the foundational end-to-end product design system covering rider booking, live tracking, driver operations, and corporate fleet management.",
      "Introduced automated data-over-sound passenger check-in — a privacy-preserving, network-agnostic way to confirm boarding without relying on Wi-Fi or cellular in congested urban environments.",
      "Built live tracking across B2C and B2B surfaces so riders and fleet managers could monitor location, arrival, and operational health.",
      "Scaled the design system as the platform grew, adapting to corporate payroll integration, tiered pricing, and fleet optimization without fracturing the language.",
    ],
    outcomes: [
      {
        title: "System at scale",
        body: "The design system remains operational across B2C and B2B products for a platform that served 1M+ daily riders and 80+ enterprise clients.",
      },
      {
        title: "Innovation that stuck",
        body: "Data-over-sound check-in and live tracking addressed real mobility constraints and became core platform differentiators.",
      },
      {
        title: "Durable foundation",
        body: "Years of staff-level consulting established a product design practice that could scale across consumer and enterprise lines.",
      },
    ],
  },
  {
    index: "11",
    slug: "hempel",
    client: "Hempel",
    title: "Workshop insights into digitized coatings procurement",
    summary:
      "A three-month advisory that ranked procurement friction by ROI and informed MyHempel’s core feature set.",
    year: "2022",
    category: "Enterprise Systems",
    industry: "Industrial · Procurement",
    tags: ["Advisory", "Workshops", "B2B"],
    tone: "green",
    tier: "flagship",
    lane: "enterprise",
    role: "Staff Design Consultant",
    timeline: "3 months",
    engagement: "Advisory — UX workshop facilitation",
    cover: "/assets/work/hempel/cover.svg",
    gallery: [
      "/assets/work/hempel/gallery-01.svg",
      "/assets/work/hempel/gallery-02.svg",
      "/assets/work/hempel/gallery-03.svg",
    ],
    challenge:
      "Hempel’s B2B customers procured industrial and marine coatings through a manual, offline process — no digital system for order management, documentation access, or product selection.",
    approachSteps: [
      "Facilitated UX workshops with Hempel stakeholders to map the existing manual procurement process end-to-end and surface where B2B customers hit friction.",
      "Identified four core friction areas for highest ROI: rigid technical product discovery, no field/mobile usability, opaque staggered fulfillment, and disconnected compliance documentation.",
      "Synthesized findings into a prioritized, ROI-ranked roadmap rather than a generic recommendations deck.",
      "Handed off recommendations that informed MyHempel’s core feature set — order management, instant documentation, and the smart coating system selector.",
    ],
    outcomes: [
      {
        title: "Insights into product",
        body: "The digitization priorities identified in the workshop map onto MyHempel’s core features today.",
      },
      {
        title: "Ranked by ROI",
        body: "Friction areas were sequenced against actual customer pain, not a flat feature checklist.",
      },
      {
        title: "High-leverage advisory",
        body: "A three-month workshop engagement produced the foundational direction for a full B2B digital procurement platform.",
      },
    ],
  },
  {
    index: "12",
    slug: "urban-prakriti",
    client: "Urban Prakriti",
    title: "A health brand for city residents, built as a founder",
    summary:
      "Positioning, identity, and D2C e-commerce for plant-based superfoods with transparent sourcing.",
    year: "2022",
    category: "Founder & Ventures",
    industry: "Health · E-commerce",
    tags: ["Founder", "Brand", "D2C"],
    tone: "mist",
    tier: "flagship",
    lane: "founder",
    role: "Cofounder",
    timeline: "3+ years, ongoing, part-time",
    engagement: "Founder venture",
    cover: "/assets/work/urban-prakriti/cover.svg",
    gallery: [
      "/assets/work/urban-prakriti/gallery-01.svg",
      "/assets/work/urban-prakriti/gallery-02.svg",
      "/assets/work/urban-prakriti/gallery-03.svg",
    ],
    challenge:
      "The plant-based superfoods market is crowded with commoditized offerings. Urban consumers in India wanted genuinely organic, ethically sourced products — with no trusted, branded way to access them with transparent sourcing and clear health positioning.",
    approachSteps: [
      "Defined brand positioning for city residents seeking non-GMO, gluten-free, vegan-friendly superfoods — wellness and transparency over price competition.",
      "Built a visual identity that reflected prakriti (natural) positioning — clean, trustworthy, human-centered rather than clinical.",
      "Established a direct-to-consumer e-commerce platform with sourcing information, ingredient education, and acquisition through wellness communities.",
      "Focused on trust through a consistent experience across packaging, website, and community.",
    ],
    outcomes: [
      {
        title: "Active venture",
        body: "Urban Prakriti remains operational and building customer relationships in health and wellness.",
      },
      {
        title: "Differentiated positioning",
        body: "Trusted, transparent brand in a crowded superfoods market rather than a price-led commodity.",
      },
      {
        title: "Founder execution",
        body: "Positioning translated into a live consumer business with real customer traction.",
      },
    ],
  },
  {
    index: "13",
    slug: "obzrv",
    client: "Obzrv",
    title: "A real-time F&B analytics MVP for the Gulf",
    summary:
      "A working dashboard MVP for restaurants, cloud kitchens, brands, and distributors tracking live market activity.",
    year: "2021",
    category: "Freelance MVPs",
    industry: "F&B · Analytics",
    tags: ["MVP", "Dashboards", "Freelance"],
    tone: "gold",
    tier: "flagship",
    lane: "archive",
    role: "Freelance designer",
    timeline: "Under 3 months",
    engagement: "Freelance project",
    cover: "/assets/work/obzrv/cover.svg",
    gallery: [
      "/assets/work/obzrv/gallery-01.svg",
      "/assets/work/obzrv/gallery-02.svg",
      "/assets/work/obzrv/gallery-03.svg",
    ],
    challenge:
      "Food and beverage businesses across the Gulf had no unified way to track real-time market activity, inventory trends, or competitive pricing — forcing them onto manual collection and fragmented spreadsheets.",
    approachSteps: [
      "Defined the core MVP: real-time data ingestion for restaurants and cloud kitchens, competitive pricing tracking, and a simple dashboard for market insights.",
      "Designed a dashboard that let users ingest live market data, filter by business type, and surface actionable trends.",
      "Built the MVP to get a working, deployable product to market quickly rather than over-engineering early.",
      "Delivered a functional MVP that proved the core concept and validated demand.",
    ],
    outcomes: [
      {
        title: "Working MVP",
        body: "Delivered in under three months, proving the data-analytics concept was viable for F&B businesses in the Gulf.",
      },
      {
        title: "A foundation to scale",
        body: "The MVP established the user flow and data model later iteration can grow from.",
      },
      {
        title: "Focus under constraint",
        body: "A tight timeline forced the highest-value features rather than scope creep.",
      },
    ],
  },
  {
    index: "14",
    slug: "tannins",
    client: "Tannins",
    title: "Crafting quality tannin solutions",
    summary:
      "Web design for a wine business spanning B2B tannin solutions for winemakers and imported wine for consumers.",
    year: "2017",
    category: "Web Design",
    industry: "Wine · Web",
    tags: ["Web Design"],
    tone: "gold",
    tier: "lightweight",
    lane: "archive",
  },
  {
    index: "15",
    slug: "omf",
    client: "OMF",
    title: "Sleep retail, redesigned for a pitch",
    summary:
      "Site redesign for OMF Australia, a sleep and bedroom specialist with 50+ stores — prepared as a client pitch.",
    year: "2018",
    category: "Web Design",
    industry: "Retail · Sleep",
    tags: ["Web Design"],
    tone: "green",
    tier: "lightweight",
    lane: "archive",
  },
  {
    index: "16",
    slug: "udbodhan",
    client: "Udbodhan",
    title: "India’s oldest continuously published Bengali magazine",
    summary:
      "Web work for the historic spiritual publishing house tied to Ramakrishna Math and Mission, Kolkata, founded by Swami Vivekananda in 1899.",
    year: "2015",
    category: "Web Design",
    industry: "Publishing · Culture",
    tags: ["Web Design"],
    tone: "mist",
    tier: "lightweight",
    lane: "archive",
  },
  {
    index: "17",
    slug: "strike",
    client: "Strike",
    title: "Market analytics for retail investors",
    summary:
      "Freelance MVP for a subscription stock-market analytics platform — scanners, heatmaps, multi-timeframe charting.",
    year: "2020",
    category: "Freelance MVPs",
    industry: "Fintech · MVP",
    tags: ["MVP", "Freelance"],
    tone: "gold",
    tier: "lightweight",
    lane: "archive",
    href: "https://strike.money",
  },
  {
    index: "18",
    slug: "ethiqly",
    client: "Ethiqly",
    title: "AI writing support for literature classrooms",
    summary:
      "Freelance MVP — rubric-based grading and student brainstorming with Google Classroom and Schoology integration.",
    year: "2021",
    category: "Freelance MVPs",
    industry: "Education · AI",
    tags: ["MVP", "Education"],
    tone: "navy",
    tier: "lightweight",
    lane: "archive",
  },
  {
    index: "19",
    slug: "smart-currency-exchange",
    client: "Smart Currency Exchange",
    title: "Live conversion, simple selection",
    summary:
      "Freelance MVP — live currency conversion with API-based rates and a responsive selection UI.",
    year: "2019",
    category: "Freelance MVPs",
    industry: "Fintech · Utility",
    tags: ["MVP", "Freelance"],
    tone: "green",
    tier: "lightweight",
    lane: "archive",
  },
];

export const flagshipStudies = caseStudies.filter((study) => study.tier === "flagship");

export const primaryStudies = caseStudies.filter((study) => study.lane === "primary");

const featuredSlugs = ["eqty", "growing-with-kid", "bolo-buddy", "2886"] as const;

export const featuredWork = featuredSlugs.map((slug) => {
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) throw new Error(`Missing featured study: ${slug}`);
  return study;
});

export function getCaseStudy(slug: string) {
  return flagshipStudies.find((study) => study.slug === slug);
}

export function getNextCaseStudy(slug: string) {
  const rest = flagshipStudies.filter((study) => study.lane !== "primary");
  const sequence = [...primaryStudies, ...rest];
  const index = sequence.findIndex((study) => study.slug === slug);
  if (index < 0) return sequence[0];
  return sequence[(index + 1) % sequence.length];
}
