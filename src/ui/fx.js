/* Finders Keepers — procedural backgrounds drawn on one canvas.
 * Scenes: rain (the house), garage, snow, fire, spore, portal. Crossfades between them. */
(function (G) {
  'use strict';
  var FX = G.FX = {};
  var cv, ctx, W = 0, H = 0, dpr = 1, t = 0, last = 0;
  var cur = null, prev = null, fade = 1, flashA = 0, flashC = '255,255,255', heat = 0, dark = 0, tint = null;
  var reduce = G.matchMedia && G.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var running = true;

  function rnd(a, b) { return a + Math.random() * (b - a); }

  /* ------------------------------------------------------------ scene definitions */
  var S = {};

  S.rain = function () {
    var drops = [], n = reduce ? 70 : 240, splashes = [], bolt = 0, nextBolt = rnd(6, 14), beam = -1;
    for (var i = 0; i < n; i++) drops.push({ x: rnd(-200, W + 200), y: rnd(-H, H), l: rnd(10, 26), v: rnd(700, 1100), a: rnd(0.15, 0.45) });
    var houseL = W * 0.18, houseR = W * 0.82;
    return {
      draw: function (dt) {
        var g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, '#0c1424'); g.addColorStop(0.6, '#070b14'); g.addColorStop(1, '#040509');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        // distant streetlight halo
        halo(W * 0.08, H * 0.62, H * 0.35, 'rgba(255,190,110,0.10)');
        // the house silhouette
        var base = H * 0.86, roof = H * 0.5;
        ctx.fillStyle = '#05070b';
        ctx.beginPath();
        ctx.moveTo(houseL, base); ctx.lineTo(houseL, roof + H * 0.08); ctx.lineTo((houseL + houseR) / 2, roof - H * 0.06);
        ctx.lineTo(houseR, roof + H * 0.08); ctx.lineTo(houseR, base); ctx.closePath(); ctx.fill();
        // garage block
        ctx.fillRect(houseR - 2, roof + H * 0.18, W * 0.12, base - roof - H * 0.18);
        // windows
        var ww = (houseR - houseL) / 9, wy1 = roof + H * 0.13, wy2 = roof + H * 0.25;
        for (var i = 0; i < 4; i++) {
          var lit = (i === 1) ? 0.55 + 0.1 * Math.sin(t * 0.7) : (i === 3 && Math.sin(t * 0.13) > 0.6 ? 0.35 : 0.05);
          win(houseL + ww * (1 + i * 2), wy1, ww * 0.9, H * 0.07, lit);
        }
        win(houseL + ww * 1, wy2, ww * 0.9, H * 0.08, 0.06);
        win(houseL + ww * 5, wy2, ww * 0.9, H * 0.08, 0.08 + (heat >= 7 ? 0.25 * (0.5 + 0.5 * Math.sin(t * 9)) : 0));
        // green glow under the garage door
        var gp = 0.25 + 0.2 * Math.sin(t * 1.3);
        var gg = ctx.createLinearGradient(0, base - 6, 0, base + 30);
        gg.addColorStop(0, 'rgba(141,255,122,' + gp + ')'); gg.addColorStop(1, 'rgba(141,255,122,0)');
        ctx.fillStyle = gg; ctx.fillRect(houseR, base - 4, W * 0.12, 34);
        // ground
        ctx.fillStyle = '#030406'; ctx.fillRect(0, base, W, H - base);
        // headlight sweep when the street is watching you
        if (heat >= 4) {
          if (beam < 0 && Math.random() < dt * 0.08 * heat / 10) beam = 0;
          if (beam >= 0) {
            beam += dt * 0.35;
            var bx = -W * 0.3 + beam * W * 1.6;
            var bg = ctx.createLinearGradient(bx - 160, 0, bx + 160, 0);
            bg.addColorStop(0, 'rgba(255,255,230,0)'); bg.addColorStop(0.5, 'rgba(255,255,230,0.07)'); bg.addColorStop(1, 'rgba(255,255,230,0)');
            ctx.fillStyle = bg; ctx.fillRect(bx - 160, H * 0.3, 320, H * 0.6);
            if (beam > 1) beam = -1;
          }
        }
        // rain
        ctx.strokeStyle = 'rgba(170,200,255,0.35)'; ctx.lineWidth = 1;
        ctx.beginPath();
        for (var j = 0; j < drops.length; j++) {
          var d = drops[j];
          d.y += d.v * dt; d.x += d.v * dt * 0.18;
          if (d.y > base + rnd(0, H * 0.1)) {
            if (splashes.length < 80 && Math.random() < 0.4) splashes.push({ x: d.x, y: d.y, r: 0, a: 0.5 });
            d.y = rnd(-120, -10); d.x = rnd(-200, W);
          }
          ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - d.l * 0.18, d.y - d.l);
        }
        ctx.stroke();
        for (var k = splashes.length - 1; k >= 0; k--) {
          var s = splashes[k]; s.r += dt * 30; s.a -= dt * 1.6;
          if (s.a <= 0) { splashes.splice(k, 1); continue; }
          ctx.strokeStyle = 'rgba(170,200,255,' + s.a * 0.5 + ')';
          ctx.beginPath(); ctx.ellipse(s.x, s.y, s.r, s.r * 0.3, 0, 0, Math.PI * 2); ctx.stroke();
        }
        // lightning
        nextBolt -= dt;
        if (nextBolt <= 0 && !reduce) { bolt = 1; nextBolt = rnd(9, 22); if (FX.onThunder) FX.onThunder(); }
        if (bolt > 0) { ctx.fillStyle = 'rgba(210,220,255,' + (bolt * 0.22) + ')'; ctx.fillRect(0, 0, W, H); bolt -= dt * 2.2; }
      }
    };
  };

  S.garage = function () {
    var motes = [], sparks = [], nextSpark = rnd(2, 6);
    for (var i = 0; i < (reduce ? 30 : 90); i++) motes.push({ x: rnd(0, W), y: rnd(0, H), v: rnd(4, 14), p: rnd(0, 6) });
    return {
      draw: function (dt) {
        var g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, '#15100a'); g.addColorStop(1, '#040302');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        // pegboard dots
        ctx.fillStyle = 'rgba(255,220,170,0.035)';
        for (var y = H * 0.1; y < H * 0.55; y += 22) for (var x = W * 0.08; x < W * 0.45; x += 22) ctx.fillRect(x, y, 2, 2);
        // map screen glow on the right wall
        var ms = 0.5 + 0.15 * Math.sin(t * 0.9);
        ctx.fillStyle = 'rgba(30,60,40,' + ms * 0.6 + ')';
        ctx.fillRect(W * 0.62, H * 0.16, W * 0.26, H * 0.24);
        ctx.strokeStyle = 'rgba(141,255,122,' + ms * 0.4 + ')'; ctx.strokeRect(W * 0.62, H * 0.16, W * 0.26, H * 0.24);
        for (var m = 0; m < 3; m++) {
          var mx = W * (0.67 + m * 0.08), my = H * (0.22 + (m % 2) * 0.1);
          halo(mx, my, 18 + 6 * Math.sin(t * 2 + m), 'rgba(141,255,122,0.35)');
        }
        // swinging bulb
        var bx = W * 0.5 + Math.sin(t * 0.6) * W * 0.02, by = H * 0.18;
        ctx.strokeStyle = 'rgba(0,0,0,0.8)'; ctx.beginPath(); ctx.moveTo(W * 0.5, 0); ctx.lineTo(bx, by); ctx.stroke();
        var flick = Math.random() < 0.01 ? 0.3 : 1;
        halo(bx, by, H * 0.65, 'rgba(255,200,130,' + 0.16 * flick + ')');
        halo(bx, by, 26, 'rgba(255,230,180,' + 0.9 * flick + ')');
        // bench silhouette
        ctx.fillStyle = '#060504'; ctx.fillRect(W * 0.05, H * 0.6, W * 0.45, H * 0.05);
        ctx.fillRect(W * 0.07, H * 0.65, W * 0.02, H * 0.3); ctx.fillRect(W * 0.46, H * 0.65, W * 0.02, H * 0.3);
        // the ship under its tarp
        ctx.fillStyle = '#080706';
        ctx.beginPath(); ctx.ellipse(W * 0.72, H * 0.8, W * 0.18, H * 0.1, 0, Math.PI, 0); ctx.fill();
        // green pulse along the floor
        var gp = 0.12 + 0.1 * Math.sin(t * 1.1);
        var gg = ctx.createLinearGradient(0, H, 0, H * 0.75);
        gg.addColorStop(0, 'rgba(141,255,122,' + gp + ')'); gg.addColorStop(1, 'rgba(141,255,122,0)');
        ctx.fillStyle = gg; ctx.fillRect(0, H * 0.75, W, H * 0.25);
        // dust
        ctx.fillStyle = 'rgba(255,230,190,0.35)';
        motes.forEach(function (d) {
          d.y -= d.v * dt * 0.3; d.x += Math.sin(t * 0.5 + d.p) * dt * 6;
          if (d.y < 0) { d.y = H; d.x = rnd(0, W); }
          ctx.fillRect(d.x, d.y, 1.4, 1.4);
        });
        // sparks from the bench
        nextSpark -= dt;
        if (nextSpark <= 0 && !reduce) {
          nextSpark = rnd(3, 9);
          for (var i = 0; i < 26; i++) sparks.push({ x: W * 0.3, y: H * 0.6, vx: rnd(-160, 160), vy: rnd(-260, -40), a: 1 });
          if (FX.onSpark) FX.onSpark();
        }
        for (var s = sparks.length - 1; s >= 0; s--) {
          var p = sparks[s]; p.vy += 600 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.a -= dt * 1.4;
          if (p.a <= 0) { sparks.splice(s, 1); continue; }
          ctx.fillStyle = 'rgba(255,' + (180 + 70 * p.a | 0) + ',90,' + p.a + ')';
          ctx.fillRect(p.x, p.y, 2, 2);
        }
      }
    };
  };

  S.snow = function () {
    var flakes = [];
    for (var i = 0; i < (reduce ? 80 : 260); i++) flakes.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(0.8, 2.8), v: rnd(20, 70), p: rnd(0, 6) });
    return {
      draw: function (dt) {
        var g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, '#59667a'); g.addColorStop(0.55, '#2a3341'); g.addColorStop(1, '#0d1118');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        var hz = H * 0.68;
        // far ice plain
        ctx.fillStyle = '#c9d8e8'; ctx.globalAlpha = 0.16; ctx.fillRect(0, hz, W, H - hz); ctx.globalAlpha = 1;
        // the glass gate with six portals
        ctx.strokeStyle = 'rgba(255,200,120,0.55)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(W * 0.22, hz - 4); ctx.lineTo(W * 0.78, hz - 4); ctx.stroke(); ctx.lineWidth = 1;
        for (var i = 0; i < 6; i++) {
          var px = W * (0.27 + i * 0.09), py = hz - 34 + Math.sin(t + i) * 2;
          halo(px, py, 24 + 4 * Math.sin(t * 1.7 + i), 'rgba(160,220,255,0.35)');
          ctx.strokeStyle = 'rgba(200,240,255,0.6)'; ctx.beginPath(); ctx.ellipse(px, py, 9, 14, 0, 0, Math.PI * 2); ctx.stroke();
        }
        // grey tents
        ctx.fillStyle = 'rgba(20,24,30,0.85)';
        for (var k = 0; k < 7; k++) { var tx = W * (0.05 + k * 0.035); tri(tx, hz + 4, 26, 20); }
        ctx.fillRect(W * 0.16, hz - 90, 2, 90);
        halo(W * 0.16 + 1, hz - 90, 10 + 3 * Math.sin(t * 4), 'rgba(255,90,90,0.6)');
        // snow, sideways, never landing
        var wind = 140 + 60 * Math.sin(t * 0.3);
        ctx.fillStyle = 'rgba(240,248,255,0.85)';
        flakes.forEach(function (f) {
          f.x += (wind * (f.r / 2.8)) * dt; f.y += f.v * dt * 0.5 + Math.sin(t * 2 + f.p) * dt * 12;
          if (f.x > W + 10) { f.x = -10; f.y = rnd(0, H); }
          if (f.y > H) f.y = -5;
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
        });
        // cold haze
        ctx.fillStyle = 'rgba(220,235,255,0.05)'; ctx.fillRect(0, 0, W, H);
      }
    };
  };

  S.fire = function () {
    var embers = [];
    for (var i = 0; i < (reduce ? 50 : 160); i++) embers.push({ x: rnd(0, W), y: rnd(0, H), v: rnd(30, 110), p: rnd(0, 6), r: rnd(0.8, 2.4) });
    var roofs = [];
    for (var x = 0; x < W + 80; x += rnd(50, 110)) roofs.push({ x: x, w: rnd(40, 100), h: rnd(H * 0.12, H * 0.32) });
    return {
      draw: function (dt) {
        var g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, '#1d0703'); g.addColorStop(0.6, '#2b0b04'); g.addColorStop(1, '#0a0201');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        halo(W * 0.5, H * 1.05, H * 0.9, 'rgba(255,110,30,0.18)');
        // burning rooftops
        var base = H * 0.8;
        roofs.forEach(function (r, i) {
          ctx.fillStyle = '#0b0302'; ctx.fillRect(r.x, base - r.h, r.w, r.h + H * 0.2);
          flames(r.x, base - r.h, r.w, 18 + 10 * Math.sin(t * 2 + i), i);
          // lit windows
          ctx.fillStyle = 'rgba(255,150,60,' + (0.3 + 0.2 * Math.sin(t * 3 + i)) + ')';
          for (var wy = base - r.h + 14; wy < base - 10; wy += 22) ctx.fillRect(r.x + r.w * 0.3, wy, 6, 9);
        });
        // street glass
        ctx.fillStyle = '#050101'; ctx.fillRect(0, base, W, H - base);
        flames(0, H, W, 40 + 14 * Math.sin(t), 99);
        // embers
        embers.forEach(function (e) {
          e.y -= e.v * dt; e.x += Math.sin(t * 1.5 + e.p) * dt * 20;
          if (e.y < -10) { e.y = H + 10; e.x = rnd(0, W); }
          var a = 0.5 + 0.5 * Math.sin(t * 6 + e.p);
          ctx.fillStyle = 'rgba(255,' + (140 + 80 * a | 0) + ',60,' + (0.4 + 0.5 * a) + ')';
          ctx.fillRect(e.x, e.y, e.r, e.r);
        });
      }
    };
  };

  S.spore = function () {
    var motes = [], isles = [];
    for (var i = 0; i < (reduce ? 40 : 140); i++) motes.push({ x: rnd(0, W), y: rnd(0, H), v: rnd(6, 22), p: rnd(0, 6), r: rnd(1, 3.4) });
    for (var k = 0; k < 6; k++) isles.push({ x: rnd(0, W), y: rnd(H * 0.2, H * 0.85), w: rnd(60, 220), v: rnd(4, 12) * (Math.random() < 0.5 ? -1 : 1), p: rnd(0, 6) });
    return {
      draw: function (dt) {
        var g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, '#061a0d'); g.addColorStop(1, '#010502');
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
        halo(W * 0.5, H * 0.45, H * 0.8, 'rgba(120,255,140,0.06)');
        isles.forEach(function (s) {
          s.x += s.v * dt; if (s.x > W + s.w) s.x = -s.w; if (s.x < -s.w) s.x = W + s.w;
          var y = s.y + Math.sin(t * 0.4 + s.p) * 8;
          ctx.fillStyle = 'rgba(200,230,200,0.10)';
          ctx.beginPath(); ctx.ellipse(s.x, y, s.w, s.w * 0.16, 0, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = 'rgba(160,220,170,0.08)';
          for (var r = -2; r <= 2; r++) {
            ctx.beginPath(); ctx.moveTo(s.x + r * s.w * 0.3, y + s.w * 0.1);
            ctx.quadraticCurveTo(s.x + r * s.w * 0.3 + Math.sin(t + r) * 10, y + s.w * 0.4, s.x + r * s.w * 0.25, y + s.w * 0.7);
            ctx.stroke();
          }
          // caps on top
          for (var c = 0; c < 4; c++) halo(s.x - s.w * 0.5 + c * s.w * 0.33, y - 6, 8, 'rgba(170,255,170,0.25)');
        });
        ctx.globalCompositeOperation = 'lighter';
        motes.forEach(function (m) {
          m.y -= m.v * dt; m.x += Math.sin(t * 0.6 + m.p) * dt * 8;
          if (m.y < -10) { m.y = H + 10; m.x = rnd(0, W); }
          var a = 0.35 + 0.35 * Math.sin(t * 1.3 + m.p);
          halo(m.x, m.y, m.r * 4, 'rgba(160,255,150,' + a * 0.5 + ')');
        });
        ctx.globalCompositeOperation = 'source-over';
      }
    };
  };

  S.portal = function () {
    var rings = [];
    for (var i = 0; i < 26; i++) rings.push({ r: rnd(0.05, 0.5), w: rnd(1, 4), v: rnd(-1.2, 1.2), a0: rnd(0, 6), span: rnd(0.4, 2.4), al: rnd(0.15, 0.6) });
    var stars = [];
    for (var s = 0; s < 140; s++) stars.push({ x: rnd(0, 1), y: rnd(0, 1), r: rnd(0.4, 1.5), p: rnd(0, 6) });
    return {
      draw: function (dt) {
        ctx.fillStyle = '#020405'; ctx.fillRect(0, 0, W, H);
        stars.forEach(function (st) {
          ctx.fillStyle = 'rgba(220,255,230,' + (0.25 + 0.25 * Math.sin(t + st.p)) + ')';
          ctx.fillRect(st.x * W, st.y * H, st.r, st.r);
        });
        var cx = W / 2, cy = H * 0.45, R = Math.min(W, H);
        halo(cx, cy, R * 0.45, 'rgba(120,255,110,0.18)');
        halo(cx, cy, R * 0.16, 'rgba(180,255,170,0.35)');
        rings.forEach(function (r) {
          var a = r.a0 + t * r.v * (reduce ? 0.2 : 1);
          ctx.strokeStyle = 'rgba(141,255,122,' + r.al + ')'; ctx.lineWidth = r.w;
          ctx.beginPath(); ctx.ellipse(cx, cy, R * r.r, R * r.r * 0.86, 0, a, a + r.span); ctx.stroke();
        });
        ctx.lineWidth = 1;
      }
    };
  };

  /* ------------------------------------------------------------ helpers */
  function halo(x, y, r, color) {
    if (r <= 0) return;
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, color); g.addColorStop(1, color.replace(/,[^,]*\)$/, ',0)'));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  function win(x, y, w, h, lit) {
    ctx.fillStyle = 'rgba(255,200,120,' + lit + ')'; ctx.fillRect(x, y, w, h);
    if (lit > 0.2) halo(x + w / 2, y + h / 2, w * 1.6, 'rgba(255,190,110,' + lit * 0.25 + ')');
    ctx.fillStyle = '#05070b'; ctx.fillRect(x + w / 2 - 1, y, 2, h); ctx.fillRect(x, y + h / 2 - 1, w, 2);
  }
  function tri(x, y, w, h) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w / 2, y - h); ctx.lineTo(x + w, y); ctx.closePath(); ctx.fill(); }
  function flames(x, y, w, h, seed) {
    var g = ctx.createLinearGradient(0, y - h * 2.2, 0, y);
    g.addColorStop(0, 'rgba(255,90,20,0)'); g.addColorStop(0.5, 'rgba(255,120,30,0.55)'); g.addColorStop(1, 'rgba(255,210,90,0.85)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x, y);
    for (var i = 0; i <= w; i += 6) {
      var n = Math.sin(i * 0.09 + t * 5 + seed) * 0.5 + Math.sin(i * 0.23 - t * 7 + seed * 2) * 0.35 + Math.sin(i * 0.05 + t * 2) * 0.4;
      ctx.lineTo(x + i, y - h * (1.2 + n));
    }
    ctx.lineTo(x + w, y); ctx.closePath(); ctx.fill();
  }

  /* ------------------------------------------------------------ loop */
  function resize() {
    dpr = Math.min(G.devicePixelRatio || 1, 1.5);
    W = G.innerWidth; H = G.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (cur) { cur = S[cur.name]() ; cur.name = curName; }
    prev = null;
  }
  var curName = null;

  function frame(now) {
    if (!running) return;
    var dt = Math.min(0.05, (now - last) / 1000 || 0); last = now; t += dt;
    if (cur) {
      if (prev && fade < 1) {
        prev.draw(dt);
        ctx.globalAlpha = fade; cur.draw(dt); ctx.globalAlpha = 1;
        fade += dt * 1.2;
        if (fade >= 1) prev = null;
      } else cur.draw(dt);
    }
    if (dark > 0) { ctx.fillStyle = 'rgba(0,0,0,' + dark + ')'; ctx.fillRect(0, 0, W, H); }
    if (tint) { ctx.fillStyle = tint; ctx.fillRect(0, 0, W, H); }
    if (flashA > 0) { ctx.fillStyle = 'rgba(' + flashC + ',' + flashA + ')'; ctx.fillRect(0, 0, W, H); flashA -= dt * 1.5; }
    G.requestAnimationFrame(frame);
  }

  FX.init = function (canvas) {
    cv = canvas; ctx = cv.getContext('2d');
    resize();
    G.addEventListener('resize', function () { resize(); });
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) { last = performance.now(); G.requestAnimationFrame(frame); }
    });
    G.requestAnimationFrame(function (n) { last = n; frame(n); });
  };

  FX.set = function (name) {
    if (!S[name]) name = 'rain';
    if (name === curName) return;
    var next = S[name](); next.name = name;
    prev = cur; cur = next; curName = name; fade = prev ? 0 : 1;
  };
  FX.flash = function (rgb, a) { flashC = rgb || '141,255,122'; flashA = a || 0.6; };
  FX.setHeat = function (h) { heat = h; };
  FX.setMood = function (m) {
    dark = m === 'death' ? 0.55 : m === 'dim' ? 0.25 : 0;
    tint = m === 'death' ? 'rgba(90,0,0,0.25)' : null;
  };
  FX.scene = function () { return curName; };
})(typeof window !== 'undefined' ? window : globalThis);
