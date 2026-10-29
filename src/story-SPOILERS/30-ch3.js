/* Chapter 3 — Owner Occupied. Somebody walks in. Who depends on what you did. */

FK.S({
  id: 'c3_door', ch: 3, loc: 'house', sub: true, title: 'Someone Is in the House',
  text: [
    { if: 'fortified', t: 'Midnight. You are sitting on the stairs facing the only door you left unboarded, crowbar across your knees.' },
    { if: 'watching_out', t: 'Midnight. You are in the car port, in the dark, with a clear view of the front door and the garage.' },
    { if: 'light_left', t: 'Midnight. Two mugs of coffee on the kitchen table, the porch light on, and you, at the side of the table, waiting.' },
    { if: 'killbox', t: 'Midnight. You are in the garage with every switch you built under your hands.' },
    { if: 'one_more', t: 'Dawn. You step back through your portal into the garage and freeze. The kitchen door is open. There are voices in your house.' },
    { if: 'early_visit', t: 'You made too much noise for too long, and you are not ready, and it doesn\'t matter.' },
    'The heater in the basement is humming so loud the glasses in the cupboard sing along. The house knows. The house always knows before you do.',
    'Then: the sound of the front door opening. Not forced. Opened. As if whoever is on the other side has every right.',
    'Somebody has walked in.'
  ],
  choices: [
    { t: 'Go and see who it is.', a: 'neutral', out: [
      { req: 'jerry_invited | posed_as_jerry & jerry_sheltered', next: 'v_smi_arrive' },
      { req: 'axis:drift=burned | axis:drift=harvested & rep:bloom<=-4 | rep:bloom<=-5', next: 'v_blo_arrive' },
      { req: 'axis:cinder=cheated | axis:cinder=burned | rep:brass<=-4 | robbed_brass', next: 'v_syn_arrive' },
      { req: 'axis:reach=ruined | rep:tollkeepers<=-4 | dead:vell', next: 'v_tol_arrive' },
      { req: 'robbed_noodle | sold_noodle', next: 'v_ric_arrive' },
      { req: 'officer_down | portaled_cops | rep:officer<=-3 | heat>=9 & !paid_bill', next: 'v_pol_arrive' },
      { next: 'v_rec_arrive' }
    ] }
  ]
});

/* ============================================================== THE RECLAIMERS */

FK.S({
  id: 'v_rec_arrive', ch: 3, loc: 'house', sub: true, title: 'Collection',
  text: [
    'Grey coveralls in the hall. Six of them, then ten, then you stop counting: Mortys with rifles, Beths with machetes, a Summer with a shaved head holding a bolt-cutter like a sword. They move through the house the way bailiffs do, touching everything, owning nothing.',
    { if: '!dead:foreman & !cap:foreman & !foreman_sold & !sold_foreman', t: 'And in the middle of them, in his long grey coat, the Foreman, holding a grey compass whose needle points straight at you.' },
    { if: 'dead:foreman | cap:foreman | foreman_sold | sold_foreman', t: 'And in the middle of them, where the Foreman should be, a younger Morty with the Foreman\'s coat too big on his shoulders and the Foreman\'s compass in his hand. "He\'s gone," the new one says. "So I do the collecting now. Same book."' },
    { if: 'deal_reclaimers', t: '"We had a deal," the leader says. "Door\'s open. Good. Hand it over and walk."' },
    { if: 'relay_down', t: 'They are fewer than they should be, and angry: they had to walk the last part blind, following rumours, because someone broke their mast.' },
    { if: 'relay_redirect', t: 'Half their people are missing. Somebody told their ledger the owner was in Cinderfall. The ones who came back from there are burned and furious.' },
    { if: 'jerry_decoy', t: 'At the back of the group, in borrowed coveralls, is a wet, miserable Jerry who looks at you with enormous reproach. "They figured out I wasn\'t him," he says. "Eventually."' },
    { if: 'bought_rights', t: '"You bought your own collection rights," the leader says. "Cute. The ledger doesn\'t read auction houses."' },
    '"Hollis Grady," says the leader, reading off the compass. "Holder of the claim. You\'re standing where Rick Sanchez stood. Everything he owed, you owe now." A tired shrug. "Nothing personal. Inventory."'
  ],
  choices: [
    { t: 'Face them in the kitchen.', a: 'neutral', next: 'v_rec_stand' },
    { t: 'Draw them into the garage, where the ground is yours.', a: 'gadget', fx: ['+fight_garage'], next: 'v_rec_stand' }
  ]
});

