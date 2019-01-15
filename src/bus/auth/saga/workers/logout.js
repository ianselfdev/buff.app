//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { profileActions } from '../../../profile/actions';
import { authActions } from '../../../auth/actions';

//* apply(context, method, arrayOfArguments)
//* викликає метод з потрібним контекстом і аргументами

//* put -> запускає діспатч
export function* logout() {
    //? maybe we should add disabling token functionality on backend?
    //? if so -> add try..catch

    yield put(authActions.logout());
    // yield put(historyActions.clearHistory());
    yield put(profileActions.clearProfile());
    yield apply(localStorage, localStorage.removeItem, ['buff-token']);
    yield apply(localStorage, localStorage.removeItem, ['remember']);
    // yield put(replace(book.login));
}
