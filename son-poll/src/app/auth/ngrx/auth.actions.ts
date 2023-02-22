import { createAction, props } from '@ngrx/store';
import { ApiRequest } from '../../sp-common/api/ApiRequest';
import { LogInRequest } from '../../sp-common/request/log-in.request';
import { ApiResponse } from '../../sp-common/api/ApiResponse';
import { LogInResponse } from '../../sp-common/response/log-in.response';
import { User } from 'src/app/sp-common/model/User';
import { SignupFormData } from './auth.store';

// TODO: at logout we should clear / reset the whole ngrx store !!!

export enum AuthActions {
  SET_ACTION_STATUS = 'SET_ACTION_STATUS',

  LOG_IN = 'LOG_IN',
  LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE = 'LOG_IN_FAILURE',

  SET_AUTH_DATA = 'SET_AUTH_DATA',
  CLEAR_AUTH_DATA = 'CLEAR_AUTH_DATA',

  SET_SIGNUP_FORM_DATA = 'SET_SIGNUP_FORM_DATA',
  CLEAR_SIGNUP_FORM_DATA = 'CLEAR_SIGNUP_FORM_DATA',
}

export const setActionStatus = createAction(
  AuthActions.SET_ACTION_STATUS,
  props<{ payload: boolean }>()
);

export const logIn = createAction(
  AuthActions.LOG_IN,
  props<{ payload: ApiRequest<LogInRequest> }>()
);

export const logInSuccess = createAction(
  AuthActions.LOG_IN_SUCCESS,
  props<{ payload: ApiResponse<LogInResponse> }>()
);

export const logInFailure = createAction(
  AuthActions.LOG_IN_FAILURE,
  props<{ payload: ApiResponse<LogInResponse> }>()
);

export const setAuthData = createAction(
  AuthActions.SET_AUTH_DATA,
  props<{ payload: { userData: User, authToken: string } }>()
);

export const clearAuthData = createAction(AuthActions.CLEAR_AUTH_DATA);

export const setSignupFormData = createAction(
  AuthActions.SET_SIGNUP_FORM_DATA,
  props<{ payload: SignupFormData }>()
);

export const clearSignUpFormData = createAction(AuthActions.CLEAR_SIGNUP_FORM_DATA);
