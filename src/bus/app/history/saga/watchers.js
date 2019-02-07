//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//*REMEMBER TO REEXPORT
//Workers
import { fillHistory, filterHistory, removeFilter } from './workers';

function* watchFetchHistory() {
    yield takeEvery(types.FETCH_HISTORY_ASYNC, fillHistory);
}
function* watchFilterHistory() {
    yield takeEvery(types.FILTER_HISTORY_ASYNC, filterHistory);
}
function* watchRemoveFilter() {
    yield takeEvery(types.REMOVE_HISTORY_FILTER_PARAMETER_ASYNC, removeFilter);
}

export function* watchHistory() {
    yield all([call(watchFetchHistory), call(watchFilterHistory), call(watchRemoveFilter)]);
}
