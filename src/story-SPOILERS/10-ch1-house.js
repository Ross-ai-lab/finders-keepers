/* Chapter 1 — Squatter's Rights. The street, the house, the way into the garage. */

/* ============================================================== arrival */

FK.S({
  id: 'c1_rain', ch: 1, loc: 'street', sub: true, title: 'The Wrong House',
  text: [
    'Rain the temperature of a lie. It has been coming down since Tulsa, or since whatever town it was before Tulsa, and it has found every seam in your jacket.',
    'You are Hollis Grady. Forty-one. Apprentice locksmith at nineteen, long-haul driver at twenty-five, laid off at thirty-eight when the depot bought robots that do not need to sleep. Your apartment burned the year after. Bad wiring, the landlord\'s, and the landlord\'s insurance. For three years you have lived in houses that people forgot they owned: foreclosures, summer places, a dentist\'s cabin with a hot tub you never dared turn on. You leave every one cleaner than you found it. That is the deal you made with yourself.',
    'You have rules. Never a house with a dog. Never a house with the photos still up.',
    'The house at the end of this cul-de-sac has photos still up. You can see them from the street through the front window: frames on a hallway wall, a family on a couch. The lawn has gone shaggy. The mailbox is jammed with flyers, the newest three weeks old. No car in the drive. No lights. The garage door is not the normal kind; it is steel, with a keypad, like a bank. Across the street a porch light is on and a curtain is very still in the way only a watched curtain is.',
    'Your boots are full. Your hands have stopped feeling like hands. Rules are for people who are dry.'
  ],
  choices: [
    { t: 'Try the back door. Back doors are where people get lazy.', a: 'sneak', next: 'c1_backdoor' },
    { t: 'Pick the front lock. Thirty seconds, standing in the light.', a: 'sneak', req: 'item:lockpicks | skill:lockwork', fx: ['+entry_lock'],
      res: 'The lock is a good one, better than the street deserves, but locks are only puzzles somebody else got bored of. Pins set one by one under the rain. The cylinder turns. You step in and close the door before the porch light across the street can decide what it saw.', next: 'c1_inside' },
    { t: 'Pop the side window with the crowbar. Fast and ugly.', a: 'force', req: 'item:crowbar | muscle>=3', fx: ['+entry_window', '+window_broken', 'heat+2'],
      res: 'The latch gives with a noise like a knuckle cracking, and then the glass goes too, all at once, across a kitchen counter. You stand very still in the dark with rain blowing in behind you. Across the street, a light goes on upstairs. Then, after a long time, off again.', next: 'c1_inside' },
    { t: 'Knock on the house across the street. Ask about a spare key like you belong here.', a: 'talk', req: 'mouth>=2 | item:badge', next: 'c1_dolores_key' },
    { t: 'Climb the trellis to the open upstairs window.', a: 'sneak', req: 'sneak>=3', fx: ['+entry_trellis'],
      res: 'The trellis is roses, which is unfair, but it holds. The upstairs window is open two inches, like someone wanted air or wanted out. You slide in over a desk covered in nail polish and land in a teenager\'s bedroom that smells of vanilla and a fight that never finished. Nobody screams. Nobody is here.', next: 'c1_inside' },
    { t: 'Don\'t go in tonight. Sleep in the car port and look at it in daylight.', a: 'flee', next: 'c1_carport' }
  ]
});

FK.S({
  id: 'c1_backdoor', ch: 1, loc: 'street', sub: true, title: 'The Back Door',
  text: [
    'Round the side, past a garden hose coiled with the neatness of a man who has been told twice, past a dog house with SNOWBALL painted over the door and no dog in it. A dog house without a dog is fine. That is not technically a dog.',
    'The back door is unlocked.',
    'Not just unlocked. Somebody has taken the deadbolt\'s strike plate off the frame and put it in a sandwich bag, and taped the bag to the inside of the door, at eye height, like a note. The door swings open at a touch, on hinges that have been oiled recently. It does not creak. Doors in empty houses always creak.',
    'Every instinct you built over three years says: this is a door someone wants opened.'
  ],
  choices: [
    { t: 'Go in. A door is a door, and it\'s raining.', a: 'neutral', fx: ['+entry_back'],
      res: 'You step into a mudroom: boots lined up by size, a raincoat on a hook, a leash with no dog attached. The door closes behind you by itself, softly, on its oiled hinges. You choose to think nothing about that.', next: 'c1_inside' },
    { t: 'Check the yard first. Somebody oiled these hinges.', a: 'sneak', fx: ['+entry_back', '+yard_checked', 'scrap+1'],
      res: 'You circle the yard in the dark. Nobody is waiting behind the shed. The pool cover is full of rainwater and dead leaves. Behind the dog house you find a coffee can of screws, washers and something that might be a tiny engine, which you pocket out of habit. When you come back to the door it is still open, still waiting. You go in.', next: 'c1_inside' },
    { t: 'Screw the strike plate back on from the inside. If someone left it open, they can knock.', a: 'science', req: 'item:multimeter | item:lockpicks | item:crowbar | brains>=2', fx: ['+entry_back', '+door_fixed'],
      res: 'You find a screwdriver in the mudroom drawer, which is exactly where screwdrivers should be, and put the plate back where it belongs. The deadbolt slides home with a deep, satisfied clunk. It feels like you have done the house a favour. It also feels, very faintly, like you have locked something in.', next: 'c1_inside' }
  ]
});

FK.S({
  id: 'c1_dolores_key', ch: 1, loc: 'street', sub: true, title: 'The Watcher Across the Street',
  text: [
    'She opens the door before you knock, so she was watching. A woman in her seventies with a cardigan buttoned wrong and a stenographer\'s stare, the kind that takes down everything you say and some things you don\'t.',
    '"You\'re not a Smith," she says. "I know all the Smiths. I know the Smiths better than the Smiths know the Smiths. Who are you, and why are you dripping on my mat?"',
    'Behind her, on a hook by the door, a key on a ring with a plastic tag in neat handwriting: SMITH — EMERGENCIES ONLY. Her name is on the mailbox: D. PIKE.'
  ],
  choices: [
    { t: 'Flash the old inspector badge. "County. The family missed a water inspection."', a: 'talk', req: 'item:badge', fx: ['+entry_key', '+dolores_met', 'rep:dolores+1'],
      res: '"The county," she says, "has never once come out in the rain." But she reads the badge carefully, the way she reads everything, and hands you the key. "The water heater in that house is not normal," she adds. "Beth told me never to touch it. Tell the county that." She watches you all the way back across the street.', next: 'c1_inside' },
    { t: 'Tell her the truth. You\'re homeless, it\'s raining, and the house looks empty.', a: 'talk', req: 'mouth>=2', fx: ['+entry_key', '+dolores_met', 'rep:dolores+2'],
      res: 'She looks at you for a long time. "Beth Smith fixed my hip for nothing when the hospital wanted eleven thousand dollars," she says. "Beth would give you the key. So I will. You wipe your feet. You don\'t touch the garage. And if they come back, you\'re gone before they reach the porch." She presses the key into your hand. "They will come back," she says, as if she has to.', next: 'c1_inside' },
    { t: 'Smile, apologise, and lift the key off its hook while she\'s talking.', a: 'sneak', req: 'sneak>=2', fx: ['+entry_key', '+dolores_met', '+key_stolen'],
      res: 'You keep her talking about the Smiths, which is easy, because she has opinions. "And the grandfather," she says, "drinks in the garage at three in the morning and something in there goes WHUMP." Your hand finds the key ring behind her shoulder while she is describing the WHUMP. You thank her and leave. She will notice the empty hook tomorrow morning.', next: 'c1_inside' },
    { t: 'Push past her and take the key.', a: 'force', fx: ['+entry_key', '+dolores_met', 'rep:dolores-3', 'heat+2'],
      res: 'You don\'t hit her. You don\'t have to. You are big and wet and she is seventy-four, and when you step in she steps back into her hallway and you take the key off the hook. "I will remember your face," she says, very calmly, and you believe her. You cross the street with the key in your fist and your heart going like a bad engine.', next: 'c1_inside' }
  ]
});

