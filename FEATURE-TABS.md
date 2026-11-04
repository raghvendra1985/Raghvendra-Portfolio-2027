# Consulting feature grid
Applied to homepage consulting section and Services overview. Existing Services detail content retained. Reference inspected: https://ui.aceternity.com/blocks/feature-sections/feature-grid-with-motion-and-tabs
Observed: three visible visual cards, active heading emphasis, step controls/progress, timed cycling, hover/focus pause, direct selection. This is an original implementation; no paid component code used.
Adaptation: Strategy / Product Design / Automation with illustrative opportunity map, prototype and human-reviewed workflow. Six-second cycle is an implementation choice, not a measured reference timing.
Native tab semantics, roving keyboard focus, Left/Right/Home/End navigation. Manual selection stops autoplay until Play. Pauses on pointer hover, focus, offscreen, hidden page and reduced-motion settings. No JS leaves all content readable. Timer never moves focus. All25 tests pass, including four new feature behavior tests. Browser: manual selection/ArrowRight, selected-panel sync and 390px no-overflow verified.
Figma has not been changed for this feature-grid update.
