//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST/';
import { authActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { newsActions } from '../../../app/news/actions';

//* apply(context, method, arrayOfArguments)
//* calls method in context and with arguments

//* put -> dispatch
export function* loginWithToken({ payload: userToken }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.auth.refreshToken, [userToken]);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        const { token, refreshToken } = data.tokens;

        yield put(authActions.getUserDataAsync(token));
        yield put(newsActions.fetchNewsAsync());
        yield apply(localStorage, localStorage.setItem, ['buff-remember-me', true]);
        yield apply(localStorage, localStorage.setItem, ['buff-token', token]);
        yield apply(localStorage, localStorage.setItem, ['buff-refresh-token', refreshToken]);
    } catch (error) {
        yield put(uiActions.emitError(error, '-> loginWithToken worker'));
        yield put(delay(5000));
        yield put(uiActions.clearErrorMessage());
    } finally {
        yield put(uiActions.stopFetching());
    }
}
