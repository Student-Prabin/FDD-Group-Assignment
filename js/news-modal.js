/* =========================================================
   news-modal.js — click a news card to read the full story
   in a popup, without leaving the page.
   Used on: index.html, news.html
   Markup expected per card:
     <article class="news-card" data-date="...">
       <img ...>
       <div class="news-card__body">
         <span class="eyebrow">Category</span>
         <h3>Headline</h3>
         <p>Short excerpt...</p>
       </div>
       <template class="news-card__full">
         <p>Full paragraph one...</p>
         <p>Full paragraph two...</p>
       </template>
     </article>
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var cards = document.querySelectorAll('.news-card');
  var modal = document.getElementById('newsModal');
  if (!cards.length || !modal) return;

  var modalImg     = modal.querySelector('.news-modal__img');
  var modalCategory = modal.querySelector('.news-modal__category');
  var modalDate    = modal.querySelector('.news-modal__date');
  var modalTitle   = modal.querySelector('.news-modal__body h3');
  var modalText    = modal.querySelector('.news-modal__text');
  var closeBtn     = modal.querySelector('.news-modal__close');
  var lastFocused  = null;

  function openModal(card) {
    var img      = card.querySelector('img');
    var category = card.querySelector('.eyebrow');
    var title    = card.querySelector('h3');
    var excerpt  = card.querySelector('.news-card__body > p');
    var full     = card.querySelector('.news-card__full');
    var date     = card.getAttribute('data-date');

    if (img) { modalImg.src = img.src; modalImg.alt = img.alt; modalImg.style.display = ''; }
    else { modalImg.style.display = 'none'; }

    modalCategory.textContent = category ? category.textContent : '';
    modalDate.textContent = date || '';
    modalTitle.textContent = title ? title.textContent : '';

    if (full) {
      modalText.innerHTML = full.innerHTML;
    } else if (excerpt) {
      modalText.innerHTML = '<p>' + excerpt.textContent + '</p>';
    } else {
      modalText.innerHTML = '';
    }

    lastFocused = document.activeElement;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  cards.forEach(function (card) {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-haspopup', 'dialog');

    card.addEventListener('click', function () { openModal(card); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
});
