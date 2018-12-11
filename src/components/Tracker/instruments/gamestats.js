export const _sendStartGameTrs = async (tx) => {
    // console.log(tx);

    const response = await fetch('http://18.188.224.32:4000/api/game-start', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: tx,
    });

    console.log('SEND START GAME TX');

    const result = await response.json();
    // console.log(result);
};

export const _sendEndGameTrs = async (tx) => {
    const response = await fetch('http://18.188.224.32:4000/api/game-end', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: tx,
    });

    console.log('SEND END GAME TX');

    const result = await response.json();
    // console.log(result);
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
