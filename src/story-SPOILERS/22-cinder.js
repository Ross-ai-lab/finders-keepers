/* Chapter 2 — Cinderfall (fire). Brass, the pit, the market, a Rick who sells noodles. */

FK.S({
  id: 'f_arrive', ch: 2, loc: 'cinder', forced: true, prio: 5, title: 'Cinderfall',
  text: [
    'Heat like opening an oven to check on something you forgot. The portal drops you on a street of black glass that has been polished by a million feet. Every roof in sight is on fire. Not burning down: just on fire, cheerfully, the way roofs elsewhere have moss.',
    'People walk through it all: lava-skinned brutes, creatures of smoke in hats, things with tusks selling skewers of something that screams faintly when you bite it. A sign hangs over the street in ten alphabets, and one of them is English: SLAG ROW — NO REFUNDS — NO QUESTIONS — NO EXTINGUISHERS.',
    'Your eyebrows are already warm. A child made of charcoal walks past and looks at your portal gun with an expert\'s eye.'
  ],
  choices: [
    { t: 'Keep the gun out of sight and blend in.', a: 'sneak', fx: ['+cinder_low'], res: 'You tuck the gun under your fleece and walk like a man who has been here before and was not impressed. Nobody follows. You think.', next: 'hub' },
    { t: 'Ask the charcoal kid where to find somebody called Brass.', a: 'talk', fx: ['+asked_brass', 'chits+1'],
      res: '"Brass," the kid says, and grins with teeth like hot coals. "End of the Row, stall with the bell. You\'re one of the old man\'s, aren\'t you? You smell like him. Bad booze and ozone." You give the kid a coin from your pocket. The kid gives you, unasked, a black glass chit, as change. "That\'s more than a coin," says the kid. "Your coin\'s worth more than you think. Be careful who you pay."', next: 'hub' },
    { t: 'Turn around and go home. Too hot.', a: 'flee', res: 'Your eyebrows have opinions. You fire the gun at the glass street and step home into the cool, beautiful, boring garage.', next: '@loc:garage' }
  ]
});

