//Core
import { put, apply } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { cloneableGenerator } from 'redux-saga/utils';

//Instruments
import { Api } from '../../../REST';
import { uiActions } from '../../ui/actions';
import { authActions } from '../../auth/actions';
import { marketActions } from '../actions';
import { buyItem } from '../saga/workers';

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

const buyItemAction = marketActions.buyItemAsync();

const saga = cloneableGenerator(buyItem)(buyItemAction);
let clone = null;

describe('buyItem saga: ', () => {
    describe('should pass till response received', () => {
        test('should dispatch startFetching action', () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });
        test('should call a fetch request', () => {
            //!________??????
            expect(saga.next().value).toEqual(apply(Api, Api.market.buyItem, [void 0]));
            clone = saga.clone();
        });
    });

    describe('should handle 400 status', () => {
        test('a fetch req should return 400', () => {
            expect(clone.next(fetchResponseFail400).value).toEqual(
                apply(fetchResponseFail400, fetchResponseFail400.json),
            );
        });
        test('should contain a response data obj', () => {
            expect(clone.next(responseDataFail).value).toEqual(
                put(uiActions.emitError('-> buyItem worker', error)),
            );
        });
        test('should dispatch stopFetching action', () => {
            expect(clone.next().value).toEqual(put(uiActions.stopFetching()));
        });
        test('should dispatch showErrorLabel action', () => {
            expect(clone.next().value).toEqual(put(uiActions.showErrorLabel(error)));
        });
        test('should delay by 2000', () => {
            expect(clone.next().value).toEqual(delay(2000));
        });
        test('should dispatch hideErrorLabel action', () => {
            expect(clone.next().value).toEqual(put(uiActions.hideErrorLabel()));
        });
        test('should dispatch fetchMarketItemsAsync action', () => {
            expect(clone.next().value).toEqual(put(marketActions.fetchMarketItemsAsync()));
        });
        test('should dispatch fetchUserItemsAsync action', () => {
            expect(clone.next().value).toEqual(put(marketActions.fetchUserItemsAsync()));
        });
        test('should return generator\'s done = "true"', () => {
            expect(clone.next().done).toBe(true);
        });
    });

    describe('should handle 200 status', () => {
        test('a fetch req should return 200', () => {
            expect(saga.next(fetchResponseSuccess).value).toEqual(
                apply(fetchResponseSuccess, fetchResponseSuccess.json),
            );
        });
        test('should dispatch stopFetching action', () => {
            expect(saga.next().value).toEqual(put(uiActions.stopFetching()));
        });
        test('should dispatch showSuccessLabel action', () => {
            expect(saga.next().value).toEqual(put(uiActions.showSuccessLabel()));
        });
        test('should delay by 2000', () => {
            expect(saga.next().value).toEqual(delay(2000));
        });
        test('should dispatch hideSuccessLabel action', () => {
            expect(saga.next().value).toEqual(put(uiActions.hideSuccessLabel()));
        });
        test('should dispatch getUserData action', () => {
            expect(saga.next().value).toEqual(
                put(authActions.getUserDataAsync(localStorage.getItem('buff-token'))),
            );
        });
        test('should dispatch fetchMarketItemsAsync action', () => {
            expect(saga.next().value).toEqual(put(marketActions.fetchMarketItemsAsync()));
        });
        test('should dispatch fetchUserItemsAsync action', () => {
            expect(saga.next().value).toEqual(put(marketActions.fetchUserItemsAsync()));
        });
        test('should return generator\'s done = "true"', () => {
            expect(saga.next().done).toBe(true);
        });
    });
});