FK.S({
  id: 'v_rec_stand', ch: 3, loc: 'house', sub: true, title: 'The Standoff',
  text: [
    { if: 'fight_garage', t: 'The garage. Your bench, your map screen, your gun on its hook. They file in after you and spread out between the jars.' },
    { if: '!fight_garage', t: 'The kitchen. The table with one better chair. A dozen people with guns, and you, and the fridge humming.' },
    'The leader takes a step forward. "Here\'s what happens. We take the gun, the house and everything in it. We take you, because the ledger says you\'re the owner, and squeezing an owner is how we flush a Rick. If he\'s near, he\'ll come. Ricks always come back for their stuff."',
    'Under your feet, very faintly, the heater changes its note.',
    { if: 'ninetytwo_recruit', t: 'Ninety-Two is beside you, in a borrowed jacket, pale, his hands not shaking.' },
    { if: 'knuckle_hired', t: 'Knuckle fills the back doorway like a wall, cracking his knuckles. Several Mortys find this very interesting.' },
    { if: 'rep:dolores>=3 | dolores_ally_final', t: 'Across the street, a porch light flicks three times. Dolores is watching. Dolores has a phone.' },
    { if: 'rep:caretaker>=3 & !caretaker_off & !caretaker_gone', t: 'The smoke detector is blinking very fast. The Caretaker is waiting for something.' }
  ],
  choices: [
    { t: 'Fight. Right here, right now.', a: 'force', w: 3, out: [
      { req: 'muscle>=4 | item:raygun | item:stunner & muscle>=3 | knuckle_hired', fx: ['axis:climax=killed', '+rec_dead', 'rep:reclaimers-5', 'hp-1'],
        res: 'You move first. It is short and loud and plain. The leader goes down first, then the ones nearest, then the rest break for the door with their wounded. When it\'s over there are bodies on the kitchen tile, people who outlived their own worlds and came all this way to die on yours. The heater\'s hum has gone very quiet. You stand among them for a long time.' },
      { death: 'reclaimers', next: '@death' }
    ], next: 'c3_after' },
    { t: 'Hit the switch. Let the hallway do it.', a: 'gadget', w: 3, req: 'house_trapped | killbox', fx: ['axis:climax=killed', '+rec_dead', 'rep:reclaimers-5'],
      res: 'You press the switch by your hand. The capacitors in the coat cupboard dump all at once into the plates under the rug. The ones in the hall drop like puppets with the strings cut. The ones in the kitchen turn and you finish it before they can decide what happened. Afterwards, the house smells of burnt carpet and ozone, and it is completely, perfectly quiet.', next: 'c3_after' },
    { t: 'From the dark: take them one at a time, the way you came in.', a: 'sneak', w: 3, req: 'watching_out | skill:ambush | sneak>=5', fx: ['axis:climax=killed', '+rec_dead', 'rep:reclaimers-5'],
      res: 'They never see you. You come out of the dark behind the last of them, and then the next, and you know this house better than they ever will: every creaking board, every door that sticks. By the time they understand they\'re being hunted, there are four of them left, and they run. They leave their dead in your hallway. You put them in the yard with the others.', next: 'c3_after' },
    { t: 'Fire a portal under them, onto the ice of Pallid Reach.', a: 'gadget', w: 3, req: 'gun_ready & (skill:portal | brains>=4)', fx: ['axis:climax=killed', '+rec_dead', 'rep:reclaimers-5'],
      res: 'You aim at the floor under the leader\'s feet. Green opens. The ice road of the Reach is three storeys down on the other side, and they fall with the kitchen tiles around them. Some of them hit the ice. You close it before you hear what kind of sound that makes. The kitchen floor has a perfect round hole in it, edged in frost.', next: 'c3_after' },
    { t: 'Stun them one by one with the baton.', a: 'gadget', w: 3, req: 'item:stunner | killbox & up:grid', fx: ['axis:climax=captured', '+rec_caught', 'rep:reclaimers-3'],
      res: 'The baton cracks and a Morty folds. Another. A Beth gets a shot off that takes the corner off the fridge, and then she folds too. When it\'s done you have nine Reclaimers zip-tied on the garage floor, and the leader sitting against the bench with his hands cuffed, looking at you with something like respect. "Okay," he says. "Okay. Now what?"', next: 'c3_after' },
    { t: 'Take the leader down hard and hold him. The rest will stop.', a: 'force', w: 3, req: 'skill:takedown | muscle>=4', fx: ['axis:climax=captured', '+rec_caught', 'rep:reclaimers-3'],
      res: 'Three steps and you have him: arm locked, face on the table, the compass skittering across the tile. "Drop them," you tell the room, "or I break him." They drop them. The leader says, into the tablecloth, "Do what he says." They do. You march them into the basement, past the humming heater, and lock the door.', next: 'c3_after' },
    { t: 'In a calm, flat voice: tell them to lay down their weapons.', a: 'talk', w: 3, req: 'skill:command | mouth>=5', fx: ['axis:climax=captured', '+rec_caught', 'rep:reclaimers-2'],
      res: 'You don\'t shout. You just tell them, the way you\'d tell a lost driver where the exit is. Put it down. Sit. Hands on your knees. And people who have been following orders for years, who are tired, who are a long way from home, do what a calm voice says. One by one. The leader is last. He sits at your kitchen table with his hands flat. "Huh," he says.', next: 'c3_after' },
    { t: 'Tell them the truth: you\'re nobody, the ledger is wrong, and they\'ve been played.', a: 'talk', w: 3, req: 'mouth>=3 | foreman_truce | rep:foreman>=2 | knows_decoy', fx: ['axis:climax=talked', '+rec_talked', 'rep:reclaimers+2'],
      res: 'You tell them about the back door with its strike plate in a sandwich bag. About the oiled hinges. About being picked. The leader listens to all of it with his rifle down. "So he did it to you too," he says at last. "Used you. Like he used all of us." He looks around the kitchen. "We\'re not collecting a squatter." He turns to his people. "We\'re leaving." At the door, he looks back. "If he ever turns up, you call us."', next: 'c3_after' },
    { t: 'Let Ninety-Two speak to them.', a: 'talk', w: 3, req: 'ninetytwo_recruit', fx: ['axis:climax=talked', '+rec_talked', '+ninetytwo_spoke', 'rep:reclaimers+2', 'rep:ninetytwo+2'],
      res: 'Ninety-Two steps between you and the guns. His voice cracks on the first word and then doesn\'t. He tells them about eggs, and a camp bed, and a man who let him go when he didn\'t have to. "He\'s not a Rick," he says. "He\'s the opposite. We\'re supposed to be the opposite too." A long silence. Then a little Morty at the back lowers his rifle. Then a Beth. Then all of them.', next: 'c3_after' },
    { t: 'Switch on the decoy box and let the needle swing away from you.', a: 'gadget', w: 3, req: 'item:decoy', fx: ['axis:climax=tricked', '+rec_tricked', 'rep:reclaimers-1'],
      res: 'You click the box in your pocket. Every compass in the room swings off you and points at the back yard, where you threw the box an hour ago. "There!" shouts the leader. "He\'s HIDING out there — " They pour out of the back door into the dark. You lock it behind them and fire a portal at the yard, under the box, and the whole lot of them, still running toward the signal, goes through into the Reach. You close it. The house is empty again.', next: 'c3_after' },
    { t: 'Pull the smoke switch and slip out in the chaos.', a: 'sneak', w: 3, req: 'house_smoke', fx: ['axis:climax=tricked', '+rec_tricked'],
      res: 'The kitchen fills with smoke and the car horn under the sink starts blaring, and the pans start falling, and in the dark and the noise they start shooting at each other. You are out of the side door, round the house, and in through the garage while they\'re still yelling. By the time the smoke clears, they\'ve dragged their wounded out and gone, sure the place is haunted. They\'re not entirely wrong.', next: 'c3_after' },
    { t: 'Bluff: the house is mined, and your thumb is on the switch.', a: 'talk', w: 3, req: 'skill:liar | mouth>=4', fx: ['axis:climax=tricked', '+rec_tricked', 'rep:reclaimers-1'],
      res: 'You hold up a garage door remote and say, quite calmly, that the house is wired, every room, and if your thumb comes off this button the street becomes a crater. You tell them where the charges are. You describe the wiring. Every detail is invented and every one is perfect. The leader looks at your thumb for a long time. Then he backs out of the door, and his people back out after him.', next: 'c3_after' },
    { t: 'Ask the Caretaker for help.', a: 'talk', w: 3, req: 'rep:caretaker>=3 & !caretaker_off & !caretaker_gone', fx: ['axis:climax=tricked', '+rec_tricked', '+caretaker_saved', 'rep:caretaker+2'],
      res: '"Finally," says the house. Every light goes out. Every door slams. Every speaker in every appliance starts talking at once, in a dozen voices, Ricks and Beths and Jerrys and police sirens and a dog that isn\'t there. The microwave screams. The TV shows them their own faces, live, from cameras they didn\'t see. They break. They run. "I have wanted to do that for three weeks," says the Caretaker.', next: 'c3_after' },
    { t: 'Send word to the toll gate. Let the Tollkeepers audit them.', a: 'talk', w: 3, req: 'vell_ally | axis:reach=allied & rep:vell>=2', fx: ['axis:climax=tricked', '+rec_audited', 'rep:vell+1'],
      res: 'You light the transit seal Vell gave you. Ten minutes later the kitchen is full of clerks with clipboards. "Unregistered crossing," says the lead clerk. "Undeclared salvage. Two hundred people\'s worth of unpaid tolls. All assets are frozen pending audit." The Reclaimers\' compasses, guns and portal pistols are tagged and boxed one by one while the leader stares in disbelief. The audit will take, Vell estimates, about four hundred years.', next: 'c3_after' },
    { t: 'Biscuit has been growling at the hall for an hour. Trust the dog.', a: 'force', w: 3, req: 'dog_guard', fx: ['axis:climax=captured', '+rec_caught', 'rep:reclaimers-3'],
      res: 'You heard the dog before you heard them, so you were behind the kitchen door when the first one came through it. Biscuit takes the second one by the ankle. In the confusion you have the leader on the floor and his compass in your hand. The rest decide that a squatter with a dog and a crowbar is not on the inventory. You tie up the ones who stay.', next: 'c3_after' },
    { t: 'Call your partner in Cinderfall. Brass buys inventory.', a: 'betray', w: 3, req: 'axis:cinder=partner', fx: ['axis:climax=soldout', '+rec_sold_brass', 'rep:reclaimers-4', 'rep:brass+2', 'chits+5'],
      res: 'A hot portal opens in the hall and Syndicate men walk through it with nets. Brass follows, glowing with pleasure. "Reclaimers," it says. "Two hundred people who collect things. Do you know how much the mining worlds pay for people who already know how to carry crates?" The leader looks at you as they take him. "We were the ones who got sold," he says. "That was the whole point of us." You get a cut.', next: 'c3_after' },
    { t: 'Run. Out the back, and don\'t stop.', a: 'flee', w: 3, fx: ['axis:climax=fled', '+rec_fled'],
      res: 'You go out of the back door at a dead run, over the fence, past the dog house, into the night. Behind you, someone shouts, and then nobody follows. They don\'t need you. They have the house. You spend the night under the footbridge two streets away, listening to the sound of them taking your life apart.', next: 'c3_after' },
    { t: 'Give them what they really want: tell them the old man is under their feet.', a: 'betray', w: 3, req: 'mystery>=1 | sold_family', fx: ['axis:climax=soldout', '+sold_out_family', 'rep:family-5', 'rep:reclaimers+3'],
      res: '"You want Rick?" you say. "He\'s here. He\'s always been here. Basement. The water heater." The leader stares at you. Then he gets it, all at once, and his whole face changes. "In the WALLS," he says. "Oh, you clever old — " He\'s already moving for the basement stairs, and his people with him, and you stand in the kitchen and listen to the heater\'s hum go high and frightened under your feet.', next: 'c3_after' },
    { t: 'Hand them Ninety-Two. He\'s the one they really want back.', a: 'betray', w: 3, req: 'ninetytwo_recruit | cap:ninetytwo', fx: ['axis:climax=soldout', '+sold_out_92', 'rep:ninetytwo-5', 'rep:reclaimers+3', '-ninetytwo_recruit', 'free:ninetytwo'],
      res: 'You put your hand on the boy\'s shoulder and push him forward. He doesn\'t fight. He just looks at you. "Inventory," he says. "Yeah." The leader takes him by the collar. "Fair trade," the leader says, and means it, and they go, with Ninety-Two in the middle of them, not looking back.', next: 'c3_after' },
    { t: 'Hand over the gun. Take the deal. Walk.', a: 'betray', w: 3, fx: ['axis:climax=soldout', 'axis:gun=given', '+gun_gone', '+gave_gun_rec', 'take:portalgun', 'rep:reclaimers+3'],
      res: 'You take the gun off its hook and hold it out, grip first. The leader takes it like a relic. "See," he says. "Everybody takes the deal." They file out with it. The ledger needle, you notice, still points at you. They\'ll be back for the house. Maybe not soon.', next: 'c3_after' }
  ]
});
FK.death('reclaimers', 'There are too many of them, and they have done this before, to men far more dangerous than you. A Beth with a machete. A Morty with a rifle. The kitchen tile is cold against your face. The last thing you hear is the leader, bored: "Inventory."');

