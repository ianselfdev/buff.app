//Core
import { takeEvery, call, all } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fetchLeadersDota, filterLeaders, removeFilter } from './workers';

function* watchFetchLeadersDota() {
    yield takeEvery(types.FETCH_LEADERS_DOTA, fetchLeadersDota);
}
function* watchFilterLeaderboard() {
    yield takeEvery(types.FILTER_LEADERS_ASYNC, filterLeaders);
}
function* watchRemoveFilter() {
    yield takeEvery(types.REMOVE_LEADERS_FILTER_PARAMETER_ASYNC, removeFilter);
}

export function* watchLeaderboard() {
    yield all([call(watchFetchLeadersDota), call(watchFilterLeaderboard), call(watchRemoveFilter)]);
}
