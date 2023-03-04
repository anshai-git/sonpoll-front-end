import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthStore } from './auth.store';

export const selectAuthState = createFeatureSelector<AuthStore>('auth');

export const selectAuthActionStatus = createSelector(
  selectAuthState,
  (authState) => {
    console.log({ authState })
    return authState.isActionInProgress
  }
);

export const selectAuthFormData = createSelector(
  selectAuthState,
  (authState) => {
    console.log({ authState });
    return authState?.authFormData
  }
);
