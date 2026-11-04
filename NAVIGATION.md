# Navigation update
Reference: Animmaster Lib /navs, second card. Inspected the enlarged video preview: rounded upper-right panel expands from the Menu control, with large stacked links revealed upward. Adapted bright surface to Elevate Thrive blue with the supplied white header logo.

Implementation: navigation.js progressively moves the existing navigation into a native modal dialog. navigation.css supplies a 480ms clipped expansion and staggered 500ms link reveals. These durations are adaptation choices, not measured source timings. Reduced-motion preference removes animations. Existing page links and footer remain intact. The native dialog contains focus; Escape, Close, backdrop and link selection dismiss it. Closing restores focus and background scrolling.

Verified in browser: desktop open, focus on Close, Escape restores Menu focus and scroll; 390px mobile panel fits with no document overflow; Close works. Existing 18 tests pass. Figma has not been updated in this change.
