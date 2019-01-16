//Core
import { takeEvery, call, all } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fetchLeadersDota } from './workers';

function* watchFetchLeadersDota() {
    yield takeEvery(types.FETCH_LEADERS_DOTA, fetchLeadersDota);
}

export function* watchLeaderboard() {
    yield all([call(watchFetchLeadersDota)]);
}
