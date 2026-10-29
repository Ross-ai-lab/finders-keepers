/* Chapter 2 — Pallid Reach (snow). Toll gate, grey camp, relay mast, frozen convoy. */

FK.S({
  id: 'r_arrive', ch: 2, loc: 'reach', forced: true, prio: 5, title: 'Pallid Reach',
  text: [
    'The cold hits you like a door. Snow, sideways, never landing. The ground is blue ice over something dark. The sky is the colour of an old filling, and low, and close.',
    'A kilometre off, a gate of glass stands across a crossroads where six roads of packed ice meet, and above each road hangs a portal, steady, glowing, with traffic going in and out: sledges, walkers, things on too many legs. Booths along the gate glow amber. Insect clerks in long coats move between them with clipboards.',
    'To one side of the gate, half buried in drifts, a camp of grey tents. A tall mast stands in the middle of it, and the mast hums. You feel the hum in your fillings, the same way you feel the heater in the basement at home.',
    'Your portal closes behind you with a pop. You are a man in a fleece in a blizzard on another world.'
  ],
  choices: [
    { t: 'Walk straight for the gate. Look like you belong.', a: 'talk', fx: ['+reach_bold'], res: 'Shoulders back, eyes forward, like you\'re late for a shift. Nobody stops a man who looks bored. Your face goes numb. You walk anyway.', next: 'hub' },
    { t: 'Climb the ridge and watch the place for an hour first.', a: 'sneak', fx: ['+reach_scouted', 'hp-1'],
      res: 'An hour in the snow costs you feeling in two toes. In exchange you learn: the clerks change shift at the bell, the grey camp has six sentries and only four are awake, and one sentry is a boy with a scar through his eyebrow who keeps looking at the sky like he wants to be somewhere else.', next: 'hub' },
    { t: 'Go back home. This was a mistake.', a: 'flee', res: 'You stand in the snow for thirty seconds, then fire the gun at the ground and step through. Home is warm. Your hands are shaking. You can come back when you are ready.', next: '@loc:garage' }
  ]
});

