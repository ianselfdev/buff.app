//Core
import { put, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

//Instruments
import { Api } from '../../../../../REST/api';
import { statisticsActions } from '../../actions';
import { uiActions } from '../../../../ui/actions';

//* apply(context, method, arrayOfArguments)
//* викликає метод з потрібним контекстом і аргументами

//* put -> запускає діспатч
export function* fetchStatistics({ payload }) {
    try {
        const response = yield apply(Api, Api.data.fetchStatistics);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        const { countStatistics, rewardStatistics } = data;
        yield put(statisticsActions.fillCountStatistics(countStatistics));
        yield put(statisticsActions.fillRewardStatistics(rewardStatistics));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> fetchStatistics worker'));
        yield delay(5000);
        yield put(uiActions.clearErrorMessage());
    }
}
