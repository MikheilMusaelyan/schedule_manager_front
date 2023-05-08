import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
    '[Auth] Login Success'
);

export const loginFailure = createAction(
    '[Auth] Login Failure'
);

export const welcome = createAction(
    '[Auth] Welcome User'
);

export const LoginOpen = createAction(
    '[Auth] Login Page Open',
    props<{open: boolean}>()
);


export const logout = createAction('[Auth] Logout');

export const refreshToken = createAction('[Auth] Refresh Token');
