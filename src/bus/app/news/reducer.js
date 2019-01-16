//Core
import { fromJS, List } from 'immutable';

//Instruments
import { types } from './types';

const initialState = List();

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_NEWS:
            return fromJS(action.payload);

        default:
            return state;
    }
};
