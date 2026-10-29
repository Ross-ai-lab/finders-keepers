/* Chapter 2 — The Drift (spore glow). The Bloom, the vault, the memory, your own past. */

FK.S({
  id: 'd_arrive', ch: 2, loc: 'drift', forced: true, prio: 5, title: 'The Drift',
  text: [
    'Silence. That is the first thing. After the snow and the fire, the silence is so complete you can hear your own blood.',
    'You stand on an island of soft white fungus the size of a car park, floating in green air. Other islands drift around it, near and far, trailing roots like jellyfish trail stingers. Spores rise from everything, slowly, glowing, like sparks from a fire that went out a long time ago and forgot to stop.',
    'You breathe in. You smell your mother\'s kitchen. You haven\'t thought about your mother\'s kitchen in twenty years.'
  ],
  choices: [
    { t: 'Breathe deep. Let it show you whatever it wants.', a: 'neutral', fx: ['+breathed_drift', 'hp+1'],
      res: 'The spores fill your chest and for one long second you are nine years old and it is Sunday and nothing has burned yet. Then you are a forty-one-year-old man crying on a mushroom. It is not unpleasant. It is a lot.', next: 'hub' },
    { t: 'Tie a wet cloth over your mouth and nose.', a: 'science', fx: ['+masked'],
      res: 'You soak your sleeve from your water bottle and tie it on. The smells fade. The memories stay at the edges, polite, waiting. Good. You need a clear head in a place that wants to show you things.', next: 'hub' },
    { t: 'Fire the gun and go straight home. This place wants something.', a: 'flee', res: 'The silence follows you through the portal for a second, and then the garage\'s hum drowns it. You stand there a while with your hand on the bench.', next: '@loc:garage' }
  ]
});

FK.S({
  id: 'd_garden', ch: 2, loc: 'drift', title: 'The Speaking Garden', teaser: 'A field of mushrooms with faces.',
  text: [
    'On the largest island, a field of tall pale mushrooms grows in rings. As you walk among them, their caps turn to follow you, and on each cap, slowly, a face forms out of shadow and glow. Not human faces. Ideas of faces, gathered from everyone who has ever walked here.',
    'They speak together, very slowly, like a choir reading a will. "YOU. SMELL. OF HIM. THE LOUD ONE."',
    '"HE. HID. A DOOR. HERE. HE. ASKED. US. TO KEEP IT. FROM THE GREY ONES. AND FROM. EVERYONE."',
    '"WHY. ARE YOU. HERE."'
  ],
  choices: [
    { t: '"I\'m living in his house. I think his family is in trouble."', a: 'talk', fx: ['rep:bloom+2', '+bloom_talked', '+bloom_hint'],
      res: 'The faces flicker through a dozen expressions. "THE FAMILY. IS NOT. IN TROUBLE," they say. "THE FAMILY. IS HIDDEN. YOU. ARE IN. TROUBLE." A pause the length of a song. "THE DOOR. OPENS. FOR THOSE. WHO KNOW. HOW THEY SAT. FOR THE PICTURE." Then they go back to being mushrooms.', next: 'hub' },
    { t: 'Offer a memory in trade. They seem to collect them.', a: 'talk', fx: ['rep:bloom+3', '+bloom_traded', 'sp-1', '+bloom_hint', 'maxhp+1'],
      res: '"A MEMORY," the choir agrees. You give them the fire: the night your apartment burned, the landlord\'s wiring, standing in the street in your socks. You feel it go out of you like a splinter. You still know it happened. It just doesn\'t hurt any more. The faces glow warm. "THANK. YOU. THE DOOR OPENS. FOR THOSE WHO KNOW. HOW THEY SAT. FOR THE PICTURE." You feel lighter. Stronger. You feel like you lost something you needed.', next: 'hub' },
    { t: 'Threaten them. Mushrooms burn.', a: 'force', req: 'item:flask | item:raygun | item:cloak', fx: ['rep:bloom-3', '+bloom_threatened', '+bloom_hint'],
      res: 'You hold up the flask, or the pistol, and the whole field goes still. "YOU. ARE. MORE LIKE HIM. THAN YOU KNOW," says the choir, and every face turns away from you. Then one cap, smaller than the rest, speaks alone, fast and frightened: "THE PICTURE. HOW THEY SAT. PLEASE." You have your answer. You have also made an enemy of a planet.', next: 'hub' },
    { t: 'Ask them what they know about you.', a: 'science', fx: ['rep:bloom+1', '+bloom_read_you', 'note:The Bloom says: "You were chosen because you are the kind who stays. Nice people stay."'],
      res: '"YOU. LEAVE. HOUSES. CLEANER. THAN YOU FIND THEM," says the choir. "YOU. ARE THE KIND. WHO STAYS. HE KNEW. HE WATCHED. THE ROADS. HE CHOSE. A KIND MAN. BECAUSE. KIND MEN. STAY." The faces dim. "WE. ARE. SORRY."', next: 'hub' }
  ]
});

