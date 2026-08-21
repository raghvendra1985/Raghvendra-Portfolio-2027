export {
  DURATION,
  EASE,
  EASE_IN,
  EASE_IN_OUT,
  EASE_PHYSICAL,
  registerMotion,
  prefersReducedMotion,
  isTouchDevice,
  isMobileViewport,
  getMotionConfig,
  resolveReveal,
  showImmediately,
  createScope,
  gsap,
  ScrollTrigger,
} from "./motion";
export type { MotionConfig, RevealOptions, DurationKey } from "./motion";

export { animateHero } from "./hero";
export type { HeroOptions } from "./hero";

export { animateSection, animateImageReveal } from "./sections";
export { animateParallax, animateAmbient, animateProgress } from "./parallax";
export { animateCursor } from "./cursor";
export type { CursorLabel, CursorOptions } from "./cursor";
export { animateMagneticButton } from "./buttons";
export { playPageExit, playPageEnter, morphSharedImage } from "./pageTransition";
export { animateFooter } from "./footer";
export { animateLoader, hasVisited, markVisited, LOADER_DURATION_MS } from "./loader";
export type { LoaderOptions, LoaderPhase } from "./loader";
export { animateKnowledgeIndex, animateKnowledgeArticle, refreshKnowledgeIndexItems } from "./knowledge";
export type { KnowledgeArticleOptions } from "./knowledge";
export {
  animateCaseStudy,
  animateSelectedWork,
  crossfadeWorkVisual,
} from "./caseStudy";
export { animateNavigation } from "./navigation";
export { animateMenuOpen, animateMenuClose, menuOriginFromToggle } from "./menu";
export type { MenuOrigin } from "./menu";
export { animateSystem } from "./system";
export type { SystemOptions } from "./system";
export {
  animateConciergePanel,
  animateConciergeResults,
  animateConciergeMode,
  animateConciergeTrigger,
} from "./concierge";
export { animateContactForm } from "./forms";
export { animateNotFound } from "./notFound";
export { animateProductCards, refreshProductCards } from "./products";
export { animateLibraryEnter, animateLibraryFilter, animateLibraryShelf } from "./library";
export { animateStudioTicker, animateStudioCard } from "./studio";
export { animateAboutPolaroid, animateAboutStat } from "./about";
