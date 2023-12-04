import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  AuthActions,
  load_auth_data,
  log_in,
  log_in_failure,
  log_in_success,
  set_action_in_progress, set_auth_data,
  unset_action_in_progress
} from './auth.actions';
import { catchError, EMPTY, filter, map, mergeMap, of, tap } from 'rxjs';
import { AuthData, AuthService } from './auth.service';
import { ApiResponse } from '../../sp-common/api/ApiResponse';
import { LogInResponse } from '../../sp-common/response/log-in.response';
import { isSome, Option, Some } from 'fp-ts/lib/Option';
import { Router } from "@angular/router";
import { ActionInProgress } from 'src/app/sp-common/types';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth_service: AuthService,
    private router: Router,
  ) {
  }

  load_auth_data$ = createEffect(() => this.actions$.pipe(
    ofType(load_auth_data),
    mergeMap(() => of(this.auth_service.load_auth_data()).pipe(
      filter((auth_data_option: Option<AuthData>) => isSome(auth_data_option)),
      // NOTE: casting shouldn't be necessary
      map((auth_data_option: Option<AuthData>) => auth_data_option as Some<AuthData>),
      map((auth_data_option: Some<AuthData>) => auth_data_option.value),
      map((auth_data: AuthData) => set_auth_data({ payload: { ...auth_data } })),
      catchError(this.log_error)
    ))
  ))

  log_in$ = createEffect(() => this.actions$.pipe(
    ofType(log_in),
    mergeMap((action) => this.auth_service.log_in(action.payload).pipe(
      map((response: ApiResponse<LogInResponse>) => this.handle_log_in_response(response)),
      catchError(this.log_error)
    ))
  ))

  handle_log_in_success$ = createEffect(() => this.actions$.pipe(
    ofType(log_in_success),
    mergeMap(action => of(action).pipe(
      tap(action => this.auth_service.create_auth_cookie(action.payload.payload)),
      map(action => set_auth_data({ payload: { auth_token: action.payload.payload.token, user_data: action.payload.payload.user } })),
      map(() => this.router.navigate(['web'])),
      catchError(this.log_error)
    ))
  ), { dispatch: false })

  action_start$ = createEffect(() => this.actions$.pipe(
    ofType(log_in),
    mergeMap((action) => of({ started_at: new Date(), action: action.type }).pipe(
      map((value: ActionInProgress<AuthActions>) => set_action_in_progress({ payload: value })),
      catchError(this.log_error)
    ))
  ))

  log_in_action_end$ = createEffect(() => this.actions$.pipe(
    ofType(log_in_success, log_in_failure),
    mergeMap(() => of(AuthActions.LOG_IN).pipe(
      map(value => unset_action_in_progress({ payload: value })),
      catchError(this.log_error)
    ))
  ))

  private handle_log_in_response = (response: ApiResponse<LogInResponse>) =>
    response.error ? log_in_failure({ payload: response }) : log_in_success({ payload: response })

  private log_error = (err: any) => {
    // TODO: remove console.log() for prod, eventually make it environment dependent
    console.log(err);
    return EMPTY;
  }
}
