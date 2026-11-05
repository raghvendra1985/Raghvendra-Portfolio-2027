const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const products = {
  'ai-workflow-starter-kit': ['https://rzp.io/rzp/6zN91wN', 'https://test.checkout.dodopayments.com/buy/pdt_0NrGQJAY0aJw0E0fPKMDk?quantity=1'],
  'design-process-workshop': ['https://rzp.io/rzp/Yy6HgAeg', 'https://test.checkout.dodopayments.com/buy/pdt_0NrGQkJT5lz0dUaXVkVTu?quantity=1'],
  'concept-design-workshop': ['https://rzp.io/rzp/XQj1XObi', 'https://test.checkout.dodopayments.com/buy/pdt_0NrGQodf0pUIzRVzI8QGA?quantity=1'],
  'design-elective-workshop': ['https://rzp.io/rzp/aa9H00Eh', 'https://test.checkout.dodopayments.com/buy/pdt_0NrGQulrEBKrQKP9aVHOB?quantity=1'],
  'ux-ui-design-workshop': ['https://rzp.io/rzp/r1eReINi', 'https://test.checkout.dodopayments.com/buy/pdt_0NrGQyxgsabTNXmNREGUg?quantity=1'],
  'game-design-workshop': ['https://rzp.io/rzp/nJA6cJNr', 'https://test.checkout.dodopayments.com/buy/pdt_0NrGR4b3jPtLRmO0e0XOR?quantity=1'],
  'data-visualisation-workshop': ['https://rzp.io/rzp/bWPB47es', 'https://test.checkout.dodopayments.com/buy/pdt_0NrGRBiTRWD2tLIDA7kf2?quantity=1']
};

test('each paid worksheet offers India and international checkout', () => {
  const index = fs.readFileSync(__dirname + '/resources/index.html', 'utf8');
  assert.equal(index.includes('Get access · ₹399'), false);
  assert.match(index, /emailed after payment/);
  for (const [slug, [india, intl]] of Object.entries(products)) {
    const page = fs.readFileSync(__dirname + '/resources/' + slug + '/index.html', 'utf8');
    const gate = page.slice(page.indexOf('class="paid-gate"'), page.indexOf('</section>', page.indexOf('class="paid-gate"')));
    assert.equal(gate.includes('mailto:'), false, slug);
    assert.match(gate, new RegExp('href="' + india.replace(/[?]/g, '\\?') + '" target="_blank"'));
    assert.match(gate, new RegExp('href="' + intl.replace(/[?]/g, '\\?') + '" target="_blank"'));
    assert.match(gate, /India · ₹399/);
    assert.match(gate, /International · \$4\.99/);
    assert.match(gate, /Dodo Test Mode/);
    assert.match(gate, /emailed after payment/);
    assert.match(index, new RegExp(india.replace(/[?]/g, '\\?') + '" target="_blank"'));
    assert.match(index, new RegExp(intl.replace(/[?]/g, '\\?') + '" target="_blank"'));
  }
});

test('free worksheets do not gain payment links', () => {
  for (const slug of ['ai-opportunity-audit', 'design-thinking-workshop', 'portfolio-development-workshop', 'product-decision-canvas']) {
    const page = fs.readFileSync(__dirname + '/resources/' + slug + '/index.html', 'utf8');
    assert.equal(page.includes('rzp.io'), false, slug);
    assert.equal(page.includes('dodopayments.com'), false, slug);
  }
});
