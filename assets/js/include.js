(function(){
  const loadPartials = () => {
    const includeTargets = document.querySelectorAll('[data-include]');
    const loaders = Array.from(includeTargets).map(target => {
      const file = target.getAttribute('data-include');
      if (!file) return Promise.resolve();
      return fetch(file)
        .then(response => {
          if (!response.ok) {
            throw new Error(`فشل تحميل المكون: ${file}`);
          }
          return response.text();
        })
        .then(html => {
          target.innerHTML = html;
        })
        .catch(error => {
          console.error(error);
          target.innerHTML = '<p style="color:red;">تعذر تحميل المكون.</p>';
        });
    });

    Promise.all(loaders).then(() => {
      document.dispatchEvent(new CustomEvent('partialsLoaded'));
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPartials);
  } else {
    loadPartials();
  }
})();
