import { createReducer, on } from '@ngrx/store';
import { initial_state } from './regitration.store';
import {
  clear_action_in_progress,
  set_action_in_progress,
} from './registration.actions';
import * as _ from 'lodash';

export const registrationReducer = createReducer(
  initial_state,
  on(set_action_in_progress, (state, action) => {
    return {
      ...state,
      actions_in_progress: [...state.actions_in_progress, action.payload],
    };
  }),
  on(clear_action_in_progress, (state, action) => {
    return {
      ...state,
      actions_in_progress: [
        ...state.actions_in_progress.filter((a) => a.action === action.payload),
      ],
    };
  })
);
