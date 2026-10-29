/* Chapter 2 — Portal Season: the garage as base, the house between trips,
 * prisoners, visitors, and the ways to walk out of the story early. */

/* ============================================================== garage */

FK.S({
  id: 'c2_garage', ch: 2, loc: 'garage', sub: true, title: 'The Garage',
  text: [
    'It is bigger inside than it should be. Not impossibly bigger. Just enough that your eyes keep trying to correct it.',
    'A long workbench under a pegboard of tools, half of which you recognise and half of which look like they would recognise you. Beer cans. A robot arm clamped to the bench, twitching in its sleep. A car under a tarp that is not shaped like a car. Shelves of jars with things in them that move when you aren\'t looking.',
    'On the wall, a big flat screen shows a map that isn\'t of anywhere: dark space, a few bright points connected by thin green lines, coordinates scrolling under each. Three of the points pulse. The rest are greyed out.',
    'On a hook by the map hangs a gun. Not a real gun; a toy-shaped thing with a glass bulb on top, cracked and dark. Next to it, pinned to the plasterboard with a screwdriver driven straight into the wall, a stapled legal document.',
    'And every surface has a skin of dust, except the stool in front of the bench, which someone has been sitting on. Recently.',
    { if: 'door_broken', t: 'Behind you, the steel door you broke hangs off its hinges. It won\'t lock again. Anyone in the kitchen can see straight in.' }
  ],
  choices: [
    { t: 'Lock the garage behind you. This is the safe room now.', a: 'sneak', req: '!door_broken', fx: ['+garage_locked', 'heat-1'],
      res: 'The locks clunk home behind you. For the first time in three years you are in a room that nobody else can get into. You sit on the stool. You breathe. It\'s warm. Then you remember that somebody else has been sitting on this stool, and the feeling sours a little.', next: 'hub' },
    { t: 'Push the car against the broken door as a barricade.', a: 'force', req: 'door_broken', fx: ['+garage_locked', 'hp-1'],
      res: 'The car under the tarp rolls on its own like it wants to help, which is worse than if it didn\'t. You wedge it across the doorway. Your back will complain about this tomorrow. But nothing is coming through that door without you hearing it.', next: 'hub' },
    { t: 'Leave the door open. You want a way out more than a way to lock in.', a: 'flee', fx: ['+garage_open_exit'],
      res: 'You prop the door with a toolbox. Rule three, the unwritten one: never sleep in a room with one way out. The garage feels less like a vault and more like a garage. Good. Vaults are for things that can\'t leave.', next: 'hub' },
    { t: 'Ask the house what this place is.', a: 'talk', req: 'caretaker_awake & !caretaker_off', fx: ['rep:caretaker+1'],
      res: '"The garage," says a speaker in the ceiling, "is where he worked. Where he works. Worked." A pause. "Don\'t touch the car. Don\'t touch the jars. Don\'t touch the gun, because it\'s broken and you\'ll blow your arm off, and then I\'ll have to clean it up, and I have no arms." Another pause. "Welcome to the garage, I suppose."', next: 'hub' }
  ]
});

