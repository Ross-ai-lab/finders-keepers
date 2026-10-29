/* Chapter 3 — two more people who might walk through the door. */

/* ============================================================== THE POLICE */

FK.S({
  id: 'v_pol_arrive', ch: 3, loc: 'house', sub: true, title: 'Blue and Red',
  text: [
    'It isn\'t a knock this time. It\'s a battering ram.',
    'The front door comes off its hinges and the hall fills with flashlights and shouting: POLICE, SHOW ME YOUR HANDS, GET DOWN. Six officers in vests, two detectives behind them, and through the front window, every house on the cul-de-sac lit up red and blue.',
    { if: 'officer_down', t: 'Officer Banks is at the front, with a bruise on his jaw the shape of your fist. He doesn\'t say anything. He just looks at you.' },
    { if: 'portaled_cops', t: 'One of the detectives is the one you pushed through a portal. She is wearing a fireproof cloak she did not leave with, and she has very clearly had the worst week of her life.' },
    { if: 'rep:dolores<=-2', t: 'On her porch across the street, in her dressing gown, Dolores Pike watches with her notebook open.' },
    '"Hollis Grady," says the lead detective, reading from a folder as thick as a phone book. "Breaking and entering, theft, assault, and a list of things I can\'t pronounce. The Smith family has been missing for weeks. And you\'ve been living in their house." She looks around the hall. "Where are they?"',
    'Under your feet, the heater in the basement hums one note, very loud, as if somebody downstairs had just sat up.'
  ],
  choices: [
    { t: 'Keep your hands where they can see them.', a: 'neutral', next: 'v_pol_stand' }
  ]
});

