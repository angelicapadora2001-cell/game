import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LandingPage from './components/LandingPage'
import Lobby from './components/Lobby'
import GameScreen from './components/GameScreen'
import { generatePlayerId } from './firebase'

const PLAYER_ID_KEY = 'chaos_player_id'
const ROOM_CODE_KEY = 'chaos_room_code'
const PLAYER_NAME_KEY = 'chaos_player_name'

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [roomCode, setRoomCode] = useState(null)
  const [playerId, setPlayerId] = useState(null)
  const [playerName, setPlayerName] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    let id = localStorage.getItem(PLAYER_ID_KEY)
    if (!id) {
      id = generatePlayerId()
      localStorage.setItem(PLAYER_ID_KEY, id)
    }
    setPlayerId(id)
  }, [])

  function showToast(message, type = 'error') {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  function handleRoomJoined({ code, name }) {
    setRoomCode(code)
    setPlayerName(name)
    localStorage.setItem(ROOM_CODE_KEY, code)
    localStorage.setItem(PLAYER_NAME_KEY, name)
    setScreen('lobby')
  }

  function handleGameStart() {
    setScreen('game')
  }

  function handleLeaveRoom() {
    setRoomCode(null)
    setPlayerName(null)
    localStorage.removeItem(ROOM_CODE_KEY)
    localStorage.removeItem(PLAYER_NAME_KEY)
    setScreen('landing')
  }

  if (!playerId) return null

  const slideVariants = {
    enter: { opacity: 0, x: 40, scale: 0.97 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -40, scale: 0.97 },
  }

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div key="landing" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <LandingPage playerId={playerId} onRoomJoined={handleRoomJoined} showToast={showToast} />
          </motion.div>
        )}
        {screen === 'lobby' && (
          <motion.div key="lobby" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <Lobby
              roomCode={roomCode}
              playerId={playerId}
              playerName={playerName}
              onGameStart={handleGameStart}
              onLeave={handleLeaveRoom}
              showToast={showToast}
            />
          </motion.div>
        )}
        {screen === 'game' && (
          <motion.div key="game" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
            <GameScreen
              roomCode={roomCode}
              playerId={playerId}
              playerName={playerName}
              onLeave={handleLeaveRoom}
              showToast={showToast}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl max-w-xs text-center ${
              toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
