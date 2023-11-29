import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { PasswordResetService } from '../../service/password-reset.service'
import { ApiRequest } from '../../../sp-common/api/ApiRequest'
import { ResetPasswordRequest } from '../../../sp-common/request/reset-password.request'
import { MessageService } from 'primeng/api'
import { Router } from '@angular/router'

const POSSIBLE_ERRORS = new Map([
  ["USER_NOT_FOUND", {
    code: "User not found",
    message: "No account found for email"
  }],
  ["DEFAULT", {
    code: "Failed to send reset email",
    message: "Something went wrong, please try again later"
  }]
]);

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

  ngOnInit(): void { }

  onResetPassword(): void {
    const resetRequest: ResetPasswordRequest = { ...this.resetPasswordForm.value };
    const apiRequest: ApiRequest<ResetPasswordRequest> = ApiRequest.of(resetRequest);

    this.resetPasswordForm.reset();
    this.resetPasswordForm.disable();
    this.isLoading = true;

    this.passwordResetService.sendResetRequest(apiRequest).subscribe(response => {
      console.log(response);
      this.resetPasswordForm.reset();
      this.resetPasswordForm.enable();
      this.isLoading = false;

      if (response.error) {
        let error = POSSIBLE_ERRORS.get(response.error.code) || POSSIBLE_ERRORS.get("DEFAULT");
        this.primeToast.add({ severity: 'error', summary: error?.code, detail: error?.message });
      } else if (!response.payload) {
        let error = POSSIBLE_ERRORS.get("DEFAULT");
        this.primeToast.add({ severity: 'error', summary: error?.code, detail: error?.message });
      } else {
        this.router.navigate(['pr', 'emailVerification'])
      }
    })
  }
}
