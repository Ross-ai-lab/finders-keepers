/* Finders Keepers — the page: screens, panels, saves, discovery tracking. */
(function (G) {
  'use strict';
  var FK = G.FK, DB = FK.DB, FX = G.FX, AU = G.AU, ICONS = G.ICONS;
  var $ = function (id) { return document.getElementById(id); };
  var page, topbar, modal, mbody, mtitle;
  var S = null;           /* current game state */
  var view = 'title';     /* title | build | game */
  var build = { knack: null, habit: null };
  var modalTick = null;

  /* ------------------------------------------------------------ storage (never trusted) */
  var memStore = {};
  function store(k, v) {
    try { if (v === null) G.localStorage.removeItem(k); else G.localStorage.setItem(k, v); }
    catch (e) { if (v === null) delete memStore[k]; else memStore[k] = v; }
  }
  function load(k) {
    try { var v = G.localStorage.getItem(k); if (v !== null) return v; } catch (e) {}
    return memStore[k] !== undefined ? memStore[k] : null;
  }
  function loadJSON(k) { try { var v = load(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }

  /* ------------------------------------------------------------ discovery across runs */
  var meta = loadJSON('fk_meta') || {};
  ['s', 'c', 'e', 'd', 'ch'].forEach(function (k) { meta[k] = meta[k] || {}; });
  var metaDirty = false;
  FK.discover = function (kind, key) {
    var bucket = { s: 's', c: 'c', ending: 'e', death: 'd', chapter: 'ch' }[kind];
    if (!bucket || meta[bucket][key]) return;
    meta[bucket][key] = 1; metaDirty = true;
  };
  function flushMeta() { if (metaDirty) { store('fk_meta', JSON.stringify(meta)); metaDirty = false; } }

  /* ------------------------------------------------------------ saves */
  function snapshot(label) { return JSON.stringify({ v: 1, when: Date.now(), label: label || '', state: S }); }
  function autosave() { if (S) store('fk_auto', snapshot('Autosave')); }
  function readSave(k) { var d = loadJSON(k); return d && d.state && d.state.screen ? d : null; }
  function describeSave(d) {
    var st = d.state, L = DB.locs[st.loc], C = DB.chapters[st.ch];
    return 'Chapter ' + st.ch + (C ? ' · ' + C.title : '') + ' · ' + (L ? L.name : st.loc) + ' · ' + new Date(d.when).toLocaleString();
  }
  function loadState(k) {
    var d = readSave(k);
    if (!d) { toast('No save there.', 'heat'); return false; }
    S = d.state; view = 'game'; closeModal(); FX.setMood(''); render(); return true;
  }

  /* ------------------------------------------------------------ helpers */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function md(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>'); }
  function paras(list) { return list.map(function (p) { return '<p>' + md(p) + '</p>'; }).join(''); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
  function button(label, cls, fn) { var b = el('button', 'btn ' + (cls || ''), label); b.type = 'button'; b.addEventListener('click', fn); return b; }
  function totalEndings() { return FK.endingKeys().length; }

  function toast(text, kind) {
    var t = el('div', 'toast ' + (kind || ''), esc(text));
    $('toasts').appendChild(t);
    setTimeout(function () { t.remove(); }, 4300);
  }

  function handleNotes() {
    if (!S || !S.notes) return;
    var played = {};
    S.notes.forEach(function (n) {
      toast(n.text, n.kind);
      var snd = { remember: 'remember', clue: 'clue', item: 'item', hurt: 'hurt', heat: 'heat', dest: 'portal', skill: 'win', build: 'win', cap: 'remember' }[n.kind];
      if (snd && !played[snd]) { played[snd] = 1; AU.sfx(snd); }
      if (n.kind === 'remember') FX.flash('242,201,107', 0.18);
      if (n.kind === 'hurt') FX.flash('255,60,60', 0.25);
    });
    S.notes = [];
  }

  function act(a) {
    var before = S.loc;
    try { FK.act(S, a); } catch (e) { console.warn(e); toast('That can\'t be done right now.', 'heat'); render(); return; }
    if (S.loc !== before && (DB.locs[S.loc] || {}).scene !== (DB.locs[before] || {}).scene) {
      if (['reach', 'cinder', 'drift'].indexOf(S.loc) >= 0 || ['reach', 'cinder', 'drift'].indexOf(before) >= 0) { AU.sfx('portal'); FX.flash('141,255,122', 0.7); }
    }
    var t = S.screen.type;
    if (t === 'story' || t === 'hub') autosave();
    if (t === 'death') { AU.sfx('death'); }
    if (t === 'chapter') AU.sfx('chapter');
    if (t === 'ending') AU.sfx('ending');
    flushMeta();
    handleNotes();
    render();
    G.scrollTo({ top: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
  }

  /* ------------------------------------------------------------ atmosphere */
  function syncAtmosphere() {
    var scene = 'portal';
    if (view === 'game' && S) {
      var t = S.screen.type;
      if (t === 'chapter' || t === 'ending') scene = 'portal';
      else scene = (DB.locs[S.loc] || {}).scene || 'rain';
      FX.setHeat(S.heat); AU.setHeat(S.heat); AU.setChapter(S.ch);
      FX.setMood(t === 'death' ? 'death' : '');
    } else if (view === 'build') scene = 'rain';
    FX.set(scene); AU.scene(scene === 'portal' && view !== 'game' ? 'rain' : scene);
  }

  /* ------------------------------------------------------------ top bar */
  function renderTopbar() {
    if (view !== 'game' || !S) { topbar.hidden = true; return; }
    topbar.hidden = false;
    var C = DB.chapters[S.ch], L = DB.locs[S.loc];
    $('tb-chapter').textContent = 'Chapter ' + S.ch + ' · ' + (C ? C.title : '');
    $('tb-loc').textContent = L ? L.name : '';
    var hearts = '';
    for (var i = 0; i < S.maxhp; i++) hearts += i < S.hp ? '♥' : '<span class="empty">♥</span>';
    var st = FK.STATS.map(function (k) { return '<span class="chip" title="' + FK.cap(k) + '">' + FK.cap(k).slice(0, 3) + ' <b>' + S.stats[k] + '</b></span>'; }).join('');
    $('tb-stats').innerHTML = st +
      '<span class="chip" title="Health"><span class="hearts">' + hearts + '</span></span>' +
      '<span class="heat" title="Exposure: how close someone is to walking in">Exposure <span class="heat-bar"><span class="heat-fill" style="width:' + (S.heat * 10) + '%"></span></span></span>' +
      '<span class="chip" title="Scrap for base upgrades">Scrap <b>' + S.scrap + '</b></span>' +
      ((S.vars.chits || 0) > 0 ? '<span class="chip" title="Cinder chits">Chits <b>' + S.vars.chits + '</b></span>' : '');
    var nav = $('tb-nav'); nav.innerHTML = '';
    var items = [
      ['Bag', openInventory], ['Map', openMap], ['Base', openBase],
      ['Skills', openSkills, S.sp > 0 && FK.learnable(S).length > 0],
      ['Journal', openJournal], ['Branches', openBranches], ['Save', openSaves],
      [AU.isOn() ? 'Sound on' : 'Sound off', function () { AU.toggle(); AU.start(); renderTopbar(); }],
      ['Menu', function () { if (confirmLeave()) { view = 'title'; render(); } }]
    ];
    items.forEach(function (it) {
      var b = button(esc(it[0]), '', function () { AU.start(); AU.sfx('click'); it[1](); });
      if (it[2]) b.appendChild(el('span', 'badge-dot'));
      nav.appendChild(b);
    });
  }
  function confirmLeave() { autosave(); flushMeta(); return true; }

  /* ------------------------------------------------------------ screens */
  function render() {
    syncAtmosphere();
    renderTopbar();
    page.innerHTML = '';
    page.style.animation = 'none'; void page.offsetWidth; page.style.animation = '';
    if (view === 'title') return renderTitle();
    if (view === 'build') return renderBuild();
    switch (S.screen.type) {
      case 'story': return renderStory();
      case 'result': return renderResult();
      case 'hub': return renderHub();
      case 'chapter': return renderChapter();
      case 'death': return renderDeath();
      case 'ending': return renderEnding();
    }
  }

  function renderTitle() {
    var prog = FK.progress(meta), ends = Object.keys(meta.e).length;
    var box = el('div', 'title-screen');
    box.appendChild(el('div', 'kicker', 'A text-first Rick &amp; Morty choice RPG'));
    box.appendChild(el('div', 'logo', 'Finders Keepers'));
    box.appendChild(el('div', 'subtitle', 'An empty house. A garage that should not exist. The owner could walk back in at any moment.'));
    var acts = el('div', 'title-actions');
    if (readSave('fk_auto')) acts.appendChild(button('Continue', 'primary', function () { AU.start(); AU.sfx('click'); loadState('fk_auto'); }));
    acts.appendChild(button('New game', readSave('fk_auto') ? '' : 'primary', function () { AU.start(); AU.sfx('click'); view = 'build'; build = { knack: null, habit: null }; render(); }));
    acts.appendChild(button('Load a save', '', function () { AU.start(); openSaves(); }));
    acts.appendChild(button('Branches found', '', function () { AU.start(); openBranches(); }));
    acts.appendChild(button(AU.isOn() ? 'Sound: on' : 'Sound: off', 'ghost', function (e) { AU.start(); AU.toggle(); e.currentTarget.textContent = AU.isOn() ? 'Sound: on' : 'Sound: off'; }));
    box.appendChild(acts);
    box.appendChild(el('div', 'fineprint',
      'First playable slice: the house, the garage and three worlds through the portal, three chapters, ' + totalEndings() + ' endings.<br>' +
      'Story discovered across all your runs: <b>' + prog.pct + '%</b> · Endings found: <b>' + ends + ' / ' + totalEndings() + '</b><br>' +
      'Choices are never timed. If you die, you go back to the last save. Sound starts when you click.'));
    page.appendChild(box);
  }

  function renderBuild() {
    var C = DB.config;
    page.appendChild(el('div', 'kicker', 'Before the rain'));
    page.appendChild(el('h1', 'title', 'Hollis Grady'));
    page.appendChild(el('div', 'story', paras([
      'Forty-one. Apprentice locksmith at nineteen, long-haul driver at twenty-five, laid off at thirty-eight when the depot automated. The apartment burned the year after. Three years on the road since, sleeping in houses people forgot they owned.',
      'What kept you alive out there decides what you can see when things go wrong. Every problem in this story has several ways through. Your build shows you some of them and hides the rest.'
    ])));
    page.appendChild(el('div', 'section-label', 'Your knack'));
    var kg = el('div', 'build-grid');
    Object.keys(C.knacks).forEach(function (k) {
      var o = el('button', 'opt', '<div class="o-name">' + esc(C.knacks[k].name) + '</div><div class="o-desc">' + esc(C.knacks[k].desc) + '</div>');
      o.type = 'button'; o.setAttribute('aria-pressed', build.knack === k ? 'true' : 'false');
      o.addEventListener('click', function () { build.knack = k; AU.sfx('click'); render(); });
      kg.appendChild(o);
    });
    page.appendChild(kg);
    page.appendChild(el('div', 'section-label', 'Your road habit'));
    var hg = el('div', 'build-grid');
    Object.keys(C.habits).forEach(function (k) {
      var o = el('button', 'opt', '<div class="o-name">' + esc(C.habits[k].name) + '</div><div class="o-desc">' + esc(C.habits[k].desc) + '</div>');
      o.type = 'button'; o.setAttribute('aria-pressed', build.habit === k ? 'true' : 'false');
      o.addEventListener('click', function () { build.habit = k; AU.sfx('click'); render(); });
      hg.appendChild(o);
    });
    page.appendChild(hg);
    var row = el('div', 'row end'); row.style.marginTop = '22px';
    row.appendChild(button('Back', 'ghost', function () { view = 'title'; render(); }));
    var go = button('Walk into the rain', 'primary', function () {
      S = FK.newGame(build.knack, build.habit); view = 'game';
      S.notes = []; autosave(); flushMeta(); AU.sfx('page'); render();
    });
    go.disabled = !(build.knack && build.habit);
    row.appendChild(go);
    page.appendChild(row);
  }

  function choiceButton(sl, i, n) {
    var c = sl.choices[i], a = c.a || 'neutral';
    var b = el('button', 'choice');
    b.type = 'button';
    var tags = '';
    if (ICONS.approachName[a]) tags += '<span class="tag approach a-' + a + '">' + ICONS.approachName[a] + '</span>';
    FK.reqLabels(S, c.req).forEach(function (l) { tags += '<span class="tag req">' + esc(l) + '</span>'; });
    if (c.puzzle) tags += '<span class="tag puzzle">Puzzle</span>';
    b.innerHTML = '<span class="num">' + n + '</span><span class="ico a-' + a + '">' + ICONS.approach[a] + '</span>' +
      '<span class="body"><span class="label">' + md(c.t) + '</span>' + (tags ? '<span class="tags">' + tags + '</span>' : '') + '</span>';
    b.addEventListener('click', function () { AU.start(); AU.sfx('click'); pick(sl, i); });
    return b;
  }

  function pick(sl, i) {
    var c = sl.choices[i];
    if (!c.puzzle) return act({ type: 'choice', i: i });
    var list = page.querySelector('.choices'); if (list) list.remove();
    var hn = page.querySelector('.hidden-note'); if (hn) hn.remove();
    G.PUZZLES.open(c.puzzle, page, function (ok) { act({ type: 'choice', i: i, win: ok }); });
  }

  function renderStory() {
    var sl = DB.storylets[S.screen.sid], L = DB.locs[S.loc];
    page.appendChild(el('div', 'kicker', esc(L ? L.name : '')));
    page.appendChild(el('h1', 'title', esc(sl.title)));
    page.appendChild(el('div', 'story', paras(FK.paragraphs(S, sl.text))));
    var vis = FK.visibleChoices(S, sl);
    var list = el('div', 'choices');
    vis.idx.forEach(function (i, n) { list.appendChild(choiceButton(sl, i, n + 1)); });
    page.appendChild(list);
    if (vis.hidden > 0) page.appendChild(el('div', 'hidden-note', vis.hidden + (vis.hidden === 1 ? ' other approach is' : ' other approaches are') + ' hidden from your build.'));
  }

  function renderResult() {
    page.appendChild(el('div', 'kicker', 'What happened'));
    page.appendChild(el('div', 'story result-text', paras(String(S.screen.text).split('\n\n'))));
    var row = el('div', 'row end');
    row.appendChild(button('Continue <span class="num">↵</span>', 'primary', function () { AU.sfx('page'); act({ type: 'continue' }); }));
    page.appendChild(row);
  }

  function renderHub() {
    var L = DB.locs[S.loc];
    page.appendChild(el('div', 'kicker', 'Chapter ' + S.ch + ' · ' + esc(DB.chapters[S.ch].title)));
    page.appendChild(el('h1', 'title', esc(L.name)));
    page.appendChild(el('div', 'hub-text', paras(FK.paragraphs(S, L.text))));
    var cards = FK.hubCards(S);
    page.appendChild(el('div', 'section-label', cards.length ? 'What now' : 'Nothing here needs you right now'));
    var grid = el('div', 'cards');
    cards.forEach(function (id, n) {
      var sl = DB.storylets[id];
      var c = el('button', 'card' + (sl.once ? '' : ' repeat'), '<div class="c-title">' + esc(sl.title) + '</div><div class="c-teaser">' + esc(sl.teaser || '') + '</div>');
      c.type = 'button';
      c.dataset.n = n + 1;
      c.addEventListener('click', function () { AU.start(); AU.sfx('page'); act({ type: 'card', sid: id }); });
      grid.appendChild(c);
    });
    page.appendChild(grid);
    var travel = FK.travelOptions(S), wait = L.wait && FK.test(S, L.wait.req);
    if (travel.length || wait) {
      page.appendChild(el('div', 'section-label', 'Go'));
      var tr = el('div', 'travel');
      travel.forEach(function (t) { tr.appendChild(button(esc(t.label), t.to === 'garage' || t.to === 'house' ? '' : 'primary', function () { AU.start(); AU.sfx('click'); act({ type: 'travel', to: t.to }); })); });
      if (wait) tr.appendChild(button('Lie low for a while', 'ghost', function () { AU.sfx('click'); act({ type: 'wait' }); }));
      page.appendChild(tr);
    }
    if (S.sp > 0 && FK.learnable(S).length) {
      var n1 = el('div', 'notice'); n1.appendChild(document.createTextNode('You have ' + S.sp + ' skill point' + (S.sp > 1 ? 's' : '') + ' to spend. '));
      n1.appendChild(button('Open skills', '', openSkills)); page.appendChild(n1);
    }
    if (FK.buildable(S).length) {
      var n2 = el('div', 'notice'); n2.appendChild(document.createTextNode('You have enough scrap to build something. '));
      n2.appendChild(button('Open base', '', openBase)); page.appendChild(n2);
    }
  }

  function renderChapter() {
    var C = DB.chapters[S.screen.ch];
    page.appendChild(el('div', 'kicker', 'End of chapter ' + S.screen.ch));
    page.appendChild(el('h1', 'title', esc(C.title)));
    var lines = (C.summary || []).filter(function (p) { return FK.test(S, p.if); }).map(function (p) { return p.t; });
    if (lines.length) page.appendChild(el('ul', 'summary-list', lines.map(function (l) { return '<li>' + md(l) + '</li>'; }).join('')));
    flowSection(S.screen.ch);
    var row = el('div', 'row end'); row.style.marginTop = '16px';
    row.appendChild(button('Begin chapter ' + (S.screen.ch + 1) + ': ' + esc(DB.chapters[S.screen.ch + 1].title), 'primary', function () { act({ type: 'continue' }); }));
    page.appendChild(row);
  }

  function flowSection(ch) {
    var f = G.FLOW.build(ch, meta), all = FK.progress(meta);
    var head = el('div', 'flow-head');
    head.innerHTML = '<div><div class="section-label" style="margin:0 0 6px">Branches you have found in chapter ' + ch + '</div>' +
      '<div class="pct">' + f.pct + '%<small>of this chapter</small></div></div>' +
      '<div style="text-align:right"><div class="pct" style="font-size:24px">' + all.pct + '%<small>of the whole story discovered</small></div>' +
      '<div class="fineprint" style="margin-top:4px">Unfound branches show as ???</div></div>';
    page.appendChild(head);
    var box = el('div', 'flowbox', f.svg);
    page.appendChild(box);
  }

  function renderDeath() {
    page.classList.add('death');
    page.appendChild(el('div', 'kicker', 'Dead'));
    page.appendChild(el('h1', 'title', 'This is where it ends. Not really.'));
    page.appendChild(el('div', 'story', paras(String(S.screen.text || DB.deaths.default).split('\n\n'))));
    page.appendChild(el('div', 'fineprint', 'Death sends you back to the last save: the start of the scene you died in.'));
    var row = el('div', 'row end'); row.style.marginTop = '16px';
    row.appendChild(button('Title screen', 'ghost', function () { page.classList.remove('death'); view = 'title'; render(); }));
    row.appendChild(button('Load last save', 'primary', function () { page.classList.remove('death'); loadState('fk_auto'); }));
    page.appendChild(row);
  }

  function renderEnding() {
    var e = FK.ending(S), ends = Object.keys(meta.e).length;
    page.appendChild(el('div', 'kicker', e.exit ? 'An ending' : 'End of the slice'));
    page.appendChild(el('div', 'ending-title', esc(e.title)));
    page.appendChild(el('div', 'story', paras(e.paragraphs)));
    page.appendChild(el('div', 'notice ending-note', 'Endings found across all runs: ' + ends + ' / ' + totalEndings() + '. ' +
      (e.exit ? 'This was one of the early exits.' : 'This ending was assembled from four parts: how the night went, who you became, the gun and the house. Change any one and the ending changes.')));
    flowSection(S.ch);
    var row = el('div', 'row end'); row.style.marginTop = '16px';
    row.appendChild(button('All branches', '', openBranches));
    row.appendChild(button('Title screen', '', function () { store('fk_auto', null); view = 'title'; render(); }));
    row.appendChild(button('New run', 'primary', function () { store('fk_auto', null); view = 'build'; build = { knack: null, habit: null }; render(); }));
    page.appendChild(row);
  }

  /* ------------------------------------------------------------ modal panels */
  function openModal(title, fill) {
    stopModalTick();
    mtitle.textContent = title; mbody.innerHTML = '';
    fill(mbody);
    modal.hidden = false;
    $('modal-close').focus();
  }
  function closeModal() { modal.hidden = true; stopModalTick(); }
  function stopModalTick() { if (modalTick) { cancelAnimationFrame(modalTick); modalTick = null; } }
  function needGame(body) { if (!S || view !== 'game') { body.appendChild(el('p', 'fineprint', 'Start or load a game first.')); return true; } return false; }

  function openInventory() {
    openModal('Bag', function (body) {
      if (needGame(body)) return;
      var wrap = el('div', 'inv'), grid = el('div', 'grid'), detail = el('div', 'detail', '<p class="fineprint" style="margin:0">Pick something up to look at it.</p>');
      var size = DB.config.gridSize || 20;
      for (var i = 0; i < size; i++) {
        (function (id) {
          var slot = el('div', 'slot' + (id ? ' filled' : ''));
          if (id) {
            var it = DB.items[id] || { name: id, cat: 'oddity' };
            slot.innerHTML = '<span style="color:' + (ICONS.catColor[it.cat] || '#ccc') + '">' + (ICONS.cat[it.cat] || ICONS.cat.oddity) + '</span><span class="s-name">' + esc(it.name) + '</span>';
            slot.tabIndex = 0; slot.setAttribute('role', 'button'); slot.setAttribute('aria-label', it.name);
            var show = function () {
              grid.querySelectorAll('.slot').forEach(function (s) { s.classList.remove('sel'); });
              slot.classList.add('sel');
              detail.innerHTML = '<h3>' + esc(it.name) + '</h3><div>' + md(it.desc || '') + '</div>' + (it.read ? '<div class="read">' + md(it.read) + '</div>' : '');
            };
            slot.addEventListener('click', show);
            slot.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); } });
          }
          grid.appendChild(slot);
        })(S.items[i]);
      }
      var left = el('div'); left.appendChild(grid);
      left.appendChild(el('div', 'money', 'Scrap: <b>' + S.scrap + '</b> · Cinder chits: <b>' + (S.vars.chits || 0) + '</b> · Skill points: <b>' + S.sp + '</b>' +
        (S.stash.length ? ' · In the garage stash: ' + S.stash.map(function (i) { return esc((DB.items[i] || {}).name || i); }).join(', ') : '')));
      wrap.appendChild(left); wrap.appendChild(detail);
      body.appendChild(wrap);
    });
  }

  function openMap() {
    openModal('Portal map', function (body) {
      if (needGame(body)) return;
      var wrap = el('div', 'mapwrap'), cv = el('canvas'); cv.id = 'mapcanvas';
      wrap.appendChild(cv); body.appendChild(wrap);
      var legend = el('div', 'map-legend'); body.appendChild(legend);
      var dpr = Math.min(G.devicePixelRatio || 1, 2), ctx = cv.getContext('2d'), W, H, nodes = [];
      function size() { var r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
      size();
      var home = { x: 0.5, y: 0.42 };
      var canTravel = S.screen.type === 'hub' && S.loc === 'garage';
      var opts = FK.travelOptions(S);
      function draw(t) {
        t /= 1000;
        var rect = cv.getBoundingClientRect();
        if (Math.round(rect.width * dpr) !== cv.width || !W) size();
        ctx.fillStyle = '#04060a'; ctx.fillRect(0, 0, W, H);
        for (var i = 0; i < 90; i++) { var sx = (i * 97.13 % 1) * W, sy = (i * 61.7 % 1) * H; ctx.fillStyle = 'rgba(200,255,210,' + (0.15 + 0.15 * Math.sin(t + i)) + ')'; ctx.fillRect(sx, sy, 1.2, 1.2); }
        nodes = [];
        var hx = home.x * W, hy = home.y * H;
        Object.keys(DB.dests).forEach(function (id) {
          var d = DB.dests[id], x = d.x * W, y = d.y * H, open = !!S.dests[id], here = S.loc === d.loc;
          ctx.setLineDash(open ? [] : [4, 6]);
          ctx.strokeStyle = open ? 'rgba(141,255,122,' + (0.35 + 0.2 * Math.sin(t * 2)) + ')' : 'rgba(120,130,140,0.25)';
          ctx.lineWidth = open ? 2 : 1;
          ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo((hx + x) / 2, Math.min(hy, y) - 40, x, y); ctx.stroke();
          ctx.setLineDash([]); ctx.lineWidth = 1;
          var r = 20 + (here ? 4 * Math.sin(t * 4) : 0);
          var g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.6);
          g.addColorStop(0, open ? d.color : '#2a2f36'); g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.6, 0, Math.PI * 2); ctx.fill();
          for (var k = 0; k < 3; k++) {
            ctx.strokeStyle = open ? d.color : '#3a3f48'; ctx.globalAlpha = 0.5;
            var a0 = t * (1 + k * 0.4) + k * 2;
            ctx.beginPath(); ctx.ellipse(x, y, r - k * 4, (r - k * 4) * 0.9, 0, a0, a0 + 4); ctx.stroke(); ctx.globalAlpha = 1;
          }
          ctx.fillStyle = open ? '#e9e4d8' : '#5d616a'; ctx.font = '600 14px system-ui, sans-serif'; ctx.textAlign = 'center';
          ctx.fillText(open ? d.name : '???', x, y + r + 26);
          ctx.font = '12px system-ui, sans-serif'; ctx.fillStyle = '#8dff7a';
          if (S.flags['settled_' + id]) ctx.fillText('settled', x, y + r + 42);
          if (here) { ctx.fillStyle = '#ffd36b'; ctx.fillText('you are here', x, y - r - 12); }
          nodes.push({ id: id, x: x, y: y, r: r * 1.6, open: open });
        });
        // home
        ctx.fillStyle = '#0b0f14'; ctx.strokeStyle = 'rgba(255,200,130,0.7)';
        ctx.beginPath(); ctx.moveTo(hx - 26, hy + 14); ctx.lineTo(hx - 26, hy - 6); ctx.lineTo(hx, hy - 26); ctx.lineTo(hx + 26, hy - 6); ctx.lineTo(hx + 26, hy + 14); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,200,120,' + (0.6 + 0.2 * Math.sin(t * 1.3)) + ')'; ctx.fillRect(hx - 6, hy - 2, 12, 10);
        ctx.fillStyle = '#e9e4d8'; ctx.font = '600 14px system-ui, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('Lindell Court', hx, hy + 34);
        ctx.font = '12px system-ui, sans-serif'; ctx.fillStyle = '#a8a395';
        ctx.fillText(S.flags.garage_open ? 'house + garage' : 'house (garage sealed)', hx, hy + 50);
        if (S.loc === 'house' || S.loc === 'garage' || S.loc === 'street') { ctx.fillStyle = '#ffd36b'; ctx.fillText('you are here', hx, hy - 36); }
        modalTick = requestAnimationFrame(draw);
      }
      modalTick = requestAnimationFrame(draw);
      legend.innerHTML = !S.flags.gun_ready ? 'The portal gun is not working yet. Fix it in the garage to travel.' :
        S.ch !== 2 ? 'The portal is quiet. There is nowhere to go right now.' :
        canTravel ? 'Click a lit destination to open a portal to it.' : 'Portals open from the garage. Go there first.';
      cv.addEventListener('click', function (e) {
        var r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        nodes.forEach(function (n) {
          if (Math.hypot(n.x - x, n.y - y) > n.r) return;
          var opt = opts.filter(function (o) { return o.to === DB.dests[n.id].loc; })[0];
          if (canTravel && opt) { closeModal(); act({ type: 'travel', to: opt.to }); }
          else toast(n.open ? (canTravel ? 'You can\'t get there right now.' : 'Go to the garage to open a portal.') : 'Coordinates unknown.', 'heat');
        });
      });
    });
  }

  function openBase() {
    openModal('Home base: the garage', function (body) {
      if (needGame(body)) return;
      var atBase = S.screen.type === 'hub' && DB.locs[S.loc] && DB.locs[S.loc].base;
      var cv = el('canvas', 'base-art'); body.appendChild(cv);
      requestAnimationFrame(function () { drawBase(cv); });
      body.appendChild(el('p', 'fineprint', (S.flags.garage_open ? (atBase ? 'You are in the garage. Spend scrap to build.' : 'Upgrades are built in the garage, between scenes.') : 'The garage is still sealed.') + ' Scrap: <b>' + S.scrap + '</b>'));
      var list = el('div', 'base-list');
      Object.keys(DB.upgrades).forEach(function (id) {
        var u = DB.upgrades[id], on = !!S.upgrades[id], can = atBase && FK.buildable(S).indexOf(id) >= 0;
        var box = el('div', 'up' + (on ? ' on' : ''), '<h4>' + esc(u.name) + '</h4><p>' + esc(u.desc) + '</p>');
        if (on) box.appendChild(el('div', 'tag puzzle', 'Built'));
        else {
          var reqOk = FK.test(S, u.req);
          var b = button('Build · ' + u.cost + ' scrap', 'primary', function () { act({ type: 'build', id: id }); openBase(); });
          b.disabled = !can;
          box.appendChild(b);
          if (!reqOk) box.appendChild(el('p', 'fineprint', 'Needs: ' + esc(FK.reqLabels(Object.assign({}, S, { items: Object.keys(DB.items), skills: allOn(DB.skills), stats: { muscle: 9, brains: 9, mouth: 9, sneak: 9 }, upgrades: allOn(DB.upgrades) }), u.req).join(' or ') || 'something you haven\'t found yet')));
        }
        list.appendChild(box);
      });
      body.appendChild(list);
    });
  }
  function allOn(o) { var r = {}; Object.keys(o).forEach(function (k) { r[k] = 1; }); return r; }

  function drawBase(cv) {
    var dpr = Math.min(G.devicePixelRatio || 1, 2), r = cv.getBoundingClientRect(), W = r.width, H = r.height, ctx = cv.getContext('2d');
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#0b0d12'; ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.strokeRect(10.5, 10.5, W - 21, H - 21);
    var mods = [['bench', 'BENCH'], ['bunk', 'BUNK'], ['cell', 'CELL'], ['calib', 'CALIBRATOR'], ['grid', 'GRID'], ['damper', 'DAMPER']];
    var cw = (W - 40) / mods.length;
    mods.forEach(function (m, i) {
      var on = !!S.upgrades[m[0]], x = 20 + i * cw, y = 30, w = cw - 10, h = H - 60;
      ctx.fillStyle = on ? 'rgba(141,255,122,0.12)' : 'rgba(255,255,255,0.03)';
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = on ? 'rgba(141,255,122,0.7)' : 'rgba(255,255,255,0.12)';
      ctx.setLineDash(on ? [] : [4, 4]); ctx.strokeRect(x + 0.5, y + 0.5, w, h); ctx.setLineDash([]);
      ctx.fillStyle = on ? '#bfffb0' : '#555a63'; ctx.font = '600 10px system-ui, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(m[1], x + w / 2, y + h / 2 + 4);
    });
    ctx.fillStyle = '#a8a395'; ctx.font = '11px system-ui, sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('GARAGE · ' + Object.keys(S.upgrades).length + ' / ' + mods.length + ' built', 16, 24);
  }

  function openSkills() {
    openModal('Skills', function (body) {
      if (needGame(body)) return;
      body.appendChild(el('p', 'fineprint', 'Skill points: <b>' + S.sp + '</b>. You earn them at milestones. You will never have enough for everything.'));
      var tree = el('div', 'tree'), names = { science: 'Rick\'s science', force: 'Force', talk: 'Street talk', shadow: 'Shadow' };
      ['science', 'force', 'talk', 'shadow'].forEach(function (br) {
        var col = el('div', 'branch'); col.appendChild(el('h4', '', names[br]));
        Object.keys(DB.skills).filter(function (id) { return DB.skills[id].branch === br; })
          .sort(function (a, b) { return DB.skills[a].tier - DB.skills[b].tier; })
          .forEach(function (id) {
            var k = DB.skills[id], on = !!S.skills[id], can = FK.learnable(S).indexOf(id) >= 0;
            var box = el('div', 'sk' + (on ? ' on' : can ? ' can' : ''), '<div class="sk-name">' + esc(k.name) + '</div><div class="sk-desc">' + esc(k.desc) + '</div>');
            if (can) box.appendChild(button('Learn', 'primary', function () { act({ type: 'learn', id: id }); openSkills(); }));
            col.appendChild(box);
          });
        tree.appendChild(col);
      });
      body.appendChild(tree);
    });
  }

  function openJournal() {
    openModal('Journal', function (body) {
      if (needGame(body)) return;
      var cols = el('div', 'cols'), left = el('div'), right = el('div');
      var M = DB.config.mystery, clues = M.clues.filter(function (c) { return S.flags[c]; }).length;
      var lvl = FK.mystery(S);
      left.appendChild(el('div', 'section-label', 'The mystery'));
      left.appendChild(el('p', 'mem', 'Pieces of the puzzle found: <b>' + clues + ' / ' + M.clues.length + '</b>. ' +
        (lvl === 2 ? 'You think you know what happened to the family.' : lvl === 1 ? 'You have a theory. It is a bad one.' : 'You don\'t know what is going on in this house.')));
      left.appendChild(el('div', 'section-label', 'Notes'));
      left.appendChild(el('ul', 'list', S.journal.length ? S.journal.map(function (j) { return '<li class="mem">' + md(j) + '</li>'; }).join('') : '<li class="fineprint">Nothing written down yet.</li>'));
      left.appendChild(el('div', 'section-label', 'How you deal with things'));
      var tl = FK.APPROACHES.map(function (a) { return [a, S.tally[a] || 0]; }), mx = Math.max.apply(null, tl.map(function (x) { return x[1]; }).concat([1]));
      left.appendChild(el('ul', 'list', tl.map(function (x) {
        return '<li><span class="a-' + x[0] + '">' + ICONS.approachName[x[0]] + '</span><span class="rep-bar" style="width:120px"><i style="left:0;width:' + (100 * x[1] / mx) + '%;background:currentColor" class="a-' + x[0] + '"></i></span> ' + x[1] + '</li>';
      }).join('')));
      right.appendChild(el('div', 'section-label', 'People who remember you'));
      var reps = Object.keys(S.rep).filter(function (k) { return S.rep[k] !== 0; });
      right.appendChild(el('ul', 'list', reps.length ? reps.map(function (k) {
        var v = S.rep[k], word = v >= 3 ? 'trusts you' : v >= 1 ? 'warm to you' : v <= -3 ? 'hates you' : 'wary of you';
        var bar = '<span class="rep-bar"><i style="' + (v >= 0 ? 'left:50%;width:' + v * 10 + '%' : 'left:' + (50 + v * 10) + '%;width:' + (-v * 10) + '%;background:var(--danger)') + '"></i></span>';
        return '<li class="mem">' + esc(DB.reps[k] ? DB.reps[k].name : k) + ' · <span style="color:var(--text-dim)">' + word + '</span> ' + bar + '</li>';
      }).join('') : '<li class="fineprint">Nobody yet.</li>'));
      var caps = Object.keys(S.captives), dead = Object.keys(S.dead);
      if (caps.length) { right.appendChild(el('div', 'section-label', 'Your prisoners')); right.appendChild(el('ul', 'list', caps.map(function (k) { return '<li class="mem">' + esc(DB.reps[k] ? DB.reps[k].name : k) + '</li>'; }).join(''))); }
      if (dead.length) { right.appendChild(el('div', 'section-label', 'The dead')); right.appendChild(el('ul', 'list', dead.map(function (k) { return '<li class="mem">' + esc(DB.reps[k] ? DB.reps[k].name : k) + '</li>'; }).join(''))); }
      right.appendChild(el('div', 'section-label', 'Hollis'));
      right.appendChild(el('ul', 'list', '<li>Knack: ' + esc(DB.config.knacks[S.build.knack].name) + ' · Habit: ' + esc(DB.config.habits[S.build.habit].name) + '</li>' +
        '<li>' + FK.STATS.map(function (k) { return FK.cap(k) + ' ' + S.stats[k]; }).join(' · ') + '</li><li>Health ' + S.hp + ' / ' + S.maxhp + ' · Exposure ' + S.heat + ' / 10</li>'));
      cols.appendChild(left); cols.appendChild(right); body.appendChild(cols);
    });
  }

  function openBranches(startCh) {
    openModal('Branches found', function (body) {
      var ch = startCh || (S ? Math.min(S.ch, 3) : 1);
      var tabs = el('div', 'tabs');
      [1, 2, 3].forEach(function (n) {
        var b = button('Chapter ' + n + ': ' + esc(DB.chapters[n].title), '', function () { openBranches(n); });
        b.setAttribute('aria-pressed', n === ch ? 'true' : 'false'); tabs.appendChild(b);
      });
      body.appendChild(tabs);
      var f = G.FLOW.build(ch, meta), all = FK.progress(meta);
      var head = el('div', 'flow-head');
      head.style.marginTop = '12px';
      head.innerHTML = '<div class="pct">' + f.pct + '%<small>of chapter ' + ch + '</small></div><div class="pct" style="font-size:24px">' + all.pct + '%<small>of the whole story</small></div>';
      body.appendChild(head);
      body.appendChild(el('div', 'flowbox', f.svg));
      var keys = FK.endingKeys(), got = keys.filter(function (k) { return meta.e[k]; });
      body.appendChild(el('div', 'section-label', 'Endings found: ' + got.length + ' / ' + keys.length));
      var E = DB.ending, names = got.map(function (k) {
        var p = k.split('/');
        if (p[0] === 'exit') return E.exits[p[1]].title;
        return E.identities[p[0]].title + ' — ' + E.climaxes[p[3]].title + ', ' + E.guns[p[1]].title + ', ' + E.houses[p[2]].title;
      });
      body.appendChild(el('div', 'endlist', names.map(function (n) { return '<div class="found">' + esc(n) + '</div>'; }).join('') +
        '<div>??? × ' + (keys.length - got.length) + '</div>'));
    });
  }

  function openSaves() {
    openModal('Saves', function (body) {
      var wrap = el('div', 'saves');
      [['fk_auto', 'Autosave'], ['fk_slot_1', 'Slot 1'], ['fk_slot_2', 'Slot 2'], ['fk_slot_3', 'Slot 3']].forEach(function (s) {
        var d = readSave(s[0]), row = el('div', 'save-row');
        row.appendChild(el('div', '', '<b>' + s[1] + '</b><div class="meta">' + (d ? esc(describeSave(d)) : 'Empty') + '</div>'));
        var btns = el('div', 'row');
        if (s[0] !== 'fk_auto' && S && view === 'game' && S.screen.type !== 'death' && S.screen.type !== 'ending') {
          btns.appendChild(button('Save here', '', function () { store(s[0], snapshot(s[1])); toast('Saved to ' + s[1] + '.'); openSaves(); }));
        }
        if (d) btns.appendChild(button('Load', 'primary', function () { loadState(s[0]); }));
        if (d && s[0] !== 'fk_auto') btns.appendChild(button('Delete', 'danger', function () { store(s[0], null); openSaves(); }));
        row.appendChild(btns); wrap.appendChild(row);
      });
      body.appendChild(wrap);
      body.appendChild(el('p', 'fineprint', 'The game autosaves at the start of every scene. Saves live in this browser only.'));
    });
  }

  /* ------------------------------------------------------------ keyboard */
  function onKey(e) {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
    if (!modal.hidden) { if (e.key === 'Escape') closeModal(); return; }
    if (view !== 'game' || !S) return;
    var t = S.screen.type;
    if ((t === 'result') && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); act({ type: 'continue' }); return; }
    if (/^[1-9]$/.test(e.key)) {
      var n = +e.key;
      if (t === 'story') { var c = page.querySelectorAll('.choices .choice')[n - 1]; if (c) c.click(); }
      if (t === 'hub') { var k = page.querySelectorAll('.cards .card')[n - 1]; if (k) k.click(); }
    }
  }

  /* ------------------------------------------------------------ boot */
  G.addEventListener('DOMContentLoaded', function () {
    page = $('page'); topbar = $('topbar'); modal = $('modal'); mbody = $('modal-body'); mtitle = $('modal-title');
    $('modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', onKey);
    FX.init($('bg'));
    FX.onThunder = function () { AU.sfx('thunder'); };
    FX.onSpark = function () { AU.sfx('spark'); };
    document.addEventListener('pointerdown', function once() { AU.start(); document.removeEventListener('pointerdown', once); });
    G.addEventListener('beforeunload', flushMeta);
    render();
  });

  /* test hook for the headless check */
  G.FKUI = { state: function () { return S; }, meta: function () { return meta; }, act: function (a) { act(a); }, render: render, loadState: loadState };
})(typeof window !== 'undefined' ? window : globalThis);
