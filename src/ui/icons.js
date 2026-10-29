/* Finders Keepers — small inline SVG icons drawn in code. */
(function (G) {
  'use strict';
  var I = G.ICONS = {};
  function svg(body, vb) {
    return '<svg viewBox="' + (vb || '0 0 24 24') + '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }

  /* approaches */
  I.approach = {
    force: svg('<path d="M7 11V7.5a1.5 1.5 0 0 1 3 0V11"/><path d="M10 10V6.5a1.5 1.5 0 0 1 3 0V10"/><path d="M13 10V7a1.5 1.5 0 0 1 3 0v4"/><path d="M16 9.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1.5A5.5 5.5 0 0 1 6 14.5V12a1.5 1.5 0 0 1 3 0"/>'),
    science: svg('<path d="M9 3h6"/><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 15h9"/>'),
    gadget: svg('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"/>'),
    talk: svg('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>'),
    sneak: svg('<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.6"/>'),
    flee: svg('<circle cx="14" cy="4.5" r="1.8"/><path d="M8 21l3-6 3 2v4"/><path d="M6 12l3-4 4 1 2 4 3 1"/>'),
    betray: svg('<path d="M14.5 3.5 20.5 9.5 10 20H4v-6z"/><path d="M12 6l6 6"/><path d="M4 20l4-4"/>'),
    neutral: svg('<circle cx="12" cy="12" r="3.2"/>')
  };
  I.approachName = { force: 'Force', science: 'Science', gadget: 'Gadget', talk: 'Talk', sneak: 'Sneak', flee: 'Flee', betray: 'Betray', neutral: '' };

  /* item categories */
  I.cat = {
    tool: svg('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.4-.4-2.6z"/>'),
    tech: svg('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/><rect x="9.5" y="9.5" width="5" height="5"/>'),
    key: svg('<circle cx="7.5" cy="12" r="4"/><path d="M11.5 12H21M17 12v3M20 12v2.5"/>'),
    food: svg('<rect x="6" y="5" width="12" height="15" rx="2"/><path d="M6 9h12M6 16h12"/>'),
    oddity: svg('<path d="M12 3l2.6 5.6L20 9.5l-4 4 1 5.5-5-2.7-5 2.7 1-5.5-4-4 5.4-.9z"/>'),
    med: svg('<rect x="4" y="7" width="16" height="12" rx="2"/><path d="M9 7V5h6v2M12 10v6M9 13h6"/>'),
    weapon: svg('<path d="M3 14h11l3-3h4v4h-4l-1 1v4h-3v-3H3z"/><path d="M7 14v-3h5"/>'),
    doc: svg('<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 11h7M9 14h7M9 17h5"/>')
  };
  I.catColor = { tool: '#d9b98a', tech: '#7ad8ff', key: '#ffd36b', food: '#c2d68a', oddity: '#b59cff', med: '#ff8f8f', weapon: '#ff7a6b', doc: '#e9e4d8' };

  /* puzzle glyphs */
  I.glyph = {
    TRIANGLE: svg('<path d="M12 3 22 20H2z"/>'),
    CIRCLE: svg('<circle cx="12" cy="12" r="8.5"/>'),
    WAVE: svg('<path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 3.5-3 5-1"/>'),
    FISH: svg('<path d="M3 12c4-6 11-6 15 0-4 6-11 6-15 0z"/><path d="M18 12l4-4v8z"/><circle cx="8" cy="11" r=".8"/>'),
    STAR: svg('<path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.3l6.6-.8z"/>'),
    EYE: svg('<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>')
  };

  I.heart = '♥';
  I.svg = svg;
})(typeof window !== 'undefined' ? window : globalThis);
