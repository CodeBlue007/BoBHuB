import { createSlice } from '@reduxjs/toolkit';

type Roomname = string;

type ChatType = {
    chats : {[key : Roomname] : string[]}
}

const initialState:ChatType = {
    chats : {},
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers : {
        enterRoom : (state, action) => {
            const {roomName} = action.payload;
            if(state.chats[roomName]) return;
            state.chats[roomName] = [];
        },
        updateRoom : (state,action) =>{
            const {roomName, payload} = action.payload;
            state.chats[roomName].push(payload);
        },
        check : (state) =>{
            return {...state};
        }
    }
})

export const chatAction = chatSlice.actions;

