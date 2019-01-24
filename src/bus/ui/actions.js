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

    showSuccessLabel: () => {
        return {
            type: types.SHOW_SUCCESS_LABEL,
        };
    },

    showErrorLabel: () => {
        return {
            type: types.SHOW_ERROR_LABEL,
        };
    },

    hideSuccessLabel: () => {
        return {
            type: types.HIDE_SUCCESS_LABEL,
        };
    },

    hideErrorLabel: () => {
        return {
            type: types.HIDE_ERROR_LABEL,
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
