//Core
import { put, apply, select } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../../REST/api';
import { uiActions } from '../../../../ui/actions';
import { historyActions } from '../../actions';
import { getFilters } from '../../selectors';

export function* removeFilter({ payload: parameter }) {
    try {
        yield put(uiActions.startFetching());

        yield put(historyActions.removeHistoryFilterParameter(parameter));
        const filters = yield select(getFilters);

        const response = yield apply(Api, Api.data.fetchHistory, [filters]);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(historyActions.fillHistory(data.history));
    } catch (error) {
        yield put(uiActions.emitError('-> removeFilter worker', error));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
