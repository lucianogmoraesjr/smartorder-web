import socketIO from 'socket.io-client';

export const webSocketClient = socketIO('http://localhost:3333', {
  transports: ['websocket'],
});
