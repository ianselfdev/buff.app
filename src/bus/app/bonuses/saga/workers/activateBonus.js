//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { Api } from '../../../../../REST/api';
import { uiActions } from '../../../../ui/actions';
import { notifications } from '../../../../../components/_notifications';

export function* activateBonus({ payload: { id, name, amount, activationAmount } }) {
    try {
        const response = yield apply(Api, Api.bonuses.activateBonus, [id]);
        const data = yield apply(response, response.json);

        if (response.status !== 200) {
            console.log(data);
            throw new Error(data.error);
        }

        notifications.success(`${name} activated! You recieved ${amount} bonus coins!`);
        notifications.success(
            `Play and earn ${activationAmount} coins to be able to spend bonuses!`,
        );
    } catch (error) {
        yield put(uiActions.emitError(error, '-> activateBonus worker'));
        notifications.error('Error activating bonus :(');
    }
}
