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

test('the shelf renders its count and labels from music.json', () => {
  assert.equal(data.tracks.length, 8);
  assert.match(data._comment, /placeholder/i);
  data.tracks.forEach(track => {
    assert.equal(track.title, 'Track title');
    assert.equal(track.artist, 'Artist');
    assert.equal(track.url, '#');
    assert.match(track.cover, /^\/assets\/music\/cover-0[1-8]\.svg$/);
    assert.equal(fs.existsSync(path.join(root, track.cover.slice(1))), true);
    assert.match(musicLabel(track), /Track title by Artist, opens in a new tab/);
  });
  assert.equal(musicIntro(data.tracks), '8 songs on rotation, mostly while designing.');
  assert.match(musicLabel({title: 'Night', artist: 'Ada', url: 'https://open.spotify.com/track/1'}), /opens in Spotify/);
});

test('home page mounts the shelf before contact and keeps motion optional', () => {
  const shelf = html.indexOf('id="on-repeat"');
  const contact = html.indexOf('id="contact"');
  assert.ok(shelf > 0 && shelf < contact);
  assert.match(html, /04 · On repeat/);
  assert.match(html, /What's on repeat\./);
  assert.match(js, /loading = 'lazy'/);
  assert.match(js, /requestAnimationFrame/);
  assert.match(js, /passive:\s*true/);
  assert.match(css, /scroll-snap-type:\s*x mandatory/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /--p:\s*1/);
  assert.match(css, /rs-zen/);
  const gz = zlib.gzipSync(Buffer.concat([Buffer.from(js), Buffer.from(css)])).length;
  assert.ok(gz < 3072, 'gzip ' + gz);
});

test('covers fan in as the shelf enters and stay put when motion is reduced', () => {
  assert.equal(musicFan(800, 800), 0);
  assert.ok(musicFan(400, 800) > 0.4 && musicFan(400, 800) < 0.6);
  assert.equal(musicFan(-20, 800), 1);
  assert.match(css, /animation:\s*none\s*!important/);
});
