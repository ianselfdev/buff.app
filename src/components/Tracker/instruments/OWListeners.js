import { getDotaEvents } from './getDotaEvents';
import { getLolEvents } from './getLolEvents';
import { getFortniteEvents } from './getFortniteEvents';
import { dota } from './drawer';

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

            default:
                return;
        }
    });

    overwolf.games.onGameLaunched.addListener((res) => {
        let gameTitle = res.title;
        console.log('onGameLaunched: ', res);

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

            default:
                return;
        }
    });
};