FK.S({
  id: 'r_gate', ch: 2, loc: 'reach', title: 'The Toll Gate', teaser: 'Every traveller pays. Every one.',
  text: [
    'The booth is warm and smells of paper and wax. Behind the glass sits a Tollkeeper: six thin limbs in a long coat, a head like a praying mantis wearing reading glasses, a nameplate: ASSESSOR VELL.',
    '"Traveller," says Vell, without looking up. "All parties crossing the Reach pay the toll. The toll is one unit of declared value. Declare your value." It slides a form under the glass. "Please print clearly. Last week a traveller declared \'my whole heart\' and we had a very difficult time with the paperwork."',
    { if: 'reach_scouted', t: 'From the ridge you saw that the gate\'s east end has a gap where the glass meets the ice, behind the third booth. Wide enough for a man lying flat.' }
  ],
  choices: [
    { t: 'Pay with Rick\'s flask. It\'s probably worth something here.', a: 'neutral', req: 'item:flask', fx: ['take:flask', '+gate_passed', 'rep:vell+1', 'rep:tollkeepers+1', 'give:tollcoin'],
      res: 'Vell unscrews the cap, and every one of its eyes dilates at once. "Oh," it says. "Oh, my. Declared value: considerable." It stamps your form four times and slides a glass transit seal under the window. "Welcome to the Reach. Please do not tell anyone what you paid. They will want to rob you."', next: 'hub' },
    { t: 'Pay in scrap. Two loads of good salvage.', a: 'neutral', req: 'scrap>=2', fx: ['scrap-2', '+gate_passed', 'rep:tollkeepers+1'],
      res: 'Vell weighs your scrap on a brass scale with the seriousness of a jeweller. "Acceptable," it says. "Barely. Proceed." Stamp, stamp. You are through.', next: 'hub' },
    { t: 'Flash the old badge. "Interdimensional inspector."', a: 'talk', req: 'item:badge & mouth>=3 | skill:liar', fx: ['+gate_passed', 'rep:vell-1', '+vell_fooled'],
      res: '"Inspector," says Vell, peering at the badge. "Of what?" "Of tolls," you say, and sigh like a man who has inspected a thousand toll booths and found them all wanting. Vell straightens its coat. "Of course. Of course, inspector. Everything is in order." It waves you through with three of its hands. It will realise in about an hour, and it will remember you.', next: 'hub' },
    { t: 'Slip through the gap at the east end of the gate.', a: 'sneak', req: 'sneak>=3 | reach_scouted | skill:ghoststep', fx: ['+gate_passed', '+gate_sneaked'],
      res: 'You wait for the bell, for the shift change, for the clerks to turn to their ledgers. Then you are on your belly in the snow, wriggling through the gap like a kid under a fence. Nobody sees. You stand up on the far side covered in frost and grinning.', next: 'hub' },
    { t: 'Make conversation. Clerks are lonely.', a: 'talk', req: 'mouth>=2', fx: ['+gate_passed', 'rep:vell+2', '+vell_friend'],
      res: 'You ask Vell how long its shifts are. Nineteen hours. You ask whether anybody ever says thank you. Vell is silent for so long you think you\'ve broken it. "...Nobody," it says. "In two hundred years." You talk for an hour: about forms, about trucks, about the time you got fined at a weigh station for a load that turned out to be bees. When you go, Vell stamps your form FRIEND OF THE BOOTH, which is not a real stamp. It made it while you talked.', next: 'hub' },
    { t: 'Tell Vell the grey camp is planning to skip its tolls.', a: 'betray', fx: ['+gate_passed', 'rep:vell+2', 'rep:tollkeepers+2', 'rep:reclaimers-2', '+informed_camp'],
      res: 'Vell\'s mandibles click together. "Skip," it says, as if you\'d said "eat babies". You tell it what you\'ve guessed and invent the rest. It stamps your form, waves you through, and picks up a brass speaking tube. By the time you\'re past the gate, clerks are walking toward the grey camp with clipboards, and the people in grey are not happy to see them.', next: 'hub' },
    { t: 'Smash the glass and take Vell hostage.', a: 'force', req: 'muscle>=3 | item:crowbar | item:raygun', fx: ['+gate_passed', 'cap:vell', 'rep:tollkeepers-3', 'heat+1'],
      res: 'The glass is thinner than it looks. Vell squeaks once. You haul it out of the booth by its coat with an arm around its thin neck and walk backward through the gate while clerks shout and blow brass whistles. Nobody follows: Tollkeepers don\'t chase, they invoice. You portal home with your prisoner. Somewhere a very long bill is being written.', next: '@loc:garage' },
    { t: 'Kill the clerk and walk through.', a: 'force', req: 'item:raygun | item:stunner | muscle>=4', fx: ['+gate_passed', 'kill:vell', 'rep:tollkeepers-4', 'heat+1'],
      res: 'You do it through the glass. Vell drops behind the counter with its pen still in its hand. The other clerks stop. All of them. They don\'t run, don\'t shout. They just turn, every one, and look at you, and start writing. You walk through the gate in a silence so complete you can hear the snow.', next: 'hub' }
  ]
});

