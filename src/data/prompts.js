// Intensity 1-2: icebreaker/safe  |  3: spicy  |  4: chaotic  |  5: unhinged (chaos > 70%)
// category colors defined in GameScreen.jsx

export const PROMPTS = [
  // ─── ICEBREAKER ──────────────────────────────────────────
  { id: 'ice_01', category: 'icebreaker', intensity: 1, text: 'Everyone points at who they\'d call first if they needed bail money. Most pointed at: drinks.' },
  { id: 'ice_02', category: 'icebreaker', intensity: 1, text: 'Vote: who here would accidentally join a pyramid scheme? They drink.' },
  { id: 'ice_03', category: 'icebreaker', intensity: 1, text: 'Show your lock screen. Most embarrassing one: chooses who drinks.' },
  { id: 'ice_04', category: 'icebreaker', intensity: 1, text: 'Everyone who has texted the wrong person this week: drink.' },
  { id: 'ice_05', category: 'icebreaker', intensity: 1, text: 'Vote: who would survive longest in the wilderness? Last place: drinks.' },
  { id: 'ice_06', category: 'icebreaker', intensity: 1, text: 'Most unread notifications right now? That person drinks twice.' },
  { id: 'ice_07', category: 'icebreaker', intensity: 1, text: 'Everyone who has googled their own name: drink.' },
  { id: 'ice_08', category: 'icebreaker', intensity: 1, text: 'Whoever has gone down a Wikipedia rabbit hole in the last 48 hours: drink.' },
  { id: 'ice_09', category: 'icebreaker', intensity: 1, text: 'Vote: who is most likely to start drama at a family dinner? They drink.' },
  { id: 'ice_10', category: 'icebreaker', intensity: 1, text: 'Show the last photo you took. Most boring photo: drink.' },
  { id: 'ice_11', category: 'icebreaker', intensity: 1, text: 'Everyone who has faked being busy to avoid plans: drink.' },
  { id: 'ice_12', category: 'icebreaker', intensity: 1, text: 'Vote: who would make the worst superhero? They drink.' },
  { id: 'ice_13', category: 'icebreaker', intensity: 1, text: 'Everyone who has triple-texted someone this month: drink.' },
  { id: 'ice_14', category: 'icebreaker', intensity: 1, text: 'Who has the most screenshots of other people\'s stories? They drink.' },
  { id: 'ice_15', category: 'icebreaker', intensity: 1, text: 'Vote: who would be most likely to end up in a documentary? They drink.' },
  { id: 'ice_16', category: 'icebreaker', intensity: 2, text: 'Reveal your weirdest guilty pleasure. Group votes most unhinged: assigns 2 drinks.' },
  { id: 'ice_17', category: 'icebreaker', intensity: 2, text: 'Everyone who has replied "on my way" while still in bed: drink.' },
  { id: 'ice_18', category: 'icebreaker', intensity: 2, text: 'Vote: who is most likely to move to a different country on a complete whim? They drink.' },
  { id: 'ice_19', category: 'icebreaker', intensity: 2, text: 'Most recently downloaded app? If it\'s a game: drink twice.' },
  { id: 'ice_20', category: 'icebreaker', intensity: 2, text: 'Vote: who would get scammed first? They drink proudly.' },

  // ─── STORYTIME ────────────────────────────────────────────
  { id: 'story_01', category: 'storytime', intensity: 2, text: 'Tell your most embarrassing drunk moment in 20 seconds. Everyone who laughs: drinks.' },
  { id: 'story_02', category: 'storytime', intensity: 2, text: 'What\'s the dumbest lie you\'ve ever confidently told? If anyone calls BS: you drink twice.' },
  { id: 'story_03', category: 'storytime', intensity: 2, text: 'Describe your worst date in 30 seconds. Group rates it 1-10. If 8+: assign 2 drinks.' },
  { id: 'story_04', category: 'storytime', intensity: 2, text: 'Tell a story where you thought you were being smooth but absolutely weren\'t. Everyone who cringes: drinks.' },
  { id: 'story_05', category: 'storytime', intensity: 2, text: 'What\'s the most embarrassing autocorrect you\'ve sent? If it involved a parent: drink twice.' },
  { id: 'story_06', category: 'storytime', intensity: 2, text: 'Describe your most chaotic family member in exactly 10 words. Group votes funniest: assigns drinks.' },
  { id: 'story_07', category: 'storytime', intensity: 2, text: 'Tell your go-to excuse when you\'re late. If anyone\'s heard it before: drink.' },
  { id: 'story_08', category: 'storytime', intensity: 3, text: 'Tell the story of the worst advice you\'ve ever given. If it backfired badly: drink twice.' },
  { id: 'story_09', category: 'storytime', intensity: 3, text: 'Describe your most savage breakup or rejection in 20 seconds. Group votes spiciest: 2 drinks.' },
  { id: 'story_10', category: 'storytime', intensity: 3, text: 'What\'s your most regrettable online purchase? Most embarrassing one: assigns 2 drinks.' },
  { id: 'story_11', category: 'storytime', intensity: 3, text: 'Tell about a time you confidently did something completely wrong in public.' },
  { id: 'story_12', category: 'storytime', intensity: 3, text: 'What\'s the most chaotic group chat you\'re currently in? Show the last message. Most wild: assigns drinks.' },
  { id: 'story_13', category: 'storytime', intensity: 2, text: 'Describe the moment you realized YOU were actually the problem. Everyone who nods: drinks.' },

  // ─── EXPOSED / VOTING ────────────────────────────────────
  { id: 'exp_01', category: 'exposed', intensity: 2, text: 'Point at the biggest red flag in the room. Most pointed at: 2 drinks.' },
  { id: 'exp_02', category: 'exposed', intensity: 2, text: 'Vote: who is most likely to ghost someone they\'ve been seeing for 3 months? They drink.' },
  { id: 'exp_03', category: 'exposed', intensity: 2, text: 'Vote: who would turn on the group first if interrogated by police? They drink.' },
  { id: 'exp_04', category: 'exposed', intensity: 2, text: 'Who is most likely to be awake at 4am tonight? That person drinks — they know why.' },
  { id: 'exp_05', category: 'exposed', intensity: 2, text: 'Vote: who would make the worst roommate? They drink.' },
  { id: 'exp_06', category: 'exposed', intensity: 2, text: 'Point at who you\'d choose to negotiate a hostage situation. Least pointed at: drinks.' },
  { id: 'exp_07', category: 'exposed', intensity: 3, text: 'Vote: who has the most chaotic love life right now? Most votes: reveals one detail.' },
  { id: 'exp_08', category: 'exposed', intensity: 3, text: 'Vote: who is most likely to cry during this game tonight? They can preemptively drink.' },
  { id: 'exp_09', category: 'exposed', intensity: 3, text: 'Point at who you think is most delusional about a current life situation. Most pointed at: drinks.' },
  { id: 'exp_10', category: 'exposed', intensity: 3, text: 'Vote: who would be first to sell out their principles for money? No judgment. They drink.' },
  { id: 'exp_11', category: 'exposed', intensity: 3, text: 'Who has gone through someone\'s social media further back than 2019? Guilty parties drink.' },
  { id: 'exp_12', category: 'exposed', intensity: 3, text: 'Vote: who here is the main character of their own delusion? They drink proudly.' },
  { id: 'exp_13', category: 'exposed', intensity: 3, text: 'Point at who you trust LEAST with a secret. Most pointed at gets no secrets told about them tonight.' },
  { id: 'exp_14', category: 'exposed', intensity: 2, text: 'Vote: who canceled plans via text and then immediately posted to their stories? Obvious drinkers: sip.' },
  { id: 'exp_15', category: 'exposed', intensity: 3, text: 'Vote: who would be first to abandon everyone during a zombie apocalypse? They drink twice.' },
  { id: 'exp_16', category: 'exposed', intensity: 3, text: 'Everyone rates the most dramatic person here on a scale of 1-10. If the person disagrees with their average: drink.' },

  // ─── DARE ─────────────────────────────────────────────────
  { id: 'dare_01', category: 'dare', intensity: 3, text: 'Swap phones with someone for the next 2 minutes. No private messages. Honor system.' },
  { id: 'dare_02', category: 'dare', intensity: 3, text: 'Let the group pick a GIF to send to the last person you texted.' },
  { id: 'dare_03', category: 'dare', intensity: 3, text: 'Speak in the worst accent you can do until your next turn, or drink.' },
  { id: 'dare_04', category: 'dare', intensity: 4, text: 'Send "we need to talk 🙂" to a random contact. Show their response next round.' },
  { id: 'dare_05', category: 'dare', intensity: 3, text: 'Show the group your Spotify wrapped or most played song. Most embarrassing: 2 drinks.' },
  { id: 'dare_06', category: 'dare', intensity: 3, text: 'Do your best impression of someone NOT in this room. Group votes: under 5/10 → drink.' },
  { id: 'dare_07', category: 'dare', intensity: 3, text: 'Read your most unhinged sent text from the last week out loud.' },
  { id: 'dare_08', category: 'dare', intensity: 3, text: 'Do a dramatic reading of your most recent mundane text conversation.' },
  { id: 'dare_09', category: 'dare', intensity: 3, text: 'Let the group scroll your Instagram explore page for 30 seconds. No closing it.' },
  { id: 'dare_10', category: 'dare', intensity: 3, text: 'Do a 10-second stand-up bit about yourself. If nobody laughs: drink.' },
  { id: 'dare_11', category: 'dare', intensity: 3, text: 'Text your mom/dad a random emoji with no context. Show their response.' },
  { id: 'dare_12', category: 'dare', intensity: 3, text: 'Talk about yourself in third person for the next 2 rounds or drink every time you break.' },
  { id: 'dare_13', category: 'dare', intensity: 3, text: 'Respond to the next 3 things anyone says using only song lyrics.' },
  { id: 'dare_14', category: 'dare', intensity: 4, text: 'Let the group compose a message from your account using voice-to-text. Read it aloud — you decide if you send it.' },
  { id: 'dare_15', category: 'dare', intensity: 3, text: 'Show the group a photo you took alone this week. Most unhinged one: wins nothing but eternal respect.' },
  { id: 'dare_16', category: 'dare', intensity: 3, text: 'Put your last 5 Google searches in the group chat. Most embarrassing: 2 drinks.' },
  { id: 'dare_17', category: 'dare', intensity: 3, text: 'Tell your villain origin story in 30 seconds. Most dramatic delivery: assigns 2 drinks.' },
  { id: 'dare_18', category: 'dare', intensity: 4, text: 'Call or FaceTime someone the group picks. Must keep them on for at least 30 seconds.' },
  { id: 'dare_19', category: 'dare', intensity: 3, text: 'Reenact your most-used emoji with your whole body. Group votes accuracy.' },
  { id: 'dare_20', category: 'dare', intensity: 3, text: 'Show your most embarrassing Amazon or shopping search. No hiding it.' },

  // ─── VOTING GAME ─────────────────────────────────────────
  { id: 'vote_01', category: 'voting', intensity: 2, text: 'Everyone votes: who here would survive longest in a horror movie? Last place: drinks.' },
  { id: 'vote_02', category: 'voting', intensity: 2, text: 'Vote: who would win a roast battle? Everyone else drinks.' },
  { id: 'vote_03', category: 'voting', intensity: 3, text: 'Vote: who is the most likely to have a secret life nobody knows about? They reveal one interesting fact.' },
  { id: 'vote_04', category: 'voting', intensity: 3, text: 'Vote: who has the worst taste in partners? Most votes: assigns 2 drinks.' },
  { id: 'vote_05', category: 'voting', intensity: 2, text: 'Vote: who here gives the best advice? They assign everyone else a drink.' },
  { id: 'vote_06', category: 'voting', intensity: 3, text: 'Vote: who is most likely to accidentally go viral this year? They drink.' },
  { id: 'vote_07', category: 'voting', intensity: 2, text: 'Vote: who would be first to cry in a fight? They drink.' },
  { id: 'vote_08', category: 'voting', intensity: 3, text: 'Vote: most likely to be late to their own wedding? They drink twice.' },
  { id: 'vote_09', category: 'voting', intensity: 3, text: 'Vote: who would last longest if they had to delete all social media? Winner assigns drinks.' },
  { id: 'vote_10', category: 'voting', intensity: 2, text: 'Vote: who here has the most chaotic morning routine? Most votes: describe it.' },

  // ─── HOT SEAT ─────────────────────────────────────────────
  { id: 'seat_01', category: 'hot_seat', intensity: 3, text: '🎯 HOT SEAT — Host picks a player. Everyone has 30 seconds to ask them one question. They must answer instantly or drink.' },
  { id: 'seat_02', category: 'hot_seat', intensity: 3, text: '🎯 HOT SEAT — Host picks a player. Everyone rates their rizz 1-10. Average under 6: they drink twice.' },
  { id: 'seat_03', category: 'hot_seat', intensity: 3, text: '🎯 HOT SEAT — Host picks a player. What was your villain era and why? 30 seconds. Go.' },
  { id: 'seat_04', category: 'hot_seat', intensity: 4, text: '🎯 HOT SEAT — Host picks a player. Everyone shares their honest first impression of this person. Most unexpected one: gets to assign drinks.' },
  { id: 'seat_05', category: 'hot_seat', intensity: 3, text: '🎯 HOT SEAT — Host picks a player. Defend yourself from the accusation: "You are the most chaotic person here."' },
  { id: 'seat_06', category: 'hot_seat', intensity: 4, text: '🎯 HOT SEAT — Host picks a player. The group has 45 seconds to roast you. If you laugh even once: drink.' },
  { id: 'seat_07', category: 'hot_seat', intensity: 3, text: '🎯 HOT SEAT — Host picks a player. Everyone says one word that describes this person. If they disagree with all of them: drink.' },
  { id: 'seat_08', category: 'hot_seat', intensity: 3, text: '🎯 HOT SEAT — Host picks a player. Rate everyone\'s vibe tonight 1-10 out loud. Most honest rating: assigns drinks.' },
  { id: 'seat_09', category: 'hot_seat', intensity: 4, text: '🎯 HOT SEAT — Host picks a player. Which of your current problems is entirely your own fault? Be honest.' },
  { id: 'seat_10', category: 'hot_seat', intensity: 3, text: '🎯 HOT SEAT — Host picks a player. If your life were a TV show: what\'s tonight\'s episode title?' },
  { id: 'seat_11', category: 'hot_seat', intensity: 3, text: '🎯 HOT SEAT — Host picks a player. What\'s something you genuinely believe that most people would call delusional?' },
  { id: 'seat_12', category: 'hot_seat', intensity: 4, text: '🎯 HOT SEAT — Host picks a player. Tell us your most chaotic late-night decision and why you absolutely don\'t regret it.' },

  // ─── RULES ────────────────────────────────────────────────
  { id: 'rule_01', category: 'rule', intensity: 2, text: '📋 NEW RULE: Anyone who says "like" must sip. This rule lasts until the next rule card. Add it to active rules.' },
  { id: 'rule_02', category: 'rule', intensity: 3, text: '📋 NEW RULE: Every time someone laughs, they drink. Good luck. Add it to active rules.' },
  { id: 'rule_03', category: 'rule', intensity: 2, text: '📋 NEW RULE: No pointing with your finger — use your elbow only. Violations: drink. Add it.' },
  { id: 'rule_04', category: 'rule', intensity: 2, text: '📋 NEW RULE: The last person to speak before each new card must drink. Add it.' },
  { id: 'rule_05', category: 'rule', intensity: 3, text: '📋 NEW RULE: No one can say anyone\'s real name. Nicknames only. Violations: drink. Add it.' },
  { id: 'rule_06', category: 'rule', intensity: 2, text: '📋 NEW RULE: You must stand up every time you drink. Every. Single. Time. Add it.' },
  { id: 'rule_07', category: 'rule', intensity: 2, text: '📋 NEW RULE: The quietest person after each card drinks. Silence is punished. Add it.' },
  { id: 'rule_08', category: 'rule', intensity: 3, text: '📋 NEW RULE: All drinks must be announced: "I take this drink in honor of ___." Fill in the blank every time. Add it.' },
  { id: 'rule_09', category: 'rule', intensity: 3, text: '📋 NEW RULE: Anyone who checks their phone: drinks double. Group enforces this. Add it.' },
  { id: 'rule_10', category: 'rule', intensity: 2, text: '📋 NEW RULE: You must whisper for the next 2 rounds. Speak normally: drink. Add it.' },
  { id: 'rule_11', category: 'rule', intensity: 3, text: '📋 NEW RULE: Every statement must end with "...allegedly." Violations: drink. Add it.' },
  { id: 'rule_12', category: 'rule', intensity: 2, text: '📋 NEW RULE: Anyone who uses profanity must drink. (This one never lasts.) Add it.' },

  // ─── MINIGAME ─────────────────────────────────────────────
  { id: 'mini_01', category: 'minigame', intensity: 2, text: '⚡ THUMB WAR TOURNAMENT — Everyone pairs up. Winners advance. Losers at each stage drink.' },
  { id: 'mini_02', category: 'minigame', intensity: 2, text: '⚡ STARING CONTEST — Last two players stare each other down. First to blink drinks. Everyone watches.' },
  { id: 'mini_03', category: 'minigame', intensity: 2, text: '⚡ GROUP REFLEX — Host counts 3-2-1. Last person to touch the floor: drinks.' },
  { id: 'mini_04', category: 'minigame', intensity: 2, text: '⚡ WORD CHAIN — Go around naming things in a category (movies, animals, countries). Hesitate or repeat: drink.' },
  { id: 'mini_05', category: 'minigame', intensity: 2, text: '⚡ TWO TRUTHS ONE LIE — Quick round. Every wrong guess means the guesser drinks.' },
  { id: 'mini_06', category: 'minigame', intensity: 3, text: '⚡ SILENCE CHALLENGE — Everyone must be completely silent for 60 seconds. First sound: drink.' },
  { id: 'mini_07', category: 'minigame', intensity: 2, text: '⚡ COUNTDOWN — Count from 20 to 1 as a group, one number each person. Wrong number or hesitation: drink and restart.' },
  { id: 'mini_08', category: 'minigame', intensity: 2, text: '⚡ IMPRESSION BATTLE — Two players each impersonate the same person. Group votes. Loser drinks.' },
  { id: 'mini_09', category: 'minigame', intensity: 3, text: '⚡ EMOJI STORY — One person types a 6-emoji story in the chat. Others decode it. Funniest wrong answer: assigns drinks.' },
  { id: 'mini_10', category: 'minigame', intensity: 2, text: '⚡ PHONE SELFIE — Everyone takes a selfie simultaneously. Group votes worst photo: they set it as their lock screen for 5 mins.' },
  { id: 'mini_11', category: 'minigame', intensity: 2, text: '⚡ LAST LETTER — Word association where each word starts with the last letter of the previous word. Repeat or pause: drink.' },
  { id: 'mini_12', category: 'minigame', intensity: 2, text: '⚡ AIR DRAW — Someone draws an object in the air with their finger. First to guess right: assigns a drink.' },

  // ─── CALLBACK ────────────────────────────────────────────
  { id: 'cb_01', category: 'callback', intensity: 2, text: 'All active rules now stack for this round. Good luck surviving.' },
  { id: 'cb_02', category: 'callback', intensity: 2, text: 'The person who\'s been most sober so far must catch up. Group decides the amount.' },
  { id: 'cb_03', category: 'callback', intensity: 2, text: 'Everyone rates the night so far 1-10. Lowest scorer: assigns 2 drinks.' },
  { id: 'cb_04', category: 'callback', intensity: 3, text: 'Review all custom rules. Group votes one to be permanently doubled in punishment. Creator drinks once.' },
  { id: 'cb_05', category: 'callback', intensity: 2, text: 'The person who has laughed the most tonight must hold it together for 90 seconds. Every slip: drink.' },

  // ─── UNHINGED (intensity 4-5, only at chaos > 65%) ────────
  { id: 'uh_01', category: 'unhinged', intensity: 4, text: '🌡️ CHAOS MAX — Text your last situationship "hey stranger 😏" and show the response next round.' },
  { id: 'uh_02', category: 'unhinged', intensity: 5, text: '🌡️ CHAOS MAX — The group picks a contact. You call them and must convince them you\'re somewhere you\'re not. Keep it going 30 seconds.' },
  { id: 'uh_03', category: 'unhinged', intensity: 4, text: '🌡️ CHAOS MAX — Everyone shows their most recently deleted photo. Most chaotic: assigns 3 drinks.' },
  { id: 'uh_04', category: 'unhinged', intensity: 4, text: '🌡️ CHAOS MAX — Post a story with no caption and no context. No removing it for 10 minutes.' },
  { id: 'uh_05', category: 'unhinged', intensity: 4, text: '🌡️ CHAOS MAX — Everyone reveals the last lie they told. Biggest lie: 3 drinks.' },
  { id: 'uh_06', category: 'unhinged', intensity: 5, text: '🌡️ CHAOS MAX — Text the last person who canceled plans on you: "We still on?" and show the response.' },
  { id: 'uh_07', category: 'unhinged', intensity: 4, text: '🌡️ CHAOS MAX — Share your screen for 60 seconds. No minimizing apps. You choose what to show.' },
  { id: 'uh_08', category: 'unhinged', intensity: 4, text: '🌡️ CHAOS MAX — What\'s your current genuine life crisis? 20 seconds. No filter.' },
  { id: 'uh_09', category: 'unhinged', intensity: 5, text: '🌡️ CHAOS MAX — Let the group compose a Hinge/Bumble opener on your behalf. You read it aloud. The group decides if you send it.' },
  { id: 'uh_10', category: 'unhinged', intensity: 4, text: '🌡️ CHAOS MAX — Everyone types their honest current emotional state. Read it out loud. No deflecting.' },
  { id: 'uh_11', category: 'unhinged', intensity: 5, text: '🌡️ CHAOS MAX — The group writes your next Instagram bio. It stays until you replace it. Show us when you\'ve done it.' },
  { id: 'uh_12', category: 'unhinged', intensity: 4, text: '🌡️ CHAOS MAX — Read out loud the last voice message you received or recorded. No skipping.' },
  { id: 'uh_13', category: 'unhinged', intensity: 5, text: '🌡️ CHAOS MAX — Everyone writes an anonymous confession on a piece of paper. Host reads them all. Group guesses who wrote each one.' },
  { id: 'uh_14', category: 'unhinged', intensity: 4, text: '🌡️ CHAOS MAX — Text your most responsible contact: "I think I\'m making a mistake" and show their response.' },
  { id: 'uh_15', category: 'unhinged', intensity: 4, text: '🌡️ CHAOS MAX — Three players are nominated. Everyone votes on their most questionable life decision this year. Winner assigns 4 drinks.' },
]

