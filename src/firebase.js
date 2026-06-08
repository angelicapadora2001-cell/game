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

// ── MURDER MYSTERY ────────────────────────────────────────────────────────────

export async function startMysteryGame(roomCode, scenario, roles, clues) {
  const updates = {}
  updates[`rooms/${roomCode}/status`] = 'playing'
  updates[`rooms/${roomCode}/gameMode`] = 'mystery'
  updates[`rooms/${roomCode}/gameStartedAt`] = Date.now()
  updates[`rooms/${roomCode}/mysteryGame`] = {
    phase: 'role_reveal',
    scenarioId: scenario.id,
    scenarioName: scenario.name,
    scenarioEmoji: scenario.emoji,
    scenarioSetting: scenario.setting,
    victimName: scenario.victim.name,
    victimRole: scenario.victim.role,
    victimDescription: scenario.victim.description,
    explorationDuration: 180,
    explorationStartedAt: null,
    murderAt: null,
    convicted: null,
  }
  Object.entries(roles).forEach(([pid, roleData]) => {
    updates[`rooms/${roomCode}/mysteryRoles/${pid}`] = roleData
  })
  clues.forEach((clue, i) => {
    updates[`rooms/${roomCode}/mysteryClues/c${i}`] = { ...clue, revealed: false }
  })
  await update(ref(db), updates)
}

export async function markMysteryReady(roomCode, playerId) {
  await set(ref(db, `rooms/${roomCode}/mysteryRoles/${playerId}/ready`), true)
}

export async function startMysteryExploration(roomCode) {
  await update(ref(db, `rooms/${roomCode}/mysteryGame`), {
    phase: 'exploration',
    explorationStartedAt: Date.now(),
  })
}

export async function commitMurder(roomCode, timeRemaining) {
  await push(ref(db, `rooms/${roomCode}/mysteryActivity`), {
    type: 'murder',
    at: Date.now(),
    timeRemaining: Math.round(timeRemaining),
  })
  await update(ref(db, `rooms/${roomCode}/mysteryGame`), {
    phase: 'accusation',
    murderAt: Date.now(),
  })
}

export async function logPrivateChat(roomCode, fromId, fromName, toId, toName) {
  await push(ref(db, `rooms/${roomCode}/mysteryActivity`), {
    type: 'chat', fromId, fromName, toId, toName, at: Date.now(),
  })
}

export async function logChatDeclined(roomCode, fromId, fromName, toId, toName) {
  await push(ref(db, `rooms/${roomCode}/mysteryActivity`), {
    type: 'declined', fromId, fromName, toId, toName, at: Date.now(),
  })
}

export async function castMysteryVote(roomCode, voterId, targetId) {
  await set(ref(db, `rooms/${roomCode}/mysteryVotes/${voterId}`), targetId)
}

export async function revealVerdict(roomCode, convictedId) {
  await update(ref(db, `rooms/${roomCode}/mysteryGame`), {
    phase: 'verdict',
    convicted: convictedId,
    revealedAt: Date.now(),
  })
}

// ── END MYSTERY ───────────────────────────────────────────────────────────────

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
