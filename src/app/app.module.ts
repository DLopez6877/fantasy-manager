import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { routing } from './app.routing';
import { TeamListComponent } from './team-list/team-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { masterFirebaseConfig } from './api-keys';
import { AdminComponent } from './admin/admin.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { AddMlsPlayerComponent } from './add-mls-player/add-mls-player.component';
import { MlsService } from './mls.service';
import { NewsComponent } from './news/news.component';
import { MatchesComponent } from './matches/matches.component';
import { ErrorComponent } from './error/error.component';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TeamListComponent,
    MemberDetailComponent,
    AdminComponent,
    EditMemberComponent,
    AddMlsPlayerComponent,
    NewsComponent,
    MatchesComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [MlsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
