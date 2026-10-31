/* ===================== EXPERIENCE CARD REVEAL AND SCROLL FOCUS ===================== */
(() => {
  const section = document.getElementById('experience');
  const cards = [...document.querySelectorAll('#experience .experience-card')];

  if (!section || !cards.length) return;

  const introElements = [...section.querySelectorAll('.experience-intro .reveal-up')];
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsIntersectionObserver = 'IntersectionObserver' in window;

  if (prefersReducedMotion || !supportsIntersectionObserver) {
    cards.forEach(card => card.classList.add('is-visible'));
    introElements.forEach(element => element.classList.add('in'));
  } else {
    section.classList.add('experience-reveal-enabled');

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        if (entry.target.matches('.experience-card')) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.add('in');
        }
        revealObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.01,
      rootMargin: '0px 0px 10% 0px'
    });

    [...introElements, ...cards].forEach(element => revealObserver.observe(element));
  }

  let activeUpdateQueued = false;

  const updateActiveCard = () => {
    if (activeUpdateQueued) return;
    activeUpdateQueued = true;

    window.requestAnimationFrame(() => {
      activeUpdateQueued = false;

      const centerY = window.innerHeight / 2;
      const focusRadius = Math.min(90, Math.max(48, window.innerHeight * 0.08));
      const activeCard = cards
        .map(card => ({ card, rect: card.getBoundingClientRect() }))
        .filter(({ rect }) =>
          rect.bottom >= centerY - focusRadius &&
          rect.top <= centerY + focusRadius
        )
        .sort((a, b) => {
          const aCenter = (a.rect.top + a.rect.bottom) / 2;
          const bCenter = (b.rect.top + b.rect.bottom) / 2;
          return Math.abs(aCenter - centerY) - Math.abs(bCenter - centerY);
        })[0]?.card;

      cards.forEach(card => {
        card.classList.toggle('is-active', card === activeCard);
      });
    });
  };

  window.addEventListener('scroll', updateActiveCard, { passive: true });
  window.addEventListener('resize', updateActiveCard);
  updateActiveCard();
})();