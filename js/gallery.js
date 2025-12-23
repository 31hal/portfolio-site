document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  const modal = document.createElement('div');
  modal.classList.add('modal');
  const modalImg = document.createElement('img');
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  gallery.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', () => {
      const hiRes = img.dataset.full || img.src;
      modalImg.src = hiRes;
      modal.classList.add('show');
    });
  });

  modal.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => { modalImg.src = ''; }, 300);
  });
});
