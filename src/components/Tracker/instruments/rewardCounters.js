import { _sendEndGameTrs } from './gamestats';

export const sendDotaReward = (data) => {
    const { gpm, xpm, kda, lastHits, denies, victory } = data.matchData;

    const rewardPoints =
        Math.max(0, (gpm - 350) / 20) +
        Math.max(0, (xpm - 350) / 20) +
        Math.max(0, (kda - 1.5) * 5) +
        Math.max(0, (lastHits - 150) / 30) +
        Math.max(0, (denies - 20) / 10) +
        (victory ? 65 : 0);

    // console.log(`%cReward: ${rewardPoints / 10}`, 'color:orange');
    // console.log(`%cGPM: ${gpm} => ${Math.max(0, Math.min(15, (gpm - 250) / 20))}`, 'color:orange');
    // console.log(`%cXPM: ${xpm} => ${Math.max(0, Math.min(15, (xpm - 250) / 20))}`, 'color:orange');
    // console.log(`%cKDA: ${kda} => ${Math.max(0, Math.min(15, (kda - 1.5) * 4))}`, 'color:orange');
    // console.log(
    //     `%cLH: ${lastHits} => ${Math.max(0, Math.min(5, (lastHits - 100) / 30))}`,
    //     'color:orange',
    // );
    // console.log(
    //     `%cDENIES: ${denies} => ${Math.max(0, Math.min(5, (denies - 10) / 12))}`,
    //     'color:orange',
    // );
    // console.log(`%cVICTORY: ${victory} => ${victory ? 45 : 0}`, 'color:orange');

    const countedData = {
        ...data,
        reward: rewardPoints / 10,
    };

    _sendEndGameTrs(countedData);
};

export const sendLolReward = (data) => {
    const { kills, deaths, assists, minionKills, level } = data.matchData;
    const { victory } = data;
    const kda = (kills + assists * 0.5) / (deaths || 1);

    const rewardPoints =
        Math.max(0, Math.min(20, (kda - 1.5) * 8)) +
        Math.max(0, Math.min(20, (minionKills - 124) / 9)) +
        Math.max(0, Math.min(20, (level - 10) * 2)) +
        (victory ? 45 : 0);

    // console.log(`%cReward: ${rewardPoints / 10}`, 'color:orange');
    // console.log(`%cKDA: ${kda} => ${Math.max(0, Math.min(20, (kda - 1.5) * 8))}`, 'color:orange');
    // console.log(
    //     `%cLH: ${minionKills} => ${Math.max(0, Math.min(20, (minionKills - 124) / 9))}`,
    //     'color:orange',
    // );
    // console.log(
    //     `%cLVL: ${level} => ${Math.max(0, Math.min(20, (level - 10) * 2))}`,
    //     'color:orange',
    // );

    const countedData = {
        ...data,
        reward: rewardPoints / 10,
    };

    _sendEndGameTrs(countedData);
};

export const sendCsgoReward = (data) => {
    const { kills, deaths, assists, headshots, mvps, score } = data.matchData;
    const kda = (kills + assists) / (deaths || 1);

    const rewardPoints =
        Math.max(0, Math.min(20, (kda - 1) * 15)) +
        Math.max(0, Math.min(20, headshots * 2)) +
        Math.max(0, Math.min(20, mvps * 2)) +
        Math.max(0, Math.min(20, (score - 35) * 2));

    const countedData = {
        ...data,
        victory: true,
        reward: rewardPoints / 10,
    };
    console.log('counted data ->', countedData);
    _sendEndGameTrs(countedData);
};
