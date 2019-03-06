//Core
import { put, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

//Instruments
import { Api } from '../../../../REST/';
import { uiActions } from '../../../ui/actions';

export function* getPasswordResetCode({ payload: email }) {
    try {
        const response = yield apply(Api, Api.auth.getPasswordResetCode, [email]);
        const data = yield apply(response, response.json);

        console.log(data);

        if (response.status !== 200) {
            throw new Error(data.error);
        }
    } catch (error) {
        yield put(uiActions.emitError(error, '-> getPasswordResetCode worker'));
        yield put(uiActions.showErrorPasswordResetLabel(error));
        yield delay(5000);
        yield put(uiActions.hideErrorPasswordResetLabel());
        yield put(uiActions.clearErrorMessage());
    }
}
