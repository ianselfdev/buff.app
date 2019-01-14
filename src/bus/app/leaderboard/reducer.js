//Core
import { fromJS, List } from 'immutable';

//Instruments
import { types } from './types';

const initialState = List();

export const leaderboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_LEADERS_DOTA:
            return fromJS(action.payload);

        default:
            return state;
    }
};
