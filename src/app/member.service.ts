import { Injectable } from '@angular/core';
import { Member } from './models/member.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class MemberService {
  members: FirebaseListObservable<any[]>;
  invalidRosterWarning: string;

  constructor(
    private database: AngularFireDatabase
  ) {
  this.members = database.list('members');
  this.invalidRosterWarning = "";
 }

  getMembers() {
    return this.members;
  }

  addMember(newMember: Member) {
    this.members.push(newMember);
  }

  getMemberById(memberId: string) {
    return this.database.object('members/' + memberId);
  }

  updateMember(localUpdatedMember){
    var memberEntryInFirebase = this.getMemberById(localUpdatedMember.$key);
    memberEntryInFirebase.update({name: localUpdatedMember.name,
                                teamName: localUpdatedMember.teamName,
                                username: localUpdatedMember.username,
                                password: localUpdatedMember.password,
                                players: localUpdatedMember.players,
                                isAdmin: localUpdatedMember.isAdmin});
  }

  deleteMember(localMemberToDelete){
    var memberEntryInFirebase = this.getMemberById(localMemberToDelete.$key);
    memberEntryInFirebase.remove();
  }

  validateAndSortRoster(member: Member) {
    this.invalidRosterWarning = "";
    let forwards = 0;
    let midfielders = 0;
    let defenders = 0;
    let goalkeepers = 0;
    let playerIds = [];
    
    member.players.forEach(player => {
      if (player.positions === "F") {
        forwards++;
      }
      if (player.positions === "M") {
        midfielders++;
      }
      if (player.positions === "D") {
        defenders++;
      }
      if (player.positions === "GK") {
        goalkeepers++;
      }
      
      playerIds.push(player.id);
      
    });
    
    member.players.sort(function(a, b){
      if(a.positions < b.positions) return -1;
      if(a.positions > b.positions) return 1;
      return 0;
    });
    
    if (forwards != 4) {
      this.invalidRosterWarning += "Incorrect amount of forwards. ";
    }
    if (midfielders != 6) {
      this.invalidRosterWarning += "Incorrect amount of midfielders. ";
    }
    if (defenders != 6) {
      this.invalidRosterWarning += "Incorrect amount of defenders. ";
    }
    if (goalkeepers != 2) {
      this.invalidRosterWarning += "Incorrect amount of goalkeepers. ";
    }
    if (hasDuplicates(playerIds)) {
      this.invalidRosterWarning += "Duplicate player found.";
    };

    function hasDuplicates(array) {
      return (new Set(array)).size !== array.length;
    }
  }
  
}
