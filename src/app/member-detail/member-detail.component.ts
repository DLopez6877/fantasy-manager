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

  
}
