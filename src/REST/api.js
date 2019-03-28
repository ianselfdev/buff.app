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

        getUserIp() {
            return fetch(
                'https://api.ipdata.co?api-key=41605a6671bc15a4a7aa512ef2e61f3fb05450f869e52ee35b543c1e',
            );
        },

        getUserData(token) {
            return fetch(`${MAIN_URL}/accounts/current`, {
                method: 'GET',
                headers: {
                    Authorization: token,
                },
            });
        },

        getReferralCode() {
            return fetch(`${MAIN_URL}/accounts/referral/code`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('buff-token'),
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
                    Authorization: localStorage.getItem('buff-token'),
                },
            });
        },

        fetchLeadersDota(queries) {
            const params = queryString.stringify(queries);
            return fetch(`${MAIN_URL}/buff/leaders?${params}`);
        },

        fetchStatistics(queries) {
            const params = queryString.stringify(queries);
            return fetch(`${MAIN_URL}/games/statistics?${params}`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('buff-token'),
                },
            });
        },
    },

    market: {
        fetchMarketItems() {
            return fetch(`${MAIN_URL}/marketplace/items?page=1&limit=100`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('buff-token'),
                },
            });
        },

        fetchUserItems() {
            return fetch(`${MAIN_URL}/marketplace/items/my?page=1&limit=100`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('buff-token'),
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

        activateItem(itemId) {
            return fetch(`${MAIN_URL}/marketplace/items/my/activate/${itemId}`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('buff-token'),
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

        //!___REDO!!!
        async setGoalItem(id) {
            const response = await fetch(`${MAIN_URL}/marketplace/items/goal/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('buff-token'),
                },
            });

            const data = await response.json();

            console.log(data);
            return data;
        },

        getGoalItem() {
            return fetch(`${MAIN_URL}/marketplace/items/goal`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('buff-token'),
                },
            });
        },
    },

    bonuses: {
        getAvailableBonuses() {
            return fetch(`${MAIN_URL}/bonuses/available`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('buff-token'),
                },
            });
        },

        activateBonus() {
            return fetch(`${MAIN_URL}/api/bonuses/activate/:id`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('buff-token'),
                },
            });
        },
    },
};
