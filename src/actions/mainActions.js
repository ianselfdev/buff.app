import * as actionTypes from './../Store/constant';
import Api from '../Store/ApiRequests';
import { push } from 'react-router-redux';

export function addHistory(address) {
    return (dispatch) =>
        Api.getHistoryAPI(address).then((res) =>
            dispatch({
                type: actionTypes.ADD_HISTORY,
                payload: res.data.history,
            }),
        );
}

export function addLeaderBoardDota() {
    return (dispatch) =>
        Api.getLeaderboardDotaAPI().then((res) =>
            dispatch({
                type: actionTypes.ADD_LEADERBOARD_DOTA,
                payload: res.data.leaderbord,
            }),
        );
}

export function addLeaderBoardLOL() {
    return (dispatch) =>
        Api.getLeaderboardLoLAPI().then((res) =>
            dispatch({
                type: actionTypes.ADD_LEADERBOARD_LOL,
                payload: res.data.leaderbord,
            }),
        );
}

export function addNews() {
    return (dispatch) =>
        Api.getNewsAPI().then((res) => {
            dispatch({
                type: actionTypes.ADD_NEWS,
                payload: res.data.news,
            });
        });
}

export function addTournaments() {
    return (dispatch) =>
        Api.getTournamentsAPI().then((res) =>
            dispatch({
                type: actionTypes.ADD_TOURNAMENTS,
                payload: res.data.tournaments,
            }),
        );
}

export function addOnlineUsers() {
    return (dispatch) =>
        Api.getOnlineAPI().then((res) =>
            dispatch({
                type: actionTypes.ADD_ONLINE,
                payload: res.data,
            }),
        );
}

export function addUserBalance(address) {
    return (dispatch) =>
        Api.getBalanceAPI(address).then((res) =>
            dispatch({
                type: actionTypes.ADD_BALANCE,
                payload: res.data.balance,
            }),
        );
}

export function logout() {
    return (dispatch) =>
        dispatch({
            type: actionTypes.LOGOUT,
        });
}

export function onBackToLogin() {
    return (dispatch) => dispatch(push('/'));
}

export const receiveTokens = (tokens) => {
    return (dispatch) =>
        dispatch({
            type: actionTypes.NEW_TOKENS,
            payload: tokens,
        });
};

export const refreshToken = async (refreshToken) => {
    const tokens = await Api.refreshToken(refreshToken);

    return (dispatch) =>
        dispatch({
            type: actionTypes.NEW_TOKENS,
            payload: tokens,
        });
};
