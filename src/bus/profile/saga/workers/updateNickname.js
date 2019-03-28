//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../actions';

export function* updateNickname({ payload: nickname }) {
    try {
        const response = yield apply(Api, Api.account.updateNickname, [nickname]);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(profileActions.updateNickname(data.nickname));
    } catch (error) {
        yield put(uiActions.emitError('-> updateNickname worker', error));
    }
}
