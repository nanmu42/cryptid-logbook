import type { PlayerColor, Clue } from './constant'

export interface Game {
  Clues: { [key in PlayerColor]?: RivalClues }
}

export interface RivalClues {
  in: RivalClue
  notIn: RivalClue
}

export type RivalClue = {
  [key in Clue]: 'excluded' | 'auto-excluded' | 'suspicious' | 'confirmed'
}
