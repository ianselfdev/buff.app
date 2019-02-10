import { _sendStartGameTrs, _sendEndGameTrs, _sendFortniteEvent } from './gamestats';
import uuid from 'uuid/v4';

/*eslint-disable no-undef*/

let matchId = null;

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
    matchId: '0',
};

// setting features to track + retry if failed
export const setFortniteFeatures = () => {
    overwolf.games.events.setRequiredFeatures(features, (data) => {
        if (data.status === 'error') {
            window.setTimeout(setFortniteFeatures, 2000);
        }
    });
};

const onNewEvents = (data) => {
    overwolf.games.getRunningGameInfo((res) => {
        if (res.title === 'Fortnite Battle Royale') {
            const event = data.events[0].name;
            console.log('event name: ', event);
            console.log(data);
            switch (event) {
                case 'matchStart':
                    //* return default states
                    matchData.kills = 0;
                    matchData.deaths = 0;
                    matchData.rank = null;

                    matchData.matchId = uuid();

                    overwolf.games.events.getInfo((res) => {
                        console.log('match start -> getInfo', res);
                    });

                    const startGameData = {
                        gameId: '21216',
                        matchId: matchData.matchId,
                    };

                    // let token = localStorage.getItem('buff-token');
                    _sendStartGameTrs(startGameData);

                    break;

                case 'killer':
                    _sendFortniteEvent({
                        event,
                        data: data.events[0].data || '',
                    });
                    break;

                case 'kill':
                    // console.log('kill');
                    _sendFortniteEvent({
                        event,
                        data: data.events[0].data || '',
                    });
                    matchData.kills++;
                    break;

                case 'death':
                    // console.log('dead');
                    _sendFortniteEvent({
                        event,
                        data: data.events[0].data || '',
                    });
                    matchData.deaths++;
                    break;

                case 'matchEnd':
                    const { kills, deaths, rank } = matchData;

                    const endGameData = {
                        matchData: {
                            ...matchData,
                            rankedGame: true,
                        },
                        gameId: '21216',
                        matchId: matchData.matchId,
                        victory: true,
                        reward: ((kills * (100 - Number(rank))) / (Math.max(deaths, 1) * 10)) * 0.1,
                    };

                    console.info(`Kills: ${kills}, Deaths: ${deaths} Rank: ${rank}`);
                    console.log(`Reward points: ${endGameData.reward}`);

                    // token = localStorage.getItem('buff-token');
                    _sendEndGameTrs(endGameData);
                    break;

                default:
                    return null;
            }
        }
    });
};

const onInfoUpdates2 = (data) => {
    const feature = data.feature;
    // console.log('onInfoUpdates2: ', data);

    switch (feature) {
        case 'rank':
            matchData.rank = data.info.match_info.rank;
            break;

        default:
            return null;
    }
};

//setting listeners for OW events
export const getFortniteEvents = () => {
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
            // onGameInfoUpdated(data);
        });

        listeners.onGameInfoUpdated = true;
    }

    //*---------------------------->
    //*---------------------------->
    //listening to in-game events
    if (!listeners.onNewEvents) {
        overwolf.games.events.onNewEvents.addListener((data) => {
            onNewEvents(data);
        });

        listeners.onNewEvents = true;
    }
};
