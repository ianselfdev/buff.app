//Core
import { fromJS, List, Map } from 'immutable';

//Instruments
import { types } from './types';

const initialState = Map({
    market: List(),
    user: List(),
});

export const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_MARKET_ITEMS:
            return state.update('market', () => fromJS(action.payload));

        case types.FILL_USER_ITEMS:
            return state.update('user', () => fromJS(action.payload));

        default:
            return state;
    }
};
