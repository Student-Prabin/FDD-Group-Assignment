/* =========================================================
   countdown.js — live match countdown
   Owner: Person B / C (reused on Home + Sport Overview pages)
   Usage: add a [data-countdown="YYYY-MM-DDTHH:mm:ss"] element
   with child spans #cd-days #cd-hours #cd-mins #cd-secs
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var boxes = document.querySelectorAll('[data-countdown]');

  boxes.forEach(function (box) {
    var target = new Date(box.getAttribute('data-countdown')).getTime();
    var d = box.querySelector('.cd-days');
    var h = box.querySelector('.cd-hours');
    var m = box.querySelector('.cd-mins');
    var s = box.querySelector('.cd-secs');

    function tick() {
      var now = new Date().getTime();
      var diff = target - now;

      if (diff <= 0) {
        if (d) d.textContent = '00';
        if (h) h.textContent = '00';
        if (m) m.textContent = '00';
        if (s) s.textContent = '00';
        var label = box.querySelector('.scoreboard__meta');
        if (label) label.textContent = 'Kick-off! Check the fixtures page for live updates.';
        clearInterval(timer);
        return;
      }

      var days  = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      var mins  = Math.floor((diff / (1000 * 60)) % 60);
      var secs  = Math.floor((diff / 1000) % 60);

      if (d) d.textContent = String(days).padStart(2, '0');
      if (h) h.textContent = String(hours).padStart(2, '0');
      if (m) m.textContent = String(mins).padStart(2, '0');
      if (s) s.textContent = String(secs).padStart(2, '0');
    }

    tick();
    var timer = setInterval(tick, 1000);
  });
});
