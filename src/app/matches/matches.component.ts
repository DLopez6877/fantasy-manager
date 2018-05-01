import { Component, OnInit } from '@angular/core';

import { Match } from '../models/match.model';
import { Round } from '../models/round.model';
import { MlsService } from '../mls.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})

export class MatchesComponent implements OnInit {
  roundToDisplay: any;
  matches: Match[];
  teamsWithByes: number[];
  roundId: number;

  constructor(private mlsService: MlsService,
              private route: ActivatedRoute,
              private router: Router) {
                router.events.subscribe((val) => {
                  if (val instanceof NavigationEnd) {
                    this.populateInfo();
                  }
                });
              }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
        this.roundId = parseInt(urlParameters['id']);
    });
    this.populateInfo();
  }


  viewPreviousRound(): void {
    let previuousRound = this.roundId > 0 ? this.roundId -1 : 0;
    this.router.navigate([`matches/${previuousRound}`]);
  }
  
  
  viewNextRound(): void {
    let nextRound = this.roundId === this.mlsService.rounds.value.length ? this.roundId : this.roundId + 1;
    this.router.navigate([`matches/${nextRound}`]);
  }

  populateInfo(): void {
    this.mlsService.rounds.subscribe(rounds => {
      rounds.forEach(round => {
        if (round && round.id === this.roundId) {
          this.roundToDisplay = Object.assign({}, round);
        }
      });
    });
  }

}
