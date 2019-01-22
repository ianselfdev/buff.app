//Core
import { fromJS, List } from 'immutable';

//Instruments
import { types } from './types';

const initialState = List();

export const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_MARKET_ITEMS:
            return fromJS(action.payload);

        case types.FILL_USER_ITEMS:
            return fromJS(action.payload);

        default:
            return state;
    }
};
