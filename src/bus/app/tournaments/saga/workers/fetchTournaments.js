//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../../REST/api';
import { tournamentsActions } from '../../actions';
import { uiActions } from '../../../../ui/actions';

//* apply(context, method, arrayOfArguments)
//* викликає метод з потрібним контекстом і аргументами

//* put -> запускає діспатч
export function* fetchTournaments() {
    try {
        const response = yield apply(Api, Api.data.fetchTournaments);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        yield put(tournamentsActions.fillTournaments(data.tournaments));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> fetchNews worker'));
    }
}
