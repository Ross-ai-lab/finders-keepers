/* World data: build, items, skills, base upgrades, people, places, chapters. */

FK.config({
  startLoc: 'street',
  statCap: 5,
  heatMax: 10,
  gridSize: 20,
  knacks: {
    hands: { name: 'Hands', desc: 'Three years of carrying everything you own. Muscle +2.', fx: ['muscle+2'] },
    head: { name: 'Head', desc: 'You fix things. Furnaces, alarms, people\'s opinions of you. Brains +2.', fx: ['brains+2'] },
    mouth: { name: 'Mouth', desc: 'You have talked your way out of more doorways than you have walked out of. Mouth +2.', fx: ['mouth+2'] },
    shadow: { name: 'Shadow', desc: 'You know which stair creaks before you step on it. Sneak +2.', fx: ['sneak+2'] }
  },
  habits: {
    prybar: { name: 'Pry bar', desc: 'A crowbar wrapped in a towel. Muscle +1.', fx: ['muscle+1', 'give:crowbar'] },
    meter: { name: 'Pocket meter', desc: 'A cheap multimeter from the depot days. Brains +1.', fx: ['brains+1', 'give:multimeter'] },
    badge: { name: 'Old badge', desc: 'A county inspector\'s badge you never gave back. Mouth +1.', fx: ['mouth+1', 'give:badge'] },
    picks: { name: 'Pick set', desc: 'Your old apprentice set, the good tension wrench. Sneak +1.', fx: ['sneak+1', 'give:lockpicks'] }
  },
  mystery: {
    clues: ['clue_food', 'clue_notes', 'clue_photo', 'clue_heater', 'clue_paper', 'clue_ledger', 'clue_hinge', 'clue_voice'],
    strong: ['clue_heater', 'clue_hinge'],
    suspect: 2,
    know: 3
  },
  identity: {
    order: ['turncoat', 'brute', 'successor', 'fixer', 'ghost'],
    weights: {
      brute: { force: 1 },
      successor: { science: 1, gadget: 1 },
      fixer: { talk: 1 },
      ghost: { sneak: 1, flee: 1 },
      turncoat: { betray: 2 }
    }
  }
});