FK.S({
  id: 'r_camp', ch: 2, loc: 'reach', title: 'The Grey Camp', teaser: 'Tents, a mast, and people who know your name.',
  req: 'gate_passed',
  text: [
    'Thirty tents in the snow, grey canvas patched with every colour. Cooking fires. Laundry frozen stiff on lines. Mortys: dozens of them, different ages, different scars, all in grey coveralls with numbers stencilled on the chest. Smiths too: tired Beths with rifles, a Summer with a shaved head sharpening a machete, a Jerry peeling potatoes alone at the edge of everything.',
    'The mast stands in the middle, humming, ringed with cables. Next to it, the biggest tent, with a sign in neat capitals: FOREMAN. KNOCK.',
    'On a board by the mess fire, pinned with knives: drawings of Ricks. Dozens. Most crossed out. One isn\'t. It\'s a sketch of a house. Your house. Under it, in fresh ink: "OWNER LOCATED. COLLECTION PENDING."',
    { if: 'knows_camp', t: 'You know where everything is: the sentries, the guard rotation, the cable runs, the Foreman\'s tent.' }
  ],
  choices: [
    { t: 'Watch from the drifts. Learn what they\'re planning.', a: 'sneak', fx: ['+clue_ledger', '+camp_watched', 'note:The grey camp has a drawing of my house. "OWNER LOCATED. COLLECTION PENDING."'],
      res: 'You lie in the snow until you can\'t feel your face. You learn the shape of it: they track Ricks through the mast. When a Rick gives up ownership, the trail goes cold, unless someone else picks up the claim. Someone has. A Beth at the fire says, "The new owner\'s not even a Rick." The Morty beside her: "Foreman says doesn\'t matter. Squeeze the new owner hard enough, the old one comes running. Ricks always come back for their stuff."', next: 'hub' },
    { t: 'Walk in under a white rag and ask for a parley.', a: 'talk', fx: ['+camp_parley', 'rep:reclaimers+1'],
      res: 'Fifty guns turn toward you when you walk in. A Summer with a shaved head stops you with a rifle barrel against your chest. "I want to talk to whoever\'s in charge," you say. "About my house." Murmurs. Somebody laughs. Somebody goes to knock on the big tent. You wait in the snow with a rifle on you and fifty pairs of eyes.', next: 'r_foreman' },
    { t: 'Walk in wearing grey coveralls like you belong.', a: 'sneak', req: 'dead:ninetytwo | cap:ninetytwo | ninetytwo_recruit | ninetytwo_spy | skill:liar', fx: ['+camp_infiltrated', 'heat+1'],
      res: 'Ninety-Two\'s spare coveralls are tight across the shoulders. Nobody looks twice: half of them are wearing coveralls that don\'t fit. You eat at the mess fire, nod at the right times, laugh at a joke about a Rick who tried to hide in a pickle. Then someone stands and calls out: "Foreman wants to see the new ones." You stand with the new ones.', next: 'r_foreman' },
    { t: 'Raid the supply tent while the camp sleeps.', a: 'force', req: 'muscle>=3 | item:raygun | item:stunner | knows_camp', fx: ['scrap+3', 'give:frostcell', 'rep:reclaimers-2', '+camp_raided'],
      res: 'You go in at the bell, when the sentries change. Crates of salvage, all of it stolen: Rick tech, mostly, with Rick names scratched off. You take what you can carry and a frost cell from a rack of them. On the way out a Morty, eight or nine, sees you, opens his mouth to shout, and doesn\'t. He just watches you go.', next: 'hub' },
    { t: 'Leave the camp alone. You\'ve seen enough.', a: 'flee', fx: ['+camp_seen'],
      res: 'You back away into the snow. The drawing of your house stays pinned to the board. COLLECTION PENDING. You know what that means now: they\'re coming, and they don\'t care whose house it is.', next: 'hub' }
  ]
});

