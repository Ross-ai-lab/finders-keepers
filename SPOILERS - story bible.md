# SPOILERS — Finders Keepers story bible

> Ross: do not open this file. Everything about the plot lives here and nowhere else.
> Builders: this is the single source of truth for plot, twists, characters and the
> ending matrix. The README, commit messages and chat stay plot-free.

---

## 1. The truth (what really happened)

### 1.1 Why the Smiths are gone

Rick Sanchez found out he was being hunted by **the Reclaimers**: a crew of survivors
from universes that Ricks wrecked (dead Citadel worlds, Cronenberged timelines,
abandoned "shelf" realities). They are mostly Mortys and Smiths who outlived their own
Ricks. Their leader is a hard, forty-something Morty called **the Foreman**. Their
weapon is not a gun but a ledger: **the Deed Engine**, a device that tracks things by
*ownership*. Everything a Rick owns carries his "claim signature". Follow the claims,
find the Rick.

Rick's answer was very Rick: **he stopped owning things.** He legally and physically
abandoned the house, the garage, the portal gun and everything in them — an
interdimensional quitclaim. Then he folded the whole family into **the Fold**: a pocket
dimension anchored *inside the house itself*, behind the walls, keyed to a humming
device in the basement disguised as the water heater (**the Anchor**).

The Smiths are not dead. **They never left the house.** They live in the Fold,
which overlaps the real house like a second skin. From inside, the house is grey and
silent and slightly too large. They can see out a little; they can't come out without
breaking the Fold and lighting up Rick's claim signature again.

### 1.2 The second half of the trick: you are bait

An empty, unowned house is suspicious. The Deed Engine can still find a *gap* in the
ledger shaped like a Rick. So Rick **left the back door unlocked on purpose**, so that
somebody would wander in and *claim* the place. Under the old cosmic rule Rick wrote
into the abandonment ("finders keepers"), whoever claims abandoned Rick property takes
on its claim signature. To the Deed Engine, **the new owner looks like Rick.**

Hollis is a decoy. Every Reclaimer scout, every bounty hunter, every bill collector
the Smiths' lives attracted, now walks toward *Hollis*. Rick picked the squatter's
odds over his family's. He does not feel great about it. He also does not feel *bad*
enough about it to stop.

### 1.3 The Caretaker

