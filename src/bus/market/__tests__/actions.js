//Actions
import { marketActions } from '../actions';

//Types
import { types } from '../types';

//Instruments
const market = {
    items: [{}, {}, {}, {}],
    itemId: '1',
    giftCode: '1234-1234-1234-1234',
    parametersObj: { parameter: 'parameter', value: 'value' },
    parameter: 'parameter',
};

describe('market actions: ', () => {
    test('fillMarketItems', () => {
        expect(marketActions.fillMarketItems(market.items)).toMatchInlineSnapshot(`
Object {
  "payload": Array [
    Object {},
    Object {},
    Object {},
    Object {},
  ],
  "type": "FILL_MARKET_ITEMS",
}
`);
    });
    test('fillUserItems', () => {
        expect(marketActions.fillUserItems(market.items)).toMatchInlineSnapshot(`
Object {
  "payload": Array [
    Object {},
    Object {},
    Object {},
    Object {},
  ],
  "type": "FILL_USER_ITEMS",
}
`);
    });
    test('fillGiftCode', () => {
        expect(marketActions.fillGiftCode(market.giftCode)).toMatchInlineSnapshot(`
Object {
  "payload": "1234-1234-1234-1234",
  "type": "FILL_GIFT_CODE",
}
`);
    });
    test('addMarketFilterParameter', () => {
        expect(marketActions.addMarketFilterParameter(market.parametersObj)).toMatchInlineSnapshot(`
Object {
  "payload": Object {
    "parameter": "parameter",
    "value": "value",
  },
  "type": "ADD_MARKET_FILTER_PARAMETER",
}
`);
    });
    test('removeMarketFilterParameter', () => {
        expect(marketActions.removeMarketFilterParameter(market.parameter)).toMatchInlineSnapshot(`
Object {
  "payload": "parameter",
  "type": "REMOVE_MARKET_FILTER_PARAMETER",
}
`);
    });

    test('fetchMarketItemsAsync', () => {
        expect(marketActions.fetchMarketItemsAsync()).toMatchInlineSnapshot(`
Object {
  "type": "FETCH_MARKET_ITEMS_ASYNC",
}
`);
    });
    test('fetchUserItemsAsync', () => {
        expect(marketActions.fetchUserItemsAsync()).toMatchInlineSnapshot(`
Object {
  "type": "FETCH_USER_ITEMS_ASYNC",
}
`);
    });
    test('buyItemAsync', () => {
        expect(marketActions.buyItemAsync(market.itemId)).toMatchInlineSnapshot(`
Object {
  "payload": "1",
  "type": "BUY_ITEM_ASYNC",
}
`);
    });
    test('activateItemAsync', () => {
        expect(marketActions.activateItemAsync(market.itemId)).toMatchInlineSnapshot(`
Object {
  "payload": "1",
  "type": "ACTIVATE_ITEM_ASYNC",
}
`);
    });
    test('removeMarketFilterParameterAsync', () => {
        expect(marketActions.removeMarketFilterParameterAsync(market.parameter))
            .toMatchInlineSnapshot(`
Object {
  "payload": "parameter",
  "type": "REMOVE_MARKET_FILTER_PARAMETER_ASYNC",
}
`);
    });
    test('filterMarketItemsAsync', () => {
        expect(
            marketActions.filterMarketItemsAsync(
                market.parametersObj.parameter,
                market.parametersObj.value,
            ),
        ).toEqual({
            type: types.FILTER_MARKET_ITEMS_ASYNC,
            payload: market.parametersObj,
        });
    });
    test('filterUserItemsAsync', () => {
        expect(
            marketActions.filterUserItemsAsync(
                market.parametersObj.parameter,
                market.parametersObj.value,
            ),
        ).toEqual({
            type: types.FILTER_USER_ITEMS_ASYNC,
            payload: market.parametersObj,
        });
    });
});
