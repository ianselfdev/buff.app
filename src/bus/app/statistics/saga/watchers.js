//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fetchStatistics } from './workers';

function* watchFetchStatistics() {
    yield takeEvery(types.FETCH_GAMES_STATISTICS_ASYNC, fetchStatistics);
}

export function* watchStatistics() {
    yield all([call(watchFetchStatistics)]);
}