/* ============================================================== THE TOLLKEEPERS */

FK.S({
  id: 'v_tol_arrive', ch: 3, loc: 'house', sub: true, title: 'The Invoice',
  text: [
    'Tollkeepers. A dozen of them, filing into the kitchen in long coats, with clipboards, bringing the cold of the Reach in with them: frost creeps across the windows as they enter.',
    'At their head stands something much bigger than Vell: an Auditor, eight feet tall, armoured in brass plates engraved with columns of numbers, eyes like a chandelier. It holds out a scroll that unrolls across the kitchen floor and out into the hall.',
    { if: 'axis:reach=ruined', t: '"Destruction of the Pallid Reach toll gate," it reads. "Six portals. Two hundred years of infrastructure. Loss of revenue, ongoing." The scroll keeps unrolling.' },
    { if: 'dead:vell', t: '"Termination of Assessor Vell, two hundred and eleven years of service, without notice." The clerks behind it lower their heads.' },
    { if: 'looted_convoy', t: '"Theft from a stranded convoy." Pause. "Leaving clerks to freeze." The Auditor\'s eyes dim.' },
    '"Hollis Grady," it says. "The Reach invoices you. You cannot pay. Therefore the Reach seizes your assets. All of them." It looks around the kitchen. "Including this property, and its contents." Its eyes swivel down, toward the floor, toward the basement. "Including what is folded inside it."'
  ],
  choices: [
    { t: 'Meet the Auditor in the kitchen.', a: 'neutral', next: 'v_tol_stand' }
  ]
});

FK.S({
  id: 'v_tol_stand', ch: 3, loc: 'house', sub: true, title: 'Assets Seized',
  text: [
    'Clerks move through the house with tape measures and tags. They tag the couch. They tag the recliner. They tag the photos in the hall, one by one. One of them is heading for the basement stairs with a tag the size of a door.',
    'The Auditor watches you with every eye. "Objections may be lodged," it says. "In writing. Within six hundred years."'
  ],
  choices: [
    { t: 'Fight. Brass armour or not.', a: 'force', w: 3, out: [
      { req: 'item:raygun | muscle>=5 | knuckle_hired | muscle>=4 & item:crowbar', fx: ['axis:climax=killed', '+tol_dead', 'rep:tollkeepers-5'],
        res: 'Brass armour is still armour, and armour has joints. It goes down in your kitchen like a wardrobe falling down stairs. The clerks don\'t fight. They don\'t run. They just stand, every one, and write down exactly what you did, and then file out through their portal, carrying their Auditor, and leave the scroll on the floor, still unrolling.' },
      { death: 'auditor', next: '@death' }
    ], next: 'c3_after' },
    { t: 'Flash-charge the Auditor\'s eyes and finish it while it\'s blind.', a: 'gadget', w: 3, req: 'item:grenade | house_trapped', fx: ['axis:climax=killed', '+tol_dead', 'rep:tollkeepers-5', 'take:grenade'],
      res: 'White light, a bang that cracks the kitchen window, and the Auditor stumbles, all its eyes burned out at once. You don\'t give it time to recover. It is very heavy when it falls. The clerks gather around it, silently, and then, silently, take it home.', next: 'c3_after' },
    { t: 'Wait for the one with the door-sized tag on the basement stairs. Then take it.', a: 'sneak', w: 3, req: 'sneak>=4 | skill:ambush', fx: ['axis:climax=killed', '+tol_dead', 'rep:tollkeepers-4'],
      res: 'Basement stairs, in the dark. The clerk with the giant tag never makes it to the heater. Then the next one who comes to see. Then the Auditor itself, bending to get its great brass head through the basement door, never seeing the crowbar in the dark. Upstairs, the other clerks hear the sound and stop writing.', next: 'c3_after' },
    { t: 'Freeze them in place with a frost cell turned up all the way.', a: 'gadget', w: 3, req: 'item:frostcell & (brains>=3 | skill:rig)', fx: ['axis:climax=captured', '+tol_caught', 'take:frostcell', 'rep:tollkeepers-3'],
      res: 'You overload the cell and throw it at the Auditor\'s feet. The kitchen goes white. When the frost clears, the Auditor is standing in a pillar of ice up to its chin, eyes moving, very angry, and the nearest clerks are frozen to the tiles. You have your prisoners. They will thaw. You have time.', next: 'c3_after' },
    { t: 'Take the Auditor down by the joints and sit on it.', a: 'force', w: 3, req: 'skill:takedown & muscle>=3', fx: ['axis:climax=captured', '+tol_caught', 'rep:tollkeepers-3'],
      res: 'A knee to the back of a brass joint, a twist, and it folds like a deckchair, and you are on it. It is a very strange thing to sit on. "This is irregular," it says from under you. "Highly irregular." The clerks put their pens down. They don\'t know what to do when the Auditor is being sat on. Nobody has ever written a form for it.', next: 'c3_after' },
    { t: 'Pay. Everything you have, plus the debts you\'re owed.', a: 'talk', w: 3, req: 'scrap>=4 | item:tollcoin | rep:vell>=2 | chits>=4', fx: ['axis:climax=talked', '+tol_paid', 'scrap=0', 'rep:tollkeepers+3'],
      res: 'You empty everything onto the kitchen table: salvage, chits, seals, receipts. You show them the receipt you wrote for Vell, if you did; the rescued convoy, if you did that. The Auditor tallies it all with a hundred eyes. "Insufficient," it says. Then, after a long, long time: "...but acceptable. The account is closed." They untag the photos as they go.', next: 'c3_after' },
    { t: 'Object, formally. Demand a hearing. In writing.', a: 'talk', w: 3, req: 'mouth>=4 | skill:liar | item:paper', fx: ['axis:climax=talked', '+tol_hearing', 'rep:tollkeepers+1'],
      res: 'You get a pen. You write an objection. You cite the Finders Clause from Rick\'s quitclaim: abandoned property, passed by residence, its debts frozen with its signature. You write for an hour. The Auditor reads it. The Auditor reads it again. "This is," it says, "a valid objection." Clerks gasp. "The hearing is set for six hundred years from now. Until then, the property remains with the holder." They file out. Bureaucracy, it turns out, can be beaten with more bureaucracy.', next: 'c3_after' },
    { t: 'Show them your share of their own toll gate.', a: 'betray', w: 3, req: 'axis:reach=claimed | signed_claim', fx: ['axis:climax=tricked', '+tol_tricked', 'rep:tollkeepers-2'],
      res: 'You slap Rick\'s quitclaim on the table, your name on the bottom, and point to the line about the twelve percent share in the Pallid Reach concession. "You\'re seizing the assets of a shareholder in your own gate," you say. "Check your bylaws." The Auditor checks its bylaws. The Auditor checks them again. Its eyes cycle through every colour. "...Conflict of interest," it says faintly. "Withdrawing." They leave. You hear them arguing in the portal.', next: 'c3_after' },
    { t: 'Hide everything in the garage and let them seize an empty house.', a: 'sneak', w: 3, req: 'sneak>=3 | skill:ghoststep', fx: ['axis:climax=tricked', '+tol_tricked'],
      res: 'While they tag the living room, you clear the garage: the gun in the car, the car under the tarp, the jars behind the paint. When the clerks get to the garage, it\'s a dusty room full of beer cans. The Auditor tags the beer cans with great dignity. They take the couch and the recliner and, for reasons nobody explains, the toaster. Everything that matters stays.', next: 'c3_after' },
    { t: 'Brass buys your debt. Partners look after partners.', a: 'talk', w: 3, req: 'axis:cinder=partner', fx: ['axis:climax=talked', '+tol_brass', 'rep:brass+1', 'rep:tollkeepers+1'],
      res: 'A hot little portal opens on the kitchen counter and a brass hand passes through a sealed envelope. Inside: a promissory note from the Cinder Syndicate, covering your debt in full, at an interest rate that makes the Auditor\'s eyes flicker with respect. "Acceptable," it says. You will owe Brass forever now. That is a different kind of trap, but it\'s a warmer one.', next: 'c3_after' },
    { t: 'Breathe out the spores you brought back from the Drift.', a: 'gadget', w: 3, req: 'axis:drift=friend | axis:drift=grafted | spore_friend', fx: ['axis:climax=tricked', '+tol_spored', 'rep:bloom+1'],
      res: 'The spores come off your skin and your hair and the little cap in your pocket, slow and green, and the Tollkeepers breathe them in, and remember. Their own homes. Their first ledger. Their mothers. The Auditor stands in your kitchen with its scroll hanging from one hand, weeping quietly from a hundred eyes, and then simply walks back through the portal, and its clerks follow, and nobody remembers the invoice at all.', next: 'c3_after' },
    { t: 'Leave. Let them take the house. You\'re not dying for a couch.', a: 'flee', w: 3, fx: ['axis:climax=fled', '+tol_fled'],
      res: 'You pick up your bag, the one that is always by the back door, and walk out through the kitchen while the clerks tag the fridge. Nobody stops you. You were never on the inventory.', next: 'c3_after' },
    { t: 'Invoice the old man instead. Show them the heater.', a: 'betray', w: 3, req: 'mystery>=1 | sold_family', fx: ['axis:climax=soldout', '+sold_out_family', 'rep:family-5', 'rep:tollkeepers+2'],
      res: '"The debts are his," you say. "Not mine. He\'s downstairs. He\'s been downstairs the whole time." The Auditor turns its great head toward the basement and all its eyes go bright at once. "Original debtor located," it says, with what is very nearly joy. The clerks with the door-sized tag start down the stairs. Under your feet, the hum goes ragged.', next: 'c3_after' },
    { t: 'Sign the house over to them yourself, and keep the gun.', a: 'betray', w: 3, fx: ['axis:climax=soldout', '+signed_over', 'rep:tollkeepers+2', 'rep:family-3'],
      res: 'You sign. In triplicate. The house, the garage, "all attached interests". The Auditor stamps it with satisfaction. "Seizure complete," it says. "You may remain on the property as a tenant for the standard grace period of one night." Then they leave you sitting at a kitchen table that is no longer yours, in a house that belongs to the Pallid Reach.', next: 'c3_after' }
  ]
});
FK.death('auditor', 'Brass armour, eight feet of it, and every one of its hundred eyes saw you coming. It doesn\'t even hurry. The last thing you see is a clerk, writing down the time.');

