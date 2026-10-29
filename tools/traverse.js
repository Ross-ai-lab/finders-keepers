#!/usr/bin/env node
// Route checker: walks the story out of the page and proves every storylet,
// every choice outcome, every target and every core ending can be reached.
//
//   node tools/traverse.js            full check (static + walks + ending search)
//   node tools/traverse.js --quick    fewer walks, for fast iteration
//   node tools/traverse.js --verbose  list what was not reached (ids only, no story text)
//
// Exit code 0 means everything is reachable and no softlocks were found.
'use strict';
const { loadGame } = require('./load');

const args = process.argv.slice(2);
const QUICK = args.includes('--quick');
const VERBOSE = args.includes('--verbose');
const SEED = +(args.find(a => a.startsWith('--seed=')) || '--seed=1').slice(7);

const FK = loadGame();
const DB = FK.DB;
const problems = [];
const warn = [];
function problem(msg) { problems.push(msg); }

/* --------------------------------------------------------------- tiny PRNG */
let rs = SEED >>> 0 || 1;
function rnd() { rs ^= rs << 13; rs >>>= 0; rs ^= rs >> 17; rs ^= rs << 5; rs >>>= 0; return rs / 4294967296; }
function pick(arr) { return arr[Math.floor(rnd() * arr.length)]; }

/* =============================================================== STATIC PASS */

const reqSources = [];   // [where, src]
const fxSources = [];    // [where, op]
function addReq(where, src) { if (src) reqSources.push([where, src]); }
function addFx(where, list) { (list || []).forEach(e => fxSources.push([where, e])); }
function addText(where, text) { (text || []).forEach(p => { if (typeof p === 'object') addReq(where, p.if); }); }

const C = DB.config;
Object.entries(C.knacks).forEach(([k, v]) => addFx('knack ' + k, v.fx));
Object.entries(C.habits).forEach(([k, v]) => addFx('habit ' + k, v.fx));
Object.values(DB.skills).forEach(k => { addReq('skill ' + k.id, k.req); addFx('skill ' + k.id, k.fx); if (k.after && !DB.skills[k.after]) problem(`skill ${k.id}: unknown prerequisite ${k.after}`); });
Object.values(DB.upgrades).forEach(u => { addReq('upgrade ' + u.id, u.req); addFx('upgrade ' + u.id, u.fx); });
Object.values(DB.locs).forEach(L => {
  addText('loc ' + L.id, L.text);
  (L.travel || []).forEach(t => { addReq('travel ' + L.id + '>' + t.to, t.req); addFx('travel ' + L.id, t.fx); if (!DB.locs[t.to]) problem(`loc ${L.id}: travel to unknown loc ${t.to}`); });
  if (L.wait) { addReq('wait ' + L.id, L.wait.req); addFx('wait ' + L.id, L.wait.fx); }
});
Object.values(DB.chapters).forEach(ch => {
  if (!DB.storylets[ch.start]) problem(`chapter ${ch.n}: missing start storylet ${ch.start}`);
  (ch.summary || []).forEach(p => addReq('chapter summary ' + ch.n, p.if));
});
const E = DB.ending;
['identities', 'guns', 'houses', 'climaxes', 'exits'].forEach(g => Object.entries(E[g] || {}).forEach(([k, v]) => addText(`ending ${g} ${k}`, v.text)));
E.epilogue.forEach((p, i) => addReq('epilogue ' + i, p.if));

