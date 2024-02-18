export const enum PlayerColor {
  RED = 'RED', // α, alpha
  GREEN = 'GREEN', // β, beta
  BLUE = 'BLUE', // γ, gamma
  BROWN = 'BROWN', // δ, delta
  PURPLE = 'PURPLE', // ε, epsilon
}

export const PLAYER_COLORS = [
  PlayerColor.RED,
  PlayerColor.GREEN,
  PlayerColor.BLUE,
  PlayerColor.BROWN,
  PlayerColor.PURPLE,
]

type ColorNames = {
  [key in PlayerColor]: string
}

const chineseColorNames: ColorNames = {
  [PlayerColor.RED]: '红',
  [PlayerColor.GREEN]: '绿',
  [PlayerColor.BLUE]: '蓝',
  [PlayerColor.BROWN]: '棕',
  [PlayerColor.PURPLE]: '紫',
}

export function getChineseColorName(color: PlayerColor): string {
  return chineseColorNames[color]
}

type ColorHexes = {
  [key in PlayerColor]: string
}

const colorHexes: ColorHexes = {
  [PlayerColor.RED]: '#9e0624',
  [PlayerColor.GREEN]: '#1ba109',
  [PlayerColor.BLUE]: '#124fc0',
  [PlayerColor.BROWN]: '#6b4d16',
  [PlayerColor.PURPLE]: '#9510a1',
}

export function getColorHex(color: PlayerColor): string {
  return colorHexes[color]
}

export type FlattenedClue = ClueOneOfTwoTerrain | ClueWithin1 | ClueWithin2 | ClueWithin3

export type Clue = ClueTerrain | FlattenedClue

export const enum ClueOneOfTwoTerrain {
  FORREST_OR_DESERT = 'FORREST_OR_DESERT',
  FORREST_OR_LAKE = 'FORREST_OR_LAKE',
  FORREST_OR_SWAMP = 'FORREST_OR_SWAMP',
  FORREST_OR_MOUNTAIN = 'FORREST_OR_MOUNTAIN',
  DESERT_OR_LAKE = 'DESERT_OR_LAKE',
  DESERT_OR_SWAMP = 'DESERT_OR_SWAMP',
  DESERT_OR_MOUNTAIN = 'DESERT_OR_MOUNTAIN',
  LAKE_OR_SWAMP = 'LAKE_OR_SWAMP',
  LAKE_OR_MOUNTAIN = 'LAKE_OR_MOUNTAIN',
  SWAMP_OR_MOUNTAIN = 'SWAMP_OR_MOUNTAIN',
}

export const enum ClueTerrain {
  FORREST = 'FORREST',
  DESERT = 'DESERT',
  LAKE = 'LAKE',
  SWAMP = 'SWAMP',
  MOUNTAIN = 'MOUNTAIN',
}

export const enum ClueWithin1 {
  WITHIN1FORREST = 'WITHIN1FORREST',
  WITHIN1DESERT = 'WITHIN1DESERT',
  WITHIN1LAKE = 'WITHIN1LAKE',
  WITHIN1SWAMP = 'WITHIN1SWAMP',
  WITHIN1MOUNTAIN = 'WITHIN1MOUNTAIN',
  WITHIN1ANIMAL = 'WITHIN1ANIMAL',
}

export const enum ClueWithin2 {
  WITHIN2STONE = 'WITHIN2STONE',
  WITHIN2SHACK = 'WITHIN2SHACK',
  WITHIN2COUGAR = 'WITHIN2COUGAR',
  WITHIN2BEAR = 'WITHIN2BEAR',
}

export const enum ClueWithin3 {
  WITHIN3BLUE = 'WITHIN3BLUE',
  WITHIN3WHITE = 'WITHIN3WHITE',
  WITHIN3GREEN = 'WITHIN3GREEN',
  WITHIN3BLACK = 'WITHIN3BLACK',
}

type ClueNames = {
  [key in Clue]: string
}

