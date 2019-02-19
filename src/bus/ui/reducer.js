//Core
import { Map } from 'immutable';

//Types
import { types } from './types';

const initialState = Map({
    isFetching: false,
    successPurchaseLabel: false,
    errorMarketLabel: false,
    successResetPasswordLabel: false,
    errorResetPasswordLabel: false,
    errorMessage: '',
    errorResetPasswordMessage: '',
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_FETCHING:
            return state.set('isFetching', true);

        case types.STOP_FETCHING:
            return state.set('isFetching', false);

        case types.SHOW_SUCCESS_PURCHASE_LABEL:
            return state.set('successPurchaseLabel', true);

        case types.HIDE_SUCCESS_PURCHASE_LABEL:
            return state.set('successPurchaseLabel', false);

        case types.SHOW_ERROR_MARKET_LABEL:
            return state.set('errorMarketLabel', true).set('errorMessage', action.payload.message);

        case types.HIDE_ERROR_MARKET_LABEL:
            return state.set('errorMarketLabel', false).set('errorMessage', '');

        case types.SHOW_SUCCESS_PASSWORD_RESET_LABEL:
            return state.set('successResetPasswordLabel', true);

        case types.HIDE_SUCCESS_PASSWORD_RESET_LABEL:
            return state.set('successResetPasswordLabel', false);

        case types.SHOW_ERROR_PASSWORD_RESET_LABEL:
            return state
                .set('errorResetPasswordLabel', true)
                .set('errorResetPasswordMessage', action.payload.message);

        case types.HIDE_ERROR_PASSWORD_RESET_LABEL:
            return state.set('errorResetPasswordLabel', false).set('errorResetPasswordMessage', '');

        case types.EMIT_ERROR:
            return state.set('errorMessage', action.payload.message);

        default:
            return state;
    }
};
