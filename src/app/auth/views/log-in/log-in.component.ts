import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInRequest } from '../../../sp-common/request/log-in.request';
import { ApiRequest } from '../../../sp-common/api/ApiRequest';
import { Store } from '@ngrx/store';
import { AuthActions, log_in, log_in_failure, set_login_form_data } from '../../ngrx/auth.actions';
import { Subscription, tap } from 'rxjs';
import { is_action_in_progress } from '../../ngrx/auth.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
  providers: [MessageService]
})
export class LogInComponent implements OnInit, OnDestroy {

  is_login_in_progress!: boolean;
  log_in_action_status_subscription!: Subscription;
  log_in_failure_subscription!: Subscription;

  log_in_form: FormGroup;

  constructor(
    private messageService: MessageService,
    private form_builder: FormBuilder,
    private store$: Store,
    private actions$: Actions
  ) {
    this.log_in_form = form_builder.group({
      username: form_builder.control('', [Validators.required]),
      password: form_builder.control('', [Validators.required]),
      keep_logged_in: form_builder.control(false)
    });

    this.log_in_failure_subscription = actions$.pipe(
      ofType(log_in_failure),
      tap((action) => console.log("react from log in component", action)),
      tap((action) => this.messageService.add({ severity: 'INFO', summary: action.payload.error?.code, detail: action.payload.error?.message }))
    ).subscribe();
  }

  ngOnInit(): void {
    this.log_in_action_status_subscription = this.store$.select(is_action_in_progress(AuthActions.LOG_IN))
      .subscribe(status => {
        this.is_login_in_progress = status;
      })
  }

  ngOnDestroy(): void {
    this.log_in_action_status_subscription.unsubscribe();
    this.log_in_failure_subscription.unsubscribe();
  }

  onLogIn() {
    const log_in_request: LogInRequest = { ...this.log_in_form.value }
    const api_request: ApiRequest<LogInRequest> = ApiRequest.of(log_in_request)
    const log_in_action_payload = { payload: api_request }

    this.store$.dispatch(set_login_form_data({ payload: { keep_logged_in: this.log_in_form.value.keep_logged_in } }))
    this.store$.dispatch(log_in(log_in_action_payload))
  }
}
