import { createSlice } from '@reduxjs/toolkit';

type ChatType = {
    chat : string[];
}

const initialState:ChatType = {
    chat : []
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers : {
        update : (state,action) =>{
            const {payload} = action.payload;
            state.chat.push(payload);
        }
    }
})