const targetedBy = {};
for (const id of DB.order) {
  const sl = DB.storylets[id];
  const w = 'storylet ' + id;
  addReq(w, sl.req); addFx(w, sl.fx); addText(w, sl.text);
  if (sl.loc && sl.loc !== 'any' && !DB.locs[sl.loc]) problem(`${w}: unknown loc ${sl.loc}`);
  if (!sl.choices.length) problem(`${w}: has no choices`);
  if (!sl.title) problem(`${w}: has no title`);
  sl.choices.forEach((c, i) => {
    const cw = `${w} choice ${i}`;
    if (!c.t) problem(`${cw}: no label`);
    if (c.a && !FK.APPROACHES.includes(c.a) && c.a !== 'neutral') problem(`${cw}: unknown approach ${c.a}`);
    addReq(cw, c.req); addFx(cw, c.fx);
    if (c.puzzle) {
      if (!c.win || !c.lose) problem(`${cw}: puzzle needs win and lose`);
      addFx(cw + ' win', c.win && c.win.fx); addFx(cw + ' lose', c.lose && c.lose.fx);
    }
    if (c.out) {
      c.out.forEach((o, j) => { addReq(cw + ' out ' + j, o.req); addFx(cw + ' out ' + j, o.fx); });
      if (c.out[c.out.length - 1].req) problem(`${cw}: last conditional outcome must have no requirement (fallback)`);
    }
    for (const t of FK.targetsOf(c)) {
      if (t === '@death' || t === '@chapter' || t === '@ending') continue;
      if (t.startsWith('@loc:')) { if (!DB.locs[t.slice(5)]) problem(`${cw}: unknown loc target ${t}`); continue; }
      if (!DB.storylets[t]) problem(`${cw}: unknown target ${t}`);
      (targetedBy[t] = targetedBy[t] || []).push(id);
    }
    const deathKey = c.death || (c.out || []).map(o => o.death).find(Boolean);
    if (deathKey && !DB.deaths[deathKey]) problem(`${cw}: unknown death text ${deathKey}`);
  });
}
for (const id of DB.order) {
  const sl = DB.storylets[id];
  const isStart = Object.values(DB.chapters).some(c => c.start === id);
  if (sl.sub && !targetedBy[id] && !isStart) problem(`storylet ${id}: sub-scene that nothing leads to`);
}

// Parse every requirement and collect what it needs.
const need = { flag: {}, item: {}, skill: {}, up: {}, cap: {}, dead: {}, dest: {}, seen: {}, axis: {}, rep: {}, loc: {}, knack: {}, habit: {}, identity: {} };
function walkReq(where, n) {
  if (!n) return;
  if (n.a) walkReq(where, n.a);
  if (n.b) walkReq(where, n.b);
  if (n.op === 'flag') (need.flag[n.k] = need.flag[n.k] || []).push(where);
  if (n.op === 'has') {
    if (!need[n.kind]) { problem(`${where}: unknown requirement kind ${n.kind}`); return; }
    (need[n.kind][n.k] = need[n.kind][n.k] || []).push(where);
  }
  if (n.op === 'axis') (need.axis[n.k + '=' + n.v] = need.axis[n.k + '=' + n.v] || []).push(where);
  if (n.op === 'cmp' && n.kind === 'rep') (need.rep[n.k] = need.rep[n.k] || []).push(where);
  if (n.op === 'cmp' && n.kind === 'seen') (need.seen[n.k] = need.seen[n.k] || []).push(where);
  if (n.op === 'cmp' && n.kind === 'var' && FK.STATS.includes(n.k) && n.v > (C.statCap || 5)) problem(`${where}: needs ${n.k} ${n.v}, above the cap`);
}
for (const [w, src] of reqSources) {
  try { walkReq(w, FK.parseReq(src)); } catch (e) { problem(`${w}: ${e.message}`); }
}