export function pickCard(usedIds, chaosLevel) {
  const maxIntensity = chaosLevel < 25 ? 2 : chaosLevel < 50 ? 3 : chaosLevel < 70 ? 4 : 5
  const minIntensity = chaosLevel < 40 ? 1 : 2

  let pool = PROMPTS.filter(
    (p) =>
      !usedIds[p.id] &&
      p.intensity >= minIntensity &&
      p.intensity <= maxIntensity &&
      (p.category !== 'unhinged' || chaosLevel >= 65)
  )

  if (pool.length === 0) {
    pool = PROMPTS.filter((p) => p.intensity <= maxIntensity && (p.category !== 'unhinged' || chaosLevel >= 65))
  }

  return pool[Math.floor(Math.random() * pool.length)]
}

export const CATEGORY_META = {
  icebreaker: { label: 'Icebreaker', color: '#06b6d4', emoji: '🧊' },
  storytime:  { label: 'Story Time', color: '#10b981', emoji: '📖' },
  exposed:    { label: 'Exposed',    color: '#ec4899', emoji: '👀' },
  dare:       { label: 'Dare',       color: '#f97316', emoji: '🎯' },
  voting:     { label: 'Vote',       color: '#8b5cf6', emoji: '🗳️' },
  hot_seat:   { label: 'Hot Seat',   color: '#ef4444', emoji: '🔥' },
  rule:       { label: 'New Rule',   color: '#f59e0b', emoji: '📋' },
  minigame:   { label: 'Mini Game',  color: '#3b82f6', emoji: '⚡' },
  callback:   { label: 'Callback',   color: '#a855f7', emoji: '🔁' },
  unhinged:   { label: 'CHAOS MAX',  color: '#dc2626', emoji: '🌡️' },
}
