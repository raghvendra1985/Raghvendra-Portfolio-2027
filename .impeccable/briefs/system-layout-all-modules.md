# System layout — future all-modules brief

**Status:** Parked. Do not implement until an explicit all-modules reopen is scheduled.  
**Capacity decision (2026-08-26):** Stay on Studio; do not reopen System for a four-module partial.  
**Contract:** Presentation-only (layout). Copy, contribution map, Ask System sources, and `/system#…` hashes stay as frozen.

## Reference

- Shape sample (Dashboard / Focus / Method / Decision Log): [system-layout-reference.html](./system-layout-reference.html) — retokened to mist/navy/green/gold and Bricolage + Manrope for parking in-repo; shapes match the capacity brief sample.
- Live surface: `components/system/*`, data in `founder-os/index.ts`

## Why all modules

Diagnosis: every content type uses the same stacked unit → monotony.  
Shipping only four new shapes leaves seven modules in the old unit → seams become the most visible thing on the page. **One ship, all eleven modules.**

## Shape families

| Module | Live `id` | Shape family |
|---|---|---|
| Dashboard | `dashboard` | Tile index grid (HTML proven) |
| Current Focus | `focus` | Card grid (HTML proven) |
| Method to evidence | `practice` | Definition / two-column rows (HTML proven) |
| Products as practice | `products` | Card grid (Focus family) |
| Operating Principles | `principles` | Definition rows (Method family) |
| Decision Log | `decisions` | Ledger timeline + existing `<details>` body (HTML proven) |
| Experiments | `experiments` | Status card grid (Focus family + status cue) |
| Writing and field notes | `knowledge` | Single CTA / hub block (micro-shape) |
| Teaching | `teaching` | Definition / article rows (Method family) |
| Roadmap | `roadmap` | Now / Next / Later status list (**third family**) |
| Archive | `archive` | Compact status / link list (**third family**) |

## Hard constraints when reopening

1. No copy rewrites; no contribution-map changes; no Ask System source invention.
2. All 11 modules in one production ship — no intermediate “four modules live.”
3. Keep Decision Log expandable evidence (context / trade-off / outcome / lesson).
4. Preserve `/system#…` hashes used by Notes evidence links and Ask.
5. Sticky chapter navigation must remain keyboard-accessible; prefer brand sticky index or a desktop rail that does not break mobile.
6. Full viewport + a11y verify; then re-freeze System in PRODUCT.md and DESIGN.md.

## Primary files (when scheduled)

- `components/system/SystemView.tsx`
- `components/system/FocusCard.tsx`
- `components/system/DecisionLog.tsx`
- `components/system/ExperimentCard.tsx`
- `components/system/Roadmap.tsx`
- `components/system/OSModule.tsx`
- `animations/system.ts`
- Data: `founder-os/index.ts` (read-only unless a layout field is truly missing)
