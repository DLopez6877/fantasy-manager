import { Match } from './match.model';
import { MlsTeam } from "./mls-team.model";

export class Round {
  constructor (
    public id: number,
    public status: string,
    public start: string,
    public end: string,
    public bye_squads: MlsTeam[],
    public is_bye: number,
    public lifted_at: number,
    public matches: Match[],
    public type: string
  ) { }
}
