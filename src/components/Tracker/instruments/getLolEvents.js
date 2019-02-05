import { _sendStartGameTrs, _sendEndGameTrs } from './gamestats';
import { sendLolReward } from './rewardCounters';

/*eslint-disable no-undef*/

const listeners = {
    onNewEvents: false,
    onGameInfoUpdated: false,
    onInfoUpdates2: false,
};

const features = [
    'summoner_info',
    'gameMode',
    'teams',
    'matchState',
    'kill',
    'death',
    'respawn',
    'assist',
    'minions',
    'level',
    'abilities',
    'announcer',
];

let matchData = {
    kills: 0,
    deaths: 0,
    assists: 0,
    minionKills: 0,
    level: 1,

    rankedGame: false,
    gameMode: '',

    matchId: '1',
};

// setting features to track + retry if failed
export const setLolFeatures = () => {
    overwolf.games.events.setRequiredFeatures(features, (data) => {
        if (data.status === 'error') {
            window.setTimeout(setLolFeatures, 2000);
        }
    });
};

const onNewEvents = (data, token) => {
    // console.log('on new events: ', data);
};

const onGameInfoUpdated = (data) => {
    // console.log('onGameInfoUpdated', data);
};

const onInfoUpdates2 = (data, token) => {
    const info = data.info.game_info;

    switch (data.feature) {
        case 'gameMode':
            console.log('gameMode: ', info.gameMode);
            matchData = {
                ...matchData,
                gameMode: info.gameMode,
            };
            break;

        case 'matchState':
            console.log('matchState: ', info);
            if (info.matchStarted) {
                //* start game transaction
                //* ---------------------->
                console.log('%cStart game', 'color: green');
                //Lol gameId === 5426
                const startGameTrs = {
                    gameId: '5426',
                    matchId: info.matchId || '0',
                };

                _sendStartGameTrs(startGameTrs, token);
            } else {
                //* end game transaction
                //* ---------------------->
                console.log('%cGame end', 'color: orange');
                console.log(matchData);

                const endGameTrs = {
                    matchData,
                    gameId: '5426',
                    matchId: matchData.gameMode === 'ranked' ? '1' : '0',
                    victory: info.matchOutcome === 'win',
                    reward: 1,
                };

                sendLolReward(endGameTrs, token);
                // _sendEndGameTrs(endGameTrs, token);

                matchData = {
                    kills: 0,
                    deaths: 0,
                    assists: 0,
                    minionKills: 0,
                    level: 1,

                    rankedGame: false,
                    gameMode: '',

                    matchId: '0',
                };
            }
            break;

        case 'minions':
            // console.log('minion');
            matchData.minionKills++;
            break;

        case 'level':
            matchData.level++;
            break;

        case 'kill':
            // console.log('kill');
            matchData.kills++;
            break;

        case 'death':
            // console.log('death');
            matchData.deaths++;
            break;

        default:
            return;
    }
};

//setting listeners for OW events
export const getLolEvents = (token) => {
    //SETTING LISTENERS
    setLolFeatures();

    //tracking errors
    overwolf.games.events.onError.addListener((data) => {
        console.log(`Error: ${JSON.stringify(data)}`);
    });

    //*---------------------------->
    //*---------------------------->
    //listening to info updates 2
    if (!listeners.onInfoUpdates2) {
        overwolf.games.events.onInfoUpdates2.addListener((data) => {
            onInfoUpdates2(data, token);
        });

        listeners.onInfoUpdates2 = true;
    }

    //*---------------------------->
    //*---------------------------->
    //listening to game info updates
    if (!listeners.onGameInfoUpdated) {
        overwolf.games.onGameInfoUpdated.addListener((data) => {
            onGameInfoUpdated(data, token);
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
