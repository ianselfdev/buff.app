//Core
import { put, apply, select } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST/api';
import { uiActions } from '../../../ui/actions';
import { marketActions } from '../../actions';
import { getFilters } from '../../selectors';

export function* filterUserItems({ payload }) {
    try {
        // yield put(uiActions.startFetching());

        yield put(marketActions.addMarketFilterParameter(payload));
        const filters = yield select(getFilters);

        const response = yield apply(Api, Api.market.filterItems, [filters]);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(marketActions.fillUserItems(data.data));
    } catch (error) {
        yield put(uiActions.emitError('-> filterUserItems worker', error));
    } finally {
        // yield put(uiActions.stopFetching());
    }
}