The house runs a rude, half-disabled security intelligence Rick left behind: **the
Caretaker**. Officially it "came with the house". Actually it is Rick's eyes outside
the Fold. It reports on Hollis to Rick at night (through the Anchor's hum). It is
also, slowly, starting to like Hollis, which is not in its spec.

### 1.4 The noises

The night noises — footsteps upstairs, the fridge opening, a TV turning itself on to
a cooking show — are the Smiths. The Fold thins at night, and they slip partly into
the real house (mostly Jerry, for snacks; sometimes Morty, who leaves notes; once
Summer, who is furious about her room). "The owner could walk back in at any moment"
is literally true, every night.

### 1.5 The three portal destinations (preset on the abandoned gun)

Rick's gun still holds three preset coordinates. Each matters to the hunt.

1. **Pallid Reach** (snow). A frozen customs moon where the **Tollkeepers**, a
   bureaucratic insect-like species (Gromflomite cousins), run a toll gate on a
   portal crossroads. The Reclaimers have a **forward camp** here. This is where the
   Deed Engine's relay sits. Clash-heavy. Captive: a Reclaimer scout Morty,
   **Ninety-Two**; a Tollkeeper clerk, **Assessor Vell**.
2. **Cinderfall** (fire). A city that is always on fire and doesn't mind; a black
   market run by the **Cinder Syndicate**. Rick's fence was a lava-cooled broker
   called **Brass**. You can sell things here — including the gun, the Caretaker's
   core, captives, or the address of the house. Captive: a Syndicate leg-breaker,
   **Knuckle**.
3. **The Drift** (spore glow). A quiet floating-fungus world run by the **Bloom**, a
   slow collective mind. Rick hid the **Fold's spare key** here (the **Hinge**), with
   a memory of the family's last dinner stored in the spores. Puzzle-heavy, the
   mystery world. Captive: a Bloom **Sporeling**.

### 1.6 Why the mystery is solvable

Clues (any three of these give "suspicious"; the Anchor plus two others, or the
Hinge memory, give "knows"):

- `clue_food` — food disappears; the fridge is restocked with Jerry's favourite yogurt.
- `clue_notes` — Morty's notes in a cereal box ("please don't sit in grandpa's chair").
- `clue_photo` — the family photo in the hall changes slightly between visits.
- `clue_heater` — the "water heater" in the basement hums a chord and has no pipes.
- `clue_paper` — in the garage: Rick's signed interdimensional quitclaim deed.
- `clue_ledger` — the Reclaimers' Deed Engine shows the house's claim moving to *you*.
- `clue_hinge` — the Bloom's stored memory of the last dinner, inside the house, in grey.
- `clue_voice` — the Caretaker slips and says "he says" instead of "I say".

Mystery level is computed (0 none, 1 suspicious with 2+ clues, 2 knows when the
Anchor or Hinge clue is held plus at least 2 more). Every ending stays reachable at
mystery level 0; knowing only *adds* options (return the gun to the Fold, open the
Fold, confront the Caretaker).

---

## 2. The player character

**Hollis Grady**, 41. Fixed name and past. Apprentice locksmith at nineteen, long-haul
driver at twenty-five, laid off at thirty-eight when the depot automated. His rented
apartment burned (not his fault; the landlord's wiring) and the insurance was the
landlord's. He has drifted for three years, squatting in foreclosed and vacation homes,
leaving each one cleaner than he found it. He has a rule: *never a house with a dog,
never a house with photos still up.* This house has photos still up. It is raining.

Alone. No romance. Can become a real villain.

**Build** (chosen at start, framed as "what kept you alive on the road"):

- Knack: **Hands** (+2 Muscle), **Head** (+2 Brains), **Mouth** (+2 Mouth),
  **Shadow** (+2 Sneak).
- Road habit (+1 stat and a starting item): **Pry bar** (Muscle, crowbar),
  **Pocket meter** (Brains, multimeter), **Old badge** (Mouth, fake badge),
  **Pick set** (Sneak, lockpicks).

Stats start at 1 and cap at 5. Skill points come from milestones (6 to 8 per run),
never enough for the whole tree.

---

## 3. Cast

| Character | Who they really are | Can become |
|---|---|---|
| **The Caretaker** | Rick's eyes; rude house AI | Friend, tool (reprogrammed), destroyed, sold |
| **Dolores Pike** | Retired neighbour, ex-court stenographer, watches the street; knew Beth | Ally (alibi), informer (calls police/Reclaimers), harmed |
| **Ninety-Two** | Reclaimer scout Morty, 15, tired, hates the Foreman a little | Captive, recruit, killed, released, sold |
| **The Foreman** | Reclaimer leader, adult Morty | Killed, captured, bargained with, fooled |
| **Assessor Vell** | Tollkeeper clerk, by-the-book | Bribed, captured, killed, ally |
| **Brass** | Cinder Syndicate broker, Rick's fence | Partner, betrayer, robbed, killed |
| **Knuckle** | Syndicate leg-breaker | Killed, captured, hired |
| **The Bloom** | Spore collective of the Drift | Friend, burned, robbed |
| **Wrong Jerry** | A Jerry from a destroyed universe who stumbles through a stray portal looking for "his" house | Sheltered, thrown out, used as decoy |
| **Rick (behind the walls)** | Hidden in the Fold; appears in this slice only as notes, the Caretaker's slip, and (if you open the Fold or return the gun) one line in the epilogue | — |

Jerry, Morty and Summer are only *traces* in this slice (noises, notes, yogurt). Beth
appears in the Hinge memory.

---

## 4. Chapter structure of the slice

### Chapter 1 — "Squatter's Rights" (the house)

Arrive in the rain. Get in (6 ways). Explore rooms as storylets in any order. Survive
the first close calls (heat rises with noise and risk). The Caretaker wakes up. Find a
way into the sealed garage (6 ways: keypad code puzzle from clues, force, hack, sweet-
talk the Caretaker, crawl the vent, let the Reclaimer scout open it and jump him).

Chapter 1 closes when you're in the garage. Chapter summary axes: **how you got in**,
**who knows you're here** (Dolores: ally / hostile / unaware), **the Caretaker**
(friendly / hostile / offline).

### Chapter 2 — "Portal Season" (garage + three destinations + house events)

The garage becomes base. Repair the gun (several ways). Base upgrades with scrap.
Portal map: Pallid Reach, Cinderfall, the Drift (the Drift needs a calibration first:
dial puzzle, Portal Theory skill, Brass's coordinates, or the Caretaker). House events
keep coming between trips (noises, Dolores, police, Wrong Jerry, Reclaimer scouting).

Chapter 2 closes when two destinations have been "settled" (each has a settling
storylet), or when heat hits 10 (forced: the visitors come early). Summary axes: per
destination outcome, captives held, companions.

### Chapter 3 — "Owner Occupied" (the climax at the house)

Someone walks in. **Who** comes depends on grudges (the faction you hurt most), with
the Reclaimers as default. Five visitor variants:

- **Reclaimers** (the Foreman and crew; they followed the Deed Engine to "Rick").
- **Tollkeepers** (if you robbed/shot up Pallid Reach; they come to collect a "toll").
- **Cinder Syndicate** (if you cheated Brass; they come for the debt or the gun).
- **The Bloom** (if you burned the Drift; they come slowly, quietly, to grow over the house).
- **Wrong Smiths** (if you sheltered Wrong Jerry and he brought his family to "their" house).

Each variant: arrival scene, standoff with multiple solutions (kill, capture, talk,
trick, flee, betray — handing over the gun or the house or the truth), and a cost. Then
**the aftermath in the garage**: decide the gun and the house. Then the assembled ending.

---

## 5. Ending matrix (slice) — as built

Core ending = **Climax × Identity × Gun × House** (four independent axes), plus an
epilogue assembled from ~70 conditional paragraphs. Early exits stand alone.

- **Climax** (how the night of chapter 3 went; set by the standoff choice, weighted ×3 in the identity tally):
  `killed`, `captured`, `talked`, `tricked`, `fled`, `soldout` (gave the visitors something
  that wasn't yours: the family, Ninety-Two, Jerry, the house, the gun).
- **Identity** (dominant approach over the whole run): `brute` (The Landlord), `successor`
  (The New Rick), `fixer` (The Fixer), `ghost` (The Ghost in the House), `turncoat` (The Turncoat; betrayal counts double).
- **Gun**: `kept`, `sold` (needs a Cinderfall contact), `destroyed`, `given` (to Ninety-Two,
  Dolores, the other Beth, the Noodle Rick, a FREE box — or to the visitors in the climax),
  `returned` (left on the Anchor for the Fold; needs mystery 2).
- **House**: `held`, `burned`, `abandoned` (strike plate back in the sandwich bag: you do to the
  next squatter what was done to you), `opened` (the Fold opens; the Smiths are in the kitchen;
  Rick's first line depends on identity; chapter 4 hook).
- Invalid: gun `returned` + house `burned`. 6 × 5 × 5 × 4 − 30 = **570 core endings**.
- **Early exits (9)**: `walkaway` (leave the house), `lost` (fire the gun at random),
  `arrested` (give yourself up to the detectives), `reclaimer` (join the grey camp as #201),
  `tollclerk` (junior assessor at the east booth), `cinderlord` (Brass & Grady), `bloom`
  (let the Drift keep you), `jar` (shrink into the microverse battery as its god),
  `button` (hold the blue button: swap into a universe where Hollis owns the house).
- Total: **579 endings**, each with epilogue variation (prisoners' fate, companions, worlds,
  kills, mystery level, Dolores, Ninety-Two, Caretaker, Brass, Jerry, Biscuit the dog, the jar city…).

### Who walks in (chapter 3 visitor routing, first match wins)

1. **Wrong Smiths** — `jerry_invited`, or Hollis posed as Jerry on the shelter call and sheltered Jerry.
2. **The Bloom** — Drift burned, or harvested with Bloom rep ≤ −4, or Bloom rep ≤ −5.
3. **Cinder Syndicate / Brass** — Cinderfall cheated or burned, Brass rep ≤ −4, or Brass robbed.
4. **Tollkeepers** — the gate ruined, Tollkeeper rep ≤ −4, or Vell killed.
5. **A Rick** (the Noodle Rick) — if Hollis robbed him or sold him to the Syndicate. He sits in the
   recliner and claims the house by "finders keepers" himself; he can be poisoned with the skull bottle,
   trapped in Rick's own chair (it has Rick-proof restraints), talked down with the truth, sold to the
   Reclaimers by Ninety-Two, or sold the claim.
6. **Police** — officer assaulted, detectives portaled away, officer rep ≤ −3, or heat ≥ 9 with the
   electric bill unpaid. The truth (mystery 2: hand on the heater) makes the detective write it up as a gas leak.
7. **Reclaimers** — default. Leader is the Foreman, or a young successor if he was killed/captured/sold.

Ally options in standoffs: Vell's audit, Biscuit the dog, Brass as partner (buys the Reclaimers
as labour, or your debt), Bloom spores (Tollkeepers forget), Tollkeepers invoice Brass, Dolores takes
in the Wrong Smiths, Dolores alibis you to the police, the Caretaker voices the family, Ninety-Two
speaks for you or sells the Rick, Knuckle fights beside you.

After the climax: gun decision → house decision → **prisoners** (freed / kept / recruited /
sold / executed) if anyone is held → ending.

## 6. Ross's guesses log

Record his plot guesses here, unconfirmed and undenied in chat.

- 2026-10-30 (after strong hints, before playing): "Rick did it on purpose, it is his experiment. I come in his house and learn his stuff. He wants that."


---

## 7. Full storylet map

The story content source (`src/story-SPOILERS/`) is canonical for text. This list is the
plan; ids are kept non-descriptive in visible places.

### Chapter 1 (house) — approx. 26 storylets
- Arrival in the rain (forced start, build choice) → entry: back door (unlocked — the
  bait), window (sneak/muscle), front lock (lockpicks / Lockwork), talk to Dolores about
  a spare key (mouth), garage side door (fails, alarms; heat), wait out the rain in the
  car port (flee option — leads to an alternate start the next night).
- Hub rooms: kitchen (food, notes clue, fridge), living room (TV, Rick's chair, photo
  clue), hallway photo (changes), Morty's room (notes, a lab-coat in the closet), Summer's
  room (phone with messages that stop), master bedroom (Beth's horse-surgeon kit = med kit),
  Rick's room/the couch (flask), basement (Anchor, fuse box puzzle), attic (stash, old
  gadgets), front porch (Dolores), backyard (shed, hole with a buried Mr. Meeseeks box? no:
  buried crate of scrap).
- Events: first noise at night (several responses), the Caretaker wakes (befriend,
  threaten, shut off at the fuse box), police patrol (hide, bluff with badge, run),
  Dolores knocks (lie, truth, intimidate, ignore), power cut (fuse puzzle), Ninety-Two's
  first scouting visit (ambush, hide, talk, follow).
- Garage door: keypad puzzle (code = 0-6-1-4... built from the photo's date and Morty's
  note), force with crowbar (Muscle 3), hack with multimeter (Brains 3), Caretaker opens
  it if friendly, crawl the vent (Sneak 3 or Light Feet), let Ninety-Two open it.

### Chapter 2 (garage + worlds) — approx. 50 storylets
- Garage: first look (quitclaim clue), the gun (repair: portal fluid from the attic, or
  Brains 3, or Brass, or Caretaker), workbench, holding cell, upgrade bay, the map.
- Pallid Reach: arrival in snow, the toll gate (pay, bluff, sneak, fight), the Reclaimer
  camp (scout it, raid, parley), the Deed relay (sabotage, steal, read it — clue_deed),
  the frozen convoy (loot vs. rescue), settle: Reach outcome.
- Cinderfall: arrival in fire, Brass's stall (deal, threaten, fence), the Syndicate
  pit (fight Knuckle; kill/capture/throw), the sale (what you sell), a fire on a fire
  (rescue vs. loot), settle: Cinderfall outcome.
- The Drift: calibration, arrival in spore glow, the Bloom's speaking-garden (talk,
  burn, steal), the Hinge vault puzzle (symbol order), the memory of the dinner (clue),
  settle: Drift outcome.
- House events in chapter 2: the noises escalate (fridge), Wrong Jerry falls out of a
  stray portal, Dolores again (alibi or betrayal), Ninety-Two returns (if alive/free),
  Caretaker's slip, interrogating captives.

### Chapter 3 (climax) — approx. 20 storylets
- Visitor arrival ×5, standoff ×5 (each with 5–7 visible-by-build options), the cost,
  aftermath in the garage (gun + house choices), the ending.

### Added in the width pass

- House (ch 1–2): bathroom cabinet (wet toothbrush; the skull bottle that later poisons a Rick),
  the mail pile (metal "claim transfer" notice; paying the electric bill keeps police away),
  the 3 a.m. house phone (the Shelter for Displaced Jerrys — posing as Jerry invites the Wrong Smiths),
  the pizza for "Jerry" every Thursday, Biscuit the neighbour's dog (barks at the heater; can become a guard).
- Garage (ch 2): the jars (a microverse battery city that worships Hollis; exit `jar`), the blue button
  (moves the house three feet, swaps Hollis with a lab-coat Hollis for a second, or turns him blue; held
  down: exit `button`), a visit from the Noodle Rick (how to hide a family; how to open it).
- Companions: Ninety-Two and Jerry at one table (a household), Biscuit.
- Worlds: the Tollkeepers' Lost Property Office (47 seizures from Rick; claim them with the quitclaim and
  inherit his tolls), the Temple of the Cold Flame in Cinderfall (blessing, give or steal blue fire),
  the Mirror Pool in the Drift (learn from five alternate Hollises — one per identity).
- Puzzles: garage keypad (code is the dinner date 6/14 backwards: 4160), basement fuse box (lights-out),
  scrambled coordinates dial (TRIANGLE, FISH, EYE — shown on the map screen first), the Hinge vault
  (seating order from the photo: FLASK Rick, HORSE Beth, TIE Jerry, PHONE Summer, PENCIL Morty).
- Pressure tuning: every portal trip out raises exposure by 1 (the green flash is visible from the
  street). Exposure 10 in chapter 2 = the visitors come early. If a run stalls (turn ≥ 130 with fewer
  than two worlds settled) a forced scene, "They Come Anyway", ends chapter 2. A failed first attempt
  at the gun always unlocks a second attempt (this was a soft-lock).
