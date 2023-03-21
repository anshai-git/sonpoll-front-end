import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { AuthStore } from './auth.store';

export const select_auth_state = createFeatureSelector<AuthStore>('auth');

export const select_in_progress_actions = createSelector(
  select_auth_state,
  (auth_state) => auth_state.in_progress_actions
)

export const is_action_in_progress = (action: AuthActions) => createSelector(
  select_auth_state,
  (auth_state) => !!auth_state.in_progress_actions.find(a => a.action === action)
)

export const select_auth_form_data = createSelector(
  select_auth_state,
  (auth_state) => auth_state.auth_form_data
)
