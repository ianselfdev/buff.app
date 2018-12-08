const validateUser = async (publicKey, passphrase) => {
    const response = await fetch(
        'http://18.188.224.32:4000/api/game-start/verify',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                publicKey,
                passphrase,
            }),
        },
    );

    const data = await response.json();
    return data;
};

export const validateAddress = async (address, secret) => {
    const response = await fetch(
        `http://18.188.224.32:4000/api/accounts/getPublicKey?address=${address}`,
        {
            method: 'GET',
            headers: {
                address,
            },
        },
    );

    const data = await response.json();
    // console.log(data);

    return validateUser(data.publicKey, secret);
};
