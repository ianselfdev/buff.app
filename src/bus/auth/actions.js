import { types } from './types';

export const authActions = {
    //Sync
    authenticate: () => {
        return {
            type: types.AUTHENTICATE,
        };
    },
    logout: () => {
        return {
            type: types.LOGOUT,
        };
    },
    registrationSyccesfull: () => {
        return {
            type: types.REGISTRATION_SUCCESS,
        };
    },

    //Async
    loginAsync: (userData) => {
        return {
            type: types.LOGIN_ASYNC,
            payload: userData,
        };
    },
    loginWithTokenAsync: (token) => {
        return {
            type: types.LOGIN_WITH_TOKEN_ASYNC,
            payload: token,
        };
    },
    signupAsync: (userData) => {
        return {
            type: types.SIGNUP_ASYNC,
            payload: userData,
        };
    },
    authenticateAsync: () => {
        return {
            type: types.AUTHENTICATE_ASYNC,
        };
    },
    logoutAsync: () => {
        return {
            type: types.LOGOUT_ASYNC,
        };
    },
    getUserDataAsync: (token) => {
        return {
            type: types.GET_USERDATA_ASYNC,
            payload: token,
        };
    },
    refreshTokensAsync: () => {
        return {
            type: types.REFRESH_TOKENS_ASYNC,
        };
    },
};
