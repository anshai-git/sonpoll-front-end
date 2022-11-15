import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthBootComponent} from './auth-boot/auth-boot.component';
import {LogInComponent} from './views/log-in/log-in.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', component: AuthBootComponent, children: [
      { path: '', pathMatch: 'prefix', redirectTo: 'login'},
      { path: 'login', component: LogInComponent },
      { path: '**', redirectTo: '/not-found' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
