//Types
import { types } from './types';

export const uiActions = {
    startFetching: () => {
        return {
            type: types.START_FETCHING,
        };
    },

    stopFetching: () => {
        return {
            type: types.STOP_FETCHING,
        };
    },

    showSuccessMarketLabel: () => {
        return {
            type: types.SHOW_SUCCESS_PURCHASE_LABEL,
        };
    },

    showErrorMarketLabel: (error) => {
        return {
            type: types.SHOW_ERROR_MARKET_LABEL,
            payload: error,
        };
    },

    hideSuccessMarketLabel: () => {
        return {
            type: types.HIDE_SUCCESS_PURCHASE_LABEL,
        };
    },

    hideErrorMarketLabel: () => {
        return {
            type: types.HIDE_ERROR_MARKET_LABEL,
        };
    },

    showSuccessPasswordResetLabel: () => {
        return {
            type: types.SHOW_SUCCESS_PASSWORD_RESET_LABEL,
        };
    },

    hideSuccessPasswordResetLabel: () => {
        return {
            type: types.HIDE_SUCCESS_PASSWORD_RESET_LABEL,
        };
    },

    showErrorPasswordResetLabel: (error) => {
        return {
            type: types.SHOW_ERROR_PASSWORD_RESET_LABEL,
            payload: error,
        };
    },

    hideErrorPasswordResetLabel: () => {
        return {
            type: types.HIDE_ERROR_PASSWORD_RESET_LABEL,
        };
    },

    showBonusPopup: () => {
        return {
            type: types.SHOW_BONUS_POPUP,
        };
    },

    hideBonusPopup: () => {
        return {
            type: types.HIDE_BONUS_POPUP,
        };
    },

    emitError: (error, meta = null) => {
        return {
            type: types.EMIT_ERROR,
            payload: error,
            error: true,
            meta,
        };
    },
};
