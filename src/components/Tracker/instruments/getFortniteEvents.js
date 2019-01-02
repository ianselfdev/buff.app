import { _sendStartGameTrs, _sendEndGameTrs } from './gamestats';

/*eslint-disable no-undef*/

const listeners = {
    onNewEvents: false,
    onGameInfoUpdated: false,
    onInfoUpdates2: false,
};

const features = [
    'kill',
    'killed',
    'killer',
    'revived',
    'death',
    'match',
    'rank',
    'me',
    'phase',
    'location',
    'team',
    'items',
];

const matchData = {
    kills: 0,
    deaths: 0,
    rank: null,
};

//? -------------------------------------------------------------!
//? ------------ probably not needed at all ---------------------!
const gameLaunched = (gameInfo) => {
    console.log(gameInfo);

    // NOTE: we divide by 10 to get the game class id without it's sequence number
    if (Math.floor(gameInfoResult.gameInfo.id / 10) != 21216) {
        return false;
    }

    console.log('Launching Fortnite........');
    return true;
};

const gameRunning = (gameInfo) => {
    console.log(gameInfo);

    // NOTE: we divide by 10 to get the game class id without it's sequence number
    if (Math.floor(gameInfoResult.gameInfo.id / 10) != 21216) {
        return false;
    }

    console.log('Frtnt running');
    return true;
};
//?--------------------------------------------------------------!
//?--------------------------------------------------------------!

// setting features to track + retry if failed
export const setFortniteFeatures = () => {
    overwolf.games.events.setRequiredFeatures(features, (data) => {
        if (data.status === 'error') {
            window.setTimeout(setFortniteFeatures, 2000);
        }

        // console.log(JSON.stringify(info));
    });
};

const onNewEvents = (data, token) => {
    const event = data.events[0].name;
    console.log(event);

    switch (event) {
        case 'matchStart':
            //* return default states
            matchData.kills = 0;
            matchData.deaths = 0;
            matchData.rank = null;

            const startGameData = {
                gameId: 21216,
                matchId: 1,
                // rankedGame: true,
            };

            _sendStartGameTrs(JSON.stringify(startGameData), token);

            break;

        case 'kill':
            console.log('kill');
            matchData.kills++;
            break;

        case 'death':
            console.log('dead');
            matchData.deaths++;
            break;

        case 'matchEnd':
            const { kills, deaths, rank } = matchData;

            const endGameData = {
                matchData: {
                    ...matchData,
                    rankedGame: true,
                },
                gameId: 21216,
                matchId: 1,
                victory: isWinner,
                reward: (kills * (100 - Number(rank))) / (deaths * 10) + 1,
            };

            console.info(`Kills: ${kills}, Deaths: ${deaths} Rank: ${rank}`);
            console.log(`Reward points: ${endGameData.gamedata.reward}`);

            //* send end game data if it wasnt already sent

            _sendEndGameTrs(JSON.stringify(endGameData), token);
            break;

        default:
            return null;
    }
};

const onGameInfoUpdated = (data) => {
    console.log('onGameInfoUpdated');
};

const onInfoUpdates2 = (data) => {
    const feature = data.feature;

    switch (feature) {
        case 'rank':
            matchData.rank = data.info.match_info.rank;

        default:
            return null;
    }
};

//setting listeners for OW events
export const getFortniteEvents = (token) => {
    //SETTING LISTENERS

    setFortniteFeatures();

    //tracking errors
    overwolf.games.events.onError.addListener((data) => {
        console.log(`Error: ${JSON.stringify(data)}`);
    });

    //*---------------------------->
    //*---------------------------->
    //listening to info updates 2
    if (!listeners.onInfoUpdates2) {
        overwolf.games.events.onInfoUpdates2.addListener((data) => {
            onInfoUpdates2(data);
        });

        listeners.onInfoUpdates2 = true;
    }

    //*---------------------------->
    //*---------------------------->
    //listening to game info updates
    if (!listeners.onGameInfoUpdated) {
        overwolf.games.onGameInfoUpdated.addListener((data) => {
            onGameInfoUpdated(data);
        });

        listeners.onGameInfoUpdated = true;
    }

    //*---------------------------->
    //*---------------------------->
    //listening to in-game events
    if (!listeners.onNewEvents) {
        overwolf.games.events.onNewEvents.addListener((data) => {
            onNewEvents(data, token);
        });

        listeners.onNewEvents = true;
    }
};
