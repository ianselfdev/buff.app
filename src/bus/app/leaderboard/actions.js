//Types
import { types } from './types';

export const leaderboardActions = {
    //Sync
    fillLeadersDota: (news) => {
        return {
            type: types.FILL_LEADERS_DOTA,
            payload: news,
        };
    },

    //Async
    fetchLeadersDotaAsync: () => {
        return {
            type: types.FETCH_LEADERS_DOTA,
        };
    },
};
