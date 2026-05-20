import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createRoom, joinRoom, generateRoomCode } from '../firebase'
import { sounds } from '../sounds'

export default function LandingPage({ playerId, onRoomJoined, showToast }) {
  const [modal, setModal] = useState(null) // 'create' | 'join'
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [createdCode, setCreatedCode] = useState(null)
  const [copied, setCopied] = useState(false)

  async function handleCreate() {
    if (!name.trim()) return showToast('Enter your name first!')
    setLoading(true)
    try {
      let roomCode = generateRoomCode()
      try {
        await createRoom(roomCode, playerId, name.trim())
      } catch (e) {
        if (e.message === 'ROOM_EXISTS') {
          roomCode = generateRoomCode()
          await createRoom(roomCode, playerId, name.trim())
        } else throw e
      }
      sounds.gameStart()
      setCreatedCode(roomCode)
    } catch (e) {
      showToast(e.message)
    }
    setLoading(false)
  }

  async function handleJoin() {
    if (!name.trim()) return showToast('Enter your name first!')
    if (code.length < 4) return showToast('Enter a 4-character room code')
    setLoading(true)
    try {
      await joinRoom(code.toUpperCase(), playerId, name.trim())
      sounds.playerJoin()
      onRoomJoined({ code: code.toUpperCase(), name: name.trim() })
    } catch (e) {
      sounds.error()
      showToast(e.message)
    }
    setLoading(false)
  }

  function handleGoToLobby() {
    onRoomJoined({ code: createdCode, name: name.trim() })
  }

  function copyCode() {
    navigator.clipboard.writeText(createdCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function openModal(type) {
    sounds.cardFlip()
    setModal(type)
    setName('')
    setCode('')
    setCreatedCode(null)
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 no-select">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-600/25 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-24 w-72 h-72 rounded-full bg-pink-600/25 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-orange-600/20 blur-3xl"
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="text-center"
        >
          <div className="text-7xl mb-3 drop-shadow-2xl">🎉</div>
          <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent leading-none pb-1">
            CHAOS
          </h1>
          <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-none pb-1">
            CUP
          </h1>
          <p className="mt-3 text-white/50 text-sm font-medium tracking-wide uppercase">
            No login. Pure chaos. Maximum regrets.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col gap-3 w-full"
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => openModal('create')}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-extrabold text-xl text-white shadow-lg glow-purple active:opacity-90"
          >
            🎮 Create Room
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => openModal('join')}
            className="w-full py-5 rounded-2xl bg-white/10 border border-white/15 font-extrabold text-xl text-white active:bg-white/15"
          >
            🚀 Join Room
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/25 text-xs text-center"
        >
          18+ · Drink responsibly · Don't drink and drive
        </motion.p>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            key="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setModal(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0.3 }}
              className="w-full max-w-sm bg-[#1e1e3a] rounded-3xl p-6 space-y-5 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {modal === 'create' && !createdCode && (
                <>
                  <div>
                    <h2 className="text-2xl font-extrabold">Create Room</h2>
                    <p className="text-white/50 text-sm mt-1">Your friends will join with a room code</p>
                  </div>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Your nickname"
                    maxLength={20}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                    className="w-full bg-white/10 rounded-2xl px-5 py-4 text-white text-lg font-semibold placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-500 border border-white/10"
                  />
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleCreate}
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-extrabold text-lg disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Room →'}
                  </motion.button>
                </>
              )}

              {modal === 'create' && createdCode && (
                <>
                  <div className="text-center space-y-3">
                    <div className="text-4xl">🎊</div>
                    <h2 className="text-2xl font-extrabold">Room Created!</h2>
                    <p className="text-white/50 text-sm">Share this code with your friends</p>
                  </div>
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="bg-white/10 rounded-2xl py-6 text-center border border-white/15"
                  >
                    <p className="text-6xl font-black tracking-widest bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {createdCode}
                    </p>
                  </motion.div>
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={copyCode}
                      className="flex-1 py-4 rounded-2xl bg-white/10 border border-white/15 font-bold text-base"
                    >
                      {copied ? '✓ Copied!' : '📋 Copy Code'}
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={handleGoToLobby}
                      className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-base"
                    >
                      Go to Lobby →
                    </motion.button>
                  </div>
                </>
              )}

              {modal === 'join' && (
                <>
                  <div>
                    <h2 className="text-2xl font-extrabold">Join Room</h2>
                    <p className="text-white/50 text-sm mt-1">Get the code from whoever made the room</p>
                  </div>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Room code (e.g. XKZQ)"
                    maxLength={4}
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full bg-white/10 rounded-2xl px-5 py-4 text-white text-2xl font-extrabold tracking-widest text-center placeholder-white/30 outline-none focus:ring-2 focus:ring-pink-500 border border-white/10 uppercase"
                  />
                  <input
                    type="text"
                    placeholder="Your nickname"
                    maxLength={20}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                    className="w-full bg-white/10 rounded-2xl px-5 py-4 text-white text-lg font-semibold placeholder-white/30 outline-none focus:ring-2 focus:ring-pink-500 border border-white/10"
                  />
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleJoin}
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-orange-600 font-extrabold text-lg disabled:opacity-50"
                  >
                    {loading ? 'Joining...' : 'Join the Chaos →'}
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
