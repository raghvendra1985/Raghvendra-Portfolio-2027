"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animateFooter } from "@/animations/footer";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { footerLinks, site } from "@/lib/site";
import ResumeCta from "@/components/cta/ResumeCta";
import { leadershipFooter } from "@/home/leadership-home";

export default function SiteFooter() {
  const rootRef = useRef<HTMLElement>(null);
  const { config } = useExperience();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = animateFooter(root, config);
    return () => ctx.revert();
  }, [config]);

  return (
    <footer ref={rootRef} className="overflow-hidden bg-navy text-mist">
      <div className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-12 sm:py-16 lg:py-20">
        <p
          data-footer-wordmark
          className="break-words font-serif text-[clamp(2.25rem,11vw,6.5rem)] font-normal leading-[0.92] tracking-[-0.03em] text-mist"
        >
          Raghvendra
          <span className="text-gold">.</span>
        </p>

        <div className="mt-10 grid gap-10 border-t border-mist/10 pt-8 sm:mt-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:pt-10">
          <div data-footer-link className="min-w-0">
            <p className="max-w-sm font-serif text-[length:var(--text-lead)] leading-snug text-mist/90">
              {leadershipFooter.blurb}
            </p>
            <p className="mt-5 type-small text-mist/70">{site.location}</p>
            <p
              data-footer-status
              className="mt-3 flex items-start gap-2 type-small text-mist/80"
            >
              <span
                data-status-dot
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-green"
                aria-hidden="true"
              />
              <span>
                {site.status}. {site.statusDetail}
              </span>
            </p>
          </div>

          <div>
            <p className="font-mono-label text-mist/70">Explore</p>
            <ul className="mt-4 space-y-1">
              {footerLinks.sitemap.map((link) => (
                <li key={link.href} data-footer-link>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center type-body text-mist/90 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono-label text-mist/70">Connect</p>
            <ul className="mt-4 space-y-1">
              {footerLinks.social
                .filter((link) => link.label !== "WhatsApp")
                .map((link) => (
                  <li key={link.label} data-footer-link>
                    <a
                      href={link.href}
                      aria-label={link.ariaLabel}
                      className="inline-flex min-h-10 items-center type-body text-mist/90 transition-colors hover:text-gold"
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              <li data-footer-link>
                <ResumeCta
                  appearance="text"
                  source="footer"
                  className="inline-flex min-h-10 items-center type-body text-mist/90 transition-colors hover:text-gold"
                />
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono-label text-mist/70">Also</p>
            <ul className="mt-4 space-y-1">
              {footerLinks.more.map((link) => (
                <li key={link.href} data-footer-link>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-10 items-center type-body text-mist/90 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-mist/10 pt-5 type-caption text-mist/50 sm:mt-14 sm:flex-row sm:flex-wrap sm:justify-between">
          <span>© {new Date().getFullYear()} Raghvendra Singh</span>
          <span>Motion supports the story. It never becomes the story.</span>
        </div>
      </div>
    </footer>
  );
}
