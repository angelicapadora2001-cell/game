import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  subscribeToRoom,
  markMysteryReady,
  startMysteryExploration,
  commitMurder,
  logPrivateChat,
  logChatDeclined,
  castMysteryVote,
  revealVerdict,
  endGame,
} from '../firebase'
import { sounds } from '../sounds'

const ROLE_META = {
  murderer:  { label: 'THE MURDERER',  emoji: '🔪', color: '#dc2626', bg: '#2d0a0a', border: '#7f1d1d' },
  accomplice:{ label: 'THE ACCOMPLICE',emoji: '🤫', color: '#9333ea', bg: '#1a0a2e', border: '#6b21a8' },
  witness:   { label: 'THE WITNESS',   emoji: '👁️', color: '#0891b2', bg: '#042f3d', border: '#0e7490' },
  detective: { label: 'THE DETECTIVE', emoji: '🔍', color: '#6366f1', bg: '#0f0d2e', border: '#4338ca' },
  innocent:  { label: 'INNOCENT',      emoji: '😇', color: '#6b7280', bg: '#111827', border: '#374151' },
}

function fmt(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

// ── PHASE: ROLE REVEAL ────────────────────────────────────────────────────────

function RoleReveal({ myRoleData, mystery, players, playerId, roomCode, isHost, onLeave }) {
  const [revealed, setRevealed] = useState(false)
  const [ready, setReady] = useState(myRoleData?.ready ?? false)
  const meta = ROLE_META[myRoleData?.role] ?? ROLE_META.innocent
  const readyCount = Object.values(players).filter((p) => p.ready).length
  const totalCount = Object.keys(players).length
  const allReady = readyCount >= totalCount

  async function handleReady() {
    if (ready) return
    setReady(true)
    await markMysteryReady(roomCode, playerId)
  }

  async function handleStartExploration() {
    sounds.gameStart()
    await startMysteryExploration(roomCode)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 max-w-sm mx-auto no-select">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-4">
        {/* Scenario context */}
        <div className="text-center mb-2">
          <span className="text-3xl">{mystery.scenarioEmoji}</span>
          <h2 className="font-extrabold text-lg mt-1">{mystery.scenarioName}</h2>
          <p className="text-white/50 text-xs mt-1 leading-relaxed">{mystery.scenarioSetting}</p>
        </div>

        {/* Role card */}
        <motion.div
          className="rounded-3xl p-6 border text-center relative overflow-hidden"
          style={{ backgroundColor: meta.bg, borderColor: meta.border }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.4, delay: 0.2 }}
        >
          {!revealed ? (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => { setRevealed(true); sounds.cardFlip() }}
              className="w-full py-8 flex flex-col items-center gap-3"
            >
              <span className="text-5xl">🃏</span>
              <span className="font-extrabold text-lg text-white/70">Tap to reveal your role</span>
              <span className="text-white/40 text-xs">Keep your screen private</span>
            </motion.button>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
              <div className="text-5xl">{meta.emoji}</div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: meta.color }}>
                  You are
                </p>
                <h1 className="text-3xl font-black" style={{ color: meta.color }}>{meta.label}</h1>
              </div>
              <div className="border-t pt-4" style={{ borderColor: meta.border }}>
                <p className="text-xs font-bold text-white/50 uppercase tracking-wide mb-1">Your character</p>
                <p className="font-extrabold text-white text-lg">{myRoleData?.character}</p>
                <p className="text-white/50 text-sm">{myRoleData?.characterBio}</p>
              </div>
              <div className="bg-black/30 rounded-2xl p-4 text-left">
                <p className="text-xs font-bold mb-2" style={{ color: meta.color }}>YOUR SECRET</p>
                <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">{myRoleData?.secretInfo}</p>
              </div>
              {myRoleData?.motivation && (
                <div className="bg-white/5 rounded-2xl p-3 text-left border border-white/10">
                  <p className="text-xs text-white/40 font-bold uppercase tracking-wide mb-1">Your motive</p>
                  <p className="text-white/70 text-sm">{myRoleData.motivation}</p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Ready button */}
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleReady}
              disabled={ready}
              className={`w-full py-4 rounded-2xl font-extrabold text-lg transition-all ${
                ready
                  ? 'bg-white/10 text-white/50 border border-white/15'
                  : 'bg-gradient-to-r from-indigo-600 to-violet-700 text-white'
              }`}
            >
              {ready ? `✓ Ready (${readyCount}/${totalCount})` : 'I\'m Ready →'}
            </motion.button>
          </motion.div>
        )}

        {/* Host start button */}
        {isHost && allReady && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleStartExploration}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-red-700 to-rose-700 font-extrabold text-xl"
            style={{ boxShadow: '0 0 30px #dc262640' }}
          >
            🔪 Begin the Night
          </motion.button>
        )}
        {isHost && !allReady && (
          <p className="text-center text-white/30 text-xs">Waiting for all players to read their role... ({readyCount}/{totalCount})</p>
        )}
        {!isHost && ready && (
          <p className="text-center text-white/30 text-xs">Waiting for the host to start...</p>
        )}
      </motion.div>
    </div>
  )
}

