"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import {
  registerMotion,
  ScrollTrigger,
  type MotionConfig,
} from "@/animations/motion";
import { useMotionConfig } from "@/hooks/useMotionConfig";
import { hasVisited, markVisited } from "@/animations/loader";
import { setLenis, getLenis } from "@/hooks/useLenis";
import { captureUtmFromLocation } from "@/lib/utm";
import Loader from "@/components/loader/Loader";
import Cursor from "@/components/cursor/Cursor";
import AmbientLayer from "@/components/ambient/AmbientLayer";
import ProgressBar from "@/components/progress/ProgressBar";
import PageTransition from "@/components/transition/PageTransition";
import Navigation from "@/components/navigation/Navigation";
import SiteFooter from "@/components/footer/SiteFooter";
import { ConciergeProvider } from "@/components/concierge/ConciergeProvider";
import ConciergeHost from "@/components/concierge/ConciergeHost";

type ExperienceValue = {
  config: MotionConfig;
  pageReady: boolean;
  markPageReady: () => void;
  finishLoader: () => void;
};

const ExperienceContext = createContext<ExperienceValue | null>(null);

export function useExperience() {
  const value = useContext(ExperienceContext);
  if (!value) {
    throw new Error("useExperience must be used inside ExperienceProvider");
  }
  return value;
}

export default function ExperienceProvider({ children }: { children: ReactNode }) {
  const config = useMotionConfig();
  const pathname = usePathname();
  const [pageReady, setPageReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    registerMotion();
    const first = !hasVisited();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (first && !reduced) {
      document.documentElement.classList.add("is-loading");
      setShowLoader(true);
    } else {
      document.documentElement.classList.add("motion-ready");
      setPageReady(true);
    }
  }, []);

  useEffect(() => {
    if (config.reducedMotion) {
      document.documentElement.classList.remove("is-loading");
      document.documentElement.classList.add("motion-ready");
      setPageReady(true);
      setShowLoader(false);
      return;
    }

    const lenis = new Lenis({
      duration: config.isMobile ? 0.9 : 1.2,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: config.isMobile ? 1 : 1.05,
      wheelMultiplier: config.isMobile ? 0.85 : 1,
      anchors: true,
      autoRaf: true,
      allowNestedScroll: true,
      prevent: (node) =>
        Boolean(node.closest("input, textarea, select, [contenteditable='true']")),
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, [config.reducedMotion, config.isMobile]);

  useEffect(() => {
    captureUtmFromLocation();
  }, [pathname]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      getLenis()?.resize();
      ScrollTrigger.refresh();
      const hash = window.location.hash;
      if (hash) getLenis()?.scrollTo(hash, { offset: -88 });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const markPageReady = useCallback(() => {
    document.documentElement.classList.remove("is-loading");
    document.documentElement.classList.add("motion-ready");
    setPageReady(true);
  }, []);

  const finishLoader = useCallback(() => {
    setShowLoader(false);
  }, []);

  useEffect(() => {
    if (pageReady) return;
    const id = window.setTimeout(() => {
      markVisited();
      markPageReady();
      finishLoader();
    }, 2000);
    return () => window.clearTimeout(id);
  }, [pageReady, markPageReady, finishLoader]);

  const value = useMemo(
    () => ({ config, pageReady, markPageReady, finishLoader }),
    [config, pageReady, markPageReady, finishLoader],
  );

  return (
    <ExperienceContext.Provider value={value}>
      <ConciergeProvider>
        {showLoader ? <Loader /> : null}
        <Cursor />
        <AmbientLayer />
        <ProgressBar />
        <PageTransition />
        <Navigation />
        <ConciergeHost />
        <div className="site-content flex min-h-full flex-1 flex-col pb-20 lg:pb-0">
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </ConciergeProvider>
    </ExperienceContext.Provider>
  );
}