/* ------------------------------------------------------------------ items */
FK.item('crowbar', { name: 'Crowbar', cat: 'tool', desc: 'Wrapped in a hotel towel so it doesn\'t clank. Opens doors, windows and arguments.' });
FK.item('multimeter', { name: 'Multimeter', cat: 'tech', desc: 'Yellow, scuffed, one probe taped. It has never lied to you, which is more than most things.' });
FK.item('badge', { name: 'Old badge', cat: 'key', desc: 'COUNTY BUILDING INSPECTOR, with a photo of a man who is technically you, ten years and thirty pounds ago.' });
FK.item('lockpicks', { name: 'Pick set', cat: 'key', desc: 'Your apprentice set in a leather roll. The tension wrench is older than some of your shoes.' });
FK.item('canned', { name: 'Canned beans', cat: 'food', desc: 'Three cans. Dinner, breakfast, and an emergency.' });
FK.item('flask', { name: 'Steel flask', cat: 'oddity', desc: 'Dented, monogrammed with an R, and full of something that makes the air around the cap shimmer. Also: flammable.' });
FK.item('medkit', { name: 'Big medical kit', cat: 'med', desc: 'A veterinary kit sized for something much bigger than a person. The sutures are for horses. They work on people too.' });
FK.item('zipties', { name: 'Zip ties', cat: 'tool', desc: 'A bag of heavy-duty cable ties. Good for cables. Good for wrists.' });
FK.item('calendar', { name: 'Calendar page', cat: 'doc', desc: 'June, torn from a kitchen calendar.', read: 'JUNE. Most squares are full of a mother\'s handwriting: shifts, dentist, "Summer — driving test?". One square is circled three times in red: 14. FAMILY DINNER. PHONES IN THE BOWL. Under it, in a different, worse handwriting: "door code = this, backwards, because I\'m not an idiot."' });
FK.item('photo', { name: 'Family photo', cat: 'doc', desc: 'Five people on a couch. An old man, a woman, a man, a teenage girl, a boy. Nobody is quite smiling.', read: 'On the back, in pencil: "6/14. Last normal one." The longer you hold it, the less sure you are that the boy was looking at the camera when you picked it up.' });
FK.item('spray', { name: 'Pepper spray', cat: 'weapon', desc: 'Pink canister from a teenager\'s nightstand. Expired. Probably still mean.' });
FK.item('fluid', { name: 'Green vial', cat: 'tech', desc: 'A capped vial of thick green liquid that glows when you shake it. Labelled, in marker: PORTAL JUICE — DON\'T DRINK (AGAIN).' });
FK.item('raygun_broken', { name: 'Dead ray pistol', cat: 'weapon', desc: 'An alien-looking pistol with a cracked coil. It is very heavy for something that does nothing.' });
FK.item('raygun', { name: 'Ray pistol', cat: 'weapon', desc: 'Repaired. It hums. When you fire it at a brick, the brick is not there any more.' });
FK.item('portalgun', { name: 'Portal gun', cat: 'tech', desc: 'The thing everybody wants. It fits your hand like it has been waiting for one.' });
FK.item('stunner', { name: 'Stun baton', cat: 'weapon', desc: 'Workbench special: a car battery\'s worth of bad manners in a broom handle.' });
FK.item('decoy', { name: 'Claim decoy', cat: 'tech', desc: 'A box that blinks. To a certain kind of machine it looks like a very important owner.' });
FK.item('ledger', { name: 'Grey hand unit', cat: 'tech', desc: 'A Reclaimer device like a compass with a ledger screen. The needle always points at whoever owns the most of what is near.' });
FK.item('frostcell', { name: 'Frost cell', cat: 'tech', desc: 'A power cell that is colder than it should be. It frosts your pocket and powers almost anything.' });
FK.item('tollcoin', { name: 'Toll seal', cat: 'key', desc: 'A Tollkeeper transit seal. Waved at the right clerk, it opens gates. Waved at the wrong one, it opens questions.' });
FK.item('cloak', { name: 'Ash cloak', cat: 'tool', desc: 'A Cinderfall cloak woven from something that would rather not burn.' });
FK.item('grenade', { name: 'Flash charge', cat: 'weapon', desc: 'Cinderfall flash charge. One use. Loud enough to end most conversations.' });
FK.item('lantern', { name: 'Spore lantern', cat: 'oddity', desc: 'A glass ball with drifting light inside. It shows what was in a room before you came in.' });
FK.item('hinge', { name: 'Humming hinge', cat: 'oddity', desc: 'A heavy brass door hinge with no door. It hums one note, and the note is familiar.' });
FK.item('paper', { name: 'Signed paper', cat: 'doc', desc: 'The legal paper from the garage wall.', read: 'QUITCLAIM, INTERDIMENSIONAL (FORM 9-NULL). "I, the undersigned, relinquish all right, title, claim and signature in the property listed below, including the dwelling, the garage, its contents, devices, vehicles, and all attached interests, to no one, effective immediately." Below, the list goes on for four pages. At the bottom, in the same terrible handwriting as everything else here: "finders keepers. — R."' });
FK.item('core', { name: 'Caretaker core', cat: 'tech', desc: 'A fist-sized crystal that used to be a very rude house. It is warm. It does not talk now.' });

/* ------------------------------------------------------------------ skills (4 branches x 4 tiers) */
FK.skill('tinker', { name: 'Tinkering', branch: 'science', tier: 1, desc: 'Rick\'s spare parts start making sense. Brains +1.', fx: ['brains+1'] });
FK.skill('portal', { name: 'Portal Theory', branch: 'science', tier: 2, after: 'tinker', desc: 'You understand coordinates, calibration and why the gun hates you. Opens portal tricks.' });
FK.skill('rig', { name: 'Jury-Rig', branch: 'science', tier: 3, after: 'portal', desc: 'Turn anything into a weapon or a trap. Opens gadget solutions.' });
FK.skill('pocket', { name: 'Pocket Geometry', branch: 'science', tier: 4, after: 'rig', desc: 'Rooms with more inside than outside stop being a metaphor. Brains +1.', fx: ['brains+1'] });

FK.skill('brawler', { name: 'Brawler', branch: 'force', tier: 1, desc: 'You remember how to hit people. Muscle +1.', fx: ['muscle+1'] });
FK.skill('takedown', { name: 'Takedown', branch: 'force', tier: 2, after: 'brawler', desc: 'Put someone down without killing them. Opens capture options in fights.' });
FK.skill('menace', { name: 'Menace', branch: 'force', tier: 3, after: 'takedown', desc: 'People believe what you say you\'ll do. Opens threats.' });
FK.skill('tough', { name: 'Hard to Kill', branch: 'force', tier: 4, after: 'menace', desc: 'One more wound before you drop. Max health +1.', fx: ['maxhp+1'] });

