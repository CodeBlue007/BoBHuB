import React from "react";
import socketio, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const ENDPOINT = 'http://localhost:5000';

export const socket = socketio(ENDPOINT); //연결

type socketType = Socket<DefaultEventsMap, DefaultEventsMap>;

export const SocketContext = React.createContext<socketType>(socket); //socket만듬 export


