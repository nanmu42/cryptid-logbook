import {
  type PlayerColor,
  type FlattenedClue,
  ClueTerrain,
  ClueOneOfTwoTerrain,
  ClueWithin1,
  ClueWithin2,
  ClueWithin3,
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
  positive: { [key in ClueTerrain]: boolean }
  negative: { [key in ClueTerrain]: boolean }
}

export type RivalClue = {
  [key in FlattenedClue]:  // all clue begins with this state
    | 'neutral'
    // manual excluded
    | 'excluded'
    // excluded by policy
    | 'autoExcluded'
    // manual-labeled
    | 'suspicious'
    // manual-labeled
    | 'confirmed'
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
      [ClueOneOfTwoTerrain.FORREST_OR_DESERT]: 'neutral',
      [ClueOneOfTwoTerrain.FORREST_OR_LAKE]: 'neutral',
      [ClueOneOfTwoTerrain.FORREST_OR_SWAMP]: 'neutral',
      [ClueOneOfTwoTerrain.FORREST_OR_MOUNTAIN]: 'neutral',
      [ClueOneOfTwoTerrain.DESERT_OR_LAKE]: 'neutral',
      [ClueOneOfTwoTerrain.DESERT_OR_SWAMP]: 'neutral',
      [ClueOneOfTwoTerrain.DESERT_OR_MOUNTAIN]: 'neutral',
      [ClueOneOfTwoTerrain.LAKE_OR_SWAMP]: 'neutral',
      [ClueOneOfTwoTerrain.LAKE_OR_MOUNTAIN]: 'neutral',
      [ClueOneOfTwoTerrain.SWAMP_OR_MOUNTAIN]: 'neutral',
      [ClueWithin1.WITHIN1FORREST]: 'neutral',
      [ClueWithin1.WITHIN1DESERT]: 'neutral',
      [ClueWithin1.WITHIN1LAKE]: 'neutral',
      [ClueWithin1.WITHIN1SWAMP]: 'neutral',
      [ClueWithin1.WITHIN1MOUNTAIN]: 'neutral',
      [ClueWithin1.WITHIN1ANIMAL]: 'neutral',
      [ClueWithin2.WITHIN2STONE]: 'neutral',
      [ClueWithin2.WITHIN2SHACK]: 'neutral',
      [ClueWithin2.WITHIN2COUGAR]: 'neutral',
      [ClueWithin2.WITHIN2BEAR]: 'neutral',
      [ClueWithin3.WITHIN3BLUE]: 'neutral',
      [ClueWithin3.WITHIN3WHITE]: 'neutral',
      [ClueWithin3.WITHIN3GREEN]: 'neutral',
      [ClueWithin3.WITHIN3BLACK]: 'neutral',
    },
    notIn: {
      [ClueOneOfTwoTerrain.FORREST_OR_DESERT]: 'neutral',
      [ClueOneOfTwoTerrain.FORREST_OR_LAKE]: 'neutral',
      [ClueOneOfTwoTerrain.FORREST_OR_SWAMP]: 'neutral',
      [ClueOneOfTwoTerrain.FORREST_OR_MOUNTAIN]: 'neutral',
      [ClueOneOfTwoTerrain.DESERT_OR_LAKE]: 'neutral',
      [ClueOneOfTwoTerrain.DESERT_OR_SWAMP]: 'neutral',
      [ClueOneOfTwoTerrain.DESERT_OR_MOUNTAIN]: 'neutral',
      [ClueOneOfTwoTerrain.LAKE_OR_SWAMP]: 'neutral',
      [ClueOneOfTwoTerrain.LAKE_OR_MOUNTAIN]: 'neutral',
      [ClueOneOfTwoTerrain.SWAMP_OR_MOUNTAIN]: 'neutral',
      [ClueWithin1.WITHIN1FORREST]: 'neutral',
      [ClueWithin1.WITHIN1DESERT]: 'neutral',
      [ClueWithin1.WITHIN1LAKE]: 'neutral',
      [ClueWithin1.WITHIN1SWAMP]: 'neutral',
      [ClueWithin1.WITHIN1MOUNTAIN]: 'neutral',
      [ClueWithin1.WITHIN1ANIMAL]: 'neutral',
      [ClueWithin2.WITHIN2STONE]: 'neutral',
      [ClueWithin2.WITHIN2SHACK]: 'neutral',
      [ClueWithin2.WITHIN2COUGAR]: 'neutral',
      [ClueWithin2.WITHIN2BEAR]: 'neutral',
      [ClueWithin3.WITHIN3BLUE]: 'neutral',
      [ClueWithin3.WITHIN3WHITE]: 'neutral',
      [ClueWithin3.WITHIN3GREEN]: 'neutral',
      [ClueWithin3.WITHIN3BLACK]: 'neutral',
    },
    terrainBuster: {
      positive: {
        [ClueTerrain.FORREST]: false,
        [ClueTerrain.DESERT]: false,
        [ClueTerrain.LAKE]: false,
        [ClueTerrain.SWAMP]: false,
        [ClueTerrain.MOUNTAIN]: false,
      },
      negative: {
        [ClueTerrain.FORREST]: false,
        [ClueTerrain.DESERT]: false,
        [ClueTerrain.LAKE]: false,
        [ClueTerrain.SWAMP]: false,
        [ClueTerrain.MOUNTAIN]: false,
      },
    },
  }

  return clues
}
