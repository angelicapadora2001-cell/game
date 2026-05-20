import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { subscribeToRoom, startGame, kickPlayer, leaveRoom } from '../firebase'
import { pickCard } from '../data/prompts'
import { sounds } from '../sounds'

export default function Lobby({ roomCode, playerId, playerName, onGameStart, onLeave, showToast }) {
  const [room, setRoom] = useState(null)
  const [copied, setCopied] = useState(false)
  const [starting, setStarting] = useState(false)
  const prevPlayersRef = useRef({})

  const isHost = room?.hostId === playerId

  useEffect(() => {
    const unsub = subscribeToRoom(roomCode, (data) => {
      if (!data) {
        showToast('Room was closed.')
        onLeave()
        return
      }
      // Detect new player joining
      const prevIds = Object.keys(prevPlayersRef.current)
      const newIds = Object.keys(data.players || {})
      const joined = newIds.filter((id) => !prevIds.includes(id) && id !== playerId)
      if (joined.length > 0) sounds.playerJoin()
      prevPlayersRef.current = data.players || {}
      setRoom(data)

      if (data.status === 'playing') onGameStart()
    })
    return unsub
  }, [roomCode])

  async function handleStart() {
    const players = Object.keys(room?.players || {})
    if (players.length < 2) {
      showToast('Need at least 2 players to start!')
      sounds.error()
      return
    }
    setStarting(true)
    try {
      const firstCard = pickCard({}, 5)
      await startGame(roomCode, firstCard)
      sounds.gameStart()
    } catch (e) {
      showToast('Failed to start game. Try again.')
      sounds.error()
    }
    setStarting(false)
  }

  async function handleKick(targetId) {
    try {
      await kickPlayer(roomCode, targetId)
    } catch (e) {
      showToast('Could not kick player.')
    }
  }

  async function handleLeave() {
    try {
      await leaveRoom(roomCode, playerId)
    } finally {
      onLeave()
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(roomCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const players = room ? Object.entries(room.players || {}) : []

  return (
    <div className="min-h-screen flex flex-col px-4 py-8 max-w-sm mx-auto no-select">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={handleLeave}
          className="text-white/40 hover:text-white/70 text-sm font-semibold transition-colors"
        >
          ← Leave
        </motion.button>
        <span className="text-white/50 text-sm font-medium">Lobby</span>
        <div className="w-14" />
      </div>

      {/* Room code */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#1e1e3a] rounded-3xl p-6 mb-5 border border-white/10 text-center"
      >
        <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-2">Room Code</p>
        <div className="text-5xl font-black tracking-widest bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          {roomCode}
        </div>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={copyCode}
          className="px-6 py-2.5 rounded-2xl bg-white/10 border border-white/15 text-sm font-bold"
        >
          {copied ? '✓ Copied!' : '📋 Copy Link'}
        </motion.button>
      </motion.div>

      {/* Game mode badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className="px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wide">
          🔥 Chaos Rules
        </div>
        <span className="text-white/30 text-xs">· Up to 10 players</span>
      </div>

      {/* Player list */}
      <div className="flex-1 space-y-2 mb-5">
        <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">
          Players ({players.length}/10)
        </p>
        <AnimatePresence>
          {players.map(([pid, player], idx) => (
            <motion.div
              key={pid}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="flex items-center justify-between bg-white/5 rounded-2xl px-4 py-3.5 border border-white/8"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-black">
                  {player.name?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <span className="font-bold text-base">
                    {player.name}
                    {pid === playerId && (
                      <span className="ml-1.5 text-white/40 text-xs font-normal">(you)</span>
                    )}
                  </span>
                  {pid === room?.hostId && (
                    <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded-lg font-semibold">
                      HOST
                    </span>
                  )}
                </div>
              </div>
              {isHost && pid !== playerId && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleKick(pid)}
                  className="text-white/25 hover:text-red-400 text-lg transition-colors"
                >
                  ✕
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {players.length < 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6 text-white/30 text-sm"
          >
            Waiting for more players to join...
          </motion.div>
        )}
      </div>

      {/* Start button (host only) */}
      {isHost && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleStart}
            disabled={starting || players.length < 2}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-extrabold text-xl disabled:opacity-40 glow-purple"
          >
            {starting ? '🎲 Starting...' : '🔥 Start Game'}
          </motion.button>
          {players.length < 2 && (
            <p className="text-center text-white/30 text-xs mt-2">Need at least 2 players</p>
          )}
        </motion.div>
      )}

      {!isHost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-4 rounded-2xl bg-white/5 border border-white/10 text-center text-white/50 text-sm font-semibold"
        >
          Waiting for the host to start...
        </motion.div>
      )}
    </div>
  )
}
