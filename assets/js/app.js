const initNavigation = () => {
  const burger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (!burger || !nav || burger.dataset.ready === 'true') {
    return;
  }

  const closeNav = () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };

  const toggleNav = () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  };

  burger.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleNav();
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeNav();
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.navbar')) {
      closeNav();
    }
  });

  burger.dataset.ready = 'true';
};

const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    if (anchor.dataset.scrollReady === 'true') {
      return;
    }

    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href').substring(1);
      if (!targetId) {
        return;
      }

      const target = document.getElementById(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    anchor.dataset.scrollReady = 'true';
  });
};

const bootstrap = () => {
  initNavigation();
  initSmoothScroll();
};

document.addEventListener('partials:loaded', bootstrap);

document.addEventListener('DOMContentLoaded', bootstrap);
