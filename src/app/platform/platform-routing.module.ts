import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformBootComponent } from './platform-boot/platform-boot.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CreatePollComponent } from './views/create-poll/create-poll.component';
import { EditPollComponent } from './views/edit-poll/edit-poll.component';
import { UserPollsComponent } from './views/user-polls/user-polls.component';
import { UserVotesComponent } from './views/user-votes/user-votes.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'prefix', component: PlatformBootComponent, children: [
      { path: '', pathMatch: 'prefix', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },

      { path: 'user-account', component: DashboardComponent },

      { path: 'create-poll', component: CreatePollComponent },
      { path: 'edit-poll', component: EditPollComponent },
      { path: 'polls', component: UserPollsComponent },
      { path: 'votes', component: UserVotesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
