//Core
import { put } from 'redux-saga/effects';

//Instruments
import { authActions } from '../../actions';
import { profileActions } from '../../../profile/actions';
import { historyActions } from '../../../app/history/actions';

//* apply(context, method, arrayOfArguments)
//* calls method in context and with arguments

//* put -> dispatch
export function* loginDemo() {
    const demoAccountData = {
        tier: {
            points: 3500,
            level: 'gold',
            start: 2000,
            end: 5000,
        },
        login: 'Demo_Dummy',
        isNew: true,
        balance: 0,
        bonusBalance: 0,
    };

    const demoHistoryData = [
        {
            amount: '10.00',
            data: {
                matchData: {},
                gameId: '7764',
                matchId: '1',
                victory: true,
                reward: 10,
            },
            createdAt: '2019-02-26T16:01:04.152Z',
            type: 2,
            gameId: 7764,
            isConfirmed: true,
            name: 'CS:GO',
        },
        {
            amount: '10.00',
            data: {
                matchData: {},
                gameId: '7764',
                matchId: '1',
                victory: true,
                reward: 10,
            },
            createdAt: '2019-02-26T16:01:04.152Z',
            type: 2,
            gameId: 7764,
            isConfirmed: true,
            name: 'Dota 2',
        },
        {
            amount: '0',
            data: {
                matchData: {},
                gameId: '7764',
                matchId: '1',
                victory: true,
                reward: 0,
            },
            createdAt: '2019-02-26T16:01:04.152Z',
            type: 4,
            gameId: 7764,
            isConfirmed: false,
            name: 'CS:GO',
        },
        {
            amount: '10.00',
            data: {
                matchData: {},
                gameId: '7764',
                matchId: '1',
                victory: true,
                reward: 10,
            },
            createdAt: '2019-02-26T16:01:04.152Z',
            type: 2,
            gameId: 7764,
            isConfirmed: true,
            name: 'Fortnite',
        },
        {
            amount: '10.00',
            data: {
                matchData: {},
                gameId: '7764',
                matchId: '1',
                victory: true,
                reward: 10,
            },
            createdAt: '2019-02-26T16:01:04.152Z',
            type: 2,
            gameId: 7764,
            isConfirmed: true,
            name: 'LoL',
        },
    ];

    yield put(historyActions.fillHistory(demoHistoryData));
    yield put(profileActions.fillProfile(demoAccountData));
    yield put(authActions.authenticate());
}
