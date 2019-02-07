//Core
import { fromJS, List, Map } from 'immutable';

//Instruments
import { types } from './types';

const initialState = Map({
    leaders: List(),
    filters: Map({}),
});

export const leaderboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_LEADERS_DOTA:
            return state.update('leaders', () => fromJS(action.payload));

        case types.ADD_LEADERS_FILTER_PARAMETER:
            return state.update('filters', () =>
                state.get('filters').update(action.payload.parameter, () => action.payload.value),
            );

        case types.REMOVE_LEADERS_FILTER_PARAMETER:
            return state.update('filters', () => state.get('filters').delete(action.payload));

        default:
            return state;
    }
};
