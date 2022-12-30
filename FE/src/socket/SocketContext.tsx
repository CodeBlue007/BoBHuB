import React from 'react';
import socketio, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const ENDPOINT = 'http://localhost:3100';

export const socket = socketio(ENDPOINT, {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd',
  },
}); //연결

type socketType = Socket<DefaultEventsMap, DefaultEventsMap>;

export const SocketContext = React.createContext<socketType>(socket); //socket만듬 export
