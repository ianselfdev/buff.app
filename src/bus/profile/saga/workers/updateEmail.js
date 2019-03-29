//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../actions';
import {notifications} from '../../../../components/_notifications';

export function* updateEmail({ payload: email }) {
    try {
        const response = yield apply(Api, Api.account.updateEmail, [email]);
        const data = yield apply(response, response.json);

        console.log(data);
        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(profileActions.updateEmail(data.email));
        yield apply(notifications, notifications.success, ['Email updated successfully']);
    } catch (error) {
        yield put(uiActions.emitError('-> updateEmail worker', error));
        yield apply(notifications, notifications.error, ['Ooops! Something went wrong :(']);
    }
}
