import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailVerification } from './views/email-verification/email-verification.component'
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component'
import { PasswordResetCompleteComponent } from './views/password-reset-complete/password-reset-complete.component'
import { SetNewPasswordComponent } from './views/set-new-password/set-new-password.component'
import { PasswordResetBootComponent } from './password-reset-boot/password-reset-boot.component'
import { PasswordResetRoutingModule } from './password-reset.routing.module'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { ReactiveFormsModule } from '@angular/forms'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api';
import { ResetFailureComponent } from './views/reset-failure/reset-failure.component'

@NgModule({
  declarations: [
    EmailVerification,
    ForgotPasswordComponent,
    PasswordResetCompleteComponent,
    SetNewPasswordComponent,
    PasswordResetBootComponent,
    ResetFailureComponent,

  ],
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class PasswordResetModule { }
