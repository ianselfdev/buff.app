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
    addStatisticsFilterParameter: (parametersObj) => {
        return {
            type: types.ADD_STATISTICS_FILTER_PARAMETER,
            payload: parametersObj,
        };
    },
    removeStatisticsFilterParameter: (parameter) => {
        return {
            type: types.REMOVE_STATISTICS_FILTER_PARAMETER,
            payload: parameter,
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
    addStatisticsFilterParameterAsync: (parameter, value) => {
        return {
            type: types.ADD_STATISTICS_FILTER_PARAMETER_ASYNC,
            payload: {
                parameter,
                value,
            },
        };
    },
    removeStatisticsFilterParameterAsync: (parameter) => {
        return {
            type: types.REMOVE_STATISTICS_FILTER_PARAMETER_ASYNC,
            payload: parameter,
        };
    },
};
