//Core
import { takeEvery, call, all } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import {
    fillMarketItems,
    fillUserItems,
    buyItem,
    activateItem,
    filterMarketItems,
    filterUserItems,
    removeFilter,
} from './workers';

function* watchFetchMarketItems() {
    yield takeEvery(types.FETCH_MARKET_ITEMS_ASYNC, fillMarketItems);
}
function* watchFetchUserItems() {
    yield takeEvery(types.FETCH_USER_ITEMS_ASYNC, fillUserItems);
}
function* watchBuyItem() {
    yield takeEvery(types.BUY_ITEM_ASYNC, buyItem);
}
function* watchActivateItem() {
    yield takeEvery(types.ACTIVATE_ITEM_ASYNC, activateItem);
}
function* watchFilterMarketItems() {
    yield takeEvery(types.FILTER_MARKET_ITEMS_ASYNC, filterMarketItems);
}
function* watchFilterUserItems() {
    yield takeEvery(types.FILTER_USER_ITEMS_ASYNC, filterUserItems);
}
function* watchRemoveFilter() {
    yield takeEvery(types.REMOVE_MARKET_FILTER_PARAMETER_ASYNC, removeFilter);
}

export function* watchMarket() {
    yield all([
        call(watchFetchMarketItems),
        call(watchFetchUserItems),
        call(watchBuyItem),
        call(watchActivateItem),
        call(watchFilterMarketItems),
        call(watchFilterUserItems),
        call(watchRemoveFilter),
    ]);
}
