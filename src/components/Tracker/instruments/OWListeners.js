import { _getDotaEvents, setDotaFeatures } from './getDotaEvents';
import { _getLolEvents, setLoLFeatures } from './getLolEvents';
import { getFortniteEvents, setFortniteFeatures } from './getFortniteEvents';

/*eslint-disable no-undef*/

let currentGame = null;

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

            case 'League of Legends':
                _getLolEvents(token);
                setTimeout(setLoLFeatures, 1000);

            case 'Fortnite Battle Royale':
                getFortniteEvents(token);
            // setTimeout(setFortniteFeatures, 1000);
        }
    });

    overwolf.games.getRunningGameInfo(function(res) {
        let gameTitle = gameRunning(res);
        console.log('getrunning game info: ', res);

        switch (gameTitle) {
            case 'Dota 2':
                _getDotaEvents(senderId, passphrase);
                setTimeout(setDotaFeatures, 1000);
                console.log('Dota 2 launched');

            case 'League of Legends':
                _getLolEvents();
                setTimeout(setLoLFeatures, 1000);
                console.log('LoL launched');

            case 'Fortnite Battle Royale':
                console.log('Fortnite launched');
                getFortniteEvents(senderId, passphrase);
            // setTimeout(setFortniteFeatures, 1000);
        }
    });
};
