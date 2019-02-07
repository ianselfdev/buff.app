//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST/';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';
import { authActions } from '../../../auth/actions';

//* apply(context, method, arrayOfArguments)
//* calls method in context and with arguments

//* put -> dispatch
export function* getUserData({ payload: token }) {
    try {
        const response = yield apply(Api, Api.auth.getUserData, [token]);
        const data = yield apply(response, response.json);

        if (response.status === 401) {
            yield put(authActions.logoutAsync());
            throw new Error(data.error);
        }

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(profileActions.fillProfile(data.account));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> getUserData worker'));
    }
}