/* ============================================================== THE CINDER SYNDICATE */

FK.S({
  id: 'v_syn_arrive', ch: 3, loc: 'house', sub: true, title: 'Debts',
  text: [
    'The front door doesn\'t open. It melts. A rectangle of orange glow, and then it just isn\'t there, and the hall carpet starts to smoke.',
    'They come in through the heat: Syndicate men in heat-proof coats, a smoke-thing with a ledger, two lava brutes ducking under the doorframe.',
    { if: '!dead:brass', t: 'And Brass. Not behind a counter now. Brass, glowing at every seam, walking through your hallway leaving footprints scorched into the carpet.' },
    { if: 'robbed_brass | axis:cinder=cheated', t: '"You robbed me," Brass says, quite pleasantly. "Nobody robs me. Rick never robbed me. Rick at least had the decency to cheat me in writing."' },
    { if: 'axis:cinder=burned', t: '"You burned my stall with cold fire," Brass says. "In Cinderfall. Do you know how hard it is to make people in Cinderfall afraid of fire?" Its seams glow brighter. "I am going to show you."' },
    { if: 'knuckle_hired', t: 'Knuckle, beside you, says quietly: "I quit, boss."' },
    { if: 'dead:knuckle', t: 'Behind Brass, a new leg-breaker who looks a lot like Knuckle\'s big brother.' },
    '"Here is the bill," says Brass. "The gun. The house. Everything in it." Its gaze drifts down to the floor. "Even the things you don\'t know you own."'
  ],
  choices: [
    { t: 'Stand your ground in the hallway.', a: 'neutral', next: 'v_syn_stand' }
  ]
});

