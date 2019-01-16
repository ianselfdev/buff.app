// Core
import io from 'socket.io-client';

//Config
import { ROOT_URL, groupId } from '../../REST/config';

export const socket = io(ROOT_URL, {
    path: '/redux/ws',
});

export const joinSocketChannel = () => {
    const token = localStorage.getItem('redux-token');

    socket.emit('join', { groupId, token });
};
