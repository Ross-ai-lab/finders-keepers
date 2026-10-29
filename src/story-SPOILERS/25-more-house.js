/* Extra width for chapters 1 and 2: more of the house, more of the garage,
 * more things that happen while you're trying to stay unnoticed. */

/* ============================================================== chapter 1 additions */

FK.S({
  id: 'h_bathroom', ch: [1, 2], loc: 'house', title: 'The Bathroom Cabinet', teaser: 'Five toothbrushes. One is wet.',
  text: [
    'Small, blue-tiled, the kind of bathroom a family of five fights over every morning. Five toothbrushes in a cup. One of them is wet.',
    'The cabinet behind the mirror: aspirin, a teenager\'s acne cream, a bottle of pills prescribed to "J. Smith" for "anxiety (situational)", and a brown glass bottle with no label and a skull drawn on it in marker, with a smiley face.'
  ],
  choices: [
    { t: 'Feel the wet toothbrush. Think about it.', a: 'science', fx: ['+clue_food', '+wet_brush'],
      res: 'Wet. Not damp. Wet, and the bristles are cold, as if it was used ten minutes ago. Nobody has been in this bathroom in ten minutes. You have been sitting on the stairs in full view of the door the whole time. You put the toothbrush back in the cup, exactly as it was.', next: 'hub' },
    { t: 'Take the pills. Anxiety, situational. You qualify.', a: 'neutral', fx: ['hp+1', '+took_pills'],
      res: 'You take one. It takes the edge off the way a good coat takes the edge off rain. The label says J. SMITH, and under it, in a pharmacist\'s handwriting, "DO NOT EXCEED PRESCRIBED DOSE, JERRY." Someone knew Jerry.', next: 'hub' },
    { t: 'Pocket the bottle with the skull on it.', a: 'betray', fx: ['+skull_bottle', 'scrap+1'],
      res: 'You don\'t know what it is. That\'s what makes it useful. You wrap it in toilet paper and put it in the inside pocket where you used to keep your driver\'s log. Somewhere, someday, someone is going to drink something they shouldn\'t.', next: 'hub' }
  ]
});

FK.S({
  id: 'h_mail', ch: [1, 2], loc: 'house', title: 'The Mail Pile', teaser: 'Three weeks of letters on the mat.',
  text: [
    'Three weeks of mail behind the front door, fanned out where it fell. Pizza flyers. A dentist reminder for Morty. A credit card offer for Jerry, "pre-approved", which seems optimistic. A utility bill, red-stamped: FINAL NOTICE.',
    'And one envelope that is not paper. It\'s a thin sheet of something like brushed metal, folded like a letter, addressed in glowing type: TO: CURRENT OCCUPANT, LINDELL COURT. RE: CLAIM TRANSFER.'
  ],
  choices: [
    { t: 'Open the metal letter.', a: 'science', fx: ['+clue_paper', '+read_notice', 'note:A metal letter addressed to "Current Occupant": "Claim on this property has transferred by abandonment to the residing party. Liabilities transfer with claim."'],
      res: '"OFFICE OF INTERDIMENSIONAL RECORDS. NOTICE OF CLAIM TRANSFER. The prior holder of this property has relinquished all claim. Under the Finders Clause, claim has transferred to the residing party. Please be advised that LIABILITIES TRANSFER WITH CLAIM. Thank you for choosing abandonment." The residing party is you. You read "liabilities" four times.', next: 'hub' },
    { t: 'Pay the electric bill in cash. Keep the lights on. Look like an owner.', a: 'talk', req: 'scrap>=1', fx: ['scrap-1', 'heat-2', '+paid_bill'],
      res: 'You walk to the pay station by the gas station with the bill and the last of your cash. The clerk doesn\'t look up. The lights stay on. A house with paid bills is a house nobody asks about. You feel, absurdly, like a homeowner.', next: 'hub' },
    { t: 'Burn all of it in the fireplace.', a: 'force', fx: ['+mail_burned', 'heat+1'],
      res: 'The flyers go up fast. The bill goes up fast. The metal letter doesn\'t burn at all; it sits in the coals glowing brighter and brighter until, with a polite little chime, it says "RECEIPT ACKNOWLEDGED" and dissolves. Smoke from the chimney of a house everyone thinks is empty. Across the street, a curtain moves.', next: 'hub' }
  ]
});

