//Core
import { Map } from 'immutable';

//Types
import { types } from './types';

const initialState = Map({
    isFetching: false,
    errorMessage: '',
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCHING:
            return state.set('isFetching', true);

        case types.STOP_FETCHING:
            return state.set('isFetching', false);

        case types.EMIT_ERROR:
            return state.set('errorMessage', action.payload.message);

        default:
            return state;
    }
};
