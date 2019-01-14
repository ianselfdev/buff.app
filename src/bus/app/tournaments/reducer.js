//Core
import { fromJS, List } from 'immutable';

//Instruments
import { types } from './types';

const initialState = List();

export const tournamentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_TOURNAMENTS:
            return fromJS(action.payload);

        default:
            return state;
    }
};
