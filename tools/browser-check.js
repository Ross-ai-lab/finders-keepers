#!/usr/bin/env node
// Headless playtest of the built single-file game.
// Loads "Finders Keepers.html", plays through the real interface, saves,
// reloads the page, continues, dies and reloads the last save, opens every
// panel, reaches a chapter flowchart and an ending — and fails on any
// console error or page error.
//
//   node tools/browser-check.js [--shots=DIR]   (DIR gets a few screenshots)
'use strict';
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'Finders Keepers.html');
const shotsArg = process.argv.find(a => a.startsWith('--shots='));
const SHOTS = shotsArg ? shotsArg.slice(8) : null;
if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true });

const errors = [];
let passed = 0;
function ok(cond, msg) {
  if (!cond) { errors.push('FAILED: ' + msg); console.log('  ✗ ' + msg); }
  else { passed++; console.log('  ✓ ' + msg); }
}

(async () => {
  if (!fs.existsSync(FILE)) { console.error('Build first: node tools/build.js'); process.exit(1); }
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 } });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push('console error: ' + m.text()); });
  page.on('pageerror', e => errors.push('page error: ' + e.message));
  const url = 'file://' + FILE;
  const shot = async name => { if (SHOTS) { await page.waitForTimeout(900); await page.screenshot({ path: path.join(SHOTS, name + '.png') }); } };

  console.log('Finders Keepers browser check');
  await page.goto(url);
  await page.waitForTimeout(400);
  ok(await page.locator('.logo').isVisible(), 'title screen loads');
  ok(await page.evaluate(() => Object.keys(window.FK.DB.storylets).length > 50), 'story data decoded inside the page');
  await shot('01-title');

  // new game
  await page.click('text=New game');
  ok(await page.locator('text=Your knack').isVisible(), 'build screen shows');
  await page.locator('.opt').nth(1).click();   // Head
  await page.locator('.opt').nth(5).click();   // Pocket meter
  await page.click('text=Walk into the rain');
  await page.waitForTimeout(200);
  ok((await page.locator('h1.title').textContent()) === 'The Wrong House', 'first scene shows');
  ok(await page.locator('.choices .choice').count() >= 2, 'choices are listed');
  await shot('02-first-scene');

  // play through the real interface
  let steps = 0, sawHub = false, sawResult = false, sawPuzzle = false;
  for (; steps < 70; steps++) {
    const type = await page.evaluate(() => window.FKUI.state().screen.type);
    if (type === 'death') { await page.click('text=Load last save'); continue; }
    if (type === 'chapter' || type === 'ending') break;
    if (await page.locator('.puzzle').count()) { sawPuzzle = true; await page.click('.puzzle >> text=Give up'); continue; }
    if (type === 'result') { sawResult = true; await page.click('text=Continue'); continue; }
    if (type === 'story') {
      const n = await page.locator('.choices .choice').count();
      await page.locator('.choices .choice').nth(steps % n).click();
      continue;
    }
    if (type === 'hub') {
      sawHub = true;
      const cards = await page.locator('.cards .card').count();
      if (cards) await page.locator('.cards .card').nth(steps % cards).click();
      else await page.locator('.travel .btn').first().click();
    }
  }
  ok(sawHub && sawResult, `played ${steps} steps through the interface (hub and results seen)`);
  await shot('03-mid-game');

  // autosave + reload + continue
  const before = await page.evaluate(() => JSON.parse(localStorage.getItem('fk_auto')).state);
  ok(!!before && !!before.screen, 'autosave written to the browser');
  await page.reload();
  await page.waitForTimeout(400);
  ok(await page.locator('text=Continue').first().isVisible(), 'Continue offered after reload');
  await page.locator('.title-actions >> text=Continue').click();
  await page.waitForTimeout(200);
  const after = await page.evaluate(() => window.FKUI.state());
  ok(after && after.turn === before.turn && after.loc === before.loc && JSON.stringify(after.screen) === JSON.stringify(before.screen), 'reloaded game matches the save');

  // manual save slot round trip
  await page.click('#tb-nav >> text=Save');
  await page.locator('.save-row').nth(1).locator('text=Save here').click();
  ok(await page.evaluate(() => !!localStorage.getItem('fk_slot_1')), 'manual save slot written');
  await page.click('#modal-close');

  // every panel opens without errors
  for (const name of ['Bag', 'Map', 'Base', 'Skills', 'Journal', 'Branches', 'Save']) {
    await page.click('#tb-nav >> text=' + name);
    await page.waitForTimeout(120);
    ok(await page.locator('#modal').isVisible(), `${name} panel opens`);
    if (name === 'Map') await shot('04-map');
    if (name === 'Bag') await shot('05-bag');
    await page.keyboard.press('Escape');
  }

  // death reloads the last save
  await page.evaluate(() => {
    const S = window.FKUI.state();
    S.loc = 'house'; S.stats.muscle = 1; S.skills = {}; S.items = S.items.filter(i => i !== 'spray');
    S.screen = { type: 'story', sid: 'e_police' };
    localStorage.setItem('fk_auto', JSON.stringify({ v: 1, when: Date.now(), state: S }));
    window.FKUI.render();
  });
  await page.locator('.choices .choice', { hasText: 'Jump him' }).click();
  ok(await page.evaluate(() => window.FKUI.state().screen.type === 'death'), 'a fatal choice kills you');
  await shot('06-death');
  await page.click('text=Load last save');
  await page.waitForTimeout(150);
  ok(await page.evaluate(() => window.FKUI.state().screen.sid === 'e_police'), 'death reloads the last save (start of that scene)');

  // a puzzle renders and can be solved
  await page.evaluate(() => {
    const S = window.FKUI.state();
    S.loc = 'house'; S.ch = 1; S.flags.garage_open = 0; delete S.flags.garage_open;
    S.screen = { type: 'story', sid: 'h_garage_door' };
    window.FKUI.render();
  });
  await page.locator('.choices .choice', { hasText: 'Enter a code' }).click();
  ok(await page.locator('.puzzle .keypad').isVisible(), 'keypad puzzle renders');
  await shot('07-puzzle');
  for (const d of '4160') await page.locator('.keypad .btn', { hasText: new RegExp('^' + d + '$') }).click();
  await page.locator('.keypad >> text=OK').click();
  await page.waitForTimeout(700);
  ok(await page.evaluate(() => ['result', 'chapter'].includes(window.FKUI.state().screen.type)), 'solving the puzzle advances the story');

  // chapter end flowchart
  await page.evaluate(() => { while (window.FKUI.state().screen.type === 'result') window.FKUI.act({ type: 'continue' }); });
  ok(await page.evaluate(() => window.FKUI.state().screen.type === 'chapter'), 'chapter end screen reached');
  ok(await page.locator('.flowbox svg').count() === 1, 'chapter flowchart drawn');
  ok(await page.locator('.flowbox svg text', { hasText: '???' }).count() > 0, 'unfound branches show as ???');
  ok(await page.locator('.pct').first().isVisible(), 'discovery percentage shown');
  await shot('08-chapter-flowchart');
  await page.locator('text=Begin chapter 2').click();
  await page.waitForTimeout(150);
  ok((await page.locator('h1.title').textContent()) === 'The Garage', 'chapter 2 begins in the garage');
  await shot('09-garage');

  // run to an ending inside the page with the real engine, then show it
  await page.evaluate(() => {
    const FK = window.FK;
    let S = FK.clone(window.FKUI.state()), n = 0;
    while (S.screen.type !== 'ending' && n++ < 4000) {
      if (S.screen.type === 'death') { S = FK.clone(window.FKUI.state()); continue; }
      const acts = FK.actions(S);
      const pref = acts.filter(a => a.type !== 'wait');
      const pool = pref.length ? pref : acts;
      FK.act(S, pool[Math.floor(Math.random() * pool.length)]);
    }
    const ui = window.FKUI.state();
    Object.keys(ui).forEach(k => delete ui[k]); Object.assign(ui, S);
    window.FKUI.render();
  });
  ok(await page.evaluate(() => window.FKUI.state().screen.type === 'ending'), 'an ending is reached and shown');
  ok(await page.locator('.ending-title').isVisible(), 'ending title shows');
  await shot('10-ending');

  // phone width: no horizontal scroll
  await page.setViewportSize({ width: 390, height: 800 });
  await page.waitForTimeout(200);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  ok(overflow <= 1, 'no horizontal page scroll at phone width');
  await shot('11-phone');

  await page.waitForTimeout(300);
  await browser.close();

  const consoleErrors = errors.filter(e => !e.startsWith('FAILED'));
  ok(consoleErrors.length === 0, 'no console or page errors' + (consoleErrors.length ? ': ' + consoleErrors.join(' | ') : ''));
  const failed = errors.filter(e => e.startsWith('FAILED')).length + (consoleErrors.length ? 1 : 0);
  console.log(`\n${passed} passed, ${failed ? failed + ' failed' : 'none failed'}`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
