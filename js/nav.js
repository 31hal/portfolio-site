document.addEventListener('DOMContentLoaded', () => {
  fetch('data/nav.json')
    .then(res => res.json())
    .then(navItems => {
      const nav = document.createElement('nav');
      navItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.name;
        nav.appendChild(link);
      });
      document.body.insertBefore(nav, document.body.firstChild);
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  gallery.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.background = 'rgba(0,0,0,0.8)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = 1000;
      overlay.addEventListener('click', () => overlay.remove());

      const highRes = document.createElement('img');
      // 元の画像パスから大文字のJPG版に差し替え想定
      const src = e.target.src.replace(/(\.[a-z]+)$/i, '$1'); 
      highRes.src = src;
      highRes.style.maxWidth = '90%';
      highRes.style.maxHeight = '90%';
      overlay.appendChild(highRes);

      document.body.appendChild(overlay);
    }
  });
});
