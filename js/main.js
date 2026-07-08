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
});
