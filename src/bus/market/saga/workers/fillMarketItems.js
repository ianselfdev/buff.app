//Core
import { put, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

//Instruments
import { Api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { marketActions } from '../../actions';

//* apply(context, method, arrayOfArguments)
//* calls method in context and with arguments

//* put -> dispatch
export function* fillMarketItems() {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.market.fetchMarketItems);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(marketActions.fillMarketItems(data.data));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> fillMarketItems worker'));
        yield delay(5000);
        yield put(uiActions.clearErrorMessage());
    } finally {
        yield put(uiActions.stopFetching());
    }
}
