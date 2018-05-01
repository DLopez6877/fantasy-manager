import { Component } from '@angular/core';
import { MlsService } from './mls.service';
import { MlsPlayer } from './models/mls-player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fantasy Manager';

  mlsPlayers: MlsPlayer[];

  constructor(public mlsService: MlsService) { }

  ngOnInit() {
    this.mlsService.propagateData();
  }

}

