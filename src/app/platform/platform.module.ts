import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { PlatformBootComponent } from './platform-boot/platform-boot.component';
import { CreatePollComponent } from './views/create-poll/create-poll.component';
import { UserPollsComponent } from './views/user-polls/user-polls.component';
import { UserVotesComponent } from './views/user-votes/user-votes.component';
import { UserAccountComponent } from './views/user-account/user-account.component';
import { EditPollComponent } from './views/edit-poll/edit-poll.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {SplitterModule} from 'primeng/splitter';


@NgModule({
  declarations: [
    PlatformBootComponent,
    CreatePollComponent,
    UserPollsComponent,
    UserVotesComponent,
    UserAccountComponent,
    EditPollComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    SplitterModule
  ]
})
export class PlatformModule { }
