import { Stats } from './stats.model';

export class MlsPlayer {
  constructor (
      public id: number,
      public first_name: string,
      public last_name: string,
      public full_name: string,
      public known_name: string,
      public squad_id: number,
      public cost: number,
      public status: string,
      public stats: Stats,
      public positions: string,
      public is_bye: number,
      public locked: number
  ) { }
}
