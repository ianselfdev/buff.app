import { _getDotaEvents, setDotaFeatures } from './getDotaEvents';
import { _getLolEvents, setLoLFeatures } from './getLolEvents';
import { getFortniteEvents } from './getFortniteEvents';

/*eslint-disable no-undef*/

const gameLaunched = (gameInfoResult) => {
    if (gameInfoResult.gameInfo.title) {
        return gameInfoResult.gameInfo.title;
    }

    return undefined;
};

const gameRunning = (gameInfo) => {
    if (gameInfo && gameInfo.title) {
        let currentGame = gameInfo.title;

        console.log(currentGame + ' running!');

        return currentGame;
    }

    return undefined;
};

export const setOverwolfListeners = (token) => {
    overwolf.games.onGameInfoUpdated.addListener(function(res) {
        let gameTitle = gameLaunched(res);

        switch (gameTitle) {
            case 'Dota 2':
                _getDotaEvents(token);
                setTimeout(setDotaFeatures, 1000);
                break;

            case 'League of Legends':
                _getLolEvents(token);
                setTimeout(setLoLFeatures, 1000);
                break;

            case 'Fortnite Battle Royale':
                getFortniteEvents(token);
                break;
        }
    });

    overwolf.games.getRunningGameInfo(function(res) {
        let gameTitle = gameRunning(res);
        console.log('getrunning game info: ', res);

        switch (gameTitle) {
            case 'Dota 2':
                _getDotaEvents(token);
                setTimeout(setDotaFeatures, 1000);
                console.log('Dota 2 launched');
                break;

            case 'League of Legends':
                _getLolEvents(token);
                setTimeout(setLoLFeatures, 1000);
                console.log('LoL launched');
                break;

            case 'Fortnite Battle Royale':
                console.log('Fortnite launched');
                getFortniteEvents(token);
                break;
        }
    });

    overwolf.games.onGameLaunched.addListener((res) => {
        console.log('onGameLaunched: ', res);
    });
};
