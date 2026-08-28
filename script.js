if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

window.addEventListener('pageshow', () => {
    window.scrollTo(0, 0);
});

/* =========================================================
   LOADER
   ========================================================= */

window.addEventListener('load', () => {

  const fill = document.getElementById('loaderFill');

  let progress = 0;

  const interval = setInterval(() => {

    progress += Math.floor(Math.random() * 14) + 6;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }

    fill.style.width = progress + '%';

  }, 130);

    setTimeout(() => {

    document.getElementById('loader').classList.add('hide');

    document.body.classList.remove('loading');

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
    });

    document.getElementById('navPill').classList.add('in');

    const cards = document.querySelectorAll('.hero-card');

    cards.forEach((card, index) => {

      setTimeout(() => {
        card.classList.add('in');
      }, index * 90);

      setTimeout(() => {
        card.classList.add('float');
      }, index * 90 + 1250 + index * 60);

    });

    document.getElementById('heroGreet').classList.add('in');

    setTimeout(() => {
      document.getElementById('hn1').classList.add('in');
    }, 250);

    setTimeout(() => {
      document.getElementById('hn2').classList.add('in');
    }, 400);

    document.getElementById('heroTag').classList.add('in');
    document.getElementById('heroCta').classList.add('in');

  }, 1900);

});


/* =========================================================
   HERO CURSOR PARALLAX
   ========================================================= */

const heroSection = document.getElementById('hero');
const heroCardsWrap = document.getElementById('heroCards');

const desktopQuery = window.matchMedia('(min-width:721px)');

function enableHeroParallax() {

  if (!desktopQuery.matches) {
    heroCardsWrap.style.transform = 'translate3d(0,0,0)';
    return;
  }

  heroSection.addEventListener('mousemove', handleHeroMouseMove);
  heroSection.addEventListener('mouseleave', resetHeroParallax);
}

function handleHeroMouseMove(event) {

  const width = window.innerWidth;
  const height = window.innerHeight;

  const x = (event.clientX / width - .5) * 24;
  const y = (event.clientY / height - .5) * 24;

  heroCardsWrap.style.transform =
    `translate3d(${x}px, ${y}px, 0)`;
}

function resetHeroParallax() {

  heroCardsWrap.style.transform =
    'translate3d(0,0,0)';
}

enableHeroParallax();


/* =========================================================
   MOBILE MENU
   ========================================================= */

const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

function openMobileMenu() {

  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';

}

function closeMobileMenu() {

  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';

}

navToggle.addEventListener('click', openMobileMenu);
mobileClose.addEventListener('click', closeMobileMenu);

document.querySelectorAll('.mobile-menu a').forEach(link => {

  link.addEventListener('click', closeMobileMenu);

});

document.addEventListener('keydown', event => {

  if (event.key === 'Escape') {
    closeMobileMenu();
  }

});

window.addEventListener('resize', () => {

  if (window.innerWidth > 720) {
    closeMobileMenu();
  }

});


/* =========================================================
   GENERIC SCROLL REVEAL
   ========================================================= */

const revealElements =
  document.querySelectorAll('.reveal-up');

const revealObserver =
  new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('in');

        revealObserver.unobserve(entry.target);

      }

    });

  }, {
    threshold: .15
  });

revealElements.forEach((element, index) => {

  element.style.transitionDelay =
    ((index % 4) * .06) + 's';

  revealObserver.observe(element);

});


/* =========================================================
   SERVICES REVEAL
   ========================================================= */

const serviceCards =
  document.querySelectorAll('.svc-card');

const serviceObserver =
  new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('in');

        serviceObserver.unobserve(entry.target);

      }

    });

  }, {
    threshold: .25
  });

serviceCards.forEach((card, index) => {

  card.style.transitionDelay =
    (index * .08) + 's';

  serviceObserver.observe(card);

});


/* =========================================================
   BIO WORD-BY-WORD HIGHLIGHT
   ========================================================= */

const bioSentence =
  "I’m an MCA’27 student at VIT Vellore focused on AI Engineering. I’ve built 5+ AI projects spanning Generative AI, LLMs, RAG, agentic workflows, predictive ML, and multimodal computer vision. My focus is on developing practical, end-to-end systems involving retrieval, vector search, structured outputs, evaluation, and backend APIs — not just simple model or API integrations. My goal is to build production-oriented solutions that solve meaningful real-world problems.";
const bioElement =
  document.getElementById('bioText');

const bioWords =
  bioSentence.split(' ');

bioElement.innerHTML =
  bioWords
    .map(word => `<span class="word">${word}</span>`)
    .join(' ');

const bioWordElements =
  bioElement.querySelectorAll('.word');

