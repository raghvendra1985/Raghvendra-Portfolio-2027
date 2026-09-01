# Raghvendra Singh Portfolio V8

Architecture specification. Sprint 1 through Sprint 7 (Performance, QA, and Launch Readiness) are complete.

## Vision

A premium editorial portfolio that feels like a modern digital product.

References: Hanza (editorial), Apple (motion), Linear (engineering), Stripe (clarity), Vercel (simplicity).

The site represents a Product Design Leader, Systems Thinker, and AI Product Builder.

Motion supports storytelling. It never becomes the story.

## Sprint 1 — Cinematic Experience Engine

Status: complete.

Create one reusable animation system that every page shares.

Nothing animates independently. Every animation comes from `animations/`.

Page files must not contain animation code.

## Sprint 2 — Premium Case Studies

Status: complete.

Flagship/lightweight work inventory, editorial detail template, work-index filters. Motion still comes from `animations/`.

## Sprint 3 — Founder Operating System

Status: complete.

Editorial `/system` — how the practice thinks, builds, decides, learns, and operates. Motion still comes from `animations/`.

## Sprint 4 — Knowledge Hub 2.0

Status: complete.

Editorial `/knowledge` publication — index, article template, reusable frameworks, typed content. Nav label remains Knowledge. Motion still comes from `animations/`.

## Sprint 5 — AI Concierge

Status: complete.

Local-first Ask Raghvendra command palette. Deterministic retrieval over structured portfolio content. No external LLM. Motion still comes from `animations/`.

## Sprint 6 — Motion library expansion

Status: complete.

PageHero line-mask reveal, contact form stagger, editorial 404, concierge trigger polish, cursor Ask label, docs synced. No new animation libraries.

## Sprint 7 — Performance, QA, and Launch Readiness

Status: complete.

Mobile blur gating, ImageReveal fallbacks, font CLS alignment, a11y (aria-current, Concierge inert, form validation), Person JSON-LD + OG/Twitter completeness, error boundary, empty-filter copy, lint/typecheck/build gates. No deploy — launch review (Vercel, analytics, domain) is a separate decision.

## Tech stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis
- SplitType
- Framer Motion (micro interactions only)
- next/image

## Design language

Swiss editorial. Large type. Editorial whitespace. Minimal color. No gradients except ambient lighting. Motion feels physical.

Do not change visual branding, typography, spacing, or content unless the animation system requires it.

### Brand colors

| Token | Hex |
| --- | --- |
| Navy | `#0B1849` |
| Green | `#124D1C` |
| Gold | `#E4B028` |
| Mist | `#EBEDE3` |

### Typography

- Display: Bricolage Grotesque (local OFL variable), fallback system-ui
- Body / UI: Manrope
- Mono: Space Mono (code and product runtime only)

## Motion rules

Animate only `transform`, `opacity`, and `filter`.

Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.

Target 60 FPS.

### Tokens

Motion organises complexity and returns the interface to calm. No bounce, elastic, or spring overshoot.

| Name | Seconds |
| --- | --- |
| Instant | 0.10 |
| Fast | 0.18 |
| UI | 0.24 |
| Panel | 0.42 |
| Reveal | 0.70 |
| Story | 1.10 |
| Atmosphere | 14 |

Primary ease: `cubic-bezier(0.165, 0.84, 0.44, 1)` (`EASE_ENTER`). UI feedback uses `EASE_STANDARD`. Hover travel stays under 4px.

## Accessibility

WCAG 2.2 AA. Keyboard navigation. Visible focus. Reduced motion. Semantic HTML. Lighthouse Accessibility 100.

## Folder structure

```
app/
components/
animations/
hooks/
styles/
public/
assets/
case-studies/
knowledge/
services/
```

## Motion modules

| File | Responsibility |
| --- | --- |
| `animations/motion.ts` | Tokens, GSAP register, reduced-motion config |
| `animations/hero.ts` | SplitType lines, copy fade, CTA stagger, mouse drift |
| `animations/sections.ts` | Section reveal + image reveal |
| `animations/parallax.ts` | Parallax, ambient, progress |
| `animations/cursor.ts` | Magnetic cursor + labels |
| `animations/buttons.ts` | Magnetic buttons, arrow, fill, scale |
| `animations/pageTransition.ts` | Fade, scale, blur, shared image, reveal |
| `animations/footer.ts` | Wordmark, link stagger, status |
| `animations/loader.ts` | First-visit 900ms sequence |
| `animations/knowledge.ts` | Index rows + article blocks |
| `animations/caseStudy.ts` | Case study page + selected work |
| `animations/system.ts` | Founder OS chapter index + reveals |
| `animations/navigation.ts` | Transparent → blur → compress → hide → reveal |
| `animations/concierge.ts` | Panel, results, mode, Ask trigger enter |
| `animations/forms.ts` | Contact form field stagger |
| `animations/notFound.ts` | Editorial 404 line reveal + CTA |
| `animations/systemObject.ts` | Assemble / connect / reveal / align / resolve |
| `animations/productStory.ts` | Screening, Drafting, Briefing product previews |
| `animations/work.ts` | Card hover + linear ticker |

Every animation is configurable. Complex timelines are commented.

## Experience sequence

### Loader (first visit only, 900ms)

Background fade → wordmark → navigation → hero → page ready.

Skip on return visits and when `prefers-reduced-motion: reduce`.

### Smooth scroll (Lenis)

Smooth wheel, smooth touch, anchor scrolling, reduced-motion skip, keyboard still works.

### Page transitions

Fade, scale, shared image, blur, reveal across Home, About, Work, Knowledge, Contact, Case Studies.

## Performance budget

| Metric | Target |
| --- | --- |
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| CLS | < 0.05 |
| LCP | < 2s |

## Coding rules

- TypeScript
- Reusable components
- No duplicated animation code
- Modular files
- Document every animation
- No inline styles
- No jQuery
- No CSS animation unless extremely lightweight
