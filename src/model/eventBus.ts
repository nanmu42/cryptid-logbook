import mitt from 'mitt'
import type { ClueTerrain, FlattenedClue, PlayerColor } from './constant'
import type { ClueState } from './gameNote'

type Events = {
  clueStateChanged: ClueStateChanged
  terrainBusterChanged: TerrainBusterChanged
  resetGameNote: ResetGameNote
}

export const eventBus = mitt<Events>()

// Uncomment me to enable debug
eventBus.on('*', (e: any, payload: any) => {
  console.log('eventBus debug:', e, payload)
})

export interface ClueStateChanged {
  playerColor: PlayerColor
  inverted: boolean
  clue: FlattenedClue
  fromState: ClueState
  toState: ClueState
}

export interface TerrainBusterChanged {
  playerColor: PlayerColor
  polarity: 'positive' | 'negative'
  payload: { [key in ClueTerrain]: boolean }
}

export interface ResetGameNote {
  playerColor: PlayerColor
}
