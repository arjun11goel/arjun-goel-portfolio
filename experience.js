/* ===================== EXPERIENCE NOTES ===================== */
(() => {
  const section = document.getElementById('experience');
  const cards = [...document.querySelectorAll('.experience-card')];
  const entries = [...document.querySelectorAll('.experience-entry')];
  const status = document.querySelector('#experience-screen-status span');
  if (!section) return;

  const reveal = () => section.classList.add('is-visible');
  const totalEntries = String(entries.length).padStart(2, '0');
  const setActive = index => {
    if (index < 0 || index >= entries.length) return;
    if (status) status.textContent = `${String(index + 1).padStart(2, '0')} / ${totalEntries} ACTIVE`;
    entries.forEach((entry, entryIndex) => {
      const active = entryIndex === index;
      entry.classList.toggle('is-active', active);
      if (active) entry.setAttribute('aria-current', 'true');
      else entry.removeAttribute('aria-current');
    });
  };

  entries.forEach((entry, index) => {
    entry.addEventListener('click', () => {
      const card = document.getElementById(entry.dataset.scrollTarget);
      if (!card) return;
      setActive(index);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      card.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  });

  if ('IntersectionObserver' in window) {
    const entranceObserver = new IntersectionObserver(observed => {
      if (observed.some(item => item.isIntersecting)) {
        reveal();
        entranceObserver.disconnect();
      }
    }, { threshold: 0.08 });
    entranceObserver.observe(section);

    const activeObserver = new IntersectionObserver(observed => {
      const current = observed.filter(item => item.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActive(cards.indexOf(current.target));
    }, { rootMargin: '-34% 0px -34% 0px', threshold: [0.05, 0.25, 0.5] });
    cards.forEach(card => activeObserver.observe(card));
  } else {
    reveal();
    setActive(0);
  }
})();
