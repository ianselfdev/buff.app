//Core
import { types } from './types';

export const statisticsActions = {
    //Sync
    fillRewardStatistics: (stats) => {
        return {
            type: types.FILL_REWARD_STATISTICS,
            payload: stats,
        };
    },
    fillCountStatistics: (stats) => {
        return {
            type: types.FILL_COUNT_STATISTICS,
            payload: stats,
        };
    },

    //Async
    fetchStatisticsAsync: (parameter, value) => {
        return {
            type: types.FETCH_GAMES_STATISTICS_ASYNC,
            payload: {
                parameter,
                value,
            },
        };
    },
};
