export const PLAYER_COLORS = ['RED', 'GREEN', 'BLUE', 'BROWN', 'PURPLE'] as const

export type PlayerColor = (typeof PLAYER_COLORS)[number]

type ColorNames = {
  [key in PlayerColor]: string
}

const chineseColorNames: ColorNames = {
  RED: '红',
  GREEN: '绿',
  BLUE: '蓝',
  BROWN: '棕',
  PURPLE: '紫',
}

export function getChineseColorName(color: PlayerColor): string {
  return chineseColorNames[color]
}

type ColorHexes = {
  [key in PlayerColor]: string
}

const colorHexes: ColorHexes = {
  RED: '#9e0624',
  GREEN: '#1ba109',
  BLUE: '#124fc0',
  BROWN: '#6b4d16',
  PURPLE: '#9510a1',
}

export function getColorHex(color: PlayerColor): string {
  return colorHexes[color]
}

export type FlattenedClue = ClueOneOfTwoTerrain | ClueWithin1 | ClueWithin2 | ClueWithin3

export type Clue = ClueTerrain | FlattenedClue

export const clueOneOfTwoTerrainList = [
  'FORREST_OR_DESERT',
  'FORREST_OR_LAKE',
  'FORREST_OR_SWAMP',
  'FORREST_OR_MOUNTAIN',
  'DESERT_OR_LAKE',
  'DESERT_OR_SWAMP',
  'DESERT_OR_MOUNTAIN',
  'LAKE_OR_SWAMP',
  'LAKE_OR_MOUNTAIN',
  'SWAMP_OR_MOUNTAIN',
] as const

export type ClueOneOfTwoTerrain = (typeof clueOneOfTwoTerrainList)[number]

export const clueTerrainList = ['FORREST', 'DESERT', 'LAKE', 'SWAMP', 'MOUNTAIN'] as const

export type ClueTerrain = (typeof clueTerrainList)[number]

export const clueWithin1List = [
  'WITHIN1FORREST',
  'WITHIN1DESERT',
  'WITHIN1LAKE',
  'WITHIN1SWAMP',
  'WITHIN1MOUNTAIN',
  'WITHIN1ANIMAL',
] as const

export type ClueWithin1 = (typeof clueWithin1List)[number]

export const clueWithin2List = [
  'WITHIN2STONE',
  'WITHIN2SHACK',
  'WITHIN2COUGAR',
  'WITHIN2BEAR',
] as const

export type ClueWithin2 = (typeof clueWithin2List)[number]

export const clueWithin3List = [
  'WITHIN3BLUE',
  'WITHIN3WHITE',
  'WITHIN3GREEN',
  'WITHIN3BLACK',
] as const

export type ClueWithin3 = (typeof clueWithin3List)[number]

type ClueNames = {
  [key in Clue]: string
}

export const flattenedClueList = [
  ...clueOneOfTwoTerrainList,
  ...clueWithin1List,
  ...clueWithin2List,
  ...clueWithin3List,
] as const

const chineseClueNames: ClueNames = {
  FORREST_OR_DESERT: '森林或沙漠',
  FORREST_OR_LAKE: '森林或海洋',
  FORREST_OR_SWAMP: '森林或沼泽',
  FORREST_OR_MOUNTAIN: '森林或山地',
  DESERT_OR_LAKE: '沙漠或海洋',
  DESERT_OR_SWAMP: '沙漠或沼泽',
  DESERT_OR_MOUNTAIN: '沙漠或山地',
  LAKE_OR_SWAMP: '海洋或沼泽',
  LAKE_OR_MOUNTAIN: '海洋或山地',
  SWAMP_OR_MOUNTAIN: '沼泽或山地',
  FORREST: '森林',
  DESERT: '沙漠',
  LAKE: '海洋',
  SWAMP: '沼泽',
  MOUNTAIN: '山地',
  WITHIN1FORREST: '森林+1',
  WITHIN1DESERT: '沙漠+1',
  WITHIN1LAKE: '海洋+1',
  WITHIN1SWAMP: '沼泽+1',
  WITHIN1MOUNTAIN: '山地+1',
  WITHIN1ANIMAL: '动物+1',
  WITHIN2STONE: '石柱+2',
  WITHIN2SHACK: '小屋+2',
  WITHIN2COUGAR: '狐狸+2',
  WITHIN2BEAR: '黑熊+2',
  WITHIN3BLUE: '蓝色+3',
  WITHIN3WHITE: '白色+3',
  WITHIN3GREEN: '绿色+3',
  WITHIN3BLACK: '黑色+3',
}

export const chineseInvertedPrefix = '不在'

export function getChineseClueName(clue: Clue, inverted: boolean): string {
  return inverted ? `${chineseInvertedPrefix}${chineseClueNames[clue]}` : chineseClueNames[clue]
}

export interface ClueGroup {
  key: string // unique, mainly for Vue
  name: string // human-readable
  clues: readonly Clue[]
}

export const chineseClueGroups: readonly ClueGroup[] = [
  {
    key: 'ClueOneOfTwoTerrain',
    name: '两种地形之中',
    clues: clueOneOfTwoTerrainList,
  },
  {
    key: 'ClueWithin1',
    name: '地形或动物+1',
    clues: clueWithin1List,
  },
  {
    key: 'ClueWithin2',
    name: '地标或特定动物+2',
    clues: clueWithin2List,
  },
  {
    key: 'ClueWithin3',
    name: '颜色+3',
    clues: clueWithin3List,
  },
]