FK.S({
  id: 'r_foreman', ch: 2, loc: 'reach', sub: true, title: 'The Foreman',
  text: [
    'The tent is warm and smells of oil and coffee. Maps on every wall. A ledger the size of a door, open on a trestle, its pages full of names and crossings-out.',
    'The Foreman is a man of forty-five or fifty with a Morty\'s face that has been left out in the weather. Grey beard, grey coat, a scar where an ear should be. He doesn\'t stand up. He looks at you the way a buyer looks at a used car.',
    '"You\'re the new owner," he says. "The squatter." He doesn\'t ask how you got in. "Here\'s how it works. Ricks broke our worlds and walked away. We collect. Your Rick gave everything away so we couldn\'t find him. It went to you. So now you\'re what we can find." He drinks his coffee. "Nothing personal. I\'ve got two hundred people to feed. Give us the house and the gun, and you walk. Or don\'t, and we collect anyway."'
  ],
  choices: [
    { t: '"Deal. I\'ll hand you the old man\'s stuff when you come."', a: 'betray', fx: ['+deal_reclaimers', 'rep:reclaimers+3', 'rep:foreman+2', 'rep:family-2', 'sp+1'],
      res: 'He nods, unsurprised. People always take the deal. "We\'ll come when the ledger says. Leave the door open. Don\'t be there, and you get to keep breathing." He holds out a hand. His grip is like a vice made of old rope. Outside, the camp goes back to its fires. You feel the deal settle on you like snow.', next: 'hub' },
    { t: '"It\'s not his house any more. It\'s mine. Come and take it."', a: 'force', fx: ['rep:foreman-2', 'rep:reclaimers-2', '+defied_foreman', 'sp+1'],
      res: 'The Foreman looks at you for a long time. Then he smiles, not kindly. "There it is," he says. "There\'s the owner. You\'re already turning into him." He waves a hand. Two Beths walk you to the edge of camp and leave you in the snow. Behind you, someone takes down the drawing of your house and pins up a new one: your face.', next: 'hub' },
    { t: '"I\'m bait. He set me up. Help me find him and you get the real thing."', a: 'talk', req: 'knows_decoy | mystery>=1 | clue_paper', fx: ['+foreman_partner', 'rep:foreman+2', 'rep:reclaimers+1', 'rep:family-3', 'sp+1'],
      res: 'For the first time, the Foreman looks interested. "Bait," he says. "Huh. That\'s cold, even for one of them." He leans forward. "You find out where he went, and you tell me, and you walk away clean with the house. That\'s a better deal than I give most people." He means it. That should frighten you more than it does.', next: 'hub' },
    { t: 'Join them. You\'ve had nowhere for three years. They have a fire.', a: 'betray', req: 'rep:reclaimers>=1 | camp_infiltrated | knows_decoy', fx: ['axis:exit=reclaimer'],
      res: '"Join," the Foreman repeats. He has never been asked that by a target. He laughs. Then he looks at you properly, at the boots and the scars and the hands, and stops laughing. "You know what? Fine. Everyone here was somebody\'s bait once." He gives you a number.', next: '@ending' },
    { t: 'Lie: tell him the old man is dead and you watched it happen.', a: 'talk', req: 'mouth>=4 | skill:liar', fx: ['+foreman_fooled', 'rep:foreman+1', '+clue_ledger', 'sp+1'],
      res: 'You tell it well: a lab accident, a flash, a smell. You buried what was left under the dog house. The Foreman checks the great ledger. "Signature relinquished," he reads, slowly. "Not deceased." He looks at you. "But a dead Rick would relinquish too, wouldn\'t he." He closes the book. "We\'ll see. If you\'re lying, we\'ll come for you instead. If you\'re not, we\'ll come for the house anyway. It\'s still Rick stuff."', next: 'hub' },
    { t: 'Go for him across the table.', a: 'force', out: [
      { req: 'muscle>=4 | skill:ambush | item:raygun', fx: ['cap:foreman', 'rep:reclaimers-4', 'heat+2', 'sp+1'], res: 'You go over the trestle and the great ledger goes flying and you have him by the coat with your weapon at his neck before the guards are through the flap. "Back," you tell them. They back. You walk him out to the snow and fire the gun at the ice, and step through with him. You now have the leader of the Reclaimers in your garage. That is going to have consequences you can\'t count yet.', next: '@loc:garage' },
      { death: 'foreman', next: '@death' }
    ] }
  ]
});
FK.death('foreman', 'You go for him and he was expecting it; everyone who walks into that tent eventually goes for him. A Beth behind you uses the butt of her rifle. The Foreman finishes his coffee while you bleed on his map of your street.');