FK.S({
  id: 'e_phone', ch: [1, 2], loc: 'house', forced: true, prio: 1, title: 'The House Phone',
  req: 'turn>=9 & !seen:h2_jerry',
  text: [
    'Three in the morning, and the landline in the kitchen rings. An actual landline, beige, with a curly cord, mounted on the wall by the fridge. It rings like a fire alarm in a library.',
    'Eight rings. Nine. It is not going to stop.'
  ],
  choices: [
    { t: 'Answer it. "Smith residence."', a: 'talk', fx: ['+phone_answered', '+shelter_heard'],
      res: 'A recorded voice, cheerful and tired: "This is a courtesy call from the Shelter for Displaced Jerrys, sector nine. We have received a request to forward a message to this address on behalf of a resident. If you are a Jerry Smith, please press one." You don\'t press anything. "If you are a Beth Smith, press two." You hang up. The phone doesn\'t ring again. You sit in the kitchen until dawn, thinking about the word "displaced".', next: 'hub' },
    { t: 'Answer and pretend to be the father. "Jerry here."', a: 'betray', req: 'mouth>=2 | disguise', fx: ['+phone_answered', '+posed_as_jerry', '+shelter_heard'],
      res: '"Jerry here," you say, in a voice you\'ve heard on the voicemail, eager and apologetic. A recorded voice: "Thank you, Jerry. Your message has been received. A family member will be notified that you have a house." Click. You stand there holding the phone. You have just told someone, somewhere, that this house has a Jerry in it.', next: 'hub' },
    { t: 'Unplug it from the wall.', a: 'flee', fx: ['+phone_unplugged', 'heat-1'],
      res: 'You yank the cord. Silence. The phone hangs on the wall like a dead bird. The next night, at three, it rings anyway, unplugged, twice, and stops.', next: 'hub' },
    { t: 'Let it ring and watch the kitchen.', a: 'sneak', fx: ['+clue_voice', '+phone_watched'],
      res: 'On the fourteenth ring it stops, and a voice from nowhere in particular, an old man\'s, says: "Jerry, if that\'s your shelter again, I swear to God." Then, quieter: "Oh. He\'s up." Then nothing at all.', next: 'hub' }
  ]
});

FK.S({
  id: 'e_pizza', ch: [1, 2], loc: 'house', forced: true, prio: 1, title: 'Delivery',
  req: 'turn>=11',
  text: [
    'The doorbell. You freeze. Through the peephole: a kid in a red cap with an insulated bag, bored, chewing gum.',
    '"Pizza for Jerry?" he calls. "Large pepperoni, extra garlic knots? Paid already. Somebody called it in from this number at like two fifty-nine. Says leave it on the step if nobody answers, which, honestly, every time."',
    'Every time.'
  ],
  choices: [
    { t: 'Open the door and take it. Play along.', a: 'talk', fx: ['hp+1', '+clue_food', '+pizza_taken'],
      res: '"Every time?" you ask, taking the box. "Every Thursday," says the kid. "For like three weeks. Always the same order. Always the step." He leaves. The pizza is hot and very good. You eat half and leave half on the counter. In the morning, the half is gone and the box has been folded neatly and put in the recycling, which is more than Jerry has ever done for anyone.', next: 'hub' },
    { t: 'Leave it on the step and watch who takes it.', a: 'sneak', fx: ['+clue_food', '+saw_pizza_vanish'],
      res: 'You watch from the dark hall. The kid leaves the box. Ten minutes. Twenty. You blink, and the box is gone. Not taken. Gone. There is a warm rectangle on the step where it was. From somewhere inside the house, faintly, a man says "yes!" like a man who has just received a pizza.', next: 'hub' },
    { t: 'Don\'t open. Hope he goes away.', a: 'flee', fx: ['heat+1'],
      res: 'He rings again. Then he shrugs, leaves the box on the step and goes. Across the street, Dolores Pike watches the pizza on the step of a house that is supposed to be empty for a full minute, then lets her curtain fall.', next: 'hub' },
    { t: 'Grab the kid. Find out who ordered it.', a: 'force', fx: ['heat+2', '+scared_pizza_kid'],
      res: 'You get a fist in his jacket and he drops the bag. "It\'s just a phone order, man!" It is. He shows you on his phone: this address, this landline, 2:59 a.m., every Thursday, name: JERRY. You let him go. He runs. The pizza place will stop delivering here, and someone will hear about the weird guy at the empty Smith house.', next: 'hub' }
  ]
});

