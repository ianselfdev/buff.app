//Core
import { all, call } from 'redux-saga/effects';

//Watchers
import { watchAuth } from '../auth/saga/watchers';
import { watchNews } from '../app/news/saga/watchers';
import { watchHistory } from '../app/history/saga/watchers';
import { watchBonuses } from '../app/bonuses/saga/watchers';
import { watchLeaderboard } from '../app/leaderboard/saga/watchers';
import { watchProfile } from '../profile/saga/watchers';
import { watchMarket } from '../market/saga/watchers';
import { watchTournaments } from '../app/tournaments/saga/watchers';
import { watchAdvertisements } from '../app/advertisements/saga/watchers';
import { watchStatistics } from '../app/statistics/saga/watchers';

export function* rootSaga() {
    yield all([
        call(watchAuth),
        call(watchNews),
        call(watchProfile),
        call(watchHistory),
        call(watchBonuses),
        call(watchLeaderboard),
        call(watchTournaments),
        call(watchMarket),
        call(watchAdvertisements),
        call(watchStatistics),
    ]);
}
