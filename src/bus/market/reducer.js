//Core
import { fromJS, List, Map } from 'immutable';

//Instruments
import { types } from './types';

const initialState = Map({
    market: List(),
    user: List(),
    filters: Map({}),
    giftCode: '',
});

export const marketReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_MARKET_ITEMS:
            return state.update('market', () => fromJS(action.payload));

        case types.FILL_USER_ITEMS:
            return state.update('user', () => fromJS(action.payload));

        case types.FILL_GIFT_CODE:
            return state.update('giftCode', () => action.payload);

        case types.ADD_FILTER_PARAMETER:
            return state.update('filters', () =>
                state.get('filters').update(action.payload.parameter, () => action.payload.value),
            );
        case types.REMOVE_FILTER_PARAMETER:
            return state.update('filters', () => state.get('filters').delete(action.payload));

        default:
            return state;
    }
};
