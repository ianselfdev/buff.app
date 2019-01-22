//Core
import { all, call } from 'redux-saga/effects';

//Watchers
import { watchAuth } from '../auth/saga/watchers';
import { watchNews } from '../app/news/saga/watchers';
import { watchHistory } from '../app/history/saga/watchers';
import { watchLeaderboard } from '../app/leaderboard/saga/watchers';
import { watchProfile } from '../profile/saga/watchers';
import { watchMarket } from '../market/saga/watchers';
import { watchTournaments } from '../app/tournaments/saga/watchers';

export function* rootSaga() {
    yield all([
        call(watchAuth),
        call(watchNews),
        call(watchProfile),
        call(watchHistory),
        call(watchLeaderboard),
        call(watchTournaments),
        call(watchMarket),
    ]);
}
