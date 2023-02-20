import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PasswordResetService } from '../../service/password-reset.service'
import { ApiRequest } from '../../../sp-common/api/ApiRequest'
import { ResetPasswordRequest } from '../../../sp-common/request/reset-password.request'
import { MessageService } from 'primeng/api'
import { Router } from '@angular/router'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [MessageService]
})
export class ForgotPasswordComponent implements OnInit {
  isLoading: boolean;
  resetPasswordForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService,
    private primeToast: MessageService,
    private router: Router
  ) {
    this.isLoading = false;
    this.resetPasswordForm = formBuilder.group({
      email: formBuilder.control('', [Validators.email, Validators.required])
    });
  }

  ngOnInit(): void {}

  onResetPassword(): void {
    const resetRequest: ResetPasswordRequest = { ...this.resetPasswordForm.value };
    const apiRequest: ApiRequest<ResetPasswordRequest> = ApiRequest.of(resetRequest);

    this.resetPasswordForm.reset();
    this.resetPasswordForm.disable();
    this.isLoading = true;

    this.passwordResetService.sendResetRequest(apiRequest).subscribe(response => {
      this.resetPasswordForm.enable();
      this.isLoading = false;

      if (response.error) {
        this.primeToast.add({severity:'error', summary:'Failed to send reset email', detail:'No account found with the given email'});
      } else {
        this.router.navigate(['pr', 'emailVerification'])
      }
    })
  }
}