FK.S({
  id: 'f_brass', ch: 2, loc: 'cinder', title: 'Brass\'s Stall', teaser: 'Rick\'s fence. Rick\'s friend. Rick\'s creditor.',
  text: [
    'The stall with the bell is a cave of shelves cut into a cliff of cooled lava. Everything is for sale: weapons, jars, a crate of what look like tiny suns, a man in a cage who waves.',
    'Behind the counter sits Brass: a being shaped roughly like a person, made of cooling metal, the colour of an old trumpet, with a face that glows orange at the seams when it thinks. Brass looks at your gun, then at you, and the seams brighten.',
    '"Well, well," says Brass, in a voice like a big bell rung softly. "That is a Sanchez original. And you are not a Sanchez. So either you killed him, which I doubt, or you found his things, which I don\'t. Sit. Let\'s talk about what you have and what you want."'
  ],
  choices: [
    { t: 'Sell scrap. Get some local money.', a: 'talk', req: 'scrap>=2', fx: ['scrap-2', 'chits+3', '+brass_contact', 'rep:brass+1'],
      res: 'Brass picks through your salvage with metal fingers, glowing at the good bits. "Rick\'s junk is better than most people\'s treasure," it says, and pays you in black glass chits. Fair. Suspiciously fair. "You\'re a new customer," it explains. "New customers get fair. Old customers get what they deserve."', next: 'hub' },
    { t: 'Ask what Rick sold here before he vanished.', a: 'talk', fx: ['+brass_contact', '+clue_paper', 'rep:brass+1', 'note:Brass says Rick sold everything here the night before he vanished. Not his things: the OWNING of his things. Brass resold it to an anonymous buyer.'],
      res: 'Brass\'s seams dim. "The night before he left, he came in here drunk as a planet and sold me everything. Not the things. The owning of the things. For one chit. As a joke, I thought. He signed a paper." It looks at you. "I resold the owning, of course. To a buyer who paid very well and wore a grey coat. Then the owning went... away. Into thin air. It ended up with someone else." Brass\'s face glows. "Hello, someone else."', next: 'hub' },
    { t: 'Buy the coordinates for the third world. The scrambled one.', a: 'talk', req: 'chits>=3 & !dest:drift', fx: ['chits-3', '+brass_coords', '+brass_contact', 'rep:brass+1'],
      res: '"The Drift," says Brass. "He hid that one well. He hid something there." It carves a sequence of numbers into a strip of cooling slag with one fingertip and hands it to you, still warm. "Don\'t go breathing too deep in the Drift. You\'ll remember things you didn\'t live."', next: 'hub' },
    { t: 'Lean on the counter. "You owe Rick. Rick\'s gone. So you owe me."', a: 'force', req: 'muscle>=3 | skill:menace', fx: ['chits+4', '+brass_contact', 'rep:brass-2', '+brass_shaken'],
      res: 'The stall goes quiet. Somewhere at the back, the man in the cage stops waving. Brass looks at you for a long moment, seams flickering. Then it slides four chits across the counter. "I don\'t owe Rick," it says softly. "Rick owes me. But I like you, so I will pretend for now." Outside, a slab of a lava-man has stood up from where he was sitting and is watching you.', next: 'hub' },
    { t: 'Haggle like a professional. Find out what everything is worth.', a: 'talk', req: 'skill:haggle | mouth>=4', fx: ['chits+5', '+brass_contact', 'rep:brass+2'],
      res: 'You haggle for an hour, and enjoy it, and so does Brass. By the end you\'ve swapped half your pockets for twice their worth in chits and Brass is laughing like a bell in a storm. "Rick never haggled," it says. "Rick just threatened. You\'re better company."', next: 'hub' },
    { t: 'Rob the stall while Brass is busy with another customer.', a: 'sneak', req: 'sneak>=4 | skill:ghoststep', fx: ['chits+6', 'give:grenade', 'rep:brass-4', 'rep:syndicate-2', '+robbed_brass'],
      res: 'A customer with eleven arms is arguing about a refund. You go along the back shelves like a draught. Chits from the drawer, a flash charge from the weapons rack, and you\'re out of the side door. You are two streets away before the bell behind you starts ringing, and ringing, and ringing.', next: 'hub' }
  ]
});

