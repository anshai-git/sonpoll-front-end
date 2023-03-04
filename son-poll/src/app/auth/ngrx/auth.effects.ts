import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions, loadAuthData, logIn, logInFailure, logInSuccess } from './auth.actions';
import { catchError, EMPTY, filter, map, mergeMap, of, tap } from 'rxjs';
import { AuthData, AuthService } from './auth.service';
import { ApiResponse } from '../../sp-common/api/ApiResponse';
import { LogInResponse } from '../../sp-common/response/log-in.response';
import { isSome, Option, Some } from 'fp-ts/lib/Option';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

  loadAuthData$ = createEffect(() => this.actions$.pipe(
    ofType(loadAuthData),
    mergeMap(() => of(this.authService.loadAuthData()).pipe(
      filter((authDataOption: Option<AuthData>) => isSome(authDataOption)),
      // NOTE: casting shouldn't be necessary
      map((authDataOption: Option<AuthData>) => authDataOption as Some<AuthData>),
      map((authDataOption: Some<AuthData>) =>  authDataOption.value),
      map((authData: AuthData) =>  ({ type: AuthActions.SET_AUTH_DATA, payload: { authToken: authData.authToken, userData: authData.userData } })),
      catchError(this.log_error)
    ))
  ))

  logIn$ = createEffect(() => this.actions$.pipe(
    ofType(logIn),
    mergeMap((action) => this.authService.logIn(action.payload).pipe(
      map((response: ApiResponse<LogInResponse>) => this.handleLogInResponse(response)),
      catchError(this.log_error)
    ))
  ))

  handleLogInSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(logInSuccess),
    mergeMap(action => of(action).pipe(
      tap(action => this.authService.handleLogInSuccess(action.payload.payload)),
      map(action => ({ type: AuthActions.SET_AUTH_DATA, payload: { authToken: action.payload.payload.token, userData: action.payload.payload.user } })),
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
    return response.error ?
      ({ type: AuthActions.LOG_IN_FAILURE, payload: response })
      :
      ({ type: AuthActions.LOG_IN_SUCCESS, payload: response })
  }

  private log_error = (err: any) => {
    // TODO: remove console.log() for prod, eventually make it environment dependent
    console.log(err);
    return EMPTY;
  }
}
