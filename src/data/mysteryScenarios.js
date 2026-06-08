// Each scenario: setting, victim, 8 character slots, 5 real clues, 4 red herrings

export const MYSTERY_SCENARIOS = [
  {
    id: 'gala',
    name: 'The Midnight Gala',
    emoji: '🏛️',
    setting: 'A thunderstorm crashes outside the Harrington mansion. Champagne flows, secrets simmer, and someone didn\'t come just to celebrate.',
    victim: { name: 'Victor Harrington', role: 'The Host', description: 'A wealthy eccentric with a will nobody\'s seen yet and enemies on every floor.' },
    characters: [
      { name: 'Diana Cross',    bio: 'Personal lawyer',      motivation: 'A will change that cuts her commission in half' },
      { name: 'Marco Bell',     bio: 'Catering director',    motivation: 'Victor owes him three months of unpaid invoices' },
      { name: 'Sophie Crane',   bio: 'Estranged niece',      motivation: 'She\'s in the will — for now' },
      { name: 'Leo Ashford',    bio: 'Rival art collector',  motivation: 'Victor publicly humiliated him at auction last month' },
      { name: 'Priya Mehta',    bio: 'House physician',      motivation: 'She knows what\'s in his medical file and what it\'s worth' },
      { name: 'James Wolfe',    bio: 'Retired detective',    motivation: 'An old case Victor buried 15 years ago' },
      { name: 'Claire Fontaine',bio: 'Interior designer',    motivation: 'Victor canceled her contract and left her in debt' },
      { name: 'Nico Russo',     bio: 'Personal assistant',   motivation: 'He discovered something he was never meant to see' },
    ],
    realClues: [
      'A champagne flute with a smudged red lipstick print was found just outside the study door.',
      'Victor\'s phone shows an unsent message to "D.C." — "We need to talk tonight. No more delays."',
      'A monogrammed handkerchief with the initials "J.W." was found under the study desk.',
      'Security footage shows someone in a dark jacket entering the east hallway at 10:47pm.',
      'The study window was found unlocked — the bolt had been damaged recently, not tonight.',
    ],
    fakeClues: [
      'A half-eaten canapé near the scene — but the same ones were on every table.',
      'Victor\'s calendar had a dentist appointment tomorrow, suggesting no plan to flee.',
      'A guest reported raised voices — but it was the TV playing a crime drama in the lounge.',
      'The chandelier bulb was recently replaced — routine maintenance per the staff log.',
    ],
  },
  {
    id: 'station',
    name: 'Station Omega',
    emoji: '🚀',
    setting: 'Communications went dark 40 minutes ago. The crew of Station Omega is cut off, six months from Earth, and the Commander is missing.',
    victim: { name: 'Commander Vale', role: 'Station Commander', description: 'Decorated, secretive, and in possession of classified mission files no one else was cleared to read.' },
    characters: [
      { name: 'Dr. Sable',    bio: 'Chief medical officer',    motivation: 'Vale blocked her transfer request — again' },
      { name: 'Ensign Kira',  bio: 'Navigation specialist',    motivation: 'Vale reported her for a protocol breach she didn\'t commit' },
      { name: 'Tech Orin',    bio: 'Systems engineer',         motivation: 'He found an anomaly in the mission data Vale tried to bury' },
      { name: 'Lt. Reyes',    bio: 'Security officer',         motivation: 'Vale knew about his past identity and used it as leverage' },
      { name: 'Dr. Marsh',    bio: 'Astrophysicist',           motivation: 'Her research credit was stolen by Vale\'s report' },
      { name: 'Cpl. Vance',   bio: 'Supply coordinator',       motivation: 'Shipment records show missing rations — Vale had the only key' },
      { name: 'Pilot Dunn',   bio: 'Shuttle pilot',            motivation: 'Vale grounded her indefinitely over a disputed incident' },
      { name: 'Comms Chen',   bio: 'Communications officer',   motivation: 'She intercepted a transmission Vale wasn\'t meant to know about' },
    ],
    realClues: [
      'The commander\'s access card was used to enter Lab C at 02:14 station time — but Vale was reported in the bridge.',
      'A maintenance panel near the airlock was pried open recently. The tool marks are fresh.',
      'Station logs show an unauthorized file download from the classified drive at 01:58.',
      'Dr. Sable\'s medical scanner registered a sedative compound in the corridor near Quarters 7.',
      'A torn sleeve fragment matching Lt. Reyes\'s uniform was found near the secondary entrance.',
    ],
    fakeClues: [
      'An empty coffee mug in the lab — standard, everyone on the night shift drinks there.',
      'Vale\'s bunk was made unusually neatly — she was always meticulous, per all crew reports.',
      'A blinking panel light in the corridor — logged as a known electrical fault for weeks.',
      'Tech Orin was seen walking alone at 02:00 — standard for his overnight maintenance rounds.',
    ],
  },
  {
    id: 'merger',
    name: 'The Merger',
    emoji: '🏢',
    setting: 'It\'s 11pm in the Nexus Corp headquarters. The building should be empty. The merger papers were supposed to be signed by midnight. Now the CEO is dead and someone in this room did it.',
    victim: { name: 'Carlton Marsh', role: 'CEO', description: 'A ruthless executive who made enemies faster than money. The merger would have ruined at least three people in this building.' },
    characters: [
      { name: 'Vivian Cross',  bio: 'Chief Financial Officer',  motivation: 'The merger would reveal the numbers she\'s been hiding' },
      { name: 'Eli Towne',     bio: 'Lead attorney',            motivation: 'Carlton threatened to expose his involvement in a cover-up' },
      { name: 'Nadia Park',    bio: 'Product VP',               motivation: 'She was being pushed out — the merger was her last day' },
      { name: 'Simon Hartley', bio: 'Board director',           motivation: 'Carlton had enough dirt on him to end his career' },
      { name: 'Ren Okada',     bio: 'IT security head',         motivation: 'He found what Carlton had on the servers — and what was on him' },
      { name: 'Maggie Dunn',   bio: 'Executive assistant',      motivation: 'She was the only one who knew what Carlton was planning next' },
      { name: 'Tyler Brand',   bio: 'Competing CEO (rival firm)',motivation: 'The merger gave Nexus Corp everything he\'d spent a decade building' },
      { name: 'Dr. Lena Voss', bio: 'Corporate psychologist',   motivation: 'Carlton had her fired — then invited her back to witness his victory' },
    ],
    realClues: [
      'Carlton\'s office keypad was accessed at 10:52pm by a code belonging to someone who should have left at 9.',
      'A coffee cup on Carlton\'s desk tested positive for a common sedative compound.',
      'Carlton\'s email drafts show a message to the board titled "final list" — unsent, timestamp 10:48pm.',
      'The building\'s camera on floor 34 was remotely disabled at 10:40pm from an IT terminal.',
      'A torn business card from the rival firm was found in Carlton\'s jacket pocket.',
    ],
    fakeClues: [
      'The elevator went to floor 34 at 10:30 — but it was the cleaning crew doing their nightly round.',
      'Carlton\'s calendar shows a gym booking for tomorrow — proof of nothing, he booked them weekly.',
      'A coffee ring on the merger documents — Carlton was known for eating at his desk during late nights.',
      'Simon Hartley was overheard on the phone in the lobby — he was talking to his daughter.',
    ],
  },
]

