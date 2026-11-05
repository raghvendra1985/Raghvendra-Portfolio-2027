const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync(__dirname + '/intent.js', 'utf8');
const context = { URLSearchParams };
vm.runInNewContext(source, context);
const et = context.ETIntent;

test('query intent wins and only known values are kept', () => {
  assert.equal(et.readFor('?for=recruiter'), 'recruiter');
  assert.equal(et.readFor('?for=Client'), 'client');
  assert.equal(et.readFor('?for=student&x=1'), 'student');
  assert.equal(et.readFor('?for=browsing'), 'browsing');
  assert.equal(et.readFor('?for=ceo'), '');
  assert.equal(et.activeIntent('?for=client', 'recruiter'), 'client');
  assert.equal(et.activeIntent('', 'student'), 'student');
  assert.equal(et.activeIntent('?for=nope', 'student'), 'student');
});

test('intent is stored and restored without throwing on a blocked store', () => {
  const store = new Map();
  const storage = { getItem: (k) => store.get(k) || null, setItem: (k, v) => store.set(k, v) };
  et.remember(storage, 'recruiter');
  assert.equal(et.recall(storage), 'recruiter');
  et.remember(storage, 'nope');
  assert.equal(et.recall(storage), 'recruiter');
  assert.equal(et.recall({ getItem() { throw new Error('blocked'); } }), '');
  assert.doesNotThrow(() => et.remember({ setItem() { throw new Error('blocked'); } }, 'client'));
});

test('tour scripts are 6, 6, and 5 with Get access hidden until a flag or URL', () => {
  assert.equal(et.visibleBeats('recruiter').length, 6);
  assert.equal(et.visibleBeats('client').length, 6);
  const hidden = et.visibleBeats('student', {});
  assert.equal(hidden.length, 5);
  assert.equal(hidden[0].id, 'teaching');
  assert.equal(hidden[0].hash, '#teaching');
  assert.equal(hidden.some((beat) => beat.id === 'access'), false);
  const flagged = et.visibleBeats('student', { flag: 'live' });
  assert.equal(flagged.length, 6);
  assert.equal(flagged[5].id, 'access');
  assert.equal(flagged[5].path, '/resources/');
  const linked = et.visibleBeats('student', { url: '/kit/' });
  assert.equal(linked[5].path, '/kit/');
  const external = et.visibleBeats('student', { url: 'https://example.com/kit' });
  assert.equal(external[5].external, 'https://example.com/kit');
  const blocked = et.visibleBeats('student', { url: '//evil.example/kit' });
  assert.equal(blocked[5].path, '/resources/');
  assert.equal(blocked[5].external, undefined);
  assert.equal(et.visibleBeats('student', { on: true }).length, 6);
  assert.equal(et.visibleBeats('student', { url: null }).length, 5);
});

test('recruiter CTA downloads the published CV and client and student CTAs hit real targets', () => {
  const hiring = et.ctaFor('recruiter', '/work/');
  assert.equal(hiring.label, 'Download CV');
  assert.equal(hiring.href, '/cv.pdf');
  assert.match(hiring.hero, /Open to remote Staff\/Principal Product Designer roles/);
  assert.equal(et.ctaFor('client', '/services/').href, '#enquiry');
  assert.equal(et.ctaFor('client', '/work/').href, '/services/#enquiry');
  assert.equal(et.ctaFor('client', '/services/').label, 'Start a project');
  assert.equal(et.ctaFor('student', '/tools/').href, '#tools-library-title');
  assert.equal(et.ctaFor('student', '/services/').label, 'Explore tools');
  assert.equal(et.ctaFor('browsing', '/work/'), null);
  assert.equal(et.ctaFor('recruiter', '/about/'), null);
  assert.equal(et.ctaFor('recruiter', '/work/nye-team/'), null);
});

test('tour copy does not invent prices, a CV file, or a chat handoff', () => {
  const live = ['recruiter', 'client', 'student'].flatMap((intent) => et.visibleBeats(intent));
  const text = live.map((beat) => beat.title + ' ' + beat.body).join('\n');
  assert.equal(/₹/.test(text), false);
  assert.equal(/book 20|testimonial|whatsapp\.com|ask me anything/i.test(text), false);
  assert.equal(text.replaceAll('/cv.pdf', '').includes('.pdf'), false);
  const access = et.visibleBeats('student', { flag: 'live' }).find((beat) => beat.id === 'access');
  assert.match(access.body, /₹399/);
  assert.match(access.body, /₹499/);
  assert.equal(et.EMAIL, 'hello@raghvendrasingh.com');
  assert.equal(et.LINKEDIN, 'https://www.linkedin.com/in/raghvendrasingh23/');
});

test('page default tour follows the section unless a path or browsing choice exists', () => {
  assert.equal(et.inferredTour('', '/work/nye-team/'), 'recruiter');
  assert.equal(et.inferredTour('', '/services/'), 'client');
  assert.equal(et.inferredTour('', '/tools/jury-me/'), 'student');
  assert.equal(et.inferredTour('client', '/work/'), 'client');
  assert.equal(et.inferredTour('browsing', '/work/'), '');
  assert.equal(et.inferredTour('', '/'), '');
});

test('cross-page tour links carry the intent and do not open on a plain visit', () => {
  const beat = et.visibleBeats('recruiter')[0];
  const url = et.beatUrl(beat, 'recruiter');
  assert.equal(url, '/about/?for=recruiter&tour=1');
  assert.equal(et.motionReduced(true, 'false'), true);
  assert.equal(et.motionReduced(false, 'true'), true);
  assert.equal(et.motionReduced(false, 'false'), false);
});

test('homepage chooser points at the three intents and keeps browsing on the page', () => {
  const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
  assert.match(html, /What brings you here\?/);
  assert.match(html, /href="\/work\/\?for=recruiter"/);
  assert.match(html, /href="\/services\/\?for=client"/);
  assert.match(html, /href="\/\?for=student#teaching"/);
  assert.match(html, /data-intent="browsing"/);
  assert.equal(html.includes('Improve my portfolio'), false);
});
