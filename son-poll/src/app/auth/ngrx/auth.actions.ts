import {createAction, props} from '@ngrx/store';
import {ApiRequest} from '../../sp-common/api/ApiRequest';
import {LogInRequest} from '../../sp-common/request/log-in.request';
import {ApiResponse} from '../../sp-common/api/ApiResponse';
import {LogInResponse} from '../../sp-common/response/log-in.response';

export enum AuthActions {
  SET_ACTION_STATUS = 'SET_ACTION_STATUS',

  LOG_IN = 'LOG_IN',
  LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE = 'LOG_IN_FAILURE',
}

export const setActionStatus = createAction(
  AuthActions.SET_ACTION_STATUS,
  props<{ payload: boolean }>()
);

export const logIn = createAction(
  AuthActions.LOG_IN,
  props<{ payload: ApiRequest<LogInRequest>}>()
);

export const logInSuccess = createAction(
  AuthActions.LOG_IN_SUCCESS,
  props<{ payload: ApiResponse<LogInResponse>}>()
);

export const logInFailure = createAction(
  AuthActions.LOG_IN_FAILURE,
  props<{ payload: ApiResponse<LogInResponse>}>()
);
