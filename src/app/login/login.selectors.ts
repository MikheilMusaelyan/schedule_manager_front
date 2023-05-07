import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './index'

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.isLoggedIn
);

export const welcomeUser = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.welcome
);

export const loginOpenSelector = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.loginOpen
);