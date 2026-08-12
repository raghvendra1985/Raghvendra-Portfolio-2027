# Motion engine

Sprint 1 cinematic system, expanded through Sprint 6. Import from `@/animations`. Do not write GSAP, Lenis, or SplitType inside `app/` page files.

All tweens use `transform`, `opacity`, or `filter`. Durations and easing come from `motion.ts`.

## Modules

| Module | Entry | Notes |
| --- | --- | --- |
| Tokens + GSAP | `motion.ts` | `DURATION`, `EASE`, `getMotionConfig()`, `createScope()` |
| Hero | `hero.ts` | SplitType line masks. `drift: false` for secondary PageHero. |
| Sections | `sections.ts` | Fade, mask, blur, translate, scale. Image: blur → scale → sharp. |
| Parallax / ambient / progress | `parallax.ts` | Mobile uses `parallaxScale` 0.35. Reduced motion is 0. |
| Cursor | `cursor.ts` | Labels: View, Open, Next, Play, Live, Ask. Off on touch and reduced motion. |
| Buttons | `buttons.ts` | Magnetic pull, arrow `x`, fill via `scaleX`, hover scale. |
| Page transition | `pageTransition.ts` | Overlay fade/scale/blur. Shared image morph uses `x/y/scale`. |
| Footer | `footer.ts` | Wordmark from below, link stagger, status opacity pulse. |
| Loader | `loader.ts` | 900ms. First visit only. Phases: wordmark → nav → hero → ready. |
| Knowledge | `knowledge.ts` | Index row stagger. Article block reveals. |
| Case study / selected work | `caseStudy.ts` | Sticky visual, crossfade, keyboard index, chapter reveals. |
| Founder OS | `system.ts` | Sticky chapter index, module reveals. Reduced motion skips pin. |
| Navigation | `navigation.ts` | Transparent → blur → compact → hide on down → reveal on up. |
| Concierge | `concierge.ts` | Panel, results, mode, Ask trigger enter/hover. |
| Forms | `forms.ts` | Contact field stagger. |
| 404 | `notFound.ts` | Editorial not-found line reveal + CTA. |

## Config

Pass `MotionConfig` from `useMotionConfig()` / `useExperience()`.

```ts
{ reducedMotion: boolean; isMobile: boolean; parallaxScale: number }
```

Every public `animate*` function accepts an options object with token-based defaults.

## Reduced motion

Lenis is not created. Loader is skipped. Reveals call `showImmediately()`. Cursor and ambient are hidden via CSS and JS.

## Adding a new animation

1. Add a function in the matching module (or a new file listed in `PROJECT.md`).
2. Accept `MotionConfig` and an options type.
3. Use `createScope()` so `revert()` cleans ScrollTriggers.
4. Export from `animations/index.ts`.
5. Call it from a component, never from a page file.