FK.skill('silver', { name: 'Silver Tongue', branch: 'talk', tier: 1, desc: 'Mouth +1.', fx: ['mouth+1'] });
FK.skill('haggle', { name: 'Haggler', branch: 'talk', tier: 2, after: 'silver', desc: 'Everything has a price, and it\'s lower than they said. Opens trades.' });
FK.skill('liar', { name: 'Straight Face', branch: 'talk', tier: 3, after: 'haggle', desc: 'Big lies, small tells. Opens bluffs.' });
FK.skill('command', { name: 'Command', branch: 'talk', tier: 4, after: 'liar', desc: 'People in trouble do what a calm voice says. Opens recruiting and orders.' });

FK.skill('lightfeet', { name: 'Light Feet', branch: 'shadow', tier: 1, desc: 'Sneak +1.', fx: ['sneak+1'] });
FK.skill('lockwork', { name: 'Lockwork', branch: 'shadow', tier: 2, after: 'lightfeet', desc: 'Your apprentice years come back. Any lock, given time.' });
FK.skill('ghoststep', { name: 'Ghost Step', branch: 'shadow', tier: 3, after: 'lockwork', desc: 'Slip through gaps nobody else sees.' });
FK.skill('ambush', { name: 'Ambush', branch: 'shadow', tier: 4, after: 'ghoststep', desc: 'Strike first from nowhere. Opens ambushes.' });

/* ------------------------------------------------------------------ base upgrades (garage) */
FK.upgrade('bench', { name: 'Workbench', cost: 2, desc: 'Clear Rick\'s bench of beer cans and half-dead robots. Opens crafting.' });
FK.upgrade('bunk', { name: 'Bunk and pantry', cost: 2, desc: 'A cot, a camp stove, a shelf of cans. Max health +1.', fx: ['maxhp+1'] });
FK.upgrade('cell', { name: 'Holding cell', cost: 3, desc: 'Chain-link, a bolt, a bucket. Prisoners stay put and talk more.' });
FK.upgrade('calib', { name: 'Portal calibrator', cost: 3, req: 'skill:tinker | brains>=3 | item:multimeter', desc: 'Re-zero the map screen. Scrambled coordinates come clean.' });
FK.upgrade('grid', { name: 'Security grid', cost: 4, req: 'up:bench', desc: 'Tripwires, cameras, a dead-man switch on the lights. Calms you down. Heat -2.', fx: ['heat-2'] });
FK.upgrade('damper', { name: 'Signal damper', cost: 4, req: 'clue_ledger | skill:portal', desc: 'A copper cage around the house\'s fuse box. Certain machines lose the scent.' });

/* ------------------------------------------------------------------ people (reputation, captives, "will remember that") */
FK.rep('dolores', { name: 'Dolores Pike' });
FK.rep('caretaker', { name: 'The Caretaker' });
FK.rep('ninetytwo', { name: 'Ninety-Two' });
FK.rep('foreman', { name: 'The Foreman' });
FK.rep('reclaimers', { name: 'The Reclaimers' });
FK.rep('vell', { name: 'Assessor Vell' });
FK.rep('tollkeepers', { name: 'The Tollkeepers' });
FK.rep('brass', { name: 'Brass' });
FK.rep('syndicate', { name: 'The Cinder Syndicate' });
FK.rep('knuckle', { name: 'Knuckle' });
FK.rep('bloom', { name: 'The Bloom' });
FK.rep('sporeling', { name: 'The Sporeling' });
FK.rep('jerry', { name: 'The wet man' });
FK.rep('officer', { name: 'Officer Banks' });
FK.rep('family', { name: 'Someone in this house' });

/* ------------------------------------------------------------------ places */
FK.loc('street', { name: 'Cul-de-sac', scene: 'rain', text: [] });

