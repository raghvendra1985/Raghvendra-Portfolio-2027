# Elevate Thrive Consulting — editable landing page

A self-contained, buildless page. Open `index.html` directly, or run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then visit http://127.0.0.1:4173. No dependency installation is required.

## Edit

- `index.html`: complete visible copy, section order, navigation, email destinations.
- `styles.css`: brand tokens, typography, responsive layouts, sticky hero and reduced-motion styling.
- `motion.js`: original editable SVG diagrams and scroll timeline. `render()` derives all animation values from the current scroll position; scrolling upward reverses the same calculation.
- `assets/logo.svg`: updated ElevateThrive Consulting logo supplied on 1 November 2026, used by the website. `assets/logo.png` is the matching supplied raster copy. Original brand files are preserved.
- `assets/SpaceGrotesk.ttf`: bundled variable body font, with its SIL Open Font License. Headings use the system's SF Pro Display where available, then system sans-serif fallbacks; proprietary Apple fonts are not redistributed.
- `qa/`: browser screenshots. `OBSERVATIONS.md`: reference findings, implementation choices and verification.

Primary CTAs open an email draft to hello@raghvendrasingh.com. Sending remains the visitor's action. There is no booking system, form backend, analytics or data collection. This is a local preview, not a public deployment.

The approved consulting-first copy is retained for the hero, problem, services, process, founder, workshops and final conversion. The earlier blueprint's selected-work and insights sections were production instructions rather than ready content: no invented client case studies, metrics, portraits or resource downloads have been added.

## Motion

The default static HTML remains readable without JavaScript. When motion is enabled, the hero stage pins and the decorative panels travel toward the viewer with perspective scaling, lateral separation, opacity ramps and staggered depth. The final copy and CTA fade/translate into place before the stage releases. Neither the headline nor the entire page is arbitrarily scaled. No scroll hijacking or wheel interception is used.

The OS `prefers-reduced-motion` preference and the page's Reduce motion control both remove the extended scroll distance, pinning and decorative movement. Hidden hero controls are inert; the header contact CTA is always available except at very narrow widths, where visitors can disable motion or skip the introduction to reach services.

Run behavior checks with `node --test verify.cjs`. Tests need only Node's built-in modules. All production files work offline.

Logo transitions: `branding.js` links black → blue to hero scroll progress and switches to white on a navy header over the founder section. Reduced-motion mode shows blue immediately on light backgrounds. Transparent SVG derivatives are in `assets/logo-black.svg`, `logo-blue.svg`, and `logo-white.svg`; only their white background rectangles were removed. Supplied brand originals remain unchanged.

## First-release site pages

Home `/`, Services `/services/`, About `/about/`, Learning `/learning/`. Serve this folder as the web root so absolute asset and page paths resolve correctly. The homepage remains directly viewable as HTML; use the local server for the full multi-page site. `site.js` handles navigation and enquiry preparation; `branding.js` supports both the animated homepage and static inner-page introductions.

The Services form validates required name, email and challenge fields and prepares an email draft. It does not submit to a server or send a message. The form provides an email-draft fallback link after preparation. A workshop link can preselect `Team Workshop`.

About copy is based on the approved design/teaching/applied-AI positioning. No client case studies, employment timeline, quantified outcomes, fixed workshop durations, testimonials or unconfirmed credentials are presented. Workshop outcomes describe intended learning goals. Dates, formats, group sizes and fees remain subject to a proposal. Insights and Resources are not part of this release.

Run all behavior checks: `node --test verify.cjs branding.test.cjs site.test.cjs`.

## Supplied style guide update

`style.md` is the supplied extraction. `reference-style.css` and `reference-motion.js` apply the browser-observed card, native FAQ, contact, timeline and scroll-entry behavior. `STYLE-IMPLEMENTATION.md` records measurements, extraction corrections, adaptations and verification. Run the full suite with `node --test *.test.cjs verify.cjs`. The editable Figma file is updated in place; existing links remain valid.

## Run locally with Node.js

- `npm run dev` serves the editable source at http://127.0.0.1:4173/. Refresh after editing.
- `npm run build` generates the static site in `dist/`. Edit the source files and rebuild to refresh it.
- `npm run preview -- --port 4174` serves the built site at http://127.0.0.1:4174/ so the existing preview can stay open.
- `npm test` runs the automated checks.

If port 4173 is already occupied, use `npm run dev -- --port 4175`.
