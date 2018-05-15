import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { Round } from './models/round.model';
import { MlsPlayer } from './models/mls-player.model';
import { MlsTeam } from './models/mls-team.model';
import { MlsTeamTranslator } from "./mls-team-translations";
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MlsService {
  private _baseUrl = 'https://cors-anywhere.herokuapp.com/' + 'https://fgp-data-us.s3.amazonaws.com/json/mls_mls/';
  public players: MlsPlayer[];
  public rounds: BehaviorSubject<Round[]> = new BehaviorSubject<any>([]);
  public currentRound: Round;

  constructor( private http: Http ) {}

  propagateData(): void {
    this.getMlsPlayers();
    this.getRoundData();
  }

  getNewsArticles(): Observable<any> {
    return this.http.get(this._baseUrl + 'news.json?_=1522463143556');
  }

  private getMlsPlayers(): void {
    this.http.get(this._baseUrl + 'players.json?_=1521353744779').subscribe(res => {
      let players = res.json();
      players = players.map(player => this.formatFields(player));
      this.players = players;
    });
  }

  private getRoundData(): void {
    this.http.get(this._baseUrl + 'rounds.json?_=1521515434360').subscribe(res => {
      let rounds = res.json();
      this.getAllRounds(rounds);
      this.setCurrentRound(rounds);
    });
  }

  private getAllRounds(rounds): void {
    // if (this.rounds.value) return;
    rounds.forEach(round => {
      round.bye_squads = round.bye_squads.map(team => MlsTeamTranslator[team]);
    });
    this.rounds.next(rounds);
  }

  private setCurrentRound(rounds: Round[]): void {
    rounds.forEach((round, i) => {
      if (round.status === 'scheduled' && !this.currentRound) {
        this.currentRound = Object.assign({}, rounds[i - 1]);
      }
    });
  }
  
  private formatFields(player): string {
    player.full_name = `${player.first_name} ${player.last_name}`;
    player.squad_id = MlsTeamTranslator[player.squad_id];
    let playerPos = player.positions[0];
    if (playerPos === 4) {
      player.positions = "F";
    }
    if (playerPos === 3) {
      player.positions = "M";
    }
    if (playerPos === 2) {
      player.positions = "D";
    }
    if (playerPos === 1) {
      player.positions = "GK";
    }
    return player;
  }

}