FK.S({
  id: 'e_dog', ch: [1, 2], loc: 'house', forced: true, prio: 1, title: 'A Dog in the House',
  req: 'turn>=6 & (window_broken | entry_back | entry_morning | door_broken)',
  text: [
    'Claws on the kitchen tile. A dog has got in: a big, friendly, filthy mutt with a collar tag that says BISCUIT and a phone number from three streets over.',
    'Rule one: never a house with a dog. Technically, it was not a house with a dog when you got here.',
    'Biscuit doesn\'t care about you at all. Biscuit goes straight to the basement door and starts whining at it, and scratching, and barking at something on the other side that only dogs can hear.'
  ],
  choices: [
    { t: 'Open the basement door and follow the dog.', a: 'sneak', fx: ['+clue_heater', '+dog_led', 'note:A neighbour\'s dog went straight to the basement heater and barked at it like there were people behind it.'],
      res: 'Biscuit goes down the stairs like a shot and plants himself in front of the water heater, barking, tail going, the way dogs bark at people they know through a fence. At the heater. At nothing. Then he whines, sits, and puts one paw on the enamel, very gently, like he\'s knocking.', next: 'hub' },
    { t: 'Feed him and let him stay the night.', a: 'talk', fx: ['+dog_friend', 'hp+1', 'take:canned'],
      res: 'A can of beans, which is probably bad for him. He eats it in four seconds and sleeps across your feet on the couch all night, and growls, low, every time the house makes a noise you didn\'t make. In the morning you walk him home three streets over. The owner says he\'s never run off before. You say you hope he does again.', next: 'hub' },
    { t: 'Put him out. Fast. Before he barks the street awake.', a: 'force', fx: ['heat-1'],
      res: 'You haul him out by the collar and shut the door. He sits on the step and howls at the house for an hour. Not at you. At the house.', next: 'hub' },
    { t: 'Call the number on his tag. Be a good neighbour.', a: 'talk', fx: ['heat+1', '+dog_returned', 'rep:dolores+1'],
      res: 'A woman answers, thrilled, and comes round in her car. She looks at you and at the Smith house. "Are you... staying with the Smiths?" "House-sitting." "Oh, good. Somebody should be. It\'s been so quiet." Dolores, across the street, has watched the whole exchange, and seems to approve.', next: 'hub' }
  ]
});

/* ============================================================== chapter 2 additions: the garage */

FK.S({
  id: 'g_jars', ch: 2, loc: 'garage', title: 'The Jars', teaser: 'Shelves of jars. One has a city in it.',
  text: [
    'The shelves at the back of the garage: jars. Pickling jars, jam jars, a big glass carboy. Most hold things you decide not to look at closely: a single blinking eye; something that might be a very small weather system; a label that just says JERRY\'S MISTAKE.',
    'One jar is different. Inside it, on a disc of soil the size of a dinner plate, is a city. Tiny. Lit. Moving. Streets, towers, a river, the glint of traffic. When you lean close, a hundred thousand tiny lights all turn toward your face.',
    'Taped to the lid: "SPARE BATTERY. DO NOT TALK TO THEM. THEY GET IDEAS."'
  ],
  choices: [
    { t: 'Talk to them.', a: 'talk', fx: ['+jar_god', 'rep:family-1'],
      res: 'You say "hello" very quietly. The city stops. Then, slowly, every light in it rearranges into a single shape: a face. Yours. By evening they have built a temple shaped like your head in the town square. By the next morning they have a holy book. Chapter one is about the rain. You are, it turns out, very easy to worship.', next: 'hub' },
    { t: 'Study them. Learn how a city in a jar powers a garage.', a: 'science', fx: ['brains+1', '+jar_studied', 'sp+1'],
      res: 'The jar is a battery. The city inside is a whole small world whose people, without knowing it, generate the power that runs half the garage. They think their sun is a sun. It\'s a bulb. You sit back on your heels. Rick built a civilisation to keep his beer cold. You learn more about power, and about Rick, in an afternoon than you wanted to.', next: 'hub' },
    { t: 'Shake it. See what happens.', a: 'force', fx: ['+jar_shaken', 'scrap+1', 'heat+1'],
      res: 'Earthquakes. Floods. Towers falling. A hundred thousand tiny lights going out and coming back on, panicked. The garage lights dim for an hour. You put the jar down. It\'s a battery. It\'s just a battery. You don\'t look at it again.', next: 'hub' },
    { t: 'Find a way to go in. Small. Where no ledger will ever look.', a: 'flee', req: 'skill:pocket | brains>=5 | jar_studied & brains>=4', fx: ['axis:exit=jar'], next: '@ending' }
  ]
});

