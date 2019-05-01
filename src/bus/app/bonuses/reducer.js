//Core
import { fromJS, List } from 'immutable';

//Instruments
import { types } from './types';

const initialState = List();

export const bonusesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_AVAILABLE_BONUSES:
            return fromJS(action.payload);

        default:
            return state;
    }
};
