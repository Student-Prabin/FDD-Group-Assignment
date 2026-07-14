/* =========================================================
   main.js — shared site behaviour
   Owner: Person A (nav, footer, ticker)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  /* ---- Highlight current page in nav ---- */
  var here = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var target = a.getAttribute('href');
    if (target === here) a.classList.add('active');
  });

  /* ---- Footer dynamic year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Scoreboard ticker: build scrolling scores from data array ---- */
  var tickerTrack = document.getElementById('tickerTrack');
  if (tickerTrack) {
    var scores = [
      { tag: 'FOOTBALL',   text: 'APU Falcons 3 — 1 Sunway Eagles', live: false },
      { tag: 'BASKETBALL', text: 'APU Hoopers 58 — 55 Taylor Titans', live: true },
      { tag: 'SWIMMING',   text: 'APU wins 4x100m Freestyle Relay',   live: false },
      { tag: 'TENNIS',     text: "Men's Singles Final — Sat, 3:00 PM", live: false },
      { tag: 'FOOTBALL',   text: 'Next fixture vs. INTI Ravens — Fri', live: false },
      { tag: 'BASKETBALL', text: 'Ticket sales open for Semi-Finals',  live: false }
    ];
    var html = scores.map(function (s) {
      var liveTag = s.live ? '<span class="live">&#9679; LIVE&nbsp;</span>' : '';
      return '<span><span class="tag">' + s.tag + '</span>' + liveTag + s.text + '</span>';
    }).join('');
    // duplicate content so the marquee loops seamlessly
    tickerTrack.innerHTML = html + html;
  }

  /* ---- Scroll reveal: animate sections/cards in the first time they appear ---- */
  (function () {
    var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    // groups of repeating elements + the direction they should animate from
    var groups = [
      { selector: '.card-grid > *, .news-grid > *, .roster-grid > *, .gallery-grid > img, .image-grid > img', dir: 'left' },
      { selector: '.two-col > *, .hero__grid > *', dir: 'up' }
    ];

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-reveal-delay'), 10) || 0;
        window.setTimeout(function () { el.classList.remove('reveal-hidden'); }, delay);
        observer.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    groups.forEach(function (group) {
      var seen = new WeakMap(); // parent -> next stagger index
      document.querySelectorAll(group.selector).forEach(function (el) {
        var parent = el.parentElement;
        var idx = seen.get(parent) || 0;
        el.classList.add('reveal', 'reveal--' + group.dir, 'reveal-hidden');
        el.setAttribute('data-reveal-delay', Math.min(idx * 90, 360));
        seen.set(parent, idx + 1);
        observer.observe(el);
      });
    });
  })();
});
