//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//*REMEMBER TO REEXPORT
//Workers
import { getGoalItem, getReferralCode, updateNickname, updateEmail } from './workers';

function* watchGetGoalItem() {
    yield takeEvery(types.GET_GOAL_ITEM_ASYNC, getGoalItem);
}
function* watchGetReferralCode() {
    yield takeEvery(types.GET_REFERRAL_CODE_ASYNC, getReferralCode);
}
function* watchUpdateNickname() {
    yield takeEvery(types.UPDATE_NICKNAME_ASYNC, updateNickname);
}
function* watchUpdateEmail() {
    yield takeEvery(types.UPDATE_EMAIL_ASYNC, updateEmail);
}

export function* watchProfile() {
    yield all([call(watchGetGoalItem), call(watchGetReferralCode), call(watchUpdateNickname), call(watchUpdateEmail)]);
}
