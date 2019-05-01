//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../actions';

export function* getGoalItem() {
    try {
        const response = yield apply(Api, Api.market.getGoalItem);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(profileActions.fillGoalItem(data.data));
    } catch (error) {
        yield put(uiActions.emitError('-> getGoalItem worker', error));
    }
}
