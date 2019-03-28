//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//*REMEMBER TO REEXPORT
//Workers
import { getGoalItem } from './workers';

function* watchGetGoalItem() {
    yield takeEvery(types.GET_GOAL_ITEM_ASYNC, getGoalItem);
}

export function* watchProfile() {
    yield all([call(watchGetGoalItem)]);
}
