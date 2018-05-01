import { MlsPlayer } from './mls-player.model';

export class Member {
  constructor (
    public name: string,
    public teamName: string,
    public username: string,
    public password: string,
    public players: MlsPlayer[],
    public isAdmin: boolean
  ) { }
}