FK.S({
  id: 'g_button', ch: 2, loc: 'garage', title: 'The Blue Button', teaser: 'Number nine on the list: any blue button.',
  req: 'read_box | seen:g_robot | seen:g_car',
  text: [
    'Under the lip of the workbench, at knee height, where you would only find it by dropping something: a blue button. Big, round, glossy, the blue of a swimming pool in an advert. No label. No wire you can see.',
    { if: 'read_box', t: 'The boy\'s list. Number nine: "the blue button (any blue button)."' },
    'Every instinct you have says a button like that is either nothing at all or the end of the world.'
  ],
  choices: [
    { t: 'Press it.', a: 'gadget', out: [
      { req: 'heat>=5', fx: ['heat-4', '+button_moved_house', '+pressed_button'], res: 'A deep THUNK under your feet. The whole house, garage and all, slides three feet to the left on its foundations, smoothly, like a drawer. The neighbours\' security lights all go on at once. In the morning nobody can work out what\'s different about the Smith house. Something about the angle. The police patrol drives past twice and doesn\'t stop. It doesn\'t look like the house they were watching.' },
      { req: 'brains>=3', fx: ['brains+1', 'sneak+1', '+button_swap', '+pressed_button'], res: 'For one second you are standing in a different garage, cleaner, with a different Hollis staring at you from across the bench, in a lab coat. "Oh no," he says. "Not again." Then you\'re back. Your head is full of things you didn\'t know: a better way to wire a relay, the exact location of every creaking floorboard in a house you have never been in. He got some of yours too. You hope he likes trucks.' },
      { fx: ['hp-1', '+button_bad', '+pressed_button'], res: 'Every light in the garage turns blue. Then you do. Then, after an hour of being blue, you aren\'t. The robot arm on the bench is laughing at you, which you did not know it could do.' }
    ] },
    { t: 'Tape over it. Write DON\'T on the tape.', a: 'neutral', fx: ['+button_taped', 'rep:family+1'],
      res: 'Duct tape, three layers, and DON\'T in marker. Someone in this house would approve. Later, you find that someone has added, in the boy\'s handwriting underneath: "thank you."', next: 'hub' },
    { t: 'Wire it to something useful.', a: 'science', req: 'skill:rig | brains>=4', fx: ['+button_wired', 'scrap+1'],
      res: 'You trace it under the bench. It\'s wired to everything and nothing: a switch for a hundred different devices, randomised. You wire it into your workbench so it does one thing instead: kills every electronic device within a hundred metres, including the ones in other people\'s pockets. A panic button. For a panicky man.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_button2', ch: 2, loc: 'garage', title: 'The Blue Button, Again', teaser: 'You could press it again. Longer.',
  req: 'pressed_button',
  text: [
    'The blue button sits under the bench, glossy and innocent. You know now that it does something different every time. You also know, the way you know a lock, that if you held it down instead of pressing it, it would do the biggest thing it knows how to do.'
  ],
  choices: [
    { t: 'Hold it down. All the way.', a: 'flee', fx: ['axis:exit=button'], next: '@ending' },
    { t: 'Leave it. Once was enough.', a: 'neutral', res: 'You walk away from the bench. Behind you, the button glows very faintly blue, as if disappointed.', next: 'hub' }
  ]
});

FK.S({
  id: 'g_noodle_visit', ch: 2, loc: 'garage', title: 'A Visitor from the Noodle Bar', teaser: 'The other Rick, at your garage door.',
  req: 'met_noodle & !robbed_noodle & !sold_noodle',
  text: [
    'A small green WHUMP in the drive at dusk, and the Rick from the noodle bar steps out of it in his stained apron, a paper bag in one hand, looking at the house with the expression of a man visiting his own grave.',
    '"Brought you noodles," he says. "And a warning. Don\'t say I never do anything." He looks at the garage, at the map screen, at the gun on its hook. "You\'ve kept it nice. He never kept it nice."'
  ],
  choices: [
    { t: 'Ask for the warning.', a: 'talk', fx: ['+noodle_warned', '+clue_paper', 'rep:family-1'],
      res: '"Your guy didn\'t run," Noodle Rick says, eating your noodles. "Ricks don\'t run. Ricks hide in plain sight and make someone else stand in the light. Check the walls, buddy. Check the basement. And when the grey ones come, and they will, don\'t be standing in the light." He leaves the bag. He leaves through his own portal. He doesn\'t say goodbye.', next: 'hub' },
    { t: 'Offer him the house. He looks like he needs one.', a: 'talk', fx: ['+offered_noodle', 'rep:family-1'],
      res: 'He laughs until he has to sit down on the bucket. "A house," he says. "With my face all over the walls? Somebody else\'s family in the photos?" He wipes his eyes. "No, buddy. I gave all that up. The noodles don\'t judge me." He pats your shoulder. "You\'re a good egg. That\'s going to be a problem for you."', next: 'hub' },
    { t: 'Ask him to show you how to hide a family.', a: 'science', req: 'mystery>=1', fx: ['+heater_understood', '+clue_heater', 'brains+1'],
      res: 'He goes quiet. Then he goes down to the basement without being asked, and stands in front of the heater with his hands in his apron pockets. "Huh," he says. "Pocket fold. Tidy work. Show-off." He shows you the dial, the chord, the pin. "That\'s how you hide a family. That\'s how you open it, too. I never did either." He goes home without his noodles.', next: 'hub' }
  ]
});

/* ============================================================== chapter 2 additions: the house */

FK.S({
  id: 'h2_pair', ch: 2, loc: 'house', title: 'Ninety-Two and the Wet Man', teaser: 'Your two strays have met.',
  req: 'ninetytwo_recruit & jerry_sheltered',
  text: [
    'You come in from the garage and find Ninety-Two and Jerry at the kitchen table, staring at each other across a plate of eggs.',
    '"He\'s a Jerry," says Ninety-Two, flatly, like it explains everything. "We had Jerrys at the camp. They peel potatoes. They cry."',
    '"I\'m RIGHT HERE," says Jerry. "And I\'m a very good potato peeler, thank you."',
    'They both turn to look at you.'
  ],
  choices: [
    { t: 'Make them eat together. Every night.', a: 'talk', fx: ['rep:ninetytwo+1', 'rep:jerry+1', '+household'],
      res: 'It is the worst dinner party you have ever hosted, and you host it every night for a week. By the fourth night Jerry is teaching Ninety-Two to make an omelette and Ninety-Two is pretending not to enjoy it. By the sixth, you catch them laughing at you behind your back. It\'s the best thing that\'s happened in this house since you got here.', next: 'hub' },
    { t: 'Ask Ninety-Two whether the camp would want a Jerry.', a: 'betray', fx: ['+jerry_valued', 'rep:jerry-1', 'rep:ninetytwo-1'],
      res: '"Want him?" Ninety-Two looks at Jerry. Jerry looks at his eggs. "The Foreman pays for Smiths," Ninety-Two says slowly. "Any Smiths. A full family is worth a lot. Even a Jerry." He looks at you. "Why?" You don\'t answer. Jerry doesn\'t finish his eggs.', next: 'hub' },
    { t: 'Leave them to it.', a: 'sneak', fx: ['+left_strays'],
      res: 'You back out of the kitchen. Behind you, Jerry starts explaining his business plan for dog hats, and Ninety-Two, against all his training, asks a follow-up question.', next: 'hub' }
  ]
});

FK.S({
  id: 'h2_dog', ch: 2, loc: 'house', title: 'Biscuit Comes Back', teaser: 'The dog has decided you live here.',
  req: 'dog_friend',
  text: [
    'Biscuit is on the back step again. He comes every evening now, eats whatever you give him, sleeps on your feet and walks home at dawn. He has decided this is his second house. He growls at the basement door. He growls at grey coveralls in the street. He growls at Jerry, if there is a Jerry, which is fair.'
  ],
  choices: [
    { t: 'Let him stay. A dog is the best alarm there is.', a: 'neutral', fx: ['+dog_guard', 'heat-1'],
      res: 'You put an old blanket by the back door. He sleeps there every night after that. You sleep better than you have in three years. Rule one is broken now, completely. You find you don\'t care.', next: 'hub' },
    { t: 'Walk him home and tell his owner to keep him in.', a: 'flee', fx: ['-dog_friend', '+dog_home'],
      res: 'You walk him home. The owner thanks you. Biscuit looks at you from behind her legs with an expression you will remember for a long time. It\'s for his own good. Things are going to get loud at the Smith house.', next: 'hub' }
  ]
});
