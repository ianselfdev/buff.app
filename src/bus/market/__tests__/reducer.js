//Core
import { fromJS, List, Map } from 'immutable';

//Actions
import { marketActions } from '../actions';

//Reducer
import { marketReducer } from '../reducer';

const initialState = Map({
    market: List(),
    user: List(),
    filters: Map({}),
    giftCode: '',
});

describe('market reducer: ', () => {
    test('should return initial state by default', () => {
        //* 'void 0' returns undefined - good practice insted of passing undefined itself
        expect(marketReducer(void 0, {})).toEqual(initialState);
    });
    //!_____read how to test nested immutable structures
    test('should handle FILL_MARKET_ITEMS action', () => {
        expect(marketReducer(void 0, marketActions.fillMarketItems)).toEqual(initialState);
    });
});
