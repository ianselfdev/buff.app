//Core
import { takeEvery, all, call } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { createAdInstance } from './workers';

function* watchCreateAdInstance() {
    yield takeEvery(types.CREATE_AD_INSTANCE_ASYNC, createAdInstance);
}

export function* watchAdvertisements() {
    yield all([call(watchCreateAdInstance)]);
}
