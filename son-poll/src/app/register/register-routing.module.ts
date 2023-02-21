import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterBootComponent } from './register-boot/register-boot.component';
import { RegistrationFailureComponent } from './views/registration-failure/registration-failure.component';
import { RegistrationSuccessComponent } from './views/registration-success/registration-success.component';
import { RegistrationComponent } from './views/registration/registration.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'prefix', component: RegisterBootComponent, children: [
      { path: '', pathMatch: 'prefix', redirectTo: 'create-account' },
      { path: 'signup', component: RegistrationComponent },
      { path: 'signupSuccess', component: RegistrationSuccessComponent },
      { path: 'signupFailure', component: RegistrationFailureComponent },
      { path: '**', redirectTo: '/not-found' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
