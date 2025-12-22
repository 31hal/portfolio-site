document.addEventListener("DOMContentLoaded", () => {
  fetch('data/nav.json')
    .then(res => res.json())
    .then(items => {
      const nav = document.createElement('nav');
      nav.classList.add('main-nav');
      items.forEach((item, idx) => {
        const a = document.createElement('a');
        a.href = item.file;
        a.textContent = item.title;
        nav.appendChild(a);
        if (idx < items.length - 1) {
          nav.appendChild(document.createTextNode(' | '));
        }
      });
      document.body.insertBefore(nav, document.body.firstChild);
    });
});
