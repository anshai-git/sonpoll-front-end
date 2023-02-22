import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions, logIn, logInFailure, logInSuccess } from './auth.actions';
import { catchError, EMPTY, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiResponse } from '../../sp-common/api/ApiResponse';
import { LogInResponse } from '../../sp-common/response/log-in.response';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

  logIn$ = createEffect(() => this.actions$.pipe(
    ofType(logIn),
    mergeMap((action) => this.authService.logIn(action.payload).pipe(
      map(response => this.handleLogInResponse(response)),
      catchError(this.log_error)
    ))
  ))

  handleLogInSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(logInSuccess),
    mergeMap(action => of(action).pipe(
      tap(action => this.authService.handleLogInSuccess(action.payload.payload)),
      catchError(this.log_error)
    ))
  ), { dispatch: false })

  actionStart$ = createEffect(() => this.actions$.pipe(
    ofType(logIn),
    mergeMap(() => of(true).pipe(
      map(value => ({ type: AuthActions.SET_ACTION_STATUS, payload: value })),
      catchError(this.log_error)
    ))
  ))

  actionEnd$ = createEffect(() => this.actions$.pipe(
    ofType(logInSuccess, logInFailure),
    mergeMap(() => of(false).pipe(
      map(value => ({ type: AuthActions.SET_ACTION_STATUS, payload: value })),
      catchError(this.log_error)
    ))
  ))

  private handleLogInResponse(response: ApiResponse<LogInResponse>) {
    // TODO: remove console.log() for prod, eventually make it environment dependent
    console.log(response);
    return !response.error ?
      ({ type: AuthActions.LOG_IN_SUCCESS, payload: response })
      :
      ({ type: AuthActions.LOG_IN_FAILURE, payload: response })
  }

  private log_error = (err: any) => {
    // TODO: remove console.log() for prod, eventually make it environment dependent
    console.log(err);
    return EMPTY;
  }
}
