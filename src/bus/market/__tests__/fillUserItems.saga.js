//Core
import { put, apply } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

//Instruments
import { Api } from '../../../REST';
import { uiActions } from '../../ui/actions';
import { marketActions } from '../actions';
import { fillUserItems } from '../saga/workers';

//Mocks
const errorMessage = 'TEST_ERROR_MESSAGE';

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

const fillUserItemsAction = marketActions.fillUserItems();

const saga = cloneableGenerator(fillUserItems)(fillUserItemsAction);
let clone = null;

describe('fillUserItems saga: ', () => {
    describe('should pass till response received', () => {
        test('should dispatch startFetching action', () => {
            expect(saga.next().value).toEqual(put(uiActions.startFetching()));
        });
        test('should call a fetch request', () => {
            expect(saga.next().value).toEqual(apply(Api, Api.market.fetchUserItems));
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
                put(uiActions.emitError(error, '-> fillUserItems worker')),
            );
        });
        test('should dispatch stopFetching action', () => {
            expect(clone.next().value).toEqual(put(uiActions.stopFetching()));
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
        test('should call for fillUserItems', () => {
            expect(saga.next(responseDataFail).value).toEqual(
                put(marketActions.fillUserItems(fetchResponseSuccess.data)),
            );
        });
        test('should dispatch stopFetching action', () => {
            expect(saga.next().value).toEqual(put(uiActions.stopFetching()));
        });
        test('should return generator\'s done = "true"', () => {
            expect(saga.next().done).toBe(true);
        });
    });
});