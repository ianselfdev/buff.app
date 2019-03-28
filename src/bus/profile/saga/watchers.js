//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//*REMEMBER TO REEXPORT
//Workers
import { getGoalItem, getReferralCode } from './workers';

function* watchGetGoalItem() {
    yield takeEvery(types.GET_GOAL_ITEM_ASYNC, getGoalItem);
}
function* watchGetReferralCode() {
    yield takeEvery(types.GET_REFERRAL_CODE_ASYNC, getReferralCode);
}

export function* watchProfile() {
    yield all([call(watchGetGoalItem), call(watchGetReferralCode)]);
}
