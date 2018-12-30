import axios from 'axios';

export default class Api {
    static getNewsAPI() {
        return axios.get('http://18.188.224.32:6001/api/buff/news?page=1');
    }
    static getTournamentsAPI() {
        return axios.get('http://18.188.224.32:8000/api/tournaments?page=1');
    }
    static getHistoryAPI(token) {
        return axios.get(
            `http://18.188.224.32:6001/api/games/history?page=1`, { 
                headers: {"Authorization" : token} 
        });
    }
    static getLeaderboardDotaAPI() {
        return axios.get('http://18.188.224.32:6001/api/buff/leaders?gameId=7314');
    }
    static getLeaderboardLoLAPI() {
        return axios.get('http://18.188.224.32:4000/api/leaders?gameId=5426');
    }

    static getCurrentUser(token) {
        return axios.get('http://18.188.224.32:6001/api/accounts/current', { 
            headers: {"Authorization" : token} 
        })
    }

    static postLogin = async (user) => {
        const response = await fetch(
            'http://18.188.224.32:6001/api/accounts/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            },
        );

        const result = await response.json();
        console.log('login: ', result);

        return result;
    };
    static postRegister = async (user) => {
        const response = await fetch('http://18.188.224.32:6001/api/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const result = await response.json();
        console.log('registration: ', result);

        return result;
    };
    static getOnlineAPI() {
        return axios.get(
            'http://18.188.224.32:4000/api/game-start/games-online',
        );
    }
    static getBalanceAPI(address) {
        return axios.get(
            `http://18.188.224.32:4000/api/accounts/getBalance?address=${address}`,
        );
    }
}
