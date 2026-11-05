const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const pages = ['index.html', 'work/index.html', 'about/index.html'];

test('recruiter strip links the CV, LinkedIn, and email, and marks booking as a placeholder', () => {
  assert.equal(fs.existsSync(__dirname + '/cv.pdf'), true);
  for (const page of pages) {
    const html = fs.readFileSync(__dirname + '/' + page, 'utf8');
    const strip = html.match(/<aside class="role-strip"[\s\S]*?<\/aside>/)[0];
    assert.match(strip, /Open to remote Staff\/Principal Product Designer roles\./);
    assert.match(strip, /href="\/cv\.pdf"/);
    assert.match(strip, /Download CV/);
    assert.match(strip, /href="https:\/\/www\.linkedin\.com\/in\/raghvendrasingh23\/"/);
    assert.match(strip, /href="mailto:hello@raghvendrasingh.com"/);
    assert.match(strip, /href="tel:\+919555909094"/);
    assert.match(strip, /\+91 95559 09094/);
    assert.match(strip, /href="https:\/\/calendly\.com\/raghvendradesign2012\/20-min-intro-call"/);
    assert.match(strip, />Book 20 min</);
    assert.equal(strip.includes('placeholder until a Calendly'), false, page);
    assert.equal(/Dubai|can start immediately|Head of Design/.test(strip), false, page);
  }
});

test('published CV and case studies keep the shareable phone and client names', () => {
  const pdf = fs.readFileSync(__dirname + '/cv.pdf');
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  assert.equal(pdf.length > 100000, true);
  assert.match(fs.readFileSync(__dirname + '/work/crowley/index.html', 'utf8'), /Crowley/);
  assert.match(fs.readFileSync(__dirname + '/work/verizon/index.html', 'utf8'), /Verizon/);
  const services = fs.readFileSync(__dirname + '/services/index.html', 'utf8');
  assert.match(services, /href="\/work\/crowley\/"/);
  assert.match(services, /Unifying freight quoting across a fragmented supply chain/);
  assert.match(services, /href="\/work\/verizon\/"/);
});

test('booking uses the published 20-minute Calendly link', () => {
  const js = fs.readFileSync(__dirname + '/recruiter.js', 'utf8');
  assert.match(js, /window\.ET_CALENDLY_URL = 'https:\/\/calendly\.com\/raghvendradesign2012\/20-min-intro-call'/);
  const services = fs.readFileSync(__dirname + '/services/index.html', 'utf8');
  const offers = services.slice(services.indexOf('id="founder-offers"'), services.indexOf('id="enquiry"'));
  assert.equal((offers.match(/raghvendradesign2012\/20-min-intro-call/g) || []).length, 3);
});

test('founder offers point at enquiry and do not list a price', () => {
  const html = fs.readFileSync(__dirname + '/services/index.html', 'utf8');
  for (const title of ['Website / MVP build', 'Strategy sprint', 'AI workflow audit']) {
    assert.match(html, new RegExp(title.replace(/[/.]/g, '\\$&')));
  }
  const section = html.slice(html.indexOf('id="founder-offers"'), html.indexOf('id="enquiry"'));
  assert.match(section, /On enquiry/);
  assert.match(section, /href="#enquiry"/);
  assert.equal(/%|₹|\$/.test(section), false);
  assert.match(html, /name="consent_reply"/);
  assert.match(html, /name="consent_updates"/);
  assert.match(html, /name="consent_whatsapp"/);
});

test('featured cases label role, scope, decision, and outcome without new percentages', () => {
  const featured = ['index.html', 'work/nye-team/index.html', 'work/crowley/index.html', 'work/gwk-ghostwriter/index.html', 'work/strike-money/index.html', 'work/viralops/index.html'];
  for (const page of featured) {
    const html = fs.readFileSync(__dirname + '/' + page, 'utf8');
    for (const field of ['Role', 'Scope', 'Decision', 'Outcome']) {
      assert.match(html, new RegExp('<dt>' + field + '</dt>'), page + ' ' + field);
    }
    const slots = [...html.matchAll(/<dt>(?:Role|Scope|Decision|Outcome)<\/dt><dd>(.*?)<\/dd>/g)].map((match) => match[1]);
    assert.equal(slots.some((slot) => slot.includes('%')), false, page);
  }
});

test('the services page lists every published case study', () => {
  const work = fs.readFileSync(__dirname + '/work/index.html', 'utf8');
  const services = fs.readFileSync(__dirname + '/services/index.html', 'utf8');
  const start = services.indexOf('id="services-evidence"');
  const section = services.slice(start, services.indexOf('</section>', start));
  const expected = [...work.matchAll(/href="(\/work\/[a-z0-9-]+\/)"/g)].map((match) => match[1]);
  const listed = [...section.matchAll(/href="(\/work\/[a-z0-9-]+\/)"/g)].map((match) => match[1]);
  assert.deepEqual(listed, expected);
  assert.equal(listed.length, 17);
  assert.equal(section.includes('Selected practice'), false);
});
