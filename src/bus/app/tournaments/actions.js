//Types
import { types } from './types';

export const tournamentsActions = {
    //Sync
    fillTournaments: (tournaments) => {
        return {
            type: types.FILL_TOURNAMENTS,
            payload: tournaments,
        };
    },

    //Async
    fetchTournamentsAsync: () => {
        return {
            type: types.FETCH_TOURNAMENTS_ASYNC,
        };
    },
};
