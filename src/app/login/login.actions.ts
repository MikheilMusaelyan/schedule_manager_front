import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ access: string; refresh: string }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const refreshToken = createAction('[Auth] Refresh Token');
