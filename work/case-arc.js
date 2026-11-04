function enhanceArc(group, figures) {
  const gallery = document.createElement('div');
  gallery.className = 'case-arc';
  gallery.setAttribute('role', 'region');
  gallery.setAttribute('aria-label', 'Case study image gallery');
  gallery.innerHTML = '<div class="case-arc-stage" aria-hidden="true"></div><div class="case-arc-controls"><button type="button" aria-label="Previous image">←</button><span role="status"></span><button type="button" aria-label="Next image">→</button></div><p class="case-arc-caption"></p><a class="case-arc-full">Open full-size image</a>';
  const stage = gallery.querySelector('.case-arc-stage');
  const caption = gallery.querySelector('.case-arc-caption');
  const full = gallery.querySelector('.case-arc-full');
  const status = gallery.querySelector('[role="status"]');
  const [previous, next] = gallery.querySelectorAll('button');
  const entries = figures.map(figure => {
    const image = figure.querySelector('img').cloneNode();
    image.alt = '';
    image.draggable = false;
    const original = figure.querySelector('img');
    const label = figure.querySelector('figcaption')?.textContent.trim() || original.alt;
    stage.append(image);
    return { image, label, url: figure.querySelector('a')?.href || original.src };
  });
  let active = 0;
  let startX;

  function render() {
    entries.forEach(({image}, index) => {
      let offset = index - active;
      if (offset > entries.length / 2) offset -= entries.length;
      if (offset < -entries.length / 2) offset += entries.length;
      image.style.setProperty('--arc-x', `${offset * 65}%`);
      image.style.setProperty('--arc-y', `${Math.abs(offset) * 17}%`);
      image.style.setProperty('--arc-tilt', `${offset * 13}deg`);
      image.style.setProperty('--arc-scale', offset === 0 ? 1 : .76);
      image.style.opacity = offset === 0 ? 1 : Math.abs(offset) === 1 ? .55 : 0;
      image.style.zIndex = offset === 0 ? 2 : 1;
    });
    status.textContent = `${active + 1} / ${entries.length}`;
    caption.textContent = entries[active].label;
    full.href = entries[active].url;
  }
  function move(step) {
    active = (active + step + entries.length) % entries.length;
    render();
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  gallery.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowLeft' ? -1 : 1);
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
    if (Math.abs(distance) > 30) move(distance < 0 ? 1 : -1);
  });
  group[0].before(gallery);
  group.forEach(element => { element.hidden = true; });
  render();
}

document.querySelectorAll('.case-study ul, .case-study ol').forEach(list => {
  const items = [...list.children];
  const figures = items.map(item => item.firstElementChild);
  if (figures.length > 1 && figures.every(figure => figure?.matches('figure') && figure.querySelector('img'))) {
    enhanceArc([list], figures);
  }
});

document.querySelectorAll('.case-study section').forEach(section => {
  let run = [];
  [...section.children, null].forEach(child => {
    if (child?.matches('figure') && child.querySelector('img')) {
      run.push(child);
      return;
    }
    if (run.length > 1) enhanceArc(run, run);
    run = [];
  });
});
