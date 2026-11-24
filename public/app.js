(function () {
  'use strict';
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigation');
  const mobile = window.matchMedia('(max-width: 760px)');
  function closeMenu(restoreFocus = false) {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    if (restoreFocus) menuButton.focus();
  }
  menuButton.hidden = false;
  nav.classList.add('enhanced');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  mobile.addEventListener('change', () => closeMenu());

  for (const link of document.querySelectorAll('[data-instagram]')) link.href = window.FARM_CONFIG.instagramUrl;
  const form = document.querySelector('#enquiry-form');
  if (!form) {
    const moved = { '#enquire': 'enquire', '#offerings': 'offerings', '#our-farm': 'our-farm' };
    const previousDestination = document.getElementById(moved[window.location.hash]);
    if (previousDestination instanceof HTMLAnchorElement) window.location.replace(previousDestination.href);
    return;
  }
  const product = document.querySelector('#product');
  const result = document.querySelector('#enquiry-result');
  const message = document.querySelector('#enquiry-message');
  const copy = document.querySelector('#copy-enquiry');
  const status = document.querySelector('#copy-status');
  const whatsappNumber = window.FARM_CONFIG.whatsappNumber;
  const whatsappReady = typeof whatsappNumber === 'string' && /^[1-9]\d{7,14}$/.test(whatsappNumber);
  const whatsappLink = document.querySelector('#whatsapp-link');
  document.querySelector('#composer-fields').hidden = false;
  if (whatsappReady) {
    whatsappLink.hidden = false;
    whatsappLink.href = `https://wa.me/${whatsappNumber}`;
  }
  const requested = new URLSearchParams(window.location.search).get('product');
  if ([...product.options].some(option => option.value === requested)) product.value = requested;
  form.addEventListener('input', () => {
    result.hidden = true;
    status.textContent = '';
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    message.value = window.FarmEnquiry.formatEnquiry({ product: product.value, location: form.elements.location.value, details: form.elements.details.value });
    result.hidden = false;
    status.textContent = 'Your enquiry is ready. Copy it, then open Instagram to send it.';
    if (whatsappReady) {
      whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message.value)}`;
      status.textContent = 'Your enquiry is ready. Copy it for Instagram or continue on WhatsApp.';
    }
    message.focus({ preventScroll: true });
    result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest' });
  });
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(message.value);
      status.textContent = 'Enquiry copied. Open Instagram and paste it into your message. Nothing has been sent yet.';
    } catch {
      message.focus();
      message.select();
      status.textContent = 'Please copy the selected text manually, then paste it into your Instagram message.';
    }
  });
})();