// What effects can produce.
const made = { flag: new Set(), item: new Set(), skill: new Set(Object.keys(DB.skills)), up: new Set(), cap: new Set(), dead: new Set(), dest: new Set(), axis: new Set(), rep: new Set() };
const testState = FK.newGame(Object.keys(C.knacks)[0], Object.keys(C.habits)[0]);
for (const [w, e] of fxSources) {
  let m;
  try { FK.applyFx(FK.clone(testState), [e]); } catch (err) { problem(`${w}: ${err.message}`); continue; }
  if ((m = /^\+(\w+)$/.exec(e))) made.flag.add(m[1]);
  else if ((m = /^give:(\w+)$/.exec(e))) { made.item.add(m[1]); if (!DB.items[m[1]]) problem(`${w}: unknown item ${m[1]}`); }
  else if ((m = /^take:(\w+)$/.exec(e))) { if (!DB.items[m[1]]) problem(`${w}: unknown item ${m[1]}`); }
  else if ((m = /^learn:(\w+)$/.exec(e))) { if (!DB.skills[m[1]]) problem(`${w}: unknown skill ${m[1]}`); }
  else if ((m = /^up:(\w+)$/.exec(e))) { made.up.add(m[1]); if (!DB.upgrades[m[1]]) problem(`${w}: unknown upgrade ${m[1]}`); }
  else if ((m = /^cap:(\w+)$/.exec(e))) { made.cap.add(m[1]); if (!DB.reps[m[1]]) problem(`${w}: captive ${m[1]} has no name entry`); }
  else if ((m = /^(?:kill|free):(\w+)$/.exec(e))) { if (e.startsWith('kill')) made.dead.add(m[1]); if (!DB.reps[m[1]]) problem(`${w}: ${m[1]} has no name entry`); }
  else if ((m = /^dest:(\w+)$/.exec(e))) { made.dest.add(m[1]); if (!DB.dests[m[1]]) problem(`${w}: unknown destination ${m[1]}`); }
  else if ((m = /^axis:(\w+=\w+)$/.exec(e))) made.axis.add(m[1]);
  else if ((m = /^(?:rep|remember):(\w+)/.exec(e))) { made.rep.add(m[1]); if (!DB.reps[m[1]]) problem(`${w}: unknown reputation ${m[1]}`); }
}
Object.values(DB.upgrades).forEach(u => made.up.add(u.id));
for (const f of Object.keys(need.flag)) if (!made.flag.has(f)) problem(`flag "${f}" is required (${need.flag[f][0]}) but nothing sets it`);
for (const k of ['item', 'up', 'cap', 'dead', 'dest', 'axis']) {
  for (const f of Object.keys(need[k])) if (!made[k].has(f)) problem(`${k} "${f}" is required (${need[k][f][0]}) but nothing provides it`);
}
for (const f of Object.keys(need.skill)) if (!DB.skills[f]) problem(`unknown skill "${f}" (${need.skill[f][0]})`);
for (const f of Object.keys(need.seen)) if (!DB.storylets[f]) problem(`unknown storylet "${f}" in seen: (${need.seen[f][0]})`);
for (const f of Object.keys(need.rep)) if (!DB.reps[f]) problem(`unknown reputation "${f}" (${need.rep[f][0]})`);
for (const f of Object.keys(need.loc)) if (!DB.locs[f]) problem(`unknown loc "${f}" (${need.loc[f][0]})`);
for (const f of Object.keys(need.knack)) if (!C.knacks[f]) problem(`unknown knack "${f}"`);
for (const f of Object.keys(need.habit)) if (!C.habits[f]) problem(`unknown habit "${f}"`);
for (const f of Object.keys(need.identity)) if (!C.identity.weights[f]) problem(`unknown identity "${f}"`);
// Ending axes must be settable.
for (const g of Object.keys(E.guns)) if (!made.axis.has('gun=' + g)) problem(`ending gun value "${g}" is never set`);
for (const h of Object.keys(E.houses)) if (!made.axis.has('house=' + h)) problem(`ending house value "${h}" is never set`);
for (const c of Object.keys(E.climaxes)) if (!made.axis.has('climax=' + c)) problem(`ending climax value "${c}" is never set`);
for (const x of Object.keys(E.exits || {})) if (!made.axis.has('exit=' + x)) problem(`early exit "${x}" is never set`);
for (const a of made.axis) {
  const [k, v] = a.split('=');
  if (k === 'gun' && !E.guns[v]) problem(`axis gun=${v} has no ending text`);
  if (k === 'house' && !E.houses[v]) problem(`axis house=${v} has no ending text`);
  if (k === 'climax' && !E.climaxes[v]) problem(`axis climax=${v} has no ending text`);
  if (k === 'exit' && !(E.exits || {})[v]) problem(`axis exit=${v} has no ending text`);
}

const staticProblems = problems.length;

/* =============================================================== DYNAMIC PASS */

const allOutcomes = new Set();
DB.order.forEach(id => FK.outcomeKeys(DB.storylets[id]).forEach(k => allOutcomes.add(k)));
const allEndings = FK.endingKeys();

const cov = { s: new Map(), c: new Map(), ending: new Map(), death: 0, chapter: new Set(), travel: new Set(), build: new Set(), learn: new Set(), axis: new Set(), identity: new Set(), combos: new Set() };
const softlocks = [];
const loops = [];
let walks = 0, steps = 0;
let currentEnd = null;

