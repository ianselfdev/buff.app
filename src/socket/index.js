//Core
import io from 'socket.io-client';

//Config
import { SOCKET_URL } from '../REST';
let token = localStorage.getItem('buff-token');

export const socket = () =>
    io(SOCKET_URL, {
        autoConnect: true,
        query: `auth_token=${token}`,
        // transports: ['websocket'],
        // upgrade: false,
    });
