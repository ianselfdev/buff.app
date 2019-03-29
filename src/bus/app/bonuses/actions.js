//Types
import { types } from './types';

export const bonusesActions = {
    //Sync
    fillAvailableBonuses: (bonuses) => {
        return {
            type: types.FILL_AVAILABLE_BONUSES,
            payload: bonuses,
        };
    },

    //Async
    fetchAvailableBonusesAsync: () => {
        return {
            type: types.FETCH_AVAILABLE_BONUSES_ASYNC,
        };
    },
};
