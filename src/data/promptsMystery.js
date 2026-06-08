// In Mystery mode, one player is secretly "The Traitor" (stored in room.agentId).
// Their device shows a subtle indicator. Prompts create suspicion.
// At game end, host can reveal the traitor.

export const MYSTERY_PROMPTS = [
  // ─── MISSION (intensity 2-3) ─────────────────────────────
  { id: 'my_mi01', category: 'mission', intensity: 2, text: '🎯 MISSION — The Traitor must privately complete this task: make someone say the word "right" in the next 3 minutes without asking directly. If they succeed: they assign 3 drinks. (Only the traitor knows this.)' },
  { id: 'my_mi02', category: 'mission', intensity: 2, text: '🎯 MISSION — The Traitor\'s silent objective: get the group to agree on something that benefits them. If nobody notices: 3 drink bonus.' },
  { id: 'my_mi03', category: 'mission', intensity: 3, text: '🎯 MISSION — The Traitor must avoid eye contact with one specific player this round. Can anyone notice who they\'re avoiding?' },
  { id: 'my_mi04', category: 'mission', intensity: 2, text: '🎯 MISSION — The Traitor must deflect the next question back to someone else within 5 seconds. If they do it smoothly: no drinks. If caught: 3 drinks.' },
  { id: 'my_mi05', category: 'mission', intensity: 3, text: '🎯 MISSION — The Traitor must say the word "honestly" at least once this round without it being suspicious. Success: assign 2 drinks.' },
  { id: 'my_mi06', category: 'mission', intensity: 2, text: '🎯 MISSION — The Traitor secretly picks an ally this round. They must protect that person from accusations. If the alliance is undetected: they share 4 drinks to assign.' },
  { id: 'my_mi07', category: 'mission', intensity: 3, text: '🎯 MISSION — The Traitor must make the group laugh this round. If they do: they escape the next accusation vote.' },

  // ─── ACCUSATION (intensity 2-4) ──────────────────────────
  { id: 'my_ac01', category: 'accusation', intensity: 2, text: '👆 ACCUSATION — Everyone points at who they think is acting most suspicious right now. Most pointed at: must defend themselves in 20 seconds.' },
  { id: 'my_ac02', category: 'accusation', intensity: 3, text: '👆 ACCUSATION — Go around the circle: each person names one "suspicious behavior" they\'ve noticed tonight from anyone. Most accused: drinks 2.' },
  { id: 'my_ac03', category: 'accusation', intensity: 3, text: '👆 ACCUSATION — Hot seat: the most "suspicious" player (group votes) must answer 3 rapid-fire questions. Hesitate: drink.' },
  { id: 'my_ac04', category: 'accusation', intensity: 4, text: '👆 ACCUSATION — Everyone writes who they think the Traitor is. Read them out. Most accused person: drinks 3. (No reveal yet.)' },
  { id: 'my_ac05', category: 'accusation', intensity: 2, text: '👆 ACCUSATION — Describe the Traitor without naming them. One sentence. Most accurate description wins (no one knows yet — save it for the reveal).' },
  { id: 'my_ac06', category: 'accusation', intensity: 3, text: '👆 ACCUSATION — Everyone states one thing the Traitor would NOT do. Most confident incorrect guess: drinks if they\'re wrong at reveal.' },
  { id: 'my_ac07', category: 'accusation', intensity: 4, text: '👆 ACCUSATION — The group has 2 minutes to collectively build their case. Who are you all MOST confident is the traitor? Lock in your answer.' },

  // ─── ALIBI (intensity 2-3) ───────────────────────────────
  { id: 'my_al01', category: 'alibi', intensity: 2, text: '🛡️ ALIBI — The most suspicious person (group decides) must explain why they\'re definitely NOT the traitor. Convincing: others drink. Unconvincing: they drink.' },
  { id: 'my_al02', category: 'alibi', intensity: 2, text: '🛡️ ALIBI — Everyone writes one thing they\'d do differently if THEY were the traitor. Funniest strategy: assigns 2 drinks.' },
  { id: 'my_al03', category: 'alibi', intensity: 3, text: '🛡️ ALIBI — The traitor (secretly) must give an alibi for a "suspicious moment" that happened this game. Everyone votes: believable or not? Group decides if they drink.' },
  { id: 'my_al04', category: 'alibi', intensity: 2, text: '🛡️ ALIBI — Everyone: if you were the traitor, what would have been your biggest mistake so far? Best answer: assigns drinks.' },
  { id: 'my_al05', category: 'alibi', intensity: 3, text: '🛡️ ALIBI — Group challenge: name one person who\'s been TOO helpful tonight. Most nominated: must justify themselves.' },

  // ─── VOTE (intensity 3-4) ────────────────────────────────
  { id: 'my_vo01', category: 'vote', intensity: 3, text: '🗳️ VOTE — Elimination round: everyone votes who to "eliminate" this round. Most votes: they drink 3 AND share their deepest suspicion before being "saved."' },
  { id: 'my_vo02', category: 'vote', intensity: 3, text: '🗳️ VOTE — Two rounds left. Go around: everyone states their final theory of who the traitor is and why. Group locks in votes.' },
  { id: 'my_vo03', category: 'vote', intensity: 4, text: '🗳️ VOTE — Final vote. Everyone commits: who is the Traitor? Point simultaneously. Then ask the host to reveal. Whoever guessed wrong: 3 drinks.' },
  { id: 'my_vo04', category: 'vote', intensity: 3, text: '🗳️ VOTE — Everyone writes their suspect on a piece of paper/phone. Host counts votes but doesn\'t reveal. Top suspect: must answer one "suspicious" question with complete honesty.' },
  { id: 'my_vo05', category: 'vote', intensity: 3, text: '🗳️ VOTE — Choose: does the group want to eliminate their #1 suspect now? Majority rules. If correct at reveal: traitor drinks 5. If wrong: accusers drink 3.' },

  // ─── BLUFF (intensity 3-4) ───────────────────────────────
  { id: 'my_bl01', category: 'bluff', intensity: 3, text: '🎭 BLUFF — Everyone must tell one true and one false "suspicious behavior" about themselves. Others guess which is which. Traitor: you\'re practicing your craft.' },
  { id: 'my_bl02', category: 'bluff', intensity: 3, text: '🎭 BLUFF — Everyone acts "suspicious" for 60 seconds. The actual Traitor must blend in by being LESS suspicious than everyone else.' },
  { id: 'my_bl03', category: 'bluff', intensity: 4, text: '🎭 BLUFF — Everyone makes a case for why they could be the traitor. Most convincing performance: assigns 2 drinks. Least convincing: drinks themselves.' },
  { id: 'my_bl04', category: 'bluff', intensity: 3, text: '🎭 BLUFF — One person is secretly given a "decoy" card (not the actual traitor). They must act suspicious. Can the group tell the difference?' },
  { id: 'my_bl05', category: 'bluff', intensity: 3, text: '🎭 BLUFF — Everyone writes a confession: "The most suspicious thing I\'ve done tonight is ___." Host reads them anonymously. Group guesses who wrote each one.' },

  // ─── REVEAL (intensity 4-5) ─────────────────────────────
  { id: 'my_rv01', category: 'reveal', intensity: 4, text: '🔍 CLUE DROP — The Traitor must now voluntarily drop one subtle (but true) clue about their identity. Make it hard. Make it fair.' },
  { id: 'my_rv02', category: 'reveal', intensity: 4, text: '🔍 CLUE DROP — Everyone states: "The Traitor is definitely NOT me because ___." The Traitor must lie convincingly.' },
  { id: 'my_rv03', category: 'reveal', intensity: 5, text: '🔍 FINAL REVEAL — Ask the host to tap "Reveal Traitor." All guesses lock in. Reveal now. Correct guessers: assign 3 drinks each. Traitor if unfound: assigns 5 drinks total.' },
]

export const MYSTERY_CATEGORY_META = {
  mission:    { label: 'Mission',    color: '#6366f1', emoji: '🎯' },
  accusation: { label: 'Accusation', color: '#ef4444', emoji: '👆' },
  alibi:      { label: 'Alibi',      color: '#0891b2', emoji: '🛡️' },
  vote:       { label: 'Vote',       color: '#7c3aed', emoji: '🗳️' },
  bluff:      { label: 'Bluff',      color: '#d97706', emoji: '🎭' },
  reveal:     { label: 'Reveal',     color: '#dc2626', emoji: '🔍' },
}
