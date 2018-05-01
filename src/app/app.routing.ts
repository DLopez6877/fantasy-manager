import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TeamListComponent }   from './team-list/team-list.component';
import { MemberDetailComponent }   from './member-detail/member-detail.component';
import { AdminComponent }   from './admin/admin.component';
import { MatchesComponent } from './matches/matches.component';
import { NewsComponent } from "./news/news.component";

const appRoutes: Routes = [
  {
     path: '',
     component: WelcomeComponent
   },
  {
    path: 'teamlist',
    component: TeamListComponent
  },
  {
    path: 'members/:id',
    component: MemberDetailComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'matches/:id',
    component: MatchesComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
 ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
