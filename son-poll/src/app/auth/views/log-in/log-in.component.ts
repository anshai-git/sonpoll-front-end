import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogInRequest} from '../../../sp-common/request/log-in.request';
import {ApiRequest} from '../../../sp-common/api/ApiRequest';
import {Store} from '@ngrx/store';
import {logIn} from '../../ngrx/auth.actions';
import {Subscription} from 'rxjs';
import {selectAuthActionStatus} from '../../ngrx/auth.selectors';
import {AuthService} from '../../ngrx/auth.service';
import {SendPasswordResetEmailRequest} from '../../../sp-common/request/send-password-reset-email.request';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  isPasswordResetInProgress = false;
  isForgotPasswordDialogVisible = false;
  isAnyActionInProgress!: boolean;
  actionStatusSubscription!: Subscription;
  logInForm: FormGroup;
  resetPasswordForm: FormGroup;
  rememberUser = false;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store,
    private authService: AuthService
  ) {
    this.logInForm = formBuilder.group({
      username: formBuilder.control('', [Validators.required]),
      password: formBuilder.control('', [Validators.required])
    });

    this.resetPasswordForm = formBuilder.group({
      email: formBuilder.control('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this.actionStatusSubscription = this.store$.select(selectAuthActionStatus).subscribe(status => {
      this.isAnyActionInProgress = status;
    })
  }

  onLogIn() {
    const logInRequest: LogInRequest = {
      username: this.logInForm.value.username,
      password: this.logInForm.value.password
    }
    const apiRequest: ApiRequest<LogInRequest> = ApiRequest.of(logInRequest);
    const logInActionPayload = { payload: apiRequest };

    this.store$.dispatch(logIn(logInActionPayload));
  }

  onForgotPassword() {
    this.isForgotPasswordDialogVisible = true;
  }

  async onSendPasswordResetEmail() {
    const resetPasswordRequest: SendPasswordResetEmailRequest = {
      email: this.resetPasswordForm.value.email
    }
    const apiRequest: ApiRequest<SendPasswordResetEmailRequest> = ApiRequest.of(resetPasswordRequest);


    this.authService.sendPasswordResetEmail(apiRequest).subscribe(res => {
      if (res.error) {

      }
    });
  }
}