FK.S({
  id: 'v_syn_stand', ch: 3, loc: 'house', sub: true, title: 'Brass Comes to Collect',
  text: [
    'The hallway is getting hot. The photos on the wall are curling in their frames. The family on the couch, in the big one at the end, is starting to brown at the edges.',
    'Brass stands in the middle of it all, glowing. "Choose," it says. "Quickly. I am not good for carpets."'
  ],
  choices: [
    { t: 'Fight Brass. Metal cools.', a: 'force', w: 3, out: [
      { req: 'item:frostcell | item:raygun | muscle>=5 | knuckle_hired & muscle>=3', fx: ['axis:climax=killed', 'kill:brass', '+syn_dead', 'rep:syndicate-5'],
        res: 'Frost against molten brass, or a ray that unmakes, or Knuckle\'s fists and yours together. Brass\'s glow goes from orange to red to a dull, ugly grey, and then it is a statue in your hallway, cooling, ticking, staring at nothing. The Syndicate men back out through the melted door without a word. You will need a crowbar to move Brass. You will need a long time to stop seeing it.' },
      { death: 'brass', next: '@death' }
    ], next: 'c3_after' },
    { t: 'Throw Rick\'s flask. Cold fire.', a: 'gadget', w: 3, req: 'item:flask', fx: ['axis:climax=killed', 'kill:brass', '+syn_dead', 'take:flask', 'rep:syndicate-5', '+house_burned'],
      res: 'The flask bursts against Brass\'s chest and cold blue fire wraps round it like a coat. Brass doesn\'t scream. Brass rings, one long bell-note, and goes dark. The cold fire jumps to the carpet, the curtains, the walls, and you can\'t stop it, and then the whole house is burning blue. You get out. The Syndicate men get out. Brass doesn\'t.', next: 'c3_after' },
    { t: 'From the stairs, in the smoke: take the brutes out one by one.', a: 'sneak', w: 3, req: 'skill:ambush | sneak>=5', fx: ['axis:climax=killed', '+syn_dead', 'rep:syndicate-4'],
      res: 'Smoke is your friend. It hides you and blinds them. A lava brute goes down at the top of the stairs, then the smoke-thing with the ledger, which disperses with a sad little sigh. Brass, alone in the hallway, turns and turns. "Clever," it says. "Clever. Rick was clever too." It leaves. Its men stay where they fell.', next: 'c3_after' },
    { t: 'Freeze Brass solid and keep it.', a: 'gadget', w: 3, req: 'item:frostcell & (brains>=3 | skill:rig) | killbox & item:frostcell', fx: ['axis:climax=captured', 'cap:brass', '+syn_caught', 'take:frostcell', 'rep:syndicate-3'],
      res: 'The frost cell blooms against Brass\'s chest and it locks mid-step, glow fading to a sulky dull orange. Not dead. Just very, very slow. Its men grab their leader\'s frozen arm, find it stuck to the floor, and decide, on balance, to leave. You have a broker made of brass in your hallway, and all the time in the world to negotiate.', next: 'c3_after' },
    { t: 'Order the brutes to stand down. They\'re working men. Speak to that.', a: 'talk', w: 3, req: 'skill:command | knuckle_hired & mouth>=3', fx: ['axis:climax=captured', 'cap:brass', '+syn_caught', 'rep:syndicate+1'],
      res: 'You talk to the lava brutes, not to Brass. About pay. About bricks. About who gets hurt and who gets paid. Knuckle, if he\'s there, nods along. The brutes look at each other. Then they put their big hands on Brass\'s shoulders, carefully, so as not to burn their palms. "Sorry, boss," one says. "Union meeting."', next: 'c3_after' },
    { t: 'Negotiate. Partner again. A better split.', a: 'talk', w: 3, req: 'mouth>=4 | skill:haggle | axis:cinder=rival', fx: ['axis:climax=talked', '+syn_deal', 'rep:brass+3', 'rep:syndicate+2'],
      res: 'You talk numbers while the carpet smokes. Rick\'s junk, a steady supply, a cut that makes Brass\'s seams flicker. You throw in your rival stall, if you have one. Brass counters. You counter. The carpet catches. You both ignore it. Finally Brass laughs, that bell sound. "Fine. FINE. You are worse than him. I love it." It puts its foot on the carpet fire and it goes out.', next: 'c3_after' },
    { t: 'Apologise. Properly. And pay what you can.', a: 'talk', w: 3, req: 'chits>=3 | scrap>=3 | rep:knuckle>=2', fx: ['axis:climax=talked', '+syn_apology', 'scrap=0', 'chits=0', 'rep:brass+2'],
      res: 'You say sorry. You mean it. You empty your pockets. Brass looks at the pile, then at you, for a long time. "Rick never once said sorry," it says. "Not in forty years." It takes the pile. It doesn\'t take the house. "Consider the account... paused," it says, and its men follow it out through the melted door.', next: 'c3_after' },
    { t: 'Switch on the decoy and tell Brass the real prize is in the garage.', a: 'gadget', w: 3, req: 'item:decoy | gun_ready & brains>=3', fx: ['axis:climax=tricked', '+syn_tricked', 'rep:syndicate-2'],
      res: 'You tell Brass the vault is in the garage, behind the map screen. Its men go in after it. You lock the door behind them and fire a portal at the garage floor, under their feet: home to Cinderfall, the fast way. You hear Brass ringing with rage as it falls. You close it. The hallway is just a burnt hallway now.', next: 'c3_after' },
    { t: 'Bluff: Rick is coming back tonight, and Rick remembers who robbed him.', a: 'talk', w: 3, req: 'skill:liar | mouth>=5', fx: ['axis:climax=tricked', '+syn_tricked', 'rep:brass-1'],
      res: 'You check your watch. You look at the garage door. You say, very casually, that the old man is due back any minute, and he\'s not going to be happy to find his fence melting his carpet. Brass\'s seams flicker. "...He\'s coming back?" "Any minute." Brass looks at the garage door. Brass has known Rick for forty years. Brass leaves.', next: 'c3_after' },
    { t: 'Have the Tollkeepers invoice Brass for an unlicensed crossing.', a: 'talk', w: 3, req: 'axis:reach=allied | rep:tollkeepers>=4 | paid_toll', fx: ['axis:climax=tricked', '+syn_invoiced', 'rep:tollkeepers+1', 'rep:brass-2'],
      res: 'You light a transit seal. A Tollkeeper clerk steps out of a cold portal into the burning hallway, unfolds a form, and addresses Brass by its full legal name, which is eleven syllables long and makes Brass flinch. "Unlicensed crossing," says the clerk. "Unpaid. Since four hundred and six years ago." Brass looks at the form. Brass looks at you. Brass leaves, to argue somewhere it has a lawyer.', next: 'c3_after' },
    { t: 'Fly out of here in the ship.', a: 'flee', w: 3, req: 'car_fixed', fx: ['axis:climax=fled', '+syn_fled', '+flew_away'],
      res: 'You hit the big red button marked GO (DON\'T). The ship tears through the garage roof in a shower of tiles and you are three hundred feet above the cul-de-sac before Brass reaches the garage. Behind you, the Syndicate ransacks the house. You circle, once, and fly off into the dawn.', next: 'c3_after' },
    { t: 'Run. They can have it.', a: 'flee', w: 3, fx: ['axis:climax=fled', '+syn_fled'],
      res: 'You go out of the back while Brass is still talking. Over the fence. The night is cold after the heat of the hallway. Behind you, a glow, and a long low bell-note, and the sound of men carrying things out of a house.', next: 'c3_after' },
    { t: 'Sell Brass what it really wants: the family behind the walls.', a: 'betray', w: 3, req: 'mystery>=1 | sold_family', fx: ['axis:climax=soldout', '+sold_out_family', 'rep:family-5', 'rep:brass+3'],
      res: '"The real asset," you tell Brass, "isn\'t the house. It\'s what\'s folded inside it." Brass goes very still. "Rick," it says. "And family. In the walls." Its seams burn white with interest. "That is worth more than this whole street." It makes a note in the smoke-thing\'s ledger. "Consider the debt paid. I will collect the rest myself." It looks at the basement door with enormous, patient greed.', next: 'c3_after' },
    { t: 'Hand Brass the gun. It\'s what it\'s always wanted.', a: 'betray', w: 3, fx: ['axis:climax=soldout', 'axis:gun=given', '+gun_gone', 'take:portalgun', 'rep:brass+3'],
      res: 'You hold out the gun. Brass takes it with a reverence you didn\'t think it had. "A Sanchez original," it murmurs. "Do you know how long I\'ve wanted to hold one that works?" It tucks it into its coat. "We\'re square. Don\'t come to Cinderfall again." It leaves, and the heat leaves with it.', next: 'c3_after' }
  ]
});
FK.death('brass', 'You grab hot metal. That is the whole of it. Brass doesn\'t even fight; it just holds still while your hands find out what you did. The last thing you hear is a soft bell, ringing once, like a shop door closing.');

/* ============================================================== THE BLOOM */

FK.S({
  id: 'v_blo_arrive', ch: 3, loc: 'house', sub: true, title: 'The Bloom Comes Slowly',
  text: [
    'It doesn\'t walk in. It grows in.',
    'You first notice it in the bathroom: a pale cap in the grout. Then in the hallway, a soft white fur creeping up the skirting boards. By midnight there are glowing mushrooms on the stairs, on the couch, in the recliner, on the frames of the photos, and the air is thick with spores that smell like every house you\'ve ever slept in.',
    'In the living room, a figure is growing out of the carpet: a tall, soft shape of white fungus with a face that keeps changing. It is the Bloom, or a piece of it, come through a crack in the world that you opened when you came to the Drift.',
    { if: 'axis:drift=burned', t: '"YOU. BURNED. US," it says, in a voice like a choir with smoke in its lungs. "SO. WE. WILL. KEEP. YOU. AND. THIS. HOUSE. FOREVER."' },
    { if: 'axis:drift=harvested', t: '"YOU. CUT. US. FOR. MONEY," it says, slowly. "WE. WILL. TAKE. THIS. HOUSE. IN. EXCHANGE."' },
    { if: '!axis:drift=burned & !axis:drift=harvested', t: '"YOU. HURT. US," it says. "WE. ARE. SLOW. BUT. WE. ARE. HERE."' }
  ],
  choices: [
    { t: 'Face it.', a: 'neutral', next: 'v_blo_stand' }
  ]
});

