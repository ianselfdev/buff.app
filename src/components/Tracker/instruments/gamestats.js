import { port } from '../../../REST/config';

export const _sendStartGameTrs = async (data) => {
    // console.log(tx);

    const response = await fetch(`http://18.188.224.32:${port}/api/games/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('buff-token'),
        },
        body: JSON.stringify(data),
    });

    console.log('SEND START GAME TX');

    const result = await response.json();
    console.log(result);
};

export const _sendEndGameTrs = async (data) => {
    const response = await fetch(`http://18.188.224.32:${port}/api/games/end`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('buff-token'),
        },
        body: JSON.stringify(data),
    });

    console.log('SEND END GAME TX');

    const result = await response.json();
    console.log(result);
};

export const _sendFortniteEvent = async (data) => {
    // const schema = {
    //     event: joi.string().required(),
    //     data: joi.string().required()
    //   };

    const response = await fetch(`http://18.188.224.32:${port}/api/games/fortnite/event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('buff-token'),
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
};
