let audioCtx = null

function ctx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return audioCtx
}

function tone({ freq = 440, dur = 0.1, type = 'sine', vol = 0.25, delay = 0 } = {}) {
  try {
    const c = ctx()
    const t = c.currentTime + delay
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    gain.gain.setValueAtTime(vol, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur)
    osc.start(t)
    osc.stop(t + dur)
  } catch (_) {}
}

export const sounds = {
  cardFlip() {
    tone({ freq: 900, dur: 0.06, vol: 0.12 })
    tone({ freq: 600, dur: 0.1, vol: 0.08, delay: 0.06 })
  },
  drink() {
    tone({ freq: 220, dur: 0.08, type: 'sine', vol: 0.2 })
    tone({ freq: 160, dur: 0.12, type: 'sine', vol: 0.15, delay: 0.08 })
  },
  gameStart() {
    [523, 659, 784, 1047].forEach((f, i) =>
      tone({ freq: f, dur: 0.18, vol: 0.18, delay: i * 0.13 })
    )
  },
  chaosUp() {
    tone({ freq: 350, dur: 0.25, type: 'sawtooth', vol: 0.12 })
    tone({ freq: 500, dur: 0.2, type: 'sawtooth', vol: 0.14, delay: 0.2 })
  },
  ruleAdded() {
    tone({ freq: 660, dur: 0.1, vol: 0.14 })
    tone({ freq: 880, dur: 0.12, vol: 0.1, delay: 0.1 })
  },
  playerJoin() {
    tone({ freq: 523, dur: 0.1, vol: 0.13 })
    tone({ freq: 659, dur: 0.1, vol: 0.1, delay: 0.11 })
  },
  error() {
    tone({ freq: 180, dur: 0.18, type: 'square', vol: 0.15 })
  },
  countdown() {
    tone({ freq: 440, dur: 0.05, type: 'square', vol: 0.08 })
  },
}
