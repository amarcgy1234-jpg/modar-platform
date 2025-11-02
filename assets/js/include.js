(function () {
  const loadPartials = () => {
    const targets = Array.from(document.querySelectorAll('[data-include]'));
    if (!targets.length) {
      document.dispatchEvent(new CustomEvent('partials:loaded'));
      return;
    }

    const range = document.createRange();

    Promise.all(
      targets.map((holder) => {
        const url = holder.getAttribute('data-include');
        if (!url) {
          holder.replaceWith(document.createComment('include: missing url'));
          return Promise.resolve();
        }

        return fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`فشل تحميل الجزء: ${response.status}`);
            }
            return response.text();
          })
          .then((html) => {
            const fragment = range.createContextualFragment(html);
            holder.replaceWith(fragment);
          })
          .catch((error) => {
            console.error(error);
            const fallback = document.createElement('div');
            fallback.className = 'include-error';
            fallback.textContent = 'تعذر تحميل الجزء المطلوب.';
            holder.replaceWith(fallback);
          });
      })
    ).finally(() => {
      document.dispatchEvent(new CustomEvent('partials:loaded'));
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPartials);
  } else {
    loadPartials();
  }
})();
