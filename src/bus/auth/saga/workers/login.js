//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST/';
import { authActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { newsActions } from '../../../app/news/actions';
import { notifications } from '../../../../components/_notifications';
import { Analytics } from '../../../../analytics';

//* apply(context, method, arrayOfArguments)
//* calls method in context and with arguments

//* put -> dispatch
export function* login({ payload: userData }) {
    try {
        yield put(uiActions.startFetching());

        //need to define response in this scope
        let response;

        //checking if userData.login is email or not
        if (userData.login.includes('@')) {
            response = yield apply(Api, Api.auth.login, [
                {
                    email: userData.login,
                    password: userData.password,
                },
            ]);
        } else {
            response = yield apply(Api, Api.auth.login, [
                {
                    login: userData.login,
                    password: userData.password,
                },
            ]);
        }

        const data = yield apply(response, response.json);
        // console.log(response);
        // console.log(data);

        if (response.status !== 200) {
            console.log(response);
            console.log(data);
            throw new Error(data.error);
        }

        if (userData.rememberMe) {
            yield apply(localStorage, localStorage.setItem, ['buff-remember-me', true]);
        }

        yield put(authActions.getUserDataAsync(data.tokens.token));
        yield put(newsActions.fetchNewsAsync());
        yield apply(localStorage, localStorage.setItem, ['buff-token', data.tokens.token]);
        yield apply(localStorage, localStorage.setItem, [
            'buff-refresh-token',
            data.tokens.refreshToken,
        ]);
        yield apply(Analytics, Analytics.userLogin, [userData.login]);
    } catch (error) {
        yield put(uiActions.stopFetching());
        yield put(uiActions.emitError(error, '-> login worker'));
        yield apply(notifications, notifications.error, [`LOGIN ${error.message}`]);
    } finally {
        yield put(uiActions.stopFetching());
    }
}
