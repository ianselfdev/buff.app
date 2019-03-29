//Core
import { takeEvery, call, all } from 'redux-saga/effects';

//Types
import { types } from '../types';

//Workers
import { fetchAvailableBonuses, activateAllBonuses, activateBonus } from './workers';

function* watchFetchAvailableBonuses() {
    yield takeEvery(types.FETCH_AVAILABLE_BONUSES_ASYNC, fetchAvailableBonuses);
}
function* watchActivateAllBonuses() {
    yield takeEvery(types.ACTIVATE_ALL_BONUSES_ASYNC, activateAllBonuses);
}
function* watchActivateBonus() {
    yield takeEvery(types.ACTIVATE_BONUS_ASYNC, activateBonus);
}

export function* watchBonuses() {
    yield all([
        call(watchFetchAvailableBonuses),
        call(watchActivateAllBonuses),
        call(watchActivateBonus),
    ]);
}
