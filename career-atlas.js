const atlas = document.querySelector('.career-atlas');
const track = atlas.parentElement;
const picker = atlas.querySelector('.atlas-nav');
const stage = atlas.querySelector('.atlas-stage');
const buttons = [...picker.querySelectorAll('button')];
const chapters = [...atlas.querySelectorAll('.atlas-chapters article')];
const frames = [...stage.children];
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = document.querySelector('#motion-toggle');
const last = chapters.length - 1;
let current = 0;
let pending = false;

function paint(position) {
  current = Math.round(position);
  buttons.forEach((button, index) => {
    const distance = index - position;
    const focus = Math.max(0, 1 - Math.abs(distance));
    const swell = focus * focus * (3 - 2 * focus);
    button.setAttribute('aria-pressed', String(index === current));
    chapters[index].hidden = index !== current;
    frames[index].style.setProperty('--atlas-y', `${Math.max(-2, Math.min(2, distance)) * 62}%`);
    frames[index].style.setProperty('--atlas-scale', .65 + .35 * swell);
    frames[index].style.opacity = Math.max(0, 1 - Math.abs(distance) * .72);
    frames[index].style.zIndex = Math.round(swell * 100);
    frames[index].classList.toggle('is-active', index === current);
  });
}

function measure() {
  const top = parseFloat(getComputedStyle(atlas).top);
  return {
    start: track.getBoundingClientRect().top + scrollY - top,
    distance: track.offsetHeight - atlas.offsetHeight,
  };
}

function update() {
  pending = false;
  const animate = !motionPreference.matches && motionToggle?.getAttribute('aria-pressed') !== 'true';
  track.classList.toggle('is-scroll-linked', animate);
  if (!animate || chapters.some(chapter => chapter.contains(document.activeElement))) return;
  const { start, distance } = measure();
  if (distance > 0) paint(Math.max(0, Math.min(1, (scrollY - start) / distance)) * last);
}

function queueUpdate() {
  if (pending) return;
  pending = true;
  requestAnimationFrame(update);
}

buttons.forEach((button, index) => button.addEventListener('click', () => {
  if (track.classList.contains('is-scroll-linked')) {
    const { start, distance } = measure();
    scrollTo({ top: start + distance * index / last, behavior: 'instant' });
  }
  paint(index);
}));
paint(current);
picker.hidden = stage.hidden = false;
addEventListener('scroll', queueUpdate, { passive: true });
addEventListener('resize', queueUpdate);
motionPreference.addEventListener('change', queueUpdate);
atlas.addEventListener('focusout', queueUpdate);
if (motionToggle) {
  new MutationObserver(queueUpdate).observe(motionToggle, { attributeFilter: ['aria-pressed'] });
}
update();