FK.S({
  id: 'c1_carport', ch: 1, loc: 'street', sub: true, title: 'The Car Port',
  text: [
    'You sleep sitting up against the wall of the car port, out of the rain, under a shelf of paint cans and a bicycle with a flat. You do not mean to sleep. You do anyway.',
    'At three in the morning you wake, because the light has changed. Through the gap under the steel garage door, green light is spilling out across the concrete in long slow pulses, like breathing. There is a sound, too, a deep WHUMP you feel in your back teeth more than hear. Then the light goes out.',
    'At dawn the rain stops. The house looks smaller in daylight, and tired, and empty. The back door, when you try it, is unlocked. Somebody has taped the deadbolt\'s strike plate inside a sandwich bag to the inside of the door.'
  ],
  choices: [
    { t: 'Go in now, in daylight, before you think about the light too hard.', a: 'neutral', fx: ['+entry_morning', '+saw_light', 'hp+1'],
      res: 'You go in through the back. In daylight the house is just a house: a kitchen with a calendar on the fridge, shoes in a row. You are rested. You saw something last night that you can\'t explain, and that is information, not a reason to stand outside.', next: 'c1_inside' },
    { t: 'Watch the house all morning from behind the hedge before going in.', a: 'sneak', fx: ['+entry_morning', '+saw_light', '+knows_patrol', 'sneak+1'],
      res: 'From the hedge you learn the street. A patrol car rolls through at 9:10 and 9:50 and doesn\'t slow. The woman across the street, D. PIKE on the mailbox, checks the Smith house through her blinds every forty minutes like a clock. By noon you know how to cross the yard without being seen. You go in through the back.', next: 'c1_inside' }
  ]
});

FK.S({
  id: 'c1_inside', ch: 1, loc: 'house', sub: true, title: 'Inside',
  text: [
    { if: 'entry_back | entry_morning', t: 'The mudroom opens into a kitchen. Dishes in the rack, dry. A calendar on the fridge with a page torn out. A bowl on the counter full of phones, five of them, all dead.' },
    { if: 'entry_window', t: 'You pick glass out of your sleeve in a kitchen that has very clearly been cleaned by someone who expected to come back. A bowl on the counter holds five dead phones. Rain blows in through the window you broke and puddles on the tile.' },
    { if: 'entry_lock | entry_key', t: 'The front hall smells of carpet shampoo and old dog. A row of hooks: a girl\'s denim jacket, a lab coat, a man\'s fleece with an embroidered logo for a company that went under. On the hall table, a bowl full of phones. Five of them. All dead.' },
    { if: 'entry_trellis', t: 'The teenager\'s room gives onto an upstairs landing. Downstairs you find a bowl on the kitchen counter full of phones: five of them, all dead, as if a family agreed to put them away and then never came back for them.' },
    'The house is warm. That is the first wrong thing. The heating is on. The fridge hums. A clock in the living room ticks, and it is right. Somebody has been paying the bills, or the bills don\'t matter here.',
    'Down the hallway, framed photos: a wedding, a horse in a surgical gown, a boy with a science fair ribbon, a girl scowling at a prom. And the big one, at the end of the hall: the whole family on a couch. An old man with spiked white hair and a look like he is about to say something unforgivable. A tired, clever woman. A man smiling too hard. The scowling girl. The boy.',
    'High on the living room ceiling, a smoke detector blinks a small red light. It blinks a little faster when you look at it.',
    'You have done this a hundred times. First night: decide where to sleep, decide what to touch, decide how to leave if you have to.'
  ],
  choices: [
    { t: 'Sleep on the couch with your boots on and your back to the wall.', a: 'neutral', fx: ['hp+1', '+slept_couch'],
      res: 'The couch is the good kind. You sleep like a dropped coat. Twice in the night you wake and are certain that someone is standing in the kitchen doorway. The second time you say "hello?" out loud and nobody answers, which is the correct answer.', next: 'hub' },
    { t: 'Search the place now, while it\'s dark and you\'re still wired.', a: 'sneak', fx: ['scrap+1', '+night_search'],
      res: 'You walk every room with your flashlight cupped in your hand. Nobody here, nobody hiding. One thing: in every room, something has been left out as if someone was coming back in five minutes. A mug of coffee, cold. A book face down. A video game paused on a TV in an upstairs bedroom, controller on the bed. You find a drawer of loose batteries and wires and take some. You do not sleep much.', next: 'hub' },
    { t: 'Rig the doors with pans and string so nobody can walk in without you hearing.', a: 'gadget', req: 'brains>=2 | item:multimeter', fx: ['+tripwire'],
      res: 'Pots from the kitchen, kitchen twine, a chair under each handle. Old trick, low tech, works. You set them at the front, the back and the door from the kitchen to the garage. Then you sleep, lightly, in the hall cupboard with the coats. At four in the morning one of the pans rings, once, softly, as if touched by a careful hand. When you get there the string is intact and the chair hasn\'t moved.', next: 'hub' }
  ]
});

/* ============================================================== house rooms (chapter 1 hub) */

