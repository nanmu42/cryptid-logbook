import type { PlayerClue } from './config'
import {
  type PlayerColor,
  type FlattenedClue,
  type ClueTerrain,
  flattenedClueList,
  clueOneOfTwoTerrainList,
} from './constant'

export interface GameNote {
  clues: { [key in PlayerColor]?: RivalClues }
}

export interface RivalClues {
  // flattened
  in: RivalClue
  notIn: RivalClue

  // shortcuts
  terrainBuster: TerrainBusterClues
}

export interface TerrainBusterClues {
  positive: TerrainBusterClue
  negative: TerrainBusterClue
}

export type TerrainBusterClue = { [key in ClueTerrain]: boolean }

export const clueStateList = [
  // manual-labeled
  'confirmed',
  // manual-labeled
  'suspicious',
  // manually marked neutral so will not be autoExcluded
  'loose',
  // all clue begins with this state
  'neutral',
  // excluded by policy
  'autoExcluded',
  // manual excluded
  'excluded',
] as const

export type ClueState = (typeof clueStateList)[number]

export type RivalClue = {
  [key in FlattenedClue]: ClueState
}

export function generateDefaultGameNote(colors: PlayerColor[]): GameNote {
  const note: GameNote = {
    clues: {},
  }

  for (const color of colors) {
    note.clues[color] = generateDefaultRivalClues()
  }

  return note
}

export function getPossiblesRemain(
  table: RivalClue,
  isAdvancedMode: boolean,
  scope?: FlattenedClue[],
): FlattenedClue[] {
  const remains: FlattenedClue[] = []

  if (scope === undefined) {
    scope = flattenedClueList as unknown as FlattenedClue[]
  }

  for (const clue of scope) {
    if (!isAdvancedMode && clue === 'WITHIN3BLACK') {
      continue
    }
    if (!isClueStateGood(table[clue])) {
      continue
    }

    remains.push(clue)
  }

  return remains
}

export function isClueStateGood(state: ClueState): boolean {
  switch (state) {
    case 'excluded':
    case 'autoExcluded':
      return false
    default:
      return true
  }
}

export function generateDefaultRivalClues(): RivalClues {
  const clues: RivalClues = {
    in: {
      FORREST_OR_DESERT: 'neutral',
      FORREST_OR_LAKE: 'neutral',
      FORREST_OR_SWAMP: 'neutral',
      FORREST_OR_MOUNTAIN: 'neutral',
      DESERT_OR_LAKE: 'neutral',
      DESERT_OR_SWAMP: 'neutral',
      DESERT_OR_MOUNTAIN: 'neutral',
      LAKE_OR_SWAMP: 'neutral',
      LAKE_OR_MOUNTAIN: 'neutral',
      SWAMP_OR_MOUNTAIN: 'neutral',
      WITHIN1FORREST: 'neutral',
      WITHIN1DESERT: 'neutral',
      WITHIN1LAKE: 'neutral',
      WITHIN1SWAMP: 'neutral',
      WITHIN1MOUNTAIN: 'neutral',
      WITHIN1ANIMAL: 'neutral',
      WITHIN2STONE: 'neutral',
      WITHIN2SHACK: 'neutral',
      WITHIN2COUGAR: 'neutral',
      WITHIN2BEAR: 'neutral',
      WITHIN3BLUE: 'neutral',
      WITHIN3WHITE: 'neutral',
      WITHIN3GREEN: 'neutral',
      WITHIN3BLACK: 'neutral',
    },
    notIn: {
      FORREST_OR_DESERT: 'neutral',
      FORREST_OR_LAKE: 'neutral',
      FORREST_OR_SWAMP: 'neutral',
      FORREST_OR_MOUNTAIN: 'neutral',
      DESERT_OR_LAKE: 'neutral',
      DESERT_OR_SWAMP: 'neutral',
      DESERT_OR_MOUNTAIN: 'neutral',
      LAKE_OR_SWAMP: 'neutral',
      LAKE_OR_MOUNTAIN: 'neutral',
      SWAMP_OR_MOUNTAIN: 'neutral',
      WITHIN1FORREST: 'neutral',
      WITHIN1DESERT: 'neutral',
      WITHIN1LAKE: 'neutral',
      WITHIN1SWAMP: 'neutral',
      WITHIN1MOUNTAIN: 'neutral',
      WITHIN1ANIMAL: 'neutral',
      WITHIN2STONE: 'neutral',
      WITHIN2SHACK: 'neutral',
      WITHIN2COUGAR: 'neutral',
      WITHIN2BEAR: 'neutral',
      WITHIN3BLUE: 'neutral',
      WITHIN3WHITE: 'neutral',
      WITHIN3GREEN: 'neutral',
      WITHIN3BLACK: 'neutral',
    },
    terrainBuster: {
      positive: {
        FORREST: false,
        DESERT: false,
        LAKE: false,
        SWAMP: false,
        MOUNTAIN: false,
      },
      negative: {
        FORREST: false,
        DESERT: false,
        LAKE: false,
        SWAMP: false,
        MOUNTAIN: false,
      },
    },
  }

  return clues
}

