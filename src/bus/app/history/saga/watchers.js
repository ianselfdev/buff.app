//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//*REMEMBER TO REEXPORT
//Workers
import { fillHistory } from './workers';

function* watchFetchHistory() {
    yield takeEvery(types.FETCH_HISTORY_ASYNC, fillHistory);
}

export function* watchHistory() {
    yield all([call(watchFetchHistory)]);
}
