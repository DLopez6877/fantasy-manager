import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../models/member.model';

@Component({
  selector: 'app-add-mls-player',
  templateUrl: './add-mls-player.component.html',
  styleUrls: ['./add-mls-player.component.css'],
  providers: [MemberService]
})
export class AddMlsPlayerComponent implements OnInit {

  constructor(private memberService: MemberService) { }

  ngOnInit() {
  }

}
