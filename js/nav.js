document.addEventListener('DOMContentLoaded', () => {
  // 1. ナビゲーション生成
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

  // 2. ギャラリーのモーダル表示
  const galleryImages = document.querySelectorAll('.gallery img');
  if (galleryImages.length > 0) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalImg = document.createElement('img');
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    galleryImages.forEach(img => {
      img.addEventListener('click', () => {
        // 高解像度版のパスを img.src から生成
        // サムネから元の高解像度画像に変換
        const hiResSrc = img.src.replace('-thumb.jpg', '.JPG');
        modalImg.src = hiResSrc;
        modal.style.display = 'flex';
      });
    });

    modal.addEventListener('click', () => {
      modal.style.display = 'none';
      modalImg.src = '';
    });
  }

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
