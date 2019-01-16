//Core
import { takeEvery, call, all } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fetchNews } from './workers';

function* watchFetchNews() {
    yield takeEvery(types.FETCH_NEWS_ASYNC, fetchNews);
}

export function* watchNews() {
    yield all([call(watchFetchNews)]);
}
