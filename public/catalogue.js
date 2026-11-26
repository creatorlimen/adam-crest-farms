(() => {
  const filters = document.querySelector('.catalogue-filters');
  if (!filters) return;
  const buttons = [...filters.querySelectorAll('button')];
  const cards = [...document.querySelectorAll('.market-card')];
  function render() {
    const requested = new URL(location.href).searchParams.get('category');
    const group = buttons.find(button => button.dataset.filter === requested)?.dataset.filter || 'All products';
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.filter === group));
    for (const card of cards) card.hidden = group !== 'All products' && card.dataset.group !== group;
    const count = cards.filter(card => !card.hidden).length;
    document.querySelector('#catalogue-count').textContent = count + (count === 1 ? ' product shown' : ' products shown');
  }
  for (const button of buttons) button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    const next = new URL(location.href);
    if (button === buttons[0]) next.searchParams.delete('category');
    else next.searchParams.set('category', button.dataset.filter);
    if (next.protocol === 'file:') { location.assign(next.href); return; }
    history.pushState(null, '', next);
    render();
  });
  addEventListener('popstate', render);
  filters.hidden = false;
  render();
})();