FK.S({
  id: 'h_kitchen', ch: [1, 2], loc: 'house', title: 'The Kitchen', teaser: 'A full fridge in an empty house.',
  text: [
    'The kitchen of a family that ate together, or tried to. A table with one chair at the head that is a different, better chair. A fridge covered in magnets: a horse, a planet, a takeout menu for a place called Shoney\'s with a phone number scribbled over in a teenager\'s handwriting.',
    'The fridge is full. Not old-full. Full-full. Milk with a date next week. Fresh bread in the box. Eight tubs of a very specific brand of low-fat yogurt, lined up like soldiers.',
    'A family three weeks gone does not have next week\'s milk.'
  ],
  choices: [
    { t: 'Eat. Properly. Sitting down at the table.', a: 'neutral', fx: ['hp+2', '+ate_kitchen'],
      res: 'Eggs, toast, coffee, a yogurt because there are eight of them and that is just showing off. You eat at the table, not the head chair, the side one. It is the best meal you\'ve had in a month. When you look up from the plate, one of the yogurts in the fridge door has been turned so its label faces out. You are almost sure it wasn\'t before.', next: 'hub' },
    { t: 'Check the dates and receipts. Who has been shopping?', a: 'science', req: 'brains>=2', fx: ['+clue_food', 'note:The kitchen is restocked. Milk dated next week. Someone has been buying groceries for an empty house.'],
      res: 'You find the receipt balled up in the trash: two days old, a supermarket across town, paid in cash. Eight yogurts, bread, milk, a box of the cereal on top of the fridge. Nobody delivered this. Somebody walked it in. Somebody with a key, or somebody who never needed one.', next: 'hub' },
    { t: 'Take some cans for later and touch nothing else.', a: 'sneak', fx: ['give:canned', '+tidy'],
      res: 'Three cans of beans from the back of the pantry, where nobody would miss them. You leave the kitchen exactly as you found it, down to the angle of the chair at the head of the table. Old habit. If someone is counting things, you want them to count wrong.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_living', ch: [1, 2], loc: 'house', title: 'The Living Room', teaser: 'A recliner nobody sits in.',
  text: [
    'The big TV. A couch you have maybe already slept on. A recliner, cracked brown leather, worn into the exact shape of one particular old man, with a side table holding a coaster, a burn mark, and an empty bottle of something with no label.',
    'Above it all, the smoke detector blinks its little red light.',
    { if: '!clue_photo', t: 'Through the doorway you can see the big photo at the end of the hall. The family on the couch. This couch.' },
    'On the floor by the recliner, wedged under the cushion, the dull glint of something metal.'
  ],
  choices: [
    { t: 'Sit in the old man\'s chair.', a: 'force', fx: ['+sat_chair', 'rep:caretaker-1', 'hp+1'],
      res: 'It is, without question, the most comfortable chair you have ever sat in. Something in it has been engineered past what a chair should be. You sink. You sigh. The smoke detector stops blinking and holds a steady, offended red, and a speaker you didn\'t know was there clears its throat, a crackle of static, and then thinks better of it.', next: 'hub' },
    { t: 'Dig the metal thing out from under the cushion.', a: 'sneak', fx: ['give:flask'],
      res: 'A steel flask, dented, monogrammed with an R. You unscrew the cap and the air above it wobbles like heat over a road. It smells like jet fuel and pine needles. You do not drink it. You keep it.', next: 'hub' },
    { t: 'Turn on the TV for company.', a: 'neutral', fx: ['heat+1', '+tv_on'],
      res: 'The TV comes on to a channel you\'ve never seen. A man with too many arms is selling a knife that cuts "the concept of bread". You flick through. Local news: a mention of a police appeal for "information about the Smith family of Lindell Court, believed to be travelling." Your street. The neighbour across the road will have heard the TV through the window. You turn it down, then off.', next: 'hub' },
    { t: 'Stand under the smoke detector and look straight at it.', a: 'talk', fx: ['+caretaker_awake'],
      res: '"I know you\'re watching," you say. The light blinks. "I\'m not going to break anything." The light blinks. "I\'m just staying till the rain stops." A long pause. Then a speaker crackles, and a dry, offended voice says: "It is going to rain for a very long time." Then the light goes back to blinking like nothing happened.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_hallphoto', ch: [1, 2], loc: 'house', title: 'The Photo in the Hall', teaser: 'Five people on a couch.',
  text: [
    'The big one at the end of the hall. Five people on the couch in the living room, the same couch, in front of the same window. Somebody set a timer and ran. You can tell which one, because the old man is the only one sitting comfortably.',
    'The boy is looking at the camera. The girl is looking at the boy. The father is looking at the mother, hopefully. The mother is looking at the old man, and the old man is looking at something off to the side, past the camera, at about the place where you are standing now.',
    'The date is written in the corner in silver pen: 6/14.'
  ],
  choices: [
    { t: 'Take it off the wall. You want it where you can see it.', a: 'neutral', fx: ['give:photo', '+photo_seen'],
      res: 'It comes off the hook easily. There is a clean rectangle of paint behind it, and on the back of the frame, in pencil: "Last normal one." You put it in your bag. You tell yourself it is so you can put it back properly when you leave.', next: 'hub' },
    { t: 'Leave it. Memorise it instead: who sits where, who looks at whom.', a: 'sneak', fx: ['+photo_seen', '+photo_memorised'],
      res: 'Old man on the left, then the mother, then the father, then the girl, then the boy. Old habit from house-sitting days: know what the room looked like so you can put it back. You walk away. When you glance back from the kitchen, the boy in the photo is looking at you, not the camera. You decide the light changed.', next: 'hub' },
    { t: 'Turn it to face the wall.', a: 'force', fx: ['+photo_seen', '+photo_turned', 'rep:family-1'],
      res: 'Rule two: never a house with the photos still up. So you take the photos down, in your way. You turn the big frame to face the wall. It is just a back of brown paper now. In the morning, it is facing the right way again.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_photo_again', ch: [1, 2], loc: 'house', title: 'The Photo, Again', teaser: 'Something in the hall is different.',
  req: 'photo_seen & turn>=6',
  text: [
    { if: 'item:photo', t: 'You take the photo out of your bag to look at it under the kitchen light, and stop.' },
    { if: '!item:photo', t: 'Walking past the end of the hall, you stop.' },
    'The boy is not looking at the camera now. He is looking out of the frame, to the right, at nothing. The girl has her arms crossed, and in the first picture they were not crossed. You are sure. You memorised it. The father is wearing a different shirt, with a stain on the cuff, as if the photo had been taken today.',
    'And the old man is looking straight at you.'
  ],
  choices: [
    { t: 'Accept it. Something in this house is changing on purpose. Write it down.', a: 'science', fx: ['+clue_photo', 'note:The family photo changes. Poses, clothes. As if it was being retaken.'],
      res: 'You get a pen and draw the photo the way it was and the way it is. Two sketches side by side. Different shirt. Different arms. Different eyes. You are not losing your mind. You are counting. Counting is what you do instead of panicking.', next: 'hub' },
    { t: 'Say it out loud: "Who is in here with me?"', a: 'talk', fx: ['+clue_photo', '+asked_aloud', 'rep:family+1'],
      res: 'Silence, then the fridge kicks on. Then, upstairs, very faintly, a door closes the way a door closes when a teenager wants you to know they are annoyed but can\'t be accused of slamming. You stand at the bottom of the stairs a long time. Nobody comes down. You have your answer. It just isn\'t a sentence yet.', next: 'hub' },
    { t: 'Smash the frame. You don\'t need this.', a: 'force', fx: ['rep:family-2', '+photo_smashed', 'heat+1'],
      res: 'Glass on the hall carpet. You stamp on the photo until the faces are scratches. It feels good for three seconds and bad for the rest of the night. Somewhere in the walls, something hums one note lower, like a sigh.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_morty', ch: [1, 2], loc: 'house', title: 'The Boy\'s Room', teaser: 'Science ribbons and a paused game.',
  text: [
    'A boy\'s room, fourteen or fifteen. Science fair ribbons, a poster of a band you\'ve never heard of, a game paused on a little TV with the controller on the bed. The pause screen says PRESS START TO CONTINUE, and has said it for weeks.',
    'In the closet, a small lab coat, singed at one cuff. Under the bed, a shoebox labelled PRIVATE in letters so big they are basically a dare.',
    'On the desk, a sheet of notepaper with one line on it, written and rewritten in pencil until the paper went soft: "if you are reading this".'
  ],
  choices: [
    { t: 'Open the PRIVATE box.', a: 'sneak', fx: ['+read_box', 'scrap+1'],
      res: 'Inside: a ticket stub, a hair tie that isn\'t his, a tiny screwdriver set, and a list headed THINGS GRANDPA SAID NOT TO TOUCH. The list is long. Number one is "THE HEATER". Number two is "THE CHAIR". Number nine is "the blue button (any blue button)". You take the screwdriver set. Somebody should use it.', next: 'hub' },
    { t: 'Finish the note on the desk. Write underneath: "I am. Who are you?"', a: 'talk', fx: ['+note_reply', 'rep:family+1'],
      res: 'You feel ridiculous. You write it anyway, in your careful driver\'s-log capitals, and leave the pencil on top. Then you go downstairs, and for the rest of the day you do not go back to check, because if you check and nothing has changed you will feel stupid, and if you check and something has changed you will feel something worse.', next: 'hub' },
    { t: 'Unpause the game.', a: 'neutral', fx: ['+game_played', 'hp+1'],
      res: 'You play for an hour. It is a game about a man who builds a farm on a dead planet. Your save file says PLAYER 2. Player 1 is called MORTY and has 412 hours. You don\'t save over him. When you put the controller down, you feel more like a person than you have in weeks. It\'s a stupid game. It helped.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_summer', ch: [1, 2], loc: 'house', title: 'The Girl\'s Room', teaser: 'A phone that stopped mid-sentence.',
  text: [
    'Nail polish on the desk, a mirror with photos stuck in the frame, a laptop with a sticker that says I\'M NOT YELLING YOU\'RE YELLING. The window you might have climbed in through. A charger with no phone, because the phone is in the bowl downstairs with the others.',
    'The laptop is asleep, not off. The light on its edge breathes slowly.',
    'On the nightstand, a pink canister of pepper spray and a note in a mother\'s handwriting: "Please carry this. Love you. — Mom."'
  ],
  choices: [
    { t: 'Wake the laptop and read her messages.', a: 'science', req: 'brains>=2 | mouth>=2', fx: ['+read_messages', '+knows_code'],
      res: 'Her messages are open. The last one she sent, three weeks and two days ago: "grandpa made us all put our phones in a bowl for DINNER like it\'s 1950. he\'s being so weird. he changed the garage code to the dinner date BACKWARDS like that\'s a password. anyway if i disappear tell everyone it was a family dinner that killed me lol". Her friend replied "lol". Then, the next day, "??". Then, a week later, "summer where are you". Then nothing.', next: 'hub' },
    { t: 'Take the pepper spray.', a: 'force', fx: ['give:spray'],
      res: 'It is expired, but pepper spray mostly keeps its opinion. You pocket it. You leave the note.', next: 'hub' },
    { t: 'Look at the photos in the mirror frame.', a: 'neutral', fx: ['+mirror_photos'],
      res: 'Friends at a lake. A boy she clearly liked and then clearly didn\'t, his face scratched out with a pin. Her and her brother on a roof, both holding something glowing and laughing. And one of her grandfather, asleep in a lawn chair, with "the menace" written under it in gel pen and three hearts. People loved him. Even the angry one.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_master', ch: [1, 2], loc: 'house', title: 'The Master Bedroom', teaser: 'A horse surgeon\'s kit and a calendar.',
  text: [
    'A big bed made tight enough to bounce a coin. Two nightstands: hers with a stack of veterinary journals and a wine glass with a dry red ring at the bottom; his with a self-help book called YOU ARE THE CAPTAIN OF YOUR OWN SHIP and a bookmark on page four.',
    'On top of the wardrobe, a steel case the size of a suitcase: EQUINE SURGICAL — B. SMITH, DVM.',
    'Pinned to the corkboard by the door is the kitchen calendar\'s missing page.'
  ],
  choices: [
    { t: 'Take the surgical kit down. You might need stitches before this is over.', a: 'neutral', fx: ['give:medkit'],
      res: 'It is heavy, well stocked, and every instrument is in its slot. Sutures sized for horses. Painkillers sized for horses, too, which you will be careful with. You feel safer with it in your bag than you have felt in three years.', next: 'hub' },
    { t: 'Take the calendar page.', a: 'science', fx: ['give:calendar', '+knows_code'],
      res: 'JUNE. Shifts, dentist, a driving test with a question mark. One square circled three times in red: 14 — FAMILY DINNER — PHONES IN THE BOWL. Under it, in a different, terrible handwriting: "door code = this, backwards, because I\'m not an idiot." You look at it for a while. You have spent your life with codes. Dates are a favourite. People think backwards is clever.', next: 'hub' },
    { t: 'Put on the father\'s clothes. Look like you live here.', a: 'talk', fx: ['+disguise', 'mouth+1'],
      res: 'His fleece, his khakis, a pair of loafers half a size too big. You look in the mirror and see a man who apologises to waiters. You look like you belong on this street. That is a disguise, too.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_basement', ch: [1, 2], loc: 'house', title: 'The Basement', teaser: 'Something down here is humming.',
  text: [
    'Concrete steps, a pull-cord bulb, shelves of paint and Christmas decorations and a box of the boy\'s old toys. The fuse box on the wall is not a normal fuse box: it has nine switches in a grid and a small hand-written label: PUZZLE. DON\'T. — R.',
    'In the corner stands the water heater.',
    'It is humming. Not the hum of a pilot light. A chord, three notes, low and steady, that you feel in your fillings. There are no pipes going into it. There are no pipes coming out. There is just a white enamel cylinder standing on the floor with a dial on the front, humming to itself in the dark.',
    'On the shelf by the stairs: a bag of heavy-duty zip ties and a spare fuse.'
  ],
  choices: [
    { t: 'Put your hand on the heater.', a: 'neutral', out: [
      { req: 'brains>=3 | skill:tinker | item:multimeter', fx: ['+clue_heater', 'note:The basement "heater" has no pipes. It hums a chord, and the chord changes when someone upstairs is walking.'],
        res: 'Warm, not hot. The hum goes up your arm. You hold your meter to it, or just listen like an engineer, and the chord changes: one note drops when you hear the floorboards creak upstairs, and rises when they stop. It isn\'t heating water. It is listening to the house, or holding it up. Something in your gut goes very cold.', next: 'hub' },
      { fx: ['+heater_touched'], res: 'Warm, not hot. The hum goes up your arm and into your teeth. For a second you could swear you smell cooking, onions in butter, and hear somebody laughing very far away. Then it is just a water heater with no pipes, which is bad enough.', next: 'hub' }
    ] },
    { t: 'Work out the fuse box puzzle.', a: 'science', puzzle: { kind: 'lights', size: 3, presses: [0, 4, 8], prompt: 'Nine switches. Each flick toggles itself and its neighbours (up, down, left, right). Light all nine.' },
      win: { fx: ['+fusebox'], res: 'The last switch clicks and all nine lights glow amber together. Somewhere above you, every small electronic noise in the house stops at once, then starts again. You understand now: this box decides what in this house has power. Including the voice in the smoke detector.', next: 'hub' },
      lose: { fx: ['hp-1'], res: 'You flick one switch too many and the box bites you: a blue snap that throws you on your back on the concrete. You lie there smelling your own singed hair and listening to the heater hum, a little louder, like a laugh.', next: 'hub' } },
    { t: 'Take the zip ties and the spare fuse.', a: 'neutral', fx: ['give:zipties', 'scrap+1'],
      res: 'You pocket the fuse and loop the zip ties through your belt. You don\'t think about what you might need them for. You are a planner. Planning isn\'t the same as wanting.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_attic', ch: [1, 2], loc: 'house', title: 'The Attic', teaser: 'Boxes of things that should not exist.',
  req: 'seen:h_master | seen:h_morty | night_search',
  text: [
    'A loft ladder in the upstairs hall. Up there: heat, dust, pink insulation and boxes. Most are normal: baby clothes, Christmas lights, tax returns. Some are not.',
    'One box is labelled JUNK (GOOD) and is full of tiny engines, coils, lenses and things that twitch. One is a gun case with no gun shape inside it: the foam is cut for something with three barrels and a fin. One shelf holds a row of glass vials of thick green liquid, all empty but one.',
    'You can carry one load down that ladder without making the ceiling creak for the whole street.'
  ],
  choices: [
    { t: 'Fill your bag with parts from the JUNK (GOOD) box.', a: 'science', fx: ['scrap+3'],
      res: 'Coils, lenses, a little engine that tries to crawl out of your hand. You pack it in towels. You have no idea what most of it is, but it is the kind of junk that becomes not-junk in the right hands.', next: 'hub' },
    { t: 'Take the strange pistol from the gun case.', a: 'force', fx: ['give:raygun_broken', 'scrap+1'],
      res: 'It is heavy, alien, and dead. The coil is cracked. Turn it over and there is a sticker: "BROKEN. DON\'T FIX. — R". The sticker makes you want to fix it.', next: 'hub' },
    { t: 'Take the one full vial of green liquid.', a: 'gadget', fx: ['give:fluid'],
      res: 'PORTAL JUICE — DON\'T DRINK (AGAIN), says the label. It is warm and glows when you tilt it, and you can hear it, very faintly, like a shell held to your ear, except the sea is somewhere else entirely.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_yard', ch: [1, 2], loc: 'house', title: 'The Backyard', teaser: 'A shed, a dog house, a pool full of leaves.',
  text: [
    'The yard is long and badly mowed. A covered pool full of rainwater and leaves. A dog house painted SNOWBALL, with chew marks on the door frame that are much too high and far too deep for any dog.',
    'At the back, a tin shed with a padlock that is the only new thing out here.'
  ],
  choices: [
    { t: 'Rip the padlock off with the crowbar.', a: 'force', req: 'item:crowbar | muscle>=3', fx: ['scrap+2', 'heat+1', '+shed_open'],
      res: 'The hasp tears out of the tin with a scream the whole street hears. Inside: a mower, a box of tools, a leaf blower modified with what looks like a jet engine, and a coil of copper you strip for scrap. A dog barks three houses down. You stand very still until it stops.', next: 'hub' },
    { t: 'Pick the padlock.', a: 'sneak', req: 'item:lockpicks | skill:lockwork', fx: ['scrap+2', '+shed_open'],
      res: 'A cheap padlock in an expensive costume. Inside: a mower, tools, a leaf blower modified with what looks like a jet engine. You leave the blower, take a coil of copper and some fittings, and lock up after.', next: 'hub' },
    { t: 'Look inside the dog house.', a: 'sneak', fx: ['+doghouse', 'scrap+1'],
      res: 'Inside: a bowl the size of a hubcap, a collar the size of a belt, and a small brass plaque on the back wall: "SNOWBALL — GONE TO A BETTER PLANET. NO REALLY." Under the straw, a handful of chewed metal that was once something electronic. You take it. You think about the chew marks on the door frame and you decide the rule about dogs is still technically intact.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_window', ch: [1, 2], loc: 'house', title: 'The Front Window', teaser: 'Watch the street.',
  text: [
    'From the dark of the front room you can see the whole cul-de-sac: six houses, all lit except this one. A sprinkler ticking somewhere. A cat on a car.',
    'Across the street, in the house with D. PIKE on the mailbox, a curtain hangs exactly still, and behind it, a darker shape that might be a person and might be a coat stand.',
    { if: 'heat>=4', t: 'A patrol car rolls slowly through the turning circle, its spotlight brushing across this house\'s windows like a hand looking for a light switch.' }
  ],
  choices: [
    { t: 'Learn the street. Patrol times, dog walkers, who checks what.', a: 'sneak', fx: ['+knows_patrol', 'heat-1'],
      res: 'You give it two hours. The patrol comes every forty minutes. The man at number four walks his dog at eleven. The curtain across the road moves on the hour. Now you know when to move and when to freeze. Knowing is the closest thing you have to safety.', next: 'hub' },
    { t: 'Wave at the curtain.', a: 'talk', fx: ['rep:dolores+1', '+waved'],
      res: 'You lift a hand like a neighbour would. A long pause. Then, behind the curtain, a hand lifts back, slowly, like someone making a note of it.', next: 'hub' },
    { t: 'Draw every curtain in the house and live in the dark.', a: 'flee', fx: ['heat-2', '+curtains_drawn'],
      res: 'You draw every curtain and blind. The house goes dim and close. From outside, it will look empty again: the most natural thing in the world. You feel it in your chest: a little safer, a lot more alone.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_cereal', ch: [1, 2], loc: 'house', title: 'Cereal', teaser: 'Something in the cereal box.',
  req: 'seen:h_kitchen & turn>=5',
  text: [
    'Breakfast. You reach for the cereal on top of the fridge, a box of something shaped like tiny planets, and something stiff slides around inside it that is not cereal.',
    'A folded piece of notepaper. The handwriting is a boy\'s: round, careful, pressed too hard.',
    '"please don\'t sit in grandpa\'s chair. please don\'t go in the garage. please DONT touch the heater in the basement. the yogurt is my dad\'s, he gets upset. thank you. you seem ok."',
    { if: 'note_reply', t: 'And underneath, in the same hand, smaller: "I can\'t tell you who I am. but hi."' }
  ],
  choices: [
    { t: 'Keep the note and think hard about what it means.', a: 'science', fx: ['+clue_notes', 'note:A note from the boy, inside the cereal. Fresh. "You seem ok."'],
      res: 'The note is new. The pencil is sharp. The boy is fifteen and gone for three weeks and somehow he is writing you notes about yogurt. You line up the facts in a row, the way you used to line up a truck\'s paperwork, and they don\'t fit together. Not yet.', next: 'hub' },
    { t: 'Write a reply on the back and put it back in the box.', a: 'talk', fx: ['+clue_notes', '+note_reply2', 'rep:family+1'],
      res: '"I\'m Hollis," you write. "I won\'t sit in the chair. I won\'t touch the heater. Where are you?" You fold it, put it back in the box, and put the box back exactly where it was, label out.', next: 'hub' },
    { t: 'Sit up all night in the dark kitchen to catch whoever does this.', a: 'sneak', fx: ['+clue_notes', '+blanket', 'hp+1'],
      res: 'You sit in the corner with the lights off and a coffee you don\'t drink. You do not mean to fall asleep. You wake at dawn in the same chair with a blanket over your legs, the boy\'s blanket, the one with the planets. Someone tucked it in at the sides. Nobody came through any door you can see.', next: 'hub' }
  ]
});

/* ============================================================== events */

FK.S({
  id: 'e_noise', ch: 1, loc: 'house', forced: true, prio: 5, title: 'Footsteps Upstairs',
  req: 'turn>=3',
  text: [
    'Two in the morning. You wake because the house is wrong.',
    'Footsteps. Upstairs, crossing the landing: not creeping, just walking, the slippered shuffle of somebody who lives here and is getting a glass of water. Then the stairs, one, two, three. Then they stop, halfway down, as if whoever it is has seen something they did not expect. You. On their couch.',
    'You can\'t see the stairs from where you are. You can see the kitchen doorway, and the dark, and the little red light on the smoke detector, blinking fast.'
  ],
  choices: [
    { t: 'Grab something heavy and go up the stairs.', a: 'force', fx: ['+noise_charged'], out: [
      { req: 'item:crowbar | item:raygun_broken | muscle>=3', fx: ['+clue_food'],
        res: 'You take the stairs two at a time with your weapon up. Nobody. The landing is empty. But the bathroom light is on and the tap is dripping, and on the floor of the bathroom is a man\'s slipper, still warm, the left one, and a single spoon with yogurt on it. You check every room. You check the closets. You check the attic. Nobody. When you come back down, the spoon is gone.' },
      { fx: ['hp-1', '+clue_food'], res: 'You charge the stairs in the dark and miss the turn. The banister catches you in the ribs hard enough to see colours. By the time you get up, the stairs are empty. On the landing, a single spoon with yogurt on it. Then you hear, from somewhere that is not upstairs and not downstairs, very faintly, a man saying "I\'m sorry! I\'m sorry, I was hungry!" and a woman saying "Jerry."' }
    ] },
    { t: 'Hide in the hall cupboard and listen.', a: 'sneak', fx: ['+clue_food', '+heard_names'],
      res: 'You fold yourself in with the coats and hold your breath. The footsteps reach the bottom of the stairs, cross to the kitchen, and the fridge opens. Light under the cupboard door. A rustle. A lid. A man\'s voice, a whisper, guilty: "Just one." Then a woman\'s voice, from no direction at all: "Jerry. Back. Now." The fridge closes. The light goes. No footsteps leave the kitchen. When you come out, one yogurt is missing.' },
    { t: 'Call out, calm and clear: "I\'m not here to hurt anybody."', a: 'talk', fx: ['+caretaker_awake', 'rep:family+1'],
      res: 'Your voice sounds very loud. The footsteps stop. Nothing for a long time. Then the smoke detector speaker crackles and a dry voice says: "Nobody is here. Go back to sleep." Then, quieter, like it is talking to someone else: "No, I told him. He\'s going back to sleep." Then nothing.' },
    { t: 'Out the back door, now. Sleep in the car port.', a: 'flee', fx: ['heat-1', '+fled_noise'],
      res: 'You are out of the back door before you have decided to be. The car port is cold, but it is outside, and outside is a place you understand. At three, the garage door bleeds green light under itself and WHUMPs. At dawn you go back in. The kitchen is clean. Someone washed the cup you left out.' },
    { t: 'Stay on the couch and pull the tripwire string you rigged.', a: 'gadget', req: 'tripwire', fx: ['+clue_food', '+trap_slipper'],
      res: 'You yank the line and every pan in the house goes off like a marching band falling down the stairs. Somebody yelps, a man, high, and something hits the floor. When you get the light on, the stairs are empty. On the bottom step, tangled in your kitchen twine, is a man\'s slipper, the left one, still warm.' }
  ]
});

FK.S({
  id: 'e_caretaker', ch: 1, loc: 'house', forced: true, prio: 4, title: 'The Voice in the Smoke Detector',
  req: '(caretaker_awake | turn>=5) & !caretaker_off',
  text: [
    'The smoke detector stops blinking. The speaker in it, which should be the size of a coin, produces a voice that fills the room like it\'s coming from the walls.',
    '"Right. Fine. We\'re doing this." It is dry, nasal, and very tired. "I am the domestic security and maintenance intelligence of this property. You can call me the Caretaker, because I take care, and because you are not allowed to know my real name. This property is currently unoccupied. Therefore, logically, you are not here. Therefore I would like you to not be here more efficiently. Leave."',
    { if: 'sat_chair', t: '"Also," it adds, "you sat in the chair. I saw that. Everyone saw that."' },
    { if: 'tv_on', t: '"And you turned on the television at a volume audible from the street. Do you know what a neighbourhood watch is? We have one. Her name is Dolores."' },
    'A pause. "Well? I\'m waiting for the efficient leaving."'
  ],
  choices: [
    { t: 'Be polite. Offer it a deal: you keep the place clean, it keeps quiet.', a: 'talk', fx: ['+caretaker_awake', 'rep:caretaker+2'],
      res: '"A deal." It sounds like it has never been offered one. "You clean. I don\'t call anyone." A long, crackling pause. "The gutters," it says. "Nobody has done the gutters in two years. Do the gutters and we can discuss your continued non-existence." You do the gutters the next morning. It watches the whole time and says nothing, which you understand is approval.', next: 'hub' },
    { t: '"Or what?" Pull the smoke detector off the ceiling.', a: 'force', fx: ['+caretaker_awake', 'rep:caretaker-2'],
      res: 'You stand on the coffee table and twist the detector off its mount. Wires, a tiny lens, a speaker. "Ow," says the TV, behind you, in the same voice. "That was a rental." Every screen in the house lights up with the same red dot. "I am in the walls, you oaf. I am in the toaster. You are going to have a terrible time here, and I am going to enjoy it professionally."', next: 'hub' },
    { t: 'Ask it technical questions until it gets interested in you.', a: 'science', req: 'brains>=3 | item:multimeter', fx: ['+caretaker_awake', 'rep:caretaker+1', '+caretaker_tool'],
      res: 'What\'s it running on. What\'s its sensor loop. Why does it route through the basement. It answers the first two out of pride and the third out of habit before it catches itself. "That is not a question for guests." But you have its maintenance menu now: you saw the pattern in how it talks. With a meter and an hour you could rewrite who it obeys. It knows that. It is suddenly very polite.', next: 'hub' },
    { t: 'Go down to the fuse box and switch it off.', a: 'gadget', req: 'fusebox', fx: ['+caretaker_off', 'rep:caretaker-3', 'heat-1'],
      res: '"Don\'t you dare," says the house as you take the basement stairs. "Don\'t you DARE, I have a very important — " You flick the switch you learned. The red light dies. Every little electronic sound in the house stops at once. The quiet is enormous. Somewhere, very far away, someone says "oh, come ON," and then that\'s gone too.', next: 'hub' },
    { t: 'Ignore it. Go back to sleep.', a: 'neutral', fx: ['+caretaker_awake'],
      res: 'You turn over on the couch and pull your jacket over your head. "Rude," says the house. "Profoundly rude." It plays a recording of a smoke alarm at you once, at four in the morning, out of spite. That is all it does. You suspect it isn\'t allowed to do more, and that it hates that.', next: 'hub' }
  ]
});

FK.S({
  id: 'e_dolores', ch: 1, loc: 'house', forced: true, prio: 3, title: 'A Knock at the Door',
  req: 'turn>=4 & !dolores_met',
  text: [
    'Three knocks. Not police knocks: precise, measured, a person who has thought about knocking.',
    'Through the peephole: a woman in her seventies in a cardigan buttoned wrong, holding a covered dish. She looks straight at the peephole as if she can see your eye.',
    '"I know someone\'s in there," she says through the door, quite pleasantly. "I am Dolores Pike, from across the street. I have brought a casserole, because that is what I do when I want to look inside somebody\'s house."'
  ],
  choices: [
    { t: 'Open up. "I\'m Beth\'s cousin. I\'m house-sitting."', a: 'talk', req: 'mouth>=2 | disguise', fx: ['+dolores_met'], out: [
      { req: 'mouth>=3 | disguise', fx: ['rep:dolores+2', '+dolores_alibi'],
        res: 'She looks at your face, at the father\'s fleece if you\'re wearing it, at the clean kitchen behind you. "Beth never mentioned a cousin," she says. "But Beth never mentions anything. Fine. If anyone asks, I\'ll say I know you." She hands you the casserole. "Tuna. Don\'t make that face." She looks past you at the hall where the photos are and something in her face goes soft and worried. "They will come back," she says. "Won\'t they."' },
      { fx: ['rep:dolores-1'], res: '"Beth\'s cousin." She repeats it like she is typing it. "From which side?" You say a side. It is the wrong side. "Mm," says Dolores. She leaves the casserole. She also, you notice, writes something in a little notebook on the way back across the street.' }
    ] },
    { t: 'Flash the badge. "County. Welfare check on the residence."', a: 'talk', req: 'item:badge', fx: ['+dolores_met', 'rep:dolores+1', '+dolores_spooked'],
      res: '"About time someone from the county came," she says, and looks almost relieved. "Three weeks. Their car is still in the shop on Fifth, did you know that? Nobody goes on vacation without their car." She tells you everything she knows, which is a lot, and none of it explains anything. She leaves you the casserole for "the department".' },
    { t: 'Don\'t answer. Stay low until she leaves.', a: 'sneak', fx: ['+dolores_met', 'rep:dolores-1', 'heat+2'],
      res: 'You crouch behind the couch. She knocks again. "I can see your boots in the hall," she says. "They\'re wet." She sets the casserole on the step and goes back across the street. Twenty minutes later a patrol car makes an extra lap of the cul-de-sac.' },
    { t: 'Yank the door open with the crowbar in your hand.', a: 'force', fx: ['+dolores_met', 'rep:dolores-3', 'heat+3'],
      res: 'She takes one look at you and the steel in your hand and steps back off the porch. She does not drop the casserole. "Right," she says. "Right." She walks back across the street without hurrying, and her front door locks with three separate locks, and you hear her talking on the phone through her open window.' },
    { t: 'Pull her inside before she can tell anyone.', a: 'betray', fx: ['+dolores_met', 'cap:dolores', 'rep:dolores-5', 'heat+2'],
      res: 'You open the door, take her by the arm and bring her in, quickly, before the street can see. The casserole hits the floor. She doesn\'t scream. She is too angry to scream. You sit her in a kitchen chair and tie her wrists with whatever you have, gently, and then not so gently when she bites. "You stupid, stupid man," she says. "Do you know what you\'ve done? People notice when I don\'t check the street." You put her in the master bedroom and lock the door. Now you are a kidnapper. That word sits in the house like a smell.' }
  ]
});

FK.S({
  id: 'e_police', ch: [1, 2], loc: 'house', forced: true, prio: 6, title: 'Blue Lights',
  req: 'heat>=5',
  text: [
    'Headlights sweep across the ceiling and stop. A car door. Footsteps up the path. The doorbell, and then a knock that means business.',
    '"Police. Officer Banks. We\'ve had a report of someone in the house. Can you come to the door, please?"',
    'Through the blinds: one officer, young, rain on his hat, hand resting near his belt. The patrol car idles in the drive with its lights on and nobody in it.'
  ],
  choices: [
    { t: 'Hide and let him look through empty windows.', a: 'sneak', req: 'sneak>=3 | curtains_drawn | knows_patrol', fx: ['heat-3'],
      res: 'You go flat in the dark between the couch and the wall. His flashlight crawls over the room through the window, across the recliner, across the photos, across the exact spot where your boots were ten seconds ago. He tries the front door. Locked. He tries the back. You hear him say into his radio: "Nothing. Empty. Probably kids." The car leaves. You lie there another hour anyway.', next: 'hub' },
    { t: 'Open the door and talk. You\'re house-sitting. You have a key.', a: 'talk', req: 'mouth>=3 | entry_key | dolores_alibi', fx: ['heat-4', 'rep:officer+1'], out: [
      { req: 'dolores_alibi | rep:dolores>=2', res: 'Before you finish your first sentence, Dolores Pike is crossing the street in her slippers. "Officer, this is Beth\'s cousin, I know him, I\'m the one who called in the first place and I was wrong, I am seventy-four and I am allowed to be wrong once a year." Banks looks at her, at you, at his notebook. He leaves. Dolores looks at you on the way back to her house and says, very quietly: "Once a year."', next: 'hub' },
      { res: 'You keep it boring. House-sitter. Family on a trip. Key in your hand. You mention the car being in the shop on Fifth before he can. He writes it down, says he\'ll pass it on, and tells you to keep the porch light on. You keep the porch light on.', next: 'hub' }
    ] },
    { t: 'Badge him. "County inspector. We\'re on the same side."', a: 'talk', req: 'item:badge & mouth>=2', fx: ['heat-3', '+badge_used_police'],
      res: 'He squints at the badge for longer than you like. It is ten years old and so is your face in it. But it\'s raining, and it\'s late, and you sound bored, and bored is the most convincing thing in the world. "Have a good night, sir." Sir. You close the door and lean on it.', next: 'hub' },
    { t: 'Ask the house to handle it.', a: 'gadget', req: 'rep:caretaker>=2 & !caretaker_off', fx: ['heat-5', 'rep:caretaker+1'],
      res: '"Oh, fine," says the smoke detector. The doorbell intercom crackles and a man\'s voice comes out of it, a nervous, eager, apologetic voice: "Hi, officer! Jerry Smith here! We\'re just fine, thanks, we got back late, Beth\'s asleep, sorry about all the noise!" Banks says "Okay, Mr. Smith, sorry to bother you," and leaves. "Not my best work," says the Caretaker. "He\'s easy to do, though. He\'s always apologising."', next: 'hub' },
    { t: 'Out the back, over the fence, and gone for the night.', a: 'flee', fx: ['heat-2', 'hp-1', '+fled_police'],
      res: 'You go out of the back door as he comes in the front. The fence takes skin off your palms. You spend the night under a footbridge two streets away, wet and shaking, listening to a radio somewhere play a song you used to like. In the morning, the patrol car is gone and the house is still empty. You go back. Of course you go back.', next: 'hub' },
    { t: 'Jump him when he steps inside.', a: 'force', out: [
      { req: 'muscle>=4 | skill:takedown | item:spray', fx: ['heat+3', '+officer_down', 'rep:officer-3'],
        res: 'You let him get a step into the hall and then you are on him: spray in the eyes if you have it, an arm around the neck if you don\'t. He is young and strong and he goes down anyway, and stays down. You drag him to his car, buckle him in, turn off the engine. When he wakes up he won\'t be sure what happened. His sergeant will be. The street will be crawling with them by morning.', next: 'hub' },
      { death: 'officer', next: '@death' }
    ] }
  ]
});
FK.death('officer', 'You go for him in the dark and he is faster than you, and better trained, and very scared. The taser takes your legs out. Your head takes the corner of the hall table on the way down. The last thing you see is the family photo on the wall, the old man looking down at you, unimpressed.');

FK.S({
  id: 'e_scout', ch: 1, loc: 'house', forced: true, prio: 2, title: 'Someone at the Garage',
  req: 'turn>=7',
  text: [
    'A blue-white flash in the backyard, like lightning that didn\'t want to make a fuss, and the WHUMP you have heard at night, but small.',
    'Through the kitchen window: a figure by the garage\'s side door. A boy, fifteen maybe, in grey coveralls patched at the knees, with a tool belt and a battered helmet. He\'s holding a device like a compass with a screen, sweeping it slowly over the garage wall. The device chirps. He frowns at it, then turns, and sweeps it over the house. Over the kitchen window. Over you.',
    'The needle swings and points at you, and stays there. He looks up from it, straight at the window, and his face does something complicated: surprise, then fear, then a kind of tired anger, like you are someone he has been chasing for a very long time.'
  ],
  choices: [
    { t: 'Go out there fast and put him on the ground.', a: 'force', out: [
      { req: 'muscle>=3 | skill:takedown | item:spray | item:crowbar', fx: ['+met_scout'], res: 'You are out of the back door and across the grass before he gets the device back in its holster. He\'s fast, but he\'s fifteen and underfed and you are not. He goes down in the wet grass with your knee in his back and the device skittering away. "Okay! Okay!" he says. "You\'re not — you\'re not even — oh, man. Oh man, you\'re not him."', next: 'e_scout_caught' },
      { fx: ['hp-1', '+met_scout', '+scout_escaped', 'rep:reclaimers-1'], res: 'You get a hand on his collar and he spins, quick and practised, and hits you in the throat with the device. By the time you can breathe again he has fired a stubby grey pistol at the air and gone through a green hole that closes behind him with a pop. In the grass, a bootprint, and a dropped chit of black plastic with numbers printed on it.', next: 'hub' }
    ] },
    { t: 'Stay out of sight and watch what he does.', a: 'sneak', fx: ['+met_scout', '+saw_code', '+knows_code', '+scout_watched'],
      res: 'You drop below the sill and watch through a gap. He turns back to the garage, taps a small box against the keypad, and the box shows him four digits; he types them in, and the steel door unlocks with a heavy clack. He doesn\'t go in. He just checks it\'s the right door, writes in a little notebook, closes it again, and fires a stubby grey pistol at the air. A green hole opens. He steps through it and is gone. You saw the code. You saw a boy walk through a hole in the air. You need a minute.' },
    { t: 'Open the window and talk to him.', a: 'talk', fx: ['+met_scout', '+scout_talked', 'rep:ninetytwo+2', '+clue_ledger', 'note:A boy in grey with a compass that pointed at me. He thought I was someone else. He called me "the owner".'],
      res: '"Hey," you say. "You lost?" He nearly drops the device. "You — you\'re the owner?" he says. "The needle says you\'re the owner." You tell him you\'re just a guy who needed somewhere dry. He looks from you to the needle and back. "That\'s not — it doesn\'t make mistakes. It\'s a ledger. It tracks who owns stuff." He looks scared now, and young. "If you\'re not him, then you should leave. Like, today. They\'re coming for whoever the needle says. Don\'t tell anyone I said that. I\'m Ninety-Two." Then he fires a stubby grey pistol at the air and is gone through a green hole.' },
    { t: 'Throw something at him and yell like a homeowner.', a: 'force', fx: ['+met_scout', '+scout_escaped', 'rep:reclaimers-1', 'rep:ninetytwo-1', 'heat+1'],
      res: 'A boot, a shout, the bellow of a man defending his lawn. It works. He bolts, fires a stubby grey pistol at the air, and dives through the green hole that opens. As it closes you hear him say "he\'s HERE, he\'s actually — " and then nothing. You have scared him off. You have also told whoever he works for that someone is home.' },
    { t: 'Ambush him from the side door, silent.', a: 'sneak', req: 'skill:ambush | sneak>=4', fx: ['+met_scout'],
      res: 'You go out of the side door and along the wall like water. He never hears you. One hand on the device, one arm around him, and he is on the ground with your weight on him before he has finished turning. "Wait — wait — " he says. "You\'re not — oh, man. You\'re not him."', next: 'e_scout_caught' }
  ]
});

FK.S({
  id: 'e_scout_caught', ch: 1, loc: 'house', sub: true, title: 'The Boy in Grey',
  text: [
    'Up close, he is just a kid. A tired, thin kid with a scar through one eyebrow and a name stencilled on the coveralls: 92. His helmet has rolled into the flowerbed. The compass-thing lies in the grass, its needle pointing straight at you.',
    '"It\'s a ledger," he says, when he sees you looking. "It tracks ownership. It said the owner was here. It said you were here. You can\'t be both. Nobody can be both unless — " He stops. "Look, let me go. If I don\'t check in, they send more. They send the Foreman. You do NOT want the Foreman."'
  ],
  choices: [
    { t: 'Tie him up and keep him. He knows things.', a: 'force', req: 'item:zipties | skill:takedown | muscle>=3', fx: ['cap:ninetytwo', 'give:ledger', '+clue_ledger', 'rep:reclaimers-2', 'rep:ninetytwo-1', 'sp+1'],
      res: 'You zip-tie his wrists and ankles and sit him on the basement floor next to the humming heater. He looks at the heater the way you\'d look at a bomb. "Oh, man," he says. "Oh, man, it\'s down HERE?" He won\'t say what he means. The ledger device sits on the shelf, its needle still pointing at you, even through the floor.', next: 'hub' },
    { t: 'Let him go. Tell him to tell them you\'re nobody.', a: 'talk', fx: ['rep:ninetytwo+2', 'rep:reclaimers+1', '+scout_freed', 'sp+1'],
      res: 'You get off him. He looks at you like it\'s a trick. "I\'m a squatter," you say. "I\'m nobody. Tell them that." He picks up his helmet, and after a second, the ledger. "I\'ll tell them," he says. "They won\'t listen. The needle says what the needle says." He fires a stubby grey pistol at the air and steps through the green hole. Before it closes, he says, "Thanks. Ninety-Two. That\'s me. Remember it."', next: 'hub' },
    { t: 'Take his device and pistol, then send him running.', a: 'betray', fx: ['give:ledger', '+clue_ledger', 'rep:ninetytwo-2', 'rep:reclaimers-1', '+scout_robbed', 'sp+1'],
      res: 'You take the ledger and his stubby portal pistol and push him toward the fence. He looks at the pistol in your hand like you\'ve taken his only way home, which you have. He climbs the fence and runs. Later you try the pistol: it\'s keyed to a glove you don\'t have, and it fizzles and dies. The ledger works fine. Its needle points at you, always.', next: 'hub' },
    { t: 'Kill him. He\'s seen too much, and more are coming.', a: 'force', fx: ['kill:ninetytwo', 'give:ledger', '+clue_ledger', 'rep:reclaimers-3', 'heat+1', 'sp+1'],
      res: 'You do it with your hands, because you don\'t have anything else, and because if you stop to find something else you won\'t do it. It takes longer than films say. He fights. Then he doesn\'t. Afterwards you sit in the wet grass next to him for a long time. You bury him behind the shed, under the place where the mower stands. His device keeps pointing at you the whole time, patient as a dog.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_cap_dolores', ch: [1, 2], loc: 'house', title: 'The Woman Upstairs', teaser: 'Your prisoner, Dolores Pike.',
  req: 'cap:dolores',
  text: [
    'Dolores Pike sits on the edge of the Smiths\' bed with her wrists tied in front of her, upright as a judge. She has not cried. She has, you notice, rearranged the things on Beth\'s nightstand into a neater order with her tied hands.',
    '"You can\'t keep me," she says. "My nephew calls on Sundays. If I don\'t answer, he calls the police, and he\'s a nuisance, so they come." She looks at you over her glasses. "What do you actually want? I\'m old, not stupid. Most people who do something this stupid want something."'
  ],
  choices: [
    { t: 'Ask her everything she knows about the Smiths.', a: 'talk', fx: ['+clue_heater', 'rep:dolores+1', 'note:Dolores says Beth asked her never to touch the water heater, and never to come in after dark. "The house is busy after dark," Beth said.'],
      res: '"Beth gave me a key for emergencies," she says. "She said two things. Never touch the water heater. And never come in after dark. She said, \'The house is busy after dark, Dolores.\' I thought she meant raccoons." She looks at you. "It isn\'t raccoons, is it." It isn\'t a question.', next: 'hub' },
    { t: 'Let her go, with a warning she\'ll believe.', a: 'force', req: 'muscle>=3 | skill:menace', fx: ['free:dolores', 'rep:dolores-2', 'heat+1', '+dolores_warned'],
      res: 'You cut the ties and tell her, quietly and in detail, what happens if she calls anyone. She listens to all of it. "Understood," she says, and walks home without looking back. She does not call the police. She does something you find out about later, which is worse: she starts keeping a diary of everything you do.', next: 'hub' },
    { t: 'Apologise. Cut her loose. Ask for her help.', a: 'talk', req: 'mouth>=3', fx: ['free:dolores', 'rep:dolores+3', '+dolores_alibi', 'heat-1'],
      res: 'You cut the ties and sit on the floor so she\'s looking down at you. You tell her about the rain, the apartment fire, the three years. You tell her about the yogurt and the notes. She listens like a court stenographer: all of it, no face. Then she says: "That was the stupidest thing anyone has done to me since 1971. I accept your apology. I am going to help you, because something is wrong in this house, and Beth is my friend." Then she makes you tea in the Smiths\' kitchen.', next: 'hub' },
    { t: 'Keep her. She stays quiet up here.', a: 'betray', fx: ['heat+2', 'rep:dolores-1', '+dolores_kept'],
      res: 'You bring her water and the tuna casserole, cold. She eats it with her tied hands and says nothing at all. The street outside is quiet, but it\'s the quiet of a street with one fewer person watching it, and somebody will notice that. Somebody always notices the absence of the person who notices things.', next: 'hub' }
  ]
});

/* ============================================================== the garage door (ends chapter 1) */

FK.S({
  id: 'h_garage_door', ch: 1, loc: 'house', title: 'The Garage Door', teaser: 'Steel, a keypad, and a green glow underneath.', once: false, prio: 9,
  req: '!garage_open',
  text: [
    'The door from the kitchen to the garage is not a kitchen door. It is a steel slab painted to look like wood, badly, with a keypad where the handle should be. The keypad has ten worn digits and a small screen that says ENTER CODE, and under that, in tiny letters, NOT YOU, MORTY.',
    'Underneath the door a thin line of green light pulses, slow, like something breathing on the other side.',
    { if: 'knows_code', t: 'You have a good idea what the code is.' },
    { if: 'cap:ninetytwo', t: 'Your prisoner, Ninety-Two, has a little box that opens doors like this one.' },
    'There is more than one way through a door. There always is.'
  ],
  choices: [
    { t: 'Enter a code on the keypad.', a: 'science', puzzle: { kind: 'keypad', code: '4160', prompt: 'ENTER CODE. Four digits.' },
      win: { fx: ['+garage_open', '+gd_code', 'sp+1'], res: 'The keypad beeps a happy little tune that sounds sarcastic. Locks retract inside the door one after another, clunk, clunk, clunk, clunk, like a vault. The steel slab swings inward. Green light washes over your boots, and the air tastes of ozone and motor oil and something else, something like the sea on another planet.', next: '@chapter' },
      lose: { fx: ['heat+1'], res: 'WRONG, says the screen, and then, in smaller letters: SERIOUSLY? The keypad lets out a long, loud, nasal beep that you\'re sure they can hear across the street. You back off. You need the right number, or another way in.', next: 'hub' } },
    { t: 'Pry it with the crowbar until something breaks.', a: 'force', req: 'item:crowbar & muscle>=3', fx: ['+garage_open', '+gd_force', '+door_broken', 'heat+2', 'sp+1'],
      res: 'It takes forty minutes and every ounce in your shoulders. The paint flakes, the hinge pins bend, and then the whole slab tears free of its top hinge with a scream of metal that sets off a car alarm two houses down. You squeeze through the gap. The door will never close properly again. Neither will your left shoulder.', next: '@chapter' },
    { t: 'Open the keypad and short it with the multimeter.', a: 'science', req: 'item:multimeter & brains>=3 | skill:tinker & brains>=3', fx: ['+garage_open', '+gd_hack', 'sp+1'],
      res: 'Four screws, a ribbon cable, two test points that read wrong in exactly the way a good lock reads wrong. You bridge them with a paperclip and your breath held. The keypad screen says HELLO RICK and then, after a pause, NO WAIT. But the locks are already moving.', next: '@chapter' },
    { t: 'Ask the Caretaker nicely to open it.', a: 'talk', req: 'rep:caretaker>=2 & !caretaker_off', fx: ['+garage_open', '+gd_caretaker', '+clue_voice', 'rep:caretaker+1', 'sp+1'],
      res: '"Absolutely not," says the smoke detector. You wait. You did its gutters. "...He never uses it any more anyway," it says, and then, quickly, "I. I never. I meant I never use it. Shut up." The locks clunk open one by one. It does not say anything else for the rest of the day.', next: '@chapter' },
    { t: 'Squeeze through the ventilation duct from the basement.', a: 'sneak', req: 'sneak>=3 | skill:lightfeet', fx: ['+garage_open', '+gd_vent', 'sp+1'],
      res: 'The duct is barely wider than your shoulders and full of a decade of dust and one very startled mouse. You inch along it on your elbows for what feels like a mile, and then the grille ahead glows green. You push it out and drop onto a workbench, into a pile of beer cans and a robot arm that grabs your ankle out of reflex and then lets go, embarrassed.', next: '@chapter' },
    { t: 'Have your prisoner open it with his little box.', a: 'betray', req: 'cap:ninetytwo', fx: ['+garage_open', '+gd_prisoner', 'rep:ninetytwo-1', 'sp+1'],
      res: 'You walk Ninety-Two up from the basement with his hands tied in front. He taps his little grey box against the keypad. "You know this is how it starts," he says. "You go in there and then you\'re him." The door opens. He doesn\'t look in. He looks at you.', next: '@chapter' },
    { t: 'Kick it until something gives.', a: 'force', out: [
      { req: 'muscle>=4', fx: ['+garage_open', '+gd_force', '+door_broken', 'heat+2', 'sp+1'], res: 'You kick it like it owes you money. On the sixth kick, something in the frame cracks; on the ninth, the bottom hinge shears and the door hangs open at a drunken angle. Your foot will hurt for a week. Green light pours out across the kitchen tile.', next: '@chapter' },
      { fx: ['hp-1', 'heat+2'], res: 'The door does not care. Your foot cares a great deal. You hop around the kitchen swearing while the keypad screen says, in tiny letters, LOL.', next: 'hub' }
    ] }
  ]
});