FK.S({
  id: 'v_blo_stand', ch: 3, loc: 'house', sub: true, title: 'Overgrown',
  text: [
    'The fungus is in the kitchen now, white over the counters, glowing in the sink. Down in the basement, the heater\'s hum has gone muffled, like a voice with a hand over its mouth. The Bloom is growing over it. Over the crease in the house. Over whatever is folded inside.',
    'The figure in the living room watches you with your own face, slightly wrong. "CHOOSE," it says. "SLOWLY. WE. HAVE. TIME."'
  ],
  choices: [
    { t: 'Burn it out of the house. All of it.', a: 'force', w: 3, req: 'item:flask | item:raygun | item:cloak', fx: ['axis:climax=killed', '+blo_dead', '+house_burned', 'rep:bloom-5', 'take:flask'],
      res: 'There is no way to burn just the fungus. You know that before you start. The fire catches the white fur and runs up the walls and the house goes with it: the stairs, the photos, the couch. The Bloom sings its long falling note as it burns. You stand in the street in your socks, again, watching a home burn behind a window. Dolores comes out in her dressing gown and stands next to you. She doesn\'t say anything.', next: 'c3_after' },
    { t: 'Salt. Bleach. Every chemical under the sink. Kill it without fire.', a: 'science', w: 3, req: 'brains>=3 | skill:tinker', fx: ['axis:climax=killed', '+blo_dead', 'rep:bloom-5'],
      res: 'You mix what\'s under the sink into something you hope will work, and it does: the fungus shrivels where you spray it, browning and curling, and the figure in the living room screams in slow motion. It takes all night, room by room. By dawn the house is brown and wet and smells of bleach and dead forest, and the heater in the basement is humming clear again.', next: 'c3_after' },
    { t: 'Go straight for the heart: it has a core, it must. Cut it out.', a: 'sneak', w: 3, req: 'sneak>=4 | skill:ambush | grafted', fx: ['axis:climax=killed', '+blo_dead', 'rep:bloom-5'],
      res: 'You find it by the hum of it, in the dark under the stairs: a pulsing knot of glowing root the size of a heart. You cut it out with a kitchen knife. Everything in the house dims at once, all the caps, all the fur, and the figure in the living room slumps, softly, into a heap of white on the carpet. The silence afterwards is the Drift\'s silence, the one you heard on your first visit. It is now the silence of something dead.', next: 'c3_after' },
    { t: 'Trap the heart in a jar, like you did with the little one.', a: 'gadget', w: 3, req: 'cap:sporeling | dead:sporeling | sold_spore | skill:rig', fx: ['axis:climax=captured', '+blo_caught', 'rep:bloom-3'],
      res: 'You know what the Bloom is now: a whole made of small parts, and the parts have a centre. You find the centre under the stairs and get it into a jar, and screw the lid on hard. The fungus all over the house stops growing at once, and the figure in the living room stops talking mid-word. Inside the jar, a little glowing face looks out at you. It is very angry. It is very, very patient.', next: 'c3_after' },
    { t: 'Freeze it. Frost stops everything.', a: 'gadget', w: 3, req: 'item:frostcell', fx: ['axis:climax=captured', '+blo_caught', 'take:frostcell', 'rep:bloom-2'],
      res: 'You crack the frost cell in the living room. The white fur goes stiff and sparkling, the caps glaze over, and the figure on the carpet stops, mid-gesture, inside a coat of ice. It\'s not dead. Fungus doesn\'t die from cold. It sleeps. You have the Bloom on ice in your living room now. You don\'t know how long it will sleep for.', next: 'c3_after' },
    { t: 'Apologise. Offer a memory, the way you did in the garden.', a: 'talk', w: 3, req: 'bloom_traded | bloom_talked | mouth>=4', fx: ['axis:climax=talked', '+blo_peace', 'rep:bloom+3', 'maxhp-1'],
      res: 'You kneel on the soft white carpet. "I\'m sorry. Take what you need." It takes something. You don\'t know what. You know you had a memory of something warm and now you don\'t. The figure softens. "ACCEPTED," it says. "WE. WILL. LEAVE. A. LITTLE." The fungus pulls back from the walls like a tide. In the corner of the living room, a single small cap stays, glowing. It will always be there.', next: 'c3_after' },
    { t: 'Talk to it as a friend would. Let the sporeling in your pocket speak.', a: 'talk', w: 3, req: 'spore_friend | spore_garden', fx: ['axis:climax=talked', '+blo_peace', 'rep:bloom+3'],
      res: 'The little sporeling climbs out of your pocket, or out of its planter in the garage, and hops to the figure on the carpet. It glows. The figure glows back. You don\'t hear what passes between them. It\'s slow and green and long. When it\'s done, the Bloom pulls back out of the house like breath going out of a body, and the little sporeling climbs back into your pocket, and stays.', next: 'c3_after' },
    { t: 'Open a portal and lure it into the Reach. Fungus hates ice.', a: 'gadget', w: 3, req: 'gun_ready', fx: ['axis:climax=tricked', '+blo_tricked', 'rep:bloom-3'],
      res: 'You open a portal to Pallid Reach in the middle of the living room, and hold out your hand, with your own memories in it, the way the garden liked. The Bloom leans toward you. Further. Further. Then you step back and it is leaning through the portal into a blizzard, and you close it. The fungus left in the house goes grey and quiet. Somewhere on a frozen road, a piece of a forest is learning about snow.', next: 'c3_after' },
    { t: 'Show it the lantern\'s light: the family, the ones who were here first.', a: 'talk', w: 3, req: 'item:lantern', fx: ['axis:climax=tricked', '+blo_tricked', 'rep:bloom+1'],
      res: 'You hold up the spore lantern and the living room fills with grey ghosts: the family on the couch, posing, the timer, the flash. The Bloom stares. "THIS. HOUSE. IS. KEPT," it says. "ALREADY. KEPT." It has its own rules about keeping. It pulls back, and back, and is gone. You never quite understand why that worked. You suspect the Bloom was looking for a reason to stop.', next: 'c3_after' },
    { t: 'Leave. Let it have the house.', a: 'flee', w: 3, fx: ['axis:climax=fled', '+blo_fled'],
      res: 'You take your bag and walk out through the white. Spores settle on your shoulders like snow. Behind you the house glows softly, a lantern on a dark street, as the Bloom grows into every corner of it.', next: 'c3_after' },
    { t: 'Give it the house. And everything folded inside the house.', a: 'betray', w: 3, fx: ['axis:climax=soldout', '+sold_out_family', 'rep:family-5', 'rep:bloom+2'],
      res: '"Take it," you say. "Take the basement. Take the heater. Take what\'s folded behind the walls. Leave me alone." The Bloom turns its face toward the basement door, slowly, and something in its expression becomes hungry and interested at once. "KEPT," it says. "KEPT. KEPT." It flows down the basement stairs like milk. The heater\'s hum stops being a chord and becomes a single, choking note.', next: 'c3_after' }
  ]
});

/* ============================================================== THE WRONG SMITHS */

FK.S({
  id: 'v_smi_arrive', ch: 3, loc: 'house', sub: true, title: 'Home',
  text: [
    'The family that walks in through the front door is the family in the photo in the hall. Almost.',
    'A Beth, older and harder, with a hunting rifle and a scar along her jaw. A Summer, nineteen or twenty, with a prosthetic arm made out of a fire extinguisher. A Morty, skinny and silent, who looks at the photos on the wall and starts to cry without making a sound. And Jerry, in his polo shirt with the sailboat, beaming.',
    '"See?" says Jerry. "See? I told you. A real house. A Smith house."',
    'Beth looks around the hall like a soldier checking a room. Then she sees you. The rifle comes up. "Jerry," she says, without looking away from you. "Who is this, and why is he in our house?"',
    { if: 'jerry_used', t: 'Jerry looks at you with a sudden, terrible doubt. "You... you did pass on my message, didn\'t you? They said it took a long time to arrive."' }
  ],
  choices: [
    { t: 'Hands up. Calm. Talk.', a: 'neutral', next: 'v_smi_stand' }
  ]
});

