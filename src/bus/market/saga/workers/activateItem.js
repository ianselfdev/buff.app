//Core
import { put, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

//Instruments
import { Api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { marketActions } from '../../actions';

export function* activateItem({ payload: itemId }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.market.activateItem, [itemId]);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(marketActions.fillGiftCode(data.giftCode));
    } catch (error) {
        yield put(uiActions.emitError('-> activateItem worker', error));
        yield put(uiActions.stopFetching());
        yield put(uiActions.showErrorMarketLabel(error));
        yield delay(5000);
        yield put(uiActions.hideErrorMarketLabel());
        yield put(uiActions.clearErrorMessage());
    } finally {
        yield put(uiActions.stopFetching());
    }
}