// ── PHASE: EXPLORATION ────────────────────────────────────────────────────────

function Exploration({ mystery, myRoleData, players, playerId, roomCode, isHost, activity, showToast }) {
  const [timeLeft, setTimeLeft] = useState(mystery.explorationDuration * 1000)
  const [pendingChat, setPendingChat] = useState(null) // { pid, name } - chat in progress
  const [chatCountdown, setChatCountdown] = useState(0)
  const [murderArmed, setMurderArmed] = useState(false)
  const isMurderer = myRoleData?.role === 'murderer'

  useEffect(() => {
    const tick = setInterval(() => {
      const elapsed = Date.now() - mystery.explorationStartedAt
      const left = mystery.explorationDuration * 1000 - elapsed
      setTimeLeft(Math.max(0, left))
      if (left <= 0) clearInterval(tick)
    }, 500)
    return () => clearInterval(tick)
  }, [mystery.explorationStartedAt, mystery.explorationDuration])

  // Chat countdown
  useEffect(() => {
    if (!pendingChat) return
    let secs = 45
    setChatCountdown(secs)
    const t = setInterval(() => {
      secs -= 1
      setChatCountdown(secs)
      if (secs <= 0) { clearInterval(t); setPendingChat(null) }
    }, 1000)
    return () => clearInterval(t)
  }, [pendingChat])

  async function handleChatRequest(pid, name) {
    const me = players[playerId]
    sounds.cardFlip()
    await logPrivateChat(roomCode, playerId, me?.name ?? 'Unknown', pid, name)
    setPendingChat({ pid, name })
    showToast(`💬 Private chat with ${name} — whisper now`, 'success')
  }

  async function handleMurder() {
    if (!murderArmed) { setMurderArmed(true); return }
    sounds.chaosUp()
    await commitMurder(roomCode, timeLeft / 1000)
  }

  const sortedActivity = [...(activity || [])].sort((a, b) => b.at - a.at).slice(0, 12)
  const urgentTime = timeLeft < 30000

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto no-select">
      {/* Timer header */}
      <div className="bg-[#0f0d1a] px-4 pt-6 pb-3 text-center">
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-1">
          {mystery.scenarioEmoji} {mystery.scenarioName}
        </p>
        <motion.div
          className="text-6xl font-black tabular-nums"
          style={{ color: urgentTime ? '#ef4444' : '#ffffff' }}
          animate={urgentTime ? { scale: [1, 1.04, 1] } : {}}
          transition={{ duration: 0.6, repeat: urgentTime ? Infinity : 0 }}
        >
          {fmt(timeLeft)}
        </motion.div>
        <p className="text-white/40 text-xs mt-1">before the window closes</p>
      </div>

      {/* Role reminder chip */}
      <div className="px-4 my-3">
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold"
          style={{
            backgroundColor: `${ROLE_META[myRoleData?.role]?.color}20`,
            border: `1px solid ${ROLE_META[myRoleData?.role]?.color}40`,
            color: ROLE_META[myRoleData?.role]?.color,
          }}
        >
          <span>{ROLE_META[myRoleData?.role]?.emoji}</span>
          <span>{myRoleData?.character}</span>
          <span className="ml-auto text-xs opacity-60">{ROLE_META[myRoleData?.role]?.label}</span>
        </div>
      </div>

      {/* Victim card */}
      <div className="px-4 mb-3">
        <div className="bg-red-950/40 border border-red-800/30 rounded-2xl px-4 py-3 flex items-center gap-3">
          <span className="text-2xl">⚰️</span>
          <div>
            <p className="text-red-400 text-xs font-bold uppercase tracking-wide">Target</p>
            <p className="font-bold text-white">{mystery.victimName}</p>
            <p className="text-white/50 text-xs">{mystery.victimRole}</p>
          </div>
        </div>
      </div>

      {/* Players to chat with */}
      <div className="px-4 mb-3">
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2">
          Private Chats {pendingChat && <span className="text-yellow-400">· Chatting with {pendingChat.name} ({chatCountdown}s)</span>}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {Object.entries(players).filter(([pid]) => pid !== playerId).map(([pid, player]) => (
            <motion.button
              key={pid}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleChatRequest(pid, player.name)}
              disabled={!!pendingChat}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 bg-white/8 hover:bg-white/15 border border-white/10 rounded-2xl px-3.5 py-3 min-w-[70px] disabled:opacity-40"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-black">
                {player.name?.[0]?.toUpperCase()}
              </div>
              <span className="text-xs font-semibold text-white/70 truncate max-w-[60px]">{player.name}</span>
              <span className="text-[10px] text-white/30">💬</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="flex-1 px-4 overflow-y-auto">
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2">Activity Feed</p>
        <div className="space-y-1.5">
          <AnimatePresence>
            {sortedActivity.map((item, i) => (
              <motion.div
                key={item.at + i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm ${
                  item.type === 'murder' ? 'bg-red-900/50 border border-red-700/50' : 'bg-white/5 border border-white/8'
                }`}
              >
                <span className="text-base flex-shrink-0">
                  {item.type === 'chat' ? '💬' : item.type === 'declined' ? '❌' : '🔪'}
                </span>
                <span className="text-white/70 text-xs leading-tight">
                  {item.type === 'chat' && <><strong className="text-white">{item.fromName}</strong> → <strong className="text-white">{item.toName}</strong> <span className="text-white/40">(private chat)</span></>}
                  {item.type === 'declined' && <><strong className="text-white">{item.toName}</strong> <span className="text-white/40">declined chat from</span> <strong className="text-white">{item.fromName}</strong></>}
                  {item.type === 'murder' && <span className="text-red-300 font-bold">MURDER COMMITTED — {Math.round(item.timeRemaining)}s remaining</span>}
                </span>
                <span className="ml-auto text-[10px] text-white/25 flex-shrink-0">
                  {new Date(item.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          {sortedActivity.length === 0 && (
            <p className="text-white/25 text-xs text-center py-4">Nothing logged yet. Start chatting.</p>
          )}
        </div>
      </div>

      {/* Murderer action */}
      {isMurderer && (
        <div className="px-4 pb-6 pt-3">
          <AnimatePresence mode="wait">
            {!murderArmed ? (
              <motion.button
                key="arm"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleMurder}
                className="w-full py-5 rounded-2xl bg-red-950 border border-red-800 text-red-400 font-extrabold text-lg"
              >
                🔪 Prepare to Act
              </motion.button>
            ) : (
              <motion.button
                key="confirm"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleMurder}
                className="w-full py-5 rounded-2xl bg-red-600 font-extrabold text-xl"
                style={{ boxShadow: '0 0 30px #dc262660' }}
              >
                🔪 COMMIT THE MURDER
              </motion.button>
            )}
          </AnimatePresence>
          {murderArmed && (
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={() => setMurderArmed(false)}
              className="w-full text-center text-white/30 text-xs mt-2"
            >
              Cancel
            </motion.button>
          )}
        </div>
      )}
      {!isMurderer && (
        <div className="px-4 pb-6 pt-3">
          <div className="py-3 rounded-2xl bg-white/5 border border-white/10 text-center text-white/30 text-xs font-semibold">
            Watch the feed. Trust no one. The night is young.
          </div>
        </div>
      )}
    </div>
  )
}

// ── MURDER ANNOUNCEMENT ───────────────────────────────────────────────────────

function MurderFlash({ mystery, onDismiss }) {
  useEffect(() => {
    sounds.chaosUp()
    const t = setTimeout(onDismiss, 4500)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0000] px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
      >
        <div className="text-8xl mb-6">🔪</div>
        <h1 className="text-4xl font-black text-red-500 mb-3 leading-tight">A MURDER HAS<br/>BEEN COMMITTED</h1>
        <p className="text-white/60 text-lg font-semibold mb-2">{mystery.victimName}</p>
        <p className="text-white/40 text-sm">{mystery.victimDescription}</p>
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-8 text-white/40 text-sm"
        >
          Accusation round begins...
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ── PHASE: ACCUSATION ─────────────────────────────────────────────────────────

function Accusation({ mystery, myRoleData, players, playerId, roomCode, isHost, activity, clues, votes, showToast }) {
  const [myVote, setMyVote] = useState(votes?.[playerId] ?? null)
  const [showRevealConfirm, setShowRevealConfirm] = useState(false)

  async function handleVote(targetId) {
    setMyVote(targetId)
    await castMysteryVote(roomCode, playerId, targetId)
    sounds.cardFlip()
    showToast('🗳️ Vote locked in', 'success')
  }

  async function handleRevealVerdict() {
    // Tally votes and find most voted
    const tally = {}
    Object.values(votes || {}).forEach((targetId) => {
      tally[targetId] = (tally[targetId] || 0) + 1
    })
    const convicted = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
    await revealVerdict(roomCode, convicted)
    sounds.gameStart()
  }

  const voteTally = {}
  Object.values(votes || {}).forEach((t) => { voteTally[t] = (voteTally[t] || 0) + 1 })
  const voteCount = Object.keys(votes || {}).length
  const totalPlayers = Object.keys(players).length
  const allVoted = voteCount >= totalPlayers

  const sortedActivity = [...(activity || [])].sort((a, b) => a.at - b.at)

  return (
    <div className="min-h-screen flex flex-col max-w-sm mx-auto no-select overflow-y-auto">
      {/* Header */}
      <div className="px-4 pt-6 pb-3 text-center">
        <p className="text-red-400 text-xs uppercase tracking-widest font-bold mb-1">Accusation Round</p>
        <h2 className="text-2xl font-extrabold">{mystery.scenarioEmoji} {mystery.scenarioName}</h2>
        <p className="text-white/50 text-sm mt-1">The murder of {mystery.victimName}</p>
      </div>

      {/* Activity log */}
      <div className="px-4 mb-4">
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2">What happened tonight</p>
        <div className="bg-[#1e1e3a] rounded-2xl border border-white/10 p-3 space-y-1.5 max-h-44 overflow-y-auto">
          {sortedActivity.map((item, i) => (
            <div key={i} className={`flex items-start gap-2 text-xs ${item.type === 'murder' ? 'text-red-300' : 'text-white/60'}`}>
              <span className="flex-shrink-0">
                {item.type === 'chat' ? '💬' : item.type === 'declined' ? '❌' : '🔪'}
              </span>
              <span>
                {item.type === 'chat' && <>{item.fromName} → {item.toName} (private chat)</>}
                {item.type === 'declined' && <>{item.toName} declined {item.fromName}</>}
                {item.type === 'murder' && <strong>MURDER at {Math.round(item.timeRemaining)}s remaining</strong>}
              </span>
              <span className="ml-auto text-white/25 flex-shrink-0">
                {new Date(item.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {sortedActivity.length === 0 && <p className="text-white/30 text-center py-2">No activity logged</p>}
        </div>
      </div>

      {/* Clues */}
      <div className="px-4 mb-4">
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2">Evidence</p>
        <div className="space-y-2">
          {(clues || []).map((clue, i) => (
            <div key={i} className="bg-[#1e1e3a] border border-white/10 rounded-2xl px-4 py-3 flex items-start gap-3">
              <span className="text-lg flex-shrink-0">🔍</span>
              <p className="text-white/80 text-sm leading-relaxed">{clue.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vote */}
      <div className="px-4 mb-6">
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2">
          Cast Your Vote ({voteCount}/{totalPlayers} voted)
        </p>
        <div className="space-y-2">
          {Object.entries(players).filter(([pid]) => pid !== playerId).map(([pid, player]) => {
            const isMyVote = myVote === pid
            const voteNum = voteTally[pid] || 0
            return (
              <motion.button
                key={pid}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleVote(pid)}
                className={`w-full flex items-center gap-3 py-3.5 px-4 rounded-2xl border transition-all ${
                  isMyVote
                    ? 'bg-indigo-600/30 border-indigo-500/60'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-sm font-black flex-shrink-0">
                  {player.name?.[0]?.toUpperCase()}
                </div>
                <span className="font-bold flex-1 text-left">{player.name}</span>
                {voteNum > 0 && (
                  <span className="bg-red-500/30 text-red-300 text-xs font-extrabold px-2 py-0.5 rounded-full border border-red-500/40">
                    {voteNum} vote{voteNum !== 1 ? 's' : ''}
                  </span>
                )}
                {isMyVote && <span className="text-indigo-400 text-xs font-bold">✓ MY VOTE</span>}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Reveal button (host only) */}
      {isHost && (
        <div className="px-4 pb-8">
          {!showRevealConfirm ? (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowRevealConfirm(true)}
              className={`w-full py-5 rounded-2xl font-extrabold text-xl ${
                allVoted
                  ? 'bg-gradient-to-r from-red-700 to-rose-700'
                  : 'bg-white/10 border border-white/15 text-white/60'
              }`}
            >
              {allVoted ? '🔍 Reveal the Truth' : `Waiting for votes (${voteCount}/${totalPlayers})`}
            </motion.button>
          ) : (
            <div className="space-y-3">
              <p className="text-center text-white/60 text-sm font-semibold">Reveal all roles and the verdict?</p>
              <div className="flex gap-3">
                <button onClick={() => setShowRevealConfirm(false)} className="flex-1 py-4 rounded-2xl bg-white/8 text-white/60 font-bold">
                  Wait
                </button>
                <motion.button whileTap={{ scale: 0.96 }} onClick={handleRevealVerdict}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-red-700 to-rose-700 font-extrabold">
                  Reveal Now
                </motion.button>
              </div>
            </div>
          )}
        </div>
      )}
      {!isHost && (
        <div className="px-4 pb-8">
          <div className="py-4 rounded-2xl bg-white/5 border border-white/10 text-center text-white/40 text-sm font-semibold">
            Host will reveal the verdict...
          </div>
        </div>
      )}
    </div>
  )
}

// ── PHASE: VERDICT ────────────────────────────────────────────────────────────

function Verdict({ mystery, players, mysteryRoles, playerId, votes, onLeave }) {
  const [step, setStep] = useState(0) // 0=suspense, 1=convicted, 2=all revealed
  const convictedId = mystery.convicted
  const convictedPlayer = players[convictedId]
  const convictedRole = mysteryRoles?.[convictedId]
  const myRole = mysteryRoles?.[playerId]?.role
  const murdererEntry = Object.entries(mysteryRoles || {}).find(([, r]) => r.role === 'murderer')
  const murdererName = murdererEntry ? players[murdererEntry[0]]?.name : '?'
  const murdererCaught = convictedId === murdererEntry?.[0]

  useEffect(() => {
    const t1 = setTimeout(() => { sounds.chaosUp(); setStep(1) }, 2000)
    const t2 = setTimeout(() => setStep(2), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const myWin = (myRole === 'murderer' && !murdererCaught) ||
                (myRole === 'accomplice' && convictedId !== murdererEntry?.[0]) ||
                (['witness', 'detective', 'innocent'].includes(myRole) && murdererCaught)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 max-w-sm mx-auto no-select overflow-y-auto">
      <div className="w-full space-y-5">
        {/* Title */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <div className="text-5xl mb-3">⚖️</div>
          <h1 className="text-3xl font-black">The Verdict</h1>
          <p className="text-white/40 text-sm mt-1">{mystery.scenarioName}</p>
        </motion.div>

        {/* Convicted player */}
        <AnimatePresence>
          {step >= 1 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              className="bg-red-950 border border-red-800 rounded-3xl p-5 text-center"
            >
              <p className="text-red-400 text-xs uppercase tracking-widest font-bold mb-2">The group convicted</p>
              <p className="text-3xl font-black text-white">{convictedPlayer?.name ?? 'Nobody'}</p>
              <p className="text-white/60 text-sm mt-1">
                playing {convictedRole?.character} · <span className={`font-bold ${convictedRole?.role === 'murderer' ? 'text-red-400' : 'text-white/60'}`}>
                  {ROLE_META[convictedRole?.role]?.label ?? '?'}
                </span>
              </p>
              <div className={`mt-3 px-4 py-2 rounded-xl text-sm font-bold ${
                murdererCaught ? 'bg-green-900/40 text-green-400 border border-green-700/40' : 'bg-orange-900/40 text-orange-400 border border-orange-700/40'
              }`}>
                {murdererCaught ? '✓ Correct! The murderer was caught.' : '✗ Wrong. The real murderer escapes.'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All roles revealed */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
              <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">All Roles Revealed</p>
              {Object.entries(mysteryRoles || {}).map(([pid, rd]) => {
                const meta = ROLE_META[rd.role] ?? ROLE_META.innocent
                const isConvicted = pid === convictedId
                return (
                  <div key={pid} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3"
                    style={isConvicted ? { borderColor: '#7f1d1d', backgroundColor: '#2d0a0a40' } : {}}>
                    <span className="text-xl">{meta.emoji}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-white">
                        {players[pid]?.name}
                        {pid === playerId && <span className="ml-1 text-white/40 text-xs">(you)</span>}
                      </p>
                      <p className="text-xs" style={{ color: meta.color }}>{meta.label}</p>
                    </div>
                    <p className="text-white/40 text-xs">{rd.character}</p>
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Personal result */}
        {step >= 2 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
            className={`rounded-3xl p-5 text-center border ${
              myWin
                ? 'bg-green-950 border-green-700'
                : 'bg-gray-900 border-gray-700'
            }`}
          >
            <p className="text-2xl mb-2">{myWin ? '🏆' : '💀'}</p>
            <p className={`text-xl font-extrabold ${myWin ? 'text-green-400' : 'text-white/50'}`}>
              {myWin ? 'You Won' : 'You Lost'}
            </p>
            <p className="text-white/50 text-sm mt-1">as {ROLE_META[myRole]?.label}</p>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            whileTap={{ scale: 0.96 }}
            onClick={onLeave}
            className="w-full py-4 rounded-2xl bg-white/10 border border-white/15 font-bold text-white/80"
          >
            Back to Lobby
          </motion.button>
        )}
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function MysteryGame({ roomCode, playerId, onLeave, showToast }) {
  const [room, setRoom] = useState(null)
  const [showMurderFlash, setShowMurderFlash] = useState(false)
  const prevPhaseRef = useRef(null)

  const mystery = room?.mysteryGame
  const phase = mystery?.phase
  const isHost = room?.hostId === playerId
  const players = room?.players ?? {}
  const mysteryRoles = room?.mysteryRoles ?? {}
  const myRoleData = mysteryRoles[playerId] ?? null
  const activity = room?.mysteryActivity ? Object.values(room.mysteryActivity) : []
  const clues = room?.mysteryClues ? Object.values(room.mysteryClues) : []
  const votes = room?.mysteryVotes ?? {}

  useEffect(() => {
    const unsub = subscribeToRoom(roomCode, (data) => {
      if (!data) { showToast('Room closed.'); onLeave(); return }
      if (data.status === 'ended') { onLeave(); return }

      // Detect murder transition
      const newPhase = data.mysteryGame?.phase
      if (prevPhaseRef.current === 'exploration' && newPhase === 'accusation') {
        setShowMurderFlash(true)
      }
      prevPhaseRef.current = newPhase
      setRoom(data)
    })
    return unsub
  }, [roomCode])

  if (!room || !mystery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-4xl">🕵️</motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      <AnimatePresence>
        {showMurderFlash && (
          <MurderFlash mystery={mystery} onDismiss={() => setShowMurderFlash(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 'role_reveal' && (
          <motion.div key="role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RoleReveal
              myRoleData={myRoleData}
              mystery={mystery}
              players={mysteryRoles}
              playerId={playerId}
              roomCode={roomCode}
              isHost={isHost}
              onLeave={onLeave}
            />
          </motion.div>
        )}

        {phase === 'exploration' && (
          <motion.div key="explore" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Exploration
              mystery={mystery}
              myRoleData={myRoleData}
              players={players}
              playerId={playerId}
              roomCode={roomCode}
              isHost={isHost}
              activity={activity}
              showToast={showToast}
            />
          </motion.div>
        )}

        {phase === 'accusation' && (
          <motion.div key="accuse" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Accusation
              mystery={mystery}
              myRoleData={myRoleData}
              players={players}
              playerId={playerId}
              roomCode={roomCode}
              isHost={isHost}
              activity={activity}
              clues={clues}
              votes={votes}
              showToast={showToast}
            />
          </motion.div>
        )}

        {phase === 'verdict' && (
          <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Verdict
              mystery={mystery}
              players={players}
              mysteryRoles={mysteryRoles}
              playerId={playerId}
              votes={votes}
              onLeave={onLeave}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
