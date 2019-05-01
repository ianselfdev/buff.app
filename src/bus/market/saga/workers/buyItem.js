//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../../auth/actions';
import { profileActions } from '../../../profile/actions';
import { marketActions } from '../../actions';
import { notifications } from '../../../../components/_notifications';

export function* buyItem({ payload: itemId }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.market.buyItem, [itemId]);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(uiActions.stopFetching());
        yield apply(notifications, notifications.success, ['Purchase successful!']);
        yield put(authActions.getUserDataAsync(localStorage.getItem('buff-token')));
        yield put(marketActions.fetchMarketItemsAsync());
        yield put(marketActions.fetchUserItemsAsync());
        yield put(profileActions.getGoalItemAsync());
    } catch (error) {
        yield put(uiActions.emitError('-> buyItem worker', error));
        yield put(uiActions.stopFetching());
        yield apply(notifications, notifications.error, [error.message]);
        yield put(marketActions.fetchMarketItemsAsync());
        yield put(marketActions.fetchUserItemsAsync());
    }
}
