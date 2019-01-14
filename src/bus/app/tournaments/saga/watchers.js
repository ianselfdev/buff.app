//Core
import { takeEvery, call, all } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fetchTournaments } from './workers';

function* watchFetchTournaments() {
    yield takeEvery(types.FETCH_TOURNAMENTS_ASYNC, fetchTournaments);
}

export function* watchTournaments() {
    yield all([call(watchFetchTournaments)]);
}
