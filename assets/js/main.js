/* ==========================================================================
   Dra. Ana Paula Oguido — comportamento da página
   Tudo aqui é progressivo: sem JS o site continua legível e navegável.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var coarse = window.matchMedia('(hover: none), (pointer: coarse)');

  /* ---------------------------------------------------------------------
     1. A lente
     A tabela de acuidade existe em duas camadas idênticas: uma borrada,
     outra nítida recortada em círculo. A lente move o recorte — é o
     assunto da página demonstrado em vez de descrito.
     --------------------------------------------------------------------- */
  (function lens() {
    var hero = document.querySelector('.hero');
    var band = document.querySelector('.acuity');
    var soft = document.querySelector('.acuity__layer--soft');
    var slot = document.querySelector('[data-chart-clone]');
    var ring = document.querySelector('.acuity__lens');
    if (!hero || !band || !soft || !slot || !ring) return;

    var chart = soft.querySelector('svg');
    if (!chart) return;
    slot.appendChild(chart.cloneNode(true));

    var w = band.offsetWidth;
    var r = ring.offsetWidth / 2 || 60;
    var cx = w * 0.22, tx = cx;
    var visible = true, running = false, t = 0;

    function paint() { band.style.setProperty('--lx', cx.toFixed(1) + 'px'); }
    function measure() { w = band.offsetWidth; r = ring.offsetWidth / 2 || 60; }
    function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

    // Movimento reduzido: a lente estaciona sobre as letras médias e fica lá.
    if (reduce.matches) { cx = w * 0.42; paint(); return; }

    // O cursor pode estar em qualquer ponto do hero: só o eixo X importa.
    function onMove(e) {
      var box = band.getBoundingClientRect();
      tx = clamp(e.clientX - box.left, r * 0.5, w - r * 0.5);
    }

    function tick() {
      if (!visible) { running = false; return; }
      if (coarse.matches) {
        // Sem cursor: a lente percorre a linha sozinha, devagar.
        t += 0.0042;
        tx = r * 1.35 + (w - 2.7 * r) * (0.5 - 0.5 * Math.cos(t));
      }
      cx += (tx - cx) * 0.08;
      paint();
      requestAnimationFrame(tick);
    }
    function start() { if (!running) { running = true; requestAnimationFrame(tick); } }

    if (!coarse.matches) hero.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', function () { measure(); }, { passive: true });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) start();
      }, { threshold: 0 }).observe(band);
    }

    measure(); paint(); start();
  })();

  /* ---------------------------------------------------------------------
     2. Tamanho do texto
     Público com catarata e baixa visão: aumentar a fonte é função, não
     enfeite. A escolha fica guardada no navegador da pessoa.
     --------------------------------------------------------------------- */
  (function textSize() {
    var STEPS = [100, 109, 118];
    var KEY = 'apo-textsize';
    var btns = document.querySelectorAll('[data-textsize]');
    if (!btns.length) return;

    var i = 0;
    try {
      var saved = parseInt(localStorage.getItem(KEY), 10);
      if (saved >= 0 && saved < STEPS.length) i = saved;
    } catch (e) { /* localStorage bloqueado — segue no padrão */ }

    function apply() {
      document.documentElement.style.setProperty('--fs', STEPS[i] + '%');
      btns.forEach(function (b) {
        var up = b.getAttribute('data-textsize') === 'up';
        b.disabled = up ? i === STEPS.length - 1 : i === 0;
      });
      try { localStorage.setItem(KEY, String(i)); } catch (e) { /* idem */ }
    }

    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        i = b.getAttribute('data-textsize') === 'up'
          ? Math.min(i + 1, STEPS.length - 1)
          : Math.max(i - 1, 0);
        apply();
      });
    });
    apply();
  })();

  /* ---------------------------------------------------------------------
     3. Mapa sob demanda
     O iframe do Google só é criado depois do clique — nada é enviado a
     terceiros enquanto a pessoa apenas lê a página.
     --------------------------------------------------------------------- */
  (function map() {
    var box = document.getElementById('mapbox');
    var btn = document.getElementById('mapLoad');
    if (!box || !btn) return;

    btn.addEventListener('click', function () {
      var q = 'Rua Mato Grosso, 1611 - Centro, Londrina - PR, 86010-180';
      var f = document.createElement('iframe');
      f.src = 'https://www.google.com/maps?q=' + encodeURIComponent(q) + '&output=embed';
      f.title = 'Mapa: Rua Mato Grosso, 1611 — Centro, Londrina-PR';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      f.setAttribute('allowfullscreen', '');
      btn.remove();
      box.appendChild(f);
    });
  })();

  /* ---------------------------------------------------------------------
     4. Seção corrente no menu
     --------------------------------------------------------------------- */
  (function activeNav() {
    var links = document.querySelectorAll('.topnav a');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    var targets = [];
    links.forEach(function (a) {
      var el = document.querySelector(a.getAttribute('href'));
      if (el) { map[el.id] = a; targets.push(el); }
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        if (map[en.target.id]) map[en.target.id].classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    targets.forEach(function (el) { io.observe(el); });
  })();

  /* --------------------------------------------------------------------- */
  var y = document.getElementById('ano');
  if (y) y.textContent = String(new Date().getFullYear());

})();
