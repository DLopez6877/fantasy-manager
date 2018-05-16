import {FormControl, SelectMultipleControlValueAccessor} from '@angular/forms';

import { Component, OnInit, Input } from '@angular/core';
import { MemberService } from '../member.service';
import { Member } from '../models/member.model';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { MlsPlayer } from '../models/mls-player.model';
import { MlsService } from '../mls.service';
import { debounceTime } from 'rxjs/operators/debounceTime';

@Component({
  selector: 'app-add-mls-player',
  templateUrl: './add-mls-player.component.html',
  styleUrls: ['./add-mls-player.component.css'],
  providers: [MemberService]
})
export class AddMlsPlayerComponent implements OnInit {
  @Input() currentMember: Member;
  myControl: FormControl = new FormControl();
  players: MlsPlayer[];
  selectedPlayer: MlsPlayer;
  filteredOptions: Observable<MlsPlayer[]>;

  constructor(private memberService: MemberService, private mlsService: MlsService) { }

  ngOnInit() {
      this.players = this.mlsService.players;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | MlsPlayer>(''),
        debounceTime(200),
        map(value => typeof value === 'string' ? value : value.full_name),
        map(name => name ? this.filter(name) : this.players.slice())
      );
  }

  filter(name: string): MlsPlayer[] {
    return this.players.filter(option => 
      option.full_name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
  
  displayFn(player?: MlsPlayer): string | undefined {
    return player ? player.full_name : undefined;
  }

  selectPlayer(player: MlsPlayer): void {
    this.selectedPlayer = player;
  }

  submitForm() {
    if (!this.currentMember.players) {
      this.currentMember.players = [];
    };
    this.currentMember.players.push(this.selectedPlayer);
    this.memberService.updateMember(this.currentMember);
    this.memberService.validateAndSortRoster(this.currentMember);
  }

  updateDatabase() {
  }
}
