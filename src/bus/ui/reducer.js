//Core
import { Map } from 'immutable';

//Types
import { types } from './types';

const initialState = Map({
    isFetching: false,
    successLabel: false,
    errorLabel: false,
    errorMessage: '',
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCHING:
            return state.set('isFetching', true);

        case types.STOP_FETCHING:
            return state.set('isFetching', false);

        case types.SHOW_SUCCESS_LABEL:
            return state.set('successLabel', true);

        case types.HIDE_SUCCESS_LABEL:
            return state.set('successLabel', false).set('errorMessage', '');

        case types.SHOW_ERROR_LABEL:
            return state.set('errorLabel', true).set('errorMessage', action.payload.message);

        case types.HIDE_ERROR_LABEL:
            return state.set('errorLabel', false);

        case types.EMIT_ERROR:
            return state.set('errorMessage', action.payload.message);

        default:
            return state;
    }
};
