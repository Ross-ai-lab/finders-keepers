/* Extra width for the three worlds: one more place in each. */

FK.S({
  id: 'r_lost', ch: 2, loc: 'reach', title: 'The Lost Property Office', teaser: 'Everything the Tollkeepers ever confiscated.',
  req: 'gate_passed',
  text: [
    'Behind the toll booths, a long low building of frosted glass: LOST AND CONFISCATED PROPERTY. Inside, shelves to the horizon. Every item ever seized at the gate, filed, tagged, catalogued, kept forever. A clerk the size of a child sits at the desk with a ledger the size of a door.',
    '"Claimant?" says the clerk. "Or browser?"',
    'On a shelf behind it, under a tag reading SANCHEZ, R. — SEIZED — UNPAID TOLL, x47: a crate of glowing vials, a flask very like the one in the living room, and a jacket you recognise from the photo in the hall.'
  ],
  choices: [
    { t: 'Claim it. Everything with his name. You\'re the owner now.', a: 'betray', req: 'signed_claim | item:paper', fx: ['give:fluid', 'scrap+3', '+claimed_lost', 'rep:tollkeepers-1', 'rep:family-1'],
      res: 'You slide the quitclaim under the glass. The clerk reads the Finders Clause twice, sighs the sigh of a creature that has seen every loophole, and stamps it. "Claimant recognised," it says. "Liabilities also transfer. You now owe forty-seven tolls." You take the crate anyway. It\'s full of portal fluid and spare parts. You\'ll deal with the tolls when the tolls come for you.', next: 'hub' },
    { t: 'Ask what else is filed under that name.', a: 'science', fx: ['+clue_ledger', 'note:The Tollkeepers\' lost property office has 47 seizures from Rick, and a recent entry: "Claim signature transferred, Lindell Court. Holder: GRADY, H."'],
      res: 'The clerk turns the great ledger round with both hands. Forty-seven seizures, centuries of them. And the newest line, in fresh ink: "CLAIM SIGNATURE TRANSFERRED BY ABANDONMENT. PROPERTY: LINDELL COURT. NEW HOLDER: GRADY, H. OUTSTANDING TOLLS: TRANSFERRED." You knew. It\'s different, seeing it in ink.', next: 'hub' },
    { t: 'Browse. Lift something small while the clerk files.', a: 'sneak', req: 'sneak>=3', fx: ['give:frostcell', 'scrap+2'],
      res: 'You browse like a man with nothing better to do. Somewhere between CONFISCATED: WEAPONS and CONFISCATED: FEELINGS (BOTTLED), a frost cell and a handful of parts find their way into your coat. The clerk never looks up. Filing is all-consuming.', next: 'hub' },
    { t: 'Pay off one of his old tolls. Just to see what happens.', a: 'talk', req: 'scrap>=2', fx: ['scrap-2', 'rep:tollkeepers+2', '+paid_toll', 'rep:family+1'],
      res: 'The clerk stares at you. "Nobody pays Sanchez tolls," it says. "In two hundred years. Nobody." It stamps the oldest one PAID, very slowly, as if savouring it. Word gets round the booths within an hour. The clerks start nodding to you.', next: 'hub' }
  ]
});

