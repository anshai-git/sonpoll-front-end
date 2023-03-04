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

      // TODO: this should only beaccessible if we are sure that there was a forgot password request
      { path: 'emailVerification', component: EmailVerification },

      // TODO: this soulh only be accessible if we have a valid token
      { path: 'setNewPassword', component: SetNewPasswordComponent },

      // TODO: this should only be accessible if there was a password reset
      { path: 'passwordReset', component: PasswordResetCompleteComponent },

      // TODO: this should only be accessible if there was a password reset
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