FK.S({
  id: 'g_cap_foreman', ch: 2, loc: 'garage', title: 'Your Prisoner: The Foreman', teaser: 'The leader of the grey camp, in your garage.',
  req: 'cap:foreman',
  text: [
    'The Foreman sits chained to the bench with his coat off, a big tired man in a vest, watching you work. He has the patience of somebody who has been a prisoner before and stopped being one.',
    '"Two hundred people," he says. "They\'ll come for me. Not because I\'m a good man. Because without me they don\'t know where to go next."'
  ],
  choices: [
    { t: 'Make a deal: he calls off the collection, you let him go.', a: 'talk', req: 'mouth>=3 | skill:command', fx: ['free:foreman', '+foreman_truce', 'rep:foreman+2', 'rep:reclaimers+2'],
      res: 'He takes a long time over it. "The ledger still points here," he says finally. "But I can decide not to look at it for a while." He shakes your hand without being asked. You portal him home. You believe him about forty percent, which is more than you believe most people.', next: 'hub' },
    { t: 'Ransom him to the Tollkeepers. They\'d love to bill him.', a: 'betray', req: 'rep:tollkeepers>=1', fx: ['free:foreman', '+foreman_sold', 'rep:tollkeepers+2', 'rep:reclaimers-3', 'scrap+3'],
      res: 'Vell\'s colleagues arrive through your portal with forms and a cage. The Foreman goes in it without a word. They pay in salvage, well. The grey camp will be leaderless and furious and looking for whoever did this.', next: 'hub' },
    { t: 'Kill him. Cut off the head.', a: 'force', fx: ['kill:foreman', 'rep:reclaimers-4'],
      res: 'He doesn\'t beg. He just says, "Someone else will pick up the book," and closes his eyes. When it\'s over you sit for a long time. The garage is very quiet. Somewhere in a frozen camp, two hundred people are about to learn they have nothing to lose.', next: 'hub' }
  ]
});

FK.S({
  id: 'r_relay', ch: 2, loc: 'reach', title: 'The Relay Mast', teaser: 'How they see.',
  req: 'seen:r_camp',
  text: [
    'Up close the mast is a tower of scaffold and scavenged dishes, guyed with cable, humming one deep note. At its base, a terminal under a tarp, showing a map: worlds as points, and at each point, a little list of names. OWNER: SANCHEZ, R. — crossed out. OWNER: GRADY, H. — underlined twice.',
    'Two sentries share a thermos fifty metres off, backs to the wind.'
  ],
  choices: [
    { t: 'Read the terminal. Everything it says about you.', a: 'science', fx: ['+clue_ledger', '+relay_read', 'note:The relay shows every claim it tracks. My name is on my house now. "Signature transferred by abandonment. Read in place of: SANCHEZ, R."'],
      res: 'It\'s a ledger of everything every Rick has ever owned, worlds deep. You scroll to your address. CLAIM: TRANSFERRED BY ABANDONMENT. HOLDER: GRADY, H. READ IN PLACE OF: SANCHEZ, R. STATUS: COLLECTION PENDING. Under it, a note: "If old holder is hiding near property, pressure on new holder will flush him." You read it until a sentry turns, then go.', next: 'hub' },
    { t: 'Smash the relay. Blind them.', a: 'force', req: 'muscle>=3 | item:crowbar | item:grenade | item:raygun', fx: ['+relay_down', 'rep:reclaimers-3', 'heat+1', 'take:grenade'],
      res: 'You go at the terminal and then the base of the mast, and when the cables start whipping loose you run. The mast comes down across three tents with a sound like a building sighing. Every Reclaimer in the camp is shouting. Somewhere, their whole map of owners has just gone dark. Including you.', next: 'hub' },
    { t: 'Rewire it to point at Cinderfall instead.', a: 'gadget', req: 'skill:rig | brains>=4 | item:decoy', fx: ['+relay_redirect', 'rep:reclaimers-1', 'rep:syndicate-1', 'sp+1'],
      res: 'You don\'t break it. You lie to it. A few cables, a resistor, your decoy box or just a careful hand, and the ledger\'s entry for your house slides sideways to a point labelled CINDERFALL — SLAG ROW. The Reclaimers will go knocking on the Syndicate\'s door. That will be loud. It will not be you.', next: 'hub' },
    { t: 'Steal the handheld unit from the terminal.', a: 'sneak', req: '!item:ledger', fx: ['give:ledger', '+clue_ledger'],
      res: 'There\'s a grey compass clipped to the terminal for field calibration. You unclip it and put it in your pocket. Its needle swings round and points at you. Of course it does.', next: 'hub' }
  ]
});