FK.discover = function (kind, key, s) {
  if (kind === 's') cov.s.set(key, (cov.s.get(key) || 0) + 1);
  else if (kind === 'c') cov.c.set(key, (cov.c.get(key) || 0) + 1);
  else if (kind === 'chapter') cov.chapter.add(key);
  else if (kind === 'ending') {
    cov.ending.set(key, (cov.ending.get(key) || 0) + 1);
    currentEnd = key;
    Object.entries(s.axes).forEach(([k, v]) => cov.axis.add(k + '=' + v));
    cov.identity.add(FK.identity(s));
    cov.combos.add(FK.ending(s).paragraphs.join('|').length + ':' + key + ':' + JSON.stringify(s.axes));
  } else if (kind === 'death') cov.death++;
};

function actionKey(s, a) {
  switch (a.type) {
    case 'choice': {
      const sl = DB.storylets[s.screen.sid];
      const oc = FK.outcomeOf(s, sl.choices[a.i], a.win);
      return s.screen.sid + '#' + a.i + (oc.key ? '.' + oc.key : '');
    }
    case 'card': return 'card:' + a.sid;
    case 'travel': return 'travel:' + s.loc + '>' + a.to;
    default: return a.type + ':' + (a.id || '');
  }
}

const builds = [];
for (const k of Object.keys(C.knacks)) for (const h of Object.keys(C.habits)) builds.push([k, h]);

/* scorer(s, a, key) -> weight; higher = more likely */
/* A bank of mid-game hub states, so steered searches can start part-way. */
const bank = [];
function walk(build, scorer, maxSteps, start) {
  let s = start ? FK.clone(start) : FK.newGame(build[0], build[1]);
  let checkpoint = FK.clone(s);
  let reloads = 0;
  const trail = [];
  currentEnd = null;
  for (let n = 0; n < maxSteps; n++) {
    steps++;
    const t = s.screen.type;
    if (t === 'ending') return { s, end: currentEnd, trail };
    if (t === 'death') {
      if (++reloads > 8) return { s, end: null, trail };
      s = FK.clone(checkpoint);
      continue;
    }
    const acts = FK.actions(s);
    if (!acts.length) {
      softlocks.push({ build, screen: JSON.stringify(s.screen), loc: s.loc, ch: s.ch, trail: trail.slice(-12) });
      return { s, end: null, trail };
    }
    const weights = acts.map(a => Math.max(1e-6, scorer(s, a, actionKey(s, a))));
    const sum = weights.reduce((x, y) => x + y, 0);
    let r = rnd() * sum, i = 0;
    while (i < acts.length - 1 && (r -= weights[i]) > 0) i++;
    const a = acts[i];
    const key = actionKey(s, a);
    trail.push(key);
    if (a.type === 'card' || (s.screen.type === 'hub')) checkpoint = FK.clone(s);
    if (s.screen.type === 'hub' && rnd() < 0.03) {
      if (bank.length < 4000) bank.push(FK.clone(s)); else bank[Math.floor(rnd() * bank.length)] = FK.clone(s);
    }
    try { FK.act(s, a); } catch (e) { problem(`engine error after ${trail.slice(-6).join(' > ')}: ${e.message}`); return { s, end: null, trail }; }
    if (s.screen.type === 'story' && a.type !== 'choice') checkpoint = FK.clone(s);
  }
  // stuck = the last stretch was nothing but moving between places, waiting and continuing
  const tail = trail.slice(-80);
  if (tail.every(k => /^(travel|wait|continue):/.test(k))) softlocks.push({ build, screen: 'aimless loop', loc: s.loc, ch: s.ch, trail: tail.slice(-12) });
  else loops.push({ build, trail: trail.slice(-20) });
  return { s, end: null, trail };
}

const seenKey = new Map();
function novelty(s, a, key) {
  const n = seenKey.get(key) || 0;
  let w = 1 / Math.pow(1 + n, 2);
  if (a.type === 'wait') w *= 0.15;
  if (a.type === 'learn' || a.type === 'build') w *= 2;
  if (a.type === 'travel') w *= 0.6;
  return w;
}
function track(scorer) { return (s, a, key) => { const w = scorer(s, a, key); return w; }; }

const WALKS = QUICK ? 60 : 250;
const MAXSTEPS = 3000;
const t0 = Date.now();
for (let round = 0; round < WALKS; round++) {
  for (const b of builds) {
    walks++;
    const r = walk(b, (s, a, key) => novelty(s, a, key), MAXSTEPS);
    r.trail.forEach(k => seenKey.set(k, (seenKey.get(k) || 0) + 1));
  }
}

