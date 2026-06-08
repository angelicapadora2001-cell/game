import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  subscribeToRoom,
  nextCard,
  assignDrink,
  addCustomRule,
  removeCustomRule,
  endGame,
} from '../firebase'
import { pickCard, getCategoryMeta } from '../data/index'
import { GAME_MODES } from '../data/gameModes'
import { sounds } from '../sounds'
import MysteryGame from './MysteryGame'

const ROUND_SECONDS = 30

export default function GameScreen({ roomCode, playerId, playerName, onLeave, showToast }) {
  const [room, setRoom] = useState(null)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [showRules, setShowRules] = useState(false)
  const [showDrinkPicker, setShowDrinkPicker] = useState(false)
  const [addingRule, setAddingRule] = useState(false)
  const [ruleInput, setRuleInput] = useState('')
  const [cardKey, setCardKey] = useState(0)
  const [showAgentReveal, setShowAgentReveal] = useState(false)
  const [traitorRevealed, setTraitorRevealed] = useState(false)
  const timerRef = useRef(null)
  const prevCardIdRef = useRef(null)
  const hasShownAgentReveal = useRef(false)

  const isHost = room?.hostId === playerId
  const isAgent = room?.agentId === playerId
  const gameMode = room?.gameMode ?? 'chaos-rules'
  const modeInfo = GAME_MODES[gameMode]
  const players = room ? Object.entries(room.players || {}) : []
  const customRules = room ? Object.entries(room.customRules || {}) : []
  const chaosLevel = room?.chaosLevel ?? 0
  const categoryMeta = getCategoryMeta(gameMode)

  // Show agent reveal once at game start for Mystery mode
  useEffect(() => {
    if (room && gameMode === 'mystery' && !hasShownAgentReveal.current) {
      hasShownAgentReveal.current = true
      setShowAgentReveal(true)
      setTimeout(() => setShowAgentReveal(false), 5000)
    }
  }, [room?.status, gameMode])

  useEffect(() => {
    const unsub = subscribeToRoom(roomCode, (data) => {
      if (!data) { showToast('Room was closed.'); onLeave(); return }
      setRoom(data)
      if (data.status === 'ended') { onLeave(); return }
      if (data.currentCard?.id !== prevCardIdRef.current) {
        if (prevCardIdRef.current !== null) {
          sounds.cardFlip()
          setCardKey((k) => k + 1)
        }
        prevCardIdRef.current = data.currentCard?.id ?? null
      }
    })
    return unsub
  }, [roomCode])

  // Sync countdown timer to cardShownAt
  useEffect(() => {
    if (!room?.cardShownAt) return
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - room.cardShownAt) / 1000
      const left = Math.max(0, Math.round(ROUND_SECONDS - elapsed))
      setTimeLeft(left)
      if (left <= 5 && left > 0) sounds.countdown()
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [room?.cardShownAt])

  const handleNextCard = useCallback(async () => {
    if (!isHost || !room) return
    const usedCardIds = { ...(room.usedCardIds || {}) }
    if (room.currentCard?.id) usedCardIds[room.currentCard.id] = true

    const newChaos = Math.min(100, chaosLevel + Math.floor(Math.random() * 4) + 3)
    if (newChaos >= 50 && chaosLevel < 50) sounds.chaosUp()
    if (newChaos >= 75 && chaosLevel < 75) sounds.chaosUp()

    const card = pickCard(gameMode, usedCardIds, newChaos)
    if (!card) return showToast('No more cards!')
    try {
      await nextCard(roomCode, card, (room.round || 0) + 1, newChaos, room.currentCard?.id)
    } catch (_) { showToast('Network error. Try again.') }
  }, [isHost, room, chaosLevel, roomCode, gameMode])

  async function handleAssignDrink(targetId) {
    try {
      await assignDrink(roomCode, targetId)
      sounds.drink()
      setShowDrinkPicker(false)
      showToast('🍺 Drink assigned!', 'success')
    } catch (_) { showToast('Failed to assign drink.') }
  }

  async function handleAddRule() {
    if (!ruleInput.trim()) return
    try {
      await addCustomRule(roomCode, ruleInput.trim())
      sounds.ruleAdded()
      setRuleInput('')
      setAddingRule(false)
      showToast('📋 Rule added!', 'success')
    } catch (_) { showToast('Failed to add rule.') }
  }

  async function handleRemoveRule(ruleId) {
    try { await removeCustomRule(roomCode, ruleId) } catch (_) {}
  }

  async function handleEndGame() {
    try { await endGame(roomCode) } catch (_) { showToast('Error ending game.') }
  }

  // Murder Mystery has its own full-screen component
  if (room?.gameMode === 'mystery') {
    return <MysteryGame roomCode={roomCode} playerId={playerId} onLeave={onLeave} showToast={showToast} />
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-4xl">{modeInfo?.emoji ?? '🎉'}</motion.div>
      </div>
    )
  }

  const card = room.currentCard
  const meta = card ? categoryMeta[card.category] : null
  const accent = modeInfo?.color ?? '#8b5cf6'

  const chaosColor = chaosLevel < 30 ? '#06b6d4' : chaosLevel < 55 ? '#8b5cf6' : chaosLevel < 75 ? '#f97316' : '#ef4444'
  const chaosLabel =
    chaosLevel < 25 ? 'WARMING UP' :
    chaosLevel < 50 ? 'HEATING UP' :
    chaosLevel < 70 ? 'GETTING SPICY 🌶️' :
    chaosLevel < 88 ? 'CHAOTIC 🔥' :
    'MAXIMUM CHAOS 🌡️'

  // Mystery mode: traitor name for reveal
  const traitorPlayer = room.agentId ? room.players?.[room.agentId] : null

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto no-select">
      {/* Chaos / mode bar */}
      <div className="relative bg-white/5 h-2">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}80, ${accent})` }}
          animate={{ width: `${chaosLevel}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{modeInfo?.emoji ?? '🎉'}</span>
          <span className="font-extrabold text-sm tracking-wide">{modeInfo?.name?.toUpperCase() ?? 'CHAOS CUP'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: chaosColor }} />
          <span className="text-xs font-bold" style={{ color: chaosColor }}>{chaosLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowRules((v) => !v)} className="relative text-white/40 hover:text-white/80 text-sm transition-colors">
            📋
            {customRules.length > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-yellow-500 text-black rounded-full w-4 h-4 flex items-center justify-center font-black">
                {customRules.length}
              </span>
            )}
          </button>
          {/* Mystery reveal button (host only) */}
          {isHost && gameMode === 'mystery' && !traitorRevealed && (
            <button
              onClick={() => setTraitorRevealed(true)}
              className="text-indigo-400 hover:text-indigo-300 text-xs font-bold border border-indigo-500/30 px-2 py-1 rounded-lg transition-colors"
            >
              🔍 Reveal
            </button>
          )}
          {isHost && (
            <button onClick={handleEndGame} className="text-white/30 hover:text-red-400 text-xs font-semibold transition-colors px-2 py-1">
              End
            </button>
          )}
        </div>
      </div>

      {/* Round + timer */}
      <div className="flex items-center justify-between px-4 mb-3">
        <span className="text-white/40 text-xs font-semibold">Round {room.round}</span>
        <motion.div
          key={timeLeft <= 10 ? 'urgent' : 'normal'}
          animate={timeLeft <= 10 ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.4, repeat: timeLeft <= 10 ? Infinity : 0 }}
          className="text-xs font-black tabular-nums"
          style={{ color: timeLeft <= 10 ? '#ef4444' : 'rgba(255,255,255,0.35)' }}
        >
          :{String(timeLeft).padStart(2, '0')}
        </motion.div>
      </div>

      {/* Card */}
      <div className="flex-1 px-4 pb-2">
        <AnimatePresence mode="wait">
          {card && (
            <motion.div
              key={cardKey}
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -40, opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', bounce: 0.3, duration: 0.45 }}
              className="bg-[#1e1e3a] rounded-3xl p-6 border border-white/10 min-h-[220px] flex flex-col justify-between shadow-2xl"
              style={{ boxShadow: meta ? `0 0 40px ${meta.color}20, 0 4px 24px rgba(0,0,0,0.4)` : undefined }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wide"
                  style={{
                    backgroundColor: meta ? `${meta.color}22` : '#ffffff22',
                    color: meta?.color || '#ffffff',
                    border: `1px solid ${meta?.color || '#ffffff'}44`,
                  }}
                >
                  <span>{meta?.emoji}</span>
                  <span>{meta?.label}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: Math.min(card.intensity, 5) }).map((_, i) => (
                    <span key={i} className="text-sm" style={{ opacity: 0.5 + i * 0.12 }}>🔥</span>
                  ))}
                </div>
              </div>
              <p className="text-white text-xl font-bold leading-relaxed flex-1">{card.text}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="px-4 pb-2 flex gap-3">
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setShowDrinkPicker(true)}
          className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 font-extrabold text-base"
        >
          🍺 Assign Drink
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setAddingRule(true)}
          className="py-4 px-4 rounded-2xl bg-yellow-600/25 border border-yellow-500/30 text-yellow-400 font-extrabold"
        >
          📋
        </motion.button>
        {isHost && (
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleNextCard}
            className={`flex-1 py-4 rounded-2xl bg-gradient-to-r ${modeInfo?.from ?? 'from-purple-600'} ${modeInfo?.to ?? 'to-pink-600'} font-extrabold text-base`}
          >
            Next →
          </motion.button>
        )}
      </div>

      {/* Player drink scoreboard */}
      <div className="px-4 pb-4 pt-1">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {players.map(([pid, player]) => (
            <motion.div key={pid} layout
              className="flex-shrink-0 flex flex-col items-center gap-1 bg-white/5 rounded-2xl px-3 py-2 border border-white/8 min-w-[64px]"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                style={{ background: `linear-gradient(135deg, ${accent}, #ec4899)` }}
              >
                {player.name?.[0]?.toUpperCase()}
              </div>
              <span className="text-xs text-white/60 font-semibold truncate max-w-[56px] text-center">
                {pid === playerId ? 'You' : player.name}
              </span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={player.drinks}
                  initial={{ scale: 1.4, color: '#f97316' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-sm font-black"
                >
                  {player.drinks || 0}🍺
                </motion.span>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Modals ───────────────────────────────────────────── */}

      {/* Agent reveal banner (Mystery mode — shown to the agent only) */}
      <AnimatePresence>
        {showAgentReveal && gameMode === 'mystery' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowAgentReveal(false)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="bg-[#1e1e3a] rounded-3xl p-8 border border-indigo-500/40 text-center max-w-xs w-full"
              style={{ boxShadow: '0 0 60px #6366f140' }}
              onClick={(e) => e.stopPropagation()}
            >
              {isAgent ? (
                <>
                  <div className="text-6xl mb-4">🕵️</div>
                  <h2 className="text-2xl font-extrabold text-indigo-300 mb-2">You Are THE TRAITOR</h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    Complete your secret missions. Avoid suspicion. Don't get caught.
                    If you survive to the end undetected — you win.
                  </p>
                  <div className="bg-indigo-900/40 rounded-2xl px-4 py-3 mb-6 border border-indigo-500/30">
                    <p className="text-indigo-300 text-xs font-bold">Only you can see this screen.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">👥</div>
                  <h2 className="text-2xl font-extrabold text-white mb-2">The Game Begins</h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    One player among you is <span className="text-indigo-300 font-bold">The Traitor</span>.
                    Watch. Question. Accuse. Don't trust anyone.
                  </p>
                </>
              )}
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowAgentReveal(false)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-700 font-extrabold"
              >
                {isAgent ? 'Begin My Mission 🕵️' : 'Let\'s Play 👀'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Traitor Reveal (host triggers) */}
      <AnimatePresence>
        {traitorRevealed && gameMode === 'mystery' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setTraitorRevealed(false)}
          >
            <motion.div
              initial={{ scale: 0.7, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="bg-[#1e1e3a] rounded-3xl p-8 border border-red-500/40 text-center max-w-xs w-full"
              style={{ boxShadow: '0 0 60px #ef444440' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-3">🔍</div>
              <p className="text-white/50 text-sm uppercase tracking-widest mb-2">The Traitor Was</p>
              <h2 className="text-4xl font-black text-red-400 mb-1">{traitorPlayer?.name ?? '???'}</h2>
              {room.agentId === playerId && (
                <p className="text-red-300 text-sm font-bold mb-4">That's you 😈</p>
              )}
              <p className="text-white/50 text-sm mt-4 mb-6">
                {room.agentId === playerId
                  ? 'You survived the night. Were you caught?'
                  : 'Did you guess correctly? Wrong guessers: 3 drinks each.'}
              </p>
              <button onClick={() => setTraitorRevealed(false)}
                className="w-full py-4 rounded-2xl bg-white/10 border border-white/15 font-bold"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drink picker */}
      <AnimatePresence>
        {showDrinkPicker && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-end justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowDrinkPicker(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="w-full max-w-sm bg-[#1e1e3a] rounded-3xl p-5 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-extrabold text-lg mb-4 text-center">🍺 Who drinks?</h3>
              <div className="space-y-2">
                {players.map(([pid, player]) => (
                  <motion.button key={pid} whileTap={{ scale: 0.96 }}
                    onClick={() => handleAssignDrink(pid)}
                    className="w-full flex items-center gap-3 py-3.5 px-4 rounded-2xl bg-white/8 hover:bg-white/15 border border-white/10 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
                      style={{ background: `linear-gradient(135deg, ${accent}, #ec4899)` }}>
                      {player.name?.[0]?.toUpperCase()}
                    </div>
                    <span className="font-bold flex-1 text-left">
                      {player.name}
                      {pid === playerId && <span className="ml-1 text-white/40 text-xs">(you)</span>}
                    </span>
                    <span className="text-white/50 text-sm">{player.drinks || 0}🍺</span>
                  </motion.button>
                ))}
              </div>
              <button onClick={() => setShowDrinkPicker(false)}
                className="mt-4 w-full py-3 rounded-2xl text-white/40 font-semibold text-sm">Cancel</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom rules panel */}
      <AnimatePresence>
        {showRules && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-end justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowRules(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="w-full max-w-sm bg-[#1e1e3a] rounded-3xl p-5 border border-white/10 max-h-[70vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-extrabold text-lg mb-4">📋 Active Rules</h3>
              <div className="overflow-y-auto flex-1 space-y-2">
                {customRules.length === 0 && (
                  <p className="text-white/40 text-sm text-center py-4">No custom rules yet.</p>
                )}
                <AnimatePresence>
                  {customRules.map(([ruleId, rule]) => (
                    <motion.div key={ruleId} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }}
                      className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl px-4 py-3"
                    >
                      <span className="text-yellow-400 text-sm flex-1">{rule.text}</span>
                      {isHost && (
                        <button onClick={() => handleRemoveRule(ruleId)}
                          className="text-white/25 hover:text-red-400 text-base ml-2 flex-shrink-0">✕</button>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <button onClick={() => setShowRules(false)}
                className="mt-4 w-full py-3 rounded-2xl text-white/40 font-semibold text-sm">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add rule */}
      <AnimatePresence>
        {addingRule && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setAddingRule(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="w-full max-w-sm bg-[#1e1e3a] rounded-3xl p-5 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-extrabold text-lg mb-1">📋 Add Custom Rule</h3>
              <p className="text-white/40 text-sm mb-4">Sticks for the rest of the game</p>
              <input
                autoFocus type="text"
                placeholder='e.g. "Every time Jake says bro, drink"'
                maxLength={120} value={ruleInput}
                onChange={(e) => setRuleInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddRule()}
                className="w-full bg-white/10 rounded-2xl px-5 py-4 text-white font-semibold placeholder-white/30 outline-none focus:ring-2 focus:ring-yellow-500 border border-white/10"
              />
              <div className="flex gap-3 mt-4">
                <button onClick={() => setAddingRule(false)} className="flex-1 py-3.5 rounded-2xl bg-white/8 text-white/60 font-bold">Cancel</button>
                <motion.button whileTap={{ scale: 0.96 }} onClick={handleAddRule} disabled={!ruleInput.trim()}
                  className="flex-1 py-3.5 rounded-2xl bg-yellow-500 text-black font-extrabold disabled:opacity-40">
                  Add Rule
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
