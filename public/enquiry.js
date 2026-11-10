(function (root) {
  'use strict';
  const products = ['Ostriches', 'Sheep', 'Goats', 'Crops', 'General enquiry'];
  function formatEnquiry({ product = 'General enquiry', location = '', details = '' } = {}) {
    const subject = products.includes(product) ? product : 'General enquiry';
    const lines = ['Hello Adam Crest Farms,', '', subject === 'General enquiry' ? 'I would like to make an enquiry about the farm.' : `I am interested in your ${subject.toLowerCase()}.`];
    if (location.trim()) lines.push(`My location: ${location.trim()}.`);
    if (details.trim()) lines.push('', details.trim());
    lines.push('', 'Please let me know the current options, availability and next steps. Thank you.');
    return lines.join('\n');
  }
  const api = Object.freeze({ formatEnquiry });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.FarmEnquiry = api;
})(typeof window !== 'undefined' ? window : globalThis);
