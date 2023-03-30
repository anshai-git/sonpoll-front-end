import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegistrationActions } from './registration.actions';
import { RegistrationState } from './regitration.store';

export const select_register_state = createFeatureSelector<RegistrationState>('registration');

export const select_actions_in_progress = createSelector(
  select_register_state,
  (state: RegistrationState) => state.actions_in_progress
)

export const is_action_in_progress = (action: RegistrationActions) => createSelector(
  select_register_state,
  (state: RegistrationState) => {
    console.log(state)
return !!state.actions_in_progress.find(a => a.action === action)
  }
)
