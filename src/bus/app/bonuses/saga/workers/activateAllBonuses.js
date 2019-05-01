//Core
import { put, select } from 'redux-saga/effects';

//Instruments
import { uiActions } from '../../../../ui/actions';
import { bonusesActions } from '../../actions';
import { getBonuses } from '../../selectors';

export function* activateAllBonuses() {
    try {
        const bonuses = yield select(getBonuses);
        yield bonuses.map(function*(item) {
            yield put(bonusesActions.activateBonusAsync(item));
        });
    } catch (error) {
        yield put(uiActions.emitError(error, '-> activateAllBonuses worker'));
    }
}