/* ---- steered search: for each scene or branch not yet reached, bias walks
 * toward whatever its requirements need (two levels of prerequisites deep). */
function posAtoms(src, out) {
  out = out || new Set();
  if (!src) return out;
  (function walkN(n, neg) {
    if (!n) return;
    if (n.op === 'not') return walkN(n.a, !neg);
    if (n.op === 'and' || n.op === 'or') { walkN(n.a, neg); walkN(n.b, neg); return; }
    if (neg) return;
    if (n.op === 'flag') out.add('flag:' + n.k);
    else if (n.op === 'has' && ['item', 'up', 'skill', 'cap', 'dead', 'dest', 'seen'].includes(n.kind)) out.add(n.kind + ':' + n.k);
    else if (n.op === 'axis') out.add('axis:' + n.k + '=' + n.v);
    else if (n.op === 'cmp' && n.kind === 'var' && !FK.STATS.includes(n.k) && n.k !== 'turn' && (n.c === '>=' || n.c === '>' || n.c === '==')) out.add('num:' + n.k);
    else if (n.op === 'cmp' && n.kind === 'rep' && (n.c === '>=' || n.c === '>')) out.add('rep+:' + n.k);
    else if (n.op === 'cmp' && n.kind === 'rep') out.add('rep-:' + n.k);
    else if (n.op === 'cmp' && n.kind === 'var' && FK.STATS.includes(n.k)) out.add('stat:' + n.k);
  })(FK.parseReq(src), false);
  return out;
}
function fxAtoms(list) {
  const out = new Set();
  (list || []).forEach(e => {
    let m;
    if ((m = /^\+(\w+)$/.exec(e))) out.add('flag:' + m[1]);
    else if ((m = /^give:(\w+)$/.exec(e))) out.add('item:' + m[1]);
    else if ((m = /^(up|cap|dest):(\w+)$/.exec(e))) out.add(m[1] + ':' + m[2]);
    else if ((m = /^kill:(\w+)$/.exec(e))) out.add('dead:' + m[1]);
    else if ((m = /^learn:(\w+)$/.exec(e))) out.add('skill:' + m[1]);
    else if ((m = /^axis:(\w+=\w+)$/.exec(e))) out.add('axis:' + m[1]);
    else if ((m = /^(\w+)\+\d+$/.exec(e)) && !FK.STATS.includes(m[1])) out.add('num:' + m[1]);
    else if ((m = /^\+clue_/.exec(e))) out.add('num:mystery');
    else if ((m = /^rep:(\w+)\+/.exec(e))) out.add('rep+:' + m[1]);
    else if ((m = /^rep:(\w+)-/.exec(e))) out.add('rep-:' + m[1]);
    else if ((m = /^(muscle|brains|mouth|sneak)\+/.exec(e))) out.add('stat:' + m[1]);
    if (/^\+clue_/.test(e)) out.add('num:clues');
    if (/^\+settled_/.test(e)) out.add('num:settled');
    if (/^cap:/.test(e)) out.add('num:captives');
  });
  return out;
}
// who produces what: choice outcomes, storylet entry effects, skills, upgrades
const producers = new Map();
function addProd(atom, p) { if (!producers.has(atom)) producers.set(atom, []); producers.get(atom).push(p); }
for (const id of DB.order) {
  const sl = DB.storylets[id];
  fxAtoms(sl.fx).forEach(a => addProd(a, { sid: id, enter: true }));
  addProd('seen:' + id, { sid: id, enter: true });
  sl.choices.forEach((c, i) => {
    const outs = c.puzzle ? [['w', c.win], ['l', c.lose]] : c.out ? c.out.map((o, j) => [String(j), o]) : [['', c]];
    outs.forEach(([k, o]) => {
      const at = fxAtoms((c.fx || []).concat(o === c ? [] : (o.fx || [])));
      at.forEach(a => addProd(a, { sid: id, i, k, req: c.req, oreq: o === c ? null : o.req }));
    });
  });
}
Object.values(DB.upgrades).forEach(u => addProd('up:' + u.id, { up: u.id, req: u.req }));
Object.values(DB.skills).forEach(k => addProd('skill:' + k.id, { skill: k.id, req: k.req, after: k.after }));

