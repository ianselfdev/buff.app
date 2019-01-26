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

    fillGiftCode: (code) => {
        return {
            type: types.FILL_GIFT_CODE,
            payload: code,
        };
    },
    addFilterParameter: (parametersObj) => {
        return {
            type: types.ADD_FILTER_PARAMETER,
            payload: parametersObj,
        };
    },

    removeFilterParameter: (parameter) => {
        return {
            type: types.REMOVE_FILTER_PARAMETER,
            payload: parameter,
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

    activateItemAsync: (itemId) => {
        return {
            type: types.ACTIVATE_ITEM_ASYNC,
            payload: itemId,
        };
    },

    filterMarketItemsAsync: (parameter, value) => {
        return {
            type: types.FILTER_MARKET_ITEMS_ASYNC,
            payload: {
                parameter,
                value,
            },
        };
    },

    filterUserItemsAsync: (parameter, value) => {
        return {
            type: types.FILTER_USER_ITEMS_ASYNC,
            payload: {
                parameter,
                value,
            },
        };
    },

    removeFilterParameterAsync: (parameter) => {
        return {
            type: types.REMOVE_FILTER_PARAMETER_ASYNC,
            payload: parameter,
        };
    },
};
