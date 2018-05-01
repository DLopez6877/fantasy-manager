import { Component, Input, OnInit } from '@angular/core';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css'],
  providers: [MemberService]
})


export class EditMemberComponent implements OnInit {
  @Input() selectedMember;
  editViewHidden: boolean = true;

  constructor( private memberService: MemberService ) { }

  ngOnInit() {
  }

  beginUpdatingMember(memberToUpdate){
    this.memberService.updateMember(memberToUpdate);
    this.editViewHidden = true;
  }

  beginDeletingMember(memberToDelete){
    if(confirm("Are you sure you want to delete this item from the inventory?")){
      this.memberService.deleteMember(memberToDelete);
    }
  }

}
