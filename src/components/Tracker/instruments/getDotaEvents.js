import { _sendStartGameTrs } from './gamestats';
import { sendDotaReward } from './rewardCounters';

/*eslint-disable no-undef*/

const listeners = {
    onNewEvents: false,
    onGameInfoUpdated: false,
    onInfoUpdates2: false,
};

const features = [
    'kill',
    'death',
    'hero_ability_used',
    'game_state_changed',
    'match_state_changed',
    'match_detected',
    'match_ended',
    'daytime_changed',
    'ward_purchase_cooldown_changed',
    'assist',
    'death',
    'cs',
    'roster',
    'hero_ability_skilled',
    'hero_ability_used',
    'hero_ability_changed',
    'xpm',
    'gpm',
];

let matchData = {
    kills: 0,
    deaths: 0,
    assists: 0,
    kda: 0,
    xpm: 0,
    gpm: 0,
    lastHits: 0,
    denies: 0,
    matchId: null,
    playerTeam: null,
    victory: false,
};

// setting features to track + retry if failed
export const setDotaFeatures = () => {
    overwolf.games.events.setRequiredFeatures(features, (data) => {
        if (data.status === 'error') {
            window.setTimeout(setDotaFeatures, 2000);
        }
    });
};

const onNewEvents = (data) => {
    overwolf.games.getRunningGameInfo((res) => {
        if (res.title === 'Dota 2') {
            // getting and parsing data from OW
            const eventName = data.events[0].name;
            const info = JSON.parse(data.events[0].data);

            switch (eventName) {
                case 'game_state_changed':
                    console.log('Game state changed');
                    console.log(info);
                    /* shape
            {
                game_state: "playing"
                match_id: "4385208972"
                match_state: "DOTA_GAMERULES_STATE_INIT"
                player_steam_id: "76561198143141868"
                player_team: "radiant"
            }
            */
                    matchData = {
                        ...matchData,
                        matchId: info.match_id,
                        playerTeam: info.player_team,
                    };

                    console.log('Match id set to: ', matchData.matchId);
                    console.log('Player team: ', matchData.playerTeam);
                    break;

                //checking when match actually starts
                case 'match_state_changed':
                    switch (info.match_state) {
                        case 'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS':
                            console.log('%cSending startGame transaction', 'color:green');

                            //Dota2 gameId in OW === 7314
                            const startGameTrs = {
                                gameId: '7314',
                                matchId: matchData.matchId,
                            };

                            // let runningGame = overwolf.games.getRunningGameInfo((data) => data.title)
                            let token = localStorage.getItem('buff-token');
                            _sendStartGameTrs(startGameTrs, token);
                            break;

                        default:
                            return null;
                    }

                    break;

                case 'kill':
                    matchData.kills++;
                    break;
                case 'assist':
                    matchData.assists++;
                    break;
                case 'xpm':
                    matchData.xpm++;
                    break;
                case 'gpm':
                    matchData.gpm++;
                    break;

                case 'death':
                    matchData.deaths++;
                    break;

                case 'cs':
                    matchData = {
                        ...matchData,
                        lastHits: info.last_hits,
                        denies: info.denies,
                    };
                    break;

                case 'match_ended':
                    matchData = {
                        ...matchData,
                        kda: (matchData.kills + matchData.assists) / (matchData.deaths || 1),
                        victory: matchData.playerTeam === info.winner,
                    };

                    console.log('%cGame end', 'color: orange');
                    //Dota2 gameId === 7314
                    const endGameTrs = {
                        matchId: matchData.matchId,
                        gameId: '7314',
                        reward: 1,
                        victory: matchData.victory,
                        matchData,
                    };

                    // _sendEndGameTrs(endGameTrs, token);
                    let token = localStorage.getItem('buff-token');
                    sendDotaReward(endGameTrs, token);

                    //returning defaults
                    matchData = {
                        kills: 0,
                        deaths: 0,
                        assists: 0,
                        kda: 0,
                        xpm: 0,
                        gpm: 0,
                        lastHits: 0,
                        denies: 0,
                        matchId: 0,
                        playerTeam: null,
                        victory: false,
                    };

                    break;

                default:
                    return null;
            }
        }
    });
};

const onGameInfoUpdated = (data) => {
    // console.log('onGameInfoUpdated', data);
};

const onInfoUpdates2 = (data) => {
    try {
        const roster = JSON.parse(data.info.roster.players);

        // checking if any of the players in roster is steam bot
        // and if so - marking match as lobby with bots
        roster.map((item) => {
            if (item.steamId.startsWith('9007199')) {
                matchData.matchId = '0';
                console.log('%cBots match detected', 'color:red');
            }
            return null;
        });
    } catch (error) {
        return null;
    }
};

//setting listeners for OW events
export const getDotaEvents = () => {
    //SETTING LISTENERS
    setDotaFeatures();

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
