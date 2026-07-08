/* =========================================================
   gallery.js — click-to-enlarge lightbox for photo galleries
   Owner: Person B (used on all *-fixtures.html gallery sections)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var thumbs = document.querySelectorAll('.gallery-grid img');
  var lightbox = document.getElementById('lightbox');
  if (!thumbs.length || !lightbox) return;

  var lightboxImg = lightbox.querySelector('img');
  var closeBtn = lightbox.querySelector('.lightbox__close');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      lightboxImg.src = thumb.src.replace(/\/\d+\/\d+$/, '/1000/700');
      lightboxImg.alt = thumb.alt;
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() { lightbox.classList.remove('open'); }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
});
