import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterBootComponent} from './register-boot/register-boot.component';
import {RegistrationComponent} from './views/registration/registration.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', component: RegisterBootComponent, children: [
      { path: '', pathMatch: 'prefix', redirectTo: 'create-account' },
      { path: 'create-account', component: RegistrationComponent },
      { path: '**', redirectTo: '/not-found' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
