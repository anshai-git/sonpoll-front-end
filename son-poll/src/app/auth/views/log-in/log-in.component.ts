import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogInRequest} from '../../../sp-common/request/log-in.request';
import {ApiRequest} from '../../../sp-common/api/ApiRequest';
import {Store} from '@ngrx/store';
import {logIn} from '../../ngrx/auth.actions';
import {Subscription} from 'rxjs';
import {selectAuthActionStatus} from '../../ngrx/auth.selectors';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  isAnyActionInProgress!: boolean;
  actionStatusSubscription!: Subscription;
  logInForm: FormGroup;
  rememberUser = false;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store
  ) {
    this.logInForm = formBuilder.group({
      username: formBuilder.control('', [Validators.required]),
      password: formBuilder.control('', [Validators.required])
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

  }
}