FK.S({
  id: 'r_convoy', ch: 2, loc: 'reach', title: 'The Frozen Convoy', teaser: 'A crashed caravan in the snow.',
  text: [
    'Off the main road, half-buried: a line of Tollkeeper sledges that went into a crevasse. The lead sledge is on its side. Cargo spilled across the ice: crates, power cells frosted white, bundles of paper. Two Tollkeepers are trapped under the second sledge, alive, very cold, still filling in an accident report by feel.',
    '"Assistance," says one, faintly. "Assistance would be. Appreciated. In triplicate."'
  ],
  choices: [
    { t: 'Dig them out. Get them warm.', a: 'force', fx: ['rep:tollkeepers+3', 'rep:vell+1', 'hp-1', '+saved_convoy', 'give:tollcoin', 'sp+1'],
      res: 'It takes an hour to lever the sledge up with a beam and your back. You wrap them in a tarp and build a fire from crate slats. They watch you with all their eyes. "Unrequired assistance," one says. "Unbilled. This does not happen." They give you a transit seal and write your name on something official. You will be welcome in the Reach for a long time.', next: 'hub' },
    { t: 'Loot the cargo while they\'re stuck.', a: 'betray', fx: ['scrap+3', 'give:frostcell', 'rep:tollkeepers-2', '+looted_convoy'],
      res: 'You walk past them to the crates. "That is inventory," says one, and keeps saying it. You take the frost cells and the best salvage. You leave them there. Somebody will find them. You hope. On the way back you hear them, faintly, adding your description to the report.', next: 'hub' },
    { t: 'Rescue them and quietly pocket a cell while you\'re at it.', a: 'sneak', req: 'sneak>=3', fx: ['rep:tollkeepers+2', 'give:frostcell', 'scrap+1', '+saved_convoy'],
      res: 'You dig them out, warm them up, and while they\'re thanking you in triplicate, a frost cell finds its way into your coat. Everyone wins. Nobody needs to know. That is your favourite kind of winning.', next: 'hub' },
    { t: 'Rig the sledge to lift itself with a power cell.', a: 'gadget', req: 'brains>=3 | skill:rig', fx: ['rep:tollkeepers+2', '+saved_convoy', 'scrap+1'],
      res: 'A frost cell, a cable, the sledge\'s own runners as a lever. The cold cell drives a hydraulic you improvise from a brake line, and the sledge lifts by itself while you stand there with your hands in your pockets. The clerks are very impressed. They pay you a consultancy fee, in scrap.', next: 'hub' }
  ]
});

FK.S({
  id: 'r_ice', ch: 2, loc: 'reach', title: 'The Man in the Ice', teaser: 'Someone is frozen under the road.',
  req: 'seen:r_camp | reach_scouted',
  text: [
    'Under the clear ice at the side of the road, a metre down, a man is frozen standing up.',
    'He is old. White hair spiked up. A lab coat. One hand raised as if to fire something he no longer has. His eyes are open. His face is the face from the photo in the hall, almost: the same nose, the same sneer, a different scar.',
    'Somebody has scratched a number into the ice above him: 61. And beside it, a tally of marks. Dozens. The Reclaimers come here to count.',
    'Frozen in his other hand, a battered portal gun of his own.'
  ],
  choices: [
    { t: 'Cut him out and take his gun.', a: 'force', req: 'muscle>=3 | item:raygun | item:frostcell', fx: ['scrap+2', '+second_gun', 'rep:reclaimers-1'],
      res: 'It takes hours with whatever you have. When you get the gun out, his hand comes with it, and you have to deal with that. The gun is dead, the fluid frozen solid, but the parts are worth a lot. You don\'t look at his face while you work.', next: 'hub' },
    { t: 'Stand there and understand what this means.', a: 'science', fx: ['+saw_dead_rick', '+clue_ledger', 'note:A dead man in the ice, an old man like the one in the photo. Numbered. The people in grey hunt men like him. They count them.'],
      res: 'Another one of him. Another version of the old man in the photo, from another world, hunted down and frozen under a road, where his hunters come to make a mark in the ice. Somewhere, a family like the one in the hall lost him. Or was glad to. You think about the noises at night. You think about the oiled hinges. You begin to understand why someone would want to disappear completely.', next: 'hub' },
    { t: 'Scratch out the tally marks.', a: 'talk', fx: ['rep:reclaimers-1', 'rep:family+1', '+scratched_tally'],
      res: 'You don\'t know why you do it. You scrape the marks off with the edge of a toll seal until there\'s nothing left but a smear. Behind you, from the camp, someone sees and shouts. You go. They\'ll scratch the marks back. But for a few hours, he\'s just a man in the ice.', next: 'hub' }
  ]
});

