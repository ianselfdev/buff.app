// Mocks
import { LocalStorage } from './mocks/localStorage';
import { fetch } from './mocks/fetch';

const successMesasge = 'TEST_SUCCESS_MESSAGE.';
const errorMessage = 'TEST_ERROR_MESSAGE.';
const token = 'TEST_TOKEN';
const error = new Error(errorMessage);
const url = 'https://www.url.com';

const credentials = {
    login: 'roquefore',
    password: '1111',
    remember: true,
};

const market = {
    items: [{}, {}, {}, {}],
    itemId: '1',
};

global.__ = {
    market,
    token,
    error,
    url,
    credentials,
};
global.fetch = fetch;
global.LocalStorage = new LocalStorage();