// how to get into a scene: its own requirement, plus whatever leads to it
const avoidCache = new Map();
function sceneNeeds(sid, out, depth, avoid) {
  const sl = DB.storylets[sid];
  posAtoms(sl.req, out);
  if (sl.sub && depth < 4) {
    for (const src of targetedBy[sid] || []) {
      out.add('seen:' + src);
      DB.storylets[src].choices.forEach(c => {
        if (!c.out) return;
        const j = c.out.findIndex(o => o.next === sid);
        if (j < 0) return;
        posAtoms(c.out[j].req, out);
        // earlier branches of the same choice would win first: stay away from them
        if (avoid) for (let e = 0; e < j; e++) posAtoms(c.out[e].req, avoid);
      });
      sceneNeeds(src, out, depth + 1, avoid);
    }
  }
  return out;
}
function avoidFor(sid) {
  if (!avoidCache.has(sid)) { const av = new Set(); sceneNeeds(sid, new Set(), 0, av); avoidCache.set(sid, av); }
  return avoidCache.get(sid);
}
function expand(atoms, levels) {
  const all = new Set(atoms);
  let frontier = [...atoms];
  for (let l = 0; l < levels; l++) {
    const next = [];
    for (const a of frontier) for (const p of producers.get(a) || []) {
      const more = new Set();
      if (p.sid) { posAtoms(p.req, more); posAtoms(p.oreq, more); sceneNeeds(p.sid, more, 0); }
      if (p.req) posAtoms(p.req, more);
      if (p.after) more.add('skill:' + p.after);
      more.forEach(m => { if (!all.has(m)) { all.add(m); next.push(m); } });
    }
    frontier = next;
  }
  return all;
}
function steerTo(target) {
  const [sid, rest] = target.split('#');
  const need = sceneNeeds(sid, new Set(['seen:' + sid]), 0);
  if (rest !== undefined) {
    const [ci, k] = rest.split('.');
    const c = DB.storylets[sid].choices[+ci];
    posAtoms(c.req, need);
    if (c.out && k !== undefined) posAtoms(c.out[+k].req, need);
  }
  const want = expand(need, 3);
  const avoid = avoidFor(sid);
  want.forEach(a => avoid.delete(a));
  const cardFor = new Set();
  need.forEach(a => (producers.get(a) || []).forEach(p => { if (p.sid) cardFor.add(p.sid); }));
  return (s, a, key) => {
    let w = novelty(s, a, key) * 0.3 + 0.1;
    if (key === target || key.startsWith(target + '.')) return 1e6;
    if (a.type === 'card' && (a.sid === sid || want.has('seen:' + a.sid))) w *= 30;
    if (a.type === 'card' && cardFor.has(a.sid)) w *= 60;
    if (a.type === 'learn' && want.has('skill:' + a.id)) w *= need.has('skill:' + a.id) ? 400 : 50;
    if (a.type === 'build' && want.has('up:' + a.id)) w *= need.has('up:' + a.id) ? 400 : 50;
    if (a.type === 'choice') {
      const sl = DB.storylets[s.screen.sid], c = sl.choices[a.i], oc = FK.outcomeOf(s, c, a.win);
      const got = fxAtoms((c.fx || []).concat(oc.o !== c ? oc.o.fx || [] : []));
      const nx = oc.o.next !== undefined ? oc.o.next : c.next;
      if (nx && want.has('seen:' + nx)) w *= 30;
      let hit = 0, direct = 0;
      got.forEach(g => { if (need.has(g) && !holds(s, g)) direct++; else if (want.has(g)) hit++; });
      if (direct) w *= Math.pow(200, Math.min(direct, 2));
      if (hit) w *= Math.pow(12, Math.min(hit, 3));
      let bad = 0;
      got.forEach(g => { if (avoid.has(g)) bad++; });
      if (bad) w *= Math.pow(0.05, Math.min(bad, 2));
      if (c.puzzle) w *= a.win ? 2 : 0.5;
    }
    if (a.type === 'wait') w *= 0.3;
    return w;
  };
}
function holds(s, atom) {
  const [k, v] = [atom.slice(0, atom.indexOf(':')), atom.slice(atom.indexOf(':') + 1)];
  switch (k) {
    case 'flag': return !!s.flags[v];
    case 'item': return s.items.includes(v);
    case 'up': return !!s.upgrades[v];
    case 'skill': return !!s.skills[v];
    case 'cap': return !!s.captives[v];
    case 'dead': return !!s.dead[v];
    case 'dest': return !!s.dests[v];
    case 'seen': return !!s.seen[v];
    case 'axis': { const [a, b] = v.split('='); return s.axes[a] === b; }
    case 'num': return FK.num(s, v) > 0;
    case 'rep+': return (s.rep[v] || 0) > 0;
    case 'rep-': return (s.rep[v] || 0) < 0;
    case 'stat': return s.stats[v] >= 3;
  }
  return false;
}
function bestStart(target) {
  if (!bank.length || rnd() < 0.25) return null;
  const [sid, rest] = target.split('#');
  const need = sceneNeeds(sid, new Set(), 0);
  if (rest !== undefined) {
    const [ci, k] = rest.split('.');
    const c = DB.storylets[sid].choices[+ci];
    posAtoms(c.req, need);
    if (c.out && k !== undefined) posAtoms(c.out[+k].req, need);
  }
  const atoms = [...need];
  const ch = FK.chapterOf(DB.storylets[sid])[0];
  let best = [], bestScore = -1;
  for (let i = 0; i < 400; i++) {
    const st = bank[Math.floor(rnd() * bank.length)];
    if (st.ch > ch) continue;
    const sc = atoms.filter(a => holds(st, a)).length - 2 * [...avoidFor(sid)].filter(a => !need.has(a) && holds(st, a)).length;
    if (sc > bestScore) { bestScore = sc; best = [st]; } else if (sc === bestScore) best.push(st);
  }
  return best.length ? pick(best) : null;
}
const STEER = QUICK ? 40 : 300;
const missingBeforeSteer = [...allOutcomes].filter(k => !cov.c.has(k)).length + DB.order.filter(id => !cov.s.has(id)).length;
for (const id of DB.order) {
  for (let t = 0; t < STEER && !cov.s.has(id); t++) { walks++; walk(pick(builds), steerTo(id), MAXSTEPS, bestStart(id)); }
}
for (const k of allOutcomes) {
  for (let t = 0; t < STEER && !cov.c.has(k); t++) { walks++; walk(pick(builds), steerTo(k), MAXSTEPS, bestStart(k)); }
}
// last resort for the rarest branches: many more steered tries
for (const k of allOutcomes) {
  for (let t = 0; t < STEER * 8 && !cov.c.has(k); t++) { walks++; walk(pick(builds), steerTo(k), MAXSTEPS, bestStart(k)); }
}