FK.S({
  id: 'f_temple', ch: 2, loc: 'cinder', title: 'The Temple of the Cold Flame', teaser: 'In a burning city, they worship the one fire that hurts.',
  req: 'seen:f_brass | seen:f_pit',
  text: [
    'Down a stair cut into the black glass, under the burning streets: a temple, cool and dark. In the middle, a single blue flame burns in a stone bowl. Monks in ash-grey robes sit around it in silence, as close as they dare.',
    'In Cinderfall, ordinary fire is weather. Blue fire is death. They worship the thing that can kill them, the way people anywhere do.',
    'The eldest monk looks up at you. "You carry something that burns blue," she says. She isn\'t asking.'
  ],
  choices: [
    { t: 'Ask for their blessing.', a: 'talk', fx: ['maxhp+1', '+blessed', 'rep:syndicate+1'],
      res: 'She holds your hand over the blue flame, not quite touching. It is cold the way the burning building was cold. "Now it knows you," she says. "It will take longer to take you." You walk out feeling heavier, steadier, as if someone had added a little more of you.', next: 'hub' },
    { t: 'Offer them Rick\'s flask. It\'s what they\'re asking for.', a: 'neutral', req: 'item:flask', fx: ['take:flask', 'rep:syndicate+2', 'sp+1', '+gave_flask'],
      res: 'The monks go silent in a different way when you hold it out. The eldest unscrews it, sniffs, and weeps. "He came here once," she says. "He lit our flame with this, and laughed, and left." She pours a drop into the bowl and the blue fire stands up tall. "Thank you." You have given away a weapon. You feel lighter for it.', next: 'hub' },
    { t: 'Steal a coal from the blue fire.', a: 'betray', req: 'item:cloak | sneak>=4', fx: ['give:flask', 'rep:syndicate-2', '+stole_flame'],
      res: 'You wrap your hand in the ash cloak, or don\'t, and scoop one blue coal into a steel flask while the monks are bowed. It burns cold through the metal. Behind you, the eldest says, without opening her eyes, "It will remember who carried it." You keep walking.', next: 'hub' },
    { t: 'Sit with them. Say nothing.', a: 'sneak', fx: ['hp+2', '+sat_temple'],
      res: 'You sit in the cool dark for an hour, close to a fire that could kill you. Nobody speaks. Nobody sells you anything. It is the quietest place you have found in four worlds. When you leave, your hands have stopped shaking, and you hadn\'t noticed they were.', next: 'hub' }
  ]
});

FK.S({
  id: 'd_pool', ch: 2, loc: 'drift', title: 'The Mirror Pool', teaser: 'Still water that shows you who else you could have been.',
  req: 'seen:d_garden',
  text: [
    'In a hollow on a small island, a pool of water so still it looks solid. When you lean over it, it doesn\'t show your face. It shows your faces.',
    'A Hollis in a foreman\'s hard hat, scarred and huge. A Hollis in a lab coat with goggles pushed up. A Hollis in a good suit, smiling at someone off to the side. A Hollis you can barely see, half in shadow, looking back over his shoulder. And a Hollis in a grey coat with a knife in his belt and nothing at all in his eyes.',
    'The Bloom\'s voice, from everywhere: "THE DRIFT. KEEPS. WHO YOU. MIGHT BE. CHOOSE ONE. TO LEARN FROM."'
  ],
  choices: [
    { t: 'The one in the hard hat.', a: 'force', fx: ['muscle+1', '+pool_brute'], res: 'He looks at you and shows you his hands, and you understand, all at once, how to stand so a punch doesn\'t move you. When you look up, he\'s gone and your knuckles ache.', next: 'hub' },
    { t: 'The one in the lab coat.', a: 'science', fx: ['brains+1', '+pool_science'], res: 'He talks fast, the way you talk when you\'re excited, and for a minute the inside of your head is full of diagrams. Then it settles, and some of them stay.', next: 'hub' },
    { t: 'The one in the good suit.', a: 'talk', fx: ['mouth+1', '+pool_talk'], res: 'He smiles at you, and you see how he does it: he means it, every time, just enough. You practise in the water. It\'s easier than you thought.', next: 'hub' },
    { t: 'The one in the shadow.', a: 'sneak', fx: ['sneak+1', '+pool_ghost'], res: 'He doesn\'t say anything. He just shows you where to put your feet. When you stand up, the island doesn\'t creak under you at all.', next: 'hub' },
    { t: 'The one with nothing in his eyes.', a: 'betray', fx: ['tally:betray+1', 'mouth+1', '+pool_turncoat', 'rep:bloom-1'], res: 'He tells you one thing, very quietly. You won\'t repeat it. But you will use it. The Bloom pulls back from the pool as you stand, as if it had touched something cold.', next: 'hub' }
  ]
});
