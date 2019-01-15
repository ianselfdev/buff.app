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
    yield apply(localStorage, localStorage.removeItem, ['buff-token']);
    yield apply(localStorage, localStorage.removeItem, ['buff-refresh-token']);
    yield apply(localStorage, localStorage.removeItem, ['buff-remember-me']);
    yield put(profileActions.clearProfile());
    // yield put(replace(book.login));
}