/* ---- targeted ending search: steer walks toward each missing core ending */
const IDW = C.identity.weights;
function axisFx(list, out) { (list || []).forEach(e => { const m = /^axis:(\w+)=(\w+)$/.exec(e); if (m) out.push([m[1], m[2]]); }); return out; }
function choiceAxes(s, c, win) {
  const oc = FK.outcomeOf(s, c, win);
  const out = axisFx(c.fx, []);
  if (oc.o !== c) axisFx(oc.o.fx, out);
  return out;
}
function targeted(target) {
  const parts = target.split('/');
  const want = parts[0] === 'exit' ? { exit: parts[1] } : { id: parts[0], gun: parts[1], house: parts[2], climax: parts[3] };
  const needsMystery = want.gun === 'returned' || want.house === 'opened';
  return (s, a, key) => {
    let w = novelty(s, a, key) * 0.5 + 0.2;
    if (a.type === 'choice') {
      const c = DB.storylets[s.screen.sid].choices[a.i];
      if (want.id) {
        if (c.a && IDW[want.id][c.a]) w *= 4 + 3 * (c.w || 1);
        else if (c.a && c.a !== 'neutral') w *= 0.5;
      }
      for (const [k, v] of choiceAxes(s, c, a.win)) {
        if (k === 'exit') w *= v === want.exit ? 2000 : 0.0005;
        if (want.exit) continue;
        if (k === 'gun' || k === 'house' || k === 'climax') w *= v === want[k] ? 400 : 0.002;
      }
      if (c.puzzle) w *= a.win ? 1.5 : 0.7;
      if (needsMystery && FK.mystery(s) < 2) {
        const oc = FK.outcomeOf(s, c, a.win);
        const fx = (c.fx || []).concat(oc.o !== c ? oc.o.fx || [] : []);
        if (fx.some(e => /^\+clue_|^\+heater_understood|^give:hinge/.test(e))) w *= 8;
      }
    }
    if (a.type === 'card' && needsMystery && FK.mystery(s) < 2) w *= 1.5;
    if (a.type === 'wait') w *= 0.2;
    return w;
  };
}
const missingAfterRandom = allEndings.filter(k => !cov.ending.has(k)).length;
const TRIES = QUICK ? 30 : 200;
for (const target of allEndings) {
  if (cov.ending.has(target)) continue;
  for (let t = 0; t < TRIES && !cov.ending.has(target); t++) {
    walks++;
    walk(pick(builds), targeted(target), MAXSTEPS);
  }
}

