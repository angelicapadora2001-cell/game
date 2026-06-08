import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  push,
  onValue,
  remove,
  off,
} from 'firebase/database'
import { firebaseConfig } from './firebaseConfig'

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)

export function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

export function generatePlayerId() {
  return 'p_' + Math.random().toString(36).slice(2, 11)
}

export async function createRoom(roomCode, playerId, playerName) {
  const roomRef = ref(db, `rooms/${roomCode}`)
  const existing = await get(roomRef)
  if (existing.exists()) throw new Error('ROOM_EXISTS')

  await set(roomRef, {
    code: roomCode,
    hostId: playerId,
    status: 'lobby',
    gameMode: 'chaos-rules',
    createdAt: Date.now(),
    chaosLevel: 0,
    round: 0,
    currentCard: null,
    usedCardIds: {},
    customRules: {},
    players: {
      [playerId]: {
        name: playerName,
        drinks: 0,
        isHost: true,
        joinedAt: Date.now(),
      },
    },
  })
}

export async function joinRoom(roomCode, playerId, playerName) {
  const roomRef = ref(db, `rooms/${roomCode}`)
  const snapshot = await get(roomRef)
  if (!snapshot.exists()) throw new Error('Room not found. Check the code and try again.')

  const room = snapshot.val()
  const playerCount = Object.keys(room.players || {}).length
  if (playerCount >= 10) throw new Error('Room is full! Max 10 players.')
  if (room.status === 'playing') throw new Error('Game already in progress.')

  if (!room.players?.[playerId]) {
    await set(ref(db, `rooms/${roomCode}/players/${playerId}`), {
      name: playerName,
      drinks: 0,
      isHost: false,
      joinedAt: Date.now(),
    })
  }
  return room
}

export function subscribeToRoom(roomCode, callback) {
  const roomRef = ref(db, `rooms/${roomCode}`)
  onValue(roomRef, (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : null)
  })
  return () => off(roomRef)
}

export async function setGameMode(roomCode, mode) {
  await update(ref(db, `rooms/${roomCode}`), { gameMode: mode })
}

export async function startGame(roomCode, firstCard, agentId = null) {
  const updates = {
    status: 'playing',
    round: 1,
    currentCard: firstCard,
    cardShownAt: Date.now(),
    gameStartedAt: Date.now(),
    chaosLevel: 5,
  }
  if (agentId) updates.agentId = agentId
  await update(ref(db, `rooms/${roomCode}`), updates)
}

export async function nextCard(roomCode, card, round, chaosLevel, usedCardId) {
  const updates = {
    currentCard: card,
    round,
    chaosLevel,
    cardShownAt: Date.now(),
  }
  if (usedCardId) updates[`usedCardIds/${usedCardId}`] = true
  await update(ref(db, `rooms/${roomCode}`), updates)
}

export async function assignDrink(roomCode, targetPlayerId, count = 1) {
  const drinkRef = ref(db, `rooms/${roomCode}/players/${targetPlayerId}/drinks`)
  const snap = await get(drinkRef)
  await set(drinkRef, (snap.val() || 0) + count)
}

export async function addCustomRule(roomCode, ruleText) {
  await push(ref(db, `rooms/${roomCode}/customRules`), {
    text: ruleText,
    createdAt: Date.now(),
  })
}

export async function removeCustomRule(roomCode, ruleId) {
  await remove(ref(db, `rooms/${roomCode}/customRules/${ruleId}`))
}

export async function kickPlayer(roomCode, playerId) {
  await remove(ref(db, `rooms/${roomCode}/players/${playerId}`))
}

export async function leaveRoom(roomCode, playerId) {
  await remove(ref(db, `rooms/${roomCode}/players/${playerId}`))
}

export async function endGame(roomCode) {
  await update(ref(db, `rooms/${roomCode}`), { status: 'ended' })
}
