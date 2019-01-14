//Core
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

//Reducers
import { authReducer as auth } from '../auth/reducer';
import { uiReducer as ui } from '../ui/reducer';
import { profileReducer as profile } from '../profile/reducer';
import { newsReducer as news } from '../app/news/reducer';
import { historyReducer as history } from '../app/history/reducer';
import { leaderboardReducer as leaderboard } from '../app/leaderboard/reducer';
import { tournamentsReducer as tournaments } from '../app/tournaments/reducer';

export const rootReducer = combineReducers({
    router,
    profile,
    auth,
    ui,
    news,
    history,
    leaderboard,
    tournaments,
});
