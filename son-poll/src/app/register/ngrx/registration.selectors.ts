import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RegistrationState} from './regitration.store';

export const selectRegister = createFeatureSelector<{register: RegistrationState}>('registration');

export const selectActionStatus = createSelector(
  selectRegister,
  (state) => state.register.isActionInProgress
);