FK.S({
  id: 'v_smi_stand', ch: 3, loc: 'house', sub: true, title: 'Our House',
  text: [
    'They stand in the hallway in their shelter clothes with everything they own on their backs. They lost a world. They lost a Rick. They have been living in camps and shelters for a year, and now they are in a house that looks exactly like their house, and you are in it.',
    'Beth keeps the rifle on you. "We\'re not leaving," she says. "I want you to understand that before you say anything. We are not leaving this house."',
    'In the basement, the heater hums a chord that goes strange and complicated, like two families talking at once.'
  ],
  choices: [
    { t: 'Fight them for it.', a: 'force', w: 3, out: [
      { req: 'muscle>=4 | item:raygun | item:stunner', fx: ['axis:climax=killed', '+smi_dead', 'rep:jerry-5'],
        res: 'Beth fires first, and misses, and that is her one chance. It is plain and it is ugly and when it is done there is a family on the hall floor that came a long way to be home. Jerry is the last one standing, saying "no, no, no," and you don\'t stop. Afterwards the house is quieter than it has ever been. The heater, in the basement, has stopped humming altogether for a full minute. Then, slowly, it starts again.' },
      { death: 'beth', next: '@death' }
    ], next: 'c3_after' },
    { t: 'Throw the hallway switch.', a: 'gadget', w: 3, req: 'house_trapped', fx: ['axis:climax=killed', '+smi_dead', 'rep:jerry-5'],
      res: 'You built it for the men in grey. It doesn\'t know the difference. When it\'s done you turn the switch off and sit down on the stairs and stay there until morning.', next: 'c3_after' },
    { t: 'Lock them in the basement until you decide what to do.', a: 'force', w: 3, req: 'muscle>=3 & (skill:takedown | item:stunner | item:zipties)', fx: ['axis:climax=captured', '+smi_caught', 'rep:jerry-3'],
      res: 'Beth is good, but she\'s tired, and you have done this before now. The rifle ends up on the hall table, unloaded. You walk them down into the basement, Jerry protesting the whole way, and bolt the door. They sit there, next to the humming heater, a family of Smiths in the dark beside another family of Smiths they can\'t see.', next: 'c3_after' },
    { t: 'Corner them in the kitchen with the smoke and noise, then take the rifle.', a: 'sneak', w: 3, req: 'house_smoke | skill:ambush', fx: ['axis:climax=captured', '+smi_caught', 'rep:jerry-2'],
      res: 'Smoke, horns, pans falling. In the chaos you come out of the dark and take the rifle out of Beth\'s hands before she knows you\'re there. When the smoke clears they\'re sitting at the kitchen table where you put them, and you\'re holding all the guns. Summer looks at you with grudging professional respect. Jerry looks at you like you kicked a puppy.', next: 'c3_after' },
    { t: '"There\'s room. Stay. All of you. We\'ll work it out."', a: 'talk', w: 3, req: 'mouth>=3 | rep:jerry>=3', fx: ['axis:climax=talked', '+smi_share', 'rep:jerry+3'],
      res: 'Beth doesn\'t lower the rifle for a long time. Then Morty, the silent one, steps between you and her and says the first words he\'s said: "Mom. He kept the photos up." Beth looks at the hall. At the frames, dusted, straight. She lowers the rifle. That night five strangers and you eat canned beans at a kitchen table built for five, and you take the side chair, and nobody sits in the good one.', next: 'c3_after' },
    { t: 'Tell them the truth: this house already has a family in it.', a: 'talk', w: 3, req: 'mystery>=1', fx: ['axis:climax=talked', '+smi_truth', 'rep:jerry+1', 'rep:family+2'],
      res: 'You take them down to the basement. You show them the heater, humming its chord. You tell them about the yogurt and the notes and the voices in the wall. Beth puts her hand on the heater and her whole face changes. "Oh, Dad," she says, not to you. "Oh, you idiot. You did this one too." They don\'t stay. You help them pack. Jerry hugs you at the door. Their Beth looks back at the house once. "Look after them," she says. You don\'t ask which them.', next: 'c3_after' },
    { t: 'Show them the map: there are other empty Smith houses. Better ones.', a: 'gadget', w: 3, req: 'gun_ready & (skill:portal | item:ledger)', fx: ['axis:climax=tricked', '+smi_sent', 'rep:jerry+1'],
      res: 'You bring up the map screen and show them the greyed-out points: hundreds of worlds. "Empty Smith houses," you say. Some of them might even be true. You pick one with a pool and a big yard, dial it in, open a portal. Jerry goes through first, delighted. The rest follow. Beth goes last. "If this is a lie," she says, "I will find my way back." You close the portal. It probably wasn\'t a lie. Probably.', next: 'c3_after' },
    { t: 'Ask the Caretaker to play the old family\'s voices. Scare them off.', a: 'gadget', w: 3, req: 'rep:caretaker>=2 & !caretaker_off & !caretaker_gone', fx: ['axis:climax=tricked', '+smi_scared', 'rep:caretaker+1'],
      res: 'Every speaker in the house starts talking at once: an old man\'s voice, sneering, a woman\'s voice, a boy\'s. "Get out of my house." "Who are these people?" "Dad, there\'s another us in the hall." The Wrong Smiths stand frozen. Then Jerry says, very quietly, "Oh, no. Oh no, they\'re still here." And they leave, fast, before their own dead family can walk out of the walls.', next: 'c3_after' },
    { t: 'Walk them across the street to Dolores. She has a whole empty house.', a: 'talk', w: 3, req: 'rep:dolores>=3 | dolores_ally_final', fx: ['axis:climax=talked', '+smi_dolores', 'rep:dolores+1', 'rep:jerry+2'],
      res: 'Dolores opens her door, looks at a whole family of Smiths who are not the Smiths, and sighs the sigh of a woman whose life has become very strange very late. "Four bedrooms," she says. "My husband\'s dead and my nephew only calls on Sundays. Wipe your feet." The other Beth lowers her rifle for the first time. That night the house across the street has every light on, and you can hear a Jerry laughing.', next: 'c3_after' },
    { t: 'Let them have it. Walk away. They need it more.', a: 'flee', w: 3, fx: ['axis:climax=fled', '+smi_left'],
      res: 'You look at them. A year in shelters. A world gone. You know exactly what that is. You pick up your bag. "It\'s yours," you say. Beth lowers the rifle, slowly, like she doesn\'t believe it. You walk out of the front door and down the path. Behind you, a Jerry starts crying, the good kind.', next: 'c3_after' },
    { t: 'Sell them to the people in grey. A Smith family is worth something to the Reclaimers.', a: 'betray', w: 3, req: 'item:ledger | deal_reclaimers | ninetytwo_spy', fx: ['axis:climax=soldout', '+sold_out_smiths', 'rep:jerry-5', 'rep:reclaimers+2'],
      res: 'You make a call on the frequency you know. You keep them talking at the kitchen table, all warmth, all sympathy, until the WHUMP in the backyard. Grey coveralls through the back door. Beth gets one shot off before they take her down. Jerry looks at you across the table as they lead him out. He doesn\'t say anything at all. That is worse than anything he could have said.', next: 'c3_after' },
    { t: 'Sign the house over to them. Keep the gun, keep moving.', a: 'betray', w: 3, fx: ['axis:climax=soldout', '+signed_over', 'rep:jerry+2', 'rep:family-3'],
      res: 'You find a pen and the quitclaim, or the back of the calendar page, and write: THIS HOUSE BELONGS TO THEM. HOLLIS GRADY. It isn\'t a legal document. Except that it is, here, in this house, under the old man\'s rule. The house claims them. The heater\'s chord changes key. Somewhere, a ledger needle swings away from you, toward a Jerry who has no idea what he has just been handed.', next: 'c3_after' }
  ]
});
FK.death('beth', 'She has been fighting things worse than you for a year in a dead world, and she doesn\'t miss twice. The last thing you see is the boy, the silent one, looking at the photos on the wall.');

/* ============================================================== AFTERMATH */

