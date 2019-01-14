//Core
import { Map, fromJS } from 'immutable';

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
    history: [],
});

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_PROFILE:
            return state.merge(action.payload);

        case types.CLEAR_PROFILE:
            return state.clear();

        case types.FILL_HISTORY:
            return state.merge(fromJS(action.payload));

        default:
            return state;
    }
};
