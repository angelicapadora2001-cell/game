export const FRIENDS_PROMPTS = [
  // ─── NOSTALGIA (intensity 1-2) ────────────────────────────
  { id: 'fr_no01', category: 'nostalgia', intensity: 1, text: 'Tell the group your first memory of meeting someone here. Most heartwarming: assigns 2 drinks.' },
  { id: 'fr_no02', category: 'nostalgia', intensity: 2, text: 'What\'s the most chaotic thing this friend group has ever done together? If everyone laughs: all drink.' },
  { id: 'fr_no03', category: 'nostalgia', intensity: 1, text: 'What\'s a running joke in this group that will never get old? Person who started it: assigns a drink.' },
  { id: 'fr_no04', category: 'nostalgia', intensity: 2, text: 'Tell the story of the worst trip or outing this group has been on. Hero of the story: assigns drinks.' },
  { id: 'fr_no05', category: 'nostalgia', intensity: 1, text: 'Who here made the best first impression on you? That person drinks (in a good way).' },
  { id: 'fr_no06', category: 'nostalgia', intensity: 2, text: 'What\'s something this group used to do that you genuinely miss? Most votes for same answer: all drink together.' },
  { id: 'fr_no07', category: 'nostalgia', intensity: 2, text: 'Name the best thing someone in this room has ever done for you. That person assigns 2 drinks.' },
  { id: 'fr_no08', category: 'nostalgia', intensity: 1, text: 'What\'s the funniest misunderstanding this friend group has ever had? Person responsible drinks.' },
  { id: 'fr_no09', category: 'nostalgia', intensity: 2, text: 'Tell the story of the moment you knew this group of people was your people. Most sentimental: drinks.' },
  { id: 'fr_no10', category: 'nostalgia', intensity: 1, text: 'What\'s a photo that exists of this group that should never be shared publicly? Person who has it: describes it.' },

  // ─── LOYALTY (intensity 2-3) ──────────────────────────────
  { id: 'fr_lo01', category: 'loyalty', intensity: 2, text: 'Who in this room would you call first in an actual emergency? That person drinks.' },
  { id: 'fr_lo02', category: 'loyalty', intensity: 2, text: 'Be honest: who here have you kept a secret for the longest? They drink (you\'re a real one).' },
  { id: 'fr_lo03', category: 'loyalty', intensity: 3, text: 'Who have you talked about behind their back the most? You don\'t have to say what you said. Just point. They drink.' },
  { id: 'fr_lo04', category: 'loyalty', intensity: 2, text: 'Vote: who here would show up at 2am with no explanation needed? Winner assigns 2 drinks.' },
  { id: 'fr_lo05', category: 'loyalty', intensity: 3, text: 'Has anyone here ever almost ended a friendship in this group? If yes, both parties drink and are forced to hug it out.' },
  { id: 'fr_lo06', category: 'loyalty', intensity: 2, text: 'Who in this group do you owe an apology to? You don\'t have to say what for. Just make eye contact and drink.' },
  { id: 'fr_lo07', category: 'loyalty', intensity: 2, text: 'Vote: who would drop everything for a friend in need with zero hesitation? That person assigns 3 drinks.' },
  { id: 'fr_lo08', category: 'loyalty', intensity: 3, text: 'Who here have you lied to most recently? You don\'t have to say what about. Just drink.' },
  { id: 'fr_lo09', category: 'loyalty', intensity: 2, text: 'Who\'s the person in this group who gives the best advice? They assign everyone else 1 drink.' },
  { id: 'fr_lo10', category: 'loyalty', intensity: 3, text: 'Tell the truth: have you ever told a secret someone trusted you with? If yes: drink twice. No judgment.' },

  // ─── RANKING (intensity 2-3) ──────────────────────────────
  { id: 'fr_rk01', category: 'ranking', intensity: 2, text: '📊 RANK IT — Everyone ranks who in the group is most likely to be late to their own funeral. Last place: drinks.' },
  { id: 'fr_rk02', category: 'ranking', intensity: 2, text: '📊 RANK IT — Everyone ranks who has the most chaotic approach to relationships. Most votes: tells one story.' },
  { id: 'fr_rk03', category: 'ranking', intensity: 3, text: '📊 RANK IT — Everyone privately ranks the friend group from most to least responsible. Host reads averages. Bottom of the list: drinks.' },
  { id: 'fr_rk04', category: 'ranking', intensity: 2, text: '📊 RANK IT — Who in this group could survive a month with no phone? Vote. Winner assigns 2 drinks.' },
  { id: 'fr_rk05', category: 'ranking', intensity: 3, text: '📊 RANK IT — Rank everyone in the group from most to least likely to accidentally start a business. Bottom: drinks.' },
  { id: 'fr_rk06', category: 'ranking', intensity: 2, text: '📊 RANK IT — Who here has changed the most in the last 2 years? Most votes: shares what changed.' },
  { id: 'fr_rk07', category: 'ranking', intensity: 3, text: '📊 RANK IT — Who in this room has the best and worst morning energy? Both extremes: drink.' },
  { id: 'fr_rk08', category: 'ranking', intensity: 2, text: '📊 RANK IT — Vote: who in the group is most likely to become famous? They assign 2 drinks.' },

  // ─── ROAST (intensity 3-4) ───────────────────────────────
  { id: 'fr_ro01', category: 'roast', intensity: 3, text: '🔥 ROAST — Everyone gets 10 seconds to roast the person on their left. Softest roast: must do it again, meaner.' },
  { id: 'fr_ro02', category: 'roast', intensity: 3, text: '🔥 ROAST — Group votes who has the most unhinged texting style. That person: reads their last 5 messages out loud.' },
  { id: 'fr_ro03', category: 'roast', intensity: 3, text: '🔥 ROAST — Who in this room has the worst fashion era? Group votes. That person describes the outfit.' },
  { id: 'fr_ro04', category: 'roast', intensity: 4, text: '🔥 ROAST — Hot seat: the group has 60 seconds to collectively roast one person (host picks). If they laugh: they drink.' },
  { id: 'fr_ro05', category: 'roast', intensity: 3, text: '🔥 ROAST — Everyone impersonates the same person in this room. Host picks who. Group votes best impression: assigns drinks.' },
  { id: 'fr_ro06', category: 'roast', intensity: 3, text: '🔥 ROAST — Who here has the most chaotic online activity? Show one embarrassing post, tweet, or screenshot from the archive.' },
  { id: 'fr_ro07', category: 'roast', intensity: 4, text: '🔥 ROAST — Vote: who in this group would make the worst employee? They give their defense speech. Unconvincing: drinks.' },
  { id: 'fr_ro08', category: 'roast', intensity: 3, text: '🔥 ROAST — Everyone completes the sentence: "[Person] is the type of person who ___." Group votes funniest: assigns drinks.' },

  // ─── CONFESS (intensity 3-4) ──────────────────────────────
  { id: 'fr_co01', category: 'confess', intensity: 3, text: '🤫 CONFESS — What\'s something you\'ve never admitted to anyone in this room? Start with "I\'ve never told anyone but..."' },
  { id: 'fr_co02', category: 'confess', intensity: 3, text: '🤫 CONFESS — Who\'s the last person in this group you vented about to someone outside the group? Make eye contact. Drink.' },
  { id: 'fr_co03', category: 'confess', intensity: 3, text: '🤫 CONFESS — What\'s the most selfish thing you\'ve done in a friendship? Most relatable: everyone drinks.' },
  { id: 'fr_co04', category: 'confess', intensity: 4, text: '🤫 CONFESS — What\'s one opinion you have about someone in this room you\'ve never said out loud? You can be vague.' },
  { id: 'fr_co05', category: 'confess', intensity: 3, text: '🤫 CONFESS — Who here did you judge when you first met them and then completely change your mind about? They drink (you were wrong).' },
  { id: 'fr_co06', category: 'confess', intensity: 4, text: '🤫 CONFESS — What\'s the biggest lie you\'ve told to avoid plans with this group? If anyone already knew: you both drink.' },
  { id: 'fr_co07', category: 'confess', intensity: 3, text: '🤫 CONFESS — Admit something you were wrong about that you\'d never have admitted in the moment.' },
  { id: 'fr_co08', category: 'confess', intensity: 3, text: '🤫 CONFESS — Who in this group do you think has changed the most, not necessarily for the better? You can be kind about it.' },

  // ─── CHALLENGE (intensity 2-3) ───────────────────────────
  { id: 'fr_ch01', category: 'challenge', intensity: 2, text: '⚡ CHALLENGE — Best friends quiz: write down 3 things your closest person in this room would order at a restaurant. Reveal and compare.' },
  { id: 'fr_ch02', category: 'challenge', intensity: 2, text: '⚡ CHALLENGE — Group charades — act out the funniest memory this group has. First person to guess: assigns a drink.' },
  { id: 'fr_ch03', category: 'challenge', intensity: 3, text: '⚡ CHALLENGE — Name every person in this room\'s last name. Miss one: drink per miss.' },
  { id: 'fr_ch04', category: 'challenge', intensity: 2, text: '⚡ CHALLENGE — Recreate the funniest photo in your friendship group chat right now. Best recreation: chooses who drinks.' },
  { id: 'fr_ch05', category: 'challenge', intensity: 2, text: '⚡ CHALLENGE — Everyone shares the last thing they searched in the group chat. Most embarrassing search: drinks.' },
  { id: 'fr_ch06', category: 'challenge', intensity: 3, text: '⚡ CHALLENGE — Group reaction race: host describes an emoji. First to find it: assigns a drink.' },
]

export const FRIENDS_CATEGORY_META = {
  nostalgia:  { label: 'Nostalgia',  color: '#f59e0b', emoji: '🕰️' },
  loyalty:    { label: 'Loyalty',    color: '#8b5cf6', emoji: '🤝' },
  ranking:    { label: 'Rank It',    color: '#3b82f6', emoji: '📊' },
  roast:      { label: 'Roast',      color: '#f97316', emoji: '🔥' },
  confess:    { label: 'Confess',    color: '#ec4899', emoji: '🤫' },
  challenge:  { label: 'Challenge',  color: '#10b981', emoji: '⚡' },
}
