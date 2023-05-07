import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './login.actions';

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { access, refresh }) => ({
    ...state,
    isLoggedIn: true,
    accessToken: access,
    refreshToken: refresh,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    error: null,
  }))
);