FK.S({
  id: 'f_pit', ch: 2, loc: 'cinder', title: 'The Pit', teaser: 'Fight for money. Or bet on someone who will.',
  text: [
    'A hole in the street, ringed with seats of melted glass, full of shouting. In the bottom, two things are hitting each other with things. A bookie made of smoke takes bets on a chalkboard that keeps catching fire.',
    'The champion is Knuckle, a slab of cooled lava shaped like a man who has been punched by a mountain and won. "NEW MEAT," the bookie shouts when he sees you. "THE ONE WITH THE GUN. TEN TO ONE."'
  ],
  choices: [
    { t: 'Fight Knuckle. Bare hands.', a: 'force', out: [
      { req: 'muscle>=4 | skill:brawler & muscle>=3', fx: ['chits+5', '+beat_knuckle', 'sp+1'], res: 'He is slow, and heavy, and certain no one will get inside his reach. You get inside his reach. Every punch is like hitting a wall, but walls fall over if you hit them in the right place. Knuckle goes down on his back, cracking the glass floor. The crowd screams. Knuckle looks up at you from the floor, confused. The bookie looks at you. Everyone is waiting for you to finish it.', next: 'f_pit_win' },
      { fx: ['hp-2', '+lost_pit'], res: 'He hits you once. It is like being hit by a staircase. You wake up in the gutter outside the pit with no chits, a cracked rib, and the charcoal kid going through your pockets. The kid gives you back your gun, with a disappointed look.', next: 'hub' }
    ] },
    { t: 'Fight him with a little help from the workbench.', a: 'gadget', req: 'item:stunner | item:raygun', fx: ['chits+5', '+beat_knuckle', '+cheated_pit', 'rep:syndicate-1', 'sp+1'],
      res: 'You walk in with the baton up your sleeve. The first crack of it puts Knuckle on one knee. The second puts him down. The crowd boos, then cheers, because cheating counts here as long as it\'s funny. The bookie pays, grudgingly. Knuckle lies there looking at you.', next: 'f_pit_win' },
    { t: 'Don\'t fight. Bet on Knuckle\'s opponent, after a quiet word with him.', a: 'betray', req: 'mouth>=3 | chits>=2', fx: ['chits+6', 'rep:syndicate-1', 'rep:knuckle-2', '+fixed_fight'],
      res: 'You find the challenger in the tunnel, a nervous thing made of gravel, and tell him exactly where Knuckle\'s old crack is. You put everything on the gravel man. He wins in a minute. Knuckle limps out of the pit, staring into the crowd, looking for whoever told. You are already gone.', next: 'hub' },
    { t: 'Talk to Knuckle after the fight. He looks tired.', a: 'talk', fx: ['rep:knuckle+2', '+knuckle_talked'],
      res: 'You find him sitting outside on an upturned crate, cooling. He fights for Brass, he says, because he owes Brass, because everyone owes Brass. He used to be a bricklayer. Lava men are very good bricklayers. Nobody needs bricks in a city that\'s always on fire. You share a skewer. He tells you to watch out for Brass\'s buyers. "The grey ones. They pay well and they never leave."', next: 'hub' }
  ]
});

FK.S({
  id: 'f_pit_win', ch: 2, loc: 'cinder', sub: true, title: 'Knuckle on the Floor',
  text: [
    'Knuckle lies on the cracked glass, chest heaving, little red glows pulsing in the cracks of his skin. The crowd chants something you don\'t understand but can guess the meaning of.',
    'The bookie, the smoke-thing, floats down beside you. "Customary," it says, "to finish. Or not. Either way pays. Finishing pays more."'
  ],
  choices: [
    { t: 'Finish him. It\'s what they came for.', a: 'force', fx: ['kill:knuckle', 'chits+3', 'rep:syndicate-1', 'rep:brass-1'],
      res: 'You do it. The crowd goes wild. The bookie pays. Knuckle\'s glow goes out, crack by crack, from the edges in. You walk out of the pit with your pockets full and something in you a little colder, like his skin.', next: 'hub' },
    { t: 'Help him up. Raise his hand with yours.', a: 'talk', fx: ['rep:knuckle+3', 'rep:syndicate+1', '+knuckle_spared'],
      res: 'You haul him up, which is like hauling up a car, and lift his arm with yours. The crowd doesn\'t understand it and loves it anyway. Knuckle looks at you sideways. "Weird," he rumbles. "Thanks." You have made a friend made of rock.', next: 'hub' },
    { t: 'Drag him out and take him home. Brass will pay to get his best fighter back.', a: 'betray', req: 'item:zipties | skill:takedown | item:stunner', fx: ['cap:knuckle', 'rep:syndicate-2', 'rep:brass-1'],
      res: 'You cuff his wrists with the zip ties, doubled, and drag him to a back alley, where you fire the gun at a wall. He\'s heavy. He\'s very heavy. The garage floor creaks when you drop him on it.', next: '@loc:garage' }
  ]
});

