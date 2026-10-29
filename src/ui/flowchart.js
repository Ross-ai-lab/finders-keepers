/* Finders Keepers — branch flowchart. One column per place; each scene is a box
 * listing its branches. Found branches show their text; unfound ones show ???. */
(function (G) {
  'use strict';
  var FC = G.FLOW = {};
  var COLS = ['street', 'house', 'garage', 'reach', 'cinder', 'drift', 'any'];
  var NW = 236, ROW = 19, HEAD = 30, GAP = 18, CW = 290;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }

  FC.build = function (ch, meta) {
    var FK = G.FK, DB = FK.DB;
    var ids = DB.order.filter(function (id) { return FK.chapterOf(DB.storylets[id])[0] === ch; });
    var inCh = {}; ids.forEach(function (id) { inCh[id] = true; });

    // order: each root followed by the sub-scenes it leads to
    var cols = {}, placed = {};
    function colOf(sl) { return sl.loc && COLS.indexOf(sl.loc) >= 0 ? sl.loc : 'any'; }
    function place(id) {
      if (placed[id]) return; placed[id] = true;
      var sl = DB.storylets[id], c = colOf(sl);
      (cols[c] = cols[c] || []).push(id);
      sl.choices.forEach(function (ch) {
        FK.targetsOf(ch).forEach(function (t) { if (inCh[t] && DB.storylets[t].sub) place(t); });
      });
    }
    ids.filter(function (id) { return !DB.storylets[id].sub; }).forEach(place);
    ids.forEach(place);

    var usedCols = COLS.filter(function (c) { return cols[c]; });
    var pos = {}, rowsY = {}, heights = [];
    usedCols.forEach(function (c, ci) {
      var y = 46;
      cols[c].forEach(function (id) {
        var sl = DB.storylets[id], keys = FK.outcomeKeys(sl), h = HEAD + keys.length * ROW + 8;
        pos[id] = { x: 20 + ci * CW, y: y, h: h, keys: keys };
        y += h + GAP;
      });
      heights.push(y);
    });
    var W = 40 + usedCols.length * CW, H = Math.max.apply(null, heights.concat([200])) + 20;

    var out = [], edges = [];
    out.push('<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" font-family="system-ui, sans-serif">');
    out.push('<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#8dff7a"/></marker>' +
      '<marker id="ahd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#3a3f48"/></marker></defs>');
    usedCols.forEach(function (c, ci) {
      var L = DB.locs[c];
      out.push('<text x="' + (20 + ci * CW) + '" y="26" fill="#a8a395" font-size="11" letter-spacing="2">' + esc((L ? L.name : 'Anywhere').toUpperCase()) + '</text>');
    });

    var head = out; out = [];
    var found = 0, total = 0;
    usedCols.forEach(function (c) {
      cols[c].forEach(function (id) {
        var sl = DB.storylets[id], p = pos[id], seen = !!meta.s[id];
        total++; if (seen) found++;
        out.push('<rect x="' + p.x + '" y="' + p.y + '" width="' + NW + '" height="' + p.h + '" rx="8" fill="' + (seen ? '#121821' : '#0b0d11') + '" stroke="' + (seen ? '#3d6b38' : '#23272e') + '"/>');
        out.push('<text x="' + (p.x + 10) + '" y="' + (p.y + 19) + '" fill="' + (seen ? '#e9e4d8' : '#4b4f57') + '" font-size="13" font-weight="600">' + esc(seen ? trunc(sl.title, 30) : '???') + '</text>');
        p.keys.forEach(function (k, ri) {
          total++;
          var got = !!meta.c[k]; if (got) found++;
          var y = p.y + HEAD + ri * ROW + 12, label = '???';
          var m = /#(\d+)(?:\.(\w+))?$/.exec(k), ci2 = +m[1], sub = m[2], c2 = sl.choices[ci2];
          if (got) {
            label = c2.t;
            if (sub === 'w') label = '✓ ' + label; else if (sub === 'l') label = '✗ ' + label;
            else if (sub !== undefined && c2.out && c2.out.length > 1) label = label + ' (' + (+sub + 1) + ')';
          }
          out.push('<circle cx="' + (p.x + 12) + '" cy="' + (y - 4) + '" r="3" fill="' + (got ? '#8dff7a' : '#2d3138') + '"/>');
          out.push('<text x="' + (p.x + 21) + '" y="' + y + '" fill="' + (got ? '#c9c4b6' : '#3d4149') + '" font-size="11">' + esc(trunc(label, 36)) + '</text>');
          // where this branch goes
          var o = c2.puzzle ? (sub === 'w' ? c2.win : c2.lose) : (c2.out ? c2.out[+sub] : c2);
          var tgt = (o && o.next !== undefined) ? o.next : (c2.next !== undefined ? c2.next : 'hub');
          if (o && o.death) tgt = '@death';
          if (tgt && inCh[tgt] && pos[tgt]) edges.push({ x1: p.x + NW, y1: y - 4, x2: pos[tgt].x, y2: pos[tgt].y + 15, got: got && meta.s[tgt] });
          else if (tgt && tgt.charAt(0) === '@') {
            var mark = tgt === '@death' ? '☠' : tgt === '@chapter' ? '→ next chapter' : tgt === '@ending' ? '→ ending' : '→ ' + ((DB.locs[tgt.slice(5)] || {}).name || '');
            out.push('<text x="' + (p.x + NW + 4) + '" y="' + y + '" fill="' + (got ? (tgt === '@death' ? '#ff5d5d' : '#8dff7a') : '#2d3138') + '" font-size="10">' + esc(got ? mark : '·') + '</text>');
          }
        });
      });
    });
    var nodes = out; out = head;
    edges.forEach(function (e) {
      var dx = e.x2 > e.x1 ? (e.x2 - e.x1) / 2 : 60;
      var x2 = e.x2 > e.x1 ? e.x2 : e.x2 + NW;
      var d = e.x2 > e.x1 ? 'M' + e.x1 + ',' + e.y1 + ' C' + (e.x1 + dx) + ',' + e.y1 + ' ' + (e.x2 - dx) + ',' + e.y2 + ' ' + e.x2 + ',' + e.y2
        : 'M' + e.x1 + ',' + e.y1 + ' C' + (e.x1 + dx) + ',' + e.y1 + ' ' + (x2 + dx) + ',' + e.y2 + ' ' + x2 + ',' + e.y2;
      out.push('<path d="' + d + '" fill="none" stroke="' + (e.got ? '#8dff7a' : '#2a2e35') + '" stroke-width="' + (e.got ? 1.4 : 1) + '"' + (e.got ? ' marker-end="url(#ah)"' : ' stroke-dasharray="3 4" marker-end="url(#ahd)"') + ' opacity="' + (e.got ? 0.75 : 0.8) + '"/>');
    });
    out = out.concat(nodes);
    out.push('</svg>');
    return { svg: out.join(''), found: found, total: total, pct: total ? Math.round(1000 * found / total) / 10 : 0 };
  };
})(typeof window !== 'undefined' ? window : globalThis);
