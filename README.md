# Finders Keepers — Rick & Morty Text RPG

**Use when** designing, writing, building or testing the Rick & Morty choice-story RPG (a drifter who takes over Rick's abandoned house and garage), or deciding anything about its story, systems or scope.

A personal fan game for Ross: a text-first choice RPG set in the Rick & Morty universe. Private repository `Ross-ai-lab/finders-keepers`, checked out at `Ross/Github/Finders Keepers/`. Every ruling below is his, from the 2026-10-29 questionnaire and chat. Status: **first playable slice built** (see [Build status](#build-status)).

## Spoilers

- **`the-plot-lives-only-in-the-story-bible`** — The plot, twists and what really happened to the Smiths live in ONE file, `SPOILERS - story bible.md` in this folder, which he does not open. Never write plot into chat, this README, file names he sees, or a reply. This README holds design rules only.
- **`story-text-lives-in-a-spoiler-folder`** — The scene text itself lives in `src/story-SPOILERS/`. The folder name is the warning: don't open it before playing. Inside the built game the story is stored encoded, so opening the HTML in a text editor doesn't spoil it at a glance.
- **`never-confirm-his-guesses`** — When he floats a plot idea ("Rick comes back and kills you"), note it in the story bible and neither confirm nor deny it in chat; a yes or no spoils it either way.

## Premise and character

- **`the-smiths-are-gone-not-dead`** — Rick and his family have vanished from this universe; their fate is the central mystery. The house and garage are free for the player to take over.
- **`play-the-drifter`** — The player is a fixed character with a name and past: a drifter who squats in empty houses and picks the wrong one. Ordinary at the start, alone, no romance, and free to become a real villain.
- **`other-universes-may-visit`** — Other universes' Ricks, Mortys and Smiths may appear.
- **`survival-tension-and-clashes`** — The core is science survival and tension: the constant feeling that the owner could walk back in at any moment. The other half is clashes through the portal: fighting, killing or capturing aliens in other dimensions. Jokes stay, as seasoning.
- **`tone-dry-plain-no-gore-horror`** — Dry jokes now and then, violence described plainly, tension and dread allowed, no gore horror ([his media rules](../../Ross%20Profile/Ross.html#me-media)).

## Width doctrine

- **`width-beats-everything`** — Judge every design choice by branching width: distinct routes and endings, not length. A choice that funnels back into one path is the failure he quits over.
- **`multiply-outcomes-never-funnel`** — Track independent outcome axes (who you became, what you did with the portal gun, who is still alive and others) and assemble endings from their combination, so a few options per axis multiply into hundreds of endings.
- **`gate-scenes-by-state-not-position`** — Build content as storylets unlocked by state (flags, stats, items, reputation), not by a fixed tree position, so runs differ in order and mix. Use a custom storylet engine, not ink, because ink is shaped for trees.
- **`every-problem-has-several-solutions`** — Each obstacle offers force, science, talk, betrayal, flight or a gadget; the build decides which ones are visible.
- **`show-the-branches-found`** — After each chapter show a flowchart of found branches, unfound ones as `???`, and the share of the story discovered.
- **`clues-never-gate-progress`** — The mystery is solvable from clues, but every ending stays reachable without solving it.

## Systems

- **`systems-he-asked-for`** — Inventory grid, a portal map of destinations, puzzles, a home base to build up, stats and skills, a skill tree (learning Rick's science). Fights are story choices, and an enemy can be killed or captured. No timed choices. Death reloads the last save. Show "X will remember that" when a consequence lands. Difficulty fair: bad choices hurt.
- **`no-images`** — No generated or scene images: the workspace has no image generator ([image.md](../../../Knowledge/image.md) `no-scripted-image-generator-exists`). Visuals come from code: procedural moving backgrounds (rain, fire, snow, portal glow), the map and the interface. Sound: ambient beds and music from the audio pipeline ([audio.md](../../../Knowledge/audio.md)).
- **`long-pages-are-fine`** — He asked for fairly long text per screen (5 of 7 toward book pages).

## Scope

- **`ship-one-wide-slice-first`** — First build: the house, the garage and three portal destinations with a full set of chapter endings, playable on its own. Say plainly that it is one slice ([game shelf](../../../Knowledge/game-development.md) game shelf).
- **`validate-every-route-by-traversal`** — Check every storylet requirement, target and ending with an out-of-page traversal script before handing it over ([reports.md](../../../Knowledge/reports.md) `validate-a-branching-narrative-by-real-traversal`).

## His questionnaire answers (2026-10-29)

The raw answers behind the rules above, kept here because they existed only in chat. Skipped questions are left out.

| Topic | His answer |
|---|---|
| Feeling at the end | Clever (outsmarted it) and powerful (became strong) |
| Mood | Middle of hopeful-to-bleak; fear level "doesn't matter" within the no-gore-horror rule |
| Zombies | Fine either way |
| Violence | Described plainly |
| Humour | Dry jokes now and then |
| Stakes | His own life and the people close to him |
| Story shape | A home base he keeps returning to |
| Ending | Many endings, all decided by him |
| Length | One complete story (about 2 to 3 hours for one run) |
| Replay | Yes, but only if the plot is genuinely wide: "I care about WIDENESS more than ANYTHING ELSE" |
| Loved | Baldur's Gate 3, Undertale |
| Liked | Detroit: Become Human |
| Why The Walking Dead worked | The characters, hard choices, choices that came back later, survival tension |
| Why he quit story games | Choices didn't matter; boring characters |

## Working from a cloud session

- **`this-repo-stands-alone`** — In a cloud checkout only this repo exists. The `../../../Knowledge/...` links point into the private workspace repo `Ross-ai-lab/ai-workspace` and are dead here; every rule they back is already stated in full above.
- **`no-local-tools-in-the-cloud`** — The workspace's local tools (`just`, Stable Audio music, the screenshot wall, vendored binaries) do not exist in a cloud session. Make sound with procedural WebAudio in the page, and test with Node plus a headless browser.
- **`push-every-finished-piece`** — Commit and push to `main` after each finished piece, so the local checkout at `Ross/Github/Finders Keepers/` can pull it.

## Build status

**Playable now:** `Finders Keepers.html` at the repo root. One self-contained offline file: double-click it, it opens in any modern browser, no internet needed. It is **one slice**, as `ship-one-wide-slice-first` asks: the house, the garage, three portal destinations, three chapters, and a full set of endings for the slice. Later chapters are not written yet.

| | In this slice |
|---|---|
| Scenes (storylets) | 118 |
| Choices | 498, with 532 distinct outcomes |
| Endings | 579: 570 core endings built from four independent axes, plus 9 early exits. Every ending also has an epilogue assembled from what you did, so the same core ending reads differently run to run (the route checker sees well over 1,500 distinct ending texts per pass). |
| Builds | 16 starting builds (4 knacks × 4 road habits) that decide which solutions you see |
| Systems | inventory grid, portal map, 4 puzzle types, home base with 6 upgrades, 4 stats, a 16-skill tree in 4 branches, reputation with "X will remember that" notes, prisoners, companions, an exposure meter (how close someone is to walking in) |
| Length | a full run is roughly 60–90 minutes of reading (about 13,000 words and 70 choices); an early exit can come much sooner. The whole slice is about 43,000 words. |
| Visuals | drawn in code on a canvas: moving rain, garage sparks, snow, fire and embers, drifting spore light, portal glow, the portal map, a base diagram, branch flowcharts |
| Sound | made live in the page with WebAudio: ambient beds per place, a slow generative score, a heartbeat when exposure is high, thunder, sparks and effect sounds. Starts on first click; toggle in the top bar. |

Not done yet: chapters after the slice; named voice acting or recorded music (sound is all procedural); a dev page with live reload (edit the source, then rebuild).

## How the engine works

A custom storylet engine (`src/engine/engine.js`), not ink. It is plain JavaScript with no page code in it, so the same engine runs in the browser and in Node for the route checker.

- **Storylets, not a tree.** Each scene declares where it can happen (a place and chapter) and a requirement written as a small expression over state, e.g. `muscle>=3 & (item:crowbar | skill:brawler) & !alarm`. At a place, the hub shows every scene whose requirement is met, so runs differ in order and mix. Some scenes are *forced*: they fire by themselves when their requirement becomes true (a knock at the door when exposure gets high).
- **Every choice is gated by state too.** Choices carry an approach (force, science, gadget, talk, sneak, flee, betray) and a requirement. Choices your build can't use are hidden, and the page tells you how many approaches your build can't see. A choice can have conditional outcomes (the same action goes differently depending on your stats or history), or be a puzzle with a win and a lose outcome.
- **Effects** are short strings: `+flag`, `heat+2`, `give:crowbar`, `rep:someone-1` (shows "X will remember that"), `cap:someone` (take a prisoner), `kill:someone`, `axis:gun=kept`, `learn:skill`, `note:...`.
- **Endings multiply.** The ending is assembled from four independent axes: how the final night went (six outcomes), who you became (five identities, computed from which approaches you used most over the whole run), what you did with the portal gun (five) and the house (four). Each axis contributes its own paragraphs; then dozens of epilogue paragraphs switch on and off from flags, reputations, prisoners and the fate of each place.
- **Discovery is tracked across runs** in the browser. After each chapter the page draws a flowchart of that chapter's scenes and branches: found ones show their text, unfound ones show `???`, with the percentage of the chapter and of the whole story discovered.
- **Saves.** Autosave at the start of every scene and on every hub; three manual slots. Death sends you back to the autosave at the start of the scene you died in.

## Files

```
Finders Keepers.html        the built game (open this)
SPOILERS - story bible.md   the plot (don't open)
src/engine/engine.js        storylet engine: state, requirements, effects, endings
src/story-SPOILERS/         all scene text and world data (don't open before playing)
src/ui/                     page shell, style, canvas visuals, WebAudio sound, puzzles, flowchart, interface
tools/build.js              bundles everything into the one HTML file
tools/traverse.js           route checker (Node)
tools/browser-check.js      headless playtest (Playwright + Chromium)
```

## How to run the checks

Needs Node 18 or newer. The browser check also needs Playwright with Chromium (`npm i -D playwright && npx playwright install chromium` on a normal machine; it is preinstalled in the cloud sessions).

```bash
node tools/build.js
```

Rebuilds `Finders Keepers.html` from `src/`. Run it after any edit.

```bash
node tools/traverse.js
```

The route checker, under a minute. It first checks statically that every requirement parses and that every flag, item, skill, upgrade, prisoner, place and target a scene needs is actually produced somewhere. Then it plays thousands of runs across all 16 builds (deaths reload, like in the game), steers extra runs toward anything not yet reached (and away from things that would send the story elsewhere), and finally steers runs toward every one of the 579 endings. It fails, listing ids only, if any scene, choice outcome, travel route, upgrade, skill, chapter or ending is unreachable, or if any run gets stuck with nothing to do. Use `--quick` for a faster, less thorough pass and `--seed=N` to vary the runs.

```bash
node tools/browser-check.js
```

Opens the built file in headless Chromium and plays it through the real interface: title, new game, ~70 steps of play, autosave, page reload and Continue, a manual save slot, every panel, a death and reload, a puzzle, the chapter flowchart, an ending, and a phone-width layout check. Fails on any console or page error. Add `--shots=DIR` to save screenshots.

`npm test` runs all three in order.

## Sources

- [HTML Reports/Story Game Questionnaire.html](../../../HTML%20Reports/Story%20Game%20Questionnaire.html) — the questionnaire behind these rulings.