const chineseClueNames: ClueNames = {
  [ClueTerrain.FORREST]: '森林',
  [ClueTerrain.DESERT]: '沙漠',
  [ClueTerrain.LAKE]: '海洋',
  [ClueTerrain.SWAMP]: '沼泽',
  [ClueTerrain.MOUNTAIN]: '山地',
  [ClueOneOfTwoTerrain.FORREST_OR_DESERT]: '森林或沙漠',
  [ClueOneOfTwoTerrain.FORREST_OR_LAKE]: '森林或海洋',
  [ClueOneOfTwoTerrain.FORREST_OR_SWAMP]: '森林或沼泽',
  [ClueOneOfTwoTerrain.FORREST_OR_MOUNTAIN]: '森林或山地',
  [ClueOneOfTwoTerrain.DESERT_OR_LAKE]: '沙漠或海洋',
  [ClueOneOfTwoTerrain.DESERT_OR_SWAMP]: '沙漠或沼泽',
  [ClueOneOfTwoTerrain.DESERT_OR_MOUNTAIN]: '沙漠或山地',
  [ClueOneOfTwoTerrain.LAKE_OR_SWAMP]: '海洋或沼泽',
  [ClueOneOfTwoTerrain.LAKE_OR_MOUNTAIN]: '海洋或山地',
  [ClueOneOfTwoTerrain.SWAMP_OR_MOUNTAIN]: '沼泽或山地',
  [ClueWithin1.WITHIN1FORREST]: '森林+1',
  [ClueWithin1.WITHIN1DESERT]: '沙漠+1',
  [ClueWithin1.WITHIN1LAKE]: '海洋+1',
  [ClueWithin1.WITHIN1SWAMP]: '沼泽+1',
  [ClueWithin1.WITHIN1MOUNTAIN]: '山地+1',
  [ClueWithin1.WITHIN1ANIMAL]: '动物+1',
  [ClueWithin2.WITHIN2STONE]: '石柱+2',
  [ClueWithin2.WITHIN2SHACK]: '小屋+2',
  [ClueWithin2.WITHIN2COUGAR]: '狐狸+2',
  [ClueWithin2.WITHIN2BEAR]: '黑熊+2',
  [ClueWithin3.WITHIN3BLUE]: '蓝色+3',
  [ClueWithin3.WITHIN3WHITE]: '白色+3',
  [ClueWithin3.WITHIN3GREEN]: '绿色+3',
  [ClueWithin3.WITHIN3BLACK]: '黑色+3',
}

export const chineseInvertedPrefix = '不在'

export function getChineseClueName(clue: Clue, inverted: boolean): string {
  return inverted ? `${chineseInvertedPrefix}${chineseClueNames[clue]}` : chineseClueNames[clue]
}

export interface ClueGroup {
  key: string // unique, mainly for Vue
  name: string // human-readable
  flattened: boolean
  clues: Clue[]
}

const chineseClueGroups: ClueGroup[] = [
  {
    key: 'ClueTerrain',
    name: '一种地形之中',
    flattened: false,
    clues: [
      ClueTerrain.FORREST,
      ClueTerrain.DESERT,
      ClueTerrain.LAKE,
      ClueTerrain.SWAMP,
      ClueTerrain.MOUNTAIN,
    ],
  },
  {
    key: 'ClueOneOfTwoTerrain',
    name: '两种地形之中',
    flattened: true,
    clues: [
      ClueOneOfTwoTerrain.FORREST_OR_DESERT,
      ClueOneOfTwoTerrain.FORREST_OR_LAKE,
      ClueOneOfTwoTerrain.FORREST_OR_SWAMP,
      ClueOneOfTwoTerrain.FORREST_OR_MOUNTAIN,
      ClueOneOfTwoTerrain.DESERT_OR_LAKE,
      ClueOneOfTwoTerrain.DESERT_OR_SWAMP,
      ClueOneOfTwoTerrain.DESERT_OR_MOUNTAIN,
      ClueOneOfTwoTerrain.LAKE_OR_SWAMP,
      ClueOneOfTwoTerrain.LAKE_OR_MOUNTAIN,
      ClueOneOfTwoTerrain.SWAMP_OR_MOUNTAIN,
    ],
  },
  {
    key: 'ClueWithin1',
    name: '地形或动物+1',
    flattened: true,
    clues: [
      ClueWithin1.WITHIN1FORREST,
      ClueWithin1.WITHIN1DESERT,
      ClueWithin1.WITHIN1LAKE,
      ClueWithin1.WITHIN1SWAMP,
      ClueWithin1.WITHIN1MOUNTAIN,
      ClueWithin1.WITHIN1ANIMAL,
    ],
  },
  {
    key: 'ClueWithin2',
    name: '地标或特定动物+2',
    flattened: true,
    clues: [
      ClueWithin2.WITHIN2STONE,
      ClueWithin2.WITHIN2SHACK,
      ClueWithin2.WITHIN2COUGAR,
      ClueWithin2.WITHIN2BEAR,
    ],
  },
  {
    key: 'ClueWithin3',
    name: '颜色+3',
    flattened: true,
    clues: [
      ClueWithin3.WITHIN3BLUE,
      ClueWithin3.WITHIN3WHITE,
      ClueWithin3.WITHIN3GREEN,
      ClueWithin3.WITHIN3BLACK,
    ],
  },
]

export function getChineseClueGroups(includeUnflattened: boolean): ClueGroup[] {
  return includeUnflattened
    ? chineseClueGroups
    : chineseClueGroups.filter((group) => group.flattened)
}
