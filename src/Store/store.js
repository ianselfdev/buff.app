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
                return { ...state, allHistory: action.payload.games };
            }
            case actionTypes.ADD_LEADERBOARD_DOTA:
                return { ...state, leaderBoardDota: action.payload.leaders };
            case actionTypes.ADD_LEADERBOARD_LOL:
                return { ...state, leaderBoardLol: action.payload.leaders };
            case actionTypes.USER_LOGIN:
                return {
                    ...state,
                    token: action.payload.tokens.token,
                    refreshToken: action.payload.tokens.refreshToken,
                    tokenLife: action.payload.tokens.tokenLife,
                    refreshTokenLife: action.payload.tokens.refreshTokenLife,
                };
            case actionTypes.LOGOUT:
                return {};
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
