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
import { setLenis, getLenis } from "@/hooks/useLenis";
import { captureUtmFromLocation } from "@/lib/utm";
import { hashScrollOffsetPx } from "@/lib/hash-scroll";
import Cursor from "@/components/cursor/Cursor";
import AmbientLayer from "@/components/ambient/AmbientLayer";
import ProgressBar from "@/components/progress/ProgressBar";
import PageTransition from "@/components/transition/PageTransition";
import Navigation from "@/components/navigation/Navigation";
import SiteFooter from "@/components/footer/SiteFooter";
import { ConciergeProvider } from "@/components/concierge/ConciergeProvider";
import ConciergeHost from "@/components/concierge/ConciergeHost";
import NowPlayingFloat from "@/components/music/NowPlayingFloat";
import HangingCharm from "@/components/delight/HangingCharm";

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
  const [pageReady, setPageReady] = useState(true);

  useEffect(() => {
    registerMotion();
    document.documentElement.classList.remove("is-loading");
    document.documentElement.classList.add("motion-ready");
    setPageReady(true);
  }, []);

  useEffect(() => {
    if (config.reducedMotion) {
      document.documentElement.classList.remove("is-loading");
      document.documentElement.classList.add("motion-ready");
      setPageReady(true);
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
        Boolean(
          node.closest(
            "input, textarea, select, [contenteditable='true'], [data-lenis-prevent]",
          ),
        ),
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
      if (hash) getLenis()?.scrollTo(hash, { offset: -hashScrollOffsetPx() });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, pageReady]);

  const markPageReady = useCallback(() => {
    document.documentElement.classList.remove("is-loading");
    document.documentElement.classList.add("motion-ready");
    setPageReady(true);
  }, []);

  const finishLoader = useCallback(() => {
    /* Loader removed — kept for API compatibility with markPageReady callers. */
  }, []);

  const value = useMemo(
    () => ({ config, pageReady, markPageReady, finishLoader }),
    [config, pageReady, markPageReady, finishLoader],
  );

  return (
    <ExperienceContext.Provider value={value}>
      <ConciergeProvider>
        <Cursor />
        <AmbientLayer />
        <ProgressBar />
        <PageTransition />
        <Navigation />
        <HangingCharm />
        <ConciergeHost />
        <NowPlayingFloat />
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
