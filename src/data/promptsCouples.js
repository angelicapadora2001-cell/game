export const COUPLES_PROMPTS = [
  // ─── SWEET (intensity 1-2) ────────────────────────────────
  { id: 'cp_sw01', category: 'sweet', intensity: 1, text: 'Tell the group how you knew this person was a keeper. Most romantic story: assigns 2 drinks.' },
  { id: 'cp_sw02', category: 'sweet', intensity: 1, text: 'Describe your partner in exactly 3 words. If they agree with all 3: skip your next drink.' },
  { id: 'cp_sw03', category: 'sweet', intensity: 1, text: 'What\'s one thing your partner does that secretly makes you smile every time?' },
  { id: 'cp_sw04', category: 'sweet', intensity: 1, text: 'Name the last time your partner genuinely surprised you in a good way.' },
  { id: 'cp_sw05', category: 'sweet', intensity: 1, text: 'Tell the group the most thoughtful thing your partner has ever done for you. Least romantic story: 2 drinks.' },
  { id: 'cp_sw06', category: 'sweet', intensity: 2, text: 'Both partners write down their #1 favorite memory together. If they match: everyone else drinks. If they don\'t: you both drink.' },
  { id: 'cp_sw07', category: 'sweet', intensity: 1, text: 'Rate your compatibility as travel partners 1-10. If you disagree by more than 2: debate it.' },
  { id: 'cp_sw08', category: 'sweet', intensity: 1, text: 'What song would play in the movie scene where you two first met?' },
  { id: 'cp_sw09', category: 'sweet', intensity: 1, text: 'Name one habit your partner has that you\'ve secretly adopted.' },
  { id: 'cp_sw10', category: 'sweet', intensity: 2, text: 'Without looking: what is your partner wearing right now? Wrong detail: drink.' },

  // ─── MEMORY (intensity 2) ─────────────────────────────────
  { id: 'cp_me01', category: 'memory', intensity: 2, text: 'Recreate your first date in 20 seconds. The other partner rates the accuracy.' },
  { id: 'cp_me02', category: 'memory', intensity: 2, text: 'Both partners: what was your honest first impression of each other? Read them out. Most different: drinks.' },
  { id: 'cp_me03', category: 'memory', intensity: 2, text: 'Who said "I love you" first? That person takes 2 drinks (you earned it).' },
  { id: 'cp_me04', category: 'memory', intensity: 2, text: 'What\'s the most embarrassing thing you\'ve done in front of your partner early on? Most relatable: everyone drinks.' },
  { id: 'cp_me05', category: 'memory', intensity: 2, text: 'What did your partner wear on your first date? Wrong: drink.' },
  { id: 'cp_me06', category: 'memory', intensity: 2, text: 'What was the first movie you ever watched together? Neither can remember: you both drink.' },
  { id: 'cp_me07', category: 'memory', intensity: 3, text: 'What\'s the biggest argument you\'ve had? The one who was wrong drinks 3.' },
  { id: 'cp_me08', category: 'memory', intensity: 2, text: 'Tell the group about a time your partner was completely your hero.' },
  { id: 'cp_me09', category: 'memory', intensity: 2, text: 'Where was your first kiss? If either of you got the location wrong: drink.' },
  { id: 'cp_me10', category: 'memory', intensity: 2, text: 'What\'s a trip you\'ve taken together that went completely sideways? Best disaster story: assigns drinks.' },

  // ─── CHALLENGE (intensity 2-3) ───────────────────────────
  { id: 'cp_ch01', category: 'challenge', intensity: 2, text: '🎯 CHALLENGE — Both draw the other person without looking. Worst portrait: the artist drinks.' },
  { id: 'cp_ch02', category: 'challenge', intensity: 3, text: '🎯 CHALLENGE — Without talking, communicate to your partner what you want to eat tonight. You have 30 seconds.' },
  { id: 'cp_ch03', category: 'challenge', intensity: 2, text: '🎯 CHALLENGE — Speed quiz: one partner asks 5 rapid questions, the other answers instantly. 1 drink per wrong answer.' },
  { id: 'cp_ch04', category: 'challenge', intensity: 3, text: '🎯 CHALLENGE — Both write down the other\'s biggest pet peeve. If you got it wrong: drink.' },
  { id: 'cp_ch05', category: 'challenge', intensity: 2, text: '🎯 CHALLENGE — Staring contest. First to blink: drinks. Everyone watches.' },
  { id: 'cp_ch06', category: 'challenge', intensity: 3, text: '🎯 CHALLENGE — Name 5 of your partner\'s closest friends in 10 seconds. Miss one: drink.' },
  { id: 'cp_ch07', category: 'challenge', intensity: 2, text: '🎯 CHALLENGE — Both mime the other\'s "annoyed face." Group votes most accurate: assigns a drink.' },
  { id: 'cp_ch08', category: 'challenge', intensity: 3, text: '🎯 CHALLENGE — Swap phones for 2 minutes. No deleting anything. Honor system.' },
  { id: 'cp_ch09', category: 'challenge', intensity: 2, text: '🎯 CHALLENGE — Partner quiz — answer simultaneously: who takes longer to get ready? Who apologizes first?' },
  { id: 'cp_ch10', category: 'challenge', intensity: 2, text: '🎯 CHALLENGE — Both partners text the same person (choose together) the same message at the same time. Go.' },

  // ─── DEEP (intensity 2-3) ────────────────────────────────
  { id: 'cp_dp01', category: 'deep', intensity: 2, text: 'Where do you see this relationship in 2 years? Both answer. If they\'re wildly different: drinks.' },
  { id: 'cp_dp02', category: 'deep', intensity: 2, text: 'What\'s one thing you\'ve compromised on for this relationship that you\'re genuinely okay with?' },
  { id: 'cp_dp03', category: 'deep', intensity: 3, text: 'What\'s something your partner does that you\'d like them to do more of? Answer honestly.' },
  { id: 'cp_dp04', category: 'deep', intensity: 2, text: 'If your relationship were a TV show, what genre is it? Both answer — if they don\'t match: drink.' },
  { id: 'cp_dp05', category: 'deep', intensity: 3, text: 'What\'s the most vulnerable you\'ve been with your partner? You don\'t have to share details. Just: did they show up for you?' },
  { id: 'cp_dp06', category: 'deep', intensity: 2, text: 'Name one thing you learned about yourself because of this relationship.' },
  { id: 'cp_dp07', category: 'deep', intensity: 3, text: 'What\'s one fear you haven\'t fully told your partner about? Share as much as you\'re comfortable with.' },
  { id: 'cp_dp08', category: 'deep', intensity: 2, text: 'What\'s the most controversial opinion you have about relationships that you\'ve never said out loud?' },
  { id: 'cp_dp09', category: 'deep', intensity: 3, text: 'What\'s the hardest thing you\'ve both navigated together? How did you get through it?' },
  { id: 'cp_dp10', category: 'deep', intensity: 2, text: 'Rate your communication 1-10 right now. If you disagree by 3+: that\'s a whole conversation.' },

  // ─── DARE / SPICY (intensity 3-4) ────────────────────────
  { id: 'cp_sp01', category: 'spicy', intensity: 3, text: 'Tell the group one chaotic thing you\'ve done together that nobody here knows about.' },
  { id: 'cp_sp02', category: 'spicy', intensity: 3, text: 'Read your partner the last text you sent ABOUT them to someone else.' },
  { id: 'cp_sp03', category: 'spicy', intensity: 4, text: 'Slow dance for 30 seconds with no music. Everyone watches. No skipping this one.' },
  { id: 'cp_sp04', category: 'spicy', intensity: 4, text: 'One partner gives the other an unsolicited compliment. Group rates the sincerity 1-10. Under 6: drink.' },
  { id: 'cp_sp05', category: 'spicy', intensity: 3, text: 'What\'s something you find attractive about your partner that you\'ve never actually told them?' },
  { id: 'cp_sp06', category: 'spicy', intensity: 4, text: 'Recreate your most recent argument in 20 seconds. Whoever performs best: their partner drinks.' },
  { id: 'cp_sp07', category: 'spicy', intensity: 3, text: 'What does your partner do that drives you absolutely insane? You have 10 seconds. Be honest.' },
  { id: 'cp_sp08', category: 'spicy', intensity: 4, text: 'Group challenge: everyone rates each couple\'s chemistry 1-10. Average under 7: that couple drinks.' },
  { id: 'cp_sp09', category: 'spicy', intensity: 3, text: 'Who is the better kisser in the relationship? Both point at the other. If they agree: that person does the bragging.' },
  { id: 'cp_sp10', category: 'spicy', intensity: 4, text: 'Tell the group the most embarrassing nickname you have for your partner that they actually respond to.' },

  // ─── VOTE / GROUP (intensity 2-3) ────────────────────────
  { id: 'cp_vo01', category: 'vote', intensity: 2, text: 'Everyone votes: which couple here is most likely to elope? That couple drinks.' },
  { id: 'cp_vo02', category: 'vote', intensity: 3, text: 'Everyone votes: who here is the most whipped in their relationship? Most votes: their partner assigns their drink.' },
  { id: 'cp_vo03', category: 'vote', intensity: 2, text: 'Everyone votes: which couple here has the best morning energy? Winners assign 2 drinks.' },
  { id: 'cp_vo04', category: 'vote', intensity: 3, text: 'Everyone votes: which couple here is most likely to adopt a random stray animal without discussing it first?' },
  { id: 'cp_vo05', category: 'vote', intensity: 3, text: 'Everyone votes: which partner in each couple makes the better decisions? Losers drink.' },
]

export const COUPLES_CATEGORY_META = {
  sweet:     { label: 'Sweet',     color: '#f472b6', emoji: '💕' },
  memory:    { label: 'Memory',    color: '#a78bfa', emoji: '📸' },
  challenge: { label: 'Challenge', color: '#fb923c', emoji: '🎯' },
  deep:      { label: 'Deep',      color: '#2dd4bf', emoji: '💭' },
  spicy:     { label: 'Spicy',     color: '#ef4444', emoji: '🌶️' },
  vote:      { label: 'Vote',      color: '#c084fc', emoji: '🗳️' },
}
