import mitt from 'mitt'
import type { ClueTerrain, FlattenedClue, PlayerColor } from './constant'
import type { ClueState, TerrainBusterClue } from './gameNote'

type Events = {
  clueStateChanged: ClueStateChanged
  terrainBusterChanged: TerrainBusterChanged
  resetGameNote: ResetGameNote
}

export const eventBus = mitt<Events>()

if (import.meta.env.MODE === 'development') {
  eventBus.on('*', (e: any, payload: any) => {
    console.info('eventBus:', e, payload)
  })
}

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
  payload: TerrainBusterClue
}

export interface ResetGameNote {
  playerColor: PlayerColor
}