FK.S({
  id: 'd_vault', ch: 2, loc: 'drift', title: 'The Hinge Vault', teaser: 'A door with no wall, sealed by a seating plan.',
  req: 'seen:d_garden',
  text: [
    'On a small island of its own, tethered by roots to the garden: a door. Just a door, wooden, painted the same colour as the Smiths\' front door, standing upright on the fungus with no wall around it. Walk round the back of it and it\'s still a front.',
    'It has no handle. In the middle, a ring of five sockets, and beside it on a stand, five carved wooden tokens: a FLASK, a HORSE, a TIE, a PHONE, a PENCIL.',
    { if: 'bloom_hint', t: '"How they sat for the picture," the Bloom said.' },
    { if: 'photo_memorised | item:photo', t: 'You remember the photo in the hall. Who sat where on the couch.' }
  ],
  choices: [
    { t: 'Set the five tokens in order.', a: 'science', puzzle: { kind: 'sequence', symbols: ['FLASK', 'HORSE', 'TIE', 'PHONE', 'PENCIL'], answer: ['FLASK', 'HORSE', 'TIE', 'PHONE', 'PENCIL'], prompt: 'Five sockets, left to right. Place the tokens as they sat for the picture.' },
      win: { fx: ['give:hinge', '+vault_opened', 'sp+1'], res: 'The last token clicks in. The door opens one inch, onto nothing, and from the nothing falls a heavy brass hinge into your hand. The door closes. The hinge hums a single note. You know the note. You have heard it every night through the basement floor.', next: 'hub' },
      lose: { fx: ['hp-1'], res: 'The tokens spit out of their sockets and a puff of spores hits you in the face. You lose an hour. You wake up lying across the doorstep with a headache and the distinct memory of a horse surgery you never attended.', next: 'hub' } },
    { t: 'Ask the Bloom to open it for you.', a: 'talk', req: 'rep:bloom>=3', fx: ['give:hinge', '+vault_opened', 'rep:bloom+1'],
      res: 'The choir sighs, a sound like wind through a field. "HE. TRUSTED US. WE. TRUST YOU. MORE." Roots creep up the door and the tokens click into place by themselves. A brass hinge drops into your hand, humming.', next: 'hub' },
    { t: 'Break it open.', a: 'force', req: 'muscle>=4 | item:raygun', fx: ['give:hinge', '+vault_broken', 'rep:bloom-3', 'hp-1'],
      res: 'You put your shoulder through it on the fourth go. The door splinters into light and spores and a sound like a hundred people gasping. In the wreckage, a brass hinge, humming. The Bloom is screaming, very slowly, in every direction.', next: 'hub' },
    { t: 'Slip your fingers through the gap where the door doesn\'t quite meet itself.', a: 'sneak', req: 'skill:ghoststep | sneak>=5', fx: ['give:hinge', '+vault_slipped'],
      res: 'There is always a gap. In every door, every lock, every plan. This one is a hair wide, between the door and the idea of the door. You find it with your fingertips and reach through, into a cold that isn\'t temperature, and close your hand on something heavy and brass. It comes out humming.', next: 'hub' }
  ]
});

