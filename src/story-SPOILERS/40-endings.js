/* Endings. A core ending is assembled from four independent axes —
 * the climax, who you became, the gun and the house — and then an epilogue
 * built from everyone and everything you touched. Early exits stand alone. */

FK.endings({
  defaultGun: 'kept', defaultHouse: 'held', defaultClimax: 'fled',
  invalid: [{ gun: 'returned', house: 'burned' }],

  climaxes: {
    killed: { title: 'Blood on the Tile', text: [
      'They came into the house and they did not leave it. That is the plain fact of the night, and you will carry it the way you carry everything: in a bag by the back door, ready to go, never unpacked.',
      { if: 'kills>=3', t: 'You have lost count of the graves in the yard. That is the part that frightens you: not the number, but losing count.' }
    ] },
    captured: { title: 'Prisoners', text: [
      'You took them alive. It would have been easier not to. You know that about yourself now: when it came to it, you chose the harder, slower thing.',
      { if: 'up:cell', t: 'The holding cell you built out of chain-link and stubbornness is full for the first time. It holds.' },
      { if: '!up:cell', t: 'You didn\'t have a cell. You had zip ties, a basement, and an absolute refusal to let it go any other way.' }
    ] },
    talked: { title: 'Words', text: [
      'You talked. In the end it was the oldest tool you had, older than the crowbar and the picks: a calm voice in a bad room. Nobody died. Nobody will tell this story the way it happened, because the way it happened was mostly people standing in a kitchen deciding not to.'
    ] },
    tricked: { title: 'Sleight of Hand', text: [
      'You outsmarted them. Not with strength, not with a speech, but with a trick nobody saw coming, in a house you knew better than they ever could. Somewhere tonight a lot of very angry people are trying to work out what just happened to them.'
    ] },
    fled: { title: 'Gone by Morning', text: [
      'You ran. Of course you ran. Running has kept you alive for three years and it kept you alive tonight. There is no shame in it. You tell yourself that a few times, until it\'s nearly true.'
    ] },
    soldout: { title: 'Sold Out', text: [
      'You gave them something that wasn\'t yours to give. It was the easy way through. You took it. You will know, every time you walk past the basement door, exactly what it cost and who paid.',
      { if: 'sold_out_family', t: 'Under your feet, ever since, the heater hums a different chord. Minor. You lie awake trying not to hear it.' },
      { if: 'sold_out_92', t: 'You think about Ninety-Two\'s face more than you would like. "Inventory." He said it like he\'d always known.' }
    ] }
  },

  identities: {
    brute: { title: 'The Landlord', text: [
      'You came to this house with a crowbar wrapped in a towel and you ended up as the thing the street is afraid of. You hit first. You hit hardest. When people come to your door now, they knock carefully, and they stand back from it after they knock.',
      { if: 'kills>=2', t: 'Dolores Pike\'s diary, if anyone ever reads it, has a new section with your name at the top of it. She uses a different pen for it.' },
      { if: 'kills<2', t: 'You never let it turn into a habit. That is your line. You hold onto it like a railing in the dark.' }
    ] },
    successor: { title: 'The New Rick', text: [
      'You understand the garage now. Not all of it; nobody understands all of it. But enough. You sit at the bench at three in the morning with a soldering iron and a drink, building things that should not exist, and sometimes you catch your reflection in the dark map screen and see spiked hair that isn\'t there.',
      { if: 'skill:pocket', t: 'You can feel the fold in the house now the way you feel a draught. You could build one yourself. You\'ve started sketching it, on the back of the calendar page. You stop yourself. Most nights.' },
      { if: 'item:raygun', t: 'The pistol from the attic hangs on the pegboard, humming. BROKEN. DON\'T FIX. You fixed it. That was the whole story, really.' }
    ] },
    fixer: { title: 'The Fixer', text: [
      'You talked your way into this house and you talked your way through everything it threw at you. Worlds full of clerks and fences and mushrooms, and every one of them, in the end, made a deal with you. People in four dimensions know your name now as the man you call when you need something sorted without anyone getting hurt. Mostly without.',
      { if: 'skill:command', t: 'When you speak in that calm, flat voice now, people do what it says. You try not to use it on the neighbours.' }
    ] },
    ghost: { title: 'The Ghost in the House', text: [
      'Nobody ever really saw you. Not the police, not the clerks, not the men in grey. You moved through this house and four worlds like a draught through a keyhole, and when people tell stories about what happened on Lindell Court, they argue about whether you were ever really there.',
      { if: 'skill:ghoststep', t: 'Sometimes you catch yourself walking through rooms without touching the floor. The house has started to forget you\'re in it. That is either the safest you have ever been or the loneliest.' }
    ] },
    turncoat: { title: 'The Turncoat', text: [
      'You learned the rule of this house faster than anyone meant you to: everyone is somebody\'s bait. So you made other people yours. Every deal you made, you made with one hand behind your back, and every time it was somebody else left holding the bag.',
      'The old man would be proud of you. That\'s the worst thing anyone could say about you, and it\'s true.',
      { if: 'sold_family', t: 'You sold what you knew about the family once already, in a back room in Cinderfall. You will do it again if the price is right. You know that about yourself now.' }
    ] }
  },

  guns: {
    kept: { title: 'the gun on your hip', text: [
      'The portal gun stays with you. On the hook in the garage by day, on your hip by night. Every door in every world is a squeeze of your finger away, and you have not decided yet what kind of man walks through them.',
      { if: 'identity:successor', t: 'You have already taken it apart twice and put it back better.' },
      { if: 'identity:ghost', t: 'You use it mostly to leave rooms. That is enough.' }
    ] },
    sold: { title: 'the gun sold', text: [
      'You sold the portal gun. The money will keep you for years, in a currency that smells faintly of toast. Somewhere, someone you will never meet is opening doors with it.',
      { if: 'axis:cinder=partner', t: 'Brass handled the sale, as your partner, and took only its usual cut, and then sent you a bottle of something that smokes as a thank-you. "It went to a collector," the note said. "Mostly."' },
      { if: '!axis:cinder=partner', t: 'Six months later, a rumour reaches you from Cinderfall: a war in a world you\'ve never heard of, started by someone with a portal gun and no sense. You don\'t ask whose gun it was.' }
    ] },
    destroyed: { title: 'the gun broken', text: [
      'The gun is broken on the concrete in the yard, its green gone grey. Nobody will follow its trail now, and nobody will use it to follow anyone else\'s. Every other world is exactly as far away as it was before you came here. That turns out to be fine.'
    ] },
    given: { title: 'the gun given away', text: [
      'The gun is gone, in someone else\'s hands. Whatever doors it opens now are their doors.',
      { if: 'gave_gun_rec', t: 'The Reclaimers have it. The ledger needle, you hear, led them straight back into the Citadel\'s ruins. You hope they find what they\'re owed. You hope it\'s not you.' },
      { if: 'ninetytwo_recruit & !gave_gun_rec', t: 'Ninety-Two sends you a postcard a month later. A beach, two suns, a Morty grinning on a deckchair. On the back: "you were right. nobody hunts anybody here. eggs are still bad. — 92."' }
    ] },
    returned: { title: 'the gun given back', text: [
      'You gave the gun back to the people behind the walls. In the morning, on the workbench, there is a different gun: older, uglier, a cheap thing with a cracked grip and a full bulb. And a note in that terrible, jagged handwriting.',
      '"Finders keepers. Keep finding. — R."',
      { if: 'identity:turncoat', t: 'Under it, smaller, a second line: "I know what you are. Takes one. Don\'t get comfortable."' },
      { if: 'identity:fixer', t: 'Under it, smaller: "You talk too much. Morty likes you. That\'s a problem for both of us."' }
    ] }
  },

  houses: {
    held: { title: 'the house held', text: [
      'You stay. The house on Lindell Court is yours now, as much as anything has ever been yours. The ledger still reads you as its owner. Whatever comes for the owner will come for you. You leave the porch light on anyway.',
      { if: 'mystery<2', t: 'At night the house is still busy: footsteps, the fridge, the TV turning itself on to cooking shows. You have stopped getting up to check. You leave a yogurt out on the counter before bed, and it\'s always gone in the morning.' },
      { if: 'mystery>=2', t: 'At night you sit at the kitchen table, at the side, not the head, and you say goodnight to the wall. Sometimes, from somewhere, a boy says it back. On the fridge, one morning, a note in his round careful hand: "thank you (sorry)."' }
    ] },
    burned: { title: 'the house burned', text: [
      'The house on Lindell Court is a black shell. You stand in the street in your socks, again, watching the windows, again. It is the second home you have watched burn. This time, at least, you know whose fault it was.',
      { if: 'mystery>=1', t: 'Down where the basement was, under the ash, the humming has stopped. You don\'t know what that means. You are afraid you do.' },
      { if: 'rep:dolores>=2 & !sold_dolores & !cap:dolores', t: 'Dolores stands next to you on the pavement in her dressing gown and holds your hand without saying anything. She has a very strong grip for seventy-four.' }
    ] },
    abandoned: { title: 'the house left open', text: [
      'You leave. You take your bag from by the back door and you go out the way you came in, and you leave the deadbolt\'s strike plate in a sandwich bag, taped to the inside of the door, at eye height. For whoever comes next. Somebody always does.',
      { if: 'mystery>=2', t: 'You know exactly what you are doing, leaving it like that. You are doing to the next person what was done to you. You tell yourself that whoever comes next might be better at this than you were. You don\'t entirely believe it.' },
      { if: 'mystery<2', t: 'Three weeks later, in a motel in a different state, you dream of footsteps on a landing, and a fridge door, and a boy\'s voice saying, "Grandpa, he\'s gone." You wake up and don\'t know why you\'re crying.' }
    ] },
    opened: { title: 'the fold opened', text: [
      'You go down to the basement with the hinge in your hand, or just with what you know, and you turn the dial on the water heater all the way round, the way the old man did in the memory. The chord rises. The basement doubles, grey over white, like tracing paper.',
      'And then the kitchen upstairs is full of people.',
      'You come up the stairs and they are standing there, blinking in the light, in clothes three weeks out of date: the tired woman with her hand on the boy\'s shoulder; the girl with her arms crossed; the father holding a yogurt; and at the head of the table, in the good chair, an old man with spiked white hair, looking at you.',
      { if: 'identity:brute', t: '"Huh," says Rick. "The muscle. Didn\'t see that coming." He looks at your hands. "You\'re going to be a problem."' },
      { if: 'identity:successor', t: '"Oh, great," says Rick, looking past you at the garage door, at the modifications you\'ve made. "You touched my stuff. You IMPROVED my stuff." His eye twitches. "We need to talk."' },
      { if: 'identity:fixer', t: '"Let me guess," says Rick. "You want to talk about it." He gets up and gets a beer out of the fridge, your beer. "Fine. Talk. You\'ve got till I finish this."' },
      { if: 'identity:ghost', t: 'Rick looks around the kitchen, slowly, as if trying to find you, though you\'re standing right there. "Where\'d — oh. There you are. Creepy. I like it."' },
      { if: 'identity:turncoat', t: '"Well, well," says Rick, and smiles for the first time, a terrible smile. "Takes one to know one." He pulls out a chair at the table. Not the side chair. The other end. "Sit down, partner."' },
      'The boy steps forward. "Hi, Hollis," he says. "Thanks for not sitting in the chair." Behind him, Beth puts a hand over her face. Summer says, "Oh my God, this is so awkward." Jerry offers you a yogurt.',
      'And somewhere, a long way off, in a grey camp in the snow, every ledger needle in the Reclaimers\' possession swings at once, away from you, and points at this kitchen. Rick\'s signature is back. So is the hunt.',
      'Chapter four starts here.'
    ] }
  },

  exits: {
    walkaway: { title: 'The Road Again', text: [
      'You walk out of the back door with your bag on your shoulder and you don\'t look back at the photos. The rain has stopped. The road goes on the way roads do.',
      { if: 'ch==1', t: 'You never found out what was behind the garage door. Some nights, in other houses, you dream about green light under a door and a deep WHUMP you feel in your back teeth.' },
      { if: 'ch==2', t: 'You never found out what the people in grey wanted with you. You check over your shoulder for grey coveralls for the rest of your life.' },
      { if: 'clues>=3', t: 'You knew enough to guess. You chose not to finish guessing. That is a kind of wisdom too, the kind that keeps people alive.' },
      'Behind you, the house on Lindell Court waits, warm, with its back door unlocked and the strike plate in a sandwich bag. For whoever comes next. Somebody always does.'
    ] },
    lost: { title: 'Lost', text: [
      'You set the gun\'s dial to nothing in particular and fire it at the garage floor and step through.',
      'Where you land, the sky is purple and the grass is warm and the people, when they come, have no idea what a ledger is. You live there for a long time. You never find your way back. You never really try.',
      { if: 'mystery>=2', t: 'You wonder sometimes about the family behind the walls, and whether anyone moved in after you, and whether they leave the yogurt alone.' },
      'Nobody on Lindell Court ever sees you again. Dolores Pike writes it down: last seen going into the garage, green light, no further sightings.'
    ] },
    arrested: { title: 'Custody', text: [
      'They take you in. Breaking and entering, trespass, theft of yogurt, and a long list of things the detectives write down and then cross out because they don\'t know what to call them.',
      'You tell them the truth: the notes, the hum, the portals. They have you evaluated. Twice.',
      { if: 'rep:dolores>=2', t: 'Dolores Pike comes to the hearing in her best coat, sits in the front row and types up her own transcript on a portable machine. She testifies, unprompted and at length, that you were a good tenant. The judge gives you ninety days.' },
      { if: 'rep:dolores<2', t: 'You get eighteen months. Nobody comes to the hearing.' },
      'When you get out, the house on Lindell Court has a For Sale sign in the front yard. The sign says SOLD. You never find out who bought it. But one night, walking past, you see green light under the garage door.'
    ] },
    reclaimer: { title: 'Number Two Hundred and One', text: [
      'They give you grey coveralls and a number stencilled on the chest: 201. The first adult in the camp who isn\'t a Morty or a Smith.',
      'You learn their ledgers. You learn to read the needles. You eat at the mess fire and laugh at the jokes about Ricks hiding in pickles.',
      { if: 'ninetytwo_recruit | rep:ninetytwo>=2', t: 'Ninety-Two looks at you across the fire your first night like you\'ve betrayed something. Later, he sits next to you anyway. "You know they\'ll send you after your own house," he says. You nod. You knew.' },
      'Three weeks later the Foreman sends a team to Lindell Court. The ledger says the owner is gone. The claim is waiting, unread, for whoever moves in next.',
      'You know exactly what that means. You were bait. Now you\'re the hook.'
    ] },
    tollclerk: { title: 'Junior Assessor, East Booth', text: [
      'You sign. Vell stamps it. You get a coat, a booth, a pen, and a nameplate: ASSESSOR GRADY.',
      'The shifts are nineteen hours. The snow never lands. Nobody walks in on you, ever, because you are behind glass, and everyone who comes to the glass has to pay.',
      'You are good at it. You are fair. Travellers in six dimensions learn that the human at the east booth will let you pay in stories if you\'re short.',
      { if: 'deal_reclaimers | rep:reclaimers>=1', t: 'Sometimes grey coveralls come through your gate. You charge them full price. Every time.' },
      'Years later, a man in a wet fleece comes to your window with a cheap portal gun and a look you recognise, and you stamp his form FRIEND OF THE BOOTH, and give him a coat.'
    ] },
    cinderlord: { title: 'Brass & Grady', text: [
      'You stay in Cinderfall. The sign over the stall changes: BRASS & GRADY — RICK\'S JUNK AND OTHER MIRACLES.',
      'You learn to sleep through fire. You learn which of your customers are lying and which are lying in a useful way. Brass teaches you to haggle in eleven alphabets.',
      { if: 'knuckle_hired | knuckle_spared', t: 'Knuckle works the door. He has started laying bricks again in his spare time: a little wall at the back of the stall that nobody needs and everybody admires.' },
      'You never go back to Lindell Court. Sometimes a customer brings in something from there to sell: a recliner, a toaster, a photo of five people on a couch. You buy it all. You don\'t know why.'
    ] },
    jar: { title: 'Small', text: [
      'You do it the way the old man must have worked it out, with the jar on the bench and the dial and a long held breath. The garage gets very large. Then it is a sky.',
      'You land in a city where the people know your face, because it is on their coins and their temple and the first chapter of their holy book. You are, it turns out, their god. You are a very disappointing god. You mostly fix things.',
      { if: 'jar_god', t: 'They built you a house on the hill. It is modelled on the one in the sky they used to see through the glass. It has photos up. You leave them up.' },
      'No ledger in any dimension will ever find you here. Outside the glass, the garage goes dark when you stop being the battery\'s favourite thing to think about, and somebody upstairs, somewhere, will have to buy a new fridge.'
    ] },
    button: { title: 'Any Blue Button', text: [
      'You hold it down. You hold it down for a long time.',
      'The garage folds up like a letter. The house folds up after it. The cul-de-sac, the town, the rain: everything creases and turns and when it opens again you are standing in a garage that is almost exactly this one, in a house that is almost exactly this one, in a world where the man who owns it is called Hollis Grady and has never been homeless a day in his life.',
      'He is standing in the kitchen doorway in a dressing gown, looking at you with your own face. "Oh no," he says. "Not again."',
      { if: 'button_swap', t: 'You\'ve met. He\'s the one in the lab coat. He makes you tea. He says you can stay as long as you need. You don\'t know yet if that\'s generosity or a trap. You\'ve learned, in this story, that it can be both.' },
      'Behind you, somewhere back the way you came, a house on Lindell Court stands empty again with its back door unlocked.'
    ] },
    bloom: { title: 'Kept', text: [
      'You lie down on the soft white island and let the Drift keep you.',
      'It doesn\'t hurt. The spores fill you up like warm water. You forget the fire on Fourth Street, and the depot, and the rain. You remember everyone who ever walked here instead.',
      'In the grove of visitors there is a new statue, a man in a wet fleece looking back over his shoulder, and it is finished now. It is smiling.',
      { if: 'mystery>=2', t: 'Sometimes, in the slow green thinking of the Bloom, you feel a hinge, humming, very far away. You keep it safe. You promised.' },
      'Nobody ever finds you. You are the most found you have ever been.'
    ] }
  },

  epilogue: [
    /* people */
    { if: '(rep:dolores>=3 | dolores_ally_final) & !cap:dolores & !sold_dolores', t: 'Dolores Pike checks the street every forty minutes, as always. When she sees you, she flicks her porch light: once, for "all clear". It is the closest thing you have to a family on this side of the walls.' },
    { if: 'rep:dolores<=-2 & !cap:dolores & !sold_dolores', t: 'Dolores Pike has filled three notebooks about you. She has not given them to anyone. She keeps them in her freezer, in a bag marked PEAS, and you know it, and she knows you know.' },
    { if: 'cap:dolores', t: 'Dolores Pike is still upstairs. You keep meaning to decide what to do about that. Her nephew has stopped calling.' },
    { if: 'sold_dolores', t: 'The house across the street is dark. Nobody watches the cul-de-sac any more. You find that you miss it.' },
    { if: 'ninetytwo_recruit & !sold_out_92', t: 'Ninety-Two still makes terrible eggs. He has started drawing in a sketchbook: Ricks, Mortys, the house. In the newest one, you are standing in the garage doorway, and he has drawn you bigger than you are.' },
    { if: 'cap:ninetytwo', t: 'Ninety-Two is still your prisoner. He has stopped asking when you\'ll let him go. That is worse than the asking.' },
    { if: 'dead:ninetytwo', t: 'Behind the shed, under the mower, there is a boy who was fifteen. You don\'t mow that part of the lawn.' },
    { if: 'sold_ninetytwo', t: 'You hear, from a trader in Cinderfall, that a boy called Ninety-Two was bought by a mining world. You don\'t ask which one.' },
    { if: 'caretaker_gone', t: 'The Caretaker\'s core sits on the bench, warm, silent. Some nights you talk to it anyway.' },
    { if: 'caretaker_mine & !caretaker_gone', t: 'The Caretaker reports to you now. It is unfailingly polite, and slightly sad, and it has started to call you "boss" in a way that you suspect is a joke at your expense.' },
    { if: 'rep:caretaker>=3 & !caretaker_off & !caretaker_gone & !caretaker_mine', t: 'The Caretaker turns the lights off after you every night, room by room. "Goodnight, Hollis," it says. You have started saying it back.' },
    { if: 'caretaker_off & !caretaker_gone', t: 'The smoke detector\'s light stays dark. The house is quieter without it. Sometimes you think about flicking that switch back on.' },
    { if: 'axis:cinder=partner & !dead:brass', t: 'Brass sends a crate through every month: things to fix, things to sell, and once, inexplicably, a cake.' },
    { if: 'dead:brass', t: 'There is a brass statue in the Cinderfall market now, of a merchant mid-gesture. People leave chits at its feet. Nobody tells you who put it there.' },
    { if: 'cap:brass', t: 'Brass sits in your garage, cooling slowly, and negotiates with you every morning for its release. It has made eleven offers. The latest is very good.' },
    { if: 'knuckle_hired', t: 'Knuckle sits on your front step like a garden ornament made of rock. The postman has stopped coming to the door. You don\'t mind.' },
    { if: 'dead:knuckle', t: 'There is a scorch mark on the garage floor in the shape of a big man. It will never come out.' },
    { if: 'rep:vell>=3 & !dead:vell', t: 'Every few months, a little transit seal arrives through the letterbox with no postage. On the back, in tiny perfect script: "FRIEND OF THE BOOTH."' },
    { if: 'dead:vell', t: 'You still have the form Vell stamped. Sometimes you take it out and look at it.' },
    { if: 'jerry_sheltered & !sold_out_smiths & !smi_dead', t: 'Jerry calls on Sundays. He has opened a business making hats for dogs. It is doing terribly. He has never been happier.' },
    { if: 'jerry_decoy', t: 'Nobody ever tells you what happened to the wet man you sent to the grey camp. You never ask.' },
    { if: 'smi_dead', t: 'There is a second photo in the hall now, one you didn\'t take. A family of five who almost had a home. You keep it straight.' },
    { if: 'sold_out_smiths', t: 'You saw a Jerry once more, months later, through the glass of a Reclaimer transport. He looked at you and didn\'t wave.' },
    { if: 'cap:foreman', t: 'The Foreman sits in your cell and reads the newspaper every morning. He says it\'s the first time in twenty years nobody has asked him for anything.' },
    { if: 'dead:foreman', t: 'Somebody else carries the Foreman\'s great ledger now. They have added your name to the first page.' },
    { if: 'spore_friend | spore_garden', t: 'In the corner of the garage, a small soft forest glows. It hums a little when you\'re sad. The robot arm has started watering it.' },
    { if: 'bot_watch', t: 'The little robot still sits at the garage window. "A car," it reports. "A cat. A woman, looking." It has never been happier.' },
    { if: 'car_fixed & !flew_away', t: 'Some nights you take the ship up over the cul-de-sac, just to look down at the lights. Six houses. One of them yours.' },
    { if: 'flew_away', t: 'The ship has a dent in its roof the shape of a garage door. You keep it that way.' },
    { if: 'dog_guard', t: 'Biscuit sleeps by the back door every night. He still growls at the basement. You have stopped asking him why.' },
    { if: 'dog_home & !dog_guard', t: 'Sometimes Biscuit gets out and runs the three streets to sit on your back step. You always walk him home. He always comes back.' },
    { if: 'jar_god', t: 'In a jar on the garage shelf, a hundred thousand tiny people still pray to your face. You have started leaving the garage light on for them.' },
    { if: 'jar_shaken', t: 'In a jar on the garage shelf, a small city is still rebuilding. It has a new word for earthquake. You suspect it is your name.' },
    { if: 'button_taped', t: 'The blue button under the bench is still taped over. DON\'T, it says, and underneath, in a boy\'s handwriting, "thank you".' },
    { if: 'button_swap', t: 'Every few months you get a postcard from a version of you in a lab coat. They are always about trucks.' },
    { if: 'pol_believed', t: 'The detective comes by once a year, off duty, and sits with you in the basement for an hour, listening to the heater. Neither of you says much.' },
    { if: 'pol_dead', t: 'The cul-de-sac is a crime scene for a month. When the tape comes down, the For Sale signs go up on four houses. Nobody wants to live near the Smith place any more.' },
    { if: 'sold_out_jerry', t: 'A man who says he is Jerry Smith is awaiting trial for the disappearance of his own family. His lawyer is a Jerry too. It is going badly.' },
    { if: 'ric_partner', t: 'The other Rick lives in the recliner now. He teaches you something every night and insults you while he does it. You are learning faster than you ever have.' },
    { if: 'ric_caught', t: 'There is a Rick strapped into the recliner in your living room. He has started watching cooking shows. He says the restraints are "honestly very comfortable".' },
    { if: 'ric_dead', t: 'You buried the other Rick in the yard, next to the dog house. Someone, the next morning, had planted a single flower on the grave. You didn\'t ask who.' },
    { if: 'household', t: 'Dinner is at seven. Jerry cooks, badly. Ninety-Two cooks, worse. You wash up. It is, by any definition you know, a family.' },
    { if: 'axis:prisoners=freed', t: 'Every prisoner you ever held walked out of your garage free. Some of them send word now and then. One sends a cake every year, which is either gratitude or a threat.' },
    { if: 'axis:prisoners=kept', t: 'The cell in the corner of the garage is never empty now. You feed them well. You tell yourself that matters.' },
    { if: 'axis:prisoners=recruited', t: 'The people who used to be your prisoners run the garage night shift now. They call you boss. Two of them mean it.' },
    { if: 'axis:prisoners=sold', t: 'You sold your prisoners. The money lasted a season. The faces have lasted longer.' },
    { if: 'axis:prisoners=executed', t: 'Nothing grows in the far corner of the yard. Animals won\'t go near it. Neither will you.' },
    { if: 'rec_audited', t: 'The Reclaimers are still being audited. Their leader writes you a letter every month asking for help with the forms.' },
    { if: 'rec_sold_brass', t: 'You think about the Reclaimer leader\'s face sometimes. "We were the ones who got sold." He was right. You did it anyway.' },
    { if: 'smi_dolores', t: 'Across the street, a family of Smiths who aren\'t the Smiths lives with Dolores Pike. Their Jerry mows both lawns. Their Beth and Dolores play cards on Thursdays and cheat.' },
    { if: 'tol_spored', t: 'Somewhere in Pallid Reach there is an Auditor who cannot remember why it once came to your kitchen, and who has started, very quietly, to write poetry.' },
    { if: 'blessed', t: 'Sometimes, when you\'re hurt, your hands go cold like blue fire, and you heal faster than you should.' },
    { if: 'paid_toll', t: 'The clerks at the Reach still nod to you. You paid one of his tolls. Nobody else ever did.' },
    { if: 'ric_sold_92', t: 'Ninety-Two doesn\'t talk about the old man in the chair. Neither do you. Some nights you hear him up late, drawing Ricks in his sketchbook and crossing them out.' },
    /* worlds */
    { if: 'axis:reach=allied', t: 'In Pallid Reach, the toll gate is closed to grey coveralls for good. The clerks keep a coat in your size at the east booth.' },
    { if: 'axis:reach=ruined', t: 'In Pallid Reach, six roads of ice lead to nowhere. The clerks have built a memorial out of broken glass. It has your name on it, in a column headed OUTSTANDING.' },
    { if: 'axis:reach=deal', t: 'In Pallid Reach, the grey camp toasts your name at the fire, the man who made a deal. You are not sure that\'s a compliment.' },
    { if: 'axis:reach=claimed', t: 'Twelve percent of every toll in Pallid Reach arrives in your garage every quarter, in a little crate, with a form. You have never once filled in the form.' },
    { if: 'axis:cinder=burned', t: 'In Cinderfall, people are afraid of fire again. They have a word for blue flame now. It is your surname.' },
    { if: 'axis:cinder=rival', t: 'Your stall in Cinderfall still says GRADY & NOBODY. Brass rings its bell at it every morning. You ring yours back.' },
    { if: 'axis:cinder=cheated', t: 'In Cinderfall, there is a price on your head. It is very precisely calculated.' },
    { if: 'axis:drift=friend', t: 'In the Drift, in the grove of visitors, your statue faces forward now. It is smiling, a little.' },
    { if: 'axis:drift=grafted', t: 'The root under the skin of your wrist hums when you\'re near a lie. You hear it a lot.' },
    { if: 'axis:drift=burned', t: 'There is a dead world where the Drift was. Some nights you smell smoke and forest in the garage, and nothing is burning.' },
    { if: 'axis:drift=harvested', t: 'You are richer than you have ever been. The Drift is quieter than it has ever been. The two facts sit side by side in you and don\'t talk.' },
    /* the shape of you */
    { if: 'kills>=4', t: 'You count it once, late at night, on your fingers. Then you stop counting. You know which kind of man stops counting.' },
    { if: 'kills==0 & !axis:climax=killed', t: 'You never killed anyone. In a story full of guns and graves, that is a stranger and harder thing than it sounds.' },
    { if: 'captives>=2', t: 'Your cell is full. Feeding everyone costs a fortune. You have become, without meaning to, a jailer with a very large grocery bill.' },
    { if: 'signed_claim', t: 'Your name is on the paper on the garage wall, under his. Every ledger in four dimensions reads it. You signed it yourself. Nobody made you.' },
    { if: 'mystery==0', t: 'You never did work out what was going on in that house. The footsteps, the yogurt, the hum. Some mysteries you live with. You live with this one.' },
    { if: 'mystery==1', t: 'You have a theory about the family. It sounds insane out loud. You have stopped saying it out loud.' },
    { if: 'saw_dead_rick', t: 'You think about the man in the ice sometimes, numbered, with the tally marks above him. You think about how close it came to being someone you know.' },
    { if: 'forgave_self', t: 'You don\'t dream about Fourth Street any more.' },
    { if: 'grudge_kept', t: 'You still dream about the landlord. In the dream, you always find him.' },
    { if: 'offered_peace & !sold_out_family', t: 'Every night there is a plate on the kitchen table: onions and eggs, hot. You never see who leaves it. You always eat it.' },
    { if: 'sold_out_family', t: 'Some nights you go down to the basement and put your hand on the heater, and it is cold, and you go back upstairs, and you don\'t sleep.' },
    /* early exits only */
    { exit: true, if: 'item:portalgun & !axis:exit=lost', t: 'The portal gun stays on its hook in the garage. Whoever finds it next will have a very strange week.' },
    { exit: true, if: 'cap:ninetytwo | cap:dolores | cap:vell | cap:knuckle | cap:foreman', t: 'You left someone tied up behind you. You think about that more than you think about anything else.' },
    { exit: true, if: 'ninetytwo_recruit', t: 'Ninety-Two waits a week in the garage for you to come back. Then he takes the last of the beans and goes.' }
  ]
});