FK.loc('house', {
  name: 'The House', scene: 'rain',
  text: [
    'Two storeys of somebody else\'s life. Rain on the windows, a fridge humming in the dark, photos you keep not looking at.',
    { if: 'heat>=7', t: 'Every car that turns into the street makes your stomach drop. Someone is going to walk in. It is a matter of when.' },
    { if: 'heat>=4 & heat<7', t: 'You have been noticed, a little. Curtains move across the street when you pass the window.' },
    { if: 'heat<4', t: 'For now, nobody knows you\'re here. Keep it that way.' },
    { if: 'caretaker_off', t: 'The smoke detector\'s little red light is dark. The house is quieter without it, and somehow lonelier.' },
    { if: 'cap:dolores', t: 'Somewhere upstairs, the neighbour you tied up is very quiet. You try not to think about that.' },
    { if: 'ch==2', t: 'The garage door stands open behind the kitchen. Green light leaks under it at odd hours.' }
  ],
  travel: [
    { to: 'garage', label: 'Go into the garage', req: 'garage_open' }
  ],
  wait: { text: 'You lie on the couch with your boots on and listen to the house. Nothing walks in. This time. You sleep in pieces, and wake a little steadier.', fx: ['heat-1', 'hp+1'] }
});

FK.loc('garage', {
  name: 'The Garage', scene: 'garage', base: true,
  text: [
    'Concrete, oil, ozone. A workbench crowded with half-finished things, a car under a tarp, a map screen on the wall that hums when you look at it.',
    { if: 'gun_ready', t: 'The portal gun sits on its hook, charged, its glass core lit like a held breath.' },
    { if: '!gun_ready', t: 'The portal gun hangs on its hook, dark. Something in it is broken or empty.' },
    { if: 'captives>=1 & up:cell', t: 'Your prisoners sit behind the chain-link in the corner and watch you work.' },
    { if: 'captives>=1 & !up:cell', t: 'Your prisoners are zip-tied to the shelving in the corner. It is not a good long-term plan.' },
    { if: 'up:grid', t: 'Your security grid ticks over quietly: every door, every window, every shadow on the drive.' }
  ],
  travel: [
    { to: 'house', label: 'Back into the house' },
    { to: 'reach', label: 'Portal: Pallid Reach', req: 'gun_ready & dest:reach & ch==2' },
    { to: 'cinder', label: 'Portal: Cinderfall', req: 'gun_ready & dest:cinder & ch==2' },
    { to: 'drift', label: 'Portal: the Drift', req: 'gun_ready & dest:drift & ch==2' }
  ],
  wait: { text: 'You sit on an upturned bucket and wait for your hands to stop shaking. The garage ticks as it cools. Nobody comes through the door, or the wall, or the air.', fx: ['heat-1', 'hp+1'] }
});

FK.loc('reach', {
  name: 'Pallid Reach', scene: 'snow',
  text: [
    'Snow that falls sideways and never lands. A sky the colour of an old filling. Far off, a glass toll gate glows across a frozen crossroads of portals.',
    { if: 'seen:r_camp', t: 'Grey tents stand by the gate: the camp of the people in grey. Their mast hums when the wind drops.' },
    { if: 'settled_reach', t: 'You have done what you came to do here. The Reach does not miss you.' }
  ],
  travel: [{ to: 'garage', label: 'Portal home' }]
});

FK.loc('cinder', {
  name: 'Cinderfall', scene: 'fire',
  text: [
    'A city that has been on fire for four hundred years and has stopped minding. Streets of black glass, flames on the rooftops like weather, and everyone selling something.',
    { if: 'brass_contact', t: 'Brass\'s stall glows at the end of Slag Row. Business as usual, which here means arson.' },
    { if: 'settled_cinder', t: 'Your business here is settled, one way or another.' }
  ],
  travel: [{ to: 'garage', label: 'Portal home' }]
});

FK.loc('drift', {
  name: 'The Drift', scene: 'spore',
  text: [
    'Islands of fungus float in green air. Spores drift up from everything like slow sparks. It is very quiet. It feels like somewhere you have been before.',
    { if: 'settled_drift', t: 'The Drift has settled around what you did here.' }
  ],
  travel: [{ to: 'garage', label: 'Portal home' }]
});

FK.dest('reach', { name: 'Pallid Reach', loc: 'reach', x: 0.22, y: 0.32, color: '#bfe6ff', desc: 'A frozen toll crossroads. Cold, bureaucratic, crowded with grey tents.' });
FK.dest('cinder', { name: 'Cinderfall', loc: 'cinder', x: 0.76, y: 0.28, color: '#ff7a2f', desc: 'A city permanently on fire and a market for anything. Rick sold things here.' });
FK.dest('drift', { name: 'The Drift', loc: 'drift', x: 0.52, y: 0.74, color: '#8dff9a', desc: 'Floating fungus and quiet light. Coordinates scrambled on purpose.' });

