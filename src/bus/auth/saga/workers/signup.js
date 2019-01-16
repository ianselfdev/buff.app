//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST/';
import { authActions } from '../../../auth/actions';
import { uiActions } from '../../../ui/actions';

//* apply(context, method, arrayOfArguments)
//* calls method in context and with arguments

//* put -> dispatch
export function* signup({ payload: userData }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.auth.signup, [userData]);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(authActions.registrationSyccesfull());
    } catch (error) {
        yield put(uiActions.emitError(error, '-> registration worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
