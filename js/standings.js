/* =========================================================
   standings.js — sortable + filterable league standings table
   Owner: Person C (flagship JS / DOM manipulation feature)
   Used on: news.html
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var table = document.getElementById('standingsTable');
  if (!table) return;

  var tbody = table.querySelector('tbody');
  var headers = table.querySelectorAll('th[data-key]');
  var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'));
  var sortState = { key: null, dir: 1 };

  /* ---- Sorting ---- */
  headers.forEach(function (th) {
    th.addEventListener('click', function () {
      var key = th.getAttribute('data-key');
      var isNumeric = th.getAttribute('data-type') === 'number';

      sortState.dir = (sortState.key === key) ? sortState.dir * -1 : 1;
      sortState.key = key;

      headers.forEach(function (h) { h.classList.remove('sorted-asc', 'sorted-desc'); });
      th.classList.add(sortState.dir === 1 ? 'sorted-asc' : 'sorted-desc');

      rows.sort(function (a, b) {
        var av = a.querySelector('[data-cell="' + key + '"]').textContent.trim();
        var bv = b.querySelector('[data-cell="' + key + '"]').textContent.trim();
        if (isNumeric) { av = parseFloat(av); bv = parseFloat(bv); }
        if (av < bv) return -1 * sortState.dir;
        if (av > bv) return 1 * sortState.dir;
        return 0;
      });

      rows.forEach(function (r) { tbody.appendChild(r); });
    });
  });

  /* ---- Filtering by sport (chips) ---- */
  var chips = document.querySelectorAll('.chip[data-filter]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      var filter = chip.getAttribute('data-filter');

      rows.forEach(function (row) {
        var sport = row.getAttribute('data-sport');
        row.style.display = (filter === 'all' || filter === sport) ? '' : 'none';
      });

      // also filter news article cards on the same page, if present
      document.querySelectorAll('.news-card[data-sport]').forEach(function (card) {
        var sport = card.getAttribute('data-sport');
        card.style.display = (filter === 'all' || filter === sport) ? '' : 'none';
      });
    });
  });
});
