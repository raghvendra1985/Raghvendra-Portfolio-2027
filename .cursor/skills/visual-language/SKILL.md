---
name: visual-language
description: Canonical illustration language for this portfolio — isometric system-objects, fine-line icons, editorial metaphors, pixel marks, and restrained motion. Use when generating or editing Work group marks, icon-library assets, visual-language prompts, or any original illustration for raghvendrasingh.com.
---

# Visual language

Illustration language for raghvendrasingh.com. Distinct from UI tokens (navy, mist, gold, green). Orange lives only inside generated objects. Site chrome never adopts paper, graphite, or signal orange.

Copyable templates live in [`visual-language/prompts/`](../../../visual-language/prompts/). Filled Work-group slots live in [`visual-language/filled/work-contribution-groups.json`](../../../visual-language/filled/work-contribution-groups.json). Generated system-objects live in [`public/assets/work/groups/`](../../../public/assets/work/groups/). The design-ops gallery is [`public/icon-library/system-object-library.html`](../../../public/icon-library/system-object-library.html).

## How to prompt

Replace text inside `[square brackets]`. Keep every invariant unchanged so independently generated assets remain coherent.

Do not invent a second illustration style. Do not mix all secondary narrative colors. Do not add text, letters, logos, or watermarks.

## Families

| Family | Template | Use |
|---|---|---|
| System-object | `system-object.txt` | Modular isometric metaphors. Work contribution groups use this family. |
| Fine-line icon | `fine-line-icon.txt` | 24×24 monoline section/action symbols. |
| Editorial illustration | `editorial-illustration.txt` | Wide geometric article/section metaphors. |
| Pixel-mark | `pixel-mark.txt` | Compact 3×3 or 4×4 section markers. |
| Motion | `motion.txt` | Animate a supplied still without redesigning it. |

Work, Home, System, Notes, About, Products, Contact, and Studio all use this family. Motion lives in `animations/systemObject.ts` — assemble / connect / reveal / align / resolve on reveal, hover, focus, or tap. Max travel 10px, signal-node scale ≤1.15. No continuous loop. Reduced motion is the resting PNG. Marks sit on mist `#EBEDE3`, paper `#F5F4F0`, or navy `#0B1849`.

The design-ops catalog at `/icon-library/system-object-library.html` (also `npm run library` on port 4173) includes a motion studio that runs all five meanings in parallel on one vertical scroll, plus per-mark scrub as the catalog grid passes.

Do not generate crowded satellite farms. Prefer three to four parts and 45–55% canvas occupation.

Place marks beside page heroes and section labels only. Do not wire them into case-study interiors, Featured rows, Archive lists, or admin/account/purchase chrome.

## Illustration palette

- Paper `#F4EEDF`
- Bone `#FFFAF0`
- Ink `#171916`
- Graphite `#292C29`
- Signal orange `#ED642F` — one active layer, decision point, or consequential node only

Optional secondary (pick at most one, or two for editorial only): coral `#EE776B`, gold `#EFB43E`, petrol `#103F4D`, blue `#4059DB`, mist `#C7D5CF` (editorial).

## Work group objects

Four filled subjects. Mist `#EBEDE3` background. One orange node. 1:1 raster. Quiet geometry.

| Group id | File | Metaphor |
|---|---|---|
| `product-direction` | `product-direction.png` | Two planes meet at one orange decision node. |
| `complex-systems` | `complex-systems.png` | Two modules on a rail around one orange core. |
| `ai-founder` | `ai-founder.png` | A compact orange module connecting to a short stack. |
| `enterprise-leadership` | `enterprise-leadership.png` | Two platforms bridged by one orange governance node. |

On `/work`, place the object (~80–96px square, no card chrome) beside the group `font-section-label`. Keep hash ids. Do not replace case-study covers, Featured rows, Archive, or GroupNav.

## Do not

- Restyle UI tokens or `DESIGN.md` to match this palette
- Put the gallery in site nav
- Wire generated objects into case-study interiors unless asked
- Use generic stock 3D, glassmorphism, neon, chrome, photorealism, or cyberpunk
