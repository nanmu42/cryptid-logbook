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