FK.S({
  id: 'f_fire', ch: 2, loc: 'cinder', title: 'A Fire That\'s Wrong', teaser: 'Blue flames. In Cinderfall, that\'s an emergency.',
  text: [
    'A building at the end of a side street is burning blue. People here walk through orange fire like weather. Nobody walks through the blue. They stand back in a ring, gabbling.',
    '"Cold fire," the charcoal kid says, appearing at your elbow. "It eats things that can\'t burn. Like us." From the third floor window, behind the blue flames, someone is banging on the glass: small hands, made of ember.',
    'You are not made of ember. Ordinary fire would kill you. This fire might not.'
  ],
  choices: [
    { t: 'Go in and get them.', a: 'force', fx: ['hp-1', 'rep:syndicate+2', '+cinder_hero', 'chits+2', 'sp+1'],
      res: 'The blue fire is cold. That is the strange thing. It takes the skin off your hands with a feeling like frost. You go up the stairs on your elbows and come back down with two children made of ember tucked into your fleece, hissing and terrified. The crowd stares. Somebody puts a chit in your pocket, then another. Nobody here has ever seen a person do that. People will talk about it.', next: 'hub' },
    { t: 'Smother it with frost. You have a cell that\'s colder than this.', a: 'gadget', req: 'item:frostcell | item:cloak', fx: ['rep:syndicate+2', '+cinder_hero', 'take:frostcell', 'sp+1'],
      res: 'Cold fire versus colder cell. You crack the frost cell and throw it through the door, and the blue flames shrink away from it, whimpering, until there\'s nothing but steam. The kids come down the stairs on their own. The crowd cheers. Somebody from the Syndicate, watching from an awning, writes something down.', next: 'hub' },
    { t: 'Loot the shops next door while everyone is watching the fire.', a: 'betray', fx: ['scrap+3', 'chits+2', 'give:cloak', '+looted_fire'],
      res: 'Everybody\'s looking up. You look down, at shop counters, at open tills. You come away with a fireproof cloak, a fistful of chits and a crate of parts. When you come back past the burning building, the window on the third floor is empty. You tell yourself somebody else got them.', next: 'hub' },
    { t: 'Walk away. Not your city.', a: 'flee', res: 'You turn your back and walk. The banging on the glass follows you for a street, two streets. Then you can\'t hear it any more. You can still hear it at night, later, for a long time.', next: 'hub' }
  ]
});

