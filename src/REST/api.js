//Config
import { MAIN_URL } from './config';

//Instruments
import queryString from 'query-string';

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

        getPasswordResetCode(email) {
            return fetch(`${MAIN_URL}/accounts/forget/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                }),
            });
        },

        resetPassword(data) {
            console.log(data);
            return fetch(`${MAIN_URL}/accounts/restore/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
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

        fetchHistory(queries) {
            const params = queryString.stringify(queries);
            return fetch(`${MAIN_URL}/games/history?page=1&limit=100&${params}`, {
                method: 'GET',
                headers: {
                    Authorization: this.token,
                },
            });
        },

        fetchLeadersDota(queries) {
            const params = queryString.stringify(queries);
            return fetch(`${MAIN_URL}/buff/leaders?${params}`);
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
                    Authorization: this.token,
                },
            });
        },

        activateItem(itemId) {
            return fetch(`${MAIN_URL}/marketplace/items/my/activate/${itemId}`, {
                method: 'POST',
                headers: {
                    Authorization: this.token,
                },
            });
        },

        filterItems(queries) {
            const params = queryString.stringify(queries);
            return fetch(`${MAIN_URL}/marketplace/items/?page=1&limit=100&${params}`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('buff-token'),
                },
            });
        },
    },
};
