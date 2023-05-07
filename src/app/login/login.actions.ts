import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
    '[Auth] Login Success'
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
);

export const welcome = createAction(
    '[Auth] Welcome User'
);



export const logout = createAction('[Auth] Logout');

export const refreshToken = createAction('[Auth] Refresh Token');