FK.S({
  id: 'r_ninetytwo', ch: 2, loc: 'reach', title: 'Ninety-Two at the Fence', teaser: 'The boy in grey, on sentry duty.',
  req: 'seen:r_camp & met_scout & !cap:ninetytwo & !dead:ninetytwo & !ninetytwo_recruit & !ninetytwo_ran',
  text: [
    'He\'s on the camp\'s outer fence, alone, stamping his feet. He sees you and his hand goes to his holster and then stops.',
    '"You shouldn\'t be here," he says. "You really, really shouldn\'t be here."',
    { if: 'scout_robbed', t: '"You took my pistol," he adds. "Do you know what I had to do to get another one?"' },
    { if: 'ninetytwo_spy', t: '"I\'ve got your report," he says, lower. "They\'re moving soon. Days, not weeks."' }
  ],
  choices: [
    { t: '"Come with me. Now. Leave all this."', a: 'talk', req: 'rep:ninetytwo>=1 | mouth>=3', fx: ['+ninetytwo_recruit', 'rep:ninetytwo+2', 'rep:reclaimers-2', 'sp+1'],
      res: 'He looks back at the camp. The fires. The board with all the crossed-out faces. Then he takes off his numbered helmet, drops it in the snow, and takes your hand, and you fire the gun at the ice and step through together.', next: '@loc:garage' },
    { t: 'Knock him out and take him with you.', a: 'force', req: 'muscle>=3 | item:stunner | skill:takedown', fx: ['cap:ninetytwo', 'rep:ninetytwo-3', 'rep:reclaimers-2'],
      res: 'He sees it coming and doesn\'t move. Maybe he wanted out any way he could get it. You carry him through the portal over your shoulder like a sack of laundry.', next: '@loc:garage' },
    { t: 'Ask him what the Foreman is planning.', a: 'talk', fx: ['+knows_camp', '+clue_ledger', 'rep:ninetytwo+1'],
      res: '"He wants the old man," says Ninety-Two. "But the old man\'s gone. So he\'ll take you, and the house, and squeeze. He thinks the old man is close. He thinks Ricks can\'t stay away from their stuff." He looks at you. "I think he\'s right. I think he\'s closer than any of us know."', next: 'hub' },
    { t: 'Leave him. Pretend you didn\'t see him.', a: 'sneak', res: 'You keep walking. So does he. Neither of you looks back. That\'s a kind of mercy, in a place like this.', next: 'hub' }
  ]
});

FK.S({
  id: 'r_vell', ch: 2, loc: 'reach', title: 'Vell\'s Offer', teaser: 'The clerk has a proposal.',
  req: 'rep:vell>=2 & !dead:vell & !cap:vell & seen:r_camp',
  text: [
    'Vell finds you at the gate. It has brought tea, in a flask, which it pours into two tiny cups with great ceremony.',
    '"I have been reviewing your file," it says. "You are honest in a way that is unusual for a portal-traveller, and bad at paperwork in a way that is charming. There is a position. Junior assessor. East booth. Nineteen-hour shifts, which you will find restful. Quarters. A coat. And nobody, ever, can collect a debt from a Tollkeeper. We are the ones who collect."',
    'It slides a form under your cup. "Think about it. The Reach is very quiet. Nobody walks in on you here."'
  ],
  choices: [
    { t: 'Sign it. Quiet sounds like heaven.', a: 'flee', fx: ['axis:exit=tollclerk'], next: '@ending' },
    { t: 'Not yet. But ask Vell to keep the grey camp off your back.', a: 'talk', fx: ['+vell_ally', 'rep:vell+1', 'rep:reclaimers-1'],
      res: '"Ah." Vell taps its cup. "Toll audits. Delays. Paperwork. I can make a camp\'s life very, very slow." It almost smiles, which on a mantis is unsettling. "Consider them audited."', next: 'hub' },
    { t: 'Ask what Tollkeepers know about abandoned property.', a: 'science', fx: ['+clue_paper', 'rep:vell+1', 'note:Vell: when an owner abandons property, the claim passes to whoever takes residence. Old Tollkeeper law. "Finders keepers," Vell called it. "We wrote it."'],
      res: '"Ah, abandonment law. Our finest work," says Vell. "An owner relinquishes. The claim waits. The first to take up residence inherits the claim, and the signature. The ledgers read the new owner as the old one." It sips. "We call it the Finders Clause. Very popular with people who want to disappear. Less popular with whoever finds."', next: 'hub' }
  ]
});

