//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../../REST/api';
import { bonusesActions } from '../../actions';
import { uiActions } from '../../../../ui/actions';

export function* fetchAvailableBonuses() {
    try {
        const response = yield apply(Api, Api.bonuses.fetchAvailableBonuses);
        const data = yield apply(response, response.json);

        console.log(data);
        if (response.status !== 200) {
            throw new Error(data.error);
        }

        // yield put(bonusesActions.fillAvailableBonuses(data.bonuses));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> fetchAvailableBonuses worker'));
    }
}
