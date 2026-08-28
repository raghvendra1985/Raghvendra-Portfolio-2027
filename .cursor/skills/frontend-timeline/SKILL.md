---
name: frontend-timeline
description: Canonical career/history timeline for this portfolio. Use Relume Timeline 7 rebuilt in local tokens — sticky chapter heading, gold vertical spine, numbered eras. Use when building or editing About experience chapters, practice history, chronological era lists, Relume timelines, or /about#experience.
---

# Frontend timeline

When this portfolio needs a chronological career or practice history, use **Relume Timeline 7** as the source pattern. Rebuild it locally. Do not paste Relume markup or install `@relume_io/relume-ui`.

Reference: https://www.relume.ai/components/timeline-7  
Relume `preview?cid=` URLs 404 without login — do not depend on them.

## Where it lives

- Route: `/about#experience`
- Data: `TimelineEra` in `about/index.ts` (`range`, `role`, `org`, `context`, `owned`, `learned`, optional `evidence`)
- UI: `components/about/AboutTimeline.tsx`

Do not invent era images. Studio owns photography. Do not change Work, Products, Studio, nav, or global tokens for a timeline.

## Layout

Desktop: sticky left heading (“Five chapters. One direction.”). Right column is a gold vertical spine with `01`–`05` nodes and the era copy.

Mobile: heading stays in document flow (not sticky). Spine becomes a left rail. Evidence links stay at least 44px tall.

Stats above the timeline stay as `AboutCard`s. Timeline eras are **not** cards — one shape per section.

Keep era `id`s (`founder`, `leadership-arc`, `ux-lead-arc`, `product-industrial`, `foundations`) for hash links and concierge.

## Visual rules

- Tokens: mist, navy, gold, green. `type-h2` / `type-h3`, `font-mono-label` for dates and node numbers.
- Motion: existing `SectionReveal` only. Honor reduced motion. No Relume scroll-hijack.
- Evidence: text links (`Selected evidence →`), not Relume buttons.

## Forbidden Relume variants

| Relume | Do not use |
|---|---|
| 1, 5 | Already the old About card list. No gain. |
| 2, 11, 13 | Image-led. No era photos. |
| 3, 4 | Process/step chrome. |
| 8, 12 | Zigzag / bento cards. Fights long copy. |
| 14, 15 | Tabs hide the five chapters. |
| 10 | Too thin for this copy. |

Runner-up is Timeline 1 only if the spine is later judged too much. Not the default.

## Do not

- Install Relume packages
- Add placeholder images, extra CTAs, or tabbed years
- Wrap eras in `AboutCard`
- Restyle the rest of About to match Relume
