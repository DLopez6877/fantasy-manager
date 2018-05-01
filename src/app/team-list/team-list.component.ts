import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';

import { Member } from '../models/member.model';
import { MemberService } from './../member.service';
import { MlsPlayer } from '../models/mls-player.model';
import { MlsService } from '../mls.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
  providers: [MemberService, MlsService]
})


export class TeamListComponent implements OnInit {
  members: FirebaseListObservable<any[]>;

  constructor(
    private router: Router,
    private memberService: MemberService,
    private mlsService: MlsService,
  ){}

  ngOnInit() {
    this.members = this.memberService.getMembers();
  }

  goToDetailPage(clickedMember) {
      this.router.navigate(['members', clickedMember.$key]);
  };
}
