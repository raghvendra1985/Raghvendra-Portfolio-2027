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
      <div className="mx-auto max-w-[1440px] px-[var(--page-pad)] py-16 sm:py-20">
        <p
          data-footer-wordmark
          className="break-words font-display text-[clamp(2.35rem,14vw,9rem)] leading-[0.9]"
        >
          Raghvendra
          <span className="text-gold">.</span>
        </p>

        <div className="mt-12 grid gap-10 border-t border-mist/15 pt-10 sm:mt-16 md:grid-cols-2 lg:grid-cols-4">
          <div data-footer-link>
            <p className="max-w-xs type-body text-mist/85">{leadershipFooter.blurb}</p>
            <p className="mt-6 type-body text-mist/80">{site.location}</p>
            <p data-footer-status className="mt-3 flex items-start gap-2 text-base">
              <span
                data-status-dot
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green"
                aria-hidden="true"
              />
              <span>
                {site.status}. {site.statusDetail}
              </span>
            </p>
          </div>

          <div>
            <p className="font-mono-label text-mist/85">Explore</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.sitemap.map((link) => (
                <li key={link.href} data-footer-link>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-base text-mist hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono-label text-mist/85">Connect</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.social
                .filter((link) => link.label !== "WhatsApp")
                .map((link) => (
                  <li key={link.label} data-footer-link>
                    <a
                      href={link.href}
                      aria-label={link.ariaLabel}
                    className="inline-flex min-h-11 items-center text-base text-mist hover:text-gold"
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
                  className="inline-flex min-h-11 items-center text-base text-mist hover:text-gold"
                />
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono-label text-mist/85">Also</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.more.map((link) => (
                <li key={link.href} data-footer-link>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-base text-mist hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-mist/15 pt-6 font-mono-label text-mist/60 sm:flex-row sm:flex-wrap sm:justify-between">
          <span>© {new Date().getFullYear()} Raghvendra Singh</span>
          <span>Charms inspired by Karthik Mahadevan</span>
          <span>Motion supports the story. It never becomes the story.</span>
        </div>
      </div>
    </footer>
  );
}
