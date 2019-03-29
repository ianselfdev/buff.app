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
    activateAllBonusesAsync: () => {
        return {
            type: types.ACTIVATE_ALL_BONUSES_ASYNC,
        };
    },
    activateBonusAsync: (bonus) => {
        return {
            type: types.ACTIVATE_BONUS_ASYNC,
            payload: bonus,
        };
    },
};
