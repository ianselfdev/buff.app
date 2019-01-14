//Types
import { types } from './types';

export const profileActions = {
    //Sync
    fillProfile: (profile) => {
        return {
            type: types.FILL_PROFILE,
            payload: profile,
        };
    },
    clearProfile: () => {
        return {
            type: types.CLEAR_PROFILE,
        };
    },
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
