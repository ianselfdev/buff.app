import axios from 'axios';

export default class Api {
    static getNewsAPI() {
        return axios.get('http://18.188.224.32:8000/api/news?page=1');
    }
    static getTournamentsAPI() {
        return axios.get('http://18.188.224.32:8000/api/tournaments?page=1');
    }
    static getHistoryAPI(address) {
        return axios.get(
            `http://18.188.224.32:4000/api/history?page=1&senderId=${address}`,
        );
    }
    static getLeaderboardDotaAPI() {
        return axios.get('http://18.188.224.32:4000/api/leaders?gameId=7314');
    }
    static getLeaderboardLoLAPI() {
        return axios.get('http://18.188.224.32:4000/api/leaders?gameId=5426');
    }
    static postLogin(user) {
        return axios.post('http://18.188.224.32:8000/api/login', user);
    }
    static postRegister(user) {
        return axios.post('http://18.188.224.32:8000/api/users', user);
    }
    static getOnlineAPI() {
        return axios.get(
            'http://18.188.224.32:4000/api/game-start/games-online',
        );
    }
    static getBalanceAPI(addres) {
        return axios.get(
            `http://18.188.224.32:4000/api/accounts/getBalance?address=${addres}`,
        );
    }
}
