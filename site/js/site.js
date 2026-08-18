/* Defense of Innovation Fund — shared behavior */
(function () {
  'use strict';

  /* mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'CLOSE' : 'MENU';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'MENU';
      }
    });
  }

  /* scroll reveals */
  var revealables = document.querySelectorAll('.rv, .tick');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('vis'); });
  }

  /* donate page: amount chips + payment link wiring */
  var panel = document.querySelector('[data-payment-url]');
  if (panel) {
    var url = (panel.getAttribute('data-payment-url') || '').trim();
    var btn = document.getElementById('give-btn');
    var interim = document.getElementById('give-interim');
    var selected = '';

    document.querySelectorAll('.amt').forEach(function (chip) {
      chip.addEventListener('click', function () {
        document.querySelectorAll('.amt').forEach(function (c) { c.classList.remove('sel'); });
        chip.classList.add('sel');
        selected = chip.getAttribute('data-amount') || '';
      });
    });

    if (url && btn) {
      if (interim) interim.style.display = 'none';
      btn.addEventListener('click', function () {
        var target = url;
        if (selected) {
          target += (url.indexOf('?') === -1 ? '?' : '&') + 'amount=' + encodeURIComponent(selected);
        }
        window.open(target, '_blank', 'noopener');
      });
    } else if (btn) {
      btn.textContent = 'CARD PAYMENTS OPENING SOON';
      btn.setAttribute('disabled', 'disabled');
      btn.style.opacity = '.45';
      btn.style.cursor = 'default';
    }
  }
})();
