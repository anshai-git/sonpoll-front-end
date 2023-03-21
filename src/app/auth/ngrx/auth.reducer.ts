import { createReducer, on } from '@ngrx/store'
import { initial_state } from './auth.store'
import * as AuthActions from './auth.actions'

export const authReducer = createReducer(
  initial_state,
  on(AuthActions.set_action_in_progress, (state, action) => {
    return {
      ...state,
      in_progress_actions: ([...state.in_progress_actions, action.payload])
    }
  }),
  on(AuthActions.set_signup_form_data, (state, action) => {
    return {
      ...state,
      auth_form_data: {
        ...state.auth_form_data,
        keep_logged_in: action.payload.keep_logged_in
      }
    }
  }),
  on(AuthActions.set_auth_data, (state, action) => {
    return {
      ...state,
      auth_token: action.payload.auth_token,
      user_data: action.payload.user_data
    }
  }),
)
