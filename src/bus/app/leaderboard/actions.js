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

    addLeadersFilterParameter: (parametersObj) => {
        return {
            type: types.ADD_LEADERS_FILTER_PARAMETER,
            payload: parametersObj,
        };
    },

    removeLeadersFilterParameter: (parameter) => {
        return {
            type: types.REMOVE_LEADERS_FILTER_PARAMETER,
            payload: parameter,
        };
    },

    //Async
    fetchLeadersDotaAsync: () => {
        return {
            type: types.FETCH_LEADERS_DOTA,
        };
    },

    filterLeadersAsync: (parameter, value) => {
        return {
            type: types.FILTER_LEADERS_ASYNC,
            payload: {
                parameter,
                value,
            },
        };
    },

    removeLeadersFilterParameterAsync: (parameter) => {
        return {
            type: types.REMOVE_LEADERS_FILTER_PARAMETER_ASYNC,
            payload: parameter,
        };
    },
};
