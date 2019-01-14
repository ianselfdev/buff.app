//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST/';
import { authActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { newsActions } from '../../../app/news/actions';
import { profileActions } from '../../../profile/actions';

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
            response = yield apply(Api, Api.auth.login, [userData]);
        }

        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        console.log('login user -> ', data);
        yield put(authActions.getUserDataAsync(data.tokens.token));
        yield put(newsActions.fetchNewsAsync());
        yield put(authActions.authenticate());
    } catch (error) {
        yield put(uiActions.emitError(error, '-> login worker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
