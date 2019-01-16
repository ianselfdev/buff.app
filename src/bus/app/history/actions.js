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

    //Async
    fetchHistoryAsync: () => {
        return {
            type: types.FETCH_HISTORY_ASYNC,
        };
    },
};
