export const _sendStartGameTrs = async (tx) => {
    // console.log(tx);

    const response = await fetch('http://18.188.224.32:6001/api/games/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: tx,
    });

    console.log('SEND START GAME TX');

    const result = await response.json();
    console.log(result);
};

export const _sendEndGameTrs = async (tx) => {
    const response = await fetch('http://18.188.224.32:6001/api/games/game-end', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: tx,
    });

    console.log('SEND END GAME TX');

    const result = await response.json();
    console.log(result);
};

export const _changeState = async (state) => {
    const response = await fetch('http://18.188.224.32:4000/api/state', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            state,
        }),
    });

    const result = await response.json();
    // console.log(result);
};
