//Core
import { put, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

//Instruments
import { Api } from '../../../../../REST/api';
import { leaderboardActions } from '../../actions';
import { uiActions } from '../../../../ui/actions';

//* apply(context, method, arrayOfArguments)
//* викликає метод з потрібним контекстом і аргументами

//* put -> запускає діспатч
export function* fetchLeadersDota() {
    try {
        const response = yield apply(Api, Api.data.fetchLeadersDota);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(leaderboardActions.fillLeadersDota(data.leaderbord));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> fetchLeadersDota worker'));
        yield delay(5000);
        yield put(uiActions.clearErrorMessage());
    }
}
