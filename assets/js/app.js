const initNavigation = () => {
  const burger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
  }

  const currentPage = document.body?.dataset?.page;
  if (currentPage && navLinks) {
    navLinks.querySelectorAll('a[data-page]').forEach(link => {
      if (link.getAttribute('data-page') === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
};

const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({behavior: 'smooth', block: 'start'});
      document.getElementById('nav-links')?.classList.remove('open');
      document.getElementById('hamburger')?.setAttribute('aria-expanded', 'false');
    });
  });
};

const initScrollTop = () => {
  const toTopBtn = document.querySelector('[data-scroll-top]');
  if (!toTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      toTopBtn.classList.add('show');
    } else {
      toTopBtn.classList.remove('show');
    }
  });

  toTopBtn.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
};

const initializeApp = () => {
  initNavigation();
  initSmoothScroll();
  initScrollTop();
};

document.addEventListener('partialsLoaded', initializeApp);

document.addEventListener('DOMContentLoaded', () => {
  if (document.readyState !== 'loading' && !document.querySelector('[data-include]')) {
    initializeApp();
  }
});
