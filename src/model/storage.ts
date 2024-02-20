import { type GameNote } from './gameNote'
import { type Config } from './config'

const KEY_GAME_STARTED_AT = 'gameStartedAt'
const KEY_CONFIG = 'config'
const KEY_GAME_NOTE = 'gameNote'

class PersistentStorage {
  private readonly storage: Storage = window.localStorage

  public markGameOn(config: Config): void {
    // TODO: save config, clear game note, refresh game started_at
  }

  public markGameOff(): void {
    // TODO: clear game note, game started_at
  }

  public getGameStartedAt(): Date | null {}

  public getConfig(): Config | null {}

  public clearConfig(): void {}

  public getGameNote(): GameNote | null {}

  public setGameNote(note: GameNote): void {}
}
