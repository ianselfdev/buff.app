//Core
import { Map } from 'immutable';

//Types
import { types } from './types';

const initialState = Map({
    isAuthenticated: false,
    registrationSuccessful: false,
});

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTHENTICATE:
            return state.set('isAuthenticated', true);

        case types.LOGOUT:
            return state.set('isAuthenticated', false);

        case types.REGISTRATION_SUCCESS:
            return state.set('registrationSuccessful', true);

        default:
            return state;
    }
};
