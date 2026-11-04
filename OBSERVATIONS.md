# Reference inspection and verification

Reference: https://charliehills.ai/ — inspected in an interactive browser on 1 November 2026. The newsletter launch popup and cookie notice were dismissed before inspection. The cached text description alone was not used to infer animation.

## Observed

1. A white navigation bar remains at the top while scrolling. The hero has a faint square grid, blue radial glow and a perspective floor grid.
2. Initially the large headline is visible; supporting paragraph, form and audience pills are transparent. A small cluster of browser-style cover panels sits below the headline.
3. During scroll, the hero stage remains sticky. The headline remains fixed in the stage (no observed headline scale-out). Panels move from deep perspective toward and past the viewer, scaling through perspective and spreading to either side. Different depths and vertical positions create parallax. Near panels fade before leaving the viewport; distant panels fade into view.
4. Supporting content reveals near the end with an opacity change and upward movement. Computed styles showed the hidden supporting block translated down 28px initially, returning to 0px at rest. The floor fades away, with a subdued glow remaining.
5. After the sticky range, the completed hero scrolls upward normally. The partner band and next content section enter from below; there is no observed full-page crossfade or next-section zoom.
6. Scrolling upward restores the previous stages. Mobile preserves the same broad sequence with smaller panels and a taller content stage. Header subscription CTA is hidden on narrow screens.

## Read-only DOM evidence

At a desktop browser viewport of approximately 933 × 722, the hero section measured about 2024px tall. Its stage computed to `position: sticky`. The world used perspective 900px; the panel lane used perspective 1100px. Near the end, cards were clamped to translateZ(700px), rotated ±14° around Y, and opacity 0.

At the narrow reference viewport (requested 390 × 844; reported layout width approximately 355px due to the browser's zoom/layout state), the stage measured about 1034px tall and the full hero approximately 2609px. At the start, sampled cards had Z values around -1844, -2237, -2630 and -3000px; supporting content had opacity 0 and translateY(28px). These measurements establish the interaction structure, not an exact cross-device pixel-equivalence claim.

## Reproduction

The implementation uses a sticky stage, perspective world (900px), lane (1100px), 10 staggered panels, ±14° panel rotation, a far-depth entry ramp and near-depth exit ramp, a fading floor, and a 28px supporting-copy reveal. Decorative consulting diagrams replace the reference's third-party newsletter artwork. The three-line consulting headline needs different wrapping and stage composition from the two-line newsletter headline, so responsive spacing and the scroll distance are adapted. The reference's hidden signup is replaced with the supplied consulting paragraph and CTA.

Scroll timeline is deterministic and requestAnimationFrame-batched. There is no autoplay, elapsed-time timeline, wheel interception or forced scrolling. Reduced-motion mode is normal document flow with all substantive content immediately visible.

## Verification

- Browser inspection: desktop 1280 × 720 and 1440 × 900; tablet 768 × 1024; phones 390 × 844 and 320 × 568.
- No horizontal overflow at those inspected widths.
- Desktop pinning confirmed: stage top remained 80px after scrolling to y=468 and y=1368.
- Reverse test: moving down and back to y=1368 restored exactly the same panel transform and supporting opacity (0.63336).
- Next-section handoff visually checked: completed hero scrolls upward and problem section enters from below.
- Mobile navigation opens, Escape closes it and returns focus, and service anchor lands below the sticky header.
- In-page Reduce motion visually checked: no pinning, no panels, immediate copy and CTA, normal page height.
- Five automated behavior checks cover OS preference on initial load, preference changes, manual toggle, hidden-control accessibility, and exact reversal. Native OS preference switching was simulated in these checks; the actual device setting was not changed.
- Bundled Space Grotesk font loaded in the browser. Browser console had no warning/error entries during inspection.
- Mailto destinations inspected; no messages sent. No backend or booking availability is claimed.
- This is a focused implementation check, not a full screen-reader certification or cross-browser/device-lab audit.

## Logo update — 1 November 2026

Replaced the initial horizontal logo with the new supplied ElevateThrive Consulting SVG in website header/footer and all seven Figma placements. SVG is retained as native editable vector paths in Figma. Browser checked image loading and mobile overflow. The updated screenshot is qa/updated-logo-desktop.jpg; earlier screenshots document the original implementation.

## First-release extension — 1 November 2026

Implemented Services, About and Learning after structure review. Homepage and all inner pages share navigation, brand treatment and footer links. Built six editable inner-page Figma frames.

- Browser checked all three new pages at requested desktop 1440 × 900 and phone 390 × 844 viewports. This browser reported CSS layout widths of 1309px and 354px because of its zoom state. Services was additionally checked at requested 320 × 568 (reported layout width 291px). No horizontal overflow; one H1; active-page navigation and logos loaded.
- Workshop CTA correctly routes to `/services/?interest=Team%20Workshop#enquiry`, preselects the interest, and lands below the sticky header. The initial malformed options were corrected and retested.
- Empty required form fields block submission and focus the name input. Email-draft preparation, correct encoding, invalid-form behavior and fallback messaging tested in a simulated browser context; no enquiry was sent.
- Native FAQ disclosure opens; Escape closes mobile navigation and restores focus.
- 14 Node behavior checks pass, including the static inner-page branding fallback. 96 local links, anchors and asset references verified across four pages.
- Inner-page introductions use normal flow. No new pinned scrolling was added. Browser screenshots: `qa/services-1440.jpg`, `qa/about-1440.jpg`, `qa/learning-1440.jpg`, and corresponding `*-390.jpg` captures.
