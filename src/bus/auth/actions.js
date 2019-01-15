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
};