export function getRandomScenario() {
  return MYSTERY_SCENARIOS[Math.floor(Math.random() * MYSTERY_SCENARIOS.length)]
}

export function assignRolesAndClues(players, scenario) {
  const pids = players.map(([pid]) => pid)
  const count = pids.length

  // Shuffle player order for role assignment
  const shuffled = [...pids].sort(() => Math.random() - 0.5)

  // Assign roles based on player count
  const roleList = ['murderer', 'accomplice', 'witness']
  if (count >= 6) roleList.push('detective')
  while (roleList.length < count) roleList.push('innocent')

  // Shuffle characters
  const chars = [...scenario.characters].sort(() => Math.random() - 0.5).slice(0, count)

  const murdererPid = shuffled[0]
  const murdererChar = chars[0]

  const roles = {}
  shuffled.forEach((pid, i) => {
    const role = roleList[i]
    const character = chars[i]
    let secretInfo = ''

    switch (role) {
      case 'murderer':
        secretInfo = `Your target: ${scenario.victim.name} — ${scenario.victim.description}\n\nYou choose WHEN to act. Timing is everything.`
        break
      case 'accomplice': {
        const murdererName = players.find(([p]) => p === murdererPid)?.[1]?.name ?? '?'
        secretInfo = `The Murderer is: ${murdererChar.name} (played by ${murdererName})\n\nHelp them escape. Misdirect suspicion. Win together.`
        break
      }
      case 'witness':
        secretInfo = `You saw something. Your clue: "${scenario.realClues[0]}"\n\nShare it carefully. If the murderer knows you saw, you become the next target.`
        break
      case 'detective':
        secretInfo = `Confirmed fact: "${scenario.realClues[1]}"\n\nThis is 100% true. Use it wisely.`
        break
      default: {
        const fakeClue = scenario.fakeClues[i % scenario.fakeClues.length]
        secretInfo = `Your tip: "${fakeClue}"\n\n(This may or may not be relevant.)`
      }
    }

    roles[pid] = { role, character: character.name, characterBio: character.bio, motivation: character.motivation, secretInfo, ready: false }
  })

  // Clue deck: 3 real + 2 fake, revealed during accusation
  const clues = [
    ...scenario.realClues.slice(2).map((t) => ({ text: t, isReal: true })),
    ...scenario.fakeClues.slice(2).map((t) => ({ text: t, isReal: false })),
  ].sort(() => Math.random() - 0.5)

  return { roles, clues }
}
