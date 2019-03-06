//Core
import { put, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';

//Instruments
import { Api } from '../../../../REST/';
import { uiActions } from '../../../ui/actions';

export function* resetPassword({ payload }) {
    try {
        const response = yield apply(Api, Api.auth.resetPassword, [payload]);
        const data = yield apply(response, response.json);

        console.log(data);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(uiActions.showSuccessPasswordResetLabel());
    } catch (error) {
        yield put(uiActions.emitError(error, '-> resetPassword worker'));
        yield put(uiActions.showErrorPasswordResetLabel(error));
        yield delay(5000);
        yield put(uiActions.hideErrorPasswordResetLabel());
        yield put(uiActions.clearErrorMessage());
    }
}
