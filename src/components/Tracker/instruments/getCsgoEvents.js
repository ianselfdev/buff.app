import { _sendStartGameTrs, _sendCsgoEvent } from './gamestats';
import { sendCsgoReward } from './rewardCounters';

/*eslint-disable no-undef*/

const listeners = {
    onNewEvents: false,
    onGameInfoUpdated: false,
    onInfoUpdates2: false,
};

const features = [
    'kill',
    'death',
    'assist',
    'headshot',
    'round_start',
    'match_start',
    'match_end',
    'team_round_win',
    'bomb_planted',
    'bomb_change',
    'reloading',
    'fired',
    'weapon_change',
    'weapon_acquired',
    'info',
    'roster',
    'player_activity_change',
    'team_set',
];

const matchData = {
    kills: 0,
    deaths: 0,
    assists: 0,
    headshots: 0,
    mvps: 0,
    score: 0,
    matchId: '1',
};

// setting features to track + retry if failed
export const setCsgoFeatures = () => {
    overwolf.games.events.setRequiredFeatures(features, (data) => {
        if (data.status === 'error') {
            window.setTimeout(setCsgoFeatures, 2000);
        }
    });
};

const onNewEvents = (data) => {
    overwolf.games.getRunningGameInfo((res) => {
        if (res.title === 'Counter-Strike: Global Offensive') {
            const event = data.events[0];
            switch (event.name) {
                case 'match_start':
                    console.log(`event -> match_start ->`, JSON.parse(event.data));

                    const startGameData = {
                        gameId: '7764',
                        matchId: matchData.matchId,
                    };
                    _sendStartGameTrs(startGameData);
                    break;
                case 'kill':
                    matchData.kills++;
                    break;
                case 'death':
                    matchData.deaths++;
                    break;
                case 'assist':
                    matchData.assists++;
                    break;
                case 'headshot':
                    matchData.headshots++;
                    break;
                case 'bomb_planted':
                    console.log('event -> bomb_planted');
                    break;
                case 'bomb_change':
                    break;
                case 'fired':
                    _sendCsgoEvent({
                        event: event.name,
                        data: event.name,
                    });
                    break;
                case 'reloading':
                    _sendCsgoEvent({
                        event: event.name,
                        data: event.name,
                    });
                    break;
                case 'weapon_change':
                    _sendCsgoEvent({
                        event: event.name,
                        data: event.name,
                    });
                    break;
                case 'weapon_acquired':
                    // console.log(`event -> weapon_acquired ->`, JSON.parse(event.data));
                    _sendCsgoEvent({
                        event: event.name,
                        data: event.name,
                    });
                    break;
                case 'round_start':
                    // console.log(`event -> round start ->`, JSON.parse(event.data));
                    _sendCsgoEvent({
                        event: event.name,
                        data: event.name,
                    });
                    break;
                case 'team_set':
                    // console.log(`event -> team_set ->`, JSON.parse(event.data));
                    _sendCsgoEvent({
                        event: event.name,
                        data: event.name,
                    });
                    break;
                case 'player_activity_change':
                    // console.log(`event -> player_activity_change ->`, JSON.parse(event.data));
                    break;
                case 'team_round_win':
                    // console.log(`event -> team round win ->`, JSON.parse(event.data));
                    break;

                case 'match_end':
                    console.log(`event -> match_end ->`, JSON.parse(event.data));
                    const endGameData = {
                        matchData,
                        gameId: '7764',
                        matchId: matchData.matchId,
                    };
                    console.log(endGameData);
                    sendCsgoReward(endGameData);
                    break;

                default:
                    console.log('c%UNHANDLED EVENT ----> ', 'color:red');
                    console.log(event.name);
                    console.log(event);
                    return;
            }
        }
    });
};

const onInfoUpdates2 = (data) => {
    if (data.info.player === undefined) return null;

    if (data.info.player.totalMvps !== undefined) {
        console.log('totalMvps ->', data.info);
        console.log('totalMvps ->', data.info.player);
        console.log('totalMvps ->', data.info.player.totalMvps);
        matchData.mvps = Math.max(matchData.mvps, data.info.player.totalMvps);
    }
    if (data.info.player.score !== undefined) {
        console.log('score ->', data.info);
        console.log('score ->', data.info.player);
        console.log('score ->', data.info.player.score);
        matchData.score = Math.max(matchData.score, data.info.player.score);
    }
    // if (data.info.roster) {
    //     console.log('roster ->', data.info.roster);
    // }
};

//setting listeners for OW events
export const getCsgoEvents = () => {
    //SETTING LISTENERS
    setCsgoFeatures();

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