FK.S({
  id: 'd_memory', ch: 2, loc: 'drift', title: 'The Last Dinner', teaser: 'The hinge wants to show you something.',
  req: 'item:hinge',
  text: [
    'You hold the hinge, and the spores around you thicken and settle into a shape: a kitchen. The Smiths\' kitchen. A memory, kept here like a letter in a drawer.',
    'Five people at the table. Phones in a bowl. The old man at the head, in the good chair, not eating.',
    '"We\'re going to stop owning things," he says. "Everything. The house, the garage, the gun. I already signed it."',
    'The woman, Beth: "And then what? We live in a tent?"',
    '"We live in the house. Behind it. In a fold. Same house, other side of the page. Grey, quiet, a bit big. Nobody can find us, because there\'s nothing of ours to find."',
    'The girl, Summer: "And the house just sits there empty? The grey people will find an empty house in about five seconds."',
    'The old man drinks. "It won\'t be empty. Somebody\'ll find it. Somebody always finds it. And when they do, the ledger reads them as me." He looks at his plate. "Finders keepers."',
    'The boy, Morty: "So someone else gets hunted instead of us."',
    'Silence. Then the old man: "Yeah, Morty. That\'s the plan. It\'s a bad plan. All plans are bad plans for someone."'
  ],
  choices: [
    { t: 'Watch it to the end.', a: 'neutral', fx: ['+clue_hinge', '+saw_dinner', 'note:The last dinner: they hid in a fold behind the house, and left the house for someone to find. Whoever claims it gets hunted in their place. Me.'],
      res: 'Beth puts her hand over her father\'s. Jerry eats his yogurt very slowly. Summer stares at the bowl of phones. Morty says, "I hope it\'s someone nice," and the old man says, "It has to be someone nice, Morty. Nice people stay." Then the kitchen dissolves into spores, and you are standing alone on a floating island with a hinge in your hand, and you know everything now.', next: 'hub' },
    { t: 'Close your fist on the hinge and stop it.', a: 'flee', fx: ['+clue_hinge', '+stopped_memory'],
      res: 'You close your hand and the kitchen falls apart like wet paper. You heard enough. "Finders keepers." You stand there and breathe until the urge to throw the hinge into the green void passes.', next: 'hub' },
    { t: 'Speak into the memory: "I hear you."', a: 'talk', fx: ['+clue_hinge', '+spoke_memory', 'rep:family+2'],
      res: 'It shouldn\'t work. It\'s a memory. But at your voice the boy turns in his chair and looks straight at you, through three weeks and a dimension, and his face goes white. "Grandpa," he whispers. "He\'s here. He found the spare." The old man turns too, and his eyes find you, and narrow. Then the spores scatter and the kitchen\'s gone.', next: 'hub' }
  ]
});

FK.S({
  id: 'd_sporeling', ch: 2, loc: 'drift', title: 'The Little One', teaser: 'A sporeling has been following you.',
  req: 'seen:d_garden',
  text: [
    'Something small has been following you between the islands, hopping from root to root: a mushroom the size of a fist, glowing pale green, with a face that keeps trying to be yours and getting it slightly wrong. Your nose, someone else\'s eyes.',
    'When you stop, it stops. When you look at it, it looks at the ground. It is a part of the Bloom that has wandered off to see what you are. A sporeling.'
  ],
  choices: [
    { t: 'Crouch down and let it come to you.', a: 'talk', fx: ['rep:bloom+2', '+spore_friend', 'hp+1'],
      res: 'It hops closer, then closer, then onto your boot, then up your leg and into your coat pocket, where it settles, warm, glowing through the fabric. When you go home, it comes. The Bloom will always know where you are now. You find, to your surprise, that you don\'t mind.', next: 'hub' },
    { t: 'Grab it. It\'s worth something.', a: 'force', req: 'sneak>=2 | muscle>=2', fx: ['cap:sporeling', 'rep:bloom-3', 'rep:sporeling-3'],
      res: 'You snatch it up and it squeals, a high sound like a kettle, and every face in the garden behind you turns. You get it into a jar from your bag, punch holes in the lid with a key, and fire the gun at the ground. It stares at you through the glass all the way home.', next: '@loc:garage' },
    { t: 'Ignore it. Don\'t encourage it.', a: 'sneak', res: 'You walk on. After a while it stops following. When you look back, it is sitting on the edge of an island, glowing, watching you go.', next: 'hub' }
  ]
});

