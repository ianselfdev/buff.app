//Core
import { put } from 'redux-saga/effects';

//Actions
import { advertisementActions } from '../../actions';

export function* createAdInstance({ payload }) {
    const prod = process.env.NODE_ENV === 'production';
    const { OwAd } = yield window;

    if (prod) {
        const adInstance = yield new OwAd(payload);

        yield put(advertisementActions.createAdInstance(adInstance));
    }
}
