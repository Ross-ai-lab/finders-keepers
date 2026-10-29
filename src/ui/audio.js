/* Finders Keepers — procedural sound. Ambient beds per place, a slow generative
 * score, a heartbeat when the street is watching, and small effect sounds. */
(function (G) {
  'use strict';
  var AU = G.AU = {};
  var ac = null, master, bedBus, musicBus, sfxBus, noiseBuf, brownBuf;
  var bed = null, bedName = null, wanted = 'rain', heat = 0, chapter = 1, timers = [];
  var enabled = true;
  try { enabled = G.localStorage.getItem('fk_sound') !== 'off'; } catch (e) {}

  function now() { return ac.currentTime; }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  function makeNoise(brown) {
    var len = ac.sampleRate * 3, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0), last = 0;
    for (var i = 0; i < len; i++) {
      var w = Math.random() * 2 - 1;
      if (brown) { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w;
    }
    return buf;
  }
  var collecting = null; /* sources started while building a bed, so the bed can stop them all */
  function noiseSrc(brown) {
    var s = ac.createBufferSource(); s.buffer = brown ? brownBuf : noiseBuf; s.loop = true; s.start();
    if (collecting) collecting.push(s);
    return s;
  }
  function filt(type, f, q) { var b = ac.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q) b.Q.value = q; return b; }
  function gain(v) { var g = ac.createGain(); g.gain.value = v; return g; }
  function chain() { for (var i = 0; i < arguments.length - 1; i++) arguments[i].connect(arguments[i + 1]); return arguments[arguments.length - 1]; }
  function osc(type, f) {
    var o = ac.createOscillator(); o.type = type; o.frequency.value = f; o.start();
    if (collecting) collecting.push(o);
    return o;
  }
  function lfo(f, depth, target) { var o = osc('sine', f), g = gain(depth); o.connect(g); g.connect(target); return o; }

  /* one-shot envelope tone */
  function tone(f, dur, type, vol, when, bus, attack) {
    var t = (when || now());
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol || 0.2, t + (attack || 0.01));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(bus || sfxBus); o.start(t); o.stop(t + dur + 0.05);
    return o;
  }
  function burst(dur, f, type, vol, bus, when) {
    var t = when || now(), s = ac.createBufferSource(); s.buffer = noiseBuf;
    var b = filt(type || 'bandpass', f || 1000, 0.8), g = ac.createGain();
    g.gain.setValueAtTime(vol || 0.2, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(b); b.connect(g); g.connect(bus || sfxBus); s.start(t, rnd(0, 2)); s.stop(t + dur + 0.05);
  }

  /* ------------------------------------------------------------ ambient beds */
  var BEDS = {
    rain: function (out) {
      var stop = [];
      stop.push(chain(noiseSrc(), filt('bandpass', 1400, 0.5), gain(0.16), out));
      stop.push(chain(noiseSrc(true), filt('lowpass', 260), gain(0.25), out));
      var iv = setInterval(function () { if (Math.random() < 0.6) tone(rnd(2200, 4200), 0.08, 'sine', 0.015, null, out); }, 380);
      return { stop: function () { clearInterval(iv); } };
    },
    garage: function (out) {
      var hum = osc('sawtooth', 55), hf = filt('lowpass', 170), hg = gain(0.05);
      chain(hum, hf, hg, out);
      var h2 = osc('sine', 110.6); chain(h2, gain(0.025), out);
      lfo(0.2, 30, hf.frequency);
      chain(noiseSrc(true), filt('lowpass', 120), gain(0.12), out);
      var iv = setInterval(function () { if (Math.random() < 0.25) burst(0.05, 3000, 'highpass', 0.03, out); }, 700);
      return { stop: function () { clearInterval(iv); hum.stop(); h2.stop(); } };
    },
    snow: function (out) {
      var b = filt('bandpass', 500, 0.7), g = gain(0.2);
      chain(noiseSrc(), b, g, out);
      lfo(0.07, 260, b.frequency); lfo(0.11, 0.08, g.gain);
      chain(noiseSrc(), filt('highpass', 5000), gain(0.02), out);
      return { stop: function () {} };
    },
    fire: function (out) {
      chain(noiseSrc(true), filt('lowpass', 420), gain(0.32), out);
      var iv = setInterval(function () {
        var n = Math.random() < 0.5 ? 1 : 3;
        for (var i = 0; i < n; i++) burst(rnd(0.01, 0.04), rnd(1500, 5000), 'highpass', rnd(0.02, 0.07), out, now() + i * rnd(0.01, 0.05));
      }, 140);
      return { stop: function () { clearInterval(iv); } };
    },
    spore: function (out) {
      var notes = [220, 261.6, 329.6, 392], oscs = [];
      notes.forEach(function (f, i) {
        var o = osc('sine', f * (1 + rnd(-0.002, 0.002))), g = gain(0.018);
        lfo(0.05 + i * 0.03, 0.012, g.gain); chain(o, g, out); oscs.push(o);
      });
      var iv = setInterval(function () { if (Math.random() < 0.5) tone([880, 987.8, 1174.7, 1318.5][Math.random() * 4 | 0], 3.5, 'sine', 0.025, null, out, 0.4); }, 1700);
      return { stop: function () { clearInterval(iv); oscs.forEach(function (o) { o.stop(); }); } };
    },
    portal: function (out) {
      var o = osc('sine', 70), g = gain(0.06); chain(o, g, out); lfo(3, 12, o.frequency);
      var b = filt('bandpass', 600, 2); chain(noiseSrc(), b, gain(0.06), out); lfo(0.15, 500, b.frequency);
      return { stop: function () { o.stop(); } };
    }
  };

  function switchBed(name) {
    wanted = name;
    if (!ac || !enabled) return;
    if (name === bedName) return;
    var old = bed;
    if (old) {
      old.g.gain.setTargetAtTime(0.0001, now(), 0.6);
      setTimeout(function () {
        try { old.h.stop(); } catch (e) {}
        old.live.forEach(function (n) { try { n.stop(); } catch (e) {} });
        try { old.g.disconnect(); } catch (e) {}
      }, 2600);
    }
    if (!BEDS[name]) { bed = null; bedName = null; return; }
    var g = ac.createGain(); g.gain.value = 0.0001; g.connect(bedBus);
    collecting = [];
    var h = BEDS[name](g), live = collecting;
    collecting = null;
    g.gain.setTargetAtTime(1, now(), 0.8);
    bed = { g: g, h: h, live: live }; bedName = name;
  }

  /* ------------------------------------------------------------ music: slow generative pads */
  var PROG = {
    1: [[57, 60, 64], [53, 57, 60], [55, 59, 62], [52, 55, 59]],
    2: [[50, 57, 60, 65], [48, 55, 59, 62], [53, 57, 60, 64], [45, 52, 55, 59]],
    3: [[45, 48, 51, 55], [44, 47, 51, 54], [43, 46, 50, 53], [45, 49, 52, 56]]
  };
  var step = 0;
  function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }
  function musicTick() {
    if (!ac || !enabled) return;
    var prog = PROG[chapter] || PROG[1], chord = prog[step++ % prog.length], t = now();
    chord.forEach(function (m, i) {
      var o = ac.createOscillator(), g = ac.createGain(), f = filt('lowpass', 900);
      o.type = 'triangle'; o.frequency.value = mtof(m) * (1 + rnd(-0.003, 0.003));
      g.gain.setValueAtTime(0.0001, t + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.03, t + 1.8);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 7.5);
      o.connect(f); f.connect(g); g.connect(musicBus); o.start(t); o.stop(t + 8);
    });
    if (Math.random() < 0.55) {
      var top = chord[chord.length - 1] + 12 + [0, 2, 3, 5, 7][Math.random() * 5 | 0];
      tone(mtof(top), 2.5, 'sine', 0.018, t + rnd(1, 3), musicBus, 0.2);
    }
  }
  function heartTick() {
    if (!ac || !enabled || heat < 7) return;
    var t = now(), v = 0.12 + (heat - 7) * 0.04;
    [0, 0.22].forEach(function (d, i) {
      var o = ac.createOscillator(), g = ac.createGain();
      o.frequency.setValueAtTime(70, t + d); o.frequency.exponentialRampToValueAtTime(38, t + d + 0.18);
      g.gain.setValueAtTime(0.0001, t + d); g.gain.exponentialRampToValueAtTime(v * (i ? 0.7 : 1), t + d + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + d + 0.25);
      o.connect(g); g.connect(sfxBus); o.start(t + d); o.stop(t + d + 0.3);
    });
  }

  /* ------------------------------------------------------------ public */
  AU.start = function () {
    if (ac) { if (ac.state === 'suspended') ac.resume(); return; }
    var AC = G.AudioContext || G.webkitAudioContext;
    if (!AC) return;
    try { ac = new AC(); } catch (e) { ac = null; return; }
    master = ac.createGain(); master.gain.value = enabled ? 0.8 : 0; master.connect(ac.destination);
    var comp = ac.createDynamicsCompressor(); comp.connect(master);
    bedBus = gain(0.9); bedBus.connect(comp);
    musicBus = gain(0.9); musicBus.connect(comp);
    sfxBus = gain(1); sfxBus.connect(comp);
    noiseBuf = makeNoise(false); brownBuf = makeNoise(true);
    timers.push(setInterval(musicTick, 6500));
    var hb = function () { heartTick(); timers.push(setTimeout(hb, Math.max(650, 1300 - heat * 60))); };
    hb();
    musicTick();
    switchBed(wanted);
  };
  AU.isOn = function () { return enabled; };
  AU.toggle = function () {
    enabled = !enabled;
    try { G.localStorage.setItem('fk_sound', enabled ? 'on' : 'off'); } catch (e) {}
    if (ac) {
      master.gain.setTargetAtTime(enabled ? 0.8 : 0, now(), 0.1);
      if (enabled) { bedName = null; switchBed(wanted); }
    }
    return enabled;
  };
  AU.scene = function (name) { switchBed(name); };
  AU.setHeat = function (h) { heat = h; };
  AU.setChapter = function (c) { chapter = c; };

  AU.sfx = function (name) {
    if (!ac || !enabled) return;
    var t = now();
    switch (name) {
      case 'click': tone(620, 0.06, 'sine', 0.06); break;
      case 'page': burst(0.18, 4200, 'highpass', 0.04); break;
      case 'remember':
        tone(659.3, 1.6, 'triangle', 0.09, t); tone(987.8, 1.8, 'triangle', 0.06, t + 0.12);
        tone(1318.5, 2.2, 'sine', 0.03, t + 0.24); break;
      case 'item': [784, 988, 1175].forEach(function (f, i) { tone(f, 0.25, 'square', 0.025, t + i * 0.06); }); break;
      case 'clue': [1318.5, 1568, 1975.5, 2637].forEach(function (f, i) { tone(f, 0.9, 'sine', 0.03, t + i * 0.09); }); break;
      case 'hurt': (function () {
        var o = ac.createOscillator(), g = ac.createGain();
        o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(35, t + 0.3);
        g.gain.setValueAtTime(0.3, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
        o.connect(g); g.connect(sfxBus); o.start(t); o.stop(t + 0.45); burst(0.15, 400, 'lowpass', 0.2);
      })(); break;
      case 'heat': tone(98, 0.6, 'sawtooth', 0.04); tone(103.8, 0.6, 'sawtooth', 0.04); break;
      case 'portal': (function () {
        var o = ac.createOscillator(), g = ac.createGain(), f = filt('bandpass', 300, 3);
        o.type = 'sawtooth'; o.frequency.setValueAtTime(80, t); o.frequency.exponentialRampToValueAtTime(900, t + 0.9);
        f.frequency.setValueAtTime(200, t); f.frequency.exponentialRampToValueAtTime(3000, t + 0.9);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.2); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
        o.connect(f); f.connect(g); g.connect(sfxBus); o.start(t); o.stop(t + 1.3);
        burst(0.9, 1200, 'bandpass', 0.15);
        tone(55, 0.6, 'sine', 0.25, t + 0.85);
      })(); break;
      case 'win': [523.3, 659.3, 784, 1046.5].forEach(function (f, i) { tone(f, 0.6, 'triangle', 0.06, t + i * 0.09); }); break;
      case 'fail': tone(110, 0.35, 'square', 0.06); tone(116.5, 0.35, 'square', 0.05); break;
      case 'chapter': [45, 52, 57, 60, 64].forEach(function (m, i) { tone(mtof(m), 4, 'triangle', 0.05, t + i * 0.15, sfxBus, 0.6); }); break;
      case 'death': (function () {
        var o = ac.createOscillator(), g = ac.createGain(), f = filt('lowpass', 600);
        o.type = 'sawtooth'; o.frequency.setValueAtTime(220, t); o.frequency.exponentialRampToValueAtTime(40, t + 2.5);
        g.gain.setValueAtTime(0.15, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 3);
        o.connect(f); f.connect(g); g.connect(sfxBus); o.start(t); o.stop(t + 3.1);
      })(); break;
      case 'thunder': (function () {
        var s = ac.createBufferSource(); s.buffer = brownBuf; var f = filt('lowpass', 160), g = ac.createGain();
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.9, t + 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + 4);
        s.connect(f); f.connect(g); g.connect(bedBus); s.start(t, rnd(0, 1)); s.stop(t + 4.2);
      })(); break;
      case 'spark': for (var i = 0; i < 8; i++) burst(0.02, 5000, 'highpass', 0.05, sfxBus, t + i * 0.03); break;
      case 'ending': [33, 40, 45, 52, 57, 64].forEach(function (m, i) { tone(mtof(m), 6, 'triangle', 0.05, t + i * 0.3, sfxBus, 1.2); }); break;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
