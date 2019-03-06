//Core
import { put, apply, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';

//Instruments
import { Api } from '../../../../../REST/api';
import { uiActions } from '../../../../ui/actions';
import { leaderboardActions } from '../../actions';
import { getFilters } from '../../selectors';

export function* removeFilter({ payload: parameter }) {
    try {
        yield put(uiActions.startFetching());

        yield put(leaderboardActions.removeLeadersFilterParameter(parameter));
        const filters = yield select(getFilters);

        const response = yield apply(Api, Api.data.fetchLeadersDota, [filters]);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(leaderboardActions.fillLeadersDota(data.leaderbord));
    } catch (error) {
        yield put(uiActions.emitError('-> removeFilter worker', error));
        yield delay(5000);
        yield put(uiActions.clearErrorMessage());
    } finally {
        yield put(uiActions.stopFetching());
    }
}
