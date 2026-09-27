document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Estimate form: opens a pre-filled text message to Regal Decor.
  var form = document.getElementById('estimate-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var body = 'Hi Regal Decor, I would like a free estimate.\n' +
        'Name: ' + data.get('name') + '\n' +
        'Phone: ' + data.get('phone') + '\n' +
        'Service: ' + data.get('service') +
        (data.get('details') ? '\nDetails: ' + data.get('details') : '');
      window.location.href = 'sms:+12407937826?&body=' + encodeURIComponent(body);
    });
  }
});
