import { _sendEndGameTrs } from './gamestats';

export const sendDotaReward = (data, token) => {
    const { gpm, xpm, kda, lastHits, denies, victory } = data.matchData;

    const rewardPoints =
        Math.max(0, (gpm - 250) / 18) +
        Math.max(0, (xpm - 250) / 18) +
        Math.max(0, (kda - 1.5) * 5) +
        Math.max(0, (lastHits - 100) / 30) +
        Math.max(0, (denies - 10) / 10) +
        (victory ? 45 : 0);

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

    _sendEndGameTrs(countedData, token);
};

export const sendLolReward = (data, token) => {
    const { kills, deaths, assists, minionKills, level } = data.matchData;
    const { victory } = data;
    const kda = (kills + assists) / (deaths || 1);

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

    _sendEndGameTrs(countedData, token);
};