FK.S({
  id: 'd_grove', ch: 2, loc: 'drift', title: 'The Grove of Visitors', teaser: 'Mushrooms shaped like everyone who came here.',
  req: 'seen:d_garden',
  text: [
    'On a far island, a grove of mushrooms grown into the shapes of people. Statues, almost, white and soft and glowing. Everyone who has ever visited the Drift, kept.',
    'A Tollkeeper with a clipboard. A lava man with his fists up. A Morty in coveralls, very young, reaching for something. Four different old men with spiked hair, all scowling. And at the end of the row, half-grown, still forming: a man in a wet fleece, forty-ish, looking back over his shoulder. You.',
    'On a stump in the middle of the grove, a glass lantern full of drifting light.'
  ],
  choices: [
    { t: 'Take the lantern.', a: 'sneak', fx: ['give:lantern', 'rep:bloom-1'],
      res: 'It is lighter than glass should be. The light inside it moves when you move. When you hold it up, the grove fills with ghostly shapes of everyone walking in, one at a time, centuries of them. A lantern that shows who was in a room before you. You know exactly which room you want to try it in.', next: 'hub' },
    { t: 'Ask the Bloom for the lantern.', a: 'talk', req: 'rep:bloom>=2', fx: ['give:lantern', 'rep:bloom+1'],
      res: '"TAKE IT," says the grove, in a hundred little voices. "SEE. WHO WAS THERE. BEFORE YOU." The lantern is warm when you lift it, like it\'s pleased to have a job.', next: 'hub' },
    { t: 'Kick over the half-grown statue of yourself.', a: 'force', fx: ['rep:bloom-2', '+kicked_statue', 'muscle+1'],
      res: 'It goes over soft, in a puff of spores. You don\'t want to be kept. You don\'t want to be anybody\'s collection. The grove is silent. Then, slowly, at the end of the row, a new shape starts to grow in its place. Still you. Facing forward this time.', next: 'hub' },
    { t: 'Study the four old men. Look for the one from the photo.', a: 'science', fx: ['+studied_ricks', '+clue_photo', 'note:In the Drift, four statues of old men like the one in the photo. Each different. None is quite him. Ours never came here himself, the Bloom says. He sent "the door" instead.'],
      res: 'Four Ricks, all different: a scar, a beard, an eyepatch, one missing an arm. None is the old man in the hall. "OURS," says the grove, "NEVER CAME. HE SENT. THE DOOR." You think about the hinge vault, and the heater, and you start, slowly, to see the shape of it.', next: 'hub' }
  ]
});

FK.S({
  id: 'd_echo', ch: 2, loc: 'drift', title: 'Your Own Echo', teaser: 'The spores know where you came from.',
  req: 'seen:d_arrive & (breathed_drift | turn>=20)',
  text: [
    'You fall asleep on a soft island and the spores do what spores do here.',
    'You are back in the apartment on Fourth Street, the night it burned. The smoke alarm you took the battery out of because it went off when you made toast. The smell of the wiring before the smoke. The landlord on the phone the next morning: "Act of God, Hollis. Read your lease."',
    'You are standing in the street in your socks, again, with everything you owned going up behind the window, again. And the spores, very gently, ask you what you want to do with it.'
  ],
  choices: [
    { t: 'Forgive yourself for the battery.', a: 'talk', fx: ['mouth+1', 'hp+1', '+forgave_self'],
      res: 'It was the wiring. The battery didn\'t matter. You know that. You have known it for three years. You let yourself know it all the way down. When you wake up, the island is glowing a little warmer, and so are you.', next: 'hub' },
    { t: 'Go back in. Save something. Anything.', a: 'force', fx: ['muscle+1', '+went_back'],
      res: 'In the dream you go back in through the smoke and you get the box: your dad\'s watch, the photos, your apprentice papers. You wake with your hands clenched on nothing. It changes nothing. It changes how you stand.', next: 'hub' },
    { t: 'Find the landlord. Make him pay.', a: 'betray', fx: ['tally:betray+1', '+grudge_kept'],
      res: 'In the dream you find him. You don\'t remember what you did. You wake up shaking, with spores in your fists, and a cold, steady feeling you have not had before. The kind of feeling that would hold a grudge for a long time and enjoy it.', next: 'hub' },
    { t: 'Walk away from the fire. Keep walking.', a: 'flee', fx: ['sneak+1', '+kept_walking'],
      res: 'You turn your back on the burning window and walk down Fourth Street in your socks and you don\'t stop. In the dream you walk for three years. When you wake up you realise you\'ve been walking in your sleep, to the very edge of the island, and that you\'re not afraid of the drop.', next: 'hub' },
    { t: 'Work out exactly how the wiring failed.', a: 'science', fx: ['brains+1', '+solved_fire'],
      res: 'You trace it in the dream like a schematic: the overloaded circuit, the junction box behind the fridge, the aluminium wire that should have been copper. It was never your fault. It was always going to burn. Understanding it doesn\'t make it hurt less. It makes it smaller.', next: 'hub' }
  ]
});

