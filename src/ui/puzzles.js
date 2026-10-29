/* Finders Keepers — puzzle widgets. Each calls done(true) on success or done(false) on giving up / failing. */
(function (G) {
  'use strict';
  var P = G.PUZZLES = {};
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
  function btn(label, cls, fn) { var b = el('button', 'btn ' + (cls || ''), label); b.type = 'button'; b.addEventListener('click', fn); return b; }
  function sfx(n) { if (G.AU) G.AU.sfx(n); }

  P.keypad = function (spec, root, done) {
    var entry = '', tries = 0, max = 3;
    var lcd = el('div', 'lcd', '&nbsp;');
    var info = el('div', 'moves', 'Attempts left: ' + max);
    var pad = el('div', 'keypad');
    function show() { lcd.textContent = entry ? entry.replace(/./g, '•').slice(0, -1) + entry.slice(-1) : ' '; }
    '123456789'.split('').concat(['CLR', '0', 'OK']).forEach(function (k) {
      pad.appendChild(btn(k, k === 'OK' ? 'primary' : '', function () {
        sfx('click');
        if (k === 'CLR') { entry = ''; show(); return; }
        if (k === 'OK') {
          if (entry.length !== spec.code.length) return;
          if (entry === spec.code) { lcd.textContent = 'OPEN'; sfx('win'); setTimeout(function () { done(true); }, 500); return; }
          tries++; lcd.classList.remove('bad'); void lcd.offsetWidth; lcd.classList.add('bad'); lcd.textContent = 'WRONG'; sfx('fail'); entry = '';
          info.textContent = 'Attempts left: ' + (max - tries);
          if (tries >= max) setTimeout(function () { done(false); }, 600);
          return;
        }
        if (entry.length < spec.code.length) { entry += k; show(); }
      }));
    });
    root.appendChild(lcd); root.appendChild(pad); root.appendChild(info);
    var keys = function (e) {
      if (!root.isConnected) { document.removeEventListener('keydown', keys, true); return; }
      if (/^[0-9]$/.test(e.key) && entry.length < spec.code.length) { entry += e.key; show(); e.stopPropagation(); }
    };
    document.addEventListener('keydown', keys, true);
  };

  P.lights = function (spec, root, done) {
    var n = spec.size || 3, on = [], moves = 0, limit = spec.limit || 14;
    for (var i = 0; i < n * n; i++) on.push(true);
    function press(i, quiet) {
      var r = Math.floor(i / n), c = i % n;
      [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
        var rr = r + d[0], cc = c + d[1];
        if (rr >= 0 && rr < n && cc >= 0 && cc < n) on[rr * n + cc] = !on[rr * n + cc];
      });
      if (!quiet) sfx('click');
    }
    (spec.presses || [0, 4, 8]).forEach(function (i) { press(i, true); });
    var grid = el('div', 'lights'), info = el('div', 'moves');
    function draw() {
      grid.innerHTML = '';
      on.forEach(function (v, i) {
        var b = el('button', 'light' + (v ? ' on' : '')); b.type = 'button';
        b.setAttribute('aria-label', 'Switch ' + (i + 1) + (v ? ', lit' : ', dark'));
        b.addEventListener('click', function () {
          press(i); moves++; draw();
          if (on.every(Boolean)) { sfx('win'); setTimeout(function () { done(true); }, 450); return; }
          if (moves >= limit) { sfx('fail'); setTimeout(function () { done(false); }, 300); }
        });
        grid.appendChild(b);
      });
      info.textContent = 'Flicks: ' + moves + ' / ' + limit + ' before the box bites';
    }
    draw();
    root.appendChild(grid); root.appendChild(info);
  };

  P.dial = function (spec, root, done) {
    var sym = spec.symbols, pos = [0, 0, 0].map(function () { return Math.floor(Math.random() * sym.length); });
    var wrap = el('div', 'dials');
    function draw() {
      wrap.innerHTML = '';
      pos.forEach(function (p, i) {
        var d = el('div', 'dial'), face = el('button', 'face', G.ICONS.glyph[sym[p]]); face.type = 'button';
        face.setAttribute('aria-label', 'Ring ' + (i + 1) + ': ' + sym[p] + '. Turn');
        face.style.transform = 'rotate(' + (p * 60) + 'deg)';
        face.firstChild.style.transform = 'rotate(' + (-p * 60) + 'deg)';
        face.addEventListener('click', function () { pos[i] = (pos[i] + 1) % sym.length; sfx('click'); draw(); });
        d.appendChild(face); d.appendChild(el('div', 'dname', sym[p]));
        wrap.appendChild(d);
      });
    }
    draw();
    root.appendChild(wrap);
    var row = el('div', 'row end'); row.style.marginTop = '14px';
    row.appendChild(btn('Lock the rings', 'primary', function () {
      var ok = pos.every(function (p, i) { return p === spec.target[i]; });
      sfx(ok ? 'win' : 'fail');
      setTimeout(function () { done(ok); }, 350);
    }));
    root.appendChild(row);
  };

  P.sequence = function (spec, root, done) {
    var placed = [], tokens = spec.symbols.slice().sort(function () { return Math.random() - 0.5; });
    var slots = el('div', 'seq-slots'), tray = el('div', 'seq-tokens');
    function draw() {
      slots.innerHTML = ''; tray.innerHTML = '';
      for (var i = 0; i < spec.answer.length; i++) {
        (function (i) {
          var s = el('button', 'seq-slot', placed[i] || '—'); s.type = 'button';
          s.setAttribute('aria-label', 'Socket ' + (i + 1) + (placed[i] ? ': ' + placed[i] + '. Remove' : ': empty'));
          s.addEventListener('click', function () { if (placed[i]) { placed.splice(i, 1); sfx('click'); draw(); } });
          slots.appendChild(s);
        })(i);
      }
      tokens.forEach(function (t) {
        if (placed.indexOf(t) >= 0) return;
        tray.appendChild(btn(t, 'seq-token', function () { if (placed.length < spec.answer.length) { placed.push(t); sfx('click'); draw(); } }));
      });
    }
    draw();
    root.appendChild(slots); root.appendChild(tray);
    var row = el('div', 'row end');
    row.appendChild(btn('Clear', '', function () { placed = []; draw(); }));
    row.appendChild(btn('Set them', 'primary', function () {
      if (placed.length !== spec.answer.length) return;
      var ok = placed.every(function (p, i) { return p === spec.answer[i]; });
      sfx(ok ? 'win' : 'fail');
      setTimeout(function () { done(ok); }, 350);
    }));
    root.appendChild(row);
  };

  P.open = function (spec, root, done) {
    var box = el('div', 'puzzle');
    box.appendChild(el('div', 'p-prompt', spec.prompt || ''));
    var inner = el('div');
    box.appendChild(inner);
    var finished = false;
    function fin(ok) { if (finished) return; finished = true; done(ok); }
    (P[spec.kind] || P.keypad)(spec, inner, fin);
    var row = el('div', 'row end'); row.style.marginTop = '12px';
    row.appendChild(btn('Give up', 'ghost', function () { fin(false); }));
    box.appendChild(row);
    root.appendChild(box);
    return box;
  };
})(typeof window !== 'undefined' ? window : globalThis);
