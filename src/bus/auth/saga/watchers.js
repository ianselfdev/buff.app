//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//*REMEMBER TO REEXPORT
//Workers
import { login, getUserData, logout } from './workers';

function* watchLogin() {
    yield takeEvery(types.LOGIN_ASYNC, login);
}
function* watchGetUserData() {
    yield takeEvery(types.GET_USERDATA_ASYNC, getUserData);
}
function* watchLogout() {
    yield takeEvery(types.LOGOUT_ASYNC, logout);
}

export function* watchAuth() {
    yield all([call(watchLogin), call(watchGetUserData), call(watchLogout)]);
}
