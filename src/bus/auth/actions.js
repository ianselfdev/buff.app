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
    registrationSuccesfull: () => {
        return {
            type: types.REGISTRATION_SUCCESS,
        };
    },
    loginDemo: () => {
        return {
            type: types.LOGIN_DEMO,
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
    getPasswordResetCodeAsync: (email) => {
        return {
            type: types.GET_PASSWORD_RESET_CODE_ASYNC,
            payload: email,
        };
    },
    resetPasswordAsync: (email, password, code) => {
        return {
            type: types.RESET_PASSWORD_ASYNC,
            payload: { email, password, code },
        };
    },
};
