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

function renderMarkdown(mdText) {
  let html = mdText;

  // 見出し # → <h1>, ## → <h2>, ### → <h3>
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // 箇条書き * or - → <ul><li>...</li></ul>
  html = html.replace(/^(?:\*|\-) (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');

  // 改行 → <br>
  html = html.replace(/\n/g, '<br>');

  return html;
}

document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalImg = document.createElement('img');
    modalImg.src = img.src.replace('.JPG', '_highres.JPG'); // 高解像度版
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    modal.addEventListener('click', () => {
      modal.remove();
    });
  });
});
