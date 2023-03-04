import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.store';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setActionStatus, (state, action) => {
    return {
      ...state,
      isActionInProgress: action.payload
    }
  }),
  on(AuthActions.setSignupFormData, (state, action) => {
    return {
      ...state,
      authFormData: {
        ...state.authFormData,
        rememberUser: action.payload.rememberUser
      }
    }
  }),
  on(AuthActions.setAuthData, (state, action) => {
    return {
      ...state,
      authToken: action.payload.authToken,
      userData: action.payload.userData
    }
  }),
)
