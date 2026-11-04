const practice = document.querySelector('.course-library');
const grid = practice.querySelector('.practice-grid');
const cards = [...grid.querySelectorAll('.course-preview')];
const layouts = practice.querySelector('.practice-controls');
const controls = practice.querySelector('.orbit-controls');
const stage = document.createElement('div');
stage.className = 'orbit-stage';
stage.hidden = true;
stage.setAttribute('aria-hidden', 'true');
grid.before(stage);
const previews = cards.map(card => card.querySelector('.practice-image img').cloneNode());
previews.forEach(image => { image.draggable = false; });
stage.append(...previews);
let layout = 'grid';
let index = 0;
let startX;

function renderPractice() {
  const orbit = layout === 'orbit';
  grid.dataset.layout = layout;
  stage.hidden = controls.hidden = !orbit;
  layouts.querySelectorAll('button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.layout === layout));
  });
  cards.forEach((card, position) => {
    card.hidden = orbit && position !== index;
    card.querySelector('.practice-image').hidden = orbit;
    const angle = (position - index) * 2 * Math.PI / cards.length;
    const depth = Math.cos(angle);
    previews[position].style.transform = `translate(-50%, -50%) translateX(${Math.sin(angle) * 100}%) translateZ(${(depth - 1) * 160}px) rotateY(${Math.sin(angle) * 38}deg)`;
    previews[position].style.opacity = Math.max(0, depth);
    previews[position].style.zIndex = Math.round(100 + depth * 90);
  });
  controls.querySelector('[role="status"]').textContent =
    `${index + 1} of ${cards.length} · ${cards[index].querySelector('h3').textContent}`;
}

function move(direction) {
  index = (index + direction + cards.length) % cards.length;
  renderPractice();
}

layouts.addEventListener('click', event => {
  const button = event.target.closest('button[data-layout]');
  if (!button) return;
  layout = button.dataset.layout;
  renderPractice();
});
controls.addEventListener('click', event => {
  const button = event.target.closest('button[data-direction]');
  if (button) move(Number(button.dataset.direction));
});
stage.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0) return;
  startX = event.clientX;
  stage.setPointerCapture(event.pointerId);
});
stage.addEventListener('pointercancel', () => { startX = undefined; });
stage.addEventListener('pointerup', event => {
  if (!event.isPrimary || startX === undefined) return;
  const distance = event.clientX - startX;
  startX = undefined;
  if (Math.abs(distance) > 35) move(distance < 0 ? 1 : -1);
});
layouts.hidden = false;
renderPractice();

const workshopGallery = document.querySelector('.workshop-gallery');
const workshopStage = workshopGallery.querySelector('.workshop-stage');
const workshopEntries = [...workshopGallery.querySelectorAll('.workshop-entry')];
const workshopPicker = workshopGallery.querySelector('.workshop-picker');
const workshopFrames = workshopEntries.map(entry => entry.querySelector('img').cloneNode());
const workshopCue = workshopGallery.querySelector('.workshop-cue');
const workshopMotion = matchMedia('(prefers-reduced-motion: reduce)');
const workshopToggle = document.querySelector('#motion-toggle');
workshopGallery.querySelector('.workshop-frames').append(...workshopFrames);

function drawWorkshops(position) {
  const active = Math.round(position);
  workshopCue.firstElementChild.textContent = String(active + 1).padStart(2, '0') + ' / ' + String(workshopEntries.length).padStart(2, '0');
  workshopEntries.forEach((entry, index) => {
    const distance = index - position;
    const focus = Math.max(0, 1 - Math.abs(distance));
    entry.hidden = index !== active;
    workshopPicker.children[index].setAttribute('aria-pressed', String(index === active));
    workshopFrames[index].style.setProperty('--offset', `${distance * 94}px`);
    workshopFrames[index].style.setProperty('--size', 0.55 + focus * 0.45);
    workshopFrames[index].style.opacity = 0.22 + focus * 0.78;
    workshopFrames[index].style.zIndex = Math.round(focus * 100);
  });
}

workshopEntries.forEach((entry, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = entry.querySelector('h3').textContent;
  button.setAttribute('aria-controls', entry.id);
  button.addEventListener('click', () => {
    const start = workshopGallery.getBoundingClientRect().top + scrollY - parseFloat(getComputedStyle(workshopStage).top);
    scrollTo({ top: start + (workshopGallery.offsetHeight - workshopStage.offsetHeight) * index / (workshopEntries.length - 1), behavior: 'instant' });
    drawWorkshops(index);
  });
  workshopPicker.append(button);
});

let workshopPending = false;
function updateWorkshops() {
  workshopPending = false;
  const enabled = !workshopMotion.matches && workshopToggle?.getAttribute('aria-pressed') !== 'true';
  workshopGallery.classList.toggle('is-enhanced', enabled);
  workshopPicker.hidden = workshopCue.hidden = !enabled;
  if (!enabled) {
    workshopEntries.forEach(entry => { entry.hidden = false; });
    return;
  }
  if (workshopEntries.some(entry => entry.contains(document.activeElement))) return;
  const travel = workshopGallery.offsetHeight - workshopStage.offsetHeight;
  const offset = workshopStage.getBoundingClientRect().top - workshopGallery.getBoundingClientRect().top;
  drawWorkshops(Math.min(1, Math.max(0, offset / travel)) * (workshopEntries.length - 1));
}
function queueWorkshops() {
  if (workshopPending) return;
  workshopPending = true;
  requestAnimationFrame(updateWorkshops);
}
window.addEventListener('scroll', queueWorkshops, { passive:true });
window.addEventListener('resize', queueWorkshops);
workshopMotion.addEventListener('change', queueWorkshops);
workshopGallery.addEventListener('focusout', queueWorkshops);
if (workshopToggle) {
  new MutationObserver(queueWorkshops).observe(workshopToggle, { attributeFilter:['aria-pressed'] });
}
updateWorkshops();
