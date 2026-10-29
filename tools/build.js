#!/usr/bin/env node
// Bundles the engine, the story and the interface into ONE self-contained,
// offline file: "Finders Keepers.html" at the repo root.
//
// The story is stored base64-encoded inside the page, so opening the file in a
// text editor doesn't spoil it at a glance.
'use strict';
const fs = require('fs');
const path = require('path');
const { loadGame, ROOT, ENGINE } = require('./load');

const UI = path.join(ROOT, 'src', 'ui');
const OUT = path.join(ROOT, 'Finders Keepers.html');
const read = f => fs.readFileSync(f, 'utf8');

const FK = loadGame();
const db = FK.exportDB();
const b64 = Buffer.from(db, 'utf8').toString('base64');

const loader = `(function(){var b=atob("${b64}"),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);FK.importDB(JSON.parse(new TextDecoder().decode(u)));})();`;

const scripts = [
  read(ENGINE),
  loader,
  read(path.join(UI, 'icons.js')),
  read(path.join(UI, 'fx.js')),
  read(path.join(UI, 'audio.js')),
  read(path.join(UI, 'puzzles.js')),
  read(path.join(UI, 'flowchart.js')),
  read(path.join(UI, 'ui.js'))
].join('\n;\n');

if (/<\/script/i.test(scripts)) throw new Error('a script contains "</script", which would break the single-file page');

const html = read(path.join(UI, 'shell.html'))
  .replace('/*{{STYLE}}*/', () => read(path.join(UI, 'style.css')))
  .replace('/*{{SCRIPTS}}*/', () => scripts);

fs.writeFileSync(OUT, html);
const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log(`Built "${path.basename(OUT)}" (${kb} KB, ${FK.DB.order.length} storylets, ${FK.endingKeys().length} endings)`);
