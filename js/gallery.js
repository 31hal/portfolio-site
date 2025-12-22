document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  // サムネイルクリックで高解像度表示
  gallery.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.dataset.full;
    });
  });

  // ×ボタンで閉じる
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    modalImg.src = '';
  });

  // モーダル背景クリックで閉じる
  modal.addEventListener('click', (e) => {
    if(e.target === modal) {
      modal.style.display = 'none';
      modalImg.src = '';
    }
  });
});