FK.S({
  id: 'v_pol_stand', ch: 3, loc: 'house', sub: true, title: 'Where Are They?',
  text: [
    'Six guns, eight flashlights, one question. "Where are the Smiths?"',
    'You could tell them. They wouldn\'t believe you. Or you could do something else.',
    { if: 'ninetytwo_recruit', t: 'Behind you, in the garage doorway, Ninety-Two has gone very still, his hand near the stubby grey pistol he isn\'t supposed to have any more.' },
    { if: 'rep:caretaker>=2 & !caretaker_off & !caretaker_gone', t: 'The smoke detector blinks once, slowly. The Caretaker is waiting for your call.' }
  ],
  choices: [
    { t: 'Fight your way to the garage.', a: 'force', w: 3, out: [
      { req: 'muscle>=5 | item:raygun | knuckle_hired', fx: ['axis:climax=killed', '+pol_dead', 'rep:officer-5', 'heat+5'],
        res: 'It goes the way these things go, fast and loud and nothing like television. When it stops, there are officers on the hall floor who will not get up, and you are in the garage with the steel door shut and a dozen more sirens coming. You did that. There is no version of the world where that goes away.' },
      { death: 'police', next: '@death' }
    ], next: 'c3_after' },
    { t: 'Kill the lights with the panic button and take them in the dark.', a: 'sneak', w: 3, req: 'button_wired | skill:ambush', fx: ['axis:climax=killed', '+pol_dead', 'rep:officer-5', 'heat+5'],
      res: 'Every flashlight, every radio, every phone dies at once. In the dark, you know the house and they don\'t. It is short. It is quiet. When the backup arrives, they find the front door off its hinges and a hallway they will need counselling to describe.', next: 'c3_after' },
    { t: 'Drop them all with the hallway trap and drag them into the basement.', a: 'gadget', w: 3, req: 'house_trapped | killbox', fx: ['axis:climax=captured', '+pol_caught', 'rep:officer-4', 'heat+3'],
      res: 'You set the trap to stun, not kill. The plates under the rug throw them like dolls. You drag eight police officers down the basement stairs and zip-tie them to the shelves by the humming heater. The detective comes round first. "You know this only gets worse," she says. You know.', next: 'c3_after' },
    { t: 'Tell them the truth. All of it. Show them the heater.', a: 'talk', w: 3, req: 'mystery>=2', fx: ['axis:climax=talked', '+pol_believed', 'rep:officer+3', 'heat-5'],
      res: 'You take the detective down to the basement. You put her hand on the heater. You tell her to listen. She listens, and the chord changes when someone upstairs that isn\'t there walks across the floor, and her face changes with it. "Everybody out," she says, without turning round. "Everybody. Now." They go. She stays a minute longer. "I\'m writing this up as a gas leak," she says. "God help me."', next: 'c3_after' },
    { t: 'You\'re the house-sitter. Dolores will vouch for you.', a: 'talk', w: 3, req: 'rep:dolores>=3 | dolores_ally_final', fx: ['axis:climax=talked', '+pol_alibi', 'heat-5', 'rep:dolores+1'],
      res: 'Dolores comes across the street in her dressing gown and walks straight past six armed officers into the hallway. "This man," she tells the detective, "is Beth Smith\'s cousin, and I typed court transcripts for thirty-one years, and I will be typing yours if you don\'t get out of my friend\'s house." It takes another hour. But they get out.', next: 'c3_after' },
    { t: 'Let the Caretaker play the family\'s voices on every speaker.', a: 'gadget', w: 3, req: 'rep:caretaker>=2 & !caretaker_off & !caretaker_gone', fx: ['axis:climax=tricked', '+pol_tricked', 'heat-4', 'rep:caretaker+1'],
      res: '"Oh, this is going to be fun," says the house. Every speaker crackles. "Officer?" says Beth Smith\'s voice from the kitchen, tired and annoyed. "We\'re upstairs. We\'re fine. Jerry, put some trousers on." "Hi, officers!" says Jerry\'s voice, from the landing. "Sorry about the noise!" The detectives look at each other. Nobody wants to go up those stairs. They don\'t. They leave a card on the hall table.', next: 'c3_after' },
    { t: 'Slip the gun off its hook and portal the whole raid somewhere confusing.', a: 'gadget', w: 3, req: 'gun_ready & (skill:portal | brains>=4)', fx: ['axis:climax=tricked', '+pol_tricked', 'heat+2'],
      res: 'You fire at the hall floor. Six officers and two detectives drop through a green hole into the middle of the Pallid Reach toll queue, where they will be politely invoiced for the crossing. You close it. The sirens outside go on wailing at an empty house.', next: 'c3_after' },
    { t: 'Fly out through the garage roof.', a: 'flee', w: 3, req: 'car_fixed', fx: ['axis:climax=fled', '+pol_fled', '+flew_away'],
      res: 'The ship goes up through the garage roof in a fountain of tiles and you are gone into the clouds before the helicopter arrives. On the evening news: "an unidentified aircraft". You watch it from a motel two states away.', next: 'c3_after' },
    { t: 'Out the back. Over the fence. Gone.', a: 'flee', w: 3, req: 'sneak>=3 | knows_patrol | skill:ghoststep', fx: ['axis:climax=fled', '+pol_fled'],
      res: 'There is always a way out the back. You know where the patrol cars park, which fence is lowest, which yard has no dog. You are gone before they have finished shouting. You spend a week in a storm drain and come back when the tape is down.', next: 'c3_after' },
    { t: 'Give them someone. The wet man from the pool. Say he did it.', a: 'betray', w: 3, req: 'jerry_sheltered | jerry_dolores', fx: ['axis:climax=soldout', '+sold_out_jerry', 'rep:jerry-5', 'heat-4'],
      res: '"Him," you say, and point at Jerry, on the couch, in his polo shirt. "He came out of nowhere. He says he lives here. Look at him. He\'s the husband." The detective looks at Jerry. Jerry looks like the husband. He looks exactly like the husband. They take him out in cuffs, saying "I\'m a Jerry! I\'m just a Jerry!" all the way to the car.', next: 'c3_after' },
    { t: 'Give them the basement. Let them deal with what\'s down there.', a: 'betray', w: 3, req: 'mystery>=1', fx: ['axis:climax=soldout', '+sold_out_family', 'rep:family-5', 'heat-2'],
      res: '"They\'re in the basement," you say. It isn\'t a lie. Six officers go down the stairs with their guns out. You hear them find the heater. You hear one of them say, "Is it... humming?" You hear one of them put his hand on it. And then you hear the chord go wrong, sharp and frightened, and a woman\'s voice from nowhere at all say, "Don\'t you DARE."', next: 'c3_after' }
  ]
});
FK.death('police', 'They are trained, and there are more of them, and you are one tired man with a crowbar in a hallway. It is very fast. The last thing you see is the photo at the end of the hall, the old man looking at the ceiling as if he can\'t bear to watch.');

