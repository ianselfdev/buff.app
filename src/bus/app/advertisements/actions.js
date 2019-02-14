//Core
import { types } from './types';

export const advertisementActions = {
    createAdInstance: (node) => {
        return {
            type: types.CREATE_AD_INSTANCE,
            payload: node,
        };
    },

    createAdInstanceAsync: (node) => {
        return {
            type: types.CREATE_AD_INSTANCE_ASYNC,
            payload: node,
        };
    },
};
