//Core
import { takeEvery, call, all } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fillMarketItems, fillUserItems } from './workers';

function* watchFetchMarketItems() {
    yield takeEvery(types.FETCH_MARKET_ITEMS_ASYNC, fillMarketItems);
}
function* watchFetchUserItems() {
    yield takeEvery(types.FETCH_USER_ITEMS_ASYNC, fillUserItems);
}

export function* watchMarket() {
    yield all([call(watchFetchMarketItems), call(watchFetchUserItems)]);
}
