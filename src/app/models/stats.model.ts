export class Stats {
  constructor (
    public scores: any,
    public match_scores: any,
    public round_rank: number,
    public season_rank: number,
    public games_played: number,
    public total_points: number,
    public avg_points: number,
    public high_score: number,
    public low_score: number,
    public last_3_avg: number,
    public last_5_avg: number,
    public selections: number,
    public owned_by: number,
    public prices: any
  ) { }
}