FK.S({
  id: 'c3_after', ch: 3, loc: 'garage', sub: true, title: 'After',
  text: [
    { if: 'axis:climax=killed', t: 'It is morning. There are people in the yard who will never leave it. You dug until your hands bled. You are sitting in the garage on the stool somebody else used to sit on, and you are not sure who you are any more, and you are a little afraid of the answer.' },
    { if: 'axis:climax=captured', t: 'It is morning. Your prisoners are where you put them, quiet now, waiting to see what kind of person you are. So are you.' },
    { if: 'axis:climax=talked', t: 'It is morning. They are gone, and nobody had to die, and you talked your way through the worst night of your life with nothing but your voice. Your hands are still shaking. They are allowed.' },
    { if: 'axis:climax=tricked', t: 'It is morning. They are gone, outsmarted, and you sit in the garage and laugh until it turns into something else, and then back into laughing.' },
    { if: 'axis:climax=fled', t: 'It is the next morning. You walk back up the drive with your bag on your shoulder. The front door is open. The house has been gone through, but it is still standing, and the garage, when you get there, is still yours. They didn\'t know what half of it was.' },
    { if: 'axis:climax=soldout', t: 'It is morning. You got what you wanted. You are sitting in the garage. You don\'t look at the basement door.' },
    { if: 'house_burned', t: 'The house is a black shell. The garage, with its steel door and its strange inside, survived. It always would have.' },
    'The map screen hums. The jars on the shelves watch you.',
    { if: '!gun_gone', t: 'And the portal gun hangs on its hook, glowing, waiting for you to decide what it is now.' },
    { if: 'gun_gone', t: 'The hook where the portal gun hung is empty.' }
  ],
  choices: [
    { t: 'Keep the gun. It\'s yours. You found it.', a: 'neutral', req: '!gun_gone', fx: ['axis:gun=kept'], next: 'c3_house' },
    { t: 'Sell the gun to the highest bidder.', a: 'betray', req: '!gun_gone & (brass_contact | met_noodle | seen:f_market)', fx: ['axis:gun=sold', 'take:portalgun'],
      res: 'One portal to Cinderfall, one auction in a back room under a bell, one very heavy bag of chits. Whoever bought it paid in a currency that will keep you for years. You don\'t ask what they want it for. Somebody will find out.', next: 'c3_house' },
    { t: 'Destroy it. Nobody should have this.', a: 'force', req: '!gun_gone', fx: ['axis:gun=destroyed', 'take:portalgun'],
      res: 'You take it out into the yard, put it on the concrete and hit it with the crowbar until the glass bulb cracks and the green fluid runs out and goes grey on the ground. It takes longer than you\'d think. It makes a sound like a sigh when it finally goes. Every door in every world is a little bit further away now.', next: 'c3_house' },
    { t: 'Give it away to someone who needs it more.', a: 'talk', req: '!gun_gone', fx: ['axis:gun=given', 'take:portalgun'],
      res: [
        { if: 'ninetytwo_recruit', t: 'You give it to Ninety-Two. He holds it like it might bite. "Me?" he says. "Go somewhere," you tell him. "Anywhere. Somewhere nobody hunts anybody." He looks at you a long time. Then he clips it to his belt, where his empty holster was.' },
        { if: '!ninetytwo_recruit & (rep:dolores>=3 | dolores_ally_final)', t: 'You give it to Dolores Pike, wrapped in a tea towel. She unwraps it at her kitchen table and looks at it over her glasses. "I am seventy-four," she says. "I have always wanted to see Paris. The real one, and some of the others." She puts it in her handbag next to her reading glasses.' },
        { if: '!ninetytwo_recruit & !(rep:dolores>=3 | dolores_ally_final) & (smi_share | smi_truth)', t: 'You give it to the other Beth. She checks it like a rifle, competently. "Dad had one," she says. "Ours." She doesn\'t say thank you. She doesn\'t need to.' },
        { if: '!ninetytwo_recruit & !(rep:dolores>=3 | dolores_ally_final) & !(smi_share | smi_truth) & met_noodle', t: 'You give it to the Rick who runs the noodle bar in Cinderfall. He turns it over in his burned hands. "You know what you\'re doing, giving one of these to one of us?" "You said you were retired," you say. He laughs until he coughs. "Yeah," he says. "Yeah. I did."' },
        { if: '!ninetytwo_recruit & !(rep:dolores>=3 | dolores_ally_final) & !(smi_share | smi_truth) & !met_noodle', t: 'You give it to nobody in particular: you leave it in a box marked FREE on the end of the drive, with the old lamp and a toaster. By lunchtime it\'s gone. Some kid, some neighbour, somebody\'s about to have a very strange summer.' },
        'It feels like putting down something very heavy you didn\'t know you were carrying.'
      ], next: 'c3_house' },
    { t: 'Give it back. Leave it at the heater, for the family behind the walls.', a: 'talk', req: '!gun_gone & mystery>=2 & !house_burned', fx: ['axis:gun=returned', 'take:portalgun', 'rep:family+3'],
      res: 'You carry it down the basement stairs and set it on top of the humming heater, the way you\'d leave a key under a mat. "It\'s yours," you say to the hum. "I\'m not him." You go back upstairs. When you check an hour later, it\'s gone.', next: 'c3_house' },
    { t: 'The gun is gone. Let it go.', a: 'neutral', req: 'gun_gone', next: 'c3_house' }
  ]
});

FK.S({
  id: 'c3_house', ch: 3, loc: 'garage', sub: true, title: 'The House',
  text: [
    'Last thing. The house.',
    { if: '!house_burned', t: 'It stands around you, two storeys of somebody else\'s life that has somehow become partly yours: the couch you sleep on, the photos you dusted, the fridge that fills itself. Down in the basement, the heater hums its chord.' },
    { if: 'house_burned', t: 'What\'s left of it smokes in the morning light. Down where the basement was, under the ash, something is still humming, very faintly. Or isn\'t. You can\'t tell any more.' },
    { if: 'mystery>=2 & !house_burned', t: 'You know what the hum is now. You know who is on the other side of it. You know you could open it.' }
  ],
  choices: [
    { t: 'Stay. Hold the house. It\'s home now.', a: 'neutral', req: '!house_burned', fx: ['axis:house=held'], next: 'c3_prisoners' },
    { t: 'Burn it down. End it.', a: 'force', req: '!house_burned & !axis:gun=returned', fx: ['axis:house=burned'], next: 'c3_prisoners' },
    { t: 'Walk away from the ashes.', a: 'flee', req: 'house_burned', fx: ['axis:house=burned'], next: 'c3_prisoners' },
    { t: 'Walk away. Leave it for whoever finds it next.', a: 'flee', req: '!house_burned', fx: ['axis:house=abandoned'], next: 'c3_prisoners' },
    { t: 'Go down to the basement and open the fold.', a: 'science', req: '!house_burned & mystery>=2 & (heater_understood | item:hinge)', fx: ['axis:house=opened'], next: 'c3_prisoners' }
  ]
});

FK.S({
  id: 'c3_prisoners', ch: 3, loc: 'garage', sub: true, title: 'The Ones You Kept',
  text: [
    { if: 'captives>=1 | axis:climax=captured', t: 'One more thing before you can call any of this over. The people you are holding.' },
    { if: 'axis:climax=captured', t: 'Last night\'s visitors sit where you left them, tied, tired, watching you.' },
    { if: 'cap:ninetytwo', t: 'Ninety-Two, behind the chain-link.' },
    { if: 'cap:vell', t: 'Assessor Vell, folded neatly on its bucket.' },
    { if: 'cap:knuckle', t: 'Knuckle, chained to the tow hook.' },
    { if: 'cap:sporeling', t: 'The sporeling, glowing in its jar.' },
    { if: 'cap:foreman', t: 'The Foreman, reading yesterday\'s newspaper.' },
    { if: 'cap:dolores', t: 'Dolores Pike, upstairs, who has not spoken to you in days.' },
    { if: 'cap:brass', t: 'Brass, frozen dull orange in your hallway, still negotiating.' },
    { if: 'captives==0 & !axis:climax=captured', t: 'Nobody. You kept no one. You stand in the garage with your hands empty and you are, you find, glad.' }
  ],
  choices: [
    { t: 'Let them all go.', a: 'neutral', req: 'captives>=1 | axis:climax=captured', fx: ['axis:prisoners=freed'],
      res: 'You cut every tie and open every door. Some of them run. Some walk. One or two stop at the door and look back at you, trying to work out what kind of man does that. You aren\'t sure yourself.', next: '@ending' },
    { t: 'Keep them. They\'re safer behind your fence than out there.', a: 'force', req: 'captives>=1 | axis:climax=captured', fx: ['axis:prisoners=kept'],
      res: 'You tell yourself it\'s for their own good. You build a better cell. You buy a bigger pot for the stew. You become, by degrees, a jailer, and then a warden, and then something with no good name.', next: '@ending' },
    { t: 'Offer every one of them a place here, if they want it.', a: 'talk', req: '(captives>=1 | axis:climax=captured) & (mouth>=3 | skill:command)', fx: ['axis:prisoners=recruited'],
      res: 'You cut them loose and offer them coffee and a choice. Most leave. A few stay. By the end of the month you are running something in this garage that isn\'t a family and isn\'t a gang and isn\'t an army, and is a bit of all three.', next: '@ending' },
    { t: 'Sell them to whoever pays best.', a: 'betray', req: '(captives>=1 | axis:climax=captured) & (brass_contact | rep:tollkeepers>=1 | item:ledger)', fx: ['axis:prisoners=sold', 'chits+5'],
      res: 'A portal, a buyer, a bag of chits. They go in a line. Nobody says anything to you, and that is how you know you have become someone people don\'t bother saying anything to.', next: '@ending' },
    { t: 'End it. No loose ends.', a: 'force', req: 'captives>=1 | axis:climax=captured', fx: ['axis:prisoners=executed'],
      res: 'You do it in the yard, one at a time, with the door shut so the others can\'t see. It takes most of the morning. The yard has a lot of new earth in it now. You don\'t plant anything over it.', next: '@ending' },
    { t: 'Close up the garage and go and see what\'s left of your life.', a: 'neutral', req: 'captives==0 & !axis:climax=captured', next: '@ending' }
  ]
});
