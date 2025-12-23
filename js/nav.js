document.addEventListener('DOMContentLoaded', () => {
  // ナビ生成
  fetch('data/nav.json')
    .then(res => res.json())
    .then(navItems => {
      const nav = document.createElement('nav');
      navItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url;
        link.textContent = item.name;
        nav.appendChild(link);
      });
      document.body.insertBefore(nav, document.body.firstChild);
    })
    .catch(err => console.error('nav.json 読み込みエラー', err));
});
