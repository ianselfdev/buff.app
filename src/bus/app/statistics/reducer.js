//Core
import { Map, List, fromJS } from 'immutable';

//Instruments
import { types } from './types';

const initialState = Map({
    rewardStatistics: List(),
    countStatistics: List(),
});

export const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_COUNT_STATISTICS:
            return state.update('countStatistics', () => fromJS(action.payload));

        case types.FILL_REWARD_STATISTICS:
            return state.update('rewardStatistics', () => fromJS(action.payload));

        default:
            return state;
    }
};
