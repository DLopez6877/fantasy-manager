import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseObjectObservable } from 'angularfire2/database';

import { Member } from '../models/member.model';
import { MlsPlayer } from '../models/mls-player.model';
import { MemberService } from './../member.service';
import { MlsService } from '../mls.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  providers: [MemberService]
})

export class MemberDetailComponent implements OnInit {
  memberId: string;
  memberToDisplay: Member;
  currentRound: number;
  pendingUpdate: boolean;
  score: number = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private memberService: MemberService,
    private mlsService: MlsService
  ) {}

  ngOnInit() {
    this.route.params.forEach(urlParameters => {
      this.memberId = urlParameters['id'];
    });
    
    this.memberService.getMemberById(this.memberId).subscribe(res => {
      if (res.players) {
        res.players = res.players.map(player => this.updatePlayerStats(player));
        if (this.pendingUpdate) {
          this.memberService.updateMember(res);
        }
        this.memberToDisplay = res;
        this.memberService.validateRoster(this.memberToDisplay);
      } else {
        this.memberToDisplay = res;
      }
    });
  }

  updatePlayerStats(memberPlayer: MlsPlayer) {
    let output;
    this.mlsService.players.forEach(player => {
      if (memberPlayer.id === player.id) {
        if ( memberPlayer.stats.total_points != player.stats.total_points) {
          this.pendingUpdate = true;
        }
        output = player;
      }
    });
    return output;
  }

  deletePlayer(player: MlsPlayer) {
    if(confirm(`Are you sure you want to remove ${player.full_name} from your squad?`)) {
      this.memberToDisplay.players = this.memberToDisplay.players.filter(function( obj ) {
        return obj.id !== player.id;
      });
      this.memberService.updateMember(this.memberToDisplay);
      this.memberService.validateRoster(this.memberToDisplay);
    };
  }

  togglePlayerSelection(e, player: MlsPlayer){
    if (!player.stats.scores[this.mlsService.currentRound.id]) {
      player.stats.scores[this.mlsService.currentRound.id] = 0;
    }
    if (e.target.checked){
      this.score += player.stats.scores[this.mlsService.currentRound.id];
    } else {
      this.score -= player.stats.scores[this.mlsService.currentRound.id];
    }
  }

}