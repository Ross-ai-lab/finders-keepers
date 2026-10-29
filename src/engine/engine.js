/* Finders Keepers — storylet engine.
 *
 * Pure logic, no DOM: the page and the Node route checker both drive it.
 * Content registers itself through FK.S / FK.item / FK.skill / ... and is plain
 * data (requirement and effect strings), so the checker can read every gate.
 *
 * Requirements are small boolean expressions:  "muscle>=3 & (item:crowbar | skill:brawler) & !alarm"
 * Effects are short op strings:                 ["+flag", "-flag", "heat+2", "give:crowbar", "rep:dolores-1"]
 */
(function (G) {
  'use strict';
  var FK = G.FK = G.FK || {};

  var DB = FK.DB = {
    storylets: {}, order: [], items: {}, skills: {}, upgrades: {}, reps: {},
    dests: {}, locs: {}, chapters: {}, ending: null, config: {}, deaths: {}
  };

  /* ------------------------------------------------------------ registration */

  FK.S = function (s) {
    if (DB.storylets[s.id]) throw new Error('duplicate storylet ' + s.id);
    if (s.once === undefined) s.once = true;
    s.choices = s.choices || [];
    DB.storylets[s.id] = s;
    DB.order.push(s.id);
    return s;
  };
  FK.item = function (id, d) { d.id = id; DB.items[id] = d; };
  FK.skill = function (id, d) { d.id = id; DB.skills[id] = d; };
  FK.upgrade = function (id, d) { d.id = id; DB.upgrades[id] = d; };
  FK.rep = function (id, d) { d.id = id; DB.reps[id] = d; };
  FK.dest = function (id, d) { d.id = id; DB.dests[id] = d; };
  FK.loc = function (id, d) { d.id = id; DB.locs[id] = d; };
  FK.chapter = function (n, d) { d.n = n; DB.chapters[n] = d; };
  FK.death = function (id, text) { DB.deaths[id] = text; };
  FK.config = function (c) { for (var k in c) DB.config[k] = c[k]; };
  FK.endings = function (e) { DB.ending = e; };

  /* Serialise / restore the whole content database (the build ships it encoded). */
  FK.exportDB = function () { return JSON.stringify(DB); };
  FK.importDB = function (json) {
    var d = typeof json === 'string' ? JSON.parse(json) : json;
    for (var k in d) DB[k] = d[k];
  };

  FK.STATS = ['muscle', 'brains', 'mouth', 'sneak'];
  FK.APPROACHES = ['force', 'science', 'gadget', 'talk', 'sneak', 'flee', 'betray'];

  /* ------------------------------------------------------------ requirements */

  var parseCache = {};

  function tokenize(src) {
    var out = [], re = /\s*(\(|\)|&|\||!|[^\s()&|!]+)/g, m;
    while ((m = re.exec(src))) out.push(m[1]);
    return out;
  }

  FK.parseReq = function (src) {
    if (src === undefined || src === null || src === '') return null;
    if (parseCache[src]) return parseCache[src];
    var toks = tokenize(src), i = 0;
    function peek() { return toks[i]; }
    function or() {
      var n = and();
      while (peek() === '|') { i++; n = { op: 'or', a: n, b: and() }; }
      return n;
    }
    function and() {
      var n = not();
      while (peek() === '&') { i++; n = { op: 'and', a: n, b: not() }; }
      return n;
    }
    function not() {
      var t = peek();
      if (t === '!') { i++; return { op: 'not', a: not() }; }
      if (t === '(') {
        i++; var n = or();
        if (toks[i] !== ')') throw new Error('missing ) in requirement: ' + src);
        i++; return n;
      }
      i++;
      return atom(t);
    }
    function atom(t) {
      if (!t) throw new Error('bad requirement: ' + src);
      var m = /^(\w+):([\w.]+)(>=|<=|==|!=|>|<|=)(-?\d+|\w+)$/.exec(t);
      if (m) {
        if (m[1] === 'axis') return { op: 'axis', k: m[2], v: m[4] };
        return { op: 'cmp', kind: m[1], k: m[2], c: m[3] === '=' ? '==' : m[3], v: +m[4] };
      }
      m = /^(\w+)(>=|<=|==|!=|>|<)(-?\d+)$/.exec(t);
      if (m) return { op: 'cmp', kind: 'var', k: m[1], c: m[2], v: +m[3] };
      m = /^(\w+):([\w.]+)$/.exec(t);
      if (m) return { op: 'has', kind: m[1], k: m[2] };
      m = /^\w+$/.exec(t);
      if (m) return { op: 'flag', k: t };
      throw new Error('bad requirement atom "' + t + '" in: ' + src);
    }
    var tree = or();
    if (i !== toks.length) throw new Error('trailing tokens in requirement: ' + src);
    parseCache[src] = tree;
    return tree;
  };

  function cmp(a, c, b) {
    switch (c) {
      case '>=': return a >= b; case '<=': return a <= b; case '>': return a > b;
      case '<': return a < b; case '==': return a === b; case '!=': return a !== b;
    }
    return false;
  }

  FK.num = function (s, k) {
    if (FK.STATS.indexOf(k) >= 0) return s.stats[k];
    switch (k) {
      case 'mystery': return FK.mystery(s);
      case 'clues': return Object.keys(s.flags).filter(function (f) { return f.indexOf('clue_') === 0 && s.flags[f]; }).length;
      case 'captives': return Object.keys(s.captives).length;
      case 'kills': return Object.keys(s.dead).length;
      case 'settled': return Object.keys(s.flags).filter(function (f) { return f.indexOf('settled_') === 0 && s.flags[f]; }).length;
      case 'items': return s.items.length;
      case 'upgrades': return Object.keys(s.upgrades).length;
    }
    if (k in s.vars) return s.vars[k];
    if (typeof s[k] === 'number') return s[k];
    return 0;
  };

  function evalNode(s, n) {
    switch (n.op) {
      case 'or': return evalNode(s, n.a) || evalNode(s, n.b);
      case 'and': return evalNode(s, n.a) && evalNode(s, n.b);
      case 'not': return !evalNode(s, n.a);
      case 'flag': return !!s.flags[n.k];
      case 'axis': return s.axes[n.k] === n.v;
      case 'cmp':
        if (n.kind === 'var') return cmp(FK.num(s, n.k), n.c, n.v);
        if (n.kind === 'rep') return cmp(s.rep[n.k] || 0, n.c, n.v);
        if (n.kind === 'tally') return cmp(s.tally[n.k] || 0, n.c, n.v);
        if (n.kind === 'seen') return cmp(s.seen[n.k] || 0, n.c, n.v);
        throw new Error('unknown comparison kind ' + n.kind);
      case 'has':
        switch (n.kind) {
          case 'item': return s.items.indexOf(n.k) >= 0;
          case 'skill': return !!s.skills[n.k];
          case 'up': return !!s.upgrades[n.k];
          case 'seen': return !!s.seen[n.k];
          case 'cap': return !!s.captives[n.k];
          case 'dead': return !!s.dead[n.k];
          case 'dest': return !!s.dests[n.k];
          case 'loc': return s.loc === n.k;
          case 'knack': return s.build.knack === n.k;
          case 'habit': return s.build.habit === n.k;
          case 'identity': return FK.identity(s) === n.k;
        }
        throw new Error('unknown requirement kind ' + n.kind);
    }
    throw new Error('bad node');
  }

  FK.test = function (s, src) {
    var t = FK.parseReq(src);
    return t ? evalNode(s, t) : true;
  };

  /* Atoms that describe the player's build, so a hidden choice can be counted
   * as "hidden by your build" and a visible one can show what unlocked it. */
  function buildAtoms(n, neg, out) {
    if (!n) return out;
    if (n.op === 'not') return buildAtoms(n.a, !neg, out);
    if (n.op === 'and' || n.op === 'or') { buildAtoms(n.a, neg, out); buildAtoms(n.b, neg, out); return out; }
    if (neg) return out;
    if (n.op === 'cmp' && n.kind === 'var' && FK.STATS.indexOf(n.k) >= 0 && (n.c === '>=' || n.c === '>')) out.push(n);
    else if (n.op === 'has' && (n.kind === 'item' || n.kind === 'skill' || n.kind === 'up' || n.kind === 'cap' || n.kind === 'knack' || n.kind === 'habit')) out.push(n);
    return out;
  }
  FK.isBuildGated = function (src) { return buildAtoms(FK.parseReq(src), false, []).length > 0; };

  FK.reqLabels = function (s, src) {
    var atoms = buildAtoms(FK.parseReq(src), false, []), out = [];
    atoms.forEach(function (n) {
      if (!evalNode(s, n)) return;
      var l;
      if (n.op === 'cmp') l = cap(n.k) + ' ' + (n.c === '>' ? n.v + 1 : n.v);
      else if (n.kind === 'item') l = DB.items[n.k] ? DB.items[n.k].name : n.k;
      else if (n.kind === 'skill') l = DB.skills[n.k] ? DB.skills[n.k].name : n.k;
      else if (n.kind === 'up') l = DB.upgrades[n.k] ? DB.upgrades[n.k].name : n.k;
      else if (n.kind === 'cap') l = 'Captive: ' + (DB.reps[n.k] ? DB.reps[n.k].name : n.k);
      else if (n.kind === 'knack' || n.kind === 'habit') l = cap(n.k);
      if (l && out.indexOf(l) < 0) out.push(l);
    });
    return out;
  };

  function cap(w) { return w.charAt(0).toUpperCase() + w.slice(1); }
  FK.cap = cap;

  /* ------------------------------------------------------------ state */

  FK.newGame = function (knack, habit) {
    var C = DB.config;
    var s = {
      v: 1, ch: 1, loc: C.startLoc || 'house', turn: 0,
      stats: { muscle: 1, brains: 1, mouth: 1, sneak: 1 },
      hp: 3, maxhp: 3, heat: 0, scrap: 0, sp: 1,
      flags: {}, vars: {}, items: [], stash: [], skills: {}, upgrades: {}, rep: {},
      tally: {}, captives: {}, dead: {}, dests: {}, seen: {}, axes: {},
      journal: [], build: { knack: knack, habit: habit }, notes: [], screen: null,
      chapterLog: {}
    };
    FK.APPROACHES.forEach(function (a) { s.tally[a] = 0; });
    var k = C.knacks[knack], h = C.habits[habit];
    if (!k || !h) throw new Error('unknown build ' + knack + '/' + habit);
    applyFx(s, k.fx || []);
    applyFx(s, h.fx || []);
    s.notes = [];
    enterStory(s, DB.chapters[1].start);
    return s;
  };

  FK.clone = function (s) { return JSON.parse(JSON.stringify(s)); };

  FK.mystery = function (s) {
    var M = DB.config.mystery;
    if (!M) return 0;
    var c = M.clues.filter(function (f) { return s.flags[f]; }).length;
    var strong = M.strong.some(function (f) { return s.flags[f]; });
    if (strong && c >= M.know) return 2;
    if (c >= M.suspect) return 1;
    return 0;
  };

  /* ------------------------------------------------------------ effects */

  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function addNum(s, k, d) {
    if (FK.STATS.indexOf(k) >= 0) { s.stats[k] = clamp(s.stats[k] + d, 0, DB.config.statCap || 5); return; }
    switch (k) {
      case 'hp': s.hp = clamp(s.hp + d, 0, s.maxhp); return;
      case 'maxhp': s.maxhp = clamp(s.maxhp + d, 1, 6); if (d > 0) s.hp += d; return;
      case 'heat': s.heat = clamp(s.heat + d, 0, DB.config.heatMax || 10); return;
      case 'scrap': s.scrap = Math.max(0, s.scrap + d); return;
      case 'sp': s.sp = Math.max(0, s.sp + d); return;
      case 'turn': s.turn = Math.max(0, s.turn + d); return;
    }
    s.vars[k] = (s.vars[k] || 0) + d;
  }

  function note(s, kind, text) { s.notes.push({ kind: kind, text: text }); }

  function repName(id) { return DB.reps[id] ? DB.reps[id].name : cap(id); }

  FK.applyFx = applyFx;
  function applyFx(s, list) {
    if (!list) return;
    for (var i = 0; i < list.length; i++) {
      var e = list[i], m;
      if ((m = /^\+(\w+)$/.exec(e))) { s.flags[m[1]] = 1; if (m[1].indexOf('clue_') === 0) clueNote(s, m[1]); continue; }
      if ((m = /^-(\w+)$/.exec(e))) { delete s.flags[m[1]]; continue; }
      if ((m = /^(\w+)([+-])(\d+)$/.exec(e))) {
        var d = (m[2] === '+' ? 1 : -1) * +m[3];
        addNum(s, m[1], d);
        if (m[1] === 'heat' && d > 0) note(s, 'heat', d > 1 ? 'The house feels a lot less safe.' : 'Somebody could notice that.');
        if (FK.STATS.indexOf(m[1]) >= 0 && d > 0) note(s, 'stat', cap(m[1]) + ' +' + d);
        if (m[1] === 'scrap' && d > 0) note(s, 'scrap', '+' + d + ' scrap');
        if (m[1] === 'sp' && d > 0) note(s, 'sp', 'Skill point earned');
        if (m[1] === 'hp' && d < 0) note(s, 'hurt', 'You are hurt.');
        continue;
      }
      if ((m = /^(\w+)=(-?\d+)$/.exec(e))) {
        var k = m[1], v = +m[2];
        if (FK.STATS.indexOf(k) >= 0) s.stats[k] = v; else if (typeof s[k] === 'number') s[k] = v; else s.vars[k] = v;
        continue;
      }
      if ((m = /^(\w+):(.*)$/.exec(e))) {
        var op = m[1], arg = m[2], mm;
        switch (op) {
          case 'give':
            if (s.items.indexOf(arg) < 0) {
              if (s.items.length >= (DB.config.gridSize || 20)) s.stash.push(arg); else s.items.push(arg);
              note(s, 'item', 'Got: ' + (DB.items[arg] ? DB.items[arg].name : arg));
            }
            break;
          case 'take':
            var ix = s.items.indexOf(arg);
            if (ix >= 0) { s.items.splice(ix, 1); note(s, 'item', 'Lost: ' + (DB.items[arg] ? DB.items[arg].name : arg)); }
            break;
          case 'learn': s.skills[arg] = 1; applyFx(s, (DB.skills[arg] || {}).fx); break;
          case 'up': s.upgrades[arg] = 1; break;
          case 'rep':
            mm = /^(\w+)([+-])(\d+)$/.exec(arg);
            s.rep[mm[1]] = clamp((s.rep[mm[1]] || 0) + (mm[2] === '+' ? 1 : -1) * +mm[3], -5, 5);
            note(s, 'remember', repName(mm[1]) + ' will remember that.');
            break;
          case 'remember': note(s, 'remember', repName(arg) + ' will remember that.'); break;
          case 'cap': s.captives[arg] = 1; note(s, 'cap', repName(arg) + ' is your prisoner.'); break;
          case 'free': delete s.captives[arg]; break;
          case 'kill': s.dead[arg] = 1; delete s.captives[arg]; break;
          case 'axis': mm = /^(\w+)=(\w+)$/.exec(arg); s.axes[mm[1]] = mm[2]; break;
          case 'dest':
            if (!s.dests[arg]) { s.dests[arg] = 1; note(s, 'dest', 'New coordinates: ' + (DB.dests[arg] ? DB.dests[arg].name : arg)); }
            break;
          case 'tally': mm = /^(\w+)([+-])(\d+)$/.exec(arg); s.tally[mm[1]] += (mm[2] === '+' ? 1 : -1) * +mm[3]; break;
          case 'note': s.journal.push(arg); note(s, 'journal', 'Journal updated.'); break;
          case 'loc': s.loc = arg; break;
          default: throw new Error('unknown effect ' + e);
        }
        continue;
      }
      throw new Error('bad effect ' + e);
    }
  }

  function clueNote(s, f) {
    var M = DB.config.mystery;
    if (M && M.clues.indexOf(f) >= 0) note(s, 'clue', 'A piece of the puzzle. (' + M.clues.filter(function (c) { return s.flags[c]; }).length + ' found)');
  }

  /* ------------------------------------------------------------ discovery hook */

  FK.discover = function () {};

  /* ------------------------------------------------------------ text */

  FK.paragraphs = function (s, text) {
    var out = [];
    (text || []).forEach(function (p) {
      if (typeof p === 'string') out.push(p);
      else if (FK.test(s, p.if)) { if (p.t) out.push(p.t); }
      else if (p.else) out.push(p.else);
    });
    return out;
  };

  /* ------------------------------------------------------------ flow */

  function chOk(sl, ch) {
    if (sl.ch === undefined) return true;
    return Array.isArray(sl.ch) ? sl.ch.indexOf(ch) >= 0 : sl.ch === ch;
  }

  function locOk(sl, loc) { return !sl.loc || sl.loc === 'any' || sl.loc === loc; }

  FK.available = function (s, sl) {
    return chOk(sl, s.ch) && locOk(sl, s.loc) && !(sl.once && s.seen[sl.id]) && FK.test(s, sl.req);
  };

  FK.hubCards = function (s) {
    return DB.order.map(function (id) { return DB.storylets[id]; })
      .filter(function (sl) { return !sl.sub && !sl.forced && FK.available(s, sl); })
      .sort(function (a, b) { return (b.prio || 0) - (a.prio || 0); })
      .map(function (sl) { return sl.id; });
  };

  function forcedFor(s) {
    var list = DB.order.map(function (id) { return DB.storylets[id]; })
      .filter(function (sl) { return sl.forced && FK.available(s, sl); })
      .sort(function (a, b) { return (b.prio || 0) - (a.prio || 0); });
    return list.length ? list[0].id : null;
  }

  FK.travelOptions = function (s) {
    var L = DB.locs[s.loc];
    return ((L && L.travel) || []).filter(function (t) { return FK.test(s, t.req); });
  };

  FK.learnable = function (s) {
    if (s.sp <= 0) return [];
    return Object.keys(DB.skills).filter(function (id) {
      var k = DB.skills[id];
      return !s.skills[id] && (!k.after || s.skills[k.after]) && FK.test(s, k.req);
    });
  };

  FK.buildable = function (s) {
    var L = DB.locs[s.loc];
    if (!L || !L.base) return [];
    return Object.keys(DB.upgrades).filter(function (id) {
      var u = DB.upgrades[id];
      return !s.upgrades[id] && s.scrap >= u.cost && FK.test(s, u.req);
    });
  };

  FK.visibleChoices = function (s, sl) {
    var vis = [], hidden = 0;
    sl.choices.forEach(function (c, i) {
      if (FK.test(s, c.req)) vis.push(i);
      else if (c.req && FK.isBuildGated(c.req)) hidden++;
    });
    return { idx: vis, hidden: hidden };
  };

  function enterStory(s, sid) {
    var sl = DB.storylets[sid];
    if (!sl) throw new Error('missing storylet ' + sid);
    s.screen = { type: 'story', sid: sid };
    s.seen[sid] = (s.seen[sid] || 0) + 1;
    if (sl.loc && sl.loc !== 'any') s.loc = sl.loc;
    applyFx(s, sl.fx);
    FK.discover('s', sid, s);
  }

  function toHub(s) {
    s.screen = { type: 'hub' };
    var f = forcedFor(s);
    if (f) { s.turn++; enterStory(s, f); }
  }

  function go(s, next) {
    if (!next || next === 'hub') return toHub(s);
    if (next === '@death') { s.screen = { type: 'death' }; FK.discover('death', s.screen.text || 'death', s); return; }
    if (next === '@chapter') {
      s.chapterLog[s.ch] = { turn: s.turn };
      s.screen = { type: 'chapter', ch: s.ch };
      FK.discover('chapter', String(s.ch), s);
      return;
    }
    if (next === '@ending') {
      var e = FK.ending(s);
      s.chapterLog[s.ch] = { turn: s.turn };
      s.screen = { type: 'ending', key: e.key };
      FK.discover('chapter', String(s.ch), s);
      FK.discover('ending', e.key, s);
      return;
    }
    if (next.indexOf('@loc:') === 0) { s.loc = next.slice(5); return toHub(s); }
    enterStory(s, next);
  }

  FK.actions = function (s) {
    var sc = s.screen, out = [];
    switch (sc.type) {
      case 'story':
        var sl = DB.storylets[sc.sid];
        FK.visibleChoices(s, sl).idx.forEach(function (i) {
          var c = sl.choices[i];
          if (c.puzzle) { out.push({ type: 'choice', i: i, win: true }); out.push({ type: 'choice', i: i, win: false }); }
          else out.push({ type: 'choice', i: i });
        });
        break;
      case 'result': case 'chapter': out.push({ type: 'continue' }); break;
      case 'hub':
        FK.hubCards(s).forEach(function (id) { out.push({ type: 'card', sid: id }); });
        FK.travelOptions(s).forEach(function (t) { out.push({ type: 'travel', to: t.to }); });
        if (DB.locs[s.loc] && DB.locs[s.loc].wait && FK.test(s, DB.locs[s.loc].wait.req)) out.push({ type: 'wait' });
        FK.learnable(s).forEach(function (id) { out.push({ type: 'learn', id: id }); });
        FK.buildable(s).forEach(function (id) { out.push({ type: 'build', id: id }); });
        break;
    }
    return out;
  };

  /* Outcome of a choice: puzzle win/lose, the first matching conditional branch, or the choice itself. */
  FK.outcomeOf = function (s, c, win) {
    if (c.puzzle) return { o: win ? c.win : c.lose, key: win ? 'w' : 'l' };
    if (c.out) {
      for (var j = 0; j < c.out.length; j++) if (FK.test(s, c.out[j].req)) return { o: c.out[j], key: String(j) };
      throw new Error('no outcome matched');
    }
    return { o: c, key: '' };
  };

  FK.act = function (s, a) {
    s.notes = [];
    var sc = s.screen;
    switch (a.type) {
      case 'card':
        if (sc.type !== 'hub' || FK.hubCards(s).indexOf(a.sid) < 0) throw new Error('card not available ' + a.sid);
        s.turn++;
        enterStory(s, a.sid);
        return s;
      case 'travel':
        var t = FK.travelOptions(s).filter(function (x) { return x.to === a.to; })[0];
        if (!t) throw new Error('travel not available ' + a.to);
        s.turn++;
        applyFx(s, t.fx);
        s.loc = a.to;
        toHub(s);
        return s;
      case 'wait':
        var W = DB.locs[s.loc].wait;
        s.turn += 1;
        applyFx(s, W.fx);
        s.screen = { type: 'result', text: W.text, next: 'hub' };
        return s;
      case 'learn':
        if (FK.learnable(s).indexOf(a.id) < 0) throw new Error('cannot learn ' + a.id);
        s.sp--; s.skills[a.id] = 1; applyFx(s, DB.skills[a.id].fx);
        note(s, 'skill', 'Learned: ' + DB.skills[a.id].name);
        return s;
      case 'build':
        if (FK.buildable(s).indexOf(a.id) < 0) throw new Error('cannot build ' + a.id);
        var u = DB.upgrades[a.id];
        s.scrap -= u.cost; s.upgrades[a.id] = 1; applyFx(s, u.fx);
        note(s, 'build', 'Built: ' + u.name);
        return s;
      case 'continue':
        if (sc.type === 'result') { go(s, sc.next); return s; }
        if (sc.type === 'chapter') {
          s.ch++;
          var C = DB.chapters[s.ch];
          if (!C) throw new Error('no chapter ' + s.ch);
          enterStory(s, C.start);
          return s;
        }
        throw new Error('nothing to continue');
      case 'choice':
        if (sc.type !== 'story') throw new Error('not in a story');
        var sl = DB.storylets[sc.sid];
        if (FK.visibleChoices(s, sl).idx.indexOf(a.i) < 0) throw new Error('choice hidden ' + sc.sid + '#' + a.i);
        var c = sl.choices[a.i];
        var oc = FK.outcomeOf(s, c, a.win), o = oc.o;
        FK.discover('c', sc.sid + '#' + a.i + (oc.key ? '.' + oc.key : ''), s);
        if (c.a && s.tally[c.a] !== undefined) s.tally[c.a] += (c.w || 1);
        applyFx(s, c.fx);
        if (o !== c) applyFx(s, o.fx);
        var next = o.next !== undefined ? o.next : (c.next !== undefined ? c.next : 'hub');
        var res = o.res !== undefined ? o.res : (o === c ? c.res : undefined);
        if (s.hp <= 0) next = '@death';
        if (next === '@death') {
          if (Array.isArray(res)) res = FK.paragraphs(s, res).join('\n\n');
          s.screen = { type: 'death', text: res || DB.deaths[o.death || c.death] || DB.deaths.default };
          FK.discover('death', sc.sid + '#' + a.i, s);
          return s;
        }
        if (Array.isArray(res)) res = FK.paragraphs(s, res).join('\n\n');
        if (res) { s.screen = { type: 'result', text: res, next: next, from: sc.sid }; return s; }
        go(s, next);
        return s;
    }
    throw new Error('unknown action ' + a.type);
  };

  /* ------------------------------------------------------------ endings */

  FK.identity = function (s) {
    var I = DB.config.identity, best = null, bestV = -1;
    I.order.forEach(function (id) {
      var w = I.weights[id], v = 0;
      for (var k in w) v += (s.tally[k] || 0) * w[k];
      if (v > bestV) { bestV = v; best = id; }
    });
    return best;
  };

  /* Core ending = identity x gun x house x climax. An "exit" axis instead gives
   * one of the early-exit endings (leaving the story before the climax). */
  FK.ending = function (s) {
    var E = DB.ending;
    if (s.axes.exit) {
      var X = E.exits[s.axes.exit], xp = FK.paragraphs(s, X.text);
      E.epilogue.forEach(function (ep) { if (ep.exit && FK.test(s, ep.if)) xp.push(ep.t); });
      return { key: 'exit/' + s.axes.exit, exit: s.axes.exit, title: X.title, paragraphs: xp };
    }
    var id = FK.identity(s), gun = s.axes.gun || E.defaultGun, house = s.axes.house || E.defaultHouse,
      climax = s.axes.climax || E.defaultClimax;
    var I = E.identities[id], Gn = E.guns[gun], H = E.houses[house], Cl = E.climaxes[climax];
    var paras = [].concat(FK.paragraphs(s, Cl.text), FK.paragraphs(s, I.text), FK.paragraphs(s, Gn.text), FK.paragraphs(s, H.text));
    E.epilogue.forEach(function (ep) { if (!ep.exit && FK.test(s, ep.if)) paras.push(ep.t); });
    return {
      key: id + '/' + gun + '/' + house + '/' + climax,
      identity: id, gun: gun, house: house, climax: climax,
      title: I.title + ' — ' + Cl.title + ', ' + Gn.title + ', ' + H.title,
      paragraphs: paras
    };
  };

  FK.endingKeys = function () {
    var E = DB.ending, keys = [];
    Object.keys(E.identities).forEach(function (i) {
      Object.keys(E.guns).forEach(function (g) {
        Object.keys(E.houses).forEach(function (h) {
          Object.keys(E.climaxes).forEach(function (c) {
            var bad = (E.invalid || []).some(function (p) {
              return (p.gun === undefined || p.gun === g) && (p.house === undefined || p.house === h) &&
                (p.climax === undefined || p.climax === c) && (p.identity === undefined || p.identity === i);
            });
            if (!bad) keys.push(i + '/' + g + '/' + h + '/' + c);
          });
        });
      });
    });
    Object.keys(E.exits || {}).forEach(function (x) { keys.push('exit/' + x); });
    return keys;
  };

  /* ------------------------------------------------------------ discovery map */

  /* Every discoverable outcome key, per chapter: "sid#choice" plus ".w/.l" for
   * puzzles or ".n" for conditional branches. */
  FK.outcomeKeys = function (sl) {
    var keys = [];
    sl.choices.forEach(function (c, i) {
      var b = sl.id + '#' + i;
      if (c.puzzle) { keys.push(b + '.w'); keys.push(b + '.l'); }
      else if (c.out) c.out.forEach(function (_, j) { keys.push(b + '.' + j); });
      else keys.push(b);
    });
    return keys;
  };

  FK.targetsOf = function (c) {
    var t = [];
    function add(n) { if (n && n !== 'hub' && t.indexOf(n) < 0) t.push(n); }
    add(c.next);
    if (c.out) c.out.forEach(function (o) { add(o.next !== undefined ? o.next : c.next); });
    if (c.puzzle) { add(c.win && c.win.next); add(c.lose && c.lose.next); }
    return t;
  };

  FK.chapterOf = function (sl) {
    if (sl.ch === undefined) return [1, 2, 3];
    return Array.isArray(sl.ch) ? sl.ch : [sl.ch];
  };

  FK.progress = function (meta, ch) {
    var found = 0, total = 0;
    DB.order.forEach(function (id) {
      var sl = DB.storylets[id];
      if (ch && FK.chapterOf(sl)[0] !== ch) return;
      total++; if (meta.s[id]) found++;
      FK.outcomeKeys(sl).forEach(function (k) { total++; if (meta.c[k]) found++; });
    });
    return { found: found, total: total, pct: total ? Math.round(1000 * found / total) / 10 : 0 };
  };
})(typeof window !== 'undefined' ? window : globalThis);
