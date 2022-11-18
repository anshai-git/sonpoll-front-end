import {createReducer, on} from '@ngrx/store';
import {initialState} from './auth.store';
import {setActionStatus} from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(setActionStatus, (state, action) => {
    return {
      ...state,
      isActionInProgress: action.payload
    }
  })
)
