import { RouterModule, Routes } from '@angular/router'
import { PasswordResetBootComponent } from './password-reset-boot/password-reset-boot.component'
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component'
import { EmailVerification } from './views/email-verification/email-verification.component'
import { SetNewPasswordComponent } from './views/set-new-password/set-new-password.component'
import { PasswordResetCompleteComponent } from './views/password-reset-complete/password-reset-complete.component'
import { NgModule } from '@angular/core'
import { ResetFailureComponent } from './views/reset-failure/reset-failure.component'

const routes: Routes = [
  {
    path: '', pathMatch: 'prefix', component: PasswordResetBootComponent, children: [
      { path: '', pathMatch: 'prefix', redirectTo: 'forgotPassword' },
      { path: 'forgotPassword', component: ForgotPasswordComponent },
      { path: 'emailVerification', component: EmailVerification },
      { path: 'setNewPassword', component: SetNewPasswordComponent },
      { path: 'passwordReset', component: PasswordResetCompleteComponent },
      { path: 'resetFailure', component: ResetFailureComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PasswordResetRoutingModule {}
