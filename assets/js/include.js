(function () {
  var includeAttribute = 'data-include';
  function injectContent(target, url) {
    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(function (html) {
        target.innerHTML = html;
      })
      .catch(function (error) {
        console.error('Include failed for', url, error);
      });
  }

  function initIncludes() {
    var nodes = document.querySelectorAll('[' + includeAttribute + ']');
    if (!nodes.length) {
      return;
    }
    nodes.forEach(function (node) {
      var file = node.getAttribute(includeAttribute);
      if (file) {
        injectContent(node, file);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIncludes);
  } else {
    initIncludes();
  }
})();
