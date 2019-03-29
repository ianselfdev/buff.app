//Core
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

//Reducers
import { authReducer as auth } from '../auth/reducer';
import { uiReducer as ui } from '../ui/reducer';
import { profileReducer as profile } from '../profile/reducer';
import { marketReducer as market } from '../market/reducer';
import { newsReducer as news } from '../app/news/reducer';
import { historyReducer as history } from '../app/history/reducer';
import { bonusesReducer as bonuses } from '../app/bonuses/reducer';
import { leaderboardReducer as leaderboard } from '../app/leaderboard/reducer';
import { tournamentsReducer as tournaments } from '../app/tournaments/reducer';
import { advertisementsReducer as advertisements } from '../app/advertisements/reducer';
import { statisticsReducer as statistics } from '../app/statistics/reducer';

export const rootReducer = combineReducers({
    router,
    profile,
    auth,
    ui,
    news,
    history,
    bonuses,
    leaderboard,
    tournaments,
    advertisements,
    market,
    statistics,
});
