(() => {
  const cover = document.querySelector('[data-cover]');
  if (!cover) return;
  const frames = [...cover.querySelectorAll('.cover-frame')];
  const buttons = [...cover.querySelectorAll('[data-slide]')];
  const play = cover.querySelector('[data-play]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let playing = !motion.matches;
  let visible = true;
  let timer;

  function show(next) {
    frames[index].classList.remove('is-current');
    buttons[index].setAttribute('aria-pressed', 'false');
    index = next;
    frames[index].classList.add('is-current');
    buttons[index].setAttribute('aria-pressed', 'true');
  }
  function schedule() {
    clearInterval(timer);
    play.setAttribute('aria-label', playing ? 'Pause slideshow' : 'Play slideshow');
    play.firstElementChild.textContent = playing ? 'Ⅱ' : '▶';
    if (playing && visible && !document.hidden) {
      timer = setInterval(() => show((index + 1) % frames.length), 4000);
    }
  }
  function pause() { playing = false; schedule(); }

  buttons.forEach((button, next) => button.addEventListener('click', () => { pause(); show(next); }));
  play.addEventListener('click', () => { playing = !playing; schedule(); });
  cover.addEventListener('focusin', event => { if (event.target !== play) pause(); });
  motion.addEventListener('change', () => { if (motion.matches) pause(); });
  document.addEventListener('visibilitychange', schedule);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }).observe(cover);
  cover.querySelector('.cover-controls').hidden = false;
  schedule();
})();