function updateBioHighlight() {

  const rect =
    bioElement.getBoundingClientRect();

  const viewportHeight =
    window.innerHeight;

  const start =
    viewportHeight * .85;

  const end =
    viewportHeight * .25;

  const total =
    rect.height + (start - end);

  const scrolled =
    start - rect.top;

  let progress =
    scrolled / total;

  progress =
    Math.max(0, Math.min(1, progress));

  const litCount =
    Math.floor(progress * bioWordElements.length);

  bioWordElements.forEach((word, index) => {

    word.classList.toggle(
      'lit',
      index < litCount
    );

  });

}

window.addEventListener(
  'scroll',
  updateBioHighlight,
  { passive: true }
);

window.addEventListener(
  'resize',
  updateBioHighlight
);

updateBioHighlight();


/* =========================================================
   CERTIFICATE HORIZONTAL SCROLL JOURNEY
   ========================================================= */

const certSection =
  document.getElementById('certificates');

const certScrollArea =
  document.getElementById('certScrollArea');

const certGallery =
  document.getElementById('certGallery');

const certCards =
  document.querySelectorAll('.cert-card');

const certProgressBar =
  document.getElementById('certProgressBar');

const certScrollHint =
  document.getElementById('certScrollHint');

let certificateDistance = 0;
let certificateScrollLength = 0;

function calculateCertificateDimensions() {

    if (window.innerWidth <= 900) {

        certScrollArea.style.height = 'auto';

        certificateDistance = 0;
        certificateScrollLength = 0;

        return;
    }

    const galleryWidth = certGallery.scrollWidth;
    const viewportWidth = certScrollArea.clientWidth;

    // Extra breathing room so the FINAL certificate is fully visible.
    const finalPadding = Math.max(
        70,
        window.innerWidth * 0.08
    );

    certificateDistance = Math.max(
        0,
        galleryWidth - viewportWidth + finalPadding
    );

    // Give the user enough vertical distance to comfortably explore.
    const baseScroll = Math.max(
        window.innerHeight * 1.15,
        700
    );

    certificateScrollLength =
        certificateDistance + baseScroll;

    certScrollArea.style.height =
        `${window.innerHeight + certificateScrollLength}px`;

    updateCertificateJourney();
}


function updateCertificateJourney() {

    if (window.innerWidth <= 900) {
        return;
    }

    const rect = certScrollArea.getBoundingClientRect();

    const total =
        certScrollArea.offsetHeight - window.innerHeight;

    if (total <= 0) {
        return;
    }

    let progress = -rect.top / total;

    progress = Math.max(
        0,
        Math.min(1, progress)
    );

    /*
        Slightly smoother cinematic movement,
        but never prevent reaching 100%.
    */
    const easedProgress =
        progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    const translateX =
        certificateDistance * easedProgress;

    certGallery.style.transform =
        `translate3d(${-translateX}px, 0, 0)`;

    certProgressBar.style.width =
        `${progress * 100}%`;

    /*
        Reveal certificates progressively.
    */
    const batchSize = 3;

    certCards.forEach((card, index) => {

        const batch = Math.floor(index / batchSize);

        const revealThreshold = batch * 0.22;

        const shouldReveal =
            progress >= revealThreshold;

        card.classList.toggle('in', shouldReveal);

    });

    certScrollHint.style.opacity = progress > 0.08 ? '0' : '1';
}


let certificateTicking = false;

function requestCertificateUpdate() {

  if (certificateTicking) {
    return;
  }

  certificateTicking = true;

  requestAnimationFrame(() => {

    updateCertificateJourney();

    certificateTicking = false;

  });

}

window.addEventListener(
  'scroll',
  requestCertificateUpdate,
  { passive: true }
);

window.addEventListener(
  'resize',
  () => {

    calculateCertificateDimensions();

  }
);


/*
  Initial calculation is delayed very slightly so that
  fonts and layout have settled before measurements.
*/

window.addEventListener('load', () => {

  setTimeout(() => {

    calculateCertificateDimensions();
    updateCertificateJourney();

  }, 150);

});


/* =========================================================
   MOBILE CERTIFICATE REVEAL
   ========================================================= */

const mobileCertificateObserver =
  new IntersectionObserver((entries) => {

    if (window.innerWidth > 720) {
      return;
    }

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add('in');

        mobileCertificateObserver.unobserve(
          entry.target
        );

      }

    });

  }, {
    threshold: .18
  });

certCards.forEach(card => {

  mobileCertificateObserver.observe(card);

});


/* =========================================================
   RESPONSIVE CERTIFICATE RECALCULATION
   ========================================================= */

let resizeTimer;

window.addEventListener('resize', () => {

  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {

    calculateCertificateDimensions();

  }, 150);

});


/* =========================================================
   INITIAL CERTIFICATE STATE
   ========================================================= */

if (window.innerWidth > 900) {

  certCards.forEach(card => {
    card.classList.remove('in');
  });

  calculateCertificateDimensions();
  updateCertificateJourney();

}
