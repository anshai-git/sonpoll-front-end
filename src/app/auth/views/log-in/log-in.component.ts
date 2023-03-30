import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInRequest } from '../../../sp-common/request/log-in.request';
import { ApiRequest } from '../../../sp-common/api/ApiRequest';
import { Store } from '@ngrx/store';
import { AuthActions, log_in, set_login_form_data } from '../../ngrx/auth.actions';
import { Subscription } from 'rxjs';
import { is_action_in_progress } from '../../ngrx/auth.selectors';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit, OnDestroy {

  is_login_in_progress!: boolean;
  log_in_action_status_subscription!: Subscription;

  log_in_form: FormGroup;

  constructor(
    private form_builder: FormBuilder,
    private store$: Store
  ) {
    this.log_in_form = form_builder.group({
      username: form_builder.control('', [Validators.required]),
      password: form_builder.control('', [Validators.required]),
      keep_logged_in: form_builder.control(false)
    });
  }

  ngOnInit(): void {
    this.log_in_action_status_subscription = this.store$.select(is_action_in_progress(AuthActions.LOG_IN))
      .subscribe(status => {
        this.is_login_in_progress = status;
      })
  }

  ngOnDestroy(): void {
    this.log_in_action_status_subscription.unsubscribe()
  }

  onLogIn() {
    const log_in_request: LogInRequest = { ...this.log_in_form.value }
    const api_request: ApiRequest<LogInRequest> = ApiRequest.of(log_in_request)
    const log_in_action_payload = { payload: api_request }

    this.store$.dispatch(set_login_form_data({ payload: { keep_logged_in: this.log_in_form.value.keep_logged_in } }))
    this.store$.dispatch(log_in(log_in_action_payload))
  }
}
