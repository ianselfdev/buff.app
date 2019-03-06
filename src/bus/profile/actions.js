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
    openTutorial: () => {
        return {
            type: types.OPEN_TUTORIAL,
        };
    },
    closeTutorial: () => {
        return {
            type: types.CLOSE_TUTORIAL,
        };
    },

    //Async
};
