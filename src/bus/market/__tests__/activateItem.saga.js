//Core
import { put, apply } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { delay } from 'redux-saga';

//Instruments
import { Api } from '../../../REST';
import { uiActions } from '../../ui/actions';
import { marketActions } from '../actions';
import { activateItem } from '../saga/workers';

//Mocks
jest.mock('redux-saga');

const errorMessage = 'TEST_ERROR_MESSAGE';
const itemId = '1';

const error = new Error(errorMessage);

const responseDataFail = {
    error: errorMessage,
};

const responseDataSuccess = {
    data: [{}, {}, {}],
};

const fetchResponseFail400 = {
    status: 400,
    json: jest.fn(() => Promise.resolve(responseDataFail)),
};

const fetchResponseSuccess = {
    status: 200,
    json: jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const activateItemAction = marketActions.activateItemAsync();
const saga = cloneableGenerator(activateItem)(activateItemAction);
let clone = null;

describe('activateItem saga: ', () => {
    describe('should pass till response received', () => {
        test('should dispatch startFetching action', () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });
        test('should call a fetch request', () => {
            //!________??????
            expect(saga.next().value).toEqual(apply(Api, Api.market.activateItem, [void 0]));
            clone = saga.clone();
        });
    });
});
