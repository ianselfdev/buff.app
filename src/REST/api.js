//Config
import { MAIN_URL } from './config';

export const Api = {
    get token() {
        return localStorage.getItem('buff-token');
    },

    auth: {
        signup(userData) {
            return fetch(`${MAIN_URL}/accounts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
        },

        login(userData) {
            return fetch(`${MAIN_URL}/accounts/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
        },

        getUserData(token) {
            return fetch(`${MAIN_URL}/accounts/current`, {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });
        },

        refreshToken(refreshToken) {
            return fetch(`${MAIN_URL}/accounts/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    refreshToken,
                }),
            });
        },
    },

    data: {
        fetchNews() {
            return fetch(`${MAIN_URL}/buff/news?page=1&limit=100`);
        },

        fetchTournaments() {
            return fetch(`${MAIN_URL}/buff/tournaments?page=1`);
        },

        fetchHistory() {
            return fetch(`${MAIN_URL}/games/history?page=1`, {
                method: 'GET',
                headers: {
                    Authorization: this.token(),
                },
            });
        },
    },
};
