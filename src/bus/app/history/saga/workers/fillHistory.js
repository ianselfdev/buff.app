//Core
import { put, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

//Instruments
import { Api } from '../../../../../REST/';
import { uiActions } from '../../../../ui/actions';
import { historyActions } from '../../../history/actions';

//* apply(context, method, arrayOfArguments)
//* calls method in context and with arguments

//* put -> dispatch
export function* fillHistory() {
    try {
        const response = yield apply(Api, Api.data.fetchHistory);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(historyActions.fillHistory(data.history));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> fillHistory worker'));
        yield delay(5000);
        yield put(uiActions.clearErrorMessage());
    }
}
