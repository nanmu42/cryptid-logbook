import type { FlattenedClue, PlayerColor } from './constant'

export function generateDefaultConfig(): Config {
  return {
    isTwoPlayerMode: false,
    isAdvancedMode: false,

    playerColor1: null,
    playerClue1: null,
    playerColor2: null,
    playerClue2: null,
    rivalColors: [],

    shortcuts: {
      globalSwitch: true,
      excludePlayerClues: true,
      terrainBuster: true,
    },
  }
}

// in place, throw if there's error
export function checkAndCleanConfig(c: Config) {
  if (!c.playerColor1) {
    if (c.isTwoPlayerMode) {
      throw new Error('第一个颜色没有设置好')
    } else {
      throw new Error('你的颜色还没设置好')
    }
  }

  if (!c.playerClue1) {
    if (c.isTwoPlayerMode) {
      throw new Error('第一条线索没有设置好')
    } else {
      throw new Error('你的线索还没设置好')
    }
  }

  if (c.isTwoPlayerMode) {
    if (!c.playerColor2) {
      throw new Error('第二个颜色没有设置好')
    }
    if (!c.playerClue2) {
      throw new Error('第二条线索没有设置好')
    }
    if (
      c.playerClue1.clue === c.playerClue2.clue &&
      c.playerClue1.inverted === c.playerClue2.inverted
    ) {
      throw new Error('请检查你的两条线索是否相同')
    }
    if (c.playerClue1.clue === c.playerClue2.clue) {
      throw new Error('请检查你的两条线索是否冲突')
    }
  } else {
    c.playerColor2 = null
    c.playerClue2 = null
  }

  if (c.rivalColors.length === 0) {
    throw new Error('对手颜色还没有设置')
  }

  if (c.isTwoPlayerMode) {
    if (c.rivalColors.length !== 2) {
      throw new Error('双人模式下，对手只能有正好2个颜色')
    }
  } else {
    if (c.rivalColors.length < 2) {
      throw new Error('多人模式下，你需要至少2个对手')
    }
  }
}

export interface Config {
  isTwoPlayerMode: boolean
  isAdvancedMode: boolean

  playerColor1: PlayerColor | null
  playerClue1: PlayerClue | null
  playerColor2: PlayerColor | null
  playerClue2: PlayerClue | null

  rivalColors: PlayerColor[]

  shortcuts: ShortcutConfig
}

export interface PlayerClue {
  clue: FlattenedClue
  inverted: boolean
}

export interface ShortcutConfig {
  globalSwitch: boolean
  // whether to exclude clues that player got assigned from
  // other players possible clue list since there can not be
  // duplicated clues between any two players.
  excludePlayerClues: boolean
  // high-level buttons to exclude terrain types,
  // works at "one of two terrains" and "terrains + 1" clue types
  // at the same time.
  terrainBuster: boolean
}
