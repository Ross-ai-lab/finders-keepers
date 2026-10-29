# Squatter's Rights — Rick & Morty Text RPG

**Use when** designing, writing, building or testing the Rick & Morty choice-story RPG (a drifter who takes over Rick's abandoned house and garage), or deciding anything about its story, systems or scope.

A personal fan game for Ross: a text-first choice RPG set in the Rick & Morty universe. Private repository `Ross-ai-lab/squatters-rights`, checked out at `Ross/Github/Squatters Rights/`. Every ruling below is his, from the 2026-10-29 questionnaire and chat. Status: design settled, nothing built yet.

## Spoilers

- **`the-plot-lives-only-in-the-story-bible`** — The plot, twists and what really happened to the Smiths live in ONE file, `SPOILERS - story bible.md` in this folder, which he does not open. Never write plot into chat, this README, file names he sees, or a reply. This README holds design rules only.
- **`never-confirm-his-guesses`** — When he floats a plot idea ("Rick comes back and kills you"), note it in the story bible and neither confirm nor deny it in chat; a yes or no spoils it either way.

## Premise and character

- **`the-smiths-are-gone-not-dead`** — Rick and his family have vanished from this universe; their fate is the central mystery. The house and garage are free for the player to take over.
- **`play-the-drifter`** — The player is a fixed character with a name and past: a drifter who squats in empty houses and picks the wrong one. Ordinary at the start, alone, no romance, and free to become a real villain.
- **`other-universes-may-visit`** — Other universes' Ricks, Mortys and Smiths may appear.
- **`survival-tension-and-clashes`** — The core is science survival and tension: the constant feeling that the owner could walk back in at any moment. The other half is clashes through the portal: fighting, killing or capturing aliens in other dimensions. Jokes stay, as seasoning.
- **`tone-dry-plain-no-gore-horror`** — Dry jokes now and then, violence described plainly, tension and dread allowed, no gore horror ([profile](../../../Knowledge/ross-rustam-profile.md)).

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

- **`ship-one-wide-slice-first`** — First build: the house, the garage and three portal destinations with a full set of chapter endings, playable on its own. Say plainly that it is one slice ([profile](../../../Knowledge/ross-rustam-profile.md) game shelf).
- **`validate-every-route-by-traversal`** — Check every storylet requirement, target and ending with an out-of-page traversal script before handing it over ([reports.md](../../../Knowledge/reports.md) `validate-a-branching-narrative-by-real-traversal`).

## Sources

- [HTML Reports/Story Game Questionnaire.html](../../../HTML%20Reports/Story%20Game%20Questionnaire.html) — the questionnaire behind these rulings.