FK.S({
  id: 'f_market', ch: 2, loc: 'cinder', title: 'The Market of Wrong Things', teaser: 'Buy anything. Sell anyone.', once: false,
  req: 'brass_contact | asked_brass | cinder_low',
  text: [
    'Under the burning awnings of the night market: weapons that hum, maps that redraw themselves, a stall selling only left shoes. At the far end, a raised platform where people are sold, and a buyer\'s queue of very calm Syndicate men in heat-proof coats.',
    { if: 'chits>=1', t: 'Your chits are warm in your pocket.' },
    { if: 'captives>=1', t: 'A Syndicate buyer eyes you knowingly. Word gets around about who is holding whom.' }
  ],
  choices: [
    { t: 'Buy an ash cloak. (2 chits)', a: 'neutral', req: 'chits>=2 & !item:cloak', fx: ['chits-2', 'give:cloak'],
      res: 'The cloak is the grey of old ash and as light as breath. The merchant drapes it on you and sets fire to your sleeve to prove a point. The cloak doesn\'t care.', next: 'hub' },
    { t: 'Buy a flash charge. (2 chits)', a: 'neutral', req: 'chits>=2 & !item:grenade', fx: ['chits-2', 'give:grenade'],
      res: '"One use," says the merchant. "Very loud. Very bright. Recommended for ending conversations, parties and marriages."', next: 'hub' },
    { t: 'Buy a frost cell. (3 chits)', a: 'neutral', req: 'chits>=3 & !item:frostcell', fx: ['chits-3', 'give:frostcell'],
      res: 'Imported from the Reach at a criminal markup. It frosts the merchant\'s fingers as he hands it over. Cold power, in a city where cold is the rarest thing there is.', next: 'hub' },
    { t: 'Sell scrap for chits.', a: 'neutral', req: 'scrap>=2', fx: ['scrap-2', 'chits+2'],
      res: 'Not as good a rate as Brass. Faster. No questions.', next: 'hub' },
    { t: 'Sell your prisoner to the Syndicate buyers.', a: 'betray', req: 'captives>=1', out: [
      { req: 'cap:ninetytwo', fx: ['free:ninetytwo', '+sold_ninetytwo', 'chits+6', 'rep:ninetytwo-5', 'rep:reclaimers-2'], res: 'You bring Ninety-Two through the portal on a rope. He doesn\'t say anything when he sees the platform. The buyer pays six chits and leads him away. At the end of the street, he looks back at you, once.', next: 'hub' },
      { req: 'cap:vell', fx: ['free:vell', '+sold_vell', 'chits+5', 'rep:tollkeepers-3'], res: 'A Tollkeeper assessor is a curiosity here: someone wants it to do their books, forever. Vell says nothing at all on the platform. It just keeps writing in a little notebook, and the last thing it writes, as it\'s led away, it shows to you: your name.', next: 'hub' },
      { req: 'cap:knuckle', fx: ['free:knuckle', '+sold_knuckle', 'chits+4', 'rep:brass-2', 'rep:knuckle-4'], res: 'Selling Brass\'s fighter back into Brass\'s own city: the buyer laughs and pays four chits. Knuckle goes quietly. His eyes don\'t.', next: 'hub' },
      { req: 'cap:sporeling', fx: ['free:sporeling', '+sold_spore', 'chits+7', 'rep:bloom-4'], res: 'A live Bloom sporeling fetches a lot in a city where nothing grows. The buyer takes the jar in heat-proof gloves. The little light inside it is your face, and it does not change expression as it goes.', next: 'hub' },
      { req: 'cap:foreman', fx: ['free:foreman', '+sold_foreman', 'chits+8', 'rep:reclaimers-4'], res: 'The Syndicate pays very well for the Foreman of the Reclaimers. Someone here holds a grudge going back years. He goes in the back of a cart without a word, and looks at you the whole way down the street.', next: 'hub' },
      { fx: ['free:dolores', '+sold_dolores', 'chits+3', 'rep:dolores-5', 'heat+2'], res: 'You sell a seventy-four-year-old woman from across the street to a man made of smoke for three chits. She tells him, on the platform, that his posture is atrocious. He laughs. You will never be able to tell anyone you did this. There is no one left to tell.', next: 'hub' }
    ] },
    { t: 'Leave the market.', a: 'neutral', res: 'You walk out past the stall that only sells left shoes. Some other time.', next: 'hub' }
  ]
});

