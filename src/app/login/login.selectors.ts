import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './index'

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAccessToken = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.accessToken
);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.isLoggedIn
);