function stateCanBeAutoExclude(state: ClueState) {
  return state === 'neutral'
}

function autoExcludeClueInPlaceIfApplicable(clues: RivalClue, targets: FlattenedClue[]) {
  for (const target of targets) {
    if (!stateCanBeAutoExclude(clues[target])) {
      continue
    }

    clues[target] = 'autoExcluded'
  }
}

function autoExcludeClueIfNameContainsInPlaceIfApplicable(clues: RivalClue, substr: string) {
  for (const [k, v] of Object.entries(clues)) {
    if (k.includes(substr) && stateCanBeAutoExclude(v)) {
      clues[k as FlattenedClue] = 'autoExcluded'
    }
  }
}

export function excludePlayerClueInPlace(
  rivalClues: { [key in PlayerColor]?: RivalClues },
  playerClue: PlayerClue,
) {
  for (const [_, rivalClue] of Object.entries(rivalClues)) {
    if (stateCanBeAutoExclude(rivalClue.in[playerClue.clue])) {
      rivalClue.in[playerClue.clue] = 'autoExcluded'
    }
    if (stateCanBeAutoExclude(rivalClue.notIn[playerClue.clue])) {
      rivalClue.notIn[playerClue.clue] = 'autoExcluded'
    }
  }
}

export function executeTerrainsBusterInPlace(rivalClues: { [key in PlayerColor]?: RivalClues }) {
  for (const [_, rivalClue] of Object.entries(rivalClues)) {
    _executeTerrainsBusterInPlace(rivalClue)
  }
}

function countTrues(terrainBusterClue: TerrainBusterClue): number {
  let count = 0
  for (const [_, v] of Object.entries(terrainBusterClue)) {
    if (v) {
      count++
    }
  }

  return count
}

function _executeTerrainsBusterInPlace(rivalClues: RivalClues) {
  const p = rivalClues.terrainBuster.positive
  const n = rivalClues.terrainBuster.negative
  const positives = countTrues(p)
  const negatives = countTrues(n)

  // fast paths

  // 1 circle and 1 block on the same kind of terrains
  if (positives > 0 && negatives > 0) {
    switch (true) {
      case p.FORREST && n.FORREST:
      case p.DESERT && n.DESERT:
      case p.LAKE && n.LAKE:
      case p.SWAMP && n.SWAMP:
      case p.MOUNTAIN && n.MOUNTAIN:
        autoExcludeClueInPlaceIfApplicable(
          rivalClues.in,
          clueOneOfTwoTerrainList as unknown as FlattenedClue[],
        )
        autoExcludeClueInPlaceIfApplicable(
          rivalClues.notIn,
          clueOneOfTwoTerrainList as unknown as FlattenedClue[],
        )
    }
  }

  // >= 3 circle/block on different kinds of terrains
  if (positives >= 3) {
    autoExcludeClueInPlaceIfApplicable(
      rivalClues.in,
      clueOneOfTwoTerrainList as unknown as FlattenedClue[],
    )
  }
  if (negatives >= 3) {
    autoExcludeClueInPlaceIfApplicable(
      rivalClues.notIn,
      clueOneOfTwoTerrainList as unknown as FlattenedClue[],
    )
  }

  // >= 4 circle/block on different kinds of terrains
  if (positives >= 4 || negatives >= 4) {
    autoExcludeClueInPlaceIfApplicable(
      rivalClues.in,
      clueOneOfTwoTerrainList as unknown as FlattenedClue[],
    )
    autoExcludeClueInPlaceIfApplicable(
      rivalClues.notIn,
      clueOneOfTwoTerrainList as unknown as FlattenedClue[],
    )
  }

  // normal path
  for (const [k, v] of Object.entries(p)) {
    if (v) {
      autoExcludeClueIfNameContainsInPlaceIfApplicable(rivalClues.notIn, k)
    }
  }
  for (const [k, v] of Object.entries(n)) {
    if (v) {
      autoExcludeClueIfNameContainsInPlaceIfApplicable(rivalClues.in, k)
    }
  }
}
