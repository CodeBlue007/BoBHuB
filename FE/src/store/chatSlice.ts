import { createSlice } from '@reduxjs/toolkit';
import { NullableString, NullableNum } from '../pages/FoodDetail/util/Type';

type Roomname = string;

export type MessageInfo = {
  message: string;
  userId: NullableNum;
  userName: NullableString;
};

type ChatType = {
  chats: { [key: Roomname]: MessageInfo[] };
};

const initialState: ChatType = {
  chats: {},
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    enterRoom: (state, action) => {
      const { roomName } = action.payload;
      if (state.chats[roomName]) return;
      state.chats[roomName] = [];
    },
    updateRoom: (state, action) => {
      const { roomName, payload } = action.payload;
      state.chats[roomName].push(payload);
    },
  },
});

export const chatAction = chatSlice.actions;