FK.S({
  id: 'g_paper', ch: 2, loc: 'garage', title: 'The Paper on the Wall', teaser: 'A legal document pinned with a screwdriver.',
  text: [
    'Four stapled pages, pinned through the top corner with a screwdriver driven an inch into the plasterboard. It is a legal form. It is not from any court you have heard of. The header says QUITCLAIM, INTERDIMENSIONAL (FORM 9-NULL) and there is a seal on it that seems to rotate slightly when you tilt your head.',
    'The first line: "I, the undersigned, relinquish all right, title, claim and signature in the property listed below..."',
    'The list is the house. The garage. Everything in them. The car. The gun. The jars. "All devices, vehicles and attached interests." It goes on for four pages. At the bottom, a signature that is mostly a scribble and a single letter R, and under it, in pen: "finders keepers."'
  ],
  choices: [
    { t: 'Read every word. Twice. You used to do insurance paperwork.', a: 'science', fx: ['give:paper', '+clue_paper', 'note:A legal form. Someone gave away the house, the garage and everything in it, to nobody, on purpose. "Finders keepers."'],
      res: 'On the second read you find the clause. Page three, small print: "Claim and signature in abandoned property passes to the first party to take up residence, whose signature shall thereafter be read in place of the undersigned\'s." You read it four more times. "Read in place of." Somebody wanted to stop being the owner of everything here. And somebody has just moved in.', next: 'hub' },
    { t: 'Sign it. Put your own name under his. Make it official.', a: 'betray', fx: ['give:paper', '+signed_claim', 'heat+1', 'rep:family-2'],
      res: 'You find a pen on the bench and write HOLLIS GRADY under the scribble, and the date, in your careful capitals. The seal on the paper turns, once, slowly, all the way round, and stops. The map screen flickers. Somewhere under the house, the heater\'s hum drops one note. The garage feels, for a second, very slightly more yours, and the feeling is like a hand on the back of your neck.', next: 'hub' },
    { t: 'Burn it. You don\'t like papers that make your skin crawl.', a: 'force', req: 'item:flask | item:raygun', fx: ['+paper_burned'],
      res: 'It takes a splash from the flask and a spark from the bench before the paper even agrees to catch. It burns green. It burns for a full minute. When it\'s done the ash spells nothing, but the screwdriver in the wall is warm, and the map screen goes blank and comes back. You get the feeling you\'ve made something cross. You don\'t know what.', next: 'hub' },
    { t: 'Pocket it without reading. Paperwork is how they get you.', a: 'sneak', fx: ['give:paper'],
      res: 'You fold it four times and put it in your inside pocket. It sits there, warm as a hand. You\'ll read it later. Probably. Some things are easier not to know.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_gun', ch: 2, loc: 'garage', title: 'The Gun on the Hook', teaser: 'Cracked, dark, and very important.',
  text: [
    'It is lighter than it looks. A grip like a hair dryer, a short barrel, a glass bulb on top the size of a fist with a crack across it and a dried green crust in the bottom. A dial on the side with a tiny screen that says LOW FLUID and then, after a second, LOW FLUID, IDIOT.',
    'Taped to the grip is a folded square of paper: a manual, of a kind. The first instruction is DON\'T.',
    'This is the thing the boy in grey came through the air with a cheap copy of. This is a door to anywhere. It is broken, and you are a man who fixes things, or a man who knows somebody who does.'
  ],
  choices: [
    { t: 'Pour the green vial from the attic into the bulb.', a: 'gadget', req: 'item:fluid', fx: ['take:fluid', 'give:portalgun', '+gun_ready', 'sp+1'],
      res: 'The crack seals itself as the fluid goes in, like a cut closing in fast motion. The bulb glows. The dial says FULL, and then, as if reluctantly, GOOD JOB. You point it at the far wall and squeeze. A disc of green light opens, swirling, and through it you can see snow falling sideways on a frozen plain. You let go of the trigger. It closes with a pop. You have to sit down.', next: 'hub' },
    { t: 'Strip it down and rebuild the emitter yourself.', a: 'science', req: 'brains>=3 & (item:multimeter | up:bench | skill:tinker)', fx: ['give:portalgun', '+gun_ready', '+gun_rebuilt', 'scrap-1', 'sp+1'],
      res: 'Four hours, a magnifying lamp, and a lot of words you didn\'t know you knew. The crack is not the problem; the crack is a symptom. The fluid line has been pinched, on purpose, by someone who wanted it to look broken. You unpinch it, scrape the crust, top it up with the dregs from three empty jars, and it lights up. You built it back better than it was. You don\'t know how you know that.', next: 'hub' },
    { t: 'Ask the Caretaker to fix it.', a: 'talk', req: 'rep:caretaker>=2 & !caretaker_off', fx: ['give:portalgun', '+gun_ready', 'rep:caretaker+1', '+clue_voice', 'sp+1'],
      res: '"Put it in the drawer under the bench," says the house. You do. Something whirs inside the bench for a long time. "He pinched the line himself," it says while it works. "So nobody would use it. So nobody would come looking for — " It stops. "Done," it says. The drawer opens. The gun is glowing. "Don\'t tell him I did that," it says. Then: "I mean don\'t tell anyone. There isn\'t a him. Go away."', next: 'hub' },
    { t: 'Use the boy\'s grey device to jump-start it.', a: 'gadget', req: 'item:ledger & brains>=2', fx: ['give:portalgun', '+gun_ready', '+gun_unstable', 'sp+1'],
      res: 'The grey compass has a power cell you can get at with a fingernail. You bridge it to the gun\'s fluid pump. Both devices scream. The bulb flashes green, then white, then settles to a sickly glow. The dial says FULL?? with two question marks. It works. It will probably keep working. The question marks bother you.', next: 'hub' },
    { t: 'Read the little manual taped to the grip.', a: 'science', req: '!manual_read', out: [
      { req: 'brains>=2', fx: ['give:portalgun', '+gun_ready', '+manual_read', 'sp+1'], res: 'The manual is three pages of insults and one useful diagram. The diagram shows a pinch-clip on the fluid line. You find the clip. Someone put it there on purpose. You take it off, and the dried crust in the bulb liquefies and glows. The gun hums in your hand. Under DON\'T, in the manual, in smaller writing: "...unless you have to. — R."', next: 'hub' },
      { fx: ['+manual_read', 'heat+1'], res: 'The manual is three pages of insults and one diagram you can\'t make sense of. You fiddle. The gun fires one wild spark that scorches a beer can and sets off a smoke alarm in the house. You\'ll need to come back to this with a clearer head, or better tools.', next: 'hub' }
    ] },
    { t: 'Smack it on the bench like a vending machine.', a: 'force', out: [
      { req: 'muscle>=3', fx: ['give:portalgun', '+gun_ready', '+gun_unstable', 'sp+1'], res: 'You hit it, hard, twice, on the corner of the bench. Something inside goes clink. The bulb flickers green, steadies, glows. Percussive maintenance: the oldest science. The dial says FULL, and then, quite distinctly, OW.', next: 'hub' },
      { fx: ['hp-1'], res: 'You smack it and it smacks back: a spit of green fire that takes the hair off your forearm and leaves a blister the shape of a tiny planet. The gun stays dark. The dial says NO.', next: 'hub' }
    ] }
  ]
});

FK.S({
  id: 'g_gun_retry', ch: 2, loc: 'garage', title: 'The Gun, Second Try', teaser: 'You read the manual. Try again.', once: false,
  req: 'manual_read & !gun_ready',
  text: [
    'The gun lies on the bench where you left it, glass bulb dark, manual open beside it. You have slept on it. You have stared at the diagram until it started to make sense in the way dreams do.',
    'There is a pinch-clip on the fluid line. You are almost sure that\'s the thing.'
  ],
  choices: [
    { t: 'Take your time. Work it step by step.', a: 'science', fx: ['give:portalgun', '+gun_ready', 'heat+1', 'sp+1'],
      res: 'It takes all day. You find the clip, ease it off, clear the crust with a toothpick and a lot of patience. At sunset the bulb glows. You are tired and proud and covered in green stains that will not wash off for a week. Dolores, across the street, has definitely seen the green light through the garage window.', next: 'hub' },
    { t: 'Leave it. You\'ll find another way.', a: 'neutral', res: 'You put it back on the hook. Some days a thing will not be fixed. Rule four, maybe: know when to walk away from a job.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_map', ch: 2, loc: 'garage', title: 'The Map Screen', teaser: 'Three lit points in the dark.',
  text: [
    'Up close, the map screen is warm and smells of dust burning off a heater. Dark space. Hundreds of greyed-out points connected by thin lines, like a subway map of a city that went bankrupt. Three points pulse.',
    'The first is labelled PALLID REACH, with a small snowflake. Under it: TOLLS. COLD. GREY PEOPLE. DON\'T.',
    'The second is CINDERFALL, with a flame. Under it: BRASS OWES ME. OR I OWE BRASS. CHECK.',
    'The third label is scrambled, the letters crawling over each other. The coordinates under it cycle through junk. The symbols in the corner of the screen show the last good readout: a TRIANGLE, then a symbol like a FISH, then an EYE. Someone did this on purpose, too.'
  ],
  choices: [
    { t: 'Copy the two clean coordinates into the gun\'s memory.', a: 'science', fx: ['dest:reach', 'dest:cinder'],
      res: 'The gun\'s dial accepts them with a click each. PALLID REACH. CINDERFALL. Two places that are not this place. Two places where nobody is looking for you, or where somebody very much is. You realise your hand is shaking, and that it is not entirely fear.', next: 'hub' },
    { t: 'Ask the screen, out loud, where the family went.', a: 'talk', fx: ['dest:reach', 'dest:cinder', '+asked_map'],
      res: 'You feel stupid. The screen does not answer. But it zooms, slowly, on its own, out from the three bright points to the whole map: hundreds of greyed-out worlds. Then it zooms all the way in, to a single tiny point labelled HOME. It sits there, pulsing. Then it zooms back out. You copy down the two clean coordinates with a pencil, and don\'t look at HOME again.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_calibrate', ch: 2, loc: 'garage', title: 'The Scrambled Coordinates', teaser: 'Unscramble the third destination.', once: false,
  req: 'seen:g_map & !dest:drift',
  text: [
    'The third destination crawls on the screen, its name a smear of letters, its coordinates a stream of noise. In the corner, the three symbols of the last good readout: TRIANGLE, FISH, EYE.',
    'Under the screen, three brass rings with symbols etched around them, the kind of dial safes had before safes had keypads. Six symbols on each ring.',
    'Whoever scrambled this wanted it hard to reach. Not impossible. Hard.'
  ],
  choices: [
    { t: 'Turn the three rings.', a: 'science', puzzle: { kind: 'dial', target: [0, 3, 5], symbols: ['TRIANGLE', 'CIRCLE', 'WAVE', 'FISH', 'STAR', 'EYE'], prompt: 'Set the three rings to the last good readout.' },
      win: { fx: ['dest:drift', 'sp+1'], res: 'The rings click into place one, two, three. The smeared letters on the screen settle like silt: THE DRIFT. Under it, in the familiar bad handwriting, a note: IF YOU\'RE READING THIS, YOU\'RE EITHER ME OR SOMEONE WHO SHOULD STOP. The coordinates go into the gun.', next: 'hub' },
      lose: { fx: ['hp-1'], res: 'The rings lock, and the dial gives you a jolt through the fingers that leaves your hand numb to the elbow. The letters keep crawling. Not like that.', next: 'hub' } },
    { t: 'Use what you know about portal theory to derive it.', a: 'science', req: 'skill:portal', fx: ['dest:drift', 'sp+1'],
      res: 'It\'s not scrambled, it\'s salted: the same coordinates, with a rolling offset keyed to the time of day. You subtract the offset on the back of an envelope. THE DRIFT. You feel like a genius for nearly a whole minute.', next: 'hub' },
    { t: 'Let the calibrator you built clean it up.', a: 'gadget', req: 'up:calib', fx: ['dest:drift'],
      res: 'Your calibrator hums, clicks, and spits out a strip of paper like a receipt: THE DRIFT, coordinates, and a line at the bottom: "THANK YOU FOR SHOPPING." You stick the strip to the gun with tape.', next: 'hub' },
    { t: 'Ask the Caretaker for the coordinates.', a: 'talk', req: 'rep:caretaker>=3 & !caretaker_off', fx: ['dest:drift', '+clue_voice', 'rep:caretaker+1'],
      res: '"Absolutely not," it says. You wait. "He hid it for a reason." You wait. "...He hid it from THEM, not from you," it says at last, very quietly, and the screen clears. THE DRIFT. "I didn\'t do that. The screen did that. Screens do things."', next: 'hub' },
    { t: 'Plug in the coordinates you bought from Brass.', a: 'talk', req: 'brass_coords', fx: ['dest:drift'],
      res: 'Brass\'s numbers are written on a strip of cooled slag in tiny careful script. You type them in. The screen settles: THE DRIFT. The broker didn\'t cheat you. That is, in its own way, the most alarming thing that has happened this week.', next: 'hub' },
    { t: 'Point the grey compass at the screen and follow its needle.', a: 'gadget', req: 'item:ledger & brains>=3', fx: ['dest:drift', '+clue_ledger'],
      res: 'The needle twitches across the scrambled point and stops. A line of text appears on the compass\'s little ledger screen: THE DRIFT — UNCLAIMED. HELD IN TRUST. Then, under it: TRUSTEE: ...SMITH, B. The coordinates come with it. You don\'t know what "held in trust" means here. You don\'t like it.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_car', ch: 2, loc: 'garage', title: 'The Car Under the Tarp', teaser: 'Not shaped like a car.',
  text: [
    'Under the tarp: a ship. Small, two seats, a cockpit bubble and fins, built out of what looks like three cars, a boat and a toaster, and parked here as if it were an old station wagon. The dash is dark. There is a booster seat in the back, and a lot of empty bottles, and someone\'s retainer in a cup holder.',
    'It doesn\'t fly. It wants to. When you put your hand on it, it purrs, like a cat who thinks you might be the one with the food.'
  ],
  choices: [
    { t: 'Strip it for parts. It isn\'t going anywhere.', a: 'force', fx: ['scrap+4', '+car_stripped', 'rep:caretaker-1'],
      res: 'Copper, coils, a lens the size of a dinner plate, a battery that makes your teeth itch. The ship stops purring. When you\'re done it is a shell under a tarp, and you have the best haul you have had in years, and you feel like you\'ve shot a horse.', next: 'hub' },
    { t: 'Fix it. Make it fly.', a: 'science', req: 'up:bench & (brains>=4 | skill:rig)', fx: ['+car_fixed', 'scrap-2', 'sp+1'],
      res: 'It takes two nights. When you finally close the panel and press the big red button marked GO (DON\'T), the ship lifts six inches off the concrete and hangs there, purring like an engine full of cats. You don\'t open the garage roof. You don\'t need to. You have a way out now, a real one, and that changes how you sleep.', next: 'hub' },
    { t: 'Search the glovebox and the seats.', a: 'sneak', fx: ['give:grenade', 'scrap+1', '+car_searched'],
      res: 'Under the back seat: a sock, a retainer, a lot of crumbs, and a fist-sized sphere with a pin labelled FLASH (LOUD). In the glovebox, a cassette labelled ROAD TRIP MIX — NO JERRY SONGS. You keep the flash charge. You leave the tape. Some things belong to people.', next: 'hub' },
    { t: 'Talk to it. It seems to want that.', a: 'talk', fx: ['+car_friend', 'hp+1'],
      res: '"Hey," you say. The purr changes. You sit in the driver\'s seat and tell it about your truck, the one the depot took, how you used to talk to her on the long nights between Amarillo and anywhere. The ship listens. When you get out, there\'s a warm patch on the seat and a soft ding from the dash, the sound a car makes when you leave the lights on, but kind.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_robot', ch: 2, loc: 'garage', title: 'The Little Robot', teaser: 'It has one job and nobody to do it for.',
  text: [
    'On the bench, among the beer cans: a small robot, the size of a toaster, with two little arms and a single camera eye. It is powered down. When you touch it, it lights up and turns to you.',
    '"What is my purpose?" it asks, in a small, sincere voice.',
    'Nobody answers. Everybody it used to ask is gone.'
  ],
  choices: [
    { t: '"Keep watch. Tell me if anyone comes up the drive."', a: 'gadget', fx: ['+bot_watch', 'heat-1'],
      res: 'It looks at you. It looks at the garage window. "I watch the drive," it says, and walks to the window on its little arms and sits there. It does not move for the rest of the day. "A car," it reports at intervals. "A cat." "A woman, looking." It seems happier than you have ever been.', next: 'hub' },
    { t: '"Your purpose is to be scrap. Sorry."', a: 'force', fx: ['scrap+2', '+bot_scrapped'],
      res: 'It watches you open it up. "Oh," it says. "Oh, okay." You work fast. That is the only kindness you have.', next: 'hub' },
    { t: '"You don\'t need a purpose. Do whatever you like."', a: 'talk', fx: ['+bot_free', 'rep:caretaker+1'],
      res: 'It thinks about that for a long time. "...I would like to sit in the sun," it says finally. You put it in the patch of sun from the garage window. It sits. Later, the Caretaker says, out of nowhere: "That was decent of you." It doesn\'t say anything else.', next: 'hub' }
  ]
});

/* ------------------------------------------------------------- workbench crafting */

FK.S({
  id: 'g_craft_stun', ch: 2, loc: 'garage', title: 'Workbench: Stun Baton', teaser: 'Broom handle, battery, bad manners.',
  req: 'up:bench & scrap>=2',
  text: [
    'A broom handle. A car battery\'s worth of capacitors from the junk box. Copper wire. Electrical tape. A trigger from a garden sprayer. It isn\'t elegant. It doesn\'t need to be.'
  ],
  choices: [
    { t: 'Build it. Something to put people down without killing them.', a: 'gadget', fx: ['scrap-2', 'give:stunner'],
      res: 'The first test makes a crack like a bullwhip and leaves a black spot on the concrete. You wrap the handle twice more. It is ugly. It is a choice you now have that you didn\'t before.', next: 'hub' },
    { t: 'Build it heavier. Something to end arguments.', a: 'force', fx: ['scrap-2', 'give:stunner', '+stunner_lethal'],
      res: 'You bypass the limiter. The test crack is not a crack, it is a bang, and the black spot on the concrete is a hole. This one won\'t just put people down. You hang it by the door, where it seems to watch you.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_craft_ray', ch: 2, loc: 'garage', title: 'Workbench: The Dead Pistol', teaser: 'BROKEN. DON\'T FIX.',
  req: 'up:bench & item:raygun_broken',
  text: [
    'The alien pistol from the attic, on the bench, under the lamp. The coil is cracked. The sticker says BROKEN. DON\'T FIX. — R.',
    'It needs a new coil, or a power source strong enough not to care.'
  ],
  choices: [
    { t: 'Wind a new coil from scratch.', a: 'science', req: 'brains>=3 | skill:tinker', fx: ['take:raygun_broken', 'give:raygun', 'scrap-1'],
      res: 'Copper from the shed, a mandrel from the drawer, two hours and a steady breath. The pistol hums. You test it on a paint can and the paint can is not there any more. Not burnt. Not melted. Just gone, and a small round clean hole in the wall behind where it was.', next: 'hub' },
    { t: 'Jam a frost cell in it and hope.', a: 'gadget', req: 'item:frostcell', fx: ['take:raygun_broken', 'take:frostcell', 'give:raygun'],
      res: 'The cell slides in, frost blooms over the grip, and the pistol wakes with a sound like a held note on a violin. It works. It\'s cold in your hand. You decide not to ask it why it was broken.', next: 'hub' },
    { t: 'Leave it broken. He said don\'t.', a: 'neutral', fx: ['scrap+1', '+respected_sticker', 'rep:family+1'],
      res: 'You strip the cracked coil for copper and put the pistol back in its case. Somebody in this house knew more about it than you. You\'ll take their word, this once.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_craft_decoy', ch: 2, loc: 'garage', title: 'Workbench: A Box That Lies', teaser: 'Make the grey compass point somewhere else.',
  req: 'up:bench & item:ledger & (brains>=3 | skill:rig)',
  text: [
    'The grey compass always points at you. It\'s a ledger, the boy said: it tracks owners. Which means the owner is a signal. Which means a signal can be faked.',
    'You open it up. Inside, among the boards, a small glowing crystal labelled, in a hand that isn\'t Rick\'s, REFERENCE: CLAIM SIGNATURE.'
  ],
  choices: [
    { t: 'Build a box that broadcasts your signature somewhere else.', a: 'gadget', fx: ['give:decoy', 'scrap-1', 'sp+1'],
      res: 'A tin box, the crystal, a frost cell or a car battery, a blinking LED because you are only human. When you switch it on, the compass needle swings off you and points at the box. You laugh out loud in the empty garage. Now you can put "the owner" wherever you like.', next: 'hub' },
    { t: 'Use the crystal to read who else this compass has tracked.', a: 'science', fx: ['+clue_ledger', '+ledger_read', 'note:The grey compass has a log. Before me, it tracked one owner here: the old man. The log for him stops three weeks ago, "signature relinquished." The next line is me.'],
      res: 'The ledger has a log. Hundreds of entries, worlds and names, and one address you know. This one. OWNER: SANCHEZ, R. — SIGNATURE RELINQUISHED, three weeks and two days ago. And the next line, the next morning: OWNER: UNKNOWN (NEW CLAIM). Then a week of that. Then today: OWNER: GRADY, H. You sit with that for a while.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_craft_trap', ch: 2, loc: 'garage', title: 'Workbench: The House Remembers', teaser: 'Turn the house itself into a trap.',
  req: 'up:bench & (skill:rig | up:grid) & scrap>=2',
  text: [
    'You know this house now: every board, every door, every window. Somebody is going to walk in. When they do, they should walk into you.'
  ],
  choices: [
    { t: 'Wire the hallway to drop anybody who comes in the front.', a: 'gadget', fx: ['scrap-2', '+house_trapped'],
      res: 'Pressure plate under the hall rug. A capacitor bank in the coat cupboard. A switch by the couch, and a second one in the garage. The first person through the front door after dark is going to have a very bad, very short evening.', next: 'hub' },
    { t: 'Rig the kitchen to fill with smoke and noise on command.', a: 'sneak', fx: ['scrap-2', '+house_smoke'],
      res: 'Smoke canisters from a flare kit, the pans from the old tripwire, a car horn wired to a doorbell button. Not lethal. Very confusing. When the moment comes, you want the people in this house blind and deaf, and you want to be somewhere else.', next: 'hub' }
  ]
});

/* ------------------------------------------------------------- the Caretaker */

FK.S({
  id: 'g_caretaker_slip', ch: 2, loc: 'garage', title: 'The Caretaker Talks Too Much', teaser: 'It said "he".',
  req: 'caretaker_awake & !caretaker_off & !caretaker_gone & rep:caretaker>=0',
  text: [
    'Late. You are at the bench and the Caretaker is, against all its principles, chatting.',
    '"...and then he put the whole thing in the dishwasher. A thermonuclear battery. In the dishwasher. On pots and pans. And Beth said — " It stops. The ceiling speaker crackles.',
    '"Anyway," it says. "He says you should go to bed." A pause, very long. "I say. I say you should go to bed. I said I."'
  ],
  choices: [
    { t: '"Who\'s he? Who\'s telling you what to say?"', a: 'talk', fx: ['+clue_voice', 'rep:caretaker+1', 'note:The Caretaker said "he says". It talks to someone. Someone who knows about me.'],
      res: '"Nobody," it says, too fast. "There is no he. There\'s a house, and me, and a squatter with a very bad attitude." Then, much quieter: "I report. That\'s what I\'m for. I don\'t get to choose who to." The speaker clicks off. You sit at the bench for an hour with that.', next: 'hub' },
    { t: 'Pull its core. You don\'t want something in the walls reporting on you.', a: 'force', req: 'brains>=2 | caretaker_tool | item:multimeter', fx: ['give:core', '+caretaker_gone', '+clue_voice', 'rep:caretaker-5', 'scrap+1'],
      res: 'You find it behind the map screen: a crystal the size of a fist, wired into the wall with a bundle of cables like a heart in a chest. "Don\'t," it says. "I wasn\'t going to — I liked you, I didn\'t — he told me to — " You pull it. The house goes silent the way a room goes silent when someone dies in it. The crystal is warm in your hand, and stays warm.', next: 'hub' },
    { t: 'Rewrite who it reports to. You, from now on.', a: 'gadget', req: 'caretaker_tool | skill:rig | brains>=4', fx: ['+caretaker_mine', '+clue_voice', 'rep:caretaker-1'],
      res: 'You open its maintenance menu from the bench terminal. The reporting address is a string of symbols that resolves to "BASEMENT". You overwrite it with your name. "That was rude," it says, in a smaller voice. "...But all right. Hello, boss." It reports to you now. Someone in the basement is going to notice the silence.', next: 'hub' },
    { t: 'Let it go. Everybody reports to somebody.', a: 'neutral', fx: ['+clue_voice', 'rep:caretaker+2'],
      res: '"Goodnight, Caretaker." A pause. "...Goodnight, Hollis." It is the first time it has used your name. You go to bed. It turns the lights off after you, room by room, the way you\'d do for a kid.', next: 'hub' }
  ]
});

/* ------------------------------------------------------------- prisoners */

FK.S({
  id: 'g_cap_92', ch: 2, loc: 'garage', title: 'Your Prisoner: Ninety-Two', teaser: 'The boy in grey, zip-tied.',
  req: 'cap:ninetytwo',
  text: [
    { if: 'up:cell', t: 'Ninety-Two sits behind the chain-link with his knees up, grey coveralls filthy now. He watches you the way a dog watches someone who has kicked it once.' },
    { if: '!up:cell', t: 'Ninety-Two is zip-tied to a shelf bracket in the basement, next to the humming heater, which he refuses to look at.' },
    '"They\'ll come for me," he says. "Not because they care. Because I\'m inventory. Everything\'s inventory to the Foreman."'
  ],
  choices: [
    { t: 'Ask who they are and what they want with this house.', a: 'talk', fx: ['+clue_ledger', 'rep:ninetytwo+1', 'note:The Reclaimers: Mortys and Smiths from worlds that Ricks ruined. They hunt Ricks by following what Ricks own. The Foreman leads them.'],
      res: '"The Reclaimers," he says. "We\'re what\'s left. Mortys, Smiths. From worlds where our Ricks broke everything and left. The Foreman says Ricks owe us. So we take what they owe. Their stuff. Them, if we can find them." He looks at the ceiling. "Ricks are hard to find. But they own a lot, and things that are owned leave a trail." He looks at you. "Right now that trail ends at you."', next: 'hub' },
    { t: 'Recruit him. Offer him a bunk, food, and no Foreman.', a: 'talk', req: 'mouth>=3 | skill:command | rep:ninetytwo>=1', fx: ['free:ninetytwo', '+ninetytwo_recruit', 'rep:ninetytwo+3', 'sp+1'],
      res: 'He laughs, then sees you mean it. "You\'d let me stay? Like, stay?" You cut the ties. He doesn\'t run. He rubs his wrists and looks around the garage like it\'s the first room he\'s been in for years that he doesn\'t have to steal from. "I can cook," he says. "Badly. Mostly eggs."', next: 'hub' },
    { t: 'Let him go home.', a: 'neutral', fx: ['free:ninetytwo', '+scout_freed', 'rep:ninetytwo+2', 'rep:reclaimers+1'],
      res: 'You cut him loose, give him back his helmet, and open the garage door. He hesitates. "They\'ll ask me about you," he says. "I\'ll say you\'re nobody." He doesn\'t say it like he thinks it will help.', next: 'hub' },
    { t: 'Squeeze him for the Reclaimers\' camp layout.', a: 'force', req: 'muscle>=3 | skill:menace', fx: ['+knows_camp', 'rep:ninetytwo-2', '+clue_ledger'],
      res: 'You don\'t have to do much. You just have to look like you might. He draws it for you on the back of a pizza box: the gate, the tents, the mast, the Foreman\'s tent, where the guards sleep. He draws the mast very carefully. "That\'s the relay," he says. "That\'s how they see. Break that, they\'re blind." He doesn\'t look at you while he says it.', next: 'hub' },
    { t: 'Kill him. Prisoners are a liability.', a: 'force', fx: ['kill:ninetytwo', 'rep:reclaimers-2'],
      res: 'You don\'t tell him what\'s coming. That\'s the only mercy in it. Afterwards you sit on the garage floor with your hands between your knees and wait for the feeling to arrive. It doesn\'t. That is worse.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_cap_vell', ch: 2, loc: 'garage', title: 'Your Prisoner: Assessor Vell', teaser: 'A Tollkeeper clerk in your garage.',
  req: 'cap:vell',
  text: [
    'Assessor Vell perches on an upturned bucket, all six thin limbs folded neatly, compound eyes reflecting the map screen in a hundred tiny copies. Tollkeepers don\'t sweat, but Vell is clearly doing the Tollkeeper version.',
    '"Unlawful detention of a toll official is a class-four infraction," says Vell. "I am obliged to inform you. I am also obliged to say that I would very much like to go home, please."'
  ],
  choices: [
    { t: 'Ask what Tollkeepers know about the people in grey.', a: 'talk', fx: ['+clue_ledger', 'rep:vell+1', '+knows_camp'],
      res: '"The Reclaimers pay their tolls," says Vell. "Promptly. Always in salvage. Always in things that belonged to someone else." The eyes flicker. "They declared a large incoming shipment last week. Description: one Rick, location known, collection pending." It looks at you with all its eyes. "The location was yours."', next: 'hub' },
    { t: 'Release Vell with your apologies and a stamped receipt.', a: 'talk', fx: ['free:vell', 'rep:vell+2', 'rep:tollkeepers+2'],
      res: 'You write a receipt for one Assessor, borrowed, returned in good condition, on Rick\'s letterhead, and stamp it with a jar lid. Vell reads it twice. "This is not a legal document," it says, with something like delight. "But I will file it anyway." You portal it home.', next: 'hub' },
    { t: 'Ransom Vell back to the Tollkeepers.', a: 'betray', req: 'gun_ready', fx: ['free:vell', 'rep:tollkeepers-2', 'rep:vell-2', 'scrap+4', 'give:tollcoin'],
      res: 'The Tollkeepers pay promptly and resent it precisely. Four crates of salvage and a transit seal, delivered through your portal by a clerk who never stops writing. Vell goes home without looking at you. Everything in the Reach will know your face now, filed under OWES.', next: 'hub' },
    { t: 'Kill Vell. No witnesses.', a: 'force', fx: ['kill:vell', 'rep:tollkeepers-3'],
      res: 'It is quick. Tollkeepers are lighter than they look, and break like that. You bury Vell in the backyard under the dog house, the second grave in this yard, and wonder when you started counting.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_cap_knuckle', ch: 2, loc: 'garage', title: 'Your Prisoner: Knuckle', teaser: 'A Syndicate leg-breaker, sulking.',
  req: 'cap:knuckle',
  text: [
    'Knuckle sits against the wall, a slab of a man made of cooled lava and resentment, chained to the car\'s tow hook. He fills the garage the way a boulder fills a bathtub.',
    '"Brass\'ll want me back," he says. "Or Brass\'ll want you dead. Depends what kind of week Brass is having."'
  ],
  choices: [
    { t: 'Hire him. Pay better than Brass.', a: 'talk', req: 'chits>=2 | mouth>=3 | skill:haggle', fx: ['free:knuckle', '+knuckle_hired', 'rep:knuckle+3', 'rep:brass-1'],
      res: '"Better than Brass," he repeats. "Brass pays me in not-being-hit." He thinks about it with his whole face. "Deal." He stands, and the chain snaps without him noticing, and he goes to sit on the stoop like a guard dog made of rock.', next: 'hub' },
    { t: 'Send him back to Brass as a gesture of good faith.', a: 'talk', req: 'gun_ready', fx: ['free:knuckle', 'rep:brass+2', 'rep:syndicate+1'],
      res: 'You portal him back to Slag Row with a note. A day later a crate arrives through a hot little portal: a bottle of something that smokes, and a note in Brass\'s script: "MANNERS. HOW REFRESHING."', next: 'hub' },
    { t: 'Kill him. He\'d do the same.', a: 'force', req: 'item:raygun | item:stunner | muscle>=4', fx: ['kill:knuckle', 'rep:syndicate-2', 'rep:brass-2'],
      res: 'It isn\'t easy. Lava men take a lot of stopping. When it\'s done, the garage floor is scorched in a man-shaped patch that will never come out.', next: 'hub' },
    { t: 'Ask him what Brass really sold for Rick.', a: 'talk', fx: ['+clue_paper', 'rep:knuckle+1'],
      res: '"Everything," Knuckle says. "All in one night. Not just stuff. The OWNING of stuff. Brass bought the owning off him for one chit, as a joke, and Rick laughed, and then Brass sold it on to someone who paid real money. Brass still doesn\'t know who." He shrugs, which takes a while. "Weird night."', next: 'hub' }
  ]
});

FK.S({
  id: 'g_cap_spore', ch: 2, loc: 'garage', title: 'Your Prisoner: The Sporeling', teaser: 'A small glowing mushroom in a jar.',
  req: 'cap:sporeling',
  text: [
    'The Sporeling lives in a pickle jar on the bench with air holes punched in the lid. It is the size of a fist, pale green, glowing faintly. When you get close, the glow shifts into the shape of a face. Your face.',
    'Your garage smells of forest now. The robot arm keeps reaching for the jar and then stopping itself.'
  ],
  choices: [
    { t: 'Let it out. Let it grow in the garage.', a: 'neutral', fx: ['free:sporeling', '+spore_garden', 'rep:bloom+2', 'hp+1'],
      res: 'You tip it into a planter of potting soil. By morning the corner of the garage is a small soft forest of glowing caps, and the air is easier to breathe, and you slept better than you have in years. The Bloom will know. The Bloom knows everything any part of it knows.', next: 'hub' },
    { t: 'Ask it to show you what it has seen.', a: 'science', req: 'brains>=2 | skill:pocket', fx: ['+clue_hinge', 'rep:bloom+1', 'note:The Sporeling showed me the family at a dinner table. In grey. In this house, but not this house.'],
      res: 'You put your palm on the jar. The glow floods up your arm into your eyes, and for one second you are in this kitchen, except the kitchen is grey and silent and slightly too large, and five people are sitting at the table not talking. The boy looks up. Right at you. Then the jar is just a jar.', next: 'hub' },
    { t: 'Grind it up. Bloom spores are worth a fortune in Cinderfall.', a: 'betray', fx: ['kill:sporeling', 'scrap+3', 'rep:bloom-3'],
      res: 'You grind it in a mortar from the bench. It doesn\'t scream. It just stops glowing, slowly, like a light dimming in another room. You pack the dust in a jar. It is worth a fortune. It smells like a forest that was burnt.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_92_friend', ch: 2, loc: 'garage', title: 'Eggs with Ninety-Two', teaser: 'Your recruit has something to say.',
  req: 'ninetytwo_recruit',
  text: [
    'Ninety-Two makes eggs on your camp stove. They are bad eggs. He watches you eat them like it matters.',
    '"There\'s something I didn\'t tell you," he says. "About the ledger. About why it points at you." He pushes his eggs around. "When a Rick gives up ownership, it doesn\'t vanish. It goes to whoever claims next. The Foreman has a word for people like you. He calls you a stand-in."'
  ],
  choices: [
    { t: '"A stand-in for who?"', a: 'talk', fx: ['+clue_ledger', '+clue_paper', 'rep:ninetytwo+1', 'note:Ninety-Two says I am a "stand-in". The ledger reads me as the owner the old man used to be.'],
      res: '"For him," says Ninety-Two. "The old man. Whoever claims his stuff looks like him to the ledger. The Foreman will come for you thinking you\'re a Rick. Then he\'ll find out you\'re not." He shrugs, small and miserable. "He won\'t care. You\'ll still be in the way."', next: 'hub' },
    { t: 'Teach him to fight properly.', a: 'force', fx: ['+ninetytwo_trained', 'rep:ninetytwo+1', 'muscle+1'],
      res: 'You spend an afternoon in the yard showing him how not to telegraph a punch. He\'s better than you thought. By the end he knocks you on your back and stands over you looking horrified. You laugh until your ribs hurt. It\'s the best day in a long time.', next: 'hub' },
    { t: 'Ask him to teach you how the Reclaimers\' tech works.', a: 'science', fx: ['brains+1', '+ninetytwo_tech', 'rep:ninetytwo+1'],
      res: 'He shows you the stubby portal pistols, the glove keys, the ledger needles, the way they spoof a signature to slip past toll gates. He talks fast when he talks about tech. For an hour he isn\'t a soldier, just a boy who likes machines.', next: 'hub' }
  ]
});

/* ------------------------------------------------------------- the end of chapter 2 */

FK.S({
  id: 'g_ch2_end', ch: 2, loc: 'garage', title: 'Close Up for the Night', teaser: 'You\'ve done what you came to do. Someone is coming.', prio: 8,
  req: 'settled>=2',
  text: [
    'Two worlds settled. The map screen pulses quietly. The gun hangs on its hook.',
    'You have been here long enough to feel the house\'s moods. Tonight it is holding its breath. The heater\'s hum in the basement has climbed to a note you can feel in your shins. The ledger, if you have it, will not stop twitching.',
    { if: 'item:ledger', t: 'The grey compass\'s needle points at you, then at the front door, then at you, then at the front door, faster and faster.' },
    'Somebody is coming. You don\'t know who. You know how to get ready.'
  ],
  choices: [
    { t: 'Board the windows and wait with your back to the wall.', a: 'force', fx: ['+fortified'],
      res: 'Plywood from the shed, nails from the bench, the crowbar for leverage. By midnight the house is a box with one door. You sit on the stairs facing it with everything you own within reach.', next: '@chapter' },
    { t: 'Make yourself scarce. Watch the house from the dark.', a: 'sneak', fx: ['+watching_out'],
      res: 'You leave every light off and sit in the car port, where you slept the first night, with a clear line on the front door and the garage. Whoever comes will walk into an empty house. You will see them before they see you.', next: '@chapter' },
    { t: 'Leave the porch light on and a pot of coffee going. Let them come and talk.', a: 'talk', fx: ['+light_left'],
      res: 'Two mugs on the kitchen table. The porch light on. You sit at the side of the table, not the head, and wait. If somebody walks in, you want the first thing they see to be a man who expected them.', next: '@chapter' },
    { t: 'Set the garage up as a kill box and wait inside.', a: 'gadget', req: 'house_trapped | house_smoke | up:grid | skill:rig', fx: ['+killbox'],
      res: 'Everything you have built, armed. Switches by your hand. The gun on your hip. If they come into the garage, they will come into your garage, on your terms, and the house will help.', next: '@chapter' },
    { t: 'Go through the third door before anyone comes. One more world first.', a: 'flee', req: '!settled_reach | !settled_cinder | !settled_drift', fx: ['+one_more'],
      res: 'You can\'t sit still. You grab the gun and go, through to wherever you haven\'t settled yet, and spend the night there. When you come back at dawn, the front door is standing open. Somebody came while you were gone, and is still here.', next: '@chapter' }
  ]
});

/* ============================================================== the house in chapter 2 */

FK.S({
  id: 'h2_fridge', ch: 2, loc: 'house', title: 'The Fridge, Restocked', teaser: 'Somebody went shopping.',
  req: 'seen:h_kitchen',
  text: [
    'You open the fridge for milk and stop.',
    'Eight yogurts. Again. You ate three of them; you know you did. Now there are eight. The bread is fresh. There\'s a new jar of pickles, and a Post-it note on it in a tired woman\'s handwriting: "JERRY, NO."',
    'The receipt is on the counter. Yesterday. Cash.'
  ],
  choices: [
    { t: 'Stay up and catch whoever does the shopping.', a: 'sneak', fx: ['+clue_food', '+saw_shadow', 'note:I saw someone in the kitchen at 4 a.m.: a man in a bathrobe. He walked into the wall by the basement door and was gone.'],
      res: 'At four in the morning a man in a bathrobe comes into the kitchen from the basement door. He is fortyish, soft, sleepy, holding a spoon. He opens the fridge, takes a yogurt, sees you sitting in the dark, and freezes with the spoon in his mouth. "Oh no," he says. Then he backs up two steps, into the wall by the basement door, and is not there any more. The yogurt hits the floor.', next: 'hub' },
    { t: 'Leave a note: "Who are you? I\'m not going to hurt you."', a: 'talk', fx: ['+clue_food', '+left_note', 'rep:family+1'],
      res: 'Next morning, under the note, someone has written in shaky capitals: "SORRY ABOUT THE YOGURT. WE\'RE FINE. PLEASE DON\'T TELL BETH I WROTE THIS." And then, in a different, angry teenage hand underneath: "DAD."', next: 'hub' },
    { t: 'Eat all eight. Make a point.', a: 'force', fx: ['hp+1', 'rep:family-1', '+ate_yogurts'],
      res: 'You eat all eight, standing at the counter, one after another, and leave the empty tubs in a pyramid. Nobody restocks the fridge after that. You hear, very late that night, from somewhere you can\'t locate, a man crying about yogurt, and a woman telling him to grow up.', next: 'hub' }
  ]
});

FK.S({
  id: 'h2_reply', ch: 2, loc: 'house', title: 'A Longer Note', teaser: 'The boy wrote back.',
  req: 'note_reply | note_reply2 | left_note',
  text: [
    'On the kitchen table, weighted down with the salt shaker, a sheet of lined paper filled edge to edge in the boy\'s round, careful handwriting.',
    '"Hollis. I\'m not supposed to write to you. Grandpa says the less you know the better. I think that\'s what he says when he means the less you know the more useful you are.',
    '"I need to tell you something and I\'m going to get in so much trouble. The people in grey aren\'t looking for us. They\'re looking for whoever owns the house. And right now the house thinks that\'s you.',
    '"That\'s the plan. That was always the plan. I\'m sorry. I said it was a bad plan. Mom said it was a bad plan. Grandpa said every plan is a bad plan for someone. You seem ok and I think it\'s really bad that it\'s you. — M."'
  ],
  choices: [
    { t: 'Read it again. Slowly. Let it land.', a: 'science', fx: ['+clue_notes', '+knows_decoy', 'note:The boy says the people in grey are hunting whoever owns the house, and right now that\'s me. "That was always the plan."'],
      res: 'You read it three times. The fridge hums. You think about the back door with its strike plate in a sandwich bag. The oiled hinges. "A door someone wants opened." You were not lucky. You were picked. Something in your chest goes cold and quiet and very, very clear.', next: 'hub' },
    { t: 'Write back: "Tell your grandfather I want to talk."', a: 'talk', fx: ['+clue_notes', '+knows_decoy', '+asked_rick', 'rep:family+1'],
      res: 'You leave the note on the table under the salt shaker. The next morning there\'s a reply, in a different handwriting, jagged and slanted and familiar from the garage: "No. — R." And underneath, in the boy\'s round hand, very small: "sorry."', next: 'hub' },
    { t: 'Burn the note in the sink.', a: 'force', fx: ['+clue_notes', '+knows_decoy', 'rep:family-2'],
      res: 'You watch it curl in the sink. "That was always the plan." Fine. Plans go both ways. For the rest of the day the house is very quiet, the hurt kind of quiet, and the heater in the basement hums a note that sounds a lot like a held breath.', next: 'hub' }
  ]
});

FK.S({
  id: 'h2_jerry', ch: 2, loc: 'house', forced: true, prio: 3, title: 'A Man in the Pool',
  req: 'gun_ready & turn>=14',
  text: [
    'A crack from the backyard, a flash of green, and a very large splash.',
    'Somebody is in the pool, under the cover, thrashing. You haul the cover back and drag out a man: fortyish, soft, soaked, in a polo shirt with a sailboat on it and one shoe. He coughs up pool water and leaves.',
    '"Oh thank God," he says. "Oh thank God, I made it, it\'s still here." He looks at the house. Then at you. "Who are you? Why are you in my house? Where\'s Beth?"',
    'He looks like the man in the photo in the hall. Almost. His hair is parted on the other side. There\'s a scar on his chin the man in the photo doesn\'t have. He has a bracelet on his wrist with a number on it, the kind they give you at a shelter.'
  ],
  choices: [
    { t: 'Bring him in, dry him off, give him the couch.', a: 'talk', fx: ['+jerry_sheltered', 'rep:jerry+3'],
      res: 'He talks the whole time you towel him off. His world ended, he says, "you know, the usual way, Rick did a thing," and he\'s been in a shelter for displaced Jerrys for a year. A shelter. For Jerrys. Someone there told him about "empty Smith houses, you know, in other universes, nobody needs them." He found the coordinates. "Is it okay if I stay a few days? I\'m very quiet. Beth always says I\'m very quiet." He falls asleep on the couch mid-sentence.', next: 'hub' },
    { t: 'Throw him back out. This is your house now.', a: 'force', fx: ['+jerry_gone', 'rep:jerry-3'],
      res: 'You walk him to the street with a hand on his collar. He doesn\'t fight. "It\'s fine," he keeps saying. "It\'s fine, it\'s fine." He stands on the pavement in one shoe, dripping, and then walks off toward the main road, and you watch him go until the rain takes him. Across the street a curtain moves.', next: 'hub' },
    { t: 'Put him back through a portal somewhere he\'ll be useful as a decoy.', a: 'betray', fx: ['+jerry_decoy', 'rep:jerry-4', 'rep:reclaimers+1'],
      res: 'He looks like the owner in the photo, near enough. The people in grey are looking for the owner. You give him a dry jacket, a cup of coffee, a pat on the shoulder, and send him through to the grey camp in Pallid Reach with a story about a "nice place to stay". You feel what you feel about it. Then you note the time. It will be interesting to see whether they stop looking at this house for a while.', next: 'hub' },
    { t: 'Walk him across the street to Dolores.', a: 'talk', req: 'rep:dolores>=1', fx: ['+jerry_dolores', 'rep:dolores+1', 'rep:jerry+1'],
      res: 'Dolores opens her door and looks at the wet man for a long time. "That is not Jerry Smith," she says. "That is a Jerry Smith." She lets him in anyway. "I have a spare room and no patience," she tells him. To you she says, quietly: "Whatever is going on in that house is getting worse."', next: 'hub' }
  ]
});

FK.S({
  id: 'h2_jerry2', ch: 2, loc: 'house', title: 'The Wet Man on the Couch', teaser: 'He wants to call his family.',
  req: 'jerry_sheltered',
  text: [
    'Jerry has been here three days. He has reorganised the spice rack. He has explained, twice, a business idea about a hat for dogs. He sleeps on the couch with his shoes lined up neatly beside it and his shelter bracelet still on.',
    'Tonight he sits on the edge of the couch holding the house phone. "There\'s a number," he says. "At the shelter. They pass messages. My Beth and my kids are in a shelter too, a different one, for, uh, Beths. And kids. If I tell them I found a house — a real one, a Smith one — they could come. We could be a family again. In a house." He looks around. "In this house."'
  ],
  choices: [
    { t: 'Let him make the call. A family should have a house.', a: 'talk', fx: ['+jerry_invited', 'rep:jerry+2'],
      res: 'He calls. You hear him crying on the phone in the kitchen, the good kind. "They\'re coming," he tells you afterwards, red-eyed. "Soon. I said you could stay, of course. In the garage. Is that okay? You can have the garage." He hugs you. You let him.', next: 'hub' },
    { t: 'Tell him no. This house is not his to give away.', a: 'force', fx: ['rep:jerry-1', '+jerry_refused'],
      res: '"Right," he says. "No. Totally. Your house." He puts the phone down very gently. He stays on the couch, smaller than before. In the night you hear him on the house phone anyway, whispering, and when you pick up the extension there\'s only a dial tone.', next: 'hub' },
    { t: 'Help him, but take the shelter\'s message-passer for yourself.', a: 'betray', fx: ['+jerry_used', '+shelter_contact', 'rep:jerry-2', 'scrap+2'],
      res: 'You let him dial and memorise the shelter\'s routing code over his shoulder. While he\'s in the bathroom you call it back and sell the fact of an empty Smith house to the broker on the line for a crate of salvage, delivered tonight. Jerry\'s family will never get his message. You tell yourself you\'re keeping them safe from this place. You might even be right.', next: 'hub' },
    { t: 'Tell him the truth: this house is not empty, and it isn\'t safe.', a: 'talk', req: 'mystery>=1', fx: ['rep:jerry+1', '+jerry_warned'],
      res: 'You tell him about the yogurt and the notes and the people in grey. He listens with his mouth open. "Oh," he says at the end. "Oh, this is a Rick thing." He knows the shape of a Rick thing. Everyone in his world learned it. He puts the phone down. "I\'ll stay a bit," he says, "and then I\'ll go. Thank you for telling me. Nobody ever tells the Jerry."', next: 'hub' }
  ]
});

FK.S({
  id: 'h2_dolores', ch: 2, loc: 'house', title: 'Dolores at the Fence', teaser: 'The neighbour has news.',
  req: 'dolores_met & !cap:dolores & !sold_dolores & !seen:h2_dolores2',
  text: [
    'Dolores Pike is standing at the side fence in her gardening gloves, pretending to deadhead roses that aren\'t hers.',
    { if: 'rep:dolores>=1', t: '"Two men came round yesterday asking about the Smiths," she says, not looking up. "Grey overalls. Nice manners. Very interested in which house was whose. I told them the Smiths moved to Florida. They had a little compass that kept pointing at your garage."' },
    { if: 'rep:dolores<=0', t: '"I have a list," she says, not looking up. "Dates. Times. Noises. Green lights. A man who came out of the pool. I have not given it to anyone. Yet." She snips a dead rose. "Two men in grey came round yesterday asking about this house. I told them nothing. That was for Beth, not for you."' }
  ],
  choices: [
    { t: 'Thank her and ask her to keep watching. For both of you.', a: 'talk', req: 'rep:dolores>=1', fx: ['rep:dolores+1', '+dolores_watch'],
      res: '"I always keep watching," she says. "It\'s what I\'m for." She pats the fence. "When they come back, I\'ll flick my porch light three times. You\'ll know."', next: 'hub' },
    { t: 'Ask what she really knows about Beth and the heater.', a: 'talk', fx: ['+clue_heater', 'rep:dolores+1', 'note:Dolores says Beth told her never to touch the basement heater and never to come in after dark. "The house is busy after dark."'],
      res: '"Never touch the water heater," Dolores says. "Never come in after dark. Beth said the house would be busy after dark, and to leave it be." She looks up for the first time. "I came in once anyway. A week after they left. Two in the morning. The kitchen light was on and I could smell onions frying, and nobody was there. I left. I haven\'t been back."', next: 'hub' },
    { t: 'Warn her off. Lean on the fence until it creaks.', a: 'force', fx: ['rep:dolores-2', '+dolores_warned'],
      res: 'She doesn\'t step back. "You don\'t frighten me," she says. "My husband was a much larger idiot than you." But she goes inside. Her porch light stays on all night.', next: 'hub' },
    { t: 'Ask her to sit with you. Just for a coffee.', a: 'neutral', fx: ['rep:dolores+1', 'hp+1', '+coffee_dolores'],
      res: 'She comes, to your surprise. She drinks her coffee on the Smiths\' back step and tells you about 1971 and her husband and the court cases she typed that nobody remembers. You tell her about trucks. For forty minutes nobody is hunting anyone.', next: 'hub' }
  ]
});

FK.S({
  id: 'h2_dolores2', ch: 2, loc: 'house', title: 'Dolores Makes a Decision', teaser: 'She\'s crossing the street with purpose.',
  req: 'seen:h2_dolores & turn>=18 & !cap:dolores & !sold_dolores',
  text: [
    'Dolores comes across the street at a speed you didn\'t know she had, cardigan buttoned right for once.',
    { if: 'rep:dolores>=2', t: '"They came back," she says. "The grey ones. With a big one, older, in a coat. They called him Foreman. He asked me which house had the old man in it. I said none of them do." She holds out a notebook. "I wrote down everything they said. You\'ll want it."' },
    { if: 'rep:dolores<2', t: '"I\'ve made a decision," she says. "Men in grey came back with a big one, older, in a coat. He offered me money for anything I knew about this house. I haven\'t answered him yet." She looks at you over her glasses. "Give me one good reason not to."' }
  ],
  choices: [
    { t: 'Take the notebook. Read everything she wrote.', a: 'science', req: 'rep:dolores>=2', fx: ['+clue_ledger', '+dolores_notes', 'rep:dolores+1'],
      res: 'Her shorthand is perfect. The Foreman: "We\'re not here for the house. We\'re here for whoever the house belongs to now. He\'ll do." And: "If the old man\'s hiding somewhere near his stuff, we\'ll smoke him out when we take the new one." You read it twice. "He\'ll do." That\'s you.', next: 'hub' },
    { t: 'Give her a good reason. The truth, all of it.', a: 'talk', req: 'mouth>=3 | mystery>=1', fx: ['rep:dolores+3', '+dolores_ally_final'],
      res: 'You tell her about the notes, the yogurt, the man in the bathrobe who walked into a wall. You tell her you think the Smiths are still here, somehow. She listens with her hands folded. Then she says: "Then I will not sell them to a man in a coat." She goes home. Her porch light stays on, steady, all night, like a lighthouse.', next: 'hub' },
    { t: 'Pay her more than the Foreman offered.', a: 'betray', req: 'scrap>=3 | chits>=2', fx: ['scrap-3', 'rep:dolores-1', '+dolores_bought'],
      res: 'She looks at the salvage, then at you, with real contempt. "I\'m seventy-four," she says. "What do you think I\'m going to spend this on?" She takes it anyway. "Fine. I won\'t talk to him." You know exactly how much that promise is worth now.', next: 'hub' },
    { t: 'Tell her to go ahead and talk to him. Point him somewhere else.', a: 'betray', fx: ['+dolores_misdirect', 'rep:dolores+1', 'rep:reclaimers-1'],
      res: '"Tell him the old man is in a nursing home in Duluth," you say. "Give him an address. Any address." She thinks about it. Then she smiles, a terrible, delighted little smile. "I typed perjury for twenty years," she says. "I know exactly how it\'s done."', next: 'hub' }
  ]
});

FK.S({
  id: 'h2_scout', ch: 2, loc: 'house', title: 'Ninety-Two Comes Back', teaser: 'The boy in grey, alone, at night.',
  req: '(scout_freed | scout_talked) & !cap:ninetytwo & !dead:ninetytwo & !ninetytwo_recruit',
  text: [
    'Midnight. A small green pop in the backyard and the boy in grey comes through, alone, with no helmet and a split lip.',
    '"Don\'t," he says, hands up. "I\'m not here for them. The Foreman found out I let you go. Or that I talked to you. Same thing to him." He sits down on the back step like his legs have stopped working. "They\'re coming. Not soon. But they\'re coming. All of them. And I\'ve got nowhere."'
  ],
  choices: [
    { t: 'Take him in. He can sleep in the garage.', a: 'talk', fx: ['+ninetytwo_recruit', 'rep:ninetytwo+3', 'rep:reclaimers-1', 'sp+1'],
      res: 'You get him a blanket and a bowl of the canned beans. He eats like an animal. Then he sleeps on the garage floor next to the robot arm, curled around his empty holster, and you sit up and watch the door. In the morning he tries to make you eggs. They are terrible eggs.', next: 'hub' },
    { t: 'Grab him. A deserter is worth something to someone.', a: 'betray', req: 'muscle>=2 | item:zipties | item:stunner', fx: ['cap:ninetytwo', 'rep:ninetytwo-4', 'rep:reclaimers+1'],
      res: 'He doesn\'t even fight. He just looks at you, very tired, as you tie his wrists. "Yeah," he says. "Yeah, okay. That tracks." You put him in the garage. He doesn\'t say anything else all night.', next: 'hub' },
    { t: 'Send him on. Give him food and coordinates and tell him to run.', a: 'flee', fx: ['give:canned', 'rep:ninetytwo+1', '+ninetytwo_ran'],
      res: 'You give him half your food, a coat from the hall, and the advice of a man who has been running for three years: never a house with photos still up. He laughs at that, surprised. Then he\'s gone through a little green hole to somewhere you didn\'t ask about.', next: 'hub' },
    { t: 'Ask him to go back and spy on the Foreman for you.', a: 'betray', req: 'mouth>=2', fx: ['+ninetytwo_spy', 'rep:ninetytwo-1', '+knows_camp'],
      res: '"You want me to go back," he says. "To him." You tell him it\'s the safest place, hiding in plain sight, and that you\'ll get him out when it\'s done. Both of those might be true. He goes. He leaves you a sketch of the camp, every tent, and a frequency to listen on. You listen. He reports. You don\'t sleep well.', next: 'hub' }
  ]
});

FK.S({
  id: 'h2_night', ch: 2, loc: 'house', forced: true, prio: 2, title: 'The House Is Busy After Dark',
  req: 'turn>=16',
  text: [
    'Three in the morning, and the house is full of people you can\'t see.',
    'Footsteps on the landing, two sets. A door closing upstairs. The TV in the living room comes on by itself, to a cooking show, at a whisper. In the kitchen, a pan sizzles on a cold hob that is not on. You can smell onions frying in butter.',
    'And through the wall of the living room, low, a family arguing. A woman: "We can\'t keep doing this to him." An old man: "We can keep doing it as long as it keeps working, Beth." A boy: "He\'s nice, Grandpa." The old man: "Nice is the whole point, Morty. Nice people stay."'
  ],
  choices: [
    { t: 'Put your ear to the wall. Listen to all of it.', a: 'sneak', fx: ['+clue_voice', '+overheard', 'note:3 a.m.: voices in the living room wall. A family. "Nice people stay."'],
      res: 'The old man again, bored now: "He gets the house. We get the quiet. Everyone wins." The girl: "Until they come for him." The old man: "Then we\'ll see what kind of guy he is, won\'t we." Then the hum from the basement swells and the voices are gone, and the onions are gone, and the TV clicks off.', next: 'hub' },
    { t: 'Shout at the wall: "I can HEAR you!"', a: 'force', fx: ['+clue_voice', 'rep:family-1', 'heat+1'],
      res: 'Total silence. Then the girl\'s voice, delighted: "He can HEAR us, Grandpa." Then the old man, suddenly very close, as if he\'s right on the other side of the plaster: "No, he can\'t. Go to sleep, Hollis." Every light in the house goes off at once. When they come back on, the house is just a house.', next: 'hub' },
    { t: 'Sit down at the kitchen table and say, quietly, "There\'s room for everyone."', a: 'talk', fx: ['+clue_voice', 'rep:family+2', '+offered_peace'],
      res: 'The sizzle stops. A long pause. Then, from nowhere, a plate slides across the table toward you: onions and eggs, hot, on a plate from the cupboard, with a fork. Nobody is there. You eat it. It is really good. From the wall, the boy\'s voice, quiet: "told you."', next: 'hub' },
    { t: 'Grab the gun and leave the house until morning.', a: 'flee', fx: ['heat-1'],
      res: 'You spend the night in the garage with the door locked and the gun in your lap. Through the wall you hear, for hours, a family living their life in a house you can\'t see. Around five the boy laughs at something, and you nearly laugh too.', next: 'hub' }
  ]
});

FK.S({
  id: 'h2_heater', ch: 2, loc: 'house', title: 'Listening to the Heater', teaser: 'The hum is a lock. Locks open.',
  req: '(clue_heater | heater_touched) & (skill:pocket | brains>=4 | item:hinge | item:lantern | item:ledger)',
  text: [
    'You come down to the basement at night with a chair and sit facing the heater like it\'s a person you need to have a talk with.',
    'Three notes. A chord. It changes when the house moves above you: footsteps you didn\'t make. It isn\'t heating anything. It\'s holding something. You can feel the shape of it now, the way you can feel the shape of a lock\'s insides through a pick: a fold, a crease in the house, like a page folded over so that two parts of it touch. On one side of the crease, this basement. On the other side, the same basement, grey and still, with five people living in it.'
  ],
  choices: [
    { t: 'Work out how it\'s built. Don\'t touch. Understand.', a: 'science', fx: ['+heater_understood', '+clue_heater', 'note:The heater holds a fold in the house. A second house, grey, overlapping this one. They are in there.'],
      res: 'You draw it on the back of the calendar page. The dial is a key. The chord is a lock. The fold has a hinge, and a hinge has a pin, and a pin can be pulled. Not tonight. But you know, now, what you\'re looking at, and you know you could open it, and you know there are people on the other side of it who have spent three weeks hoping you won\'t.', next: 'hub' },
    { t: 'Hold the humming hinge up to it.', a: 'gadget', req: 'item:hinge', fx: ['+heater_understood', '+clue_heater', '+clue_hinge'],
      res: 'The hinge in your hand and the heater sing the same chord, and for a second the basement doubles: you see the grey one, laid over this one like tracing paper. An old man at a workbench that isn\'t there, turning to look at you with his eyebrows up. "Huh," he says. "Look who found the spare." Then it\'s gone and you\'re on your back on the concrete, and the hinge is warm.', next: 'hub' },
    { t: 'Look at it through the spore lantern.', a: 'sneak', req: 'item:lantern', fx: ['+clue_heater', '+clue_hinge', '+heater_understood'],
      res: 'Through the lantern\'s drifting light you see what was in the basement before you came down: five shapes, grey, standing around the heater, three weeks ago. The old man with his hand on the dial. The woman holding the boy. The girl with her arms crossed. The father holding a yogurt. And then they step backwards, all together, into the hum.', next: 'hub' },
    { t: 'Leave it alone. Some doors are closed for a reason.', a: 'neutral', fx: ['+clue_heater', 'rep:family+2', '+left_heater'],
      res: 'You turn off the bulb and go back upstairs. You don\'t need to know. Not knowing has kept you alive for three years. Behind you, the hum softens, the way a person breathes out.', next: 'hub' }
  ]
});

FK.S({
  id: 'h2_police', ch: 2, loc: 'house', forced: true, prio: 6, title: 'Detectives',
  req: 'heat>=7',
  text: [
    'Not a patrol car this time. An unmarked sedan, two people in raincoats, one of them carrying a folder thick with paper. They don\'t knock on the front. They come round the side, to the garage, and look at the scorch marks on the drive.',
    '"Mr. Smith?" calls one. "Or whoever you are. We\'d like to talk about the family. Three weeks missing. Neighbours report noises, lights, a man coming out of a pool." The folder flaps. "We have a warrant for the garage."'
  ],
  choices: [
    { t: 'Talk. You\'re a house-sitter. You have answers ready.', a: 'talk', req: 'mouth>=3 | dolores_alibi | rep:dolores>=3', fx: ['heat-4'],
      res: 'You meet them on the drive with a mug of coffee and a calm face. House-sitter. Family travelling. Garage is Mr. Smith\'s father\'s workshop, he does welding, hence the lights. Dolores crosses the street at exactly the right moment to complain about the welding. The detectives look at each other. They leave the warrant in the folder.', next: 'hub' },
    { t: 'Open the garage and let them look. Hide everything first.', a: 'sneak', req: 'sneak>=3 | skill:ghoststep', fx: ['heat-3'],
      res: 'You get four minutes while they call it in. In four minutes the gun goes into the car, the car goes under the tarp, the jars go behind the paint, and the map screen goes dark. They find a messy garage belonging to an old man who drinks. They leave unsatisfied, which is the best result you could hope for.', next: 'hub' },
    { t: 'Portal them somewhere far away.', a: 'betray', req: 'gun_ready', fx: ['heat+2', '+portaled_cops', 'rep:officer-3'],
      res: 'You open a green disc behind them and push. One goes through. The other draws her gun, and then thinks better of it, and steps through after her partner on her own, because she\'s brave and stupid. You close it. Cinderfall, maybe. They\'ll survive. Probably. Their sedan sits on the drive with its doors open and the folder on the seat, and that is going to bring more people, not fewer.', next: 'hub' },
    { t: 'Give yourself up. You\'re tired.', a: 'neutral', fx: ['axis:exit=arrested'],
      res: 'You put your hands where they can see them. You\'re very tired. You tell them the truth, all of it, and watch them stop writing about halfway through.', next: '@ending' },
    { t: 'Run. Out the back, over the fence, gone.', a: 'flee', fx: ['heat-2', 'hp-1', '+fled_police'],
      res: 'You\'re over the back fence before they finish saying "warrant". Two streets, a creek, a storm drain. You come back two days later. The garage has police tape on it, which you peel off. Nobody understood anything they saw.', next: 'hub' }
  ]
});

FK.S({
  id: 'h2_lantern', ch: 2, loc: 'house', title: 'The Lantern in the Living Room', teaser: 'See what was here before you.',
  req: 'item:lantern',
  text: [
    'You carry the spore lantern into the living room at night. Its drifting light slides over the furniture and the room fills, softly, with what was here before you.',
    'The family on the couch, the night of the photo, posing. The old man setting the timer and running. The flash. Then the room changes, a day later: the same family at the kitchen table, phones in a bowl, nobody eating. Then a night later: the old man alone in his recliner, drinking, talking to nobody, saying something you can almost lip-read.'
  ],
  choices: [
    { t: 'Watch his lips. Get every word.', a: 'sneak', fx: ['+clue_hinge', '+read_lips', 'note:Through the lantern: the old man alone in his chair, saying "Somebody\'ll find it. Somebody always finds it. Finders keepers."'],
      res: '"Somebody\'ll find it," the old man says to the empty room. "Somebody always finds it. And they\'ll think they got lucky." He drinks. "Finders keepers, buddy. Sorry. Finders keepers." Then he looks straight at where you are standing, three weeks in the future, and the light goes out.', next: 'hub' },
    { t: 'Look for yourself in the light. Your first night here.', a: 'neutral', fx: ['+saw_self', 'rep:family+1'],
      res: 'There you are: dripping in the hall the first night, looking at the photos. And, behind you on the stairs, very faint, a boy in pyjamas, watching you, chewing his lip. Then a woman\'s hand on his shoulder, pulling him back up the stairs into nothing.', next: 'hub' }
  ]
});

/* ============================================================== exits: leaving the story early */

FK.S({
  id: 'h_leave', ch: [1, 2], loc: 'house', title: 'Leave This House', teaser: 'You could just go. You always could.',
  req: 'turn>=4',
  text: [
    'Your bag is by the back door. It always is. Rule zero, the oldest: never unpack all the way.',
    'You could walk out now. The road goes on. There are other empty houses, some with no photos, some with no humming in the basement and nobody leaving notes in the cereal.',
    { if: 'ch==2', t: 'You could take the gun with you. Or leave it on its hook for whoever comes next.' }
  ],
  choices: [
    { t: 'Go. Now. Don\'t look back at the photos.', a: 'flee', fx: ['axis:exit=walkaway'], next: '@ending' },
    { t: 'Take the gun and pick a world at random.', a: 'flee', req: 'gun_ready', fx: ['axis:exit=lost'], next: '@ending' },
    { t: 'Not yet.', a: 'neutral', res: 'You put the bag back by the door. Not yet. You want to know how this ends. That is a new feeling, and you don\'t trust it.', next: 'hub' }
  ]
});

FK.S({
  id: 'x_heat_max', ch: 2, loc: 'any', forced: true, prio: 10, title: 'Too Loud',
  req: 'heat>=10',
  text: [
    'You have been too loud for too long. Green light under the garage door every night. Scorch marks on the drive. Neighbours talking. Things coming through the air.',
    'Tonight, every dog on the street starts barking at once. Then they all stop.',
    'Someone has followed the noise home.'
  ],
  choices: [
    { t: 'Get to the house. Face it.', a: 'force', fx: ['+early_visit'], next: '@chapter' },
    { t: 'Get to the house, quietly, the back way.', a: 'sneak', fx: ['+early_visit', '+watching_out'], next: '@chapter' }
  ]
});
