const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

test('homepage hero art is in the document with reserved dimensions', () => {
  const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
  const hero = html.slice(html.indexOf('class="hero"'), html.indexOf('class="hero-controls"'));
  assert.match(hero, /data-hero-art/);
  assert.match(hero, /<svg width="340" height="210"/);
  assert.equal(/loading="lazy"/.test(hero), false);
  const css = fs.readFileSync(__dirname + '/home.css', 'utf8');
  assert.match(css, /\.home-page \.world\{display:block/);
  assert.match(css, /aspect-ratio:340\/236/);
  assert.match(css, /aspect-ratio:340\/210/);
});
