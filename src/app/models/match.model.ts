export class Match {
  constructor (
    public id: number,
    public round: number,
    public real_round: number,
    public match: number,
    public home_squad_id: number,
    public home_squad_odds: number,
    public home_squad_odds_id: string,
    public away_squad_id: number,
    public away_squad_odds: number,
    public away_squad_odds_id: string,
    public venue_id: number,
    public status: string,
    public date: string,
    public is_first: number,
    public is_last: number,
    public final_stats: number,
    public venue_name: string,
    public home_squad_name: string,
    public away_squad_name: string,
    public home_squad_short_name: string,
    public away_squad_short_name: string,
    public home_score: number,
    public away_score: number
  ) { }
}