FK.S({
  id: 'd_settle', ch: 2, loc: 'drift', title: 'Settle the Drift', teaser: 'Decide what the Drift remembers of you.', prio: 6,
  req: 'seen:d_garden & (seen:d_vault | seen:d_grove | seen:d_sporeling)',
  text: [
    'The garden of faces turns toward you as you come back across the islands. The spores rise around you in a slow spiral.',
    '"YOU. HAVE SEEN. WHAT WE KEEP," says the choir. "NOW. WHAT. WILL YOU. KEEP. OF US."'
  ],
  choices: [
    { t: 'Promise to keep their secret, and to come back.', a: 'talk', req: 'rep:bloom>=1', fx: ['axis:drift=friend', '+settled_drift', 'rep:bloom+2', 'hp+1', 'sp+1'],
      res: 'The faces glow, all at once, and for a moment every one of them is a little bit yours. "FRIEND," says the Drift. You go home lighter than you came, and with spores in your hair that never quite wash out.', next: '@loc:garage' },
    { t: 'Stay. Lie down in the soft white and let it keep you.', a: 'flee', req: 'rep:bloom>=3', fx: ['axis:exit=bloom'], next: '@ending' },
    { t: 'Let it graft a little of itself into you. See what it sees.', a: 'science', req: 'rep:bloom>=2 | skill:pocket', fx: ['axis:drift=grafted', '+settled_drift', '+grafted', 'brains+1', 'sneak+1', 'rep:bloom+1', 'sp+1'],
      res: 'A root slides under the skin of your wrist, cool and painless, and settles there like a vein. Afterwards you can feel the Drift at the back of your mind, a slow green hum. You can see, faintly, who was in a room before you. You can smell lies. You are a little less human, and a lot less alone.', next: '@loc:garage' },
    { t: 'Harvest it. Strip the islands for anything worth carrying.', a: 'betray', fx: ['axis:drift=harvested', '+settled_drift', 'scrap+5', 'rep:bloom-4', 'sp+1'],
      res: 'You bring bags. You cut glowing caps, roots that spark, spore sacs worth a fortune in Cinderfall. The choir says nothing. It just watches, every face turned toward you, while you fill your bags with it. You go home rich. The garage smells of a cut forest for weeks.', next: '@loc:garage' },
    { t: 'Burn it. Make sure nobody else ever finds that door.', a: 'force', req: 'item:flask | item:raygun | item:grenade | item:frostcell', fx: ['axis:drift=burned', '+settled_drift', 'rep:bloom-5', 'take:flask', 'take:grenade', 'sp+1'],
      res: 'It burns slowly, the way wet things burn: smoke first, then a low green flame that crawls from island to island. The choir doesn\'t scream. It sings, one long falling note, until it doesn\'t. You stand in your portal and watch until the smoke hides everything. Then you go home and wash your hands three times.', next: '@loc:garage' },
    { t: 'Leave. Take nothing. Promise nothing.', a: 'sneak', fx: ['axis:drift=quiet', '+settled_drift', 'sp+1'],
      res: '"NOTHING," the Drift repeats, puzzled. "NOTHING. IS ALSO. A GIFT." You go home. In the corner of the garage, a single small cap pushes up through a crack in the concrete overnight, and glows.', next: '@loc:garage' }
  ]
});