FK.S({
  id: 'f_rick', ch: 2, loc: 'cinder', title: 'The Noodle Bar', teaser: 'The cook looks familiar.',
  req: 'seen:f_brass | seen:f_pit',
  text: [
    'A hole-in-the-wall noodle bar under a burning awning: four stools, a pot the size of a bathtub, and a cook with spiked white hair, a stained apron and a lab coat hanging on the hook behind him.',
    'He is the old man from the photo. Or one of him. Thinner, older, a burn scar up one side of his neck. He looks at your portal gun and puts down his ladle.',
    '"Oh, come on," he says. "Seriously? Which one are you, the squatter? Sit down. Eat. I\'m not going to rob you. I\'m retired." He slaps a bowl in front of you. "Rick. Different Rick. Don\'t ask me where my family is, and I won\'t ask you where yours went."'
  ],
  choices: [
    { t: 'Eat, and ask him how he stays hidden from the grey camp.', a: 'talk', fx: ['+met_noodle', '+clue_paper', 'hp+1', 'note:A different Rick runs a noodle bar in Cinderfall. He hid from the Reclaimers by selling everything he owned. "The trick is, somebody else has to pick it up."'],
      res: '"Easy," says Noodle Rick. "Own nothing. Ledger can\'t find a man with nothing." He stirs. "Course, it only works if somebody else picks up what you dropped. Otherwise there\'s a hole in the ledger shaped exactly like you, and they find the hole." He looks at you over the steam. "Your one find a sucker yet?" Then he looks at you properly, and puts the ladle down. "Oh. Oh, buddy."', next: 'hub' },
    { t: 'Ask him to teach you how the gun really works.', a: 'science', fx: ['+met_noodle', 'brains+1', 'sp+1'],
      res: 'He talks with his mouth full for two hours. Fluid ratios. Why the barrel is short. Why you never fire it at your own feet. He draws diagrams on napkins and sets them on fire when he\'s done. You leave with half of it. Half is a lot.', next: 'hub' },
    { t: 'Tell the Syndicate there\'s a Rick hiding in their noodle bar.', a: 'betray', fx: ['+met_noodle', '+sold_noodle', 'chits+5', 'rep:syndicate+2'],
      res: 'A Syndicate man in a heat-proof coat pays you five chits for the tip. By the time you pass the noodle bar again, the stools are kicked over and the pot is on its side and the lab coat is gone from the hook. You don\'t know where he went. You don\'t want to.', next: 'hub' },
    { t: 'Rob him. Retired Ricks keep stashes.', a: 'force', req: 'muscle>=3 | item:raygun', fx: ['+met_noodle', 'scrap+3', 'give:fluid', '+robbed_noodle'],
      res: 'He doesn\'t fight. He just sighs. "Third time this year." Under the counter: parts, a vial of portal fluid, and a photo of a family that isn\'t yours, which you leave. On your way out he says: "You\'re getting more like him every day, buddy. Ours always do."', next: 'hub' }
  ]
});

FK.S({
  id: 'f_auction', ch: 2, loc: 'cinder', title: 'The Auction', teaser: 'Someone is selling something with your name on it.',
  req: 'brass_contact & (rep:brass>=1 | seen:f_rick)',
  text: [
    'Brass sends the charcoal kid to fetch you. In the back room of the stall, under the bell: an auction. A dozen bidders in heat-proof coats and one in grey, a Reclaimer quartermaster with a ledger compass on a chain.',
    'The lot on the block is a sheet of paper under glass. "Lot nine," says Brass, glowing. "Collection rights. One property, Earth, Lindell Court, including all contents and the current holder of its claim." The quartermaster raises a hand without looking up.',
    'The current holder of its claim is you. They are auctioning the right to come and take you.'
  ],
  choices: [
    { t: 'Bid on yourself.', a: 'talk', req: 'chits>=5', fx: ['chits-5', '+bought_rights', 'rep:reclaimers-2', 'rep:brass+1'],
      res: 'The room turns to look at you when you raise your hand. The quartermaster bids. You bid. He bids. You bid everything you have. He looks at you for a long time and lowers his hand. "Sold," says Brass, "to the lot itself. Delightful." You own the right to collect yourself. The grey camp has lost the paperwork to do it legally, which, for people like this, matters more than you\'d think.', next: 'hub' },
    { t: 'Swap the paper under the glass while nobody\'s looking.', a: 'sneak', req: 'sneak>=3 | skill:ghoststep', fx: ['+swapped_lot', 'rep:reclaimers-2', 'rep:brass-1'],
      res: 'A bump, a sleight, a paper from your own pocket. When the quartermaster wins the lot, he wins the deed to a Cinderfall noodle bar, or a tax notice, or a page of the boy\'s homework. You\'re three streets away when he reads it.', next: 'hub' },
    { t: 'Sell the bidders something better: where the old man really is.', a: 'betray', req: 'mystery>=1', fx: ['chits+8', '+sold_family', 'rep:family-4', 'rep:reclaimers+3', 'sp+1'],
      res: 'You stand up. "You\'re all bidding on the wrong lot," you say. "The old man never left the house." The room goes very quiet. The quartermaster leans forward. You tell them enough. The auction pays you for the information. On the way home you feel the heater\'s hum in your shins before you\'re even through the portal, and it is not a happy chord.', next: 'hub' },
    { t: 'Walk out. Let them bid.', a: 'flee', fx: ['+auction_left'],
      res: 'You walk out while the bidding is still going. Behind you, the bell rings once. Sold. Somewhere in a ledger, someone has bought the right to walk into your house.', next: 'hub' }
  ]
});

