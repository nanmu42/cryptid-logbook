import { generateDefaultGameNote, type GameNote } from './gameNote'
import { checkAndCleanConfig, type Config } from './config'

const KEY_GAME_STARTED_AT = 'gameStartedAt'
const KEY_CONFIG = 'config'
const KEY_GAME_NOTE = 'gameNote'

class PersistentStorage {
  private readonly storage: Storage = window.localStorage

  public markGameOn(config: Config): void {
    checkAndCleanConfig(config)
    this.storage.setItem(KEY_CONFIG, JSON.stringify(config))
    this.storage.setItem(KEY_GAME_NOTE, JSON.stringify(generateDefaultGameNote(config.rivalColors)))
    this.storage.setItem(KEY_GAME_STARTED_AT, new Date().toString())
  }

  public markGameOff(): void {
    this.storage.removeItem(KEY_GAME_STARTED_AT)
    this.storage.removeItem(KEY_CONFIG)
    this.storage.removeItem(KEY_GAME_NOTE)
  }

  public getGameStartedAt(): Date | null {
    const startedAt = this.storage.getItem(KEY_GAME_STARTED_AT)
    if (startedAt) {
      return new Date(startedAt)
    }
    return null
  }

  public getConfig(): Config | null {
    const config = this.storage.getItem(KEY_CONFIG)
    if (config) {
      return JSON.parse(config)
    }
    return null
  }

  public getGameNote(): GameNote | null {
    const note = this.storage.getItem(KEY_GAME_NOTE)
    if (note) {
      return JSON.parse(note)
    }
    return null
  }

  public setGameNote(note: GameNote): void {
    this.storage.setItem(KEY_GAME_NOTE, JSON.stringify(note))
  }
}

export const persistentStorage = new PersistentStorage()
