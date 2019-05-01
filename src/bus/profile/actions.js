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
    fillGoalItem: (item) => {
        return {
            type: types.FILL_GOAL_ITEM,
            payload: item,
        };
    },
    fillReferralCode: (code) => {
        return {
            type: types.FILL_REFERRAL_CODE,
            payload: code,
        };
    },
    updateNickname: (nickname) => {
        return {
            type: types.UPDATE_NICKNAME,
            payload: nickname,
        };
    },
    updateEmail: (email) => {
        return {
            type: types.UPDATE_EMAIL,
            payload: email,
        };
    },

    //Async
    getGoalItemAsync: () => {
        return {
            type: types.GET_GOAL_ITEM_ASYNC,
        };
    },
    getReferralCodeAsync: () => {
        return {
            type: types.GET_REFERRAL_CODE_ASYNC,
        };
    },
    updateNicknameAsync: (nickname) => {
        return {
            type: types.UPDATE_NICKNAME_ASYNC,
            payload: nickname,
        };
    },
    updateEmailAsync: (email) => {
        return {
            type: types.UPDATE_EMAIL_ASYNC,
            payload: email,
        };
    },
};
