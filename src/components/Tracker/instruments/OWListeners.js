import { getDotaEvents } from './getDotaEvents';
import { getLolEvents } from './getLolEvents';
import { getFortniteEvents } from './getFortniteEvents';
import { getCsgoEvents } from './getCsgoEvents';
import { dota } from './drawer';
import { Analytics } from '../../../analytics';

/*eslint-disable no-undef*/

const gameLaunched = (gameInfoResult) => {
    if (gameInfoResult.gameInfo.title) {
        return gameInfoResult.gameInfo.title;
    }

    return undefined;
};

export const setOverwolfListeners = () => {
    overwolf.games.onGameInfoUpdated.addListener((res) => {
        // console.log(res.runningChanged);
        let gameTitle = gameLaunched(res);

        switch (gameTitle) {
            case 'Dota 2':
                getDotaEvents();
                break;

            case 'League of Legends':
                getLolEvents();
                break;

            case 'Fortnite Battle Royale':
                getFortniteEvents();
                break;

            case 'Counter-Strike: Global Offensive':
                getCsgoEvents();
                break;

            default:
                console.log(gameTitle);
                return;
        }
    });

    overwolf.games.onGameLaunched.addListener((res) => {
        let gameTitle = res.title;
        console.log('onGameLaunched: ', res);
        Analytics.userStartsGame(gameTitle);

        switch (gameTitle) {
            case 'Dota 2':
                getDotaEvents();
                console.log('Dota 2 launched');
                dota();
                break;

            case 'League of Legends':
                getLolEvents();
                console.log('LoL launched');
                break;

            case 'Fortnite Battle Royale':
                console.log('Fortnite launched');
                getFortniteEvents();
                break;

            case 'Counter-Strike: Global Offensive':
                console.log('CS:GO launched');
                getCsgoEvents();
                break;

            default:
                console.log(gameTitle);
                return;
        }
    });
};
