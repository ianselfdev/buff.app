//Core
import { createStore, combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

//Reducers
import { authReducer as auth } from '../../auth/reducer';
import { uiReducer as ui } from '../../ui/reducer';
import { profileReducer as profile } from '../../profile/reducer';
import { marketReducer as market } from '../../market/reducer';
import { newsReducer as news } from '../../app/news/reducer';
import { historyReducer as history } from '../../app/history/reducer';
import { leaderboardReducer as leaderboard } from '../../app/leaderboard/reducer';
import { tournamentsReducer as tournaments } from '../../app/tournaments/reducer';

//Store
import { store } from '../store';

const referenceRootReducer = combineReducers({
    router,
    profile,
    auth,
    ui,
    news,
    history,
    leaderboard,
    tournaments,
    market,
});

const referenceStore = createStore(referenceRootReducer);

describe('store: ', () => {
    test('should have valid state shape', () => {
        expect(store.getState()).toEqual(referenceStore.getState());
    });
});
