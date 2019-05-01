import { _sendStartGameTrs } from './gamestats';
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
    champion: '',

    rankedGame: true,

    gameId: '5426',
    matchId: '',
    accountId: '',
    region: '',
};

// setting features to track + retry if failed
export const setLolFeatures = () => {
    overwolf.games.events.setRequiredFeatures(features, (data) => {
        if (data.status === 'error') {
            window.setTimeout(setLolFeatures, 2000);
        }
    });
};

const onNewEvents = (data) => {
    // console.log('on new events: ', data);
};

const onGameInfoUpdated = (data) => {
    // console.log('onGameInfoUpdated', data);
};

const onInfoUpdates2 = (data) => {
    overwolf.games.getRunningGameInfo((res) => {
        if (res.title === 'League of Legends') {
            const info = data.info.game_info;
            switch (data.feature) {
                case 'matchState':
                    console.log('matchState -> info -> ', info);

                    if (info.matchStarted) {
                        //* start game transaction
                        //* ---------------------->
                        console.log('%cStart game', 'color: green');

                        overwolf.games.events.getInfo((data) => {
                            console.log('match started -> getInfo: ', data);

                            matchData = {
                                ...matchData,
                                matchId: data.res.game_info.matchId,
                                accountId: data.res.summoner_info.accountId,
                                someOtherId: data.res.summoner_info.id,
                                region: data.res.summoner_info.region,
                                champion: data.res.summoner_info.champion,
                            };

                            //Lol gameId === 5426
                            const startGameTrs = {
                                gameId: '5426',
                                matchId: matchData.matchId,
                            };

                            console.log('startGameTrs -> ', startGameTrs);
                            let token = localStorage.getItem('buff-token');
                            _sendStartGameTrs(startGameTrs, token);
                        });
                    } else {
                        //* end game transaction
                        //* ---------------------->
                        console.log('%cGame end', 'color: orange');

                        overwolf.games.events.getInfo((data) => {
                            console.log('match ended -> getInfo: ', data);
                            matchData = {
                                ...matchData,
                                gameMode: 'ranked',
                                neutralMinionKills: data.res.game_info.neutralMinionKills,
                                gold: data.res.game_info.gold,
                            };

                            const endGameTrs = {
                                matchData,
                                gameId: '5426',
                                matchId: matchData.matchId,
                                victory: info.matchOutcome === 'win',
                                reward: 1,
                            };

                            console.log('endGameData -> ', endGameTrs);
                            let token = localStorage.getItem('buff-token');
                            sendLolReward(endGameTrs, token);

                            matchData = {
                                kills: 0,
                                deaths: 0,
                                assists: 0,
                                minionKills: 0,
                                level: 1,
                                champion: '',

                                rankedGame: false,

                                matchId: '0',
                                accountId: '0',
                                region: '',
                            };
                        });
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

                case 'assist':
                    // console.log('assist');
                    matchData.assists++;
                    break;

                case 'death':
                    // console.log('death');
                    matchData.deaths++;
                    break;

                default:
                    return;
            }
        }
    });
};

//setting listeners for OW events
export const getLolEvents = () => {
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
            onNewEvents(data);
        });

        listeners.onNewEvents = true;
    }
};
