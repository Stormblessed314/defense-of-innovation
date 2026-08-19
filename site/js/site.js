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

  /* donate panel: design-only until data-payment-url is set */
  var pay = document.querySelector('.pay[data-payment-url]');
  if (pay) {
    var url = (pay.getAttribute('data-payment-url') || '').trim();
    var btn = document.getElementById('give-btn');
    var interim = document.getElementById('give-interim');
    var other = document.getElementById('amt-other');
    var freq = 'once';
    var selected = '180';

    pay.querySelectorAll('.tg').forEach(function (t) {
      t.addEventListener('click', function () {
        pay.querySelectorAll('.tg').forEach(function (x) { x.classList.remove('sel'); });
        t.classList.add('sel');
        freq = t.getAttribute('data-freq') || 'once';
      });
    });

    pay.querySelectorAll('.amt[data-amount]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        pay.querySelectorAll('.amt').forEach(function (c) { c.classList.remove('sel'); });
        chip.classList.add('sel');
        selected = chip.getAttribute('data-amount') || '';
        if (other) other.value = '';
      });
    });

    if (other) {
      other.addEventListener('focus', function () {
        pay.querySelectorAll('.amt').forEach(function (c) { c.classList.remove('sel'); });
        other.closest('.amt').classList.add('sel');
        selected = '';
      });
      other.addEventListener('input', function () {
        selected = other.value.replace(/[^0-9]/g, '');
      });
    }

    if (url && btn) {
      if (interim) interim.style.display = 'none';
      btn.addEventListener('click', function () {
        var target = url;
        var params = [];
        if (selected) params.push('amount=' + encodeURIComponent(selected));
        if (freq) params.push('frequency=' + encodeURIComponent(freq));
        if (params.length) target += (url.indexOf('?') === -1 ? '?' : '&') + params.join('&');
        window.open(target, '_blank', 'noopener');
      });
    } else if (btn) {
      btn.setAttribute('disabled', 'disabled');
    }
  }
})();
