//Core
import { Map } from 'immutable';

//Types
import { types } from './types';

const initialState = Map({
    buffId: '',
    email: '',
    firstName: '',
    lastName: '',
    login: '',
    nickname: '',
    balance: '',
    tier: {},
    isNew: false,
    goalItem: {},
});

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_PROFILE:
            return state.merge(action.payload);

        case types.FILL_GOAL_ITEM:
            return state.set('goalItem', action.payload);

        case types.CLEAR_PROFILE:
            return state.clear();

        case types.OPEN_TUTORIAL:
            return state.set('isNew', true);

        case types.CLOSE_TUTORIAL:
            return state.set('isNew', false);

        default:
            return state;
    }
};
