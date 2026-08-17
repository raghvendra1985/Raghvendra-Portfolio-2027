export type ProductStatus = "live" | "coming-soon" | "private" | "hidden";

export type ProductCategory =
  | "get-into-design"
  | "get-better"
  | "portfolio"
  | "jury";

export type Currency = "INR";

export type DeliveryType = "download" | "app" | "hybrid";

export type ProductShelf = "featured" | "quick-tools" | "practice" | "coming-soon";

export type Product = {
  id: string;
  slug: string;
  number: string;
  name: string;
  hook: string;
  description?: string;
  price: number;
  currency: Currency;
  categories: ProductCategory[];
  status: ProductStatus;
  shelf: ProductShelf;
  featured?: boolean;
  cta: string;
  attribution: "By Raghvendra Singh";
  cover?: string;
  ogImage?: string;
  /** Optional external payment-link override. Razorpay is preferred when commerce is configured. */
  checkoutUrl?: string;
  deliveryType: DeliveryType;
  downloadAsset?: string;
  appPath?: string;
  version: string;
  allowPreorder?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export const productCategoryLabels: Record<ProductCategory, string> = {
  "get-into-design": "Get into design",
  "get-better": "Get better",
  portfolio: "Portfolio",
  jury: "Jury",
};

export const productCategories: ProductCategory[] = [
  "get-into-design",
  "get-better",
  "portfolio",
  "jury",
];

export const productFilters: Array<"all" | ProductCategory> = [
  "all",
  ...productCategories,
];

export const productFilterLabels: Record<"all" | ProductCategory, string> = {
  all: "All",
  ...productCategoryLabels,
};

const attribution = "By Raghvendra Singh" as const;

const catalog: Array<Omit<Product, "deliveryType" | "version" | "appPath" | "downloadAsset" | "shelf">> = [
  {
    id: "sp-design-dare",
    slug: "design-dare",
    number: "001",
    name: "Design Dare",
    hook: "Think. Make. Defend it.",
    description: "A timed dare that forces a point of view, a made thing, and an argument.",
    price: 499,
    currency: "INR",
    categories: ["get-better", "portfolio", "jury"],
    status: "coming-soon",
    cta: "Take the dare",
    attribution,
    cover: "/assets/products/design-dare/cover.svg",
    ogImage: "/assets/products/design-dare/og.png",
    seoDescription: "A practice tool that makes design students think, make, and defend a point of view.",
  },
  {
    id: "sp-design-roulette",
    slug: "design-roulette",
    number: "002",
    name: "Design Roulette",
    hook: "Spin your next design challenge.",
    description: "A constraint spinner for when you need a problem, not a moodboard.",
    price: 199,
    currency: "INR",
    categories: ["get-into-design", "get-better"],
    status: "live",
    cta: "Spin a challenge",
    attribution,
    cover: "/assets/products/design-roulette/cover.svg",
    ogImage: "/assets/products/design-roulette/og.png",
    seoDescription: "Spin a focused design challenge when you need a reason to start.",
  },
  {
    id: "sp-jury-me",
    slug: "jury-me",
    number: "003",
    name: "Jury Me",
    hook: "Face your jury before the real one.",
    description: "A rehearsal for the questions that actually show up in a design jury.",
    price: 499,
    currency: "INR",
    categories: ["jury"],
    status: "coming-soon",
    cta: "Face the jury",
    attribution,
    cover: "/assets/products/jury-me/cover.svg",
    ogImage: "/assets/products/jury-me/og.png",
    seoDescription: "Rehearse design jury questions before the panel is in the room.",
  },
  {
    id: "sp-brief-me",
    slug: "brief-me",
    number: "004",
    name: "Brief Me",
    hook: "Better portfolios start with better problems.",
    description: "A brief builder that replaces vague passion projects with a problem worth solving.",
    price: 299,
    currency: "INR",
    categories: ["portfolio"],
    status: "coming-soon",
    cta: "Get a brief",
    attribution,
    cover: "/assets/products/brief-me/cover.svg",
    ogImage: "/assets/products/brief-me/og.png",
    seoDescription: "Generate a sharper project brief so portfolio work starts with a real problem.",
  },
  {
    id: "sp-design-iq",
    slug: "design-iq",
    number: "005",
    name: "Design IQ",
    hook: "Discover how your design brain works.",
    description: "A short diagnostic that names how you tend to see, decide, and make.",
    price: 299,
    currency: "INR",
    categories: ["get-into-design"],
    status: "live",
    cta: "Take the test",
    attribution,
    cover: "/assets/products/design-iq/cover.svg",
    ogImage: "/assets/products/design-iq/og.png",
    seoDescription: "A short test that names how your design brain works — then tells you what to practice next.",
  },
  {
    id: "sp-portfolio-roast",
    slug: "portfolio-roast",
    number: "006",
    name: "Portfolio Roast",
    hook: "Find out what’s weakening your portfolio.",
    description: "A structured roast that finds the holes recruiters and juries already notice.",
    price: 499,
    currency: "INR",
    categories: ["portfolio", "jury"],
    status: "coming-soon",
    cta: "Roast my portfolio",
    attribution,
    cover: "/assets/products/portfolio-roast/cover.svg",
    ogImage: "/assets/products/portfolio-roast/og.png",
    seoDescription: "A critique tool that shows what is weakening a design student portfolio.",
  },
  {
    id: "sp-idea-gym",
    slug: "idea-gym",
    number: "007",
    name: "Idea Gym",
    hook: "Give your creativity some reps.",
    description: "Short creative sets. No masterpiece. Just range.",
    price: 399,
    currency: "INR",
    categories: ["get-better"],
    status: "coming-soon",
    cta: "Start the reps",
    attribution,
    cover: "/assets/products/idea-gym/cover.svg",
    ogImage: "/assets/products/idea-gym/og.png",
    seoDescription: "Timed creative reps for design students who need range, not inspiration quotes.",
  },
  {
    id: "sp-design-detective",
    slug: "design-detective",
    number: "008",
    name: "Design Detective",
    hook: "Train yourself to notice what others miss.",
    description: "Observation drills that turn looking into evidence.",
    price: 299,
    currency: "INR",
    categories: ["get-better"],
    status: "coming-soon",
    cta: "Open the case",
    attribution,
    cover: "/assets/products/design-detective/cover.svg",
    ogImage: "/assets/products/design-detective/og.png",
    seoDescription: "Observation drills that train design students to notice what others miss.",
  },
  {
    id: "sp-sketch-roulette",
    slug: "sketch-roulette",
    number: "009",
    name: "Sketch Roulette",
    hook: "Object × User × Constraint. Draw.",
    description: "A three-wheel sketch prompt. Draw before you decorate.",
    price: 199,
    currency: "INR",
    categories: ["get-better"],
    status: "coming-soon",
    cta: "Draw the draw",
    attribution,
    cover: "/assets/products/sketch-roulette/cover.svg",
    ogImage: "/assets/products/sketch-roulette/og.png",
    seoDescription: "Spin object, user, and constraint — then sketch. A drawing drill for design students.",
  },
  {
    id: "sp-design-entrance-simulator",
    slug: "design-entrance-simulator",
    number: "010",
    name: "Design Entrance Simulator",
    hook: "Take the design test before the test.",
    description: "A timed entrance-style paper you can sit at home, once.",
    price: 599,
    currency: "INR",
    categories: ["get-into-design"],
    status: "coming-soon",
    cta: "Sit the test",
    attribution,
    cover: "/assets/products/design-entrance-simulator/cover.svg",
    ogImage: "/assets/products/design-entrance-simulator/og.png",
    seoDescription: "A timed design entrance practice test you can sit before the real one.",
  },
  {
    id: "sp-what-should-i-design",
    slug: "what-should-i-design",
    number: "011",
    name: "What Should I Design?",
    hook: "Find your next portfolio-worthy project.",
    description: "A decision tool for choosing a project that can actually carry a portfolio.",
    price: 299,
    currency: "INR",
    categories: ["get-into-design", "portfolio"],
    status: "coming-soon",
    cta: "Find a project",
    attribution,
    cover: "/assets/products/what-should-i-design/cover.svg",
    ogImage: "/assets/products/what-should-i-design/og.png",
    seoDescription: "Find a portfolio-worthy design project instead of another generic case study.",
  },
  {
    id: "sp-crit-card",
    slug: "crit-card",
    number: "012",
    name: "Crit Card",
    hook: "Draw a question when your project gets stuck.",
    description: "One sharp question at a time. For when the work has gone quiet.",
    price: 199,
    currency: "INR",
    categories: ["get-better", "jury"],
    status: "coming-soon",
    cta: "Draw a question",
    attribution,
    cover: "/assets/products/crit-card/cover.svg",
    ogImage: "/assets/products/crit-card/og.png",
    seoDescription: "Draw a critique question when a design project gets stuck.",
  },
  {
    id: "sp-100-design-prompts",
    slug: "100-design-prompts",
    number: "013",
    name: "100 Design Prompts",
    hook: "100 reasons to stop staring at a blank page.",
    description: "One hundred prompts. No curriculum. No sequence. Use the one you need.",
    price: 299,
    currency: "INR",
    categories: ["get-into-design", "get-better"],
    status: "coming-soon",
    cta: "Get the prompts",
    attribution,
    cover: "/assets/products/100-design-prompts/cover.svg",
    ogImage: "/assets/products/100-design-prompts/og.png",
    seoDescription: "One hundred design prompts for students who need a reason to start.",
  },
];

const shelfBySlug: Record<string, ProductShelf> = {
  "jury-me": "featured",
  "portfolio-roast": "featured",
  "brief-me": "featured",
  "design-roulette": "quick-tools",
  "design-iq": "quick-tools",
  "sketch-roulette": "quick-tools",
  "crit-card": "quick-tools",
  "idea-gym": "practice",
  "what-should-i-design": "practice",
  "design-dare": "coming-soon",
  "design-detective": "coming-soon",
  "design-entrance-simulator": "coming-soon",
  "100-design-prompts": "coming-soon",
};

export const productShelfOrder: ProductShelf[] = ["featured", "quick-tools", "practice", "coming-soon"];

export const productShelfLabels: Record<ProductShelf, string> = {
  featured: "Featured",
  "quick-tools": "Quick Tools",
  practice: "Practice",
  "coming-soon": "Coming Soon",
};

export const productShelfCopy: Record<ProductShelf, string> = {
  featured: "Start here if you have a jury, a case study, or a vague brief.",
  "quick-tools": "A spin, a diagnostic, a draw, or one question. Buy once. Open when you need it.",
  practice: "Timed sets and a next-project decision. Range, not a new identity.",
  "coming-soon": "Not for sale yet. Content still has to pass the release gate.",
};

const deliveryBySlug: Record<string, DeliveryType> = {
  "design-dare": "hybrid",
  "design-roulette": "app",
  "jury-me": "app",
  "brief-me": "app",
  "design-iq": "app",
  "portfolio-roast": "app",
  "idea-gym": "app",
  "design-detective": "app",
  "sketch-roulette": "app",
  "design-entrance-simulator": "hybrid",
  "what-should-i-design": "app",
  "crit-card": "app",
  "100-design-prompts": "hybrid",
};

export const products: Product[] = catalog.map((product) => {
  const deliveryType = deliveryBySlug[product.slug];
  const shelf = shelfBySlug[product.slug];
  if (!deliveryType) {
    throw new Error(`Missing delivery type for ${product.slug}`);
  }
  if (!shelf) {
    throw new Error(`Missing catalogue shelf for ${product.slug}`);
  }
  return {
    ...product,
    deliveryType,
    shelf,
    featured: shelf === "featured",
    version: "1.0",
    appPath: deliveryType === "download" ? undefined : `/tools/${product.slug}`,
    downloadAsset:
      deliveryType === "app" ? undefined : `product-deliverables/${product.slug}/v1/pack.pdf`,
  };
});

export function formatInr(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function isPublicStatus(status: ProductStatus) {
  return status === "live" || status === "coming-soon";
}

export function visibleProducts() {
  return products.filter((product) => isPublicStatus(product.status));
}

export function liveProducts() {
  return products.filter((product) => product.status === "live");
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function startingPrice() {
  const prices = visibleProducts().map((product) => product.price);
  return prices.length ? Math.min(...prices) : 0;
}

export function isProductFilter(value: string | null): value is "all" | ProductCategory {
  return Boolean(value && (productFilters as string[]).includes(value));
}

export function formatCategories(product: Product) {
  return product.categories.map((category) => productCategoryLabels[category]).join(" · ");
}

export function productsOnShelf(shelf: ProductShelf) {
  return Object.entries(shelfBySlug)
    .filter(([, value]) => value === shelf)
    .map(([slug]) => getProduct(slug))
    .filter((product): product is Product => {
      if (!product) return false;
      return isPublicStatus(product.status);
    });
}

export function catalogDisplayOrder() {
  return productShelfOrder.flatMap((shelf) => productsOnShelf(shelf));
}

export function getAdjacentProducts(slug: string) {
  const list = catalogDisplayOrder();
  const index = list.findIndex((product) => product.slug === slug);
  if (index < 0 || list.length < 2) return { prev: null, next: null };
  return {
    prev: list[(index - 1 + list.length) % list.length],
    next: list[(index + 1) % list.length],
  };
}

export const secretProductsIntro = {
  index: "/",
  label: "Secret Products",
  title: "Tools for people learning to design.",
  description: "Small, focused tools for design students. Buy once. Use when you need them.",
};
