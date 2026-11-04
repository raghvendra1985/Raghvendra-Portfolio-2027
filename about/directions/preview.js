const directions = [...document.querySelectorAll('.direction')];
const links = [...document.querySelectorAll('.direction-picker a')];
function showDirection() {
  const active = directions.find(section => '#' + section.id === location.hash) || directions[0];
  directions.forEach((section, index) => {
    section.hidden = section !== active;
    section.classList.toggle('is-entering', section === active);
    if (section === active) links[index].setAttribute('aria-current', 'true');
    else links[index].removeAttribute('aria-current');
  });
}
addEventListener('hashchange', showDirection);
showDirection();
const chapterButtons = [...document.querySelectorAll('[data-chapter]')];
const panels = [...document.querySelectorAll('.atlas-panel')];
function chooseChapter(index) {
  chapterButtons.forEach((button, position) => {
    button.setAttribute('aria-pressed', String(position === index));
    panels[position].hidden = position !== index;
    panels[position].classList.toggle('is-entering', position === index);
  });
}
chapterButtons.forEach((button, index) => button.addEventListener('click', () => chooseChapter(index)));
chooseChapter(0);
const rows = [...document.querySelectorAll('.rail li')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.target.classList.toggle('is-current', entry.isIntersecting));
}, {rootMargin: '-20% 0px -45% 0px'});
rows.forEach(row => observer.observe(row));
