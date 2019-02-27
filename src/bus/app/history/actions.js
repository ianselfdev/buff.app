//Types
import { types } from './types';

export const historyActions = {
    //Sync
    fillHistory: (history) => {
        return {
            type: types.FILL_HISTORY,
            payload: history,
        };
    },

    clearHistory: () => {
        return {
            type: types.CLEAR_HISTORY,
        };
    },

    addHistoryFilterParameter: (parametersObj) => {
        return {
            type: types.ADD_HISTORY_FILTER_PARAMETER,
            payload: parametersObj,
        };
    },

    removeHistoryFilterParameter: (parameter) => {
        return {
            type: types.REMOVE_HISTORY_FILTER_PARAMETER,
            payload: parameter,
        };
    },

    //Async
    fetchHistoryAsync: () => {
        return {
            type: types.FETCH_HISTORY_ASYNC,
        };
    },

    filterHistoryAsync: (parameter, value) => {
        return {
            type: types.FILTER_HISTORY_ASYNC,
            payload: {
                parameter,
                value,
            },
        };
    },

    removeHistoryFilterParameterAsync: (parameter) => {
        return {
            type: types.REMOVE_HISTORY_FILTER_PARAMETER_ASYNC,
            payload: parameter,
        };
    },
};