/* ============================================================== A RICK */

FK.S({
  id: 'v_ric_arrive', ch: 3, loc: 'house', sub: true, title: 'A Rick Comes Home',
  text: [
    'Green light in the living room. Not a portal from outside: a portal opened from the inside, by someone who knows exactly where they\'re going.',
    'The Rick from the noodle bar steps out of it. No apron now. A lab coat, burned at one sleeve, and a gun of his own, ugly and cheap and working. He looks around the living room the way a man looks at a house he used to live in.',
    { if: 'robbed_noodle', t: '"You robbed me," he says. "Fine. Everybody robs me. But you robbed me and then I thought about it, and I realised: this house is a Rick house, with no Rick in it." He smiles. "Finders keepers, buddy."' },
    { if: 'sold_noodle', t: '"You sold me to the Syndicate," he says. "Took me three days to get out of that cellar. Three days to think." He smiles, all teeth. "Thought about you. Thought about this house. Rick house, no Rick. Finders keepers, buddy."' },
    'He sits down in the recliner. The good chair. It fits him exactly.'
  ],
  choices: [
    { t: '"Get out of that chair."', a: 'neutral', next: 'v_ric_stand' }
  ]
});

FK.S({
  id: 'v_ric_stand', ch: 3, loc: 'house', sub: true, title: 'Finders Keepers',
  text: [
    '"Here\'s the thing about Ricks," he says, not getting out of the chair. "We\'re all the same guy. More or less. So this house is as much mine as his. More, maybe. I\'m here." He spreads his hands. "You\'re not a Rick. You\'re a guy who wandered in. And the ledger reads the claim as Rick-shaped. Which means I can take it off you by just... sitting here long enough." He wiggles into the recliner. "Comfy."',
    'Under the floor, the heater\'s chord has gone strange and tense, like two people arguing in another room.'
  ],
  choices: [
    { t: 'Drag him out of the chair. With force.', a: 'force', w: 3, out: [
      { req: 'muscle>=4 | item:stunner | item:raygun', fx: ['axis:climax=killed', '+ric_dead', 'rep:family-1'],
        res: 'He is old and thin and he is still a Rick, which means he has something up his sleeve, and you don\'t let him get it out. It ends on the living room carpet in front of the TV. Another one of him, dead in another house. You think about the man in the ice and the tally marks above him. You think about how easy it was.' },
      { death: 'rick', next: '@death' }
    ], next: 'c3_after' },
    { t: 'The skull bottle from the bathroom. Offer him a drink.', a: 'betray', w: 3, req: 'skull_bottle', fx: ['axis:climax=killed', '+ric_dead'],
      res: '"Drink?" you say, and pour from the brown bottle with the skull and the smiley face into a glass. He sniffs it. "Oh, that\'s the good stuff," he says, and drinks it, because he is a Rick. It was the good stuff. It was also exactly what the skull said it was. He sits back in the chair. He doesn\'t get up.', next: 'c3_after' },
    { t: 'Trap him in the chair. It\'s Rick-built. It can hold a Rick.', a: 'gadget', w: 3, req: 'skill:rig | brains>=4 | sat_chair', fx: ['axis:climax=captured', '+ric_caught'],
      res: 'You\'ve sat in that chair. You know it\'s engineered past what a chair should be. You find the lever under the left arm that you found by accident on day two. Restraints. Of course there are restraints. He looks down at them, then up at you, and laughs. "He built a chair that holds a Rick," he says. "Of course he did. He was afraid of us too."', next: 'c3_after' },
    { t: 'Talk Rick to Rick. Tell him what\'s behind the walls.', a: 'talk', w: 3, req: 'mystery>=2', fx: ['axis:climax=talked', '+ric_understood', 'rep:family+1'],
      res: 'You tell him about the fold. About the family in it. About the bait. He goes very quiet. "So he\'s here," he says. "Right here. With all of them." He looks at the walls for a long time. Then he gets up out of the chair. "I don\'t want his house," he says. "I want what he\'s got in it, and I can\'t have that." He opens a portal back to Cinderfall. "Look after them," he says. "Somebody should."', next: 'c3_after' },
    { t: 'Make him an offer. Half the garage. He teaches you everything.', a: 'talk', w: 3, req: 'mouth>=4 | skill:haggle', fx: ['axis:climax=talked', '+ric_partner'],
      res: '"Half the garage," he repeats. He looks at the bench, the map screen, the jars. "And I teach you?" He laughs. "You want to be a Rick." "I want to stop being bait," you say. He stops laughing. "Yeah," he says. "Okay. That\'s the first smart thing anyone\'s said in this house in years." He keeps the recliner. You keep the garage. It works, somehow.', next: 'c3_after' },
    { t: 'Tell him the grey camp has his scent, and they\'re ten minutes out.', a: 'talk', w: 3, req: 'skill:liar | mouth>=4 | item:ledger', fx: ['axis:climax=tricked', '+ric_tricked'],
      res: 'You hold up the grey compass, or just look at your watch and mention it casually: the Reclaimers know a Rick just sat down in this house, and they\'re very, very close. He\'s out of the chair before you finish the sentence. "Ten minutes?" "Maybe eight." He is through his portal in six seconds. Ricks are brave about everything except the people who count the tally marks.', next: 'c3_after' },
    { t: 'Let the decoy box claim the chair instead of him.', a: 'gadget', w: 3, req: 'item:decoy', fx: ['axis:climax=tricked', '+ric_tricked'],
      res: 'You set the decoy on the arm of the recliner and switch it on. It blinks. "What\'s that?" "That," you say, "is the owner of this house, as far as every ledger in four dimensions is concerned." His face goes pale. "You put a CLAIM on the chair? You maniac." He doesn\'t want to be anywhere near a claim. He leaves.', next: 'c3_after' },
    { t: 'Ninety-Two knows exactly what the Reclaimers pay for a Rick.', a: 'betray', w: 3, req: 'ninetytwo_recruit', fx: ['axis:climax=soldout', '+ric_sold_92', 'rep:ninetytwo-1', 'rep:reclaimers+2'],
      res: 'Ninety-Two steps out of the garage with his hands in his pockets. "I know him," he says. "Not him. One of him. Any of him. They\'ve got a price for every Rick in the ledger." The old man in the chair goes very still. "Kid," he says, "don\'t." Ninety-Two doesn\'t look at either of you as he makes the call. The grey coveralls come for the Rick in the chair, and they don\'t look at the heater at all.', next: 'c3_after' },
    { t: 'Let him have it. You were only ever a stand-in.', a: 'flee', w: 3, fx: ['axis:climax=fled', '+ric_left'],
      res: 'You pick up your bag. "It\'s yours," you say. He looks surprised, then something like disappointed. "That\'s it? No speech?" You go out of the back door. When you look back from the street, he is standing at the front window watching you go, and he doesn\'t look like a man who has won anything.', next: 'c3_after' },
    { t: 'Sell him the heater. Tell him there\'s a Rick inside it.', a: 'betray', w: 3, req: 'mystery>=1', fx: ['axis:climax=soldout', '+sold_out_family', 'rep:family-5'],
      res: '"Want the real prize?" you say. "Basement. The water heater. Your other self is in there with his whole family, hiding." His eyes light up the way only a Rick\'s eyes do. "Oh, you RAT," he says, delighted, and goes down the stairs two at a time. You don\'t follow. You hear him laughing in the basement. You hear the heater\'s chord go sharp, and then two old men\'s voices, through a wall, starting to argue.', next: 'c3_after' },
    { t: 'Sell him the claim. The house is his, for a price.', a: 'betray', w: 3, req: 'item:paper | signed_claim', fx: ['axis:climax=soldout', '+sold_claim_rick', 'scrap+5'],
      res: 'You bring out the quitclaim with your name on it. You cross your name out and write his under it. He pays you in parts from his coat, good ones. The house is his now. The ledger needle, if anybody is holding one, swings off you and onto him. "Pleasure," he says. "You\'re a natural." You don\'t take it as a compliment.', next: 'c3_after' }
  ]
});
FK.death('rick', 'He is a Rick. Of course there was something up his sleeve. It is small and green and it goes off very close to your face. "Sorry, buddy," he says, and he sounds like he almost means it.');
