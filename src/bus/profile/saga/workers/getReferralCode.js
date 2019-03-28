//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../actions';

export function* getReferralCode() {
    try {
        const response = yield apply(Api, Api.auth.getReferralCode);
        const data = yield apply(response, response.json);
        console.log(data);
        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(profileActions.fillReferralCode(data.data));
    } catch (error) {
        yield put(uiActions.emitError('-> getReferralCode worker', error));
    }
}
