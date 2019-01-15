//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//*REMEMBER TO REEXPORT
//Workers
import { login, getUserData, logout, signup, loginWithToken } from './workers';

function* watchLogin() {
    yield takeEvery(types.LOGIN_ASYNC, login);
}
function* watchLoginWithToken() {
    yield takeEvery(types.LOGIN_WITH_TOKEN_ASYNC, loginWithToken);
}
function* watchGetUserData() {
    yield takeEvery(types.GET_USERDATA_ASYNC, getUserData);
}
function* watchLogout() {
    yield takeEvery(types.LOGOUT_ASYNC, logout);
}
function* watchSignup() {
    yield takeEvery(types.SIGNUP_ASYNC, signup);
}

export function* watchAuth() {
    yield all([
        call(watchLogin),
        call(watchLoginWithToken),
        call(watchGetUserData),
        call(watchLogout),
        call(watchSignup),
    ]);
}