/* ------------------------------------------------------------------ chapters */
FK.chapter(1, {
  title: "Squatter's Rights", start: 'c1_rain',
  summary: [
    { if: 'entry_back', t: 'You walked in through a back door somebody had left open for you.' },
    { if: 'entry_lock', t: 'You picked the front lock in the rain like a professional.' },
    { if: 'entry_window', t: 'You came in through a broken window, which the house has not forgotten.' },
    { if: 'entry_trellis', t: 'You climbed in through a teenager\'s bedroom window.' },
    { if: 'entry_key', t: 'You came in with the neighbour\'s spare key.' },
    { if: 'entry_morning', t: 'You waited out the night in the car port and walked in at dawn.' },
    { if: 'gd_code', t: 'You opened the garage with its own code.' },
    { if: 'gd_force', t: 'You opened the garage the hard way.' },
    { if: 'gd_hack', t: 'You talked the keypad into it with a multimeter.' },
    { if: 'gd_caretaker', t: 'The house itself opened the garage for you.' },
    { if: 'gd_vent', t: 'You went into the garage through a vent, like a raccoon with ambitions.' },
    { if: 'gd_prisoner', t: 'Your prisoner opened the garage for you.' },
    { if: 'rep:dolores>=2', t: 'Dolores Pike, across the street, thinks you belong here.' },
    { if: 'rep:dolores<=-2', t: 'Dolores Pike, across the street, is watching you and writing things down.' },
    { if: 'cap:dolores', t: 'Dolores Pike is tied up in a bedroom upstairs.' },
    { if: 'caretaker_off', t: 'The Caretaker is offline.' },
    { if: 'rep:caretaker>=2 & !caretaker_off', t: 'The Caretaker has decided you are tolerable.' },
    { if: 'rep:caretaker<=-1 & !caretaker_off', t: 'The Caretaker does not like you, and says so.' },
    { if: 'cap:ninetytwo', t: 'The boy in grey is your prisoner.' },
    { if: 'dead:ninetytwo', t: 'The boy in grey is dead.' },
    { if: 'clues>=2', t: 'Something in this house does not add up, and you have started counting.' }
  ]
});
FK.chapter(2, {
  title: 'Portal Season', start: 'c2_garage',
  summary: [
    { if: 'axis:reach=allied', t: 'Pallid Reach: the Tollkeepers count you as a friend.' },
    { if: 'axis:reach=deal', t: 'Pallid Reach: you made a deal with the people in grey.' },
    { if: 'axis:reach=ruined', t: 'Pallid Reach: the toll gate is a crater.' },
    { if: 'axis:reach=quiet', t: 'Pallid Reach: you came, you saw, you left no mark.' },
    { if: 'axis:cinder=partner', t: 'Cinderfall: Brass calls you partner.' },
    { if: 'axis:cinder=cheated', t: 'Cinderfall: Brass knows you cheated him.' },
    { if: 'axis:cinder=burned', t: 'Cinderfall: you burned down a stall in a city that is already on fire, and people still noticed.' },
    { if: 'axis:cinder=quiet', t: 'Cinderfall: you owe nobody, and nobody owes you.' },
    { if: 'axis:drift=friend', t: 'The Drift: the Bloom grew a little face that looks like yours.' },
    { if: 'axis:drift=burned', t: 'The Drift: you set it on fire.' },
    { if: 'axis:drift=harvested', t: 'The Drift: you stripped it for parts.' },
    { if: 'axis:drift=quiet', t: 'The Drift: you left it as you found it.' },
    { if: 'ninetytwo_recruit', t: 'Ninety-Two sleeps on a camp bed in your garage.' },
    { if: 'jerry_sheltered', t: 'There is a wet man living on your couch.' },
    { if: 'early_visit', t: 'You made too much noise. Somebody followed it home.' },
    { if: 'captives>=2', t: 'You are holding several prisoners. The garage smells like it.' },
    { if: 'kills>=2', t: 'You have killed more than once now. It gets easier, which is the problem.' },
    { if: 'mystery>=2', t: 'You think you know where the family went. You wish you didn\'t.' },
    { if: 'mystery==1', t: 'You have a theory about the family. It is a bad one.' }
  ]
});
FK.chapter(3, { title: 'Owner Occupied', start: 'c3_door', summary: [] });

/* ------------------------------------------------------------------ deaths */
FK.death('default', 'Your body gives out. The house goes on humming without you.');
