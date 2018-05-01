import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../models/member.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [MemberService]
})

export class AdminComponent implements OnInit {
  newMemberIsAdmin: boolean = false;

  constructor(private memberService: MemberService) {
  }

  ngOnInit() {
  }

  submitForm(newMemberName: string, newMemberTeamName:string, newMemberUsername: string, newMemberPassword: string, newMemberIsAdmin:boolean) {
    var newMemberPlayers = [];
    var newMember: Member = new Member(newMemberName, newMemberTeamName, newMemberUsername, newMemberPassword, newMemberPlayers, newMemberIsAdmin);
    this.memberService.addMember(newMember);
  }

}
