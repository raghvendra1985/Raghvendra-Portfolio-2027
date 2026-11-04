const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const pages = ['index.html', 'work/index.html', 'about/index.html'];

test('recruiter strip uses the published contact paths and no CV file', () => {
  for (const page of pages) {
    const html = fs.readFileSync(__dirname + '/' + page, 'utf8');
    assert.match(html, /Principal \/ Staff Product Designer/);
    assert.match(html, /14\+ years in product and service organisations/);
    assert.match(html, /mailto:hello@raghvendrasingh.com\?subject=CV%20request/);
    assert.match(html, /https:\/\/www\.linkedin\.com\/in\/raghvendrasingh23\//);
    assert.equal(html.includes('/cv.pdf'), false, page);
    assert.equal(html.includes('calendly.com'), false, page);
    assert.match(html, /data-calendly hidden/);
    assert.match(html, /not published on this site yet/);
  }
});

test('booking stays off until a real https URL is pasted', () => {
  const js = fs.readFileSync(__dirname + '/recruiter.js', 'utf8');
  assert.match(js, /window\.ET_CALENDLY_URL = ''/);
  assert.equal(js.includes('calendly.com/'), false);
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
  const featured = ['index.html', 'services/index.html', 'work/nye-team/index.html', 'work/crowley/index.html', 'work/gwk-ghostwriter/index.html', 'work/strike-money/index.html', 'work/viralops/index.html'];
  for (const page of featured) {
    const html = fs.readFileSync(__dirname + '/' + page, 'utf8');
    for (const field of ['Role', 'Scope', 'Decision', 'Outcome']) {
      assert.match(html, new RegExp('<dt>' + field + '</dt>'), page + ' ' + field);
    }
    const slots = [...html.matchAll(/<dt>(?:Role|Scope|Decision|Outcome)<\/dt><dd>(.*?)<\/dd>/g)].map((match) => match[1]);
    assert.equal(slots.some((slot) => slot.includes('%')), false, page);
  }
});
