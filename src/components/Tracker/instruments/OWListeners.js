import { getDotaEvents } from './getDotaEvents';
import { getLolEvents } from './getLolEvents';
import { getFortniteEvents } from './getFortniteEvents';

/*eslint-disable no-undef*/

const gameLaunched = (gameInfoResult) => {
    if (gameInfoResult.gameInfo.title) {
        return gameInfoResult.gameInfo.title;
    }

    return undefined;
};

export const setOverwolfListeners = (token) => {
    overwolf.games.onGameInfoUpdated.addListener((res) => {
        // console.log(res.runningChanged);
        let gameTitle = gameLaunched(res);

        switch (gameTitle) {
            case 'Dota 2':
                getDotaEvents(token);
                break;

            case 'League of Legends':
                getLolEvents(token);
                break;

            case 'Fortnite Battle Royale':
                getFortniteEvents(token);
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
                getDotaEvents(token);
                console.log('Dota 2 launched');
                break;

            case 'League of Legends':
                getLolEvents(token);
                console.log('LoL launched');
                break;

            case 'Fortnite Battle Royale':
                console.log('Fortnite launched');
                getFortniteEvents(token);
                break;

            default:
                return;
        }
    });
};
