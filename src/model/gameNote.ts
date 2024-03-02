import { type PlayerColor, type FlattenedClue, type ClueTerrain } from './constant'

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
  positive: { [key in ClueTerrain]: boolean }
  negative: { [key in ClueTerrain]: boolean }
}

const clueStateList = [
  // all clue begins with this state
  'neutral',
  // manually marked neutral so will not be autoExcluded
  'loose',
  // manual excluded
  'excluded',
  // excluded by policy
  'autoExcluded',
  // manual-labeled
  'suspicious',
  // manual-labeled
  'confirmed',
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

function generateDefaultRivalClues(): RivalClues {
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