/* =============================================================== REPORT */

const unseenStorylets = DB.order.filter(id => !cov.s.has(id));
const unseenOutcomes = [...allOutcomes].filter(k => !cov.c.has(k));
const unseenEndings = allEndings.filter(k => !cov.ending.has(k));
const unseenTravel = [];
Object.values(DB.locs).forEach(L => (L.travel || []).forEach(t => { if (!seenKey.has('travel:' + L.id + '>' + t.to)) unseenTravel.push(L.id + '>' + t.to); }));
const unseenUp = Object.keys(DB.upgrades).filter(u => !seenKey.has('build:' + u));
const unseenSkill = Object.keys(DB.skills).filter(k => !seenKey.has('learn:' + k));
const unseenChapters = Object.keys(DB.chapters).filter(n => !cov.chapter.has(n));
// (an early exit also counts as finishing the chapter it happened in; the last chapter finishes at an ending)

unseenStorylets.forEach(id => problem(`storylet never reached: ${id}`));
unseenOutcomes.forEach(k => problem(`choice outcome never reached: ${k}`));
unseenEndings.forEach(k => problem(`core ending never reached: ${k}`));
unseenTravel.forEach(k => problem(`travel route never used: ${k}`));
unseenUp.forEach(k => problem(`upgrade never built: ${k}`));
unseenSkill.forEach(k => problem(`skill never learned: ${k}`));
unseenChapters.forEach(k => problem(`chapter ${k} never completed`));
softlocks.slice(0, 10).forEach(l => problem(`softlock (no actions) in ch${l.ch} at ${l.loc} ${l.screen}; last: ${l.trail.join(' > ')}`));
loops.slice(0, 5).forEach(l => warn.push(`walk hit the step cap; last: ${l.trail.join(' > ')}`));

const totalChoices = DB.order.reduce((n, id) => n + DB.storylets[id].choices.length, 0);
console.log('Finders Keepers route check');
console.log('----------------------------');
console.log(`content     ${DB.order.length} storylets, ${totalChoices} choices, ${allOutcomes.size} distinct outcomes`);
console.log(`walks       ${walks} playthroughs, ${steps} steps, ${((Date.now() - t0) / 1000).toFixed(1)}s, ${builds.length} builds`);
console.log(`storylets   ${cov.s.size}/${DB.order.length} reached`);
console.log(`outcomes    ${cov.c.size}/${allOutcomes.size} reached (${missingBeforeSteer} scenes/branches needed steering)`);
console.log(`endings     ${cov.ending.size}/${allEndings.length} core endings reached (${allEndings.length - missingAfterRandom} by free play, rest by steered search)`);
console.log(`variants    ${cov.combos.size} distinct ending texts seen`);
console.log(`identities  ${cov.identity.size}/${Object.keys(E.identities).length}`);
console.log(`deaths      ${cov.death} deaths hit (each reloads the last save)`);
console.log(`static      ${staticProblems ? staticProblems + ' problem(s)' : 'all requirements, effects and targets resolve'}`);
console.log(`softlocks   ${softlocks.length}`);
if (warn.length) console.log(`warnings    ${warn.length} (step cap)`);
if (problems.length) {
  console.log(`\nFAILED: ${problems.length} problem(s)`);
  const show = VERBOSE ? problems : problems.slice(0, 40);
  show.forEach(p => console.log('  - ' + p));
  if (!VERBOSE && problems.length > 40) console.log(`  ... ${problems.length - 40} more (use --verbose)`);
  if (VERBOSE) warn.forEach(w => console.log('  ~ ' + w));
  process.exit(1);
}
if (VERBOSE) warn.forEach(w => console.log('  ~ ' + w));
console.log('\nOK: every storylet, outcome, target, upgrade, skill, chapter and core ending is reachable.');
