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
            return fetch(`${MAIN_URL}/buff/tournaments?page=1&limit=100`);
        },

        fetchHistory() {
            return fetch(`${MAIN_URL}/games/history?page=1&limit=100`, {
                method: 'GET',
                headers: {
                    Authorization: this.token,
                },
            });
        },

        fetchLeadersDota() {
            return fetch(`${MAIN_URL}/buff/leaders?gameId=7314`);
        },
    },

    market: {
        fetchMarketItems() {
            return fetch(`${MAIN_URL}/marketplace/items?page=1&limit=100`, {
                method: 'GET',
                headers: {
                    Authorization: this.token,
                },
            });
        },

        fetchUserItems() {
            return fetch(`${MAIN_URL}/marketplace/items/my?page=1&limit=100`, {
                method: 'GET',
                headers: {
                    Authorization: this.token,
                },
            });
        },

        buyItem(itemId) {
            return fetch(`${MAIN_URL}/marketplace/items/buy/${itemId}`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('buff-token'),
                },
            });
        },
    },
};
