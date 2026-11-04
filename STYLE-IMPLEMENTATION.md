# Style guide implementation

Reference inspection: 1 November 2026. Applied supplied `style.md` to the existing Elevate Thrive content. Original logo variants and the consulting-first copy remain the brand source.

## Browser-observed details

- https://charliehills.ai/about: light square-grid canvas; centred large heading; white introduction card; rounded cards with 8px/8px/16px shadow at 8% black.
- About timeline: a 2px blue gradient rail with a glow, a neutral track, staggered markers and 24px card padding. The fill point follows approximately 60% of viewport height. Inactive cards use opacity 0.3 and a 24px horizontal offset; active cards become fully visible. Observed classes specify a 700ms ease-out transition and reduced-motion override. The reproduction reverses this state on upward scroll.
- https://charliehills.ai/work-with-me: contact form is a white card, 28px radius, 40px desktop padding; inputs are rgb(236,236,240), 12px radius, 12px/16px padding.
- FAQs are native details/summary disclosures, initially open and independently collapsible. White card, 28px radius, 20px/24px padding. There was no observed custom accordion height animation; the reproduction retains native behavior.
- Offer-card computed styles advertise 320ms transform/rotation/border transitions. Clicking a heading to place the pointer on a reference offer card showed no transform or rotation change, so no speculative tilt or hover travel was added.
- Scroll-entry elements reported a view() timeline with an entry-to-60% range. The reproduction uses a deterministic scroll-position calculation with a 24px entry offset and opacity ramp, with no scroll interception.
- A narrow blue reading-progress bar tracks document scrolling.

## Intentional corrections and adaptations

The extraction's white-on-white text, zero button padding and contradictory size tables were not applied literally. Text stays dark on light surfaces; buttons retain accessible dimensions and white text on blue. SF Pro Display/system headings and bundled Space Grotesk body copy are retained. Main body text is 19px desktop and 17px phone, with smaller labels and captions. Inner-page titles use the observed centred composition; the existing homepage perspective sequence remains.

No career dates or client metrics were invented to fill the About timeline. Existing working principles and consulting/learning process steps use the timeline treatment instead. The white logo remains available for genuine dark surfaces; the newly light About section no longer triggers a dark header.

Figma contains editable completed layouts and three timeline progress states (0/50/100%). The actual reversible scrolling is implemented in the web preview, not claimed as a native Figma scroll simulation.

## Verification

- 18 behavior tests cover hero reversal, logo states, timeline reversal/activation, reduced motion, static inner pages, enquiry preparation and native FAQ defaults.
- Browser: all four pages inspected at requested desktop 1440px, phones 390px and 320px. Browser zoom produced reported CSS widths of 1309, 354 and 291px. No horizontal overflow.
- About timeline: moving down and back to y=1909.54541015625 restored the identical fill value 0.06662522895053799.
- FAQ mouse toggle and keyboard Enter toggle checked. All disclosures open on initial load.
- Manual reduced-motion check: reference-motion class removed, reading bar hidden, timeline fill 1 and card opacity 1. OS preference branch covered in simulated tests; device settings were not changed.
- Contact form measurements verified in-browser: 28px card radius and rgb(236,236,240) fields. Email remains draft-only.
- Figma desktop and mobile compositions visually inspected; full-width homepage timeline corrected after auto-layout direction change. Original frame links remain valid.
