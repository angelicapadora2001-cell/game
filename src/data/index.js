import { PROMPTS, CATEGORY_META as CHAOS_META } from './prompts'
import { COUPLES_PROMPTS, COUPLES_CATEGORY_META } from './promptsCouples'
import { FRIENDS_PROMPTS, FRIENDS_CATEGORY_META } from './promptsFriends'
import { MYSTERY_PROMPTS, MYSTERY_CATEGORY_META } from './promptsMystery'
import { GTK_PROMPTS, GTK_CATEGORY_META } from './promptsGetToKnow'

const MODE_DATA = {
  'chaos-rules': { prompts: PROMPTS,         meta: CHAOS_META },
  couples:       { prompts: COUPLES_PROMPTS,  meta: COUPLES_CATEGORY_META },
  friends:       { prompts: FRIENDS_PROMPTS,  meta: FRIENDS_CATEGORY_META },
  mystery:       { prompts: MYSTERY_PROMPTS,  meta: MYSTERY_CATEGORY_META },
  'get-to-know': { prompts: GTK_PROMPTS,      meta: GTK_CATEGORY_META },
}

export function getCategoryMeta(mode) {
  return MODE_DATA[mode]?.meta ?? CHAOS_META
}

export function pickCard(mode, usedIds, chaosLevel) {
  const allPrompts = MODE_DATA[mode]?.prompts ?? PROMPTS

  const maxIntensity = chaosLevel < 25 ? 2 : chaosLevel < 50 ? 3 : chaosLevel < 70 ? 4 : 5
  const minIntensity = chaosLevel < 40 ? 1 : 2

  let pool = allPrompts.filter(
    (p) =>
      !usedIds[p.id] &&
      p.intensity >= minIntensity &&
      p.intensity <= maxIntensity &&
      (p.category !== 'unhinged' || chaosLevel >= 65)
  )

  // Exhaust safety: reset used cards if pool is empty
  if (pool.length === 0) {
    pool = allPrompts.filter(
      (p) => p.intensity <= maxIntensity && (p.category !== 'unhinged' || chaosLevel >= 65)
    )
  }

  return pool[Math.floor(Math.random() * pool.length)] ?? allPrompts[0]
}