FK.S({
  id: 'r_settle', ch: 2, loc: 'reach', title: 'Settle the Reach', teaser: 'Decide what you leave behind here.', prio: 6,
  req: 'seen:r_camp & (seen:r_relay | seen:r_convoy | seen:r_foreman | seen:r_ice)',
  text: [
    'The snow is thinning. You know the Reach now: its gate, its camp, its dead. One more thing to do here before you go home for good, and then this place will stay whatever you make it.',
    { if: 'rep:tollkeepers>=2', t: 'The Tollkeepers like you. That counts for a lot on a frozen road.' },
    { if: 'deal_reclaimers', t: 'You have a deal with the Foreman. It sits on you like snow.' },
    { if: 'relay_down', t: 'The mast is down. The camp is blind and furious.' }
  ],
  choices: [
    { t: 'Ask the Tollkeepers to close the gate to the grey camp.', a: 'talk', req: 'rep:tollkeepers>=2', fx: ['axis:reach=allied', '+settled_reach', 'rep:reclaimers-2', 'rep:tollkeepers+1', 'sp+1'],
      res: 'Vell, or someone like Vell, files the request. By sunset the gate\'s six portals have a new rule: no grey coveralls. The camp shouts at the glass for an hour. The glass doesn\'t care. You go home with the Reach on your side.', next: '@loc:garage' },
    { t: 'Confirm the deal with the Foreman. Leave them a key.', a: 'betray', req: 'deal_reclaimers | foreman_partner', fx: ['axis:reach=deal', '+settled_reach', 'rep:reclaimers+2', 'sp+1'],
      res: 'You leave a spare house key on the Foreman\'s ledger with a note: when it\'s time. He pockets it without looking. "Good man," he says. You are not sure that is true. You go home.', next: '@loc:garage' },
    { t: 'Blow the gate. Let nobody follow you home from here.', a: 'gadget', req: 'item:grenade | item:frostcell | skill:rig', fx: ['axis:reach=ruined', '+settled_reach', 'rep:tollkeepers-4', 'rep:reclaimers-2', 'take:grenade', 'take:frostcell', 'sp+1'],
      res: 'You overload a frost cell in the gate\'s power trunk, or throw the flash charge where it\'ll do the most harm. The glass goes up in a white roar that shatters every booth on the line. The portals stutter, shrink, and close one by one. Six roads, nowhere to go. You step through your own portal before the clerks can find their pens.', next: '@loc:garage' },
    { t: 'Plant your claim on the gate. Make it yours on paper.', a: 'betray', req: 'signed_claim | item:paper & mouth>=3', fx: ['axis:reach=claimed', '+settled_reach', 'rep:tollkeepers-2', 'rep:reclaimers-1', 'scrap+3', 'sp+1'],
      res: 'Rick\'s quitclaim lists "all attached interests". One of those interests, it turns out, is a twelve percent share of the Pallid Reach toll concession, won in a card game. With your name on the paper, it\'s yours. Vell reads it, goes very still, and stamps it. You now own part of a toll gate. The clerks look at you differently. They look at you like a landlord.', next: '@loc:garage' },
    { t: 'Just leave. Take nothing. Leave no mark.', a: 'sneak', fx: ['axis:reach=quiet', '+settled_reach', 'sp+1'],
      res: 'You walk back through the snow and fire the gun at the ice. Nobody here will tell stories about you. That suits you. That has always suited you.', next: '@loc:garage' }
  ]
});
