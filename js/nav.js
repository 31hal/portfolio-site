// 1. ナビゲーション生成
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/nav.json')
    .then(res => res.json())
    .then(navItems => {
      const nav = document.createElement('nav');
      navItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url; // nav.json の url キーと一致させる
        link.textContent = item.name;
        nav.appendChild(link);
      });
      document.body.insertBefore(nav, document.body.firstChild);
    }).catch(err => console.error('nav.json 読み込みエラー', err));
});

// 2. ギャラリーのモーダル表示
document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery img');
  if (!galleryImages.length) return;

  const modal = document.createElement('div');
  modal.classList.add('modal');
  const modalImg = document.createElement('img');
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      const hiResSrc = img.src.replace('-thumb.jpg', '.JPG');
      modalImg.src = hiResSrc;
      modal.classList.add('show');
    });
  });

  modal.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => { modalImg.src = ''; }, 300);
  });
});


  // 3. Markdownレンダリング関数（必要に応じて使用）
  window.renderMarkdown = function(mdText) {
    let html = mdText;
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    html = html.replace(/^(?:\*|\-) (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    html = html.replace(/\n/g, '<br>');
    return html;
  };
});