FK.S({
  id: 'f_settle', ch: 2, loc: 'cinder', title: 'Settle Cinderfall', teaser: 'Decide what you are to this city.', prio: 6,
  req: 'brass_contact & (seen:f_pit | seen:f_fire | seen:f_rick | seen:f_auction)',
  text: [
    'Cinderfall has had a good look at you now. The pit, the market, the fires. The Syndicate knows your face. Brass knows your business.',
    'Brass sits behind the counter, seams glowing low. "So," it says. "What are we, you and I? Rick and I were partners. Then we weren\'t. I would like to know which way you\'ll go before you go it."'
  ],
  choices: [
    { t: 'Shake on it. Partners: you supply Rick\'s junk, Brass sells it.', a: 'talk', req: 'rep:brass>=1', fx: ['axis:cinder=partner', '+settled_cinder', 'rep:brass+2', 'chits+3', 'sp+1'],
      res: 'Brass\'s hand is hot as a skillet. "Partners," it says. "Twenty percent. Thirty if you bring me anything that screams." You leave with a standing order and a city that will open doors for you.', next: '@loc:garage' },
    { t: 'Stay. For good. Run the stall with Brass and never go back.', a: 'flee', req: 'rep:brass>=2', fx: ['axis:exit=cinderlord'], next: '@ending' },
    { t: 'Promise partnership, then walk out with Brass\'s best stock.', a: 'betray', fx: ['axis:cinder=cheated', '+settled_cinder', 'rep:brass-5', 'rep:syndicate-3', 'scrap+4', 'chits+4', 'sp+1'],
      res: 'You shake. You smile. And while Brass is writing up the contract, you sweep the shelf of tiny suns into your bag and step through a portal you fired at the floor. The bell starts ringing as the portal closes. It will not stop ringing for you for a very long time.', next: '@loc:garage' },
    { t: 'Torch the stall. Show them cold fire can come from anywhere.', a: 'force', req: 'item:flask | item:raygun | item:frostcell', fx: ['axis:cinder=burned', '+settled_cinder', 'rep:brass-5', 'rep:syndicate-4', 'take:flask', 'sp+1'],
      res: 'Rick\'s flask, opened and thrown. It burns blue. The one fire this city fears. Brass\'s shelves go up in cold flame, and Brass stands in the middle of it, glowing, saying nothing at all, looking at you. You portal out. Behind you a whole street is learning to be afraid of something again.', next: '@loc:garage' },
    { t: 'Open your own stall across the Row. Compete.', a: 'science', req: 'chits>=4 | scrap>=4', fx: ['axis:cinder=rival', '+settled_cinder', 'rep:brass-2', 'rep:syndicate+1', 'chits+2', 'sp+1'],
      res: 'Four chits buys a dead stall across the Row and a sign: GRADY & NOBODY — RICK\'S JUNK, HONEST PRICES. On opening night you outsell Brass three to one. Brass rings its bell at you from across the street, slowly, once, like a challenge. You are a merchant in Cinderfall now. You have a rival made of metal.', next: '@loc:garage' },
    { t: 'Pay what you owe, take nothing, and go.', a: 'sneak', fx: ['axis:cinder=quiet', '+settled_cinder', 'sp+1'],
      res: '"Nothing?" says Brass. "You\'re the first person ever to leave this stall owing nothing and owed nothing." Its seams dim, then brighten. "I find that unsettling. Goodbye." You go home.', next: '@loc:garage' }
  ]
});
