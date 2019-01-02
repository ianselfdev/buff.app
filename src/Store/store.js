import { createStore, applyMiddleware, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as actionTypes from './constant';

export default function configureStore(initialState, routerHistory) {
    const router = routerMiddleware(routerHistory);

    const reducers = (state = initialState, action) => {
        switch (action.type) {
            case actionTypes.ADD_HISTORY: {
                return { ...state, allHistory: action.payload };
            }
            case actionTypes.ADD_LEADERBOARD_DOTA:
                console.log(action.payload);
                return { ...state, leaderBoardDota: action.payload };
            case actionTypes.ADD_LEADERBOARD_LOL:
                return { ...state, leaderBoardLol: action.payload };
            case actionTypes.USER_LOGIN:
                return {
                    ...state,
                    ...action.payload,
                };
            case actionTypes.LOGOUT:
                return {};
            case actionTypes.ADD_NEWS:
                return { ...state, allNews: action.payload };
            case actionTypes.ADD_TOURNAMENTS:
                return { ...state, allTournaments: action.payload };
            case actionTypes.ADD_ONLINE:
                return { ...state, onlineUsers: action.payload.games_online };
            case actionTypes.ADD_BALANCE:
                return { ...state, userBalance: action.payload };
            // case actionTypes.TRACKER_LOGIN:
            //     return {
            //         ...state,
            //         loggedIntoTracker: true,
            //     };
            // case actionTypes.TRACKER_LOGOUT:
            //     return {
            //         ...state,
            //         loggedIntoTracker: false,
            //     };
            default:
                return state;
        }
    };

    return createStore(
        combineReducers({
            routing: routerReducer,
            reducerMain: reducers,
        }),
        initialState,
        composeWithDevTools(applyMiddleware(thunk, router)),
    );
}
