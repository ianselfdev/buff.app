//Core
import { takeEvery, call, all } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fetchAvailableBonuses } from './workers';

function* watchFetchAvailableBonuses() {
    yield takeEvery(types.FETCH_AVAILABLE_BONUSES_ASYNC, fetchAvailableBonuses);
}

export function* watchBonuses() {
    yield all([call(watchFetchAvailableBonuses)]);
}
