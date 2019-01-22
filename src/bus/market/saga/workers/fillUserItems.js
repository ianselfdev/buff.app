//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../REST';
import { uiActions } from '../../../ui/actions';
import { marketActions } from '../../actions';

//* apply(context, method, arrayOfArguments)
//* calls method in context and with arguments

//* put -> dispatch
export function* fillUserItems() {
    try {
        const response = yield apply(Api, Api.market.fetchUserItems);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            throw new Error(data.error);
        }

        // console.log(data);
        yield put(marketActions.fillUserItems(data.data));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> fillUserItems worker'));
    }
}
