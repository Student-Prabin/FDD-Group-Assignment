/* =========================================================
   contact.js — client-side form validation
   Owner: Person A
   Used on: contact.html
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var status = document.getElementById('formStatus');

  function showError(id, message) {
    var err = document.getElementById(id + 'Error');
    if (err) { err.textContent = message; err.classList.add('show'); }
  }
  function clearError(id) {
    var err = document.getElementById(id + 'Error');
    if (err) { err.textContent = ''; err.classList.remove('show'); }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;

    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var subject = document.getElementById('subject');
    var message = document.getElementById('message');

    [name, email, subject, message].forEach(function (f) { clearError(f.id); });

    if (name.value.trim().length < 2) {
      showError('name', 'Please enter your full name.');
      valid = false;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (subject.value === '') {
      showError('subject', 'Please choose a subject.');
      valid = false;
    }

    if (message.value.trim().length < 10) {
      showError('message', 'Message should be at least 10 characters.');
      valid = false;
    }

    status.classList.remove('show', 'ok', 'err');

    if (!valid) {
      status.textContent = 'Please fix the highlighted fields and try again.';
      status.classList.add('show', 'err');
      return;
    }

    status.textContent = 'Thanks, ' + name.value.trim().split(' ')[0] + '! Your message has been received. The relevant club committee will reply within 2 working days.';
    status.classList.add('show', 'ok');
    form.reset();
  });
});
