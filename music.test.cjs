const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('zlib');
const {musicIntro, musicLabel, musicFan} = require('./music.js');

const root = __dirname;
const data = JSON.parse(fs.readFileSync(path.join(root, 'music.json'), 'utf8'));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'music.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'music.js'), 'utf8');
const ids = ['7IjnfuMNfdrAXbefurdIIR','2r1CHpKRDdzHGJScn5UqjX','6fABlNfAOylt7ZxfX8K1XL','5oYRr51VatOtkFeEOursuZ','3APdIdF8H0jsxSuGOqXedS','03VTytguq5MS6e3x03y5i1','4M6CGErPaHO1z0vTOd4KMv','6w458kA8WOAIZr1ublxnK9','5ZsAhuQ24mWHiduaxJqnhW','6rDCSTANJ05fi9nDoEYRFu','3TAhWtQnpoL5Vl9VQPl9fU','1aY9jprCwAISYDrdXj9JYo'];

test('twelve real tracks render from music.json with local covers', () => {
  assert.equal(data.tracks.length, 12);
  assert.equal(musicIntro(data.tracks), '12 songs on repeat, mostly while designing.');
  data.tracks.forEach((track, index) => {
    assert.equal(track.url, 'https://open.spotify.com/track/' + ids[index]);
    assert.match(track.cover, /^\/assets\/music\/cover-\d\d\.jpg$/);
    assert.equal(fs.existsSync(path.join(root, track.cover.slice(1))), true);
    assert.match(musicLabel(track), new RegExp(track.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ' by ' + track.artist.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ', opens in Spotify'));
  });
  assert.equal(data.tracks[0].title, 'Socha Hai');
  assert.equal(data.tracks[11].title, 'Aaj Kal Zindagi');
});

test('the shelf sits before contact, links the radio, and stays inside the page', () => {
  const shelf = html.indexOf('id="on-repeat"');
  const contact = html.indexOf('id="contact"');
  assert.ok(shelf > 0 && shelf < contact);
  assert.match(html, /04 · On repeat/);
  assert.match(html, /The full radio/);
  assert.match(html, /37i9dQZF1E4CVBplrZZah6/);
  assert.match(js, /loading = 'lazy'/);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.equal(musicFan(800, 800), 0);
  assert.equal(musicFan(-10, 800), 1);
  const gz = zlib.gzipSync(Buffer.concat([Buffer.from(js), Buffer.from(css)])).length;
  assert.ok(gz < 3072, 'gzip ' + gz);
});
