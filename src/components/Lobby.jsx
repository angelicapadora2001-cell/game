import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { subscribeToRoom, startGame, kickPlayer, leaveRoom, setGameMode } from '../firebase'
import { pickCard } from '../data/index'
import { GAME_MODES } from '../data/gameModes'
import { sounds } from '../sounds'

export default function Lobby({ roomCode, playerId, playerName, onGameStart, onLeave, showToast }) {
  const [room, setRoom] = useState(null)
  const [copied, setCopied] = useState(false)
  const [starting, setStarting] = useState(false)
  const prevPlayersRef = useRef({})

  const isHost = room?.hostId === playerId
  const selectedMode = room?.gameMode ?? 'chaos-rules'
  const modeInfo = GAME_MODES[selectedMode]

  useEffect(() => {
    const unsub = subscribeToRoom(roomCode, (data) => {
      if (!data) { showToast('Room was closed.'); onLeave(); return }
      const prevIds = Object.keys(prevPlayersRef.current)
      const newIds = Object.keys(data.players || {})
      if (newIds.filter((id) => !prevIds.includes(id) && id !== playerId).length > 0) {
        sounds.playerJoin()
      }
      prevPlayersRef.current = data.players || {}
      setRoom(data)
      if (data.status === 'playing') onGameStart()
    })
    return unsub
  }, [roomCode])

  async function handleModeSelect(modeId) {
    if (!isHost) return
    sounds.cardFlip()
    try { await setGameMode(roomCode, modeId) } catch (_) {}
  }

  async function handleStart() {
    const players = Object.entries(room?.players || {})
    const mode = GAME_MODES[selectedMode]
    if (players.length < (mode?.minPlayers ?? 2)) {
      showToast(`Need at least ${mode?.minPlayers ?? 2} players for ${mode?.name}!`)
      sounds.error()
      return
    }
    setStarting(true)
    try {
      const firstCard = pickCard(selectedMode, {}, 5)
      // For Mystery mode: pick a random non-host player as the agent
      let agentId = null
      if (selectedMode === 'mystery') {
        const nonHostPlayers = players.filter(([pid]) => pid !== playerId)
        if (nonHostPlayers.length > 0) {
          agentId = nonHostPlayers[Math.floor(Math.random() * nonHostPlayers.length)][0]
        } else {
          agentId = players[0][0]
        }
      }
      await startGame(roomCode, firstCard, agentId)
      sounds.gameStart()
    } catch (e) {
      showToast('Failed to start. Try again.')
      sounds.error()
    }
    setStarting(false)
  }

  async function handleKick(targetId) {
    try { await kickPlayer(roomCode, targetId) } catch (_) { showToast('Could not kick player.') }
  }

  async function handleLeave() {
    try { await leaveRoom(roomCode, playerId) } finally { onLeave() }
  }

  function copyCode() {
    navigator.clipboard.writeText(roomCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const players = room ? Object.entries(room.players || {}) : []

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 max-w-sm mx-auto no-select">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <motion.button whileTap={{ scale: 0.93 }} onClick={handleLeave} className="text-white/40 hover:text-white/70 text-sm font-semibold">
          ← Leave
        </motion.button>
        <span className="text-white/50 text-sm font-medium">Lobby</span>
        <div className="w-14" />
      </div>

      {/* Room code */}
      <motion.div initial={{ y: -15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="bg-[#1e1e3a] rounded-3xl p-5 mb-4 border border-white/10 text-center"
      >
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2">Room Code</p>
        <div className="text-5xl font-black tracking-widest bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
          {roomCode}
        </div>
        <motion.button whileTap={{ scale: 0.94 }} onClick={copyCode}
          className="px-5 py-2 rounded-xl bg-white/10 border border-white/15 text-sm font-bold"
        >
          {copied ? '✓ Copied!' : '📋 Copy Code'}
        </motion.button>
      </motion.div>

      {/* Game mode selector */}
      <div className="mb-4">
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2.5">
          {isHost ? 'Choose Game Mode' : 'Game Mode'}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {Object.values(GAME_MODES).map((mode) => {
            const isSelected = selectedMode === mode.id
            return (
              <motion.button
                key={mode.id}
                whileTap={{ scale: 0.93 }}
                onClick={() => handleModeSelect(mode.id)}
                disabled={!isHost}
                className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-3.5 py-3 rounded-2xl border transition-all text-center min-w-[90px] ${
                  isSelected
                    ? 'border-white/30 bg-white/15'
                    : 'border-white/8 bg-white/5 opacity-60'
                } ${!isHost ? 'cursor-default' : 'cursor-pointer'}`}
                style={isSelected ? { boxShadow: `0 0 16px ${mode.color}50` } : {}}
              >
                <span className="text-2xl">{mode.emoji}</span>
                <span className="text-xs font-bold text-white leading-tight">{mode.name}</span>
                {isSelected && (
                  <motion.div
                    layoutId="mode-pill"
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-gradient-to-r ${mode.from} ${mode.to}`}
                  >
                    SELECTED
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={selectedMode}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-white/40 text-xs mt-2 text-center"
          >
            {modeInfo?.tagline}
            {modeInfo?.minPlayers > 2 && ` · ${modeInfo.minPlayers}+ players`}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Player list */}
      <div className="flex-1 mb-4">
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2.5">
          Players ({players.length}/10)
        </p>
        <div className="space-y-2">
          <AnimatePresence>
            {players.map(([pid, player], idx) => (
              <motion.div
                key={pid}
                initial={{ x: -25, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 25, opacity: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3 border border-white/8"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
                    style={{ background: `linear-gradient(135deg, ${modeInfo?.color ?? '#8b5cf6'}, #ec4899)` }}
                  >
                    {player.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <span className="font-bold text-base">
                      {player.name}
                      {pid === playerId && <span className="ml-1.5 text-white/40 text-xs font-normal">(you)</span>}
                    </span>
                    {pid === room?.hostId && (
                      <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded-lg font-semibold">HOST</span>
                    )}
                  </div>
                </div>
                {isHost && pid !== playerId && (
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleKick(pid)}
                    className="text-white/20 hover:text-red-400 text-lg transition-colors"
                  >✕</motion.button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {players.length < 2 && (
            <p className="text-center py-4 text-white/30 text-sm">Waiting for more players...</p>
          )}
        </div>
      </div>

      {/* Start / waiting */}
      {isHost ? (
        <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleStart}
            disabled={starting || players.length < (modeInfo?.minPlayers ?? 2)}
            className={`w-full py-5 rounded-2xl font-extrabold text-xl disabled:opacity-40 bg-gradient-to-r ${modeInfo?.from ?? 'from-purple-600'} ${modeInfo?.to ?? 'to-pink-600'}`}
          >
            {starting ? '🎲 Starting...' : `${modeInfo?.emoji} Start ${modeInfo?.name}`}
          </motion.button>
          {players.length < (modeInfo?.minPlayers ?? 2) && (
            <p className="text-center text-white/30 text-xs mt-2">
              Need at least {modeInfo?.minPlayers ?? 2} players for this mode
            </p>
          )}
        </motion.div>
      ) : (
        <div className="py-4 rounded-2xl bg-white/5 border border-white/10 text-center text-white/50 text-sm font-semibold">
          Waiting for the host to start...
        </div>
      )}
    </div>
  )
}
