import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './login.actions';

export interface AuthState {
  isLoggedIn: boolean;
  welcome: boolean
}

const initialState: AuthState = {
  isLoggedIn: false,
  welcome: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    isLoggedIn: true,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoggedIn: false,
  })),
  on(AuthActions.welcome, (state) => ({
    ...state,
    welcome: true,
  }))
);
