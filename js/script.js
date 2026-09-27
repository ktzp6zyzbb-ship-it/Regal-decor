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

  // Estimate form: requests are emailed to Regal Decor through FormSubmit.
  // If delivery fails, it falls back to a pre-filled text to the business phone.
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/rbedregal53@gmail.com';
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
      var openText = function () {
        window.location.href = 'sms:+12407937826?&body=' + encodeURIComponent(body);
      };

      if (!FORM_ENDPOINT) {
        openText();
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      data.append('_subject', 'New estimate request: ' + data.get('service'));
      data.append('_template', 'table');
      fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          return res.json();
        })
        .then(function (json) {
          if (String(json.success) !== 'true') throw new Error(json.message || 'Request failed');
          form.innerHTML = '<h3>Thank you!</h3><p class="form-note">Regal Decor has your request and will contact you soon.</p>';
        })
        .catch(function () {
          button.disabled = false;
          openText();
        });
    });
  }
});
