import type { FlattenedClue, PlayerColor } from './constant'

export interface Config {
  isTwoPlayerMode: boolean

  playerColor1?: PlayerColor
  playerClue1?: FlattenedClue
  playerColor2?: PlayerColor
  playerClue2?: FlattenedClue

  RivalColors: PlayerColor[]

  isAdvancedMode: boolean
}
