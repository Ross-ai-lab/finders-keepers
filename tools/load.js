// Loads the engine and every story file into a fresh sandbox and returns FK.
// Used by the route checker and the build script.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const ENGINE = path.join(ROOT, 'src', 'engine', 'engine.js');
const STORY = path.join(ROOT, 'src', 'story-SPOILERS');

function storyFiles() {
  return fs.readdirSync(STORY).filter(f => f.endsWith('.js')).sort().map(f => path.join(STORY, f));
}

function loadGame() {
  const ctx = vm.createContext({ console });
  for (const f of [ENGINE, ...storyFiles()]) {
    vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
  }
  return ctx.FK;
}

module.exports = { loadGame, storyFiles, ROOT, ENGINE, STORY };
