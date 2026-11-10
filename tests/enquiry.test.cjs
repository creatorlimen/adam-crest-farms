const { test } = require('node:test');
const assert = require('node:assert/strict');
const { formatEnquiry } = require('../public/enquiry.js');

test('general enquiry works without optional details and makes no order promise', () => {
  const text = formatEnquiry();
  assert.match(text, /make an enquiry about the farm/);
  assert.match(text, /current options, availability and next steps/);
  assert.doesNotMatch(text, /undefined|null|My location|order confirmed|sent successfully/i);
});
test('each offered category can be included in a customer enquiry', () => {
  for (const product of ['Ostriches', 'Sheep', 'Goats', 'Crops']) assert.ok(formatEnquiry({ product }).includes(`your ${product.toLowerCase()}`));
});
test('location and multiline questions are preserved without HTML interpretation', () => {
  const text = formatEnquiry({ product: 'Goats', location: '  Lagos  ', details: ' What sizes are available?\nIs collection possible? <script>example</script> ' });
  assert.match(text, /My location: Lagos\./);
  assert.ok(text.includes('What sizes are available?\nIs collection possible? <script>example</script>'));
});
test('unknown categories fall back to a general enquiry', () => {
  assert.match(formatEnquiry({ product: 'unconfirmed product' }), /make an enquiry about the farm/);
});
