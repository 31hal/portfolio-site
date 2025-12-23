document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery img');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  if (!galleryImages.length) return;

  galleryImages.forEach(img => {
    img.addEventListener('click', () => {
      const hiResSrc = img.dataset.full || img.src.replace('-thumb.jpg', '.JPG');
      modalImg.src = hiResSrc;
      modal.classList.add('show');
    });
  });

  const closeModal = () => {
    modal.classList.remove('show');
    setTimeout(() => { modalImg.src = ''; }, 300);
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
});
