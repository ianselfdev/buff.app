//Instruments
import { types } from './types';

const initialState = {};

export const advertisementsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CREATE_AD_INSTANCE:
            console.log('CREATE_AD_INSTANCE reducer ->', action.payload);
            return action.payload;

        default:
            return state;
    }
};
