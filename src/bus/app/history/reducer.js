//Core
import { fromJS, List, Map } from 'immutable';

//Instruments
import { types } from './types';

const initialState = Map({
    history: List(),
    filters: Map({}),
});

export const historyReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_HISTORY:
            return state.update('history', () => fromJS(action.payload));

        case types.CLEAR_HISTORY:
            return state;

        case types.ADD_HISTORY_FILTER_PARAMETER:
            return state.update('filters', () =>
                state.get('filters').update(action.payload.parameter, () => action.payload.value),
            );

        case types.REMOVE_HISTORY_FILTER_PARAMETER:
            return state.update('filters', () => state.get('filters').delete(action.payload));

        default:
            return state;
    }
};
