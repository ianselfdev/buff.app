import { types } from './types';

export const marketActions = {
    //Sync
    fillMarketItems: (items) => {
        return {
            type: types.FILL_MARKET_ITEMS,
            payload: items,
        };
    },

    fillUserItems: (items) => {
        return {
            type: types.FILL_USER_ITEMS,
            payload: items,
        };
    },

    //Async
    fetchMarketItemsAsync: () => {
        return {
            type: types.FETCH_MARKET_ITEMS_ASYNC,
        };
    },

    fetchUserItemsAsync: () => {
        return {
            type: types.FETCH_USER_ITEMS_ASYNC,
        };
    },

    buyItemAsync: (itemId) => {
        return {
            type: types.BUY_ITEM_ASYNC,
            payload: itemId,
        };
    },
};
