import { createReducer, on } from '@ngrx/store';
import { initial_state } from './regitration.store';
import { setActionStatus } from './registration.actions';

export const registrationReducer = createReducer(
  initial_state,
  on(setActionStatus, (state, action) => {
    return {
      ...state,
      isActionInProgress: action.payload
    }
  })
)
