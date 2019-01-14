//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST/';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';

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

        yield put(profileActions.fillHistory({ history: data.history }));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> fillHistory worker'));
    }
}
