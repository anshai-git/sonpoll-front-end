import {createReducer, on} from '@ngrx/store';
import {initialState} from './regitration.store';
import {setActionStatus} from './registration.actions';

export const registrationReducer = createReducer(
  initialState,
  on(setActionStatus, (state, action) => {
    return {
      ...state,
      isActionInProgress: action.payload
    }
  })
)
