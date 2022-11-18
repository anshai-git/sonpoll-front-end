import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthStore} from './auth.store';

export const selectAuthState = createFeatureSelector<{ auth: AuthStore }>('auth');

export const selectAuthActionStatus = createSelector(
  selectAuthState,
  (authState) => authState.auth.isActionInProgress
)
