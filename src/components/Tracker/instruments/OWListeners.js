import { _getDotaEvents, setDotaFeatures } from './getDotaEvents';
import { _getLolEvents, setLoLFeatures } from './getLolEvents';

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

        // console.log(currentGame + ' Launched!');

        return currentGame;
    }

    return undefined;
};

export const setOverwolfListeners = (senderId, passphrase) => {
    overwolf.games.onGameInfoUpdated.addListener(function(res) {
        // console.log(
        //     'onGameInfoUpdated: ' +
        //         (res.gameInfo && res.gameInfo.title
        //             ? res.gameInfo.title
        //             : 'no title'),
        // );
        let gameTitle = gameLaunched(res);

        if (gameTitle) {
            if (gameTitle === 'Dota 2') {
                // console.log('DOTA 2 GAME INFO UPDATED');
                _getDotaEvents(senderId, passphrase);
                setTimeout(setDotaFeatures, 1000);
            } else if (gameTitle === 'League of Legends') {
                // console.log('LOL GAME INFO UPDATED');
                _getLolEvents();
                setTimeout(setLoLFeatures, 1000);
            }
        }
    });

    overwolf.games.getRunningGameInfo(function(res) {
        // console.log(
        //     'getRunningGameInfo: ' +
        //         (res && res.title ? res.title : 'no title'),
        // );
        let gameTitle = gameRunning(res);

        if (gameTitle) {
            if (gameTitle === 'Dota 2') {
                // console.log('DOTA 2 GAME RUNNING GAME INFO');
                _getDotaEvents(senderId, passphrase);
                setTimeout(setDotaFeatures, 1000);
            } else if (gameTitle === 'League of Legends') {
                // console.log('LOL GAME RUNNING GAME INFO');
                _getLolEvents();
                setTimeout(setLoLFeatures, 1000);
            }
        }
    });
};